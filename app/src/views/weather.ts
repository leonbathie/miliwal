import { state } from '@/state/app-state';
import { loadWeather } from '@/services/weather';
import { getCurrentPosition } from '@/services/geolocation';
import { setText } from '@/utils/dom';
import { renderWeather } from '@/components/weather-card';
import { renderHourlyChart } from '@/components/hourly-chart';
import { renderDailyForecast } from '@/components/daily-forecast';
import { renderWeeklyChart } from '@/components/weekly-chart';
import { renderWindRose } from '@/components/wind-rose';
import { updateAstroData } from '@/components/astro-panel';

function renderAllPanels(data: NonNullable<typeof state.lastWeather>): void {
  renderWeather(data);
  renderHourlyChart(data);
  renderDailyForecast(data);
  renderWeeklyChart(data);
  renderWindRose(data.hourly.wind_direction_10m, data.hourly.wind_speed_10m);
  updateAstroData(new Date(), state.lat, state.lon);
}

/** Fetch weather and refresh all dependent panels. */
export async function refreshWeather(): Promise<void> {
  try {
    const data = await loadWeather(state.lat, state.lon);
    state.lastWeather = data;
    renderAllPanels(data);
  } catch (err) {
    console.error('Weather API error', err);
  }
}

/** Re-render the weather/astro panels from cached data (no refetch). */
export function rerenderWeatherFromCache(): void {
  if (!state.lastWeather) return;
  renderAllPanels(state.lastWeather);
}

/** Request the browser's geolocation, then refresh weather. */
export async function useMyLocation(): Promise<void> {
  setText('dash-location', '...');
  try {
    const coords = await getCurrentPosition();
    state.lat = coords.lat;
    state.lon = coords.lon;
    setText('dash-location', 'GPS Position');
    setText('dash-lat', state.lat.toFixed(4));
    setText('dash-lon', state.lon.toFixed(4));
    await refreshWeather();
  } catch (err) {
    console.error('Geolocation error', err);
    alert('Erreur géolocalisation.');
  }
}
