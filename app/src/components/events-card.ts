import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { upcomingEvents, type AstroEvent } from '@/data/astro-events';

function formatEventDate(iso: string, lang: 'fr' | 'en' | 'ff'): string {
  const date = new Date(`${iso}T12:00:00`);
  const localeMap: Record<string, string> = { fr: 'fr-FR', en: 'en-US', ff: 'fr-FR' };
  return date.toLocaleDateString(localeMap[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function eventTitle(e: AstroEvent, lang: 'fr' | 'en' | 'ff'): string {
  return lang === 'en' ? e.titleEn : lang === 'ff' ? e.titleFf : e.titleFr;
}

function eventDesc(e: AstroEvent, lang: 'fr' | 'en' | 'ff'): string {
  return lang === 'en' ? e.descEn : lang === 'ff' ? e.descFf : e.descFr;
}

/** Render the upcoming astronomical events card. */
export function renderEvents(): void {
  const container = document.getElementById('events-list');
  if (!container) return;

  const events = upcomingEvents(new Date(), 6);
  const dict = t(state.lang);

  if (events.length === 0) {
    container.innerHTML = `<p class="events-empty">${dict.events_empty}</p>`;
    return;
  }

  container.innerHTML = events
    .map((e) => `
      <div class="event-row${e.visibleInWestAfrica ? ' is-visible' : ''}">
        <span class="event-icon" aria-hidden="true">${e.icon}</span>
        <div class="event-body">
          <div class="event-title">${eventTitle(e, state.lang)}</div>
          <div class="event-desc">${eventDesc(e, state.lang)}</div>
        </div>
        <span class="event-date">${formatEventDate(e.date, state.lang)}</span>
      </div>
    `)
    .join('');
}
