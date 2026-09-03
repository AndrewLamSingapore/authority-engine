import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SOUND_PREFERENCE = 'authority-sound-enabled-v1';
const PLAY_EVENT = 'authority-theme:play';
const MAX_VOLUME = 0.45;

function readPreference() {
  try {
    return localStorage.getItem(SOUND_PREFERENCE) === 'true';
  } catch {
    return false;
  }
}

function writePreference(enabled) {
  try {
    localStorage.setItem(SOUND_PREFERENCE, String(enabled));
  } catch {
    return;
  }
}

export default function SoundControl() {
  const audioRef = useRef(null);
  const fadeFrameRef = useRef(null);
  const [ready, setReady] = useState(readPreference);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(() => readPreference()
    ? 'Website sound is ready. Select it to begin playback.'
    : 'Website sound is off.');

  const stopTheme = useCallback((immediate = false) => {
    const audio = audioRef.current;
    cancelAnimationFrame(fadeFrameRef.current);
    if (!audio || audio.paused) return;
    if (immediate) {
      audio.pause();
      audio.volume = 0;
      setPlaying(false);
      return;
    }
    const started = performance.now();
    const initialVolume = audio.volume;
    const fade = (now) => {
      const progress = Math.min((now - started) / 360, 1);
      audio.volume = initialVolume * (1 - progress);
      if (progress < 1) fadeFrameRef.current = requestAnimationFrame(fade);
      else {
        audio.pause();
        setPlaying(false);
      }
    };
    fadeFrameRef.current = requestAnimationFrame(fade);
  }, []);

  const playTheme = useCallback(async ({ restart = true, bypassPreference = false } = {}) => {
    const audio = audioRef.current;
    if (!audio || unavailable || (!ready && !bypassPreference)) return false;
    cancelAnimationFrame(fadeFrameRef.current);
    setError('');
    try {
      if (restart || audio.ended) audio.currentTime = 0;
      audio.volume = 0;
      await audio.play();
      setPlaying(true);
      setStatus('Website theme is playing.');
      const started = performance.now();
      const fade = (now) => {
        const progress = Math.min((now - started) / 620, 1);
        audio.volume = MAX_VOLUME * progress;
        if (progress < 1 && !audio.paused) fadeFrameRef.current = requestAnimationFrame(fade);
      };
      fadeFrameRef.current = requestAnimationFrame(fade);
      return true;
    } catch (playError) {
      const message = playError?.name === 'NotAllowedError'
        ? 'Your browser blocked audio. Select SOUND READY again to allow playback.'
        : 'Audio could not start. Check this tab’s sound permission and try again.';
      setPlaying(false);
      setError(message);
      setStatus(message);
      return false;
    }
  }, [ready, unavailable]);

  const toggleSound = async () => {
    if (playing) {
      stopTheme();
      setReady(false);
      writePreference(false);
      setError('');
      setStatus('Website sound is off.');
      return;
    }

    const started = await playTheme({ restart: true, bypassPreference: true });
    if (started) {
      setReady(true);
      writePreference(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handlePlayRequest = () => playTheme({ restart: true });
    const handleVisibility = () => {
      if (document.hidden) stopTheme(true);
    };
    window.addEventListener(PLAY_EVENT, handlePlayRequest);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener(PLAY_EVENT, handlePlayRequest);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(fadeFrameRef.current);
      audio?.pause();
    };
  }, [playTheme, stopTheme]);

  const label = unavailable ? 'SOUND UNAVAILABLE' : playing ? 'PLAYING' : ready ? 'SOUND READY' : 'SOUND OFF';

  return (
    <>
      <button
        type="button"
        className={`authority-sound-control${ready ? ' is-enabled' : ''}${playing ? ' is-playing' : ''}`}
        aria-pressed={playing}
        aria-describedby="authority-sound-status"
        disabled={unavailable}
        onClick={toggleSound}
        title={playing ? 'Turn website sound off' : 'Play the website theme'}
      >
        <span className="authority-sound-wave" aria-hidden="true"><i /><i /><i /><i /></span>
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden" aria-hidden="true">{playing ? <Volume2 size={16} /> : <VolumeX size={16} />}</span>
      </button>
      <span id="authority-sound-status" className="sr-only" role="status" aria-live="polite">{status}</span>
      {error && <span className="authority-sound-error" role="alert">{error}</span>}
      <audio
        ref={audioRef}
        preload="metadata"
        onEnded={() => {
          setPlaying(false);
          setReady(true);
          setStatus('Website theme complete. Sound is ready to play again.');
        }}
        onError={() => {
          setUnavailable(true);
          setReady(false);
          writePreference(false);
          const message = 'Website audio could not load. Please refresh and try again.';
          setError(message);
          setStatus(message);
        }}
      >
        <source src="/authority-theme-v1.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
