import { state } from '@/state/app-state';
import { GALLERY, type GalleryItem } from '@/data/gallery';
import { illustration } from '@/components/illustrations';

function pickTitle(item: GalleryItem, lang: 'fr' | 'en' | 'ff'): string {
  return lang === 'en' ? item.titleEn : lang === 'ff' ? item.titleFf : item.titleFr;
}

function pickDesc(item: GalleryItem, lang: 'fr' | 'en' | 'ff'): string {
  return lang === 'en' ? item.descEn : lang === 'ff' ? item.descFf : item.descFr;
}

/**
 * Render the cultural gallery: a horizontal scrollable strip of tiles, each
 * with a photo (if provided) or its SVG illustration fallback, plus title
 * and description in the current language.
 *
 * The `<img onerror>` handler swaps in the SVG illustration if a photo URL
 * is set but fails to load — graceful degradation when users drop missing
 * files into /public/gallery/.
 */
export function renderGallery(): void {
  const container = document.getElementById('gallery-list');
  if (!container) return;

  const lang = state.lang;

  container.innerHTML = GALLERY.map((item) => {
    const title = pickTitle(item, lang);
    const desc = pickDesc(item, lang);
    const svgFallback = illustration(item.illustration, {
      width: 90,
      height: 90,
      className: 'gallery-illu',
    });

    const safeSvg = svgFallback.replace(/'/g, '&#39;').replace(/"/g, '&quot;');

    // On utilise class="gallery-illu" pour que l'image prenne exactement
    // le même espace et les mêmes dimensions que le SVG d'origine.
    const visual = item.photo
      ? `
        <div class="gallery-visual">
          <img src="${item.photo}" alt="${title}" loading="lazy" class="gallery-illu" style="border-radius: 8px;"
               onerror="this.outerHTML='${safeSvg}';"/>
        </div>`
      : `<div class="gallery-visual">${svgFallback}</div>`;

    return `
      <article class="gallery-card">
        ${visual}
        <h4 class="gallery-title">${title}</h4>
        <p class="gallery-desc">${desc}</p>
      </article>
    `;
  }).join('');
}
