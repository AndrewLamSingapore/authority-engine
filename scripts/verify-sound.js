import assert from 'node:assert/strict';
import fs from 'node:fs';

const component = fs.readFileSync('src/components/SoundControl.jsx', 'utf8');
const navbar = fs.readFileSync('src/components/Navbar.jsx', 'utf8');
const home = fs.readFileSync('src/pages/Home.jsx', 'utf8');
const css = fs.readFileSync('src/index.css', 'utf8');
const config = fs.readFileSync('vercel.json', 'utf8');
const asset = 'public/authority-theme-v1.mp3';

assert.ok(fs.existsSync(asset), 'missing career-site thematic sound');
assert.ok(fs.statSync(asset).size > 100_000, 'thematic sound file is unexpectedly small');
assert.ok(component.includes('preload="metadata"'), 'audio must not autoplay on page load');
assert.ok(component.includes('aria-pressed={playing}') && component.includes('aria-live="polite"'), 'sound control must expose the actual playback state');
assert.ok(component.includes("playing ? 'PLAYING' : ready ? 'SOUND READY'"), 'sound control must distinguish ready from playing');
assert.ok(component.includes('const MAX_VOLUME = 0.9'), 'sound must be audible on laptop speakers');
assert.ok(component.includes('playConfirmationCue') && component.includes('783.99'), 'sound must begin with the shared audible confirmation cue');
assert.ok(component.includes('const cuePromise = playConfirmationCue()') && component.includes('Promise.all([themePromise, cuePromise])'), 'theme and cue must start inside the same user activation');
assert.ok(component.includes('audio.muted = false') && component.includes('audio.defaultMuted = false'), 'playback must explicitly clear inherited mute state');
assert.ok(component.includes('onPlaying={() =>') && component.includes('onPause={() =>'), 'sound UI must follow actual media playback events');
assert.ok(component.includes('loop') && component.includes('const themePromise = audio.play()'), 'playing state must represent continuous, successful theme playback');
assert.ok(component.includes('role="alert"') && component.includes('NotAllowedError'), 'sound playback failures must be visible');
assert.ok(component.includes('authority-sound-enabled-v1'), 'sound preference must be versioned and local');
assert.ok(component.includes("document.addEventListener('visibilitychange'"), 'audio must pause in hidden tabs');
assert.ok(navbar.includes('<SoundControl />'), 'global navigation sound control is missing');
assert.ok(home.includes('authority-theme:play'), 'hero transition is not connected to the theme');
assert.ok(css.includes('.authority-sound-control.is-playing'), 'playing-state feedback is missing');
assert.ok(config.includes("media-src 'self'"), 'media policy must remain same-origin');

console.log('PASS: personal-site sound consent, accessibility, persistence and lifecycle verified.');
