/**
 * Build a Hijri calendar grid for a given Hijri year, using the browser's
 * native Umm al-Qura calendar via Intl.DateTimeFormat.
 *
 * For each Hijri month we list every day with its corresponding Gregorian date.
 * This avoids hand-coded Hijri tables (which drift with reforms).
 */

export interface HijriDay {
  hijriDay: number;        // 1..30
  hijriMonth: number;      // 1..12
  hijriYear: number;
  gregorian: Date;
}

export interface HijriMonth {
  hijriMonth: number;      // 1..12
  hijriYear: number;
  days: HijriDay[];
}

/** Convert a Gregorian Date to the Hijri triple (day, month, year). */
function gregToHijri(date: Date): { day: number; month: number; year: number } {
  const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    calendar: 'islamic-umalqura',
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? '0';

  return {
    day: parseInt(get('day'), 10),
    month: parseInt(get('month'), 10),
    year: parseInt(get('year'), 10),
  };
}

/**
 * Build the full Hijri grid for the Hijri year that contains the given
 * Gregorian reference date. Returns 12 months, each with its days mapped
 * to Gregorian dates.
 */
export function buildHijriGrid(reference: Date = new Date()): HijriMonth[] {
  const refHijri = gregToHijri(reference);
  const hijriYear = refHijri.year;

  // Walk day by day around the reference to fill all months of this Hijri year.
  // We scan ±400 days from the reference to be safe (max Hijri year ~ 355 days).
  const months: Map<number, HijriDay[]> = new Map();
  for (let m = 1; m <= 12; m++) months.set(m, []);

  const start = new Date(reference);
  start.setDate(start.getDate() - 400);
  for (let i = 0; i < 800; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const h = gregToHijri(d);
    if (h.year === hijriYear) {
      const list = months.get(h.month);
      if (list && !list.some((x) => x.hijriDay === h.day)) {
        list.push({
          hijriDay: h.day,
          hijriMonth: h.month,
          hijriYear: h.year,
          gregorian: new Date(d),
        });
      }
    }
  }

  const result: HijriMonth[] = [];
  for (let m = 1; m <= 12; m++) {
    const days = (months.get(m) ?? []).sort((a, b) => a.hijriDay - b.hijriDay);
    result.push({ hijriMonth: m, hijriYear, days });
  }
  return result;
}

/** Current Hijri year for "now". */
export function currentHijriYear(now: Date = new Date()): number {
  return gregToHijri(now).year;
}
