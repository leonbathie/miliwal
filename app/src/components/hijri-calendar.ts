import { state } from '@/state/app-state';
import { buildHijriGrid, type HijriMonth } from '@/services/hijri-grid';
import { mondayBasedIndex } from '@/utils/date';
import { t } from '@/i18n';

const HIJRI_MONTHS: Record<string, string[]> = {
  fr: [
    'Muharram', 'Safar', 'Rabi’ al-Awwal', 'Rabi’ al-Thani',
    'Joumada al-Oula', 'Joumada al-Thania', 'Rajab', 'Cha’ban',
    'Ramadan', 'Chawwal', 'Dhou al-Qa’da', 'Dhou al-Hijja',
  ],
  en: [
    'Muharram', 'Safar', 'Rabi’ al-Awwal', 'Rabi’ al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha’ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi’dah', 'Dhu al-Hijjah',
  ],
  ff: [
    'Muharram', 'Safar', 'Rabi’ al-Awwal', 'Rabi’ al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha’ban',
    'Sumayee', 'Juulde Koorka', 'Dhu al-Qi’dah', 'Juulde Donkin',
  ],
};

function renderHijriMonth(card: HTMLDivElement, month: HijriMonth, lang: 'fr' | 'en' | 'ff'): void {
  const dict = t(lang);
  const today = new Date();

  const monthName = HIJRI_MONTHS[lang]?.[month.hijriMonth - 1] ?? '';

  let html = `
    <div class="month-header">
      <div class="month-season-icon" title="Mois lunaire">☾</div>
      <h3>${month.hijriMonth}. ${monthName}</h3>
      <span>${month.days.length} jours · ${month.hijriYear} H</span>
    </div>
    <div class="days-grid">
  `;

  dict.daysAbr.forEach((abbr) => {
    html += `<div class="day-label">${abbr}</div>`;
  });

  if (month.days.length === 0) {
    card.innerHTML = html + '</div>';
    return;
  }

  // Offset: empty cells before the first day of the month (Monday-based grid).
  const firstDay = month.days[0]!.gregorian;
  const firstIdx = mondayBasedIndex(firstDay);
  for (let i = 0; i < firstIdx; i++) {
    html += `<div class="day-cell empty"></div>`;
  }

  for (const d of month.days) {
    const isToday =
      d.gregorian.getFullYear() === today.getFullYear() &&
      d.gregorian.getMonth() === today.getMonth() &&
      d.gregorian.getDate() === today.getDate();
    const tooltip = `${d.hijriDay} ${monthName} ${d.hijriYear}H — ${d.gregorian.toLocaleDateString(
      lang === 'en' ? 'en-US' : 'fr-FR',
      { day: 'numeric', month: 'short' },
    )}`;
    html += `<div class="day-cell${isToday ? ' today' : ''}" title="${tooltip}">${d.hijriDay}</div>`;
  }

  html += '</div>';
  card.innerHTML = html;
}

/** Render the 12 Hijri months for the current Hijri year into #calendar-grid. */
export function buildHijriCalendar(): void {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const months = buildHijriGrid(new Date());
  const lang = state.lang;

  for (const m of months) {
    const card = document.createElement('div');
    card.className = 'month-card';
    renderHijriMonth(card, m, lang);
    grid.appendChild(card);
  }
}
