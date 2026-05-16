import { state } from '@/state/app-state';
import { t, i18n } from '@/i18n';
import { getSeason } from '@/utils/season';

/** Build the calendar grid (12 month cards) for a given year. */
export function buildCalendar(year: number): void {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const today = new Date();
  const lang = state.lang;
  const dict = t(lang);

  for (let m = 0; m < 12; m++) {
    const card = document.createElement('div');
    card.className = 'month-card';

    const mainMonth = dict.months[m] ?? '';
    // Show the Fulfulde name as a subtitle when the main lang is not ff,
    // otherwise show the French name. Preserves the original UX.
    const subMonth = lang !== 'ff' ? (i18n.ff.months[m] ?? '') : (i18n.fr.months[m] ?? '');

    const season = getSeason(m);

    let html = `
      <div class="month-header">
        <div class="month-season-icon">${season.icon}</div>
        <h3>${m + 1}. ${mainMonth}</h3>
        <span>${subMonth} ${year}</span>
      </div>
      <div class="days-grid">
    `;

    dict.daysAbr.forEach((abbr) => {
      html += `<div class="day-label">${abbr}</div>`;
    });

    // Monday is first day of week. JS getDay(): 0=Sunday..6=Saturday
    const firstDay = new Date(year, m, 1).getDay();
    const emptyDays = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < emptyDays; i++) {
      html += `<div class="day-cell empty"></div>`;
    }

    const daysInMonth = new Date(year, m + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday =
        d === today.getDate() &&
        m === today.getMonth() &&
        year === today.getFullYear()
          ? 'today'
          : '';
      html += `<div class="day-cell ${isToday}">${d}</div>`;
    }

    html += '</div>';
    card.innerHTML = html;
    grid.appendChild(card);
  }
}

/**
 * On mobile (≤ 640 px viewport), the months-grid becomes a horizontal carousel
 * with scroll-snap. We auto-scroll to the month containing "today" so the user
 * lands on the current month and swipes left/right to navigate.
 */
export function scrollToCurrentMonthOnMobile(): void {
  if (typeof window === 'undefined' || window.innerWidth > 640) return;
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;
  const todayCell = grid.querySelector<HTMLElement>('.day-cell.today');
  const card = todayCell?.closest('.month-card') as HTMLElement | null;
  if (!card) return;
  // Wait one paint so the carousel has laid out before scrolling.
  requestAnimationFrame(() => {
    card.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'auto' });
  });
}

/** Populate the year selector with [current-5..current+10]. */
export function populateYearSelector(): void {
  const select = document.getElementById('year-select') as HTMLSelectElement | null;
  if (!select) return;
  select.innerHTML = '';
  const current = state.year;
  for (let y = current - 5; y <= current + 10; y++) {
    const opt = document.createElement('option');
    opt.value = String(y);
    opt.innerText = String(y);
    if (y === current) opt.selected = true;
    select.appendChild(opt);
  }
}
