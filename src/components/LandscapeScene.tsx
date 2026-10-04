import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LandscapeSceneProps {
  mouseX: number;
  mouseY: number;
}

export const LandscapeScene: React.FC<LandscapeSceneProps> = ({ mouseX, mouseY }) => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax transform calculations
  const pFactor = isMobile ? 0.35 : 1;
  const sunScrollY = useTransform(scrollY, [0, 800], [0, 90]);
  const cloud1ScrollX = useTransform(scrollY, [0, 800], [0, -120]);
  const cloud2ScrollX = useTransform(scrollY, [0, 800], [0, 90]);
  const mountainFarScrollY = useTransform(scrollY, [0, 800], [0, 45]);
  const mountainMidScrollY = useTransform(scrollY, [0, 800], [0, 75]);
  const waterScrollY = useTransform(scrollY, [0, 800], [0, 110]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky Background Gradient: Rich, Luminous Sunset / Crimson Aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a0404] via-[#4d0a0a] to-[#140303]" />

      {/* Atmospheric Warm Sun Flare / Core Glow */}
      <motion.div
        className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full blur-[130px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(240, 90, 90, 0.5) 0%, rgba(182, 28, 28, 0.35) 40%, rgba(74, 10, 10, 0) 70%)',
          x: mouseX * 22 * pFactor,
          y: mouseY * 16 * pFactor,
        }}
      />

      {/* Warm Horizon Bloom for depth */}
      <div className="absolute top-[28%] left-0 right-0 h-[420px] bg-gradient-to-t from-[#b61c1c]/30 via-[#e05a5a]/20 to-transparent blur-[90px]" />

      {/* SVG Vector Landscape World */}
      <svg
        className="absolute inset-0 w-full h-full object-cover preserve-3d"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* Celestial Orb Gradients */}
          <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fff2ef" />
            <stop offset="55%" stopColor="#ff9696" />
            <stop offset="85%" stopColor="#e05a5a" />
            <stop offset="100%" stopColor="#b61c1c" />
          </radialGradient>

          <radialGradient id="sunHaloGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff6f3" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#e05a5a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#b61c1c" stopOpacity="0" />
          </radialGradient>

          {/* Cloud Gradients */}
          <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff6f3" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#ffe9e6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e05a5a" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe9e6" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#7a1010" stopOpacity="0.12" />
          </linearGradient>

          {/* Mountains Gradients with vibrant rich tones */}
          <linearGradient id="mountainsFarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#781111" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#520b0b" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#2c0505" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="mountainsMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#961717" />
            <stop offset="35%" stopColor="#690d0d" />
            <stop offset="100%" stopColor="#220404" />
          </linearGradient>

          <linearGradient id="mountainsNearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b61c1c" />
            <stop offset="30%" stopColor="#6e0f0f" />
            <stop offset="80%" stopColor="#1a0404" />
            <stop offset="100%" stopColor="#100202" />
          </linearGradient>

          {/* Water Body Gradients */}
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d0707" />
            <stop offset="20%" stopColor="#2a0505" />
            <stop offset="60%" stopColor="#190303" />
            <stop offset="100%" stopColor="#0d0101" />
          </linearGradient>

          <linearGradient id="waterShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe9e6" stopOpacity="0" />
            <stop offset="35%" stopColor="#ffe9e6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#ffe9e6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffe9e6" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beaconBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#ffe9e6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e05a5a" stopOpacity="0" />
          </linearGradient>

          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. CELESTIAL RADIANT SUN/MOON */}
        <motion.g
          style={{ y: sunScrollY }}
          transform={`translate(${mouseX * 15 * pFactor}, ${mouseY * 12 * pFactor})`}
        >
          {/* Outer Pulsing Corona */}
          <circle
            cx="960"
            cy="340"
            r="190"
            fill="url(#sunHaloGrad)"
            className="animate-pulse-subtle"
          />
          {/* Concentric Astronomical Rings */}
          <circle
            cx="960"
            cy="340"
            r="135"
            fill="none"
            stroke="rgba(255, 233, 230, 0.28)"
            strokeWidth="1.5"
            strokeDasharray="10 8"
            className="animate-spin-slow"
          />
          <circle
            cx="960"
            cy="340"
            r="105"
            fill="none"
            stroke="rgba(224, 90, 90, 0.35)"
            strokeWidth="1"
          />
          {/* Radiant Core Sun */}
          <circle
            cx="960"
            cy="340"
            r="88"
            fill="url(#sunGrad)"
            filter="url(#softGlow)"
          />
        </motion.g>

        {/* 2. HIGH DISTANT CLOUDS */}
        <g transform={`translate(${mouseX * -35 * pFactor}, ${mouseY * -10 * pFactor})`}>
          <motion.path
            style={{ x: cloud1ScrollX }}
            d="M 180 250 Q 260 180 370 210 Q 450 160 570 190 Q 660 230 690 280 Q 750 300 720 350 Q 570 360 300 360 Q 150 360 180 250 Z"
            fill="url(#cloudGrad1)"
            animate={{ x: [0, 45, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            style={{ x: cloud2ScrollX }}
            d="M 1220 180 Q 1320 120 1430 150 Q 1520 100 1630 130 Q 1720 160 1750 210 Q 1810 230 1780 280 Q 1610 290 1370 290 Q 1200 290 1220 180 Z"
            fill="url(#cloudGrad2)"
            animate={{ x: [0, -50, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>

        {/* 3. FAR DISTANT MOUNTAINS */}
        <motion.g
          style={{ y: mountainFarScrollY }}
          transform={`translate(${mouseX * 25 * pFactor}, ${mouseY * 18 * pFactor})`}
        >
          <path
            d="M -100 660 L 180 420 L 450 540 L 720 370 L 980 500 L 1260 350 L 1580 520 L 1840 400 L 2050 660 L 2050 1080 L -100 1080 Z"
            fill="url(#mountainsFarGrad)"
          />
          {/* Subtle peak light facets */}
          <path
            d="M 720 370 L 670 440 L 770 440 Z"
            fill="rgba(255, 233, 230, 0.18)"
          />
          <path
            d="M 1260 350 L 1200 420 L 1320 420 Z"
            fill="rgba(255, 233, 230, 0.18)"
          />
        </motion.g>

        {/* 4. MIDGROUND MOUNTAINS */}
        <motion.g
          style={{ y: mountainMidScrollY }}
          transform={`translate(${mouseX * 45 * pFactor}, ${mouseY * 30 * pFactor})`}
        >
          <path
            d="M -50 700 L 290 490 L 590 620 L 890 450 L 1150 570 L 1490 440 L 1820 600 L 2000 520 L 2050 740 L 2050 1080 L -50 1080 Z"
            fill="url(#mountainsMidGrad)"
          />
          {/* Valley mist glow */}
          <ellipse
            cx="960"
            cy="580"
            rx="800"
            ry="95"
            fill="rgba(224, 90, 90, 0.18)"
            filter="url(#softGlow)"
          />
        </motion.g>

        {/* 5. FOREGROUND CLIFFS & LIGHTHOUSE MONOLITH */}
        <g transform={`translate(${mouseX * 70 * pFactor}, ${mouseY * 45 * pFactor})`}>
          {/* Left Foreground Ridge */}
          <path
            d="M -50 800 L 180 640 L 480 750 L 760 670 L 900 790 L -50 1080 Z"
            fill="url(#mountainsNearGrad)"
          />

          {/* Right Foreground Cliff & Lighthouse Pillar */}
          <path
            d="M 1300 810 L 1500 610 L 1750 670 L 1980 570 L 2050 620 L 2050 1080 L 1300 1080 Z"
            fill="url(#mountainsNearGrad)"
          />

          {/* LIGHTHOUSE / MONOLITH TOWER */}
          <g transform="translate(1490, 495)">
            {/* Base and Tower Shaft */}
            <polygon
              points="6,120 36,120 28,22 14,22"
              fill="#220404"
              stroke="#ffe9e6"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            {/* Luminous Lantern Room */}
            <rect
              x="12"
              y="10"
              width="18"
              height="14"
              rx="2"
              fill="#ffffff"
              filter="url(#softGlow)"
            />
            {/* Dome & Finial */}
            <polygon points="16,10 21,0 26,10" fill="#fff6f3" />

            {/* Sweeping Beacon Beam */}
            <motion.polygon
              points="21,17 -450,-120 -430,-70"
              fill="url(#beaconBeam)"
              animate={{
                opacity: [0.4, 0.9, 0.4],
                transform: [
                  'rotate(0deg, 21, 17)',
                  'rotate(-14deg, 21, 17)',
                  'rotate(0deg, 21, 17)',
                ],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        </g>

        {/* 6. LAKE & WATER WITH REFLECTIONS */}
        <motion.g
          style={{ y: waterScrollY }}
          transform={`translate(${mouseX * 30 * pFactor}, ${mouseY * 20 * pFactor})`}
        >
          {/* Base Water */}
          <rect x="-100" y="740" width="2120" height="360" fill="url(#waterGrad)" />

          {/* Central Sun Reflection */}
          <motion.ellipse
            cx="960"
            cy="820"
            rx="200"
            ry="50"
            fill="url(#sunHaloGrad)"
            opacity="0.95"
            className="animate-pulse-subtle"
          />

          {/* Shimmering Water Lines */}
          <g opacity="0.75">
            <line x1="740" y1="770" x2="1180" y2="770" stroke="url(#waterShimmer)" strokeWidth="3" />
            <line x1="660" y1="800" x2="1260" y2="800" stroke="url(#waterShimmer)" strokeWidth="3.5" />
            <line x1="800" y1="835" x2="1120" y2="835" stroke="url(#waterShimmer)" strokeWidth="2.5" />
            <line x1="600" y1="870" x2="1320" y2="870" stroke="url(#waterShimmer)" strokeWidth="4" />
            <line x1="720" y1="910" x2="1200" y2="910" stroke="url(#waterShimmer)" strokeWidth="3" />
            <line x1="500" y1="950" x2="1420" y2="950" stroke="url(#waterShimmer)" strokeWidth="4.5" />
          </g>

          {/* SAILING BOAT 1 */}
          <motion.g
            animate={{
              y: [0, -6, 0],
              x: [0, 50, 0],
              rotate: [0, 2.5, -1.5, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            transform="translate(820, 785)"
          >
            {/* Hull */}
            <path d="M 0 16 L 38 16 L 30 25 L 8 25 Z" fill="#200404" stroke="#ffe9e6" strokeWidth="0.8" />
            {/* Main White Sail */}
            <path d="M 20 15 L 20 -22 L 40 13 Z" fill="#ffffff" opacity="0.95" />
            {/* Crimson Jib Sail */}
            <path d="M 18 15 L 18 -15 L 3 14 Z" fill="#e05a5a" opacity="0.9" />
            {/* Soft Reflection */}
            <path d="M 5 27 L 34 27 L 24 33 L 13 33 Z" fill="#e05a5a" opacity="0.35" />
          </motion.g>

          {/* SAILING BOAT 2 */}
          <motion.g
            animate={{
              y: [0, -4, 0],
              x: [0, -35, 0],
              rotate: [0, -2, 1.5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            transform="translate(1140, 765) scale(0.7)"
          >
            <path d="M 0 16 L 38 16 L 30 25 L 8 25 Z" fill="#200404" stroke="#ffe9e6" strokeWidth="0.8" />
            <path d="M 20 15 L 20 -22 L 40 13 Z" fill="#fff6f3" opacity="0.9" />
            <path d="M 18 15 L 18 -15 L 3 14 Z" fill="#e05a5a" opacity="0.8" />
          </motion.g>
        </motion.g>
      </svg>

      {/* Film Grain Texture & Cinematic Vignette */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#100202] via-transparent to-[#100202]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#100202_100%)] opacity-60 pointer-events-none" />
    </div>
  );
};
