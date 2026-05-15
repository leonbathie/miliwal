const PI = Math.PI;

/** Draw a half-arc (horizon) and place a dot at the given altitude (in degrees). */
export function drawSunArc(canvasId: string, altitudeDeg: number, color: string): void {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h - 20;
  const r = h - 40;

  ctx.clearRect(0, 0, w, h);

  // Background arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, PI, 0);
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.stroke();

  if (altitudeDeg > 0) {
    const ratio = Math.min(altitudeDeg / 90, 1);
    const endAngle = PI + ratio * PI;

    ctx.beginPath();
    ctx.arc(cx, cy, r, PI, endAngle);
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.stroke();

    const ix = cx + r * Math.cos(endAngle);
    const iy = cy + r * Math.sin(endAngle);
    ctx.beginPath();
    ctx.arc(ix, iy, 8, 0, 2 * PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Horizon line
  ctx.beginPath();
  ctx.moveTo(10, cy);
  ctx.lineTo(w - 10, cy);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#7a287c';
  ctx.stroke();
}
