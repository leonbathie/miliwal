const unitesFF: readonly string[] = [
  'sifir', 'gooto', 'ɗiɗi', 'tati', 'nay', 'joyi',
  'jeego', 'jeeɗiɗi', 'jeetati', 'jeenay',
];

const dizainesFF: Record<number, string> = {
  10: 'sappo',
  20: 'noogay',
  30: 'capanɗe tati',
  40: 'capanɗe nay',
  50: 'capanɗe joyi',
};

/** Convertit un entier 0-59 en Fulfulde. Au-delà, retourne le nombre en chaîne. */
export function nombreEnFulfulde(n: number | string): string {
  const num = typeof n === 'string' ? parseInt(n, 10) : Math.floor(n);
  if (isNaN(num) || num < 0 || num > 59) return String(n);
  if (num < 10) return unitesFF[num]!;
  if (dizainesFF[num]) return dizainesFF[num]!;
  const d = Math.floor(num / 10) * 10;
  const u = num % 10;
  return `${dizainesFF[d]} e ${unitesFF[u]}`;
}

/**
 * Convertit un temps (h, m, s) en Fulfulde.
 * Règle : l'unité (Yamnde, hojom/hojomaaji, leƳƳande) vient avant le nombre.
 */
export function tempsEnFulfulde(hours: number, minutes: number, seconds: number): string {
  const hStr = nombreEnFulfulde(hours);
  const mStr = nombreEnFulfulde(minutes);
  const sStr = nombreEnFulfulde(seconds);
  const mWord = minutes <= 1 ? 'hojom' : 'hojomaaji';
  const sWord = seconds <= 1 ? 'leƳƳande' : 'leƳƳanɗe';
  return `Yamnde ${hStr}, ${mWord} ${mStr}, ${sWord} ${sStr}`;
}

/** Lecture Fulfulde d'une température en degrés. */
export function temperatureEnFulfulde(temp: number): string {
  return `Tolno ngulɓuuɓdi ko ${Math.round(temp)}°`;
}

/** Lecture Fulfulde d'un degré (niveau). */
export function degreEnFulfulde(d: number): string {
  return `Tolno ${nombreEnFulfulde(Math.round(d))}°`;
}
