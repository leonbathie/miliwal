export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'fulfulde-cal:theme';
const THEME_COLOR = { light: '#f7f4ed', dark: '#0a0b14' } as const;

function isTheme(x: unknown): x is Theme {
  return x === 'light' || x === 'dark';
}

/** Current applied theme. Reads from the <html data-theme> attribute. */
export function getTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return isTheme(attr) ? attr : 'dark';
}

/** Apply a theme to the document, persist to localStorage, sync meta. */
export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore storage failures */
  }
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = THEME_COLOR[theme];
}

/**
 * Initialize the theme on boot: persisted choice first, otherwise the system
 * preference (prefers-color-scheme), defaulting to dark.
 */
export function initTheme(): Theme {
  let stored: string | null = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
  if (isTheme(stored)) {
    setTheme(stored);
    return stored;
  }
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial: Theme = prefersLight ? 'light' : 'dark';
  setTheme(initial);
  return initial;
}

/** Flip the current theme and return the new value. */
export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

/** Read a CSS custom property from the root element (already resolved). */
export function cssVar(name: string, fallback = ''): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}
