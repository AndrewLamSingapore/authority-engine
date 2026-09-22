const STORAGE_KEY = 'authority-engine-theme';

export function preferredTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* storage can be unavailable; fall through to the system preference */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* non-fatal: the theme still applies for this session */
  }
}

export function applyShell(shell) {
  if (typeof document === 'undefined') return undefined;
  const root = document.documentElement;
  const body = document.body;
  if (shell) {
    root.dataset.shell = shell;
    body.dataset.shell = shell;
  } else {
    delete root.dataset.shell;
    delete body.dataset.shell;
  }
  return () => {
    delete root.dataset.shell;
    delete body.dataset.shell;
  };
}
