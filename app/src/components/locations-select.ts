import { state } from '@/state/app-state';
import { loadLocations, type SavedLocation } from '@/services/locations';

/** Render the saved-locations dropdown in the dashboard header. */
export function renderLocationsSelect(): void {
  const select = document.getElementById('locations-select') as HTMLSelectElement | null;
  if (!select) return;

  const locations = loadLocations();
  select.innerHTML = '';

  for (const loc of locations) {
    const opt = document.createElement('option');
    opt.value = loc.id;
    opt.textContent = loc.name;
    opt.dataset.lat = String(loc.lat);
    opt.dataset.lon = String(loc.lon);
    if (Math.abs(loc.lat - state.lat) < 0.01 && Math.abs(loc.lon - state.lon) < 0.01) {
      opt.selected = true;
    }
    select.appendChild(opt);
  }
}

/** Resolve a location id back to its lat/lon record. */
export function findLocationById(id: string): SavedLocation | undefined {
  return loadLocations().find((l) => l.id === id);
}
