import { state } from '@/state/app-state';
import { t } from '@/i18n';
import { setText, setHTML, setWidth } from '@/utils/dom';
import { weatherIcon } from '@/utils/weather-icons';
import { temperatureEnFulfulde } from '@/utils/fulfulde';
import type { OpenMeteoResponse } from '@/types';

/** Render the current weather card from a freshly fetched payload. */
export function renderWeather(data: OpenMeteoResponse): void {
  const c = data.current;
  const d = data.daily;
  if (!c) return;

  const dict = t(state.lang);
  const desc = dict.w_desc[c.weather_code] ?? dict.w_desc.unknown;

  setHTML('w-icon', weatherIcon(c.weather_code, 64));
  setText('w-desc', desc);
  setText('w-temp', `${Math.round(c.temperature_2m)}°`);
  setText('w-feels', `${Math.round(c.apparent_temperature)}°C`);

  setText('w-hum', c.relative_humidity_2m);
  setWidth('w-hum-bar', c.relative_humidity_2m);

  setText('w-wind', Math.round(c.wind_speed_10m));
  setText('w-gusts', c.wind_gusts_10m !== null ? Math.round(c.wind_gusts_10m) : '--');
  setText('w-pres', Math.round(c.pressure_msl));

  setText('w-cloud', c.cloud_cover);
  setWidth('w-cloud-bar', c.cloud_cover);

  setText('w-precip', c.precipitation);
  setText('w-uv', d.uv_index_max?.[0] ?? '--');
  setText('w-dew', `${Math.round(c.dew_point_2m)}°C`);
  setText('w-vis', `${(c.visibility / 1000).toFixed(1)} km`);

  setText('w-soil-temp', c.soil_temperature_0cm !== null ? `${Math.round(c.soil_temperature_0cm)}` : '--');
  setText('w-soil-moist', c.soil_moisture_0_to_1cm !== null ? `${c.soil_moisture_0_to_1cm}` : '--');
  setText('w-evapo', c.et0_fao_evapotranspiration !== null ? `${c.et0_fao_evapotranspiration}` : '--');
  setText('w-solar-rad', c.direct_radiation !== null ? `${Math.round(c.direct_radiation)}` : '--');

  setText('fulfulde-temp', temperatureEnFulfulde(c.temperature_2m));
}
