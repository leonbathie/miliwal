import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { tempsEnFulfulde } from '@/utils/fulfulde';
import { setText, setHTML } from '@/utils/dom';
import { formatHMS, mondayBasedIndex, pad } from '@/utils/date';
import { julianAndSidereal } from '@/services/astronomy';
import type { TranslationKey } from '@/types';

let intervalId: number | null = null;

function momentKey(hour: number): TranslationKey {
  if (hour >= 5 && hour < 12) return 'moment_morning';
  if (hour >= 12 && hour < 14) return 'moment_day';
  if (hour >= 14 && hour < 18) return 'moment_afternoon';
  if (hour >= 18 && hour < 20) return 'moment_evening';
  return 'moment_night';
}

/** Render the clock once with the current state's language and location. */
export function renderClock(): void {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const lang = state.lang;
  const dict = t(lang);

  setHTML('clock-num', formatHMS(h, m, s));
  setText('clock-text', tempsEnFulfulde(h, m, s));

  const dayIdx = mondayBasedIndex(now);
  const dayName = dict.days[dayIdx] ?? '';
  const monthName = dict.months[now.getMonth()] ?? '';
  setText('clock-date', `${dayName}, ${now.getDate()} ${monthName} ${now.getFullYear()}`);
  setText('dash-time', `${pad(h)}:${pad(m)}`);

  const mKey = momentKey(h);
  setText('clock-moment', dict[mKey] as string);

  // JD + LST
  const sci = julianAndSidereal(now, state.lon);
  setHTML(
    'sci-time-data',
    `${dict.lbl_jd}: ${sci.jd.toFixed(2)} | ${dict.lbl_lst}: ${pad(sci.lstH)}h${pad(sci.lstM)}`,
  );
}

/** Start the clock auto-refresh loop (1s tick). Idempotent. */
export function startClock(): void {
  renderClock();
  if (intervalId !== null) window.clearInterval(intervalId);
  intervalId = window.setInterval(renderClock, 1000);
}
