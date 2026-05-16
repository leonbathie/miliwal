import '@/styles/main.css';

import { state } from '@/state/app-state';
import { t, speechLangCode } from '@/i18n';
import { speakText } from '@/services/speech';
import type { Lang } from '@/types';

import { renderCalendarView, changeYear } from '@/views/calendar';
import { refreshWeather, rerenderWeatherFromCache, useMyLocation } from '@/views/weather';

import { buildLexicon } from '@/components/lexicon';
import { updateEphemerisHeader } from '@/components/ephemeris';
import { renderClock } from '@/components/clock';
import { renderHijriBadge } from '@/components/hijri-badge';
import { renderProverb, speakProverb } from '@/components/proverb-card';
import { renderPrayerCard, getLastPrayerTimes } from '@/components/prayer-card';
import { renderQibla } from '@/components/qibla-card';
import { renderEvents } from '@/components/events-card';
import { renderLocationsSelect, findLocationById } from '@/components/locations-select';
import { icon, type IconName } from '@/components/icons';
import { mountLogo, logoSvg } from '@/components/logo';
import { hydrateIllustrations } from '@/components/illustrations';
import {
  bindToolsModal,
  closeToolsModal,
  openToolsModal,
  refreshToolsLabels,
} from '@/components/tools-modal';
import { renderGallery } from '@/components/gallery-card';
import { initTheme, toggleTheme, getTheme, type Theme } from '@/services/theme';
import { buildHijriCalendar } from '@/components/hijri-calendar';
import { renderPlanets } from '@/components/planets-card';
import { renderConstellations } from '@/components/constellations-card';
import { renderComputedEclipses } from '@/components/computed-eclipses-card';
import { buildCalendar as buildGregorianCalendar, scrollToCurrentMonthOnMobile } from '@/components/month-card';
import { renderSkyMap } from '@/components/sky-map';
import { startTickers } from '@/services/tickers';
import { updateAstroData } from '@/components/astro-panel';

import { exportPrayerTimes, exportAstroEvents } from '@/services/ics-export';
import { upcomingEvents } from '@/data/astro-events';

type CalMode = 'gregorian' | 'hijri';
let calMode: CalMode = 'gregorian';

function applyCalendarMode(): void {
  if (calMode === 'hijri') buildHijriCalendar();
  else buildGregorianCalendar(state.year);
  scrollToCurrentMonthOnMobile();
}

function setCalMode(mode: CalMode): void {
  calMode = mode;
  document.querySelectorAll<HTMLElement>('.cal-mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  applyCalendarMode();
}

/* ============================================================================
   I18N — apply static texts marked with data-i18n
   ============================================================================ */
function updateStaticTexts(): void {
  const dict = t(state.lang);
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as keyof typeof dict | undefined;
    if (!key) return;
    const value = dict[key];
    if (typeof value === 'string') {
      el.innerHTML = value;
    }
  });
}

/**
 * Hydrate every <span data-icon="name"> placeholder with its SVG markup.
 * Called once at boot; safe to call again when new icons are added to the DOM.
 */
function hydrateIcons(): void {
  document.querySelectorAll<HTMLElement>('[data-icon]').forEach((el) => {
    const name = el.dataset.icon as IconName | undefined;
    if (!name || el.firstElementChild) return;
    el.innerHTML = icon(name, 18);
  });
}

/** Reflect the current theme in the toggle button's icon (sun for dark→light, moon for light→dark). */
function refreshThemeButton(theme: Theme = getTheme()): void {
  const host = document.getElementById('btn-theme-icon');
  if (!host) return;
  host.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon', 18);
  const btn = document.getElementById('btn-theme');
  if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre');
}

/** Re-render every language-dependent component. */
function applyLanguageEverywhere(): void {
  updateStaticTexts();
  buildLexicon();
  updateEphemerisHeader();
  applyCalendarMode();
  renderClock();
  renderHijriBadge();
  renderProverb();
  renderPrayerCard();
  renderQibla();
  renderEvents();
  renderPlanets();
  renderConstellations();
  renderComputedEclipses();
  renderSkyMap();
  renderGallery();
  refreshToolsLabels();
  rerenderWeatherFromCache();
}

function changeLanguage(newLang: Lang): void {
  state.lang = newLang;
  applyLanguageEverywhere();
}

/* ============================================================================
   Tab switching
   ============================================================================ */
function switchTab(tabId: 'cal' | 'meteo'): void {
  document.querySelectorAll('.tab-content').forEach((el) => el.classList.remove('active'));
  document.querySelectorAll('nav button').forEach((el) => el.classList.remove('active'));

  document.getElementById(`tab-${tabId}`)?.classList.add('active');
  document.getElementById(`btn-tab-${tabId}`)?.classList.add('active');

  // Re-render the sky map when entering the meteo tab — the canvas needs
  // a non-zero bounding rect, which it only gets once visible.
  if (tabId === 'meteo') {
    requestAnimationFrame(() => renderSkyMap());
  }
}

/* ============================================================================
   Hamburger menu (mobile only). The drawer is collapsed by default on
   narrow viewports and toggled by adding/removing `.menu-open` on <nav>.
   ============================================================================ */
function toggleMenu(): void {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const wasOpen = nav.classList.toggle('menu-open');
  document.getElementById('btn-hamburger')?.setAttribute('aria-expanded', String(wasOpen));
}

function closeMenu(): void {
  const nav = document.getElementById('main-nav');
  if (!nav?.classList.contains('menu-open')) return;
  nav.classList.remove('menu-open');
  document.getElementById('btn-hamburger')?.setAttribute('aria-expanded', 'false');
}

/** Bind global handlers that close the menu on outside click / Escape. */
function bindMenuAutoClose(): void {
  document.addEventListener('click', (ev) => {
    const nav = document.getElementById('main-nav');
    if (!nav?.classList.contains('menu-open')) return;
    const target = ev.target as HTMLElement | null;
    if (!target) return;
    // Click inside the hamburger button: handled by the action delegator above.
    if (target.closest('[data-action="toggle-menu"]')) return;
    // Click inside the drawer: close (any drawer action takes effect, then menu closes)
    if (target.closest('#nav-drawer')) {
      closeMenu();
      return;
    }
    // Click anywhere else on the page: close
    closeMenu();
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeMenu();
  });
}

/* ============================================================================
   PWA install prompt — capture the event for later manual trigger.
   ============================================================================ */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;

function setupInstallPrompt(): void {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e as BeforeInstallPromptEvent;
    document.getElementById('btn-install')?.classList.remove('hidden');
  });
  window.addEventListener('appinstalled', () => {
    document.getElementById('btn-install')?.classList.add('hidden');
    deferredInstallPrompt = null;
  });
}

async function triggerInstall(): Promise<void> {
  if (!deferredInstallPrompt) return;
  await deferredInstallPrompt.prompt();
  deferredInstallPrompt = null;
  document.getElementById('btn-install')?.classList.add('hidden');
}

/* ============================================================================
   Action delegation
   ============================================================================ */
function bindActions(): void {
  document.addEventListener('click', (ev) => {
    const target = ev.target as HTMLElement | null;
    if (!target) return;
    const actionEl = target.closest<HTMLElement>('[data-action]');
    if (!actionEl) return;
    const action = actionEl.dataset.action;

    switch (action) {
      case 'switch-tab': {
        const tab = actionEl.dataset.tab as 'cal' | 'meteo' | undefined;
        if (tab) switchTab(tab);
        break;
      }
      case 'print':
        window.print();
        break;
      case 'use-location':
        void useMyLocation().then(() => {
          renderPrayerCard();
          renderQibla();
          renderPlanets();
          renderConstellations();
          renderSkyMap();
        });
        break;
      case 'refresh-weather':
        void refreshWeather().then(() => {
          renderPrayerCard();
          renderQibla();
          renderPlanets();
          renderConstellations();
          renderSkyMap();
        });
        break;
      case 'read-time': {
        const text = state.lang === 'ff'
          ? document.getElementById('clock-text')?.innerText ?? ''
          : document.getElementById('clock-num')?.innerText ?? '';
        speakText(text, speechLangCode(state.lang));
        break;
      }
      case 'read-interpretation': {
        const text = document.getElementById('astro-interpretation')?.innerText ?? '';
        speakText(text, speechLangCode(state.lang));
        break;
      }
      case 'speak-proverb':
        speakProverb();
        break;
      case 'export-prayer': {
        const times = getLastPrayerTimes();
        if (times) {
          const locName = document.getElementById('dash-location')?.innerText ?? '';
          exportPrayerTimes(new Date(), times, locName);
        }
        break;
      }
      case 'export-events':
        exportAstroEvents(upcomingEvents(new Date(), 12));
        break;
      case 'install-app':
        void triggerInstall();
        closeMenu();
        break;
      case 'toggle-menu':
        toggleMenu();
        break;
      case 'set-cal-mode': {
        const mode = actionEl.dataset.mode as CalMode | undefined;
        if (mode === 'gregorian' || mode === 'hijri') setCalMode(mode);
        break;
      }
      case 'toggle-theme': {
        const newTheme = toggleTheme();
        refreshThemeButton(newTheme);
        // Re-render charts + sky map so they pick up the new CSS variables
        rerenderWeatherFromCache();
        renderSkyMap();
        break;
      }
      case 'toggle-menu': {
        const nav = document.getElementById('main-nav');
        if (!nav) break;
        const isOpen = nav.classList.toggle('menu-open');
        actionEl.setAttribute('aria-expanded', String(isOpen));
        break;
      }
      case 'open-tools':
        openToolsModal();
        // Close the mobile drawer if it was open
        document.getElementById('main-nav')?.classList.remove('menu-open');
        document.querySelector<HTMLElement>('.btn-hamburger')?.setAttribute('aria-expanded', 'false');
        break;
      case 'close-tools':
        closeToolsModal();
        break;
    }
  });

  document.addEventListener('change', (ev) => {
    const target = ev.target as HTMLElement | null;
    if (!target) return;
    const actionEl = target.closest<HTMLElement>('[data-action]');
    if (!actionEl) return;
    const action = actionEl.dataset.action;

    if (action === 'change-lang') {
      const select = actionEl as HTMLSelectElement;
      changeLanguage(select.value as Lang);
    } else if (action === 'change-year') {
      const select = actionEl as HTMLSelectElement;
      changeYear(parseInt(select.value, 10));
    } else if (action === 'change-location') {
      const select = actionEl as HTMLSelectElement;
      const loc = findLocationById(select.value);
      if (loc) {
        state.lat = loc.lat;
        state.lon = loc.lon;
        const locEl = document.getElementById('dash-location');
        if (locEl) locEl.textContent = loc.name;
        const latEl = document.getElementById('dash-lat');
        if (latEl) latEl.textContent = loc.lat.toFixed(4);
        const lonEl = document.getElementById('dash-lon');
        if (lonEl) lonEl.textContent = loc.lon.toFixed(4);
        void refreshWeather().then(() => {
          renderPrayerCard();
          renderQibla();
          renderPlanets();
          renderConstellations();
          renderSkyMap();
        });
      }
    }
  });
}

/* ============================================================================
   Dynamic refresh — keep time-sensitive panels in sync with the real sky.
   Fast tick (every 60s):
     - Prayer next-prayer countdown
     - Sun / Moon altitude + azimuth (drift ~0.25°/min from Earth rotation)
     - Sky map (Sun, Moon, stars, planets all shift visibly each minute)
   Medium tick (every 5 min):
     - Visible planets card
     - Visible constellations list
     - Ephemeris header (saison, zodiaque, phase de lune)
   ============================================================================ */
function startDynamicRefresh(): void {
  startTickers({
    fast: () => {
      renderPrayerCard();
      updateAstroData(new Date(), state.lat, state.lon);
      renderSkyMap();
    },
    medium: () => {
      renderPlanets();
      renderConstellations();
      updateEphemerisHeader();
    },
  });
}

/* ============================================================================
   Bootstrap
   ============================================================================ */
function init(): void {
  initTheme();
  bindActions();
  bindMenuAutoClose();
  setupInstallPrompt();
  updateStaticTexts();
  hydrateIcons();
  hydrateIllustrations();
  bindToolsModal();
  refreshThemeButton();
  mountLogo('brand-logo', 28);
  const footerLogo = document.querySelector('.brand-footer-logo');
  if (footerLogo) footerLogo.innerHTML = logoSvg(40);

  renderCalendarView();
  renderHijriBadge();
  renderProverb();
  renderLocationsSelect();
  renderEvents();
  renderComputedEclipses();
  renderGallery();

  void refreshWeather().then(() => {
    renderPrayerCard();
    renderQibla();
    renderPlanets();
    renderConstellations();
    renderSkyMap();
  });

  startDynamicRefresh();
  setTimeout(updateEphemerisHeader, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
