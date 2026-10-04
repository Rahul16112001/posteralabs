import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulseAngle: number;
  type: 'ember' | 'firefly' | 'stardust';
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const colors = [
      'rgba(224, 90, 90, ',   // rose
      'rgba(255, 233, 230, ',  // soft blush
      'rgba(255, 246, 243, ',  // warm cream
      'rgba(182, 28, 28, ',   // primary crimson
      'rgba(255, 200, 150, ',  // warm golden-rose glow
    ];

    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeChoice = Math.random();
      const type: 'ember' | 'firefly' | 'stardust' =
        typeChoice < 0.4 ? 'ember' : typeChoice < 0.8 ? 'firefly' : 'stardust';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 + (type === 'ember' ? -0.1 : 0),
        vy: -0.2 - Math.random() * 0.45,
        size: type === 'firefly' ? 2 + Math.random() * 2.5 : 1 + Math.random() * 2,
        baseAlpha: 0.25 + Math.random() * 0.6,
        alpha: 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseAngle: Math.random() * Math.PI * 2,
        type,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic floating motion
        p.pulseAngle += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.25;
        p.alpha = Math.max(0.05, Math.min(1, p.alpha));

        // Physics update
        p.x += p.vx + Math.sin(p.pulseAngle * 0.5) * 0.2;
        p.y += p.vy;

        // Mouse avoidance physics
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += Math.cos(angle) * force * 3.5;
          p.y += Math.sin(angle) * force * 3.5;
        }

        // Screen wrap-around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle with luminous glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.color === colors[3] ? '#b61c1c' : '#ffe9e6';
        ctx.shadowBlur = p.type === 'firefly' ? 14 : 6;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
