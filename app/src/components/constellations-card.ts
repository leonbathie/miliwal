import { state } from '@/state/app-state';
import { visibleConstellations, azimuthToCompass } from '@/services/constellations-vis';

/** Render the visible-constellations panel for the current observer + time. */
export function renderConstellations(): void {
  const container = document.getElementById('constellations-list');
  if (!container) return;

  const all = visibleConstellations(new Date(), state.lat, state.lon);
  const visible = all.filter((c) => c.visible).slice(0, 12);
  const lang = state.lang;

  if (visible.length === 0) {
    container.innerHTML = '<p class="events-empty">Aucune constellation au-dessus de l’horizon.</p>';
    return;
  }

  container.innerHTML = visible
    .map((c) => {
      const name = lang === 'en' ? c.nameEn : c.nameFr;
      return `
        <div class="constellation-row">
          <span class="constellation-iau">${c.iau}</span>
          <div class="constellation-info">
            <div class="constellation-name">${name}</div>
            <div class="constellation-sub">${c.nameLatin}</div>
          </div>
          <span class="constellation-alt">
            ${c.altitudeDeg.toFixed(0)}° · ${azimuthToCompass(c.azimuthDeg)}
          </span>
        </div>
      `;
    })
    .join('');
}
