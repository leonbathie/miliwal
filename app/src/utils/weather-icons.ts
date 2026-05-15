import { icon, weatherCodeToIcon } from '@/components/icons';

/**
 * Return an SVG markup string for the given Open-Meteo weather code,
 * at the requested pixel size.
 */
export function weatherIcon(code: number | undefined, size = 24): string {
  return icon(weatherCodeToIcon(code), size, 'icon-weather');
}
