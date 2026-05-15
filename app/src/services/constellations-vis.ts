import { Horizon, Observer } from 'astronomy-engine';
import { CONSTELLATIONS, type ConstellationData } from '@/data/constellations';

export interface VisibleConstellation extends ConstellationData {
  altitudeDeg: number;
  azimuthDeg: number;
  visible: boolean;
}

/**
 * For each catalogued constellation, compute its current horizontal position
 * from the observer's site and flag whether its center is above the horizon.
 * Sorted: visible first (highest first), then below-horizon by altitude.
 */
export function visibleConstellations(date: Date, lat: number, lon: number): VisibleConstellation[] {
  const observer = new Observer(lat, lon, 0);
  const results: VisibleConstellation[] = CONSTELLATIONS.map((c) => {
    const hor = Horizon(date, observer, c.ra, c.dec, 'normal');
    return {
      ...c,
      altitudeDeg: hor.altitude,
      azimuthDeg: hor.azimuth,
      visible: hor.altitude > 0,
    };
  });

  results.sort((a, b) => {
    if (a.visible && !b.visible) return -1;
    if (!a.visible && b.visible) return 1;
    return b.altitudeDeg - a.altitudeDeg;
  });

  return results;
}

/** Convert azimuth degrees to a compass direction (16-point). */
export function azimuthToCompass(deg: number): string {
  const points = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                  'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  const idx = Math.round((deg % 360) / 22.5) % 16;
  return points[idx]!;
}
