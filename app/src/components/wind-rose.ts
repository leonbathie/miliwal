import {
  Chart,
  RadialLinearScale,
  PolarAreaController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { cssVar } from '@/services/theme';

Chart.register(RadialLinearScale, PolarAreaController, ArcElement, Tooltip, Legend);

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];

let chart: Chart | null = null;

/**
 * Render an 8-direction wind rose from hourly data. We aggregate the next
 * 24h of hourly wind direction + speed into the nearest of the 8 compass
 * sectors and sum the wind speeds as proxy for sector intensity.
 */
export function renderWindRose(hourlyDirections: number[], hourlySpeeds: number[]): void {
  const canvas = document.getElementById('windRose') as HTMLCanvasElement | null;
  if (!canvas) return;

  if (chart) {
    chart.destroy();
    chart = null;
  }

  const bins = new Array(8).fill(0) as number[];
  const limit = Math.min(hourlyDirections.length, hourlySpeeds.length, 24);
  for (let i = 0; i < limit; i++) {
    const dir = hourlyDirections[i];
    const spd = hourlySpeeds[i];
    if (typeof dir !== 'number' || typeof spd !== 'number') continue;
    const idx = Math.round(dir / 45) % 8;
    bins[idx] = (bins[idx] ?? 0) + spd;
  }

  const accent = cssVar('--accent', '#d4af37');
  const warm = cssVar('--accent-warm', '#e8c668');
  const info = cssVar('--info', '#6fa8ff');
  const text2 = cssVar('--text-2', '#c8c5be');
  const text3 = cssVar('--text-3', '#8a8a93');
  const grid = cssVar('--border', 'rgba(255,255,255,0.06)');

  chart = new Chart(canvas, {
    type: 'polarArea',
    data: {
      labels: DIRECTIONS,
      datasets: [
        {
          label: 'km/h cumulés',
          data: bins,
          backgroundColor: [
            `${accent}8c`, `${accent}73`, `${warm}73`, `${info}66`,
            `${info}8c`, `${info}73`, `${warm}73`, `${accent}73`,
          ],
          borderColor: `${accent}99`,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          ticks: { color: text3, font: { size: 9 }, backdropColor: 'transparent' },
          grid: { color: grid },
          angleLines: { color: grid },
          pointLabels: { color: text2, font: { size: 11 } },
        },
      },
      plugins: { legend: { display: false } },
    },
  });
}
