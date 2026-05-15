export interface HijriDate {
  day: number;
  month: number;       // 1-12
  monthName: string;   // localized full name
  year: number;
  formatted: string;   // localized full date
}

const HIJRI_MONTHS: Record<string, string[]> = {
  fr: [
    'Muharram', 'Safar', 'Rabi’ al-Awwal', 'Rabi’ al-Thani',
    'Joumada al-Oula', 'Joumada al-Thania', 'Rajab', 'Cha’ban',
    'Ramadan', 'Chawwal', 'Dhou al-Qa’da', 'Dhou al-Hijja',
  ],
  en: [
    'Muharram', 'Safar', 'Rabi’ al-Awwal', 'Rabi’ al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha’ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi’dah', 'Dhu al-Hijjah',
  ],
  ff: [
    'Muharram', 'Safar', 'Rabi’ al-Awwal', 'Rabi’ al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha’ban',
    'Sumayee (Ramadan)', 'Juulde Koorka (Shawwal)', 'Dhu al-Qi’dah', 'Juulde Donkin (Dhu al-Hijjah)',
  ],
};

/**
 * Convert a Gregorian date to the Hijri (Umm al-Qura) calendar using the
 * browser's Intl.DateTimeFormat API — natively supported in modern engines.
 */
export function toHijri(date: Date, lang: 'fr' | 'en' | 'ff' = 'fr'): HijriDate {
  const locale = lang === 'en' ? 'en-u-ca-islamic-umalqura' : 'fr-u-ca-islamic-umalqura';

  const parts = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    calendar: 'islamic-umalqura',
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? '';

  const day = parseInt(get('day'), 10);
  const month = parseInt(get('month'), 10);
  const year = parseInt(get('year'), 10);

  const monthName = HIJRI_MONTHS[lang]?.[month - 1]
    ?? HIJRI_MONTHS.en?.[month - 1]
    ?? String(month);

  const formatted = `${day} ${monthName} ${year} H`;

  return { day, month, monthName, year, formatted };
}
