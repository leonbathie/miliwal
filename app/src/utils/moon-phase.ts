/**
 * Map a moon phase value (SunCalc convention, 0..1 cycle) to the conventional
 * 8-phase index used in i18n.moonPhases, with its corresponding emoji.
 */
export interface MoonPhaseInfo {
  index: number;
  icon: string;
}

export function classifyMoonPhase(phase: number): MoonPhaseInfo {
  if (phase > 0.03 && phase < 0.22) return { index: 1, icon: '🌒' };
  if (phase >= 0.22 && phase < 0.28) return { index: 2, icon: '🌓' };
  if (phase >= 0.28 && phase < 0.47) return { index: 3, icon: '🌔' };
  if (phase >= 0.47 && phase < 0.53) return { index: 4, icon: '🌕' };
  if (phase >= 0.53 && phase < 0.72) return { index: 5, icon: '🌖' };
  if (phase >= 0.72 && phase < 0.78) return { index: 6, icon: '🌗' };
  if (phase >= 0.78 && phase < 0.97) return { index: 7, icon: '🌘' };
  return { index: 0, icon: '🌑' };
}
