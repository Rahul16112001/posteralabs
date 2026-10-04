import React from 'react';
import { motion } from 'framer-motion';

export const OrbitalRing: React.FC = () => {
  const text = "REBUILDING • REFINING • RETURNING • ";

  return (
    <div className="relative flex items-center justify-center w-44 h-44 md:w-56 md:h-56 mx-auto select-none pointer-events-auto">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[#b61c1c]/25 blur-3xl animate-pulse-subtle" />

      {/* Rotating SVG Ring Text */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path
            id="textPathCircle"
            d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
          />
        </defs>
        <text
          fill="#ffe9e6"
          fontSize="11"
          fontWeight="600"
          letterSpacing="3.5"
          className="uppercase drop-shadow-[0_0_10px_rgba(224,90,90,0.7)] opacity-90"
        >
          <textPath href="#textPathCircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </motion.svg>

      {/* Concentric Delicate Orbit Rings */}
      <div className="absolute inset-4 rounded-full border border-[#ffe9e6]/15 border-dashed animate-spin-slow" />
      <div className="absolute inset-8 rounded-full border border-[#e05a5a]/20" />

      {/* Clean Floating Logo Emblem (No brown box / background) */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative z-10 flex items-center justify-center cursor-pointer p-2"
      >
        {/* Soft luminous aura around the logo itself */}
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-[#b61c1c]/40 via-[#e05a5a]/30 to-transparent blur-xl pointer-events-none" />
        
        {/* Crisp Large Transparent Logo */}
        <img
          src="/assets/logo_red_transparent.png"
          alt="PosteraLabs Emblem"
          className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_20px_rgba(224,90,90,0.85)] filter brightness-110"
        />
      </motion.div>
    </div>
  );
};
