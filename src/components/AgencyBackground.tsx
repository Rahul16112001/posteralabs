import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AgencyBackgroundProps {
  mouseX: number;
  mouseY: number;
}

export const AgencyBackground: React.FC<AgencyBackgroundProps> = ({ mouseX, mouseY }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pFactor = isMobile ? 0.3 : 1;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#0c0202]">
      {/* 1. Deep Midnight Crimson Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#180303] via-[#0d0202] to-[#080101]" />

      {/* 2. Architectural Studio Perspective Grid */}
      <div className="absolute inset-0 studio-grid opacity-60" />

      {/* 3. Radial Mask over Grid for Luxury Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0c0202_85%)]" />

      {/* 4. Hero Luminous Crimson Light Orbs (Pinterest Agency Mesh Aurora) */}
      {/* Main Central Orb */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] sm:h-[650px] rounded-full blur-[140px] pointer-events-none animate-morph-1"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(182, 28, 28, 0.65) 0%, rgba(182, 28, 28, 0.35) 45%, rgba(14, 2, 2, 0) 75%)',
          x: mouseX * 35 * pFactor,
          y: mouseY * 25 * pFactor,
        }}
      />

      {/* Secondary Top-Right Crimson Flare */}
      <motion.div
        className="absolute -top-[10%] -right-[5%] w-[550px] h-[550px] rounded-full blur-[120px] pointer-events-none animate-morph-2"
        style={{
          background: 'radial-gradient(circle, rgba(217, 34, 34, 0.45) 0%, rgba(182, 28, 28, 0.15) 50%, transparent 70%)',
          x: mouseX * -25 * pFactor,
          y: mouseY * -20 * pFactor,
        }}
      />

      {/* Tertiary Bottom-Left Ruby Glow */}
      <motion.div
        className="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none animate-morph-1"
        style={{
          background: 'radial-gradient(circle, rgba(182, 28, 28, 0.4) 0%, rgba(122, 16, 16, 0.2) 50%, transparent 70%)',
          x: mouseX * 20 * pFactor,
          y: mouseY * 15 * pFactor,
        }}
      />

      {/* 5. Clean Geometric Orbit & Aperture Rings in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[850px] h-[600px] md:h-[850px] pointer-events-none flex items-center justify-center opacity-30">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-white/10" />
        {/* Dashed Secondary Ring */}
        <div className="absolute inset-[15%] rounded-full border border-white/15 border-dashed animate-spin-slow" />
        {/* Crimson Highlight Ring */}
        <div className="absolute inset-[32%] rounded-full border border-[#b61c1c]/40" />
        {/* Crosshair Accent Markers */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* 6. Subtle Filmic Grain Texture Overlay */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-50" />

      {/* 7. Dark Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0202] via-transparent to-[#0c0202]/60 pointer-events-none" />
    </div>
  );
};
