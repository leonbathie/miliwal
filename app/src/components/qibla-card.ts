import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { qiblaBearing, distanceToMecca, bearingToCompass } from '@/services/qibla';

/**
 * Update the dedicated Qibla card AND the Qibla needle overlay on the
 * astronomical compass (third indicator alongside Sun and Moon).
 */
export function renderQibla(): void {
  const bearing = qiblaBearing(state.lat, state.lon);
  const distance = distanceToMecca(state.lat, state.lon);
  const dict = t(state.lang);

  const bearingEl = document.getElementById('qibla-bearing');
  if (bearingEl) {
    bearingEl.textContent = `${bearing.toFixed(1)}° ${bearingToCompass(bearing)}`;
  }

  const distanceEl = document.getElementById('qibla-distance');
  if (distanceEl) {
    distanceEl.textContent = `${distance.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} km`;
  }

  const compassNeedle = document.getElementById('qibla-compass-needle');
  if (compassNeedle) {
    compassNeedle.style.transform = `rotate(${bearing}deg)`;
  }

  const overlay = document.getElementById('compass-qibla');
  if (overlay) {
    overlay.style.transform = `rotate(${bearing}deg)`;
    overlay.setAttribute('title', `${dict.qibla_label}: ${bearing.toFixed(1)}°`);
  }
}
