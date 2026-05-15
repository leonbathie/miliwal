import {
  Body,
  Equator,
  Horizon,
  Illumination,
  Observer,
} from 'astronomy-engine';

export interface PlanetInfo {
  body: Body;
  name: string;
  altitudeDeg: number;
  azimuthDeg: number;
  ra: number;          // hours
  dec: number;         // degrees
  distanceAU: number;
  magnitude: number;   // visual brightness
  visible: boolean;    // altitude > 0
  illumination: number;// phase fraction (0..1)
}

const VISIBLE_PLANETS: Array<{ body: Body; name: string }> = [
  { body: Body.Mercury, name: 'Mercure' },
  { body: Body.Venus,   name: 'Vénus' },
  { body: Body.Mars,    name: 'Mars' },
  { body: Body.Jupiter, name: 'Jupiter' },
  { body: Body.Saturn,  name: 'Saturne' },
  { body: Body.Uranus,  name: 'Uranus' },
  { body: Body.Neptune, name: 'Neptune' },
];

/**
 * Compute the positions of the naked-eye + telescope planets for a given
 * observer at a given time. Returns each planet's RA/Dec, horizontal Alt/Az,
 * visual magnitude and visibility.
 */
export function computePlanets(date: Date, lat: number, lon: number): PlanetInfo[] {
  const observer = new Observer(lat, lon, 0);
  return VISIBLE_PLANETS.map(({ body, name }) => {
    const eq = Equator(body, date, observer, true, true);
    const hor = Horizon(date, observer, eq.ra, eq.dec, 'normal');
    const illum = Illumination(body, date);
    return {
      body,
      name,
      altitudeDeg: hor.altitude,
      azimuthDeg: hor.azimuth,
      ra: eq.ra,
      dec: eq.dec,
      distanceAU: eq.dist,
      magnitude: illum.mag,
      visible: hor.altitude > 0,
      illumination: illum.phase_fraction,
    };
  });
}

/** Sort planets: visible first (brightest first), then below horizon. */
export function sortPlanetsByVisibility(planets: PlanetInfo[]): PlanetInfo[] {
  return [...planets].sort((a, b) => {
    if (a.visible && !b.visible) return -1;
    if (!a.visible && b.visible) return 1;
    if (a.visible) return a.magnitude - b.magnitude; // brightest first
    return b.altitudeDeg - a.altitudeDeg; // closest to horizon first
  });
}
