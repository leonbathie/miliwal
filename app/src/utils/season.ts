import type { TranslationKey } from '@/types';
import type { IllustrationName } from '@/components/illustrations';

export interface SeasonInfo {
  key: Extract<
    TranslationKey,
    'season_dabbunde' | 'season_ceedu' | 'season_ndungu' | 'season_kawle'
  >;
  icon: string;
  /** Cultural Pulaagu illustration that evokes this season's pastoral reality. */
  illustration: IllustrationName;
}

/**
 * Sahelian seasons mapping by month (0=Jan..11=Dec):
 * - Dec, Jan, Feb (11, 0, 1) → Dabbunde (cool dry) → calabash (storing dairy)
 * - Mar, Apr, May (2, 3, 4)  → Ceedu (hot dry)     → acacia (drought-tolerant)
 * - Jun..Sep (5, 6, 7, 8)    → Ndungu (rainy)      → zebu (cattle return to pasture)
 * - Oct, Nov (9, 10)         → Kawle (harvest)     → millet (sorghum/mil harvest)
 */
export function getSeason(month: number): SeasonInfo {
  if ([11, 0, 1].includes(month))
    return { key: 'season_dabbunde', icon: '❄️', illustration: 'calabash' };
  if ([2, 3, 4].includes(month))
    return { key: 'season_ceedu', icon: '☀️', illustration: 'acacia' };
  if ([5, 6, 7, 8].includes(month))
    return { key: 'season_ndungu', icon: '🌧️', illustration: 'zebu' };
  return { key: 'season_kawle', icon: '🌾', illustration: 'millet' };
}
