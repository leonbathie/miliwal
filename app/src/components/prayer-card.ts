import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { computePrayerTimes } from '@/services/prayer-times';
import { formatTimeOnly } from '@/utils/date';
import type { PrayerName, PrayerTimes } from '@/types/prayer';

/** Fulfulde + scientific names for each prayer. */
const PRAYER_LABELS: Record<PrayerName, { arabic: string; ff: string; fr: string; en: string }> = {
  fajr:    { arabic: 'الفجر',   ff: 'Subaka',     fr: 'Fajr',    en: 'Fajr' },
  sunrise: { arabic: 'الشروق',  ff: 'Puyal',      fr: 'Lever',   en: 'Sunrise' },
  dhuhr:   { arabic: 'الظهر',   ff: 'Tisubaar',   fr: 'Dhuhr',   en: 'Dhuhr' },
  asr:     { arabic: 'العصر',   ff: 'Takkusaan',  fr: 'Asr',     en: 'Asr' },
  maghrib: { arabic: 'المغرب',  ff: 'Futuro',     fr: 'Maghrib', en: 'Maghrib' },
  isha:    { arabic: 'العشاء',  ff: 'Geeƴe',      fr: 'Isha',    en: 'Isha' },
};

const PRAYER_ORDER: PrayerName[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

let lastTimes: PrayerTimes | null = null;

/** Find the next prayer from the current time. */
function findNext(times: PrayerTimes): { name: PrayerName; date: Date } | null {
  const now = Date.now();
  for (const name of PRAYER_ORDER) {
    if (times[name].getTime() > now) return { name, date: times[name] };
  }
  return null;
}

function formatCountdown(target: Date): string {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return '—';
  const h = Math.floor(diff / 3600_000);
  const m = Math.floor((diff % 3600_000) / 60_000);
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}min`;
  return `${m}min`;
}

/** Render the prayer times card and the "next prayer" countdown. */
export function renderPrayerCard(): void {
  const container = document.getElementById('prayer-times-list');
  const next = document.getElementById('prayer-next');
  if (!container) return;

  const times = computePrayerTimes(new Date(), state.lat, state.lon);
  lastTimes = times;

  const lang = state.lang;
  const upcoming = findNext(times);

  let html = '';
  for (const name of PRAYER_ORDER) {
    const label = PRAYER_LABELS[name];
    const isNext = upcoming?.name === name;
    const localized = label[lang];
    html += `
      <div class="prayer-row${isNext ? ' is-next' : ''}">
        <div class="prayer-info">
          <span class="prayer-arabic" dir="rtl">${label.arabic}</span>
          <span class="prayer-name">${localized}</span>
        </div>
        <span class="prayer-time">${formatTimeOnly(times[name])}</span>
      </div>
    `;
  }
  container.innerHTML = html;

  if (next) {
    if (upcoming) {
      const dict = t(lang);
      const nameLocalized = PRAYER_LABELS[upcoming.name][lang];
      const countdown = formatCountdown(upcoming.date);
      next.innerHTML = `
        <span class="prayer-next-label">${dict.prayer_next}</span>
        <span class="prayer-next-name">${nameLocalized}</span>
        <span class="prayer-next-countdown">${countdown}</span>
      `;
    } else {
      next.innerHTML = '';
    }
  }
}

/** Expose the cached prayer times for the ICS export action. */
export function getLastPrayerTimes(): PrayerTimes | null {
  return lastTimes;
}
