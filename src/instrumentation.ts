export async function register() {
  // Node.js 22+ exposes a partially broken `localStorage` global on the server
  // (methods like getItem/setItem are not real functions when no --localstorage-file
  // path is provided). Replace it with a safe in-memory no-op so SSR never throws.
  if (
    typeof globalThis.localStorage !== 'undefined' &&
    typeof globalThis.localStorage.getItem !== 'function'
  ) {
    const store: Record<string, string> = {};

    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => { store[key] = String(value); },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { Object.keys(store).forEach(k => delete store[k]); },
        key: (index: number) => Object.keys(store)[index] ?? null,
        get length() { return Object.keys(store).length; },
      },
      writable: true,
      configurable: true,
    });
  }
}
