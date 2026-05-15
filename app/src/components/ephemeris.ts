import SunCalc from 'suncalc';
import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { setText } from '@/utils/dom';
import { getSeason } from '@/utils/season';
import { classifyMoonPhase } from '@/utils/moon-phase';
import { calculateRealAstrology } from '@/services/astronomy';

/** Refresh the three ephemeris chips (season, moon phase, sun zodiac sign). */
export function updateEphemerisHeader(): void {
  const now = new Date();
  const dict = t(state.lang);

  // Season
  const season = getSeason(now.getMonth());
  setText('eph-season-val', `${season.icon} ${dict[season.key]}`);

  // Moon
  const illum = SunCalc.getMoonIllumination(now);
  const phase = classifyMoonPhase(illum.phase);
  const moonName = dict.moonPhases[phase.index] ?? '';
  setText('eph-moon-val', `${phase.icon} ${moonName}`);

  // Sun zodiac
  const astro = calculateRealAstrology(now);
  setText('eph-sun-val', dict.zodiac[astro.sunIdx] ?? '');
}
