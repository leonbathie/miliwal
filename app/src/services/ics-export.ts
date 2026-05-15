import type { PrayerTimes } from '@/types/prayer';
import type { AstroEvent } from '@/data/astro-events';

interface IcsEvent {
  uid: string;
  start: Date;
  end?: Date;          // omit for full-day
  title: string;
  description?: string;
  allDay?: boolean;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function toIcsTime(d: Date): string {
  // UTC time stamps end with Z.
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function toIcsDate(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function buildCalendar(name: string, events: IcsEvent[]): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Calendrier Fulfulde//EN',
    `X-WR-CALNAME:${escapeText(name)}`,
    'CALSCALE:GREGORIAN',
  ];

  for (const ev of events) {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${ev.uid}`);
    lines.push(`DTSTAMP:${toIcsTime(new Date())}`);
    if (ev.allDay) {
      lines.push(`DTSTART;VALUE=DATE:${toIcsDate(ev.start)}`);
    } else {
      lines.push(`DTSTART:${toIcsTime(ev.start)}`);
      const end = ev.end ?? new Date(ev.start.getTime() + 30 * 60_000);
      lines.push(`DTEND:${toIcsTime(end)}`);
    }
    lines.push(`SUMMARY:${escapeText(ev.title)}`);
    if (ev.description) lines.push(`DESCRIPTION:${escapeText(ev.description)}`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function downloadIcs(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Export today's prayer times as an .ics file. */
export function exportPrayerTimes(date: Date, times: PrayerTimes, locationName: string): void {
  const dateKey = toIcsDate(date);
  const events: IcsEvent[] = [
    { uid: `prayer-fajr-${dateKey}@fulfulde-cal`,    start: times.fajr,    title: 'Fajr — Subaka',        description: locationName },
    { uid: `prayer-sunrise-${dateKey}@fulfulde-cal`, start: times.sunrise, title: 'Shurooq — Puyal Naange', description: locationName },
    { uid: `prayer-dhuhr-${dateKey}@fulfulde-cal`,   start: times.dhuhr,   title: 'Dhuhr — Tisubaar',      description: locationName },
    { uid: `prayer-asr-${dateKey}@fulfulde-cal`,     start: times.asr,     title: 'Asr — Takkusaan',       description: locationName },
    { uid: `prayer-maghrib-${dateKey}@fulfulde-cal`, start: times.maghrib, title: 'Maghrib — Futuro',      description: locationName },
    { uid: `prayer-isha-${dateKey}@fulfulde-cal`,    start: times.isha,    title: 'Isha — Geeƴe',          description: locationName },
  ];
  downloadIcs(`prayer-times-${dateKey}.ics`, buildCalendar('Heures de prière', events));
}

/** Export upcoming astronomical events as an .ics file. */
export function exportAstroEvents(events: AstroEvent[]): void {
  const ics = events.map<IcsEvent>((e) => ({
    uid: `astro-${e.date}-${e.type}@fulfulde-cal`,
    start: new Date(`${e.date}T00:00:00`),
    title: `${e.icon} ${e.titleFr}`,
    description: e.descFr,
    allDay: true,
  }));
  downloadIcs('astro-events-2026.ics', buildCalendar('Événements astronomiques 2026', ics));
}
