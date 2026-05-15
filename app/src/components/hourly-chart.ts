import {
  Chart,
  LineController,
  BarController,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { OpenMeteoResponse } from '@/types';
import { extractTimeFromIso } from '@/utils/date';
import { cssVar } from '@/services/theme';

Chart.register(
  LineController,
  BarController,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
);

let chartInstance: Chart | null = null;

/** Render the 24h hourly evolution chart (temperature line + precipitation bars). */
export function renderHourlyChart(data: OpenMeteoResponse): void {
  const ctx = document.getElementById('hourlyChart') as HTMLCanvasElement | null;
  if (!ctx) return;

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  const startIdx = new Date().getHours();
  const labels: string[] = [];
  const temps: number[] = [];
  const precips: number[] = [];

  const hourly = data.hourly;
  for (let i = 0; i < 24; i++) {
    const idx = startIdx + i;
    if (idx >= hourly.temperature_2m.length) break;
    const isoTime = hourly.time[idx];
    if (!isoTime) continue;
    labels.push(extractTimeFromIso(isoTime));
    temps.push(hourly.temperature_2m[idx]!);
    precips.push(hourly.precipitation_probability[idx] ?? 0);
  }

  const accent = cssVar('--accent', '#d4af37');
  const info = cssVar('--info', '#4facfe');
  const text2 = cssVar('--text-2', '#b0c4de');
  const text1 = cssVar('--text-1', '#f6f3eb');
  const grid = cssVar('--divider', 'rgba(255,255,255,0.05)');

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Température (°C)',
          data: temps,
          borderColor: accent,
          backgroundColor: `${accent}1a`, // 10% alpha
          borderWidth: 2,
          yAxisID: 'y',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Précipitation (%)',
          data: precips,
          type: 'bar',
          backgroundColor: `${info}99`, // 60% alpha
          yAxisID: 'y1',
        } as unknown as never,
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      color: text2,
      scales: {
        x: { ticks: { color: text2 }, grid: { color: grid } },
        y: {
          type: 'linear', display: true, position: 'left',
          ticks: { color: accent }, grid: { color: grid },
        },
        y1: {
          type: 'linear', display: true, position: 'right', min: 0, max: 100,
          ticks: { color: info }, grid: { drawOnChartArea: false },
        },
      },
      plugins: { legend: { labels: { color: text1 } } },
    },
  });
}
