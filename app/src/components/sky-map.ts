import { Body, Equator, Horizon, Observer } from 'astronomy-engine';
import { state } from '@/state/app-state';
import { CONSTELLATIONS } from '@/data/constellations';
import { cssVar } from '@/services/theme';
import {
  bvToColor,
  getLinesSync,
  getStarsSync,
  isSkyDataReady,
  preloadSkyData,
  type CatalogStar,
} from '@/services/sky-data';

interface CelestialPoint {
  x: number;
  y: number;
  altDeg: number;
  azDeg: number;
}

const RAD = Math.PI / 180;

/**
 * Project a horizontal position (altitude/azimuth degrees) onto the canvas
 * via a polar (equidistant) projection centered on the zenith.
 *
 *   Inner disc represents altitude 0..90 (above horizon).
 *   Outer ring shows objects between -15° and 0° (compressed).
 *   Below -15° the object is hidden.
 */
function project(
  altDeg: number,
  azDeg: number,
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
): CelestialPoint | null {
  let r: number;
  if (altDeg >= 0) {
    r = rInner * (1 - altDeg / 90);
  } else if (altDeg >= -15) {
    r = rInner + (rOuter - rInner) * (-altDeg / 15);
  } else {
    return null;
  }
  const angle = (azDeg - 90) * RAD; // N → top
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
    altDeg,
    azDeg,
  };
}

function eqToAlt(date: Date, observer: Observer, ra: number, dec: number): { alt: number; az: number } {
  const hor = Horizon(date, observer, ra, dec, 'normal');
  return { alt: hor.altitude, az: hor.azimuth };
}

/** Magnitude → dot radius. Calibrated for a ~600px canvas. */
function magToRadius(mag: number): number {
  if (mag < -1) return 4.5;
  if (mag <  0) return 3.6;
  if (mag <  1) return 2.8;
  if (mag <  2) return 2.1;
  if (mag <  3) return 1.5;
  if (mag <  4) return 1.0;
  if (mag <  5) return 0.6;
  return 0.4;
}

/** Magnitude → label visibility threshold. */
function shouldLabelStar(mag: number, altDeg: number): boolean {
  return mag < 1.6 && altDeg > 4;
}

const PLANETS: Array<{ body: Body; label: string; color: string }> = [
  { body: Body.Mercury, label: 'Mercure',  color: '#cfb481' },
  { body: Body.Venus,   label: 'Vénus',    color: '#f3e4b6' },
  { body: Body.Mars,    label: 'Mars',     color: '#d96a4a' },
  { body: Body.Jupiter, label: 'Jupiter',  color: '#d8a978' },
  { body: Body.Saturn,  label: 'Saturne',  color: '#e6c97a' },
];

/** Linear interpolation between two hex colors. */
function lerpHex(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 0xff, ag = (pa >> 8) & 0xff, ab = pa & 0xff;
  const br = (pb >> 16) & 0xff, bg = (pb >> 8) & 0xff, bb = pb & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${((r << 16) | (g << 8) | bl).toString(16).padStart(6, '0')}`;
}

/**
 * Compute the realistic sky background colors at zenith and horizon from the
 * current sun altitude. Models day, civil/nautical/astronomical twilight, and
 * full night (Sun below -18°). Also gives a stylized "twilight warm" tint near
 * the horizon during civil twilight (sunrise/sunset glow).
 */
function computeSkyTint(sunAltDeg: number): { zenith: string; horizon: string; isDay: boolean } {
  // Full day
  if (sunAltDeg >= 5) {
    return { zenith: '#1f6cb5', horizon: '#bcd5ec', isDay: true };
  }
  // Day transitioning to civil twilight
  if (sunAltDeg >= 0) {
    const t = sunAltDeg / 5;
    return {
      zenith: lerpHex('#284f88', '#1f6cb5', t),
      horizon: lerpHex('#f3b878', '#bcd5ec', t),
      isDay: true,
    };
  }
  // Civil twilight (warm orange to deep blue)
  if (sunAltDeg >= -6) {
    const t = (sunAltDeg + 6) / 6; // 0 deep, 1 toward day
    return {
      zenith: lerpHex('#15214a', '#284f88', t),
      horizon: lerpHex('#7a4060', '#f3b878', t),
      isDay: false,
    };
  }
  // Nautical twilight
  if (sunAltDeg >= -12) {
    const t = (sunAltDeg + 12) / 6;
    return {
      zenith: lerpHex('#0a1130', '#15214a', t),
      horizon: lerpHex('#2a1f3a', '#7a4060', t),
      isDay: false,
    };
  }
  // Astronomical twilight
  if (sunAltDeg >= -18) {
    const t = (sunAltDeg + 18) / 6;
    return {
      zenith: lerpHex('#070a1e', '#0a1130', t),
      horizon: lerpHex('#0e1228', '#2a1f3a', t),
      isDay: false,
    };
  }
  // Full night
  return { zenith: '#070a1e', horizon: '#0d1024', isDay: false };
}

/** Limiting magnitude visible at the given Sun altitude. */
function magLimitForSky(sunAltDeg: number): number {
  if (sunAltDeg < -18) return 5.3;
  if (sunAltDeg < -12) return 4.5;
  if (sunAltDeg < -6) return 3.5;
  if (sunAltDeg < 0) return 2.5;
  if (sunAltDeg < 5) return 0;       // only the very brightest at dawn/dusk
  return -1;                         // daytime: realistically none, but keep Sirius-class for fun
}

/** Star alpha multiplier for sky brightness. */
function starAlphaForSky(sunAltDeg: number): number {
  if (sunAltDeg < -18) return 1;
  if (sunAltDeg < -12) return 0.85;
  if (sunAltDeg < -6) return 0.55;
  if (sunAltDeg < 0) return 0.30;
  if (sunAltDeg < 5) return 0.15;
  return 0.05;
}

/** Schedule a one-time data preload on first call. */
let preloadStarted = false;
function ensurePreload(): void {
  if (preloadStarted) return;
  preloadStarted = true;
  void preloadSkyData().then(() => {
    // Re-render once data has arrived.
    renderSkyMap();
  });
}

/** Render the sky map. */
export function renderSkyMap(): void {
  const canvas = document.getElementById('sky-map') as HTMLCanvasElement | null;
  if (!canvas) return;
  ensurePreload();

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const cssSize = Math.min(rect.width, 700);
  if (cssSize < 50) {
    requestAnimationFrame(() => renderSkyMap());
    return;
  }
  canvas.width = cssSize * dpr;
  canvas.height = cssSize * dpr;
  canvas.style.height = `${cssSize}px`;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  const cx = cssSize / 2;
  const cy = cssSize / 2;
  const rOuter = cssSize / 2 - 6;
  const rInner = rOuter * 0.85;

  const date = new Date();
  const observer = new Observer(state.lat, state.lon, 0);

  // Pre-compute Sun position for sky color + magnitude limit
  const sunEqEarly = Equator(Body.Sun, date, observer, true, true);
  const sunPosEarly = eqToAlt(date, observer, sunEqEarly.ra, sunEqEarly.dec);
  const sunAltDeg = sunPosEarly.alt;
  const skyTint = computeSkyTint(sunAltDeg);
  const magLimit = magLimitForSky(sunAltDeg);
  const starAlpha = starAlphaForSky(sunAltDeg);

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const skyOuterColor = isLight && skyTint.isDay
    ? '#e6deca'
    : isLight
    ? '#d2cab1'
    : '#15182a';
  const horizonLine = cssVar('--accent', '#d4af37');
  const labelMuted = skyTint.isDay ? 'rgba(20,30,50,0.65)' : 'rgba(220,220,232,0.5)';
  const labelDim = skyTint.isDay ? 'rgba(20,30,50,0.4)' : 'rgba(255,255,255,0.2)';
  const labelStrong = skyTint.isDay ? '#1a1c2a' : '#f0eedf';
  const cardinal = cssVar('--accent-warm', '#e8c668');
  const constLineColor = skyTint.isDay
    ? 'rgba(40, 60, 100, 0.18)'
    : 'rgba(180, 200, 255, 0.22)';
  const gridColor = skyTint.isDay
    ? 'rgba(255,255,255,0.32)'
    : 'rgba(255,255,255,0.07)';

  // ---- BACKGROUND ----
  // Outer ring (below horizon — neutral)
  ctx.fillStyle = skyOuterColor;
  ctx.beginPath(); ctx.arc(cx, cy, rOuter, 0, Math.PI * 2); ctx.fill();

  // Inner disc — gradient zenith (center) → horizon (edge)
  const skyGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rInner);
  skyGrad.addColorStop(0, skyTint.zenith);
  skyGrad.addColorStop(0.78, skyTint.zenith);
  skyGrad.addColorStop(1, skyTint.horizon);
  ctx.fillStyle = skyGrad;
  ctx.beginPath(); ctx.arc(cx, cy, rInner, 0, Math.PI * 2); ctx.fill();

  // Subtle vignette at the very edge for depth
  const vignette = ctx.createRadialGradient(cx, cy, rInner * 0.85, cx, cy, rInner);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, skyTint.isDay ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.25)');
  ctx.fillStyle = vignette;
  ctx.beginPath(); ctx.arc(cx, cy, rInner, 0, Math.PI * 2); ctx.fill();

  // Horizon ring
  ctx.strokeStyle = horizonLine;
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, rInner, 0, Math.PI * 2); ctx.stroke();

  // Altitude grid (30°, 60°)
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 0.5;
  for (const alt of [30, 60]) {
    const r = rInner * (1 - alt / 90);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  }

  // ---- CONSTELLATION LINES (full Stellarium-derived patterns) ----
  const cachedLines = getLinesSync();
  for (const set of cachedLines) {
    ctx.strokeStyle = constLineColor;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (const polyline of set.polylines) {
      let started = false;
      for (const [ra, dec] of polyline) {
        const { alt, az } = eqToAlt(date, observer, ra, dec);
        if (alt < -2) { started = false; continue; } // break the polyline
        const p = project(alt, az, cx, cy, rInner, rOuter);
        if (!p) { started = false; continue; }
        if (started) ctx.lineTo(p.x, p.y);
        else { ctx.moveTo(p.x, p.y); started = true; }
      }
    }
    ctx.stroke();
  }

  // ---- STARS (full catalogue, filtered by sky luminosity) ----
  const stars: CatalogStar[] = getStarsSync();
  ctx.globalAlpha = starAlpha;
  for (const s of stars) {
    if (s.mag > magLimit) continue;
    const { alt, az } = eqToAlt(date, observer, s.ra, s.dec);
    if (alt < -10) continue;
    const p = project(alt, az, cx, cy, rInner, rOuter);
    if (!p) continue;

    const baseR = magToRadius(s.mag);
    const r = alt > 0 ? baseR : baseR * 0.55;
    const color = bvToColor(s.bv);

    // Halo for the brightest stars (not during full daytime)
    if (s.mag < 1.5 && alt > 0 && !skyTint.isDay) {
      const haloGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
      haloGrad.addColorStop(0, color + '88');
      haloGrad.addColorStop(1, color + '00');
      ctx.fillStyle = haloGrad;
      ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2); ctx.fill();
    }

    ctx.fillStyle = alt > 0 ? color : (skyTint.isDay ? '#8a8a99' : '#7a7a8a');
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();

    if (alt > 0 && shouldLabelStar(s.mag, alt) && s.name && !skyTint.isDay) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = labelStrong;
      ctx.font = `500 10px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.fillText(s.name, p.x + r + 4, p.y - 2);
      ctx.globalAlpha = starAlpha;
    }
  }
  ctx.globalAlpha = 1;

  // ---- CONSTELLATION NAME LABELS ----
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const c of CONSTELLATIONS) {
    const { alt, az } = eqToAlt(date, observer, c.ra, c.dec);
    const p = project(alt, az, cx, cy, rInner, rOuter);
    if (!p) continue;
    ctx.fillStyle = alt > 0 ? labelMuted : labelDim;
    ctx.font = alt > 0
      ? `italic 12px 'Cormorant Garamond', serif`
      : `italic 10px 'Cormorant Garamond', serif`;
    ctx.fillText(c.nameFr.toUpperCase(), p.x, p.y);
  }

  // ---- SUN (reuse pre-computed position) ----
  const sunP = project(sunPosEarly.alt, sunPosEarly.az, cx, cy, rInner, rOuter);
  if (sunP) {
    const grad = ctx.createRadialGradient(sunP.x, sunP.y, 0, sunP.x, sunP.y, 22);
    grad.addColorStop(0, '#ffd87a');
    grad.addColorStop(0.55, 'rgba(255,216,122,0.45)');
    grad.addColorStop(1, 'rgba(255,216,122,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(sunP.x, sunP.y, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffe080';
    ctx.beginPath(); ctx.arc(sunP.x, sunP.y, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = skyTint.isDay ? '#9a7a18' : '#ffd87a';
    ctx.font = `600 11px 'Inter', sans-serif`;
    ctx.fillText('Soleil', sunP.x, sunP.y - 26);
  }

  // ---- MOON ----
  const moonEq = Equator(Body.Moon, date, observer, true, true);
  const moonPos = eqToAlt(date, observer, moonEq.ra, moonEq.dec);
  const moonP = project(moonPos.alt, moonPos.az, cx, cy, rInner, rOuter);
  if (moonP) {
    const moonGrad = ctx.createRadialGradient(moonP.x, moonP.y, 0, moonP.x, moonP.y, 14);
    moonGrad.addColorStop(0, '#fffce0');
    moonGrad.addColorStop(0.7, 'rgba(255,252,224,0.35)');
    moonGrad.addColorStop(1, 'rgba(255,252,224,0)');
    ctx.fillStyle = moonGrad;
    ctx.beginPath(); ctx.arc(moonP.x, moonP.y, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fffce0';
    ctx.beginPath(); ctx.arc(moonP.x, moonP.y, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = labelStrong;
    ctx.font = `600 11px 'Inter', sans-serif`;
    ctx.fillText('Lune', moonP.x, moonP.y - 18);
  }

  // ---- PLANETS ----
  for (const planet of PLANETS) {
    const eq = Equator(planet.body, date, observer, true, true);
    const pos = eqToAlt(date, observer, eq.ra, eq.dec);
    const p = project(pos.alt, pos.az, cx, cy, rInner, rOuter);
    if (!p) continue;
    const planetGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
    planetGrad.addColorStop(0, planet.color);
    planetGrad.addColorStop(1, `${planet.color}00`);
    ctx.fillStyle = planetGrad;
    ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = planet.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fill();
    if (pos.alt > -5) {
      ctx.fillStyle = labelStrong;
      ctx.font = `600 10px 'Inter', sans-serif`;
      ctx.fillText(planet.label, p.x, p.y + 16);
    }
  }

  // ---- CARDINAL POINTS ----
  ctx.font = `700 14px 'Cormorant Garamond', serif`;
  ctx.fillStyle = cardinal;
  const cardinals: Array<[string, number]> = [
    ['N', 0], ['E', 90], ['S', 180], ['O', 270],
  ];
  for (const [letter, az] of cardinals) {
    const angle = (az - 90) * RAD;
    const r = rInner + (rOuter - rInner) * 0.55;
    const tx = cx + r * Math.cos(angle);
    const ty = cy + r * Math.sin(angle);
    ctx.fillText(letter, tx, ty);
  }

  // ---- BORDER ----
  ctx.strokeStyle = isLight ? 'rgba(26,28,42,0.25)' : 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, rOuter, 0, Math.PI * 2); ctx.stroke();

  // ---- LOADING HINT / TIMESTAMP ----
  const ready = isSkyDataReady();
  const dateStr = date.toLocaleString(state.lang === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
  ctx.fillStyle = labelMuted;
  ctx.font = `500 10px 'JetBrains Mono', monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(ready ? dateStr : `${dateStr}  ·  chargement du catalogue stellaire…`, cx, cssSize - 8);
}

