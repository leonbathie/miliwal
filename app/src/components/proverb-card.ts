import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { proverbOfDay } from '@/data/proverbs';
import { setText, setHTML } from '@/utils/dom';
import { speakText } from '@/services/speech';
import { speechLangCode } from '@/i18n';

let currentProverbFf = '';

/** Render the daily Fulfulde proverb with localized translation. */
export function renderProverb(): void {
  const proverb = proverbOfDay();
  currentProverbFf = proverb.ff;

  const dict = t(state.lang);

  setText('proverb-ff', `« ${proverb.ff} »`);

  const translation = state.lang === 'fr' ? proverb.fr
    : state.lang === 'en' ? proverb.en
    : proverb.fr; // when UI is ff, show French translation as gloss

  setHTML('proverb-translation', `<em>${translation}</em>`);
  setText('proverb-title', dict.proverb_title);
}

/** Speak the current Fulfulde proverb aloud. */
export function speakProverb(): void {
  if (!currentProverbFf) return;
  // Always read the original Fulfulde line, with the FF speech tag.
  speakText(currentProverbFf, speechLangCode('ff'));
}
