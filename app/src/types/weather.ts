import type { WeatherCode } from './i18n';

export interface OpenMeteoCurrent {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  weather_code: WeatherCode;
  cloud_cover: number;
  pressure_msl: number;
  wind_speed_10m: number;
  wind_gusts_10m: number | null;
  visibility: number;
  dew_point_2m: number;
  soil_temperature_0cm: number | null;
  soil_moisture_0_to_1cm: number | null;
  et0_fao_evapotranspiration: number | null;
  direct_radiation: number | null;
}

export interface OpenMeteoHourly {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weather_code: WeatherCode[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
}

export interface OpenMeteoDaily {
  time: string[];
  weather_code: WeatherCode[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  current: OpenMeteoCurrent;
  hourly: OpenMeteoHourly;
  daily: OpenMeteoDaily;
}
