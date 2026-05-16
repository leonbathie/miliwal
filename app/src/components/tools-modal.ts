import SunCalc from 'suncalc';
import { state } from '@/state/app-state';
import { t, i18n as i18nDict } from '@/i18n';
import { toHijri } from '@/services/hijri';
import { getSeason } from '@/utils/season';
import { classifyMoonPhase } from '@/utils/moon-phase';
import { mondayBasedIndex } from '@/utils/date';

/** Compute day-of-year for any date (1..366). */
function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

function daysInYear(year: number): number {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
}

function fmtDateFull(d: Date, lang: 'fr' | 'en' | 'ff'): string {
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function isoYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

interface DateFacts {
  weekday: string;
  fulfuldeDay: string;
  fulfuldeMonth: string;
  hijri: string;
  dayOfYear: number;
  weekNumber: number;
  daysFromToday: number;
  season: string;
  moonPhase: string;
  moonIcon: string;
  moonAge: number;
  moonIllum: number;
  dayLengthHours: number;
}

function isoWeekNumber(d: Date): number {
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil((((target.getTime() - yearStart.getTime()) / 86_400_000) + 1) / 7);
}

function computeFacts(date: Date): DateFacts {
  const lang = state.lang;
  const dict = t(lang);
  const dayIdx = mondayBasedIndex(date);

  const season = getSeason(date.getMonth());
  const seasonName = dict[season.key];

  // Moon
  const illum = SunCalc.getMoonIllumination(date);
  const phase = classifyMoonPhase(illum.phase);
  const moonPhase = dict.moonPhases[phase.index] ?? '';
  const moonAge = illum.phase * 29.53;

  // Day length (sunset - sunrise)
  const sunTimes = SunCalc.getTimes(date, state.lat, state.lon);
  const dayLengthMs = sunTimes.sunset.getTime() - sunTimes.sunrise.getTime();
  const dayLengthHours = isNaN(dayLengthMs) ? 0 : dayLengthMs / 3_600_000;

  // Days from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const daysFromToday = Math.round((target.getTime() - today.getTime()) / 86_400_000);

  return {
    weekday: dict.days[dayIdx] ?? '',
    fulfuldeDay: i18nDict.ff.days[dayIdx] ?? '',
    fulfuldeMonth: i18nDict.ff.months[date.getMonth()] ?? '',
    hijri: toHijri(date, lang).formatted,
    dayOfYear: dayOfYear(date),
    weekNumber: isoWeekNumber(date),
    daysFromToday,
    season: seasonName,
    moonPhase,
    moonIcon: phase.icon,
    moonAge,
    moonIllum: illum.fraction * 100,
    dayLengthHours,
  };
}

function renderFactsGrid(containerId: string, date: Date): void {
  const el = document.getElementById(containerId);
  if (!el) return;
  const f = computeFacts(date);
  const dict = t(state.lang);
  const dayLen = f.dayLengthHours > 0
    ? `${Math.floor(f.dayLengthHours)} h ${Math.round((f.dayLengthHours % 1) * 60)} min`
    : '—';

  el.innerHTML = `
    <div class="tool-fact">
      <span class="tool-fact-label">${dict.tools_label_day}</span>
      <span class="tool-fact-value">${f.weekday}</span>
      <span class="tool-fact-sub">${f.fulfuldeDay} (Fulfulde)</span>
    </div>
    <div class="tool-fact">
      <span class="tool-fact-label">${dict.tools_label_fulfulde_month}</span>
      <span class="tool-fact-value">${f.fulfuldeMonth}</span>
    </div>
    <div class="tool-fact">
      <span class="tool-fact-label">${dict.hijri_label}</span>
      <span class="tool-fact-value">${f.hijri}</span>
    </div>
    <div class="tool-fact">
      <span class="tool-fact-label">${dict.tools_label_doy}</span>
      <span class="tool-fact-value">${f.dayOfYear} / ${daysInYear(date.getFullYear())}</span>
      <span class="tool-fact-sub">${dict.tools_label_week} ${f.weekNumber}</span>
    </div>
    <div class="tool-fact">
      <span class="tool-fact-label">${dict.tools_label_diff}</span>
      <span class="tool-fact-value">${formatDaysDiff(f.daysFromToday, dict)}</span>
    </div>
    <div class="tool-fact">
      <span class="tool-fact-label">${dict.lbl_eph_season}</span>
      <span class="tool-fact-value">${f.season}</span>
    </div>
    <div class="tool-fact">
      <span class="tool-fact-label">${dict.lbl_eph_moon}</span>
      <span class="tool-fact-value">${f.moonIcon} ${f.moonPhase}</span>
      <span class="tool-fact-sub">${f.moonIllum.toFixed(0)}% · ${f.moonAge.toFixed(1)} ${dict.lbl_days}</span>
    </div>
    <div class="tool-fact">
      <span class="tool-fact-label">${dict.tools_label_day_length}</span>
      <span class="tool-fact-value">${dayLen}</span>
    </div>
  `;
}

function formatDaysDiff(diff: number, dict: { tools_today_is: string; tools_in_days: string; tools_ago: string }): string {
  if (diff === 0) return dict.tools_today_is;
  if (diff > 0) return `${diff} ${dict.tools_in_days}`;
  return `${-diff} ${dict.tools_ago}`;
}

function diffDays(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / 86_400_000);
}

function renderBetween(): void {
  const fromEl = document.getElementById('tools-from-date') as HTMLInputElement | null;
  const toEl = document.getElementById('tools-to-date') as HTMLInputElement | null;
  const resultEl = document.getElementById('tools-between-result');
  if (!fromEl || !toEl || !resultEl) return;

  if (!fromEl.value || !toEl.value) {
    resultEl.textContent = '';
    return;
  }
  const from = new Date(fromEl.value);
  const to = new Date(toEl.value);
  const days = diffDays(from, to);
  const abs = Math.abs(days);
  const weeks = Math.floor(abs / 7);
  const months = Math.floor(abs / 30.4375);
  const years = (abs / 365.2425).toFixed(2);
  const dict = t(state.lang);
  const sign = days < 0 ? '−' : '';

  resultEl.innerHTML = `
    <div class="tool-result-big">${sign}${abs} ${dict.lbl_days_plural}</div>
    <div class="tool-result-sub">
      ${sign}${weeks} ${dict.tools_weeks} · ${sign}${months} ${dict.tools_months} · ${sign}${years} ${dict.tools_years}
    </div>
  `;
}

/** Open the tools modal and seed default values. */
export function openToolsModal(): void {
  const modal = document.getElementById('tools-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  renderToolsContents();
}

export function closeToolsModal(): void {
  const modal = document.getElementById('tools-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/** Render everything inside the tools modal (also called on language change). */
export function renderToolsContents(): void {
  const today = new Date();

  // Today section
  renderFactsGrid('tools-today', today);

  // Pick date section — pre-seed with today on first render
  const pickInput = document.getElementById('tools-pick-date') as HTMLInputElement | null;
  if (pickInput && !pickInput.value) pickInput.value = isoYMD(today);
  if (pickInput) {
    const picked = pickInput.value ? new Date(pickInput.value) : today;
    renderFactsGrid('tools-pick-result', picked);
  }

  // Between section — pre-seed with today → end of year
  const fromInput = document.getElementById('tools-from-date') as HTMLInputElement | null;
  const toInput = document.getElementById('tools-to-date') as HTMLInputElement | null;
  if (fromInput && !fromInput.value) fromInput.value = isoYMD(today);
  if (toInput && !toInput.value) {
    const eoy = new Date(today.getFullYear(), 11, 31);
    toInput.value = isoYMD(eoy);
  }
  renderBetween();
}

/** Bind change listeners once. Idempotent. */
let bound = false;
export function bindToolsModal(): void {
  if (bound) return;
  bound = true;

  const pickInput = document.getElementById('tools-pick-date') as HTMLInputElement | null;
  pickInput?.addEventListener('change', () => {
    if (pickInput.value) renderFactsGrid('tools-pick-result', new Date(pickInput.value));
  });

  document.getElementById('tools-from-date')?.addEventListener('change', renderBetween);
  document.getElementById('tools-to-date')?.addEventListener('change', renderBetween);

  // Escape key closes the modal
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('tools-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeToolsModal();
  });

  // Format fact dates also reflect formatted full date below grid
  void fmtDateFull;
}

/** Display the currently picked date (if any) — used after language changes. */
export function refreshToolsLabels(): void {
  const modal = document.getElementById('tools-modal');
  if (!modal || modal.classList.contains('hidden')) return;
  renderToolsContents();
}
