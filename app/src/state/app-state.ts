import type { Lang, OpenMeteoResponse } from '@/types';

/**
 * Global mutable application state. Single source of truth for the current
 * language, year and observer location, plus the last fetched weather payload
 * (cached so that re-rendering on language change doesn't refetch).
 */
export interface AppState {
  lang: Lang;
  year: number;
  lat: number;
  lon: number;
  lastWeather: OpenMeteoResponse | null;
}

export const state: AppState = {
  lang: 'fr',
  year: new Date().getFullYear(),
  lat: 14.7167,  // Dakar
  lon: -17.4677,
  lastWeather: null,
};
