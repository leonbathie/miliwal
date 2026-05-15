export interface SunPosition {
  altitude: number; // radians
  azimuth: number;  // radians (south-based per SunCalc)
}

export interface MoonPosition {
  altitude: number;
  azimuth: number;
  distance: number; // km
  parallacticAngle: number;
  ra?: number;
  dec?: number;
}

export interface MoonIllumination {
  fraction: number; // 0..1
  phase: number;    // 0..1
  angle: number;
}

export interface SunTimes {
  solarNoon: Date;
  nadir: Date;
  sunrise: Date;
  sunset: Date;
  sunriseEnd: Date;
  sunsetStart: Date;
  dawn: Date;
  dusk: Date;
  nauticalDawn: Date;
  nauticalDusk: Date;
  nightEnd: Date;
  night: Date;
  goldenHourEnd: Date;
  goldenHour: Date;
}

export interface MoonTimes {
  rise: Date | undefined;
  set: Date | undefined;
  alwaysUp?: boolean;
  alwaysDown?: boolean;
}

export interface AstrologyResult {
  sunIdx: number; // 0..11
}

export interface JulianDateInfo {
  jd: number;
  lstHours: number;
  lstH: number;
  lstM: number;
}
