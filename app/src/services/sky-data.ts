/**
 * Sky data fetcher — loads star catalogue and constellation line patterns
 * from the d3-celestial open data repository (MIT licensed).
 *
 * Data is fetched once at runtime, cached in memory, and additionally cached
 * by the service worker (workbox runtimeCaching) for offline use after the
 * first load.
 *
 * Source: https://github.com/ofrohn/d3-celestial/tree/master/data
 *   - stars.6.json:  ~5000 stars down to apparent magnitude 6
 *   - constellations.lines.json: Stellarium-derived line patterns
 */

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/ofrohn/d3-celestial@master/data';
const STARS_URL = `${CDN_BASE}/stars.6.json`;
const LINES_URL = `${CDN_BASE}/constellations.lines.json`;

export interface CatalogStar {
  /** Right ascension in hours (0..24) */
  ra: number;
  /** Declination in degrees (-90..90) */
  dec: number;
  /** Apparent magnitude (lower = brighter) */
  mag: number;
  /** B-V color index, used for star color */
  bv?: number;
  /** Proper name when available (Sirius, Vega…), else Bayer designation */
  name?: string;
}

export interface ConstellationLineSet {
  iau: string;
  /** Array of polylines; each polyline is a series of [RA hours, Dec degrees]. */
  polylines: Array<Array<[number, number]>>;
}

let starsCache: CatalogStar[] | null = null;
let linesCache: ConstellationLineSet[] | null = null;
let starsPromise: Promise<CatalogStar[]> | null = null;
let linesPromise: Promise<ConstellationLineSet[]> | null = null;

interface RawStarFeature {
  properties?: {
    name?: string;
    desig?: string;
    mag?: number;
    bv?: number;
  };
  geometry?: {
    coordinates?: [number, number];
  };
}

interface RawLineFeature {
  id?: string;
  geometry?: {
    type?: 'MultiLineString' | 'LineString';
    coordinates?: number[][][] | number[][];
  };
}

/**
 * d3-celestial encodes RA as longitude in degrees (-180..180), where negative
 * values represent RA > 12h (180°). Convert to standard RA hours [0..24).
 */
function lonToRaHours(lon: number): number {
  const deg = lon < 0 ? lon + 360 : lon;
  return (deg / 15) % 24;
}

/** Fetch and parse the star catalogue. Cached in memory after first call. */
export async function loadStars(): Promise<CatalogStar[]> {
  if (starsCache) return starsCache;
  if (starsPromise) return starsPromise;

  starsPromise = fetch(STARS_URL, { cache: 'force-cache' })
    .then((r) => {
      if (!r.ok) throw new Error(`Stars HTTP ${r.status}`);
      return r.json();
    })
    .then((json: { features?: RawStarFeature[] }) => {
      const features = json.features ?? [];
      const stars: CatalogStar[] = [];
      for (const f of features) {
        const coords = f.geometry?.coordinates;
        const props = f.properties;
        if (!coords || !props || typeof props.mag !== 'number') continue;
        stars.push({
          ra: lonToRaHours(coords[0]),
          dec: coords[1],
          mag: props.mag,
          bv: props.bv,
          name: props.desig ?? props.name,
        });
      }
      starsCache = stars;
      return stars;
    })
    .catch((err) => {
      console.warn('Sky data: failed to load stars', err);
      starsPromise = null;
      return [];
    });

  return starsPromise;
}

/** Fetch and parse the constellation line patterns. */
export async function loadConstellationLines(): Promise<ConstellationLineSet[]> {
  if (linesCache) return linesCache;
  if (linesPromise) return linesPromise;

  linesPromise = fetch(LINES_URL, { cache: 'force-cache' })
    .then((r) => {
      if (!r.ok) throw new Error(`Lines HTTP ${r.status}`);
      return r.json();
    })
    .then((json: { features?: RawLineFeature[] }) => {
      const features = json.features ?? [];
      const sets: ConstellationLineSet[] = [];
      for (const f of features) {
        const iau = f.id ?? '';
        const geom = f.geometry;
        if (!geom?.coordinates) continue;
        const polylines: Array<Array<[number, number]>> = [];
        const raw = geom.coordinates;
        const lines: number[][][] =
          geom.type === 'LineString' ? [raw as number[][]] : (raw as number[][][]);

        for (const line of lines) {
          const points: Array<[number, number]> = [];
          for (const point of line) {
            if (!Array.isArray(point) || point.length < 2) continue;
            const lon = point[0] as number;
            const lat = point[1] as number;
            points.push([lonToRaHours(lon), lat]);
          }
          if (points.length >= 2) polylines.push(points);
        }
        if (polylines.length > 0) sets.push({ iau, polylines });
      }
      linesCache = sets;
      return sets;
    })
    .catch((err) => {
      console.warn('Sky data: failed to load constellation lines', err);
      linesPromise = null;
      return [];
    });

  return linesPromise;
}

/** Are the catalogues loaded and ready to render? */
export function isSkyDataReady(): boolean {
  return starsCache !== null && linesCache !== null;
}

/** Synchronous read of the star catalogue (empty array if not yet loaded). */
export function getStarsSync(): CatalogStar[] {
  return starsCache ?? [];
}

/** Synchronous read of the constellation line catalogue. */
export function getLinesSync(): ConstellationLineSet[] {
  return linesCache ?? [];
}

/** Preload both datasets concurrently. */
export async function preloadSkyData(): Promise<void> {
  await Promise.all([loadStars(), loadConstellationLines()]);
}

/**
 * Convert a B-V color index to an approximate RGB color string.
 * Reference: stellar classification → blue → white → yellow → orange → red.
 */
export function bvToColor(bv: number | undefined): string {
  if (bv === undefined || isNaN(bv)) return '#fbf2d8';
  if (bv < -0.20) return '#9bb0ff'; // O/B blue
  if (bv <  0.00) return '#aabfff'; // B blue-white
  if (bv <  0.30) return '#cad7ff'; // A white-blue
  if (bv <  0.58) return '#f8f7ff'; // F white
  if (bv <  0.81) return '#fff4ea'; // G yellow-white
  if (bv <  1.40) return '#ffd2a1'; // K orange
  return '#ffb56b';                  // M red
}
