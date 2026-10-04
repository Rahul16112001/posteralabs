import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Only enable custom cursor for fine pointer (mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest('button, a, input, [role="button"], .interactive-element');
      setIsHovered(!!clickable);
    };

    const handleClickRipple = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-8), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousemove', handleHoverCheck);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('click', handleClickRipple);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', handleHoverCheck);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('click', handleClickRipple);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  // Handle touch ripples on mobile devices
  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const newRipple = {
          id: Date.now() + Math.random(),
          x: touch.clientX,
          y: touch.clientY,
        };
        setRipples((prev) => [...prev.slice(-6), newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 1000);
      }
    };

    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouch);
  }, []);

  return (
    <>
      {/* Ripple effects on click/tap */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid rgba(224, 90, 90, 0.75)',
            background: 'radial-gradient(circle, rgba(182, 28, 28, 0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      ))}

      {/* Main Cursor Orb */}
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9999] rounded-full mix-blend-screen"
          animate={{
            x: mousePosition.x - (isHovered ? 24 : 12),
            y: mousePosition.y - (isHovered ? 24 : 12),
            width: isHovered ? 48 : 24,
            height: isHovered ? 48 : 24,
            scale: isClicked ? 0.8 : isHovered ? 1.25 : 1,
            backgroundColor: isHovered ? 'rgba(224, 90, 90, 0.45)' : 'rgba(182, 28, 28, 0.85)',
            boxShadow: isHovered
              ? '0 0 35px rgba(224, 90, 90, 0.8), 0 0 70px rgba(182, 28, 28, 0.4)'
              : '0 0 20px rgba(182, 28, 28, 0.7), 0 0 40px rgba(224, 90, 90, 0.3)',
          }}
          transition={{
            type: 'spring',
            stiffness: 450,
            damping: 28,
            mass: 0.5,
          }}
        >
          {/* Inner bright core */}
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <div
              className={`rounded-full bg-white transition-all duration-200 ${
                isHovered ? 'w-2 h-2 opacity-90' : 'w-1.5 h-1.5 opacity-100 shadow-[0_0_8px_#ffffff]'
              }`}
            />
          </div>
        </motion.div>
      )}
    </>
  );
};
