import {
  NextGlobalSolarEclipse,
  NextLunarEclipse,
  SearchGlobalSolarEclipse,
  SearchLunarEclipse,
} from 'astronomy-engine';

export type EclipseKind = 'penumbral' | 'partial' | 'total' | 'annular' | 'hybrid';

export interface ComputedEclipse {
  kind: EclipseKind | string;
  peak: Date;
  obscuration?: number;
  isLunar: boolean;
  /** For solar eclipses, the sub-solar point latitude/longitude at peak (greatest eclipse path). */
  latitude?: number;
  longitude?: number;
}

/** Find the next N solar + lunar eclipses globally, sorted by date. */
export function nextEclipses(from: Date = new Date(), count = 4): ComputedEclipse[] {
  const results: ComputedEclipse[] = [];

  // Lunar eclipses
  let lunar = SearchLunarEclipse(from);
  for (let i = 0; i < count; i++) {
    results.push({
      kind: lunar.kind,
      peak: lunar.peak.date,
      obscuration: lunar.obscuration,
      isLunar: true,
    });
    lunar = NextLunarEclipse(lunar.peak);
  }

  // Solar eclipses
  let solar = SearchGlobalSolarEclipse(from);
  for (let i = 0; i < count; i++) {
    results.push({
      kind: solar.kind,
      peak: solar.peak.date,
      obscuration: solar.obscuration,
      isLunar: false,
      latitude: solar.latitude,
      longitude: solar.longitude,
    });
    solar = NextGlobalSolarEclipse(solar.peak);
  }

  return results
    .sort((a, b) => a.peak.getTime() - b.peak.getTime())
    .slice(0, count * 2);
}
