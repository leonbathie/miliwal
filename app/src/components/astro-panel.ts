import SunCalc from 'suncalc';
import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { setText } from '@/utils/dom';
import { formatTimeOnly } from '@/utils/date';
import { formatRA, formatDec } from '@/utils/format';
import { classifyMoonPhase } from '@/utils/moon-phase';
import { DEG } from '@/services/astronomy';
import { drawSunArc } from './sun-arc';
import { updateEphemerisHeader } from './ephemeris';
import { renderInterpretation } from './interpretation';

/**
 * Refresh all Sun + Moon + compass + interpretation widgets for the current
 * date and the observer location stored in app state.
 */
export function updateAstroData(date: Date, lat: number, lon: number): void {
  updateEphemerisHeader();
  const dict = t(state.lang);

  // ---- Sun ----
  const sunPos = SunCalc.getPosition(date, lat, lon);
  const sunAltDeg = sunPos.altitude * DEG;
  const sunAzDeg = sunPos.azimuth * DEG + 180; // south-based → north-based

  setText('sun-alt-text', `${dict.lbl_alt}: ${sunAltDeg.toFixed(1)}° | ${dict.lbl_az}: ${sunAzDeg.toFixed(0)}°`);
  setText('fulfulde-sun', `Naange — tolno ${Math.round(sunAltDeg)}°`);
  drawSunArc('sun-canvas', sunAltDeg, '#D4AF37');

  const times = SunCalc.getTimes(date, lat, lon);
  setText('t-dawn-astro', formatTimeOnly(times.nightEnd));
  setText('t-sunrise', formatTimeOnly(times.sunrise));
  setText('t-golden', formatTimeOnly(times.goldenHour));
  setText('t-sunset', formatTimeOnly(times.sunset));
  setText('t-blue', formatTimeOnly(times.nauticalDusk));
  setText('t-night', formatTimeOnly(times.night));

  // ---- Moon ----
  const illum = SunCalc.getMoonIllumination(date);
  const moonTimes = SunCalc.getMoonTimes(date, lat, lon);
  const moonPos = SunCalc.getMoonPosition(date, lat, lon);
  const moonAzDeg = moonPos.azimuth * DEG + 180;
  const moonAltDeg = moonPos.altitude * DEG;

  const age = illum.phase * 29.53;
  const illumPercent = illum.fraction * 100;

  setText('moon-age', age.toFixed(1));
  setText('moon-illum', illumPercent.toFixed(0));
  setText('fulfulde-moon', `Leeuru — tolno ${Math.round(moonAltDeg)}°`);

  const phase = classifyMoonPhase(illum.phase);
  setText('moon-phase-name', dict.moonPhases[phase.index] ?? '');
  setText('moon-icon', phase.icon);
  setText('t-moonrise', moonTimes.rise ? formatTimeOnly(moonTimes.rise) : '--:--');
  setText('t-moonset', moonTimes.set ? formatTimeOnly(moonTimes.set) : '--:--');

  // ---- Scientific data ----
  // Note: keeping original behavior — RA/Dec for sun uses altitude as placeholder
  // since SunCalc doesn't expose the sun's RA/Dec directly. Moon RA/Dec come from
  // an internal field of SunCalc.getMoonPosition (ra/dec).
  setText('sci-sun-ra', formatRA(sunPos.altitude));
  setText('sci-sun-dec', formatDec(sunPos.altitude));

  const moonAny = moonPos as unknown as { ra?: number; dec?: number; distance: number };
  setText('sci-moon-ra', moonAny.ra !== undefined ? formatRA(moonAny.ra) : '--');
  setText('sci-moon-dec', moonAny.dec !== undefined ? formatDec(moonAny.dec) : '--');
  setText('sci-moon-dist', `${Math.round(moonAny.distance)} km`);

  // ---- Compass indicators ----
  const sunCompass = document.getElementById('compass-sun');
  const moonCompass = document.getElementById('compass-moon');
  if (sunCompass) sunCompass.style.transform = `rotate(${sunAzDeg}deg)`;
  if (moonCompass) moonCompass.style.transform = `rotate(${moonAzDeg}deg)`;

  // ---- Interpretation ----
  renderInterpretation({
    moonPhase: illum.phase,
    sunAltDeg,
    moonAge: age,
  });
}
