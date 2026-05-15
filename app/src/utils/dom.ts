/** Set element innerText safely (no-op if element missing). */
export function setText(id: string, text: string | number): void {
  const el = document.getElementById(id);
  if (el) el.innerText = String(text);
}

/** Set element innerHTML safely. */
export function setHTML(id: string, html: string): void {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/** Set the width of an element as a percentage (clamped 0..100). */
export function setWidth(id: string, percent: number): void {
  const el = document.getElementById(id);
  if (el) el.style.width = Math.min(Math.max(percent, 0), 100) + '%';
}

/** Type-safe getElementById returning null. */
export function $(id: string): HTMLElement | null {
  return document.getElementById(id);
}

/** Require an element by id; throws if not found. Useful at boot for critical anchors. */
export function $$(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`DOM element #${id} not found`);
  return el;
}
