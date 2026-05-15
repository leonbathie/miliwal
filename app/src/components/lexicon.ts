import { state } from '@/state/app-state';
import { t } from '@/i18n';

interface LexiconCategory {
  title: string;
  data: string;
}

/** Render the lexicon cards for the current language. */
export function buildLexicon(): void {
  const container = document.getElementById('lexicon-container');
  if (!container) return;
  container.innerHTML = '';

  const dict = t(state.lang);
  const categories: LexiconCategory[] = [
    { title: dict.lex_days, data: dict.lex_days_list },
    { title: dict.lex_moments, data: dict.lex_moments_list },
    { title: dict.lex_seasons, data: dict.lex_seasons_list },
    { title: dict.lex_astro, data: dict.lex_astro_list },
  ];

  categories.forEach((cat) => {
    const itemsHTML = cat.data
      .split('|')
      .map((item) => {
        const parts = item.split(':');
        const left = parts[0]?.trim() ?? '';
        const right = parts[1]?.trim() ?? '';
        return `<li><strong>${left}</strong> : ${right}</li>`;
      })
      .join('');
    container.insertAdjacentHTML(
      'beforeend',
      `<div class="card"><h3>${cat.title}</h3><ul>${itemsHTML}</ul></div>`,
    );
  });
}
