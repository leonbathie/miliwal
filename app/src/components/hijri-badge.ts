import { state } from '@/state/app-state';
import { toHijri } from '@/services/hijri';
import { setText } from '@/utils/dom';

/** Update the small Hijri date badge in the hero header. */
export function renderHijriBadge(): void {
  const hijri = toHijri(new Date(), state.lang);
  setText('hijri-date', hijri.formatted);
}
