export type PrayerName = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

export type PrayerMethod = 'MWL' | 'ISNA' | 'Egypt' | 'Karachi' | 'Tehran';

export interface PrayerMethodConfig {
  fajrAngle: number;   // degrees below horizon
  ishaAngle: number;   // degrees below horizon (or null for fixed offset)
  ishaInterval?: number; // minutes after Maghrib (Tehran uses 14)
  label: string;
}

export type AsrSchool = 'Shafi' | 'Hanafi';
