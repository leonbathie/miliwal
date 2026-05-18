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
    
    // Détecte si le fichier est une vidéo (.webm ou .mp4)
    const isVideo = item.photo?.match(/\.(webm|mp4)$/i);

    // On utilise "gallery-visual-photo" pour que l'image/vidéo remplisse 100% de la carte
    // avec object-fit: cover.
    const visual = item.photo
      ? (isVideo
        ? `<div class="gallery-visual gallery-visual-photo">
             <video src="${item.photo}" autoplay loop muted playsinline 
                    style="width: 100%; height: 100%; object-fit: cover; display: block;"
                    onerror="this.outerHTML='${safeSvg}';"></video>
           </div>`
        : `<div class="gallery-visual gallery-visual-photo">
             <img src="${item.photo}" alt="${title}" loading="lazy"
                  onerror="this.outerHTML='${safeSvg}';"/>
           </div>`)
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
