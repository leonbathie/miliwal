export type AstroEventType =
  | 'eclipse-solar'
  | 'eclipse-lunar'
  | 'supermoon'
  | 'meteor-shower'
  | 'conjunction'
  | 'opposition'
  | 'solstice'
  | 'equinox';

export interface AstroEvent {
  date: string;            // ISO date YYYY-MM-DD (or YYYY-MM-DD..YYYY-MM-DD for ranges)
  type: AstroEventType;
  titleFr: string;
  titleEn: string;
  titleFf: string;
  descFr: string;
  descEn: string;
  descFf: string;
  visibleInWestAfrica: boolean;
  icon: string;
}

/**
 * Curated astronomical events for 2026, with a focus on what is observable
 * from West Africa (Sahel, Senegal, Mali, Niger, etc.). Dates are kept to
 * the start of the event window when applicable.
 */
export const ASTRO_EVENTS_2026: AstroEvent[] = [
  {
    date: '2026-01-03',
    type: 'meteor-shower',
    titleFr: 'Quadrantides',
    titleEn: 'Quadrantids',
    titleFf: 'Quadrantides',
    descFr: 'Pluie d’étoiles d’hiver, pic court mais intense.',
    descEn: 'Winter meteor shower, short but intense peak.',
    descFf: 'Toɓo koode jamma jaangol, jaltinaaki.',
    visibleInWestAfrica: true,
    icon: '☄️',
  },
  {
    date: '2026-02-17',
    type: 'eclipse-solar',
    titleFr: 'Éclipse annulaire de Soleil',
    titleEn: 'Annular Solar Eclipse',
    titleFf: 'Naange muurnaade',
    descFr: 'Visible depuis l’Antarctique ; partielle en Afrique australe.',
    descEn: 'Visible from Antarctica; partial in southern Africa.',
    descFf: 'Yiyetee e Antarctique; jaambar e Afrigaa.',
    visibleInWestAfrica: false,
    icon: '☀️',
  },
  {
    date: '2026-03-03',
    type: 'eclipse-lunar',
    titleFr: 'Éclipse totale de Lune',
    titleEn: 'Total Lunar Eclipse',
    titleFf: 'Leeuru muurnaade',
    descFr: 'Visible en Afrique de l’Ouest tôt le matin.',
    descEn: 'Visible from West Africa in the early morning.',
    descFf: 'Yiyetee e Afrigaa subaka.',
    visibleInWestAfrica: true,
    icon: '🌑',
  },
  {
    date: '2026-03-20',
    type: 'equinox',
    titleFr: 'Équinoxe de printemps',
    titleEn: 'Vernal Equinox',
    titleFf: 'Caka hitaande',
    descFr: 'Jour et nuit de durée égale.',
    descEn: 'Day and night of equal length.',
    descFf: 'Ñalawma e jamma poti tagne.',
    visibleInWestAfrica: true,
    icon: '🌗',
  },
  {
    date: '2026-05-04',
    type: 'meteor-shower',
    titleFr: 'Êta Aquarides',
    titleEn: 'Eta Aquarids',
    titleFf: 'Êta Aquarides',
    descFr: 'Pluie d’étoiles issue de la comète de Halley, visible avant l’aube.',
    descEn: 'Halley’s comet remnants, best before dawn.',
    descFf: 'Toɓo koode adatto fajiri.',
    visibleInWestAfrica: true,
    icon: '☄️',
  },
  {
    date: '2026-06-21',
    type: 'solstice',
    titleFr: 'Solstice d’été',
    titleEn: 'Summer Solstice',
    titleFf: 'Solstice jaltal',
    descFr: 'Jour le plus long de l’année dans l’hémisphère Nord.',
    descEn: 'Longest day of the year in the Northern Hemisphere.',
    descFf: 'Ñalawma juutɗo no feewi rewo.',
    visibleInWestAfrica: true,
    icon: '☀️',
  },
  {
    date: '2026-08-12',
    type: 'meteor-shower',
    titleFr: 'Perséides',
    titleEn: 'Perseids',
    titleFf: 'Perséides',
    descFr: 'L’une des plus belles pluies d’étoiles de l’année — pic vers le 12 août.',
    descEn: 'One of the year’s most beautiful meteor showers — peak around Aug 12.',
    descFf: 'Toɓo koode burɗo yooɗde e hitaande.',
    visibleInWestAfrica: true,
    icon: '☄️',
  },
  {
    date: '2026-08-17',
    type: 'eclipse-solar',
    titleFr: 'Éclipse totale de Soleil',
    titleEn: 'Total Solar Eclipse',
    titleFf: 'Naange muurnaade timmunde',
    descFr: 'Traverse l’Islande et l’Espagne ; partielle en Europe et Afrique du Nord.',
    descEn: 'Path through Iceland and Spain; partial in Europe and N. Africa.',
    descFf: 'Naange muurnaade timmunde, yiyetee e Espagne.',
    visibleInWestAfrica: false,
    icon: '🌑',
  },
  {
    date: '2026-09-23',
    type: 'equinox',
    titleFr: 'Équinoxe d’automne',
    titleEn: 'Autumnal Equinox',
    titleFf: 'Caka hitaande peewngal',
    descFr: 'Jour et nuit de durée égale, basculement vers les longues nuits.',
    descEn: 'Day and night of equal length, start of long nights.',
    descFf: 'Ñalawma e jamma poti, jamma juutɗi puɗɗii.',
    visibleInWestAfrica: true,
    icon: '🌗',
  },
  {
    date: '2026-10-21',
    type: 'meteor-shower',
    titleFr: 'Orionides',
    titleEn: 'Orionids',
    titleFf: 'Orionides',
    descFr: 'Issues de la comète de Halley également, observables fin octobre.',
    descEn: 'Also from Halley’s comet, visible late October.',
    descFf: 'Toɓo koode caggal sektaaru.',
    visibleInWestAfrica: true,
    icon: '☄️',
  },
  {
    date: '2026-12-14',
    type: 'meteor-shower',
    titleFr: 'Géminides',
    titleEn: 'Geminids',
    titleFf: 'Géminides',
    descFr: 'Pluie d’étoiles très active, idéale en décembre.',
    descEn: 'Highly active meteor shower, perfect for December.',
    descFf: 'Toɓo koode jamma desembar.',
    visibleInWestAfrica: true,
    icon: '☄️',
  },
  {
    date: '2026-12-21',
    type: 'solstice',
    titleFr: 'Solstice d’hiver',
    titleEn: 'Winter Solstice',
    titleFf: 'Solstice jaangol',
    descFr: 'Nuit la plus longue de l’année (hémisphère Nord).',
    descEn: 'Longest night of the year (Northern Hemisphere).',
    descFf: 'Jamma juutɗo no feewi rewo.',
    visibleInWestAfrica: true,
    icon: '❄️',
  },
];

/** Get all events that fall on/after the given date, sorted ascending. */
export function upcomingEvents(now: Date = new Date(), limit = 6): AstroEvent[] {
  const today = now.toISOString().slice(0, 10);
  return ASTRO_EVENTS_2026
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}
