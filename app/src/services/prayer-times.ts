import SunCalc from 'suncalc';
import { RAD, DEG } from './astronomy';
import type {
  AsrSchool,
  PrayerMethod,
  PrayerMethodConfig,
  PrayerTimes,
} from '@/types/prayer';

/**
 * Prayer time calculation methods used widely across the Muslim world.
 * Angles are degrees below the horizon for Fajr and Isha.
 */
export const PRAYER_METHODS: Record<PrayerMethod, PrayerMethodConfig> = {
  MWL:     { fajrAngle: 18,   ishaAngle: 17,   label: 'Muslim World League' },
  ISNA:    { fajrAngle: 15,   ishaAngle: 15,   label: 'Islamic Society of North America' },
  Egypt:   { fajrAngle: 19.5, ishaAngle: 17.5, label: 'Egyptian General Authority' },
  Karachi: { fajrAngle: 18,   ishaAngle: 18,   label: 'University of Islamic Sciences, Karachi' },
  Tehran:  { fajrAngle: 17.7, ishaAngle: 14,   ishaInterval: 0, label: 'Institute of Geophysics, Tehran' },
};

/**
 * Compute the sun's declination (radians) for a given date.
 * Uses SunCalc internal-like approximation via getPosition at solar noon.
 */
function sunDeclination(date: Date, lat: number, lon: number): number {
  // Solar noon position gives us declination via altitude.
  const noon = SunCalc.getTimes(date, lat, lon).solarNoon;
  const pos = SunCalc.getPosition(noon, lat, lon);
  // At solar noon, altitude = 90 - |lat - decl|
  // → decl = lat - (90° - altitude) when sun is south of zenith
  const altDeg = pos.altitude * DEG;
  // Declination = altitude - 90 + lat  (in degrees, signed)
  return (altDeg - 90 + lat) * RAD;
}

/**
 * Solve for the time when the sun reaches a given altitude angle (in degrees,
 * negative = below horizon). Returns the morning crossing (true) or evening
 * crossing (false). Uses a binary search around solar noon ±12h.
 */
function timeAtSunAltitude(
  baseDate: Date,
  lat: number,
  lon: number,
  altitudeDeg: number,
  morning: boolean,
): Date {
  const solarNoon = SunCalc.getTimes(baseDate, lat, lon).solarNoon;
  const target = altitudeDeg * RAD;

  let lo: number;
  let hi: number;
  if (morning) {
    lo = solarNoon.getTime() - 12 * 3600_000;
    hi = solarNoon.getTime();
  } else {
    lo = solarNoon.getTime();
    hi = solarNoon.getTime() + 12 * 3600_000;
  }

  // Binary search — monotonic on each half-day for sun altitude.
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    const alt = SunCalc.getPosition(new Date(mid), lat, lon).altitude;
    if (morning) {
      // altitude increases with time in the morning
      if (alt < target) lo = mid;
      else hi = mid;
    } else {
      // altitude decreases with time in the evening
      if (alt > target) lo = mid;
      else hi = mid;
    }
  }
  return new Date((lo + hi) / 2);
}

/**
 * Compute Asr prayer time. The sun's altitude H at Asr satisfies:
 *   cot(H) = factor + tan(|lat - decl|)
 * where factor = 1 (Shafi) or 2 (Hanafi).
 */
function asrTime(date: Date, lat: number, lon: number, school: AsrSchool): Date {
  const decl = sunDeclination(date, lat, lon);
  const factor = school === 'Hanafi' ? 2 : 1;
  const latLessDecl = Math.abs(lat * RAD - decl);
  const H = Math.atan(1 / (factor + Math.tan(latLessDecl))); // radians
  const altDeg = H * DEG;
  // Asr is in the afternoon (evening crossing of this altitude).
  return timeAtSunAltitude(date, lat, lon, altDeg, false);
}

/**
 * Compute the five canonical prayer times + sunrise for a given date and
 * location, using the chosen calculation method and Asr school.
 */
export function computePrayerTimes(
  date: Date,
  lat: number,
  lon: number,
  method: PrayerMethod = 'MWL',
  asrSchool: AsrSchool = 'Shafi',
): PrayerTimes {
  const cfg = PRAYER_METHODS[method];
  const sunTimes = SunCalc.getTimes(date, lat, lon);

  const fajr = timeAtSunAltitude(date, lat, lon, -cfg.fajrAngle, true);
  const sunrise = sunTimes.sunrise;
  const dhuhr = sunTimes.solarNoon;
  const asr = asrTime(date, lat, lon, asrSchool);
  const maghrib = sunTimes.sunset;

  let isha: Date;
  if (cfg.ishaInterval !== undefined && cfg.ishaInterval > 0) {
    isha = new Date(maghrib.getTime() + cfg.ishaInterval * 60_000);
  } else {
    isha = timeAtSunAltitude(date, lat, lon, -cfg.ishaAngle, false);
  }

  return { fajr, sunrise, dhuhr, asr, maghrib, isha };
}
