import React from 'react';
import { motion } from 'framer-motion';

export const OrbitalRing: React.FC = () => {
  const text = "REBUILDING • REFINING • RETURNING • ";

  return (
    <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto select-none pointer-events-auto">
      {/* Outer ambient crimson glow */}
      <div className="absolute inset-0 rounded-full bg-[#b61c1c]/35 blur-3xl animate-pulse-subtle" />

      {/* Rotating SVG Ring Text */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 220 220"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path
            id="textPathCircle"
            d="M 110, 110 m -82, 0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
          />
        </defs>
        <text
          fill="#ffffff"
          fontSize="11.5"
          fontWeight="700"
          letterSpacing="4"
          className="uppercase font-heading drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
        >
          <textPath href="#textPathCircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </motion.svg>

      {/* Concentric Delicate Orbit Rings */}
      <div className="absolute inset-4 rounded-full border border-white/20 border-dashed animate-spin-slow" />
      <div className="absolute inset-9 rounded-full border border-[#b61c1c]/50" />

      {/* Clean Pure White Floating Logo Emblem (High Visibility) */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 6 }}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        className="relative z-10 flex items-center justify-center cursor-pointer p-3"
      >
        {/* Luminous aura directly around the white emblem */}
        <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-[#b61c1c]/50 via-white/20 to-transparent blur-2xl pointer-events-none" />
        
        {/* Crisp Pure White Logo Image */}
        <img
          src="/assets/logo_white_transparent.png"
          alt="PosteraLabs Emblem"
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.95)]"
        />
      </motion.div>
    </div>
  );
};
