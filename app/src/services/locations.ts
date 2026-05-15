export interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

const STORAGE_KEY = 'fulfulde-cal:locations';

/** Default locations seeded the first time the user opens the app. */
export const DEFAULT_LOCATIONS: SavedLocation[] = [
  { id: 'dakar',      name: 'Dakar, Sénégal',         lat: 14.7167, lon: -17.4677 },
  { id: 'nouakchott', name: 'Nouakchott, Mauritanie', lat: 18.0735, lon: -15.9582 },
  { id: 'bamako',     name: 'Bamako, Mali',           lat: 12.6392, lon: -8.0029 },
  { id: 'niamey',     name: 'Niamey, Niger',          lat: 13.5117, lon: 2.1251 },
  { id: 'ndjamena',   name: 'N’Djamena, Tchad',       lat: 12.1348, lon: 15.0557 },
  { id: 'kano',       name: 'Kano, Nigeria',          lat: 12.0022, lon: 8.5920 },
  { id: 'conakry',    name: 'Conakry, Guinée',        lat: 9.6412,  lon: -13.5784 },
];

function isValidLocation(x: unknown): x is SavedLocation {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.lat === 'number' &&
    typeof o.lon === 'number'
  );
}

/** Load saved locations from localStorage; seed defaults on first run. */
export function loadLocations(): SavedLocation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveLocations(DEFAULT_LOCATIONS);
      return DEFAULT_LOCATIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_LOCATIONS;
    const valid = parsed.filter(isValidLocation);
    return valid.length > 0 ? valid : DEFAULT_LOCATIONS;
  } catch {
    return DEFAULT_LOCATIONS;
  }
}

/** Persist the location list. */
export function saveLocations(list: SavedLocation[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/** Add a new location (no duplicates by id). */
export function addLocation(loc: SavedLocation): SavedLocation[] {
  const list = loadLocations();
  if (list.some((l) => l.id === loc.id)) return list;
  const next = [...list, loc];
  saveLocations(next);
  return next;
}

/** Remove a location by id. */
export function removeLocation(id: string): SavedLocation[] {
  const next = loadLocations().filter((l) => l.id !== id);
  saveLocations(next);
  return next;
}
