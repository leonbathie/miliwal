import { state } from '@/state/app-state';
import { computePlanets, sortPlanetsByVisibility } from '@/services/planets';
import { azimuthToCompass } from '@/services/constellations-vis';
import { Body } from 'astronomy-engine';

const PLANET_GLYPHS: Record<string, string> = {
  [Body.Mercury]: '☿',
  [Body.Venus]: '♀',
  [Body.Mars]: '♂',
  [Body.Jupiter]: '♃',
  [Body.Saturn]: '♄',
  [Body.Uranus]: '♅',
  [Body.Neptune]: '♆',
};

/** Render the planets visibility card. */
export function renderPlanets(): void {
  const container = document.getElementById('planets-list');
  if (!container) return;

  const planets = sortPlanetsByVisibility(
    computePlanets(new Date(), state.lat, state.lon),
  );

  container.innerHTML = planets
    .map((p) => {
      const glyph = PLANET_GLYPHS[p.body] ?? '●';
      const visClass = p.visible ? 'is-visible' : 'is-below';
      const altText = p.visible
        ? `${p.altitudeDeg.toFixed(1)}° au-dessus`
        : `${Math.abs(p.altitudeDeg).toFixed(1)}° sous l'horizon`;
      return `
        <div class="planet-row ${visClass}">
          <span class="planet-glyph">${glyph}</span>
          <div class="planet-info">
            <div class="planet-name">${p.name}</div>
            <div class="planet-sub">
              mag ${p.magnitude.toFixed(1)} · ${altText} · ${azimuthToCompass(p.azimuthDeg)}
            </div>
          </div>
          <span class="planet-status">${p.visible ? '●' : '○'}</span>
        </div>
      `;
    })
    .join('');
}
