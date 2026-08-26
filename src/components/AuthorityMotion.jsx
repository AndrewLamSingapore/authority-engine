import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const TILT_SELECTOR = '[data-tilt]';

export default function AuthorityMotion() {
  const location = useLocation();
  const progressRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    const progress = progressRef.current;
    const aura = auraRef.current;
    let frame = 0;
    let activeCard = null;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let scrollDirty = true;

    const resetCard = (card) => {
      if (!card) return;
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--spot-x', '50%');
      card.style.setProperty('--spot-y', '50%');
    };

    const paint = () => {
      frame = 0;

      if (scrollDirty && progress) {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = distance > 0 ? Math.min(window.scrollY / distance, 1) : 0;
        progress.style.transform = `scaleX(${ratio})`;
        scrollDirty = false;
      }

      if (aura && !reducedMotion.matches && finePointer.matches) {
        aura.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }
    };

    const requestPaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const onScroll = () => {
      scrollDirty = true;
      requestPaint();
    };

    const onPointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (aura) aura.dataset.visible = 'true';

      if (!reducedMotion.matches && finePointer.matches) {
        const nextCard = event.target instanceof Element ? event.target.closest(TILT_SELECTOR) : null;
        if (activeCard && activeCard !== nextCard) resetCard(activeCard);
        activeCard = nextCard;

        if (activeCard) {
          const rect = activeCard.getBoundingClientRect();
          const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
          const y = Math.max(0, Math.min(event.clientY - rect.top, rect.height));
          const rotateY = ((x / rect.width) - 0.5) * 5;
          const rotateX = ((y / rect.height) - 0.5) * -5;
          activeCard.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
          activeCard.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
          activeCard.style.setProperty('--spot-x', `${((x / rect.width) * 100).toFixed(1)}%`);
          activeCard.style.setProperty('--spot-y', `${((y / rect.height) * 100).toFixed(1)}%`);
        }
      }

      requestPaint();
    };

    const onPointerDown = () => {
      if (!aura || reducedMotion.matches) return;
      aura.classList.remove('is-bursting');
      void aura.offsetWidth;
      aura.classList.add('is-bursting');
    };

    const onPointerLeave = () => {
      if (aura) aura.dataset.visible = 'false';
      resetCard(activeCard);
      activeCard = null;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    requestPaint();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      resetCard(activeCard);
    };
  }, []);

  return (
    <div className="authority-motion-layer" aria-hidden="true">
      <div ref={progressRef} className="authority-scroll-progress" />
      <div key={location.pathname} className="authority-route-sweep" />
      <div ref={auraRef} className="authority-pointer-aura" data-visible="false" />
    </div>
  );
}
