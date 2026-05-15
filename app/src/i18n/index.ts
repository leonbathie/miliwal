import type { I18nDict, Lang, Translations } from '@/types';
import { fr } from './fr';
import { en } from './en';
import { ff } from './ff';

export const i18n: I18nDict = { fr, en, ff };

export function t(lang: Lang): Translations {
  return i18n[lang];
}

export function speechLangCode(lang: Lang): string {
  switch (lang) {
    case 'ff':
      return 'ff-Latn';
    case 'en':
      return 'en-US';
    default:
      return 'fr-FR';
  }
}
