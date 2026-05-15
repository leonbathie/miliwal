// Kaaba coordinates (Mecca, Saudi Arabia)
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

/**
 * Compute the Qibla bearing (degrees from true North, clockwise) from a given
 * observer position to the Kaaba in Mecca using the great-circle formula.
 *
 *   y = sin(Δλ) · cos(φ₂)
 *   x = cos(φ₁) · sin(φ₂) − sin(φ₁) · cos(φ₂) · cos(Δλ)
 *   θ = atan2(y, x)
 */
export function qiblaBearing(lat: number, lon: number): number {
  const phi1 = lat * RAD;
  const phi2 = KAABA_LAT * RAD;
  const deltaLambda = (KAABA_LON - lon) * RAD;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2)
    - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  let bearing = Math.atan2(y, x) * DEG;
  bearing = (bearing + 360) % 360;
  return bearing;
}

/** Great-circle distance (km) from the observer to Mecca. */
export function distanceToMecca(lat: number, lon: number): number {
  const R = 6371; // Earth radius km
  const phi1 = lat * RAD;
  const phi2 = KAABA_LAT * RAD;
  const dPhi = (KAABA_LAT - lat) * RAD;
  const dLambda = (KAABA_LON - lon) * RAD;

  const a = Math.sin(dPhi / 2) ** 2
    + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/** Format a bearing as compass direction, e.g. "NE", "ENE". */
export function bearingToCompass(bearing: number): string {
  const points = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                  'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  const idx = Math.round((bearing % 360) / 22.5) % 16;
  return points[idx]!;
}
