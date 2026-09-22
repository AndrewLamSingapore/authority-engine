/**
 * Shared "scroll to the Talk band" behaviour for the header button and the
 * home hero's primary action. Falls back to the contact route when no Talk
 * band is on the page, and honours reduced-motion preferences.
 */
export function scrollToTalk(navigate) {
  const section = typeof document === 'undefined' ? null : document.getElementById('talk');
  if (!section) {
    navigate('/contact?source=authority-engine');
    return;
  }
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  const firstTab = section.querySelector('[role="tab"]');
  firstTab?.focus({ preventScroll: true });
}
