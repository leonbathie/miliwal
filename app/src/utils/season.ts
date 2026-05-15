import type { TranslationKey } from '@/types';

export interface SeasonInfo {
  key: Extract<
    TranslationKey,
    'season_dabbunde' | 'season_ceedu' | 'season_ndungu' | 'season_kawle'
  >;
  icon: string;
}

/**
 * Sahelian seasons mapping by month (0=Jan..11=Dec):
 * - Dec, Jan, Feb (11, 0, 1) → Dabbunde (cool dry)
 * - Mar, Apr, May (2, 3, 4)  → Ceedu (hot dry)
 * - Jun..Sep (5, 6, 7, 8)    → Ndungu (rainy)
 * - Oct, Nov (9, 10)         → Kawle (harvest / transition)
 */
export function getSeason(month: number): SeasonInfo {
  if ([11, 0, 1].includes(month)) return { key: 'season_dabbunde', icon: '❄️' };
  if ([2, 3, 4].includes(month)) return { key: 'season_ceedu', icon: '☀️' };
  if ([5, 6, 7, 8].includes(month)) return { key: 'season_ndungu', icon: '🌧️' };
  return { key: 'season_kawle', icon: '🌾' };
}
