/** Pad an integer to N digits with leading zeros. */
export function pad(n: number, width = 2): string {
  return String(n).padStart(width, '0');
}

/** Format a Date as HH:MM (24h). Returns "--:--" for null/invalid. */
export function formatTimeOnly(date: Date | null | undefined): string {
  if (!date || isNaN(date.getTime())) return '--:--';
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Format hours:minutes:seconds */
export function formatHMS(h: number, m: number, s: number): string {
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/**
 * Convert JS Date weekday to Monday-based index (0 = Monday, 6 = Sunday).
 * Standard JS Date.getDay() returns 0=Sunday..6=Saturday.
 */
export function mondayBasedIndex(date: Date): number {
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
}

/** Format an ISO date (YYYY-MM-DDTHH:MM) to extract the time portion. */
export function extractTimeFromIso(iso: string): string {
  const parts = iso.split('T');
  return parts[1] ?? '';
}
