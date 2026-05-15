import SunCalc from 'suncalc';
import type { AstrologyResult, JulianDateInfo } from '@/types';

export const PI = Math.PI;
export const RAD = PI / 180;
export const DEG = 180 / PI;

/**
 * Compute Julian Date and Local Sidereal Time for a given date and longitude.
 * Formula reference: meeus.astron / standard mean sidereal time at Greenwich.
 */
export function julianAndSidereal(date: Date, lon: number): JulianDateInfo {
  const jd = date.getTime() / 86_400_000 + 2_440_587.5;
  const d = jd - 2_451_545.0;
  let gmst = (280.46061837 + 360.98564736629 * d) % 360;
  if (gmst < 0) gmst += 360;
  let lst = (gmst + lon) % 360;
  if (lst < 0) lst += 360;
  const lstHours = lst / 15;
  const lstH = Math.floor(lstHours);
  const lstM = Math.floor((lstHours - lstH) * 60);
  return { jd, lstHours, lstH, lstM };
}

/**
 * Lightweight astrology computation: returns the zodiac sign index (0..11)
 * for the sun on the given date. Uses the simple Schlyter approximation.
 */
export function calculateRealAstrology(date: Date): AstrologyResult {
  const jd = date.getTime() / 86_400_000 + 2_440_587.5;
  const d = jd - 2_451_545.0;
  const L = (280.460 + 0.9856474 * d) % 360;
  const g = (357.528 + 0.9856003 * d) % 360;
  let lambda = (L + 1.915 * Math.sin(g * RAD) + 0.020 * Math.sin(2 * g * RAD)) % 360;
  if (lambda < 0) lambda += 360;
  return { sunIdx: Math.floor(lambda / 30) };
}

// Re-export SunCalc primitives for type-safe usage elsewhere
export { SunCalc };
