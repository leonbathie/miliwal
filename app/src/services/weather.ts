import type { OpenMeteoResponse } from '@/types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const CURRENT_PARAMS = [
  'temperature_2m', 'apparent_temperature', 'relative_humidity_2m',
  'precipitation', 'weather_code', 'cloud_cover', 'pressure_msl',
  'wind_speed_10m', 'wind_gusts_10m', 'visibility', 'dew_point_2m',
  'soil_temperature_0cm', 'soil_moisture_0_to_1cm',
  'et0_fao_evapotranspiration', 'direct_radiation',
].join(',');

const HOURLY_PARAMS = [
  'temperature_2m', 'precipitation_probability', 'weather_code',
  'wind_speed_10m', 'wind_direction_10m',
].join(',');

const DAILY_PARAMS = [
  'weather_code', 'temperature_2m_max', 'temperature_2m_min',
  'sunrise', 'sunset', 'uv_index_max',
].join(',');

/** Fetch weather data from Open-Meteo for the given coordinates. */
export async function loadWeather(lat: number, lon: number): Promise<OpenMeteoResponse> {
  const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}`
    + `&current=${CURRENT_PARAMS}`
    + `&hourly=${HOURLY_PARAMS}`
    + `&daily=${DAILY_PARAMS}`
    + `&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Open-Meteo HTTP ${response.status}`);
  }
  return response.json() as Promise<OpenMeteoResponse>;
}
