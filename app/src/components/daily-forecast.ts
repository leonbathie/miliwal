import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { mondayBasedIndex } from '@/utils/date';
import { weatherIcon } from '@/utils/weather-icons';
import type { OpenMeteoResponse } from '@/types';

const DAYS_TO_SHOW = 7;

/** Render the 7-day daily forecast list. */
export function renderDailyForecast(data: OpenMeteoResponse): void {
  const container = document.getElementById('daily-container');
  if (!container) return;
  container.innerHTML = '';

  const dict = t(state.lang);
  const d = data.daily;
  const count = Math.min(DAYS_TO_SHOW, d.time.length);

  for (let i = 0; i < count; i++) {
    const dateStr = d.time[i];
    if (!dateStr) continue;
    const date = new Date(dateStr);
    const dayName = dict.daysAbr[mondayBasedIndex(date)] ?? '';
    const iconSvg = weatherIcon(d.weather_code[i], 22);
    const tMax = Math.round(d.temperature_2m_max[i] ?? NaN);
    const tMin = Math.round(d.temperature_2m_min[i] ?? NaN);

    const displayDay = i === 0 ? dict.lbl_today : dayName;

    container.insertAdjacentHTML(
      'beforeend',
      `
      <div class="daily-row">
        <div>${displayDay} <span>${date.getDate()}/${date.getMonth() + 1}</span></div>
        <div class="daily-row-icon">${iconSvg}</div>
        <div>
          <span>${tMin}°</span>
          <span>${tMax}°</span>
        </div>
      </div>
    `,
    );
  }
}
