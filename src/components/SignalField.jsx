import { useEffect, useRef } from 'react';

const COLORS = {
  emerald: [110, 231, 183],
  amber: [252, 211, 77],
};

function makeNodes(width, height) {
  const count = width < 720 ? 15 : 26;
  return Array.from({ length: count }, (_, index) => ({
    x: ((index * 83 + 29) % 101) / 101 * width,
    y: ((index * 47 + 17) % 97) / 97 * height,
    vx: ((index % 5) - 2) * 0.055,
    vy: (((index * 3) % 5) - 2) * 0.045,
    radius: index % 7 === 0 ? 2.2 : index % 3 === 0 ? 1.5 : 1,
    tone: index % 6 === 0 ? 'amber' : 'emerald',
    phase: index * 0.63,
  }));
}

export default function SignalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let nodes = [];
    let frame = 0;
    let lastTime = 0;
    let running = !document.hidden;
    let pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      nodes = makeNodes(width, height);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const linkDistance = width < 720 ? 125 : 175;

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const dx = nodes[first].x - nodes[second].x;
          const dy = nodes[first].y - nodes[second].y;
          const distance = Math.hypot(dx, dy);
          if (distance >= linkDistance) continue;
          const opacity = (1 - distance / linkDistance) * 0.16;
          context.beginPath();
          context.moveTo(nodes[first].x, nodes[first].y);
          context.lineTo(nodes[second].x, nodes[second].y);
          context.strokeStyle = `rgba(110, 231, 183, ${opacity})`;
          context.lineWidth = 0.75;
          context.stroke();
        }
      }

      nodes.forEach((node) => {
        const color = COLORS[node.tone];
        const pulse = reducedMotion.matches ? 1 : 0.72 + Math.sin(time * 0.0015 + node.phase) * 0.28;

        context.beginPath();
        context.arc(node.x, node.y, node.radius + pulse * 0.65, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color.join(', ')}, ${0.32 + pulse * 0.48})`;
        context.shadowBlur = 10 + pulse * 10;
        context.shadowColor = `rgba(${color.join(', ')}, .55)`;
        context.fill();
        context.shadowBlur = 0;
      });

      if (pointer.active && !reducedMotion.matches) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 150);
        glow.addColorStop(0, 'rgba(110, 231, 183, .09)');
        glow.addColorStop(1, 'rgba(110, 231, 183, 0)');
        context.fillStyle = glow;
        context.fillRect(pointer.x - 150, pointer.y - 150, 300, 300);
      }
    };

    const animate = (time) => {
      if (!running) return;
      const delta = Math.min(32, time - lastTime || 16);
      lastTime = time;

      nodes.forEach((node) => {
        node.x += node.vx * delta;
        node.y += node.vy * delta;
        if (node.x < -12) node.x = width + 12;
        if (node.x > width + 12) node.x = -12;
        if (node.y < -12) node.y = height + 12;
        if (node.y > height + 12) node.y = -12;
      });

      draw(time);
      if (!reducedMotion.matches) frame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
    };

    const onPointerLeave = () => { pointer.active = false; };
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reducedMotion.matches) frame = window.requestAnimationFrame(animate);
    };
    const onMotionChange = () => {
      window.cancelAnimationFrame(frame);
      draw(performance.now());
      if (!reducedMotion.matches && running) frame = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener('change', onMotionChange);
    resize();
    draw();
    if (!reducedMotion.matches) frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="authority-signal-field" aria-hidden="true" />;
}
