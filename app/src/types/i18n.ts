export type Lang = 'fr' | 'en' | 'ff';

export type WeatherCode = 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 61 | 63 | 65 | 71 | 73 | 75 | 95 | 96 | 99;

export interface WeatherDescriptionMap {
  [code: number]: string;
  unknown: string;
}

export interface Translations {
  nav_cal: string;
  nav_meteo: string;
  nav_print: string;
  title_cal: string;
  year_label: string;
  btn_audio: string;
  lexicon_title: string;
  btn_location: string;
  btn_refresh: string;
  title_meteo: string;
  title_current_weather: string;
  lbl_feels: string;
  lbl_hum: string;
  lbl_wind: string;
  lbl_gusts: string;
  lbl_pres: string;
  lbl_cloud: string;
  lbl_precip: string;
  lbl_dew: string;
  lbl_vis: string;
  lbl_uv: string;
  title_sun: string;
  t_dawn: string;
  t_sunrise: string;
  t_golden: string;
  t_sunset: string;
  t_blue: string;
  t_dusk_c: string;
  t_dusk_n: string;
  t_night: string;
  title_moon: string;
  lbl_illum: string;
  lbl_age: string;
  lbl_days: string;
  t_moonrise: string;
  t_moonset: string;
  title_hourly: string;
  title_daily: string;
  title_astro_interp: string;
  lbl_today: string;
  lbl_alt: string;
  lbl_az: string;

  lbl_eph_season: string;
  lbl_eph_moon: string;
  lbl_eph_sun: string;
  moment_morning: string;
  moment_day: string;
  moment_afternoon: string;
  moment_evening: string;
  moment_night: string;

  season_dabbunde: string;
  season_ceedu: string;
  season_ndungu: string;
  season_kawle: string;

  title_agri: string;
  lbl_soil_temp: string;
  lbl_soil_moist: string;
  lbl_evapo: string;
  lbl_solar_rad: string;
  lbl_jd: string;
  lbl_lst: string;
  lbl_ra: string;
  lbl_dec: string;
  lbl_dist: string;

  months: string[];
  days: string[];
  daysAbr: string[];
  moonPhases: string[];
  zodiac: string[];

  lex_days: string;
  lex_moments: string;
  lex_seasons: string;
  lex_astro: string;
  lex_days_list: string;
  lex_moments_list: string;
  lex_seasons_list: string;
  lex_astro_list: string;

  interp_moon: string;
  interp_sun: string;
  interp_events: string;
  interp_moon_dark: string;
  interp_moon_bright: string;
  interp_moon_mid: string;
  interp_sun_alt: string;
  interp_venus: string;
  interp_intro: string;
  interp_cycle: string;

  // Prayer times
  title_prayer: string;
  prayer_next: string;
  prayer_method: string;
  prayer_export: string;

  // Qibla
  title_qibla: string;
  qibla_label: string;
  qibla_distance: string;
  qibla_bearing: string;

  // Hijri
  hijri_label: string;

  // Proverb
  proverb_title: string;
  proverb_listen: string;

  // Events
  title_events: string;
  events_empty: string;
  events_export: string;
  events_visible_here: string;

  // Locations
  locations_label: string;

  // Install
  install_app: string;
  install_prompt: string;

  // Calendar modes
  cal_mode_label: string;
  cal_mode_gregorian: string;
  cal_mode_hijri: string;

  // Planets / Constellations / Eclipses
  title_planets: string;
  title_constellations: string;
  title_computed_eclipses: string;
  title_weekly: string;
  title_wind_rose: string;
  title_sky_map: string;
  sky_map_hint: string;

  // Hamburger / tools modal
  nav_tools: string;
  tools_title: string;
  tools_today: string;
  tools_pick_date: string;
  tools_between: string;
  tools_label_day: string;
  tools_label_fulfulde_month: string;
  tools_label_doy: string;
  tools_label_week: string;
  tools_label_diff: string;
  tools_label_day_length: string;
  tools_today_is: string;
  tools_in_days: string;
  tools_ago: string;
  tools_weeks: string;
  tools_months: string;
  tools_years: string;
  lbl_days_plural: string;

  // Live indicator
  live_updated_just_now: string;
  live_updated_ago: string;

  // Gallery
  gallery_title: string;

  // Extra tools (date + N, number → FF)
  tools_date_plus: string;
  tools_date_plus_offset: string;
  tools_date_plus_result: string;
  tools_number_to_ff: string;
  tools_number_to_ff_hint: string;
  tools_number_to_ff_out_of_range: string;
  visibility_visible: string;
  visibility_below: string;
  magnitude_label: string;

  w_desc: WeatherDescriptionMap;
}

export type TranslationKey = keyof Translations;
export type I18nDict = Record<Lang, Translations>;
