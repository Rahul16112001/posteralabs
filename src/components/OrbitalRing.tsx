import React from 'react';
import { motion } from 'framer-motion';

export const OrbitalRing: React.FC = () => {
  const text = "REBUILDING • REFINING • RETURNING • ";

  return (
    <div className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44 mx-auto select-none pointer-events-auto">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[#b61c1c]/30 blur-2xl animate-pulse-subtle" />

      {/* Rotating SVG Ring Text */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path
            id="textPathCircle"
            d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
          />
        </defs>
        <text
          fill="#ffe9e6"
          fontSize="11.5"
          fontWeight="600"
          letterSpacing="3.5"
          className="uppercase drop-shadow-[0_0_8px_rgba(224,90,90,0.6)]"
        >
          <textPath href="#textPathCircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </motion.svg>

      {/* Concentric Thin Orbit Lines */}
      <div className="absolute inset-3 rounded-full border border-[#ffe9e6]/20 border-dashed animate-spin-slow" />
      <div className="absolute inset-7 rounded-full border border-[#e05a5a]/25" />

      {/* Central Glowing Sphere with PosteraLabs Star & Dot */}
      <motion.div
        whileHover={{ scale: 1.12 }}
        className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-[#7a1010] via-[#b61c1c] to-[#e05a5a] p-[1.5px] shadow-[0_0_35px_rgba(182,28,28,0.7)] flex items-center justify-center overflow-hidden cursor-pointer"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#4a0a0a]/90 to-[#1e0505]/95 backdrop-blur-md flex items-center justify-center relative">
          {/* Inner pulse */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,233,230,0.35),transparent_70%)]" />
          
          {/* Central Logo Symbol */}
          <img
            src="/assets/logo_white_transparent.png"
            alt="PosteraLabs Emblem"
            className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_0_12px_rgba(255,233,230,0.9)] transform -translate-y-0.5"
          />
        </div>
      </motion.div>
    </div>
  );
};
