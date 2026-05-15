/**
 * SVG icon library — Lucide-inspired stroke style, 24×24 viewBox, stroke 1.75.
 * Each icon is a function returning an inline-ready SVG string. Designed to
 * inherit `currentColor` from the parent for color theming.
 */

export type IconName =
  | 'sun'
  | 'sun-medium'
  | 'cloud'
  | 'cloud-sun'
  | 'cloud-rain'
  | 'cloud-drizzle'
  | 'cloud-snow'
  | 'cloud-fog'
  | 'cloud-lightning'
  | 'snowflake'
  | 'wind'
  | 'droplet'
  | 'thermometer'
  | 'gauge'
  | 'eye'
  | 'sunrise'
  | 'sunset'
  | 'moon'
  | 'sparkles'
  | 'star'
  | 'compass'
  | 'navigation'
  | 'map-pin'
  | 'refresh-cw'
  | 'printer'
  | 'download'
  | 'volume-2'
  | 'kaaba'
  | 'mosque'
  | 'calendar'
  | 'book-open'
  | 'leaf'
  | 'plus'
  | 'chevron-right'
  | 'chevron-down'
  | 'meteor'
  | 'globe';

const SVG_OPEN =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';

const PATHS: Record<IconName, string> = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  'sun-medium': '<circle cx="12" cy="12" r="4"/><path d="M12 3v1M12 20v1M3 12h1M20 12h1M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7"/>',
  cloud: '<path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78A6 6 0 1 0 6 14h11.5z"/>',
  'cloud-sun': '<path d="M12 2v2M5.22 5.22l1.42 1.42M2 12h2M5.22 18.78l1.42-1.42M18.5 12h-1M15.7 6.3l-1 1"/><path d="M15 14a4 4 0 0 0-4-4 5 5 0 0 0-5 4.27A3.5 3.5 0 0 0 6.5 21h11a3 3 0 0 0 0-6 4 4 0 0 0-2.5-1z"/>',
  'cloud-rain': '<path d="M17.5 16a4.5 4.5 0 1 0-1.4-8.78A6 6 0 1 0 6 11h11.5z"/><path d="M8 19v2M12 19v3M16 19v2"/>',
  'cloud-drizzle': '<path d="M17.5 16a4.5 4.5 0 1 0-1.4-8.78A6 6 0 1 0 6 11h11.5z"/><path d="M8 19h.01M12 21h.01M16 19h.01M8 22h.01M12 18h.01M16 22h.01"/>',
  'cloud-snow': '<path d="M17.5 16a4.5 4.5 0 1 0-1.4-8.78A6 6 0 1 0 6 11h11.5z"/><path d="M8 20h.01M12 18h.01M12 22h.01M16 20h.01M16 16h.01M8 16h.01"/>',
  'cloud-fog': '<path d="M17.5 15a4.5 4.5 0 1 0-1.4-8.78A6 6 0 1 0 6 10h11.5z"/><path d="M3 19h18M5 22h14"/>',
  'cloud-lightning': '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><path d="m13 12-3 5h4l-3 5"/>',
  snowflake: '<path d="M2 12h20M12 2v20M5 5l14 14M19 5L5 19M8 8l-3-1M8 8l1-3M16 8l3-1M16 8l-1-3M8 16l-3 1M8 16l1 3M16 16l3 1M16 16l-1 3"/>',
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  thermometer: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>',
  gauge: '<path d="M12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  sunrise: '<path d="M17 18a5 5 0 0 0-10 0M12 2v7M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M8 6l4-4 4 4"/>',
  sunset: '<path d="M17 18a5 5 0 0 0-10 0M12 9V2M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M16 5l-4 4-4-4"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sparkles: '<path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7zM5 17l.9 2.1L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-.9zM19 14l.7 1.6L21 16l-1.3.4L19 18l-.7-1.6L17 16l1.3-.4z"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  'map-pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  'refresh-cw': '<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/>',
  printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  'volume-2': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>',
  kaaba: '<rect x="4" y="6" width="16" height="14" rx="0.5"/><path d="M4 10h16M8 6V4l4-2 4 2v2M12 14h4"/>',
  mosque: '<path d="M3 21V11a3 3 0 0 1 3-3M21 21V11a3 3 0 0 0-3-3M12 4a2 2 0 0 0 0 4 2 2 0 0 0 0-4zM12 8v4M6 11l6-4 6 4M3 21h18M9 21v-4a3 3 0 0 1 6 0v4"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-11 1 9-3 18-9 18zM2 22c4-7 7-9 13-12"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
  'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
  meteor: '<path d="M2 22l8-8M14 4l6 6M16 8l-4-4M20 10l-3-3M5 19l-1 1M22 2l-6 6"/><circle cx="14" cy="4" r="1.5" fill="currentColor"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
};

/** Return an SVG string for the given icon name. */
export function icon(name: IconName, size = 18, className = ''): string {
  const path = PATHS[name];
  if (!path) return '';
  const cls = className ? ` class="${className}"` : '';
  return `${SVG_OPEN} width="${size}" height="${size}"${cls} aria-hidden="true">${path}</svg>`;
}

/** Map a WMO weather code (Open-Meteo) to the appropriate icon name. */
export function weatherCodeToIcon(code: number | null | undefined): IconName {
  if (code === null || code === undefined) return 'cloud';
  if (code === 0) return 'sun';
  if (code === 1) return 'sun-medium';
  if (code === 2) return 'cloud-sun';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'cloud-fog';
  if (code >= 51 && code <= 55) return 'cloud-drizzle';
  if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) return 'cloud-rain';
  if (code >= 71 && code <= 75) return 'cloud-snow';
  if (code >= 95 && code <= 99) return 'cloud-lightning';
  return 'cloud';
}
