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

/** Briefly flash a status message in the location label. */
function flashLocationStatus(msg: string, revertTo: string, ms = 2400): void {
  setText('dash-location', msg);
  window.setTimeout(() => setText('dash-location', revertTo), ms);
}

/** Request the browser's geolocation, then refresh weather. */
export async function useMyLocation(): Promise<void> {
  const previousLabel = document.getElementById('dash-location')?.innerText ?? 'Position';
  setText('dash-location', 'Localisation…');
  try {
    const coords = await getCurrentPosition();
    state.lat = coords.lat;
    state.lon = coords.lon;
    setText('dash-location', 'Position GPS');
    setText('dash-lat', state.lat.toFixed(4));
    setText('dash-lon', state.lon.toFixed(4));
    await refreshWeather();
  } catch (err) {
    // A GeolocationPositionError carries a code:
    //   1 PERMISSION_DENIED, 2 POSITION_UNAVAILABLE, 3 TIMEOUT
    // User denial is the normal flow when they decline the browser prompt —
    // it must not surface as a red error. Only log when truly unexpected.
    const code = (err as GeolocationPositionError | undefined)?.code;
    if (code === 1) {
      flashLocationStatus('Géolocalisation refusée', previousLabel);
    } else if (code === 2) {
      flashLocationStatus('Position indisponible', previousLabel);
    } else if (code === 3) {
      flashLocationStatus('Délai dépassé', previousLabel);
    } else {
      // Truly unexpected — keep a debug trail without alarming the user.
      console.warn('Geolocation unexpected error', err);
      flashLocationStatus('Erreur de localisation', previousLabel);
    }
  }
}
