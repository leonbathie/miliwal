import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { setHTML } from '@/utils/dom';

export interface InterpretationInputs {
  moonPhase: number;   // 0..1 (SunCalc convention)
  sunAltDeg: number;   // sun altitude in degrees
  moonAge: number;     // days into the lunar cycle
}

/** Generate and write the astronomical interpretation text in the current language. */
export function renderInterpretation(inputs: InterpretationInputs): void {
  const dict = t(state.lang);
  const now = new Date();
  const monthIdx = now.getMonth();
  const year = now.getFullYear();

  let phaseDesc = dict.interp_moon_mid;
  if (inputs.moonPhase < 0.1 || inputs.moonPhase > 0.9) {
    phaseDesc = dict.interp_moon_dark;
  } else if (inputs.moonPhase > 0.4 && inputs.moonPhase < 0.6) {
    phaseDesc = dict.interp_moon_bright;
  }

  const text = `${dict.interp_intro} ${dict.months[monthIdx] ?? ''} ${year} :<br><br>
    <strong style="color:var(--gold);">${dict.interp_moon}</strong> ${Math.round(inputs.moonAge)} ${dict.interp_cycle} ${phaseDesc}<br><br>
    <strong style="color:var(--gold);">${dict.interp_sun}</strong> ${dict.interp_sun_alt} ${inputs.sunAltDeg.toFixed(1)}°.<br><br>
    <strong style="color:var(--gold);">${dict.interp_events}</strong> ${dict.interp_venus}`;

  setHTML('astro-interpretation', text);
}
