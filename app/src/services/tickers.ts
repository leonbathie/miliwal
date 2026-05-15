/**
 * Unified periodic refresh system. Replaces ad-hoc setInterval calls scattered
 * across components. Pauses while the tab is hidden (visibilitychange) and
 * resumes on focus to avoid wasting CPU and battery.
 */

type Tick = () => void;

export interface TickerCallbacks {
  /** Called every 60 seconds. For minute-resolution data (prayer countdown,
   * sky map positions, sun/moon altitude). */
  fast?: Tick;
  /** Called every 5 minutes. For slower-changing data (planet positions,
   * constellations, ephemeris). */
  medium?: Tick;
}

const intervals: number[] = [];

/** Start all dynamic tickers. Call once at boot. */
export function startTickers(callbacks: TickerCallbacks): void {
  stopTickers();

  if (callbacks.fast) {
    intervals.push(window.setInterval(callbacks.fast, 60_000));
  }
  if (callbacks.medium) {
    intervals.push(window.setInterval(callbacks.medium, 300_000));
  }

  // Re-trigger on tab focus, in case the user left the tab open overnight.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      callbacks.fast?.();
      callbacks.medium?.();
    }
  });
}

/** Stop all running tickers (useful for HMR cleanup in development). */
export function stopTickers(): void {
  while (intervals.length > 0) {
    const id = intervals.pop();
    if (id !== undefined) window.clearInterval(id);
  }
}
