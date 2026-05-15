/** Format a Right Ascension value (in radians) as "Hh Mm Ss". */
export function formatRA(radians: number): string {
  let hours = (radians * 180 / Math.PI) / 15;
  if (hours < 0) hours += 24;
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  const s = Math.round((((hours - h) * 60) - m) * 60);
  return `${h}h ${m}m ${s}s`;
}

/** Format a Declination value (in radians) as "±D° M' S\"". */
export function formatDec(radians: number): string {
  let degrees = radians * 180 / Math.PI;
  const sign = degrees >= 0 ? '+' : '-';
  degrees = Math.abs(degrees);
  const d = Math.floor(degrees);
  const m = Math.floor((degrees - d) * 60);
  const s = Math.round((((degrees - d) * 60) - m) * 60);
  return `${sign}${d}° ${m}' ${s}"`;
}
