import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SOUND_PREFERENCE = 'authority-sound-enabled-v1';
const PLAY_EVENT = 'authority-theme:play';
const MAX_VOLUME = 0.18;

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
  const [enabled, setEnabled] = useState(readPreference);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [status, setStatus] = useState('Website sound is off.');

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
    if (!audio || unavailable || (!enabled && !bypassPreference)) return;
    cancelAnimationFrame(fadeFrameRef.current);
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
    } catch {
      setPlaying(false);
      setStatus('Select sound again to play the website theme.');
    }
  }, [enabled, unavailable]);

  const toggleSound = () => {
    const nextEnabled = !enabled;
    setEnabled(nextEnabled);
    writePreference(nextEnabled);
    if (nextEnabled) {
      setStatus('Website sound is on.');
      playTheme({ restart: true, bypassPreference: true });
    } else {
      stopTheme();
      setStatus('Website sound is off.');
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

  const label = unavailable ? 'SOUND UNAVAILABLE' : enabled ? 'SOUND ON' : 'SOUND OFF';

  return (
    <>
      <button
        type="button"
        className={`authority-sound-control${enabled ? ' is-enabled' : ''}${playing ? ' is-playing' : ''}`}
        aria-pressed={enabled}
        aria-describedby="authority-sound-status"
        disabled={unavailable}
        onClick={toggleSound}
        title={enabled ? 'Turn website sound off' : 'Play the website theme'}
      >
        <span className="authority-sound-wave" aria-hidden="true"><i /><i /><i /><i /></span>
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden" aria-hidden="true">{enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</span>
      </button>
      <span id="authority-sound-status" className="sr-only" role="status" aria-live="polite">{status}</span>
      <audio
        ref={audioRef}
        preload="metadata"
        onEnded={() => {
          setPlaying(false);
          setStatus('Website theme complete. Sound remains on.');
        }}
        onError={() => {
          setUnavailable(true);
          setEnabled(false);
          writePreference(false);
          setStatus('Website sound is unavailable.');
        }}
      >
        <source src="/authority-theme-v1.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
