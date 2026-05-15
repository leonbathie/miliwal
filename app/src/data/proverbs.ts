export interface Proverb {
  ff: string;        // Fulfulde
  fr: string;        // French translation
  en: string;        // English translation
  context?: string;  // optional cultural/ethical note
}

/**
 * Selected Fulfulde (Pulaar) proverbs. The corpus has been carefully chosen
 * for general life wisdom shared across the Fulani diaspora; translations
 * are kept literal-but-readable rather than poetic.
 */
export const PROVERBS: Proverb[] = [
  {
    ff: 'Neɗɗo ko jokkere enɗam.',
    fr: 'L’être humain, c’est la continuité du lien de parenté.',
    en: 'A person is the continuation of kinship ties.',
  },
  {
    ff: 'Munyal defan haako buuɗi.',
    fr: 'La patience cuit même la pierre.',
    en: 'Patience cooks even a stone.',
  },
  {
    ff: 'Ko buri yiide ko nanude.',
    fr: 'Mieux que voir, c’est entendre raconter.',
    en: 'Better than seeing is hearing told.',
  },
  {
    ff: 'Ɗo waawaa yahde, jiidaa.',
    fr: 'Là où l’on ne peut pas aller, on ne voit pas.',
    en: 'Where you cannot go, you cannot see.',
  },
  {
    ff: 'Ngenndi waɗay ɓernde teddunde.',
    fr: 'La terre natale fait le cœur lourd.',
    en: 'The homeland weighs on the heart.',
  },
  {
    ff: 'Nyaamuujo waɗay yaajɗo.',
    fr: 'Le glouton finit maigre.',
    en: 'The greedy one ends up thin.',
  },
  {
    ff: 'Halu juuɗe foti ko luuɓo.',
    fr: 'Les mains sales attirent les mouches.',
    en: 'Dirty hands attract flies.',
  },
  {
    ff: 'Aawde ko fii soñde.',
    fr: 'On sème pour récolter.',
    en: 'One sows in order to harvest.',
  },
  {
    ff: 'Ko ɗoftoraa rewaa, rewataa ɗoftoraaki.',
    fr: 'Ce qu’on suit en imitant, on l’imite sans suivre vraiment.',
    en: 'What is followed by imitation, is imitated without true following.',
  },
  {
    ff: 'Toɓo ina toɓa, ndiyam yara ɓesnga.',
    fr: 'La pluie tombe, l’eau abreuve les troupeaux.',
    en: 'The rain falls; the water nourishes the herds.',
  },
  {
    ff: 'Ngaynaako yiɗaa nai mum gallaaɗi.',
    fr: 'Le berger n’aime pas voir ses vaches maigres.',
    en: 'The shepherd does not like to see his cows thin.',
  },
  {
    ff: 'Naange fuɗay, naange muta.',
    fr: 'Le soleil se lève, le soleil se couche.',
    en: 'The sun rises, the sun sets.',
  },
  {
    ff: 'Leeuru tedduri sappo e ɗiɗi waqtu.',
    fr: 'La lune est pleine douze fois (par an).',
    en: 'The moon is full twelve times (a year).',
  },
  {
    ff: 'Henndu fuɗɗetaake, gaynataako.',
    fr: 'Le vent ne se commence ni ne se termine.',
    en: 'The wind has no beginning, no end.',
  },
  {
    ff: 'Ngalu walaa, dawaadi walaa.',
    fr: 'Sans pluie, pas de troupeaux.',
    en: 'Without rain, no herds.',
  },
  {
    ff: 'Jokku enɗam, jokku ɗerewol.',
    fr: 'Maintiens la parenté, maintiens le lien.',
    en: 'Maintain kinship, maintain the bond.',
  },
  {
    ff: 'Ko goonga taƴaani, fenaande ina taƴa.',
    fr: 'La vérité ne se rompt pas, le mensonge se rompt.',
    en: 'Truth does not break; lies do.',
  },
  {
    ff: 'Hakkille buri doole.',
    fr: 'L’intelligence vaut mieux que la force.',
    en: 'Wisdom is worth more than strength.',
  },
  {
    ff: 'Jeebal ko ɗow leydi e dow asamaan.',
    fr: 'La connaissance est sur la terre et dans le ciel.',
    en: 'Knowledge is on the earth and in the sky.',
  },
  {
    ff: 'Ko huɓɓi koy yelɓa, ko yelɓi koy huɓɓa.',
    fr: 'Ce qui brûle s’éteint, ce qui s’éteint peut rebrûler.',
    en: 'What burns goes out; what goes out can burn again.',
  },
  {
    ff: 'Geɗal goonga waɗay neɗɗo teddudo.',
    fr: 'Un mot vrai rend une personne respectable.',
    en: 'A true word makes a person worthy of respect.',
  },
  {
    ff: 'Saare e koolol mum.',
    fr: 'Chaque village avec son sentier.',
    en: 'Every village has its own path.',
  },
  {
    ff: 'Defde mawnde, nyaamde seeɗa.',
    fr: 'Grande cuisine, petite portion.',
    en: 'Large cooking, small portion.',
  },
  {
    ff: 'Jam waɗay neɗɗo, fitina warta.',
    fr: 'La paix construit l’homme, le trouble le détruit.',
    en: 'Peace builds a person; strife destroys them.',
  },
  {
    ff: 'Naange yantaani caggal pucca.',
    fr: 'Le soleil ne se couche pas derrière un cheval.',
    en: 'The sun does not set behind a horse.',
    context: 'Le destin est plus grand que tout galop.',
  },
  {
    ff: 'Banndiraagal alaa coggu.',
    fr: 'La fraternité n’a pas de prix.',
    en: 'Brotherhood has no price.',
  },
  {
    ff: 'Ngaynaako gontay e nai mum.',
    fr: 'Le berger devient comme ses vaches.',
    en: 'The shepherd becomes like his cattle.',
  },
  {
    ff: 'Henndu nguleeki ina jippa.',
    fr: 'Le vent chaud (harmattan) finit par descendre.',
    en: 'The hot wind (harmattan) eventually subsides.',
  },
  {
    ff: 'Jokkere ɗum jamani.',
    fr: 'Le lien, c’est le temps.',
    en: 'The bond is time itself.',
  },
  {
    ff: 'Ngaynaaka ina yiya ko nai mum tunɗi.',
    fr: 'Le bon berger reconnaît la trace de ses vaches.',
    en: 'A true shepherd recognizes his cattle’s tracks.',
  },
];

/**
 * Deterministically pick the proverb for a given calendar day.
 * The day-of-year is mapped onto the proverb list with modulo, so the same
 * day always shows the same proverb across reloads.
 */
export function proverbOfDay(date: Date = new Date()): Proverb {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86_400_000);
  const idx = ((dayOfYear % PROVERBS.length) + PROVERBS.length) % PROVERBS.length;
  return PROVERBS[idx]!;
}
