import { nextEclipses, type ComputedEclipse } from '@/services/eclipses';
import { state } from '@/state/app-state';

const KIND_FR: Record<string, string> = {
  penumbral: 'pénombrale',
  partial: 'partielle',
  total: 'totale',
  annular: 'annulaire',
  hybrid: 'hybride',
};

const KIND_EN: Record<string, string> = {
  penumbral: 'penumbral',
  partial: 'partial',
  total: 'total',
  annular: 'annular',
  hybrid: 'hybrid',
};

function formatKind(kind: string, lang: 'fr' | 'en' | 'ff'): string {
  const map = lang === 'en' ? KIND_EN : KIND_FR;
  return map[kind] ?? kind;
}

function formatDate(d: Date, lang: 'fr' | 'en' | 'ff'): string {
  const locale = lang === 'en' ? 'en-US' : 'fr-FR';
  return d.toLocaleString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Render the next solar + lunar eclipses globally, ordered by date. */
export function renderComputedEclipses(): void {
  const container = document.getElementById('eclipses-list');
  if (!container) return;

  const list = nextEclipses(new Date(), 4);
  const lang = state.lang;

  container.innerHTML = list
    .map((e: ComputedEclipse) => {
      const type = e.isLunar ? '🌑' : '☀️';
      const label = e.isLunar
        ? (lang === 'en' ? 'Lunar Eclipse' : 'Éclipse de Lune')
        : (lang === 'en' ? 'Solar Eclipse' : 'Éclipse de Soleil');
      const subtitle = formatKind(String(e.kind), lang);
      const obs = e.obscuration !== undefined ? ` · ${(e.obscuration * 100).toFixed(0)}% obs.` : '';
      const path = (!e.isLunar && e.latitude !== undefined && e.longitude !== undefined)
        ? `<br><small>Pic au sol : ${e.latitude.toFixed(1)}°, ${e.longitude.toFixed(1)}°</small>`
        : '';
      return `
        <div class="eclipse-row">
          <span class="eclipse-icon">${type}</span>
          <div class="eclipse-body">
            <div class="eclipse-title">${label} — ${subtitle}${obs}${path}</div>
            <div class="eclipse-date">${formatDate(e.peak, lang)}</div>
          </div>
        </div>
      `;
    })
    .join('');
}
