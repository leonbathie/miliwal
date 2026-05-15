import { Chart } from 'chart.js';
import type { OpenMeteoResponse } from '@/types';
import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { mondayBasedIndex } from '@/utils/date';
import { cssVar } from '@/services/theme';

let chart: Chart | null = null;

/** Render the 7-day forecast as a temperature range + precipitation chart. */
export function renderWeeklyChart(data: OpenMeteoResponse): void {
  const canvas = document.getElementById('weeklyChart') as HTMLCanvasElement | null;
  if (!canvas) return;

  if (chart) {
    chart.destroy();
    chart = null;
  }

  const d = data.daily;
  const dict = t(state.lang);

  const labels: string[] = [];
  for (const isoDate of d.time) {
    const date = new Date(isoDate);
    const dayName = dict.daysAbr[mondayBasedIndex(date)] ?? '';
    labels.push(`${dayName} ${date.getDate()}/${date.getMonth() + 1}`);
  }

  const warm = cssVar('--accent-warm', '#e8c668');
  const info = cssVar('--info', '#6fa8ff');
  const text2 = cssVar('--text-2', '#c8c5be');
  const grid = cssVar('--divider', 'rgba(255,255,255,0.04)');

  chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Max °C',
          data: d.temperature_2m_max,
          borderColor: warm,
          backgroundColor: `${warm}1f`,
          borderWidth: 2.5,
          pointBackgroundColor: warm,
          pointRadius: 4,
          tension: 0.35,
          fill: '+1',
          yAxisID: 'y',
        },
        {
          label: 'Min °C',
          data: d.temperature_2m_min,
          borderColor: info,
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointBackgroundColor: info,
          pointRadius: 3,
          tension: 0.35,
          fill: false,
          yAxisID: 'y',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      scales: {
        x: { ticks: { color: text2, font: { size: 11 } }, grid: { color: grid } },
        y: { ticks: { color: text2, font: { size: 11 } }, grid: { color: grid } },
      },
      plugins: { legend: { labels: { color: text2, font: { size: 11 } } } },
    },
  });
}
