import { state } from '@/state/app-state';
import { buildCalendar, populateYearSelector } from '@/components/month-card';
import { buildLexicon } from '@/components/lexicon';
import { startClock } from '@/components/clock';

/** Initial render of the Calendar tab. Idempotent. */
export function renderCalendarView(): void {
  populateYearSelector();
  buildCalendar(state.year);
  buildLexicon();
  startClock();
}

/** Re-render after a year change. */
export function changeYear(newYear: number): void {
  state.year = newYear;
  buildCalendar(newYear);
}
