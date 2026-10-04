import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LandscapeSceneProps {
  mouseX: number;
  mouseY: number;
  mood?: 'dawn' | 'dusk' | 'radiant';
}

export const LandscapeScene: React.FC<LandscapeSceneProps> = ({ mouseX, mouseY, mood = 'radiant' }) => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax transform calculations based on scroll & mouse
  const pFactor = isMobile ? 0.35 : 1;
  const sunScrollY = useTransform(scrollY, [0, 800], [0, 90]);
  const cloud1ScrollX = useTransform(scrollY, [0, 800], [0, -120]);
  const cloud2ScrollX = useTransform(scrollY, [0, 800], [0, 90]);
  const mountainFarScrollY = useTransform(scrollY, [0, 800], [0, 45]);
  const mountainMidScrollY = useTransform(scrollY, [0, 800], [0, 75]);
  const waterScrollY = useTransform(scrollY, [0, 800], [0, 110]);

  // Mood color configs
  const moodGradients = {
    radiant: 'from-[#420808] via-[#630f0f] to-[#1a0505]',
    dawn: 'from-[#541111] via-[#7d1919] to-[#240606]',
    dusk: 'from-[#2e0505] via-[#480a0a] to-[#120202]',
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky Background Gradient: Luminous Crimson Dawn-to-Dusk Aura */}
      <div className={`absolute inset-0 bg-gradient-to-b ${moodGradients[mood]} transition-colors duration-1000`} />

      {/* Atmospheric Radial Glow Behind Sun */}
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[110px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(224, 90, 90, 0.45) 0%, rgba(182, 28, 28, 0.25) 45%, rgba(74, 10, 10, 0) 75%)',
          x: mouseX * 20 * pFactor,
          y: mouseY * 15 * pFactor,
        }}
      />

      {/* Secondary Warm Horizon Bloom */}
      <div className="absolute top-[35%] left-0 right-0 h-[380px] bg-gradient-to-t from-[#b61c1c]/25 via-[#e05a5a]/15 to-transparent blur-[80px]" />

      {/* SVG Vector Landscape World */}
      <svg
        className="absolute inset-0 w-full h-full object-cover preserve-3d"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* Gradients for Landscape */}
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff6f3" />
            <stop offset="35%" stopColor="#ffe9e6" />
            <stop offset="70%" stopColor="#e05a5a" />
            <stop offset="100%" stopColor="#b61c1c" />
          </linearGradient>

          <linearGradient id="sunHaloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe9e6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#e05a5a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#b61c1c" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe9e6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e05a5a" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff6f3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7a1010" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="mountainsFarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6e0f0f" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#360606" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="mountainsMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#871414" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#570b0b" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#240505" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="mountainsNearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a31919" />
            <stop offset="45%" stopColor="#520a0a" />
            <stop offset="100%" stopColor="#170303" />
          </linearGradient>

          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d0707" />
            <stop offset="25%" stopColor="#2b0505" />
            <stop offset="70%" stopColor="#1c0404" />
            <stop offset="100%" stopColor="#120202" />
          </linearGradient>

          <linearGradient id="waterShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe9e6" stopOpacity="0" />
            <stop offset="40%" stopColor="#ffe9e6" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#ffe9e6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffe9e6" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beaconBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff6f3" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#ffe9e6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e05a5a" stopOpacity="0" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. CELESTIAL SUN / MOON WITH CORONA */}
        <motion.g
          style={{ y: sunScrollY }}
          transform={`translate(${mouseX * 15 * pFactor}, ${mouseY * 12 * pFactor})`}
        >
          {/* Outer Pulsing Corona */}
          <circle
            cx="960"
            cy="360"
            r="160"
            fill="url(#sunHaloGrad)"
            className="animate-pulse-subtle"
          />
          {/* Mid Corona Ring */}
          <circle
            cx="960"
            cy="360"
            r="115"
            fill="none"
            stroke="rgba(255, 233, 230, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            className="animate-spin-slow"
          />
          {/* Core Radiant Sun */}
          <circle
            cx="960"
            cy="360"
            r="82"
            fill="url(#sunGrad)"
            filter="url(#softGlow)"
          />
        </motion.g>

        {/* 2. HIGH DISTANT CLOUDS (PARALLAX LAYER 1) */}
        <g transform={`translate(${mouseX * -35 * pFactor}, ${mouseY * -10 * pFactor})`}>
          <motion.path
            style={{ x: cloud1ScrollX }}
            d="M 220 280 Q 290 220 380 250 Q 450 200 560 230 Q 640 260 670 310 Q 720 330 700 370 Q 560 380 320 380 Q 190 380 220 280 Z"
            fill="url(#cloudGrad1)"
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            style={{ x: cloud2ScrollX }}
            d="M 1250 200 Q 1340 140 1440 170 Q 1520 120 1620 150 Q 1700 180 1730 230 Q 1780 250 1750 290 Q 1600 300 1380 300 Q 1230 300 1250 200 Z"
            fill="url(#cloudGrad2)"
            animate={{ x: [0, -45, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>

        {/* 3. FAR DISTANT MOUNTAIN RANGE (PARALLAX LAYER 2) */}
        <motion.g
          style={{ y: mountainFarScrollY }}
          transform={`translate(${mouseX * 25 * pFactor}, ${mouseY * 18 * pFactor})`}
        >
          <path
            d="M -100 680 L 180 440 L 450 560 L 720 390 L 980 520 L 1260 370 L 1580 540 L 1840 420 L 2050 680 L 2050 1080 L -100 1080 Z"
            fill="url(#mountainsFarGrad)"
          />
          {/* Subtle peak highlights */}
          <path
            d="M 720 390 L 680 450 L 760 450 Z"
            fill="rgba(255, 233, 230, 0.12)"
          />
          <path
            d="M 1260 370 L 1210 430 L 1310 430 Z"
            fill="rgba(255, 233, 230, 0.12)"
          />
        </motion.g>

        {/* 4. MIDGROUND MOUNTAINS & RIDGES (PARALLAX LAYER 3) */}
        <motion.g
          style={{ y: mountainMidScrollY }}
          transform={`translate(${mouseX * 45 * pFactor}, ${mouseY * 30 * pFactor})`}>
          <path
            d="M -50 720 L 290 510 L 590 640 L 890 470 L 1150 590 L 1490 460 L 1820 620 L 2000 540 L 2050 760 L 2050 1080 L -50 1080 Z"
            fill="url(#mountainsMidGrad)"
          />
          {/* Atmospheric mist between ridges */}
          <ellipse
            cx="960"
            cy="600"
            rx="750"
            ry="90"
            fill="rgba(224, 90, 90, 0.14)"
            filter="url(#softGlow)"
          />
        </motion.g>

        {/* 5. FOREGROUND CLIFF, MONOLITH TOWER & PINNACLES (PARALLAX LAYER 4) */}
        <g transform={`translate(${mouseX * 70 * pFactor}, ${mouseY * 45 * pFactor})`}>
          {/* Left foreground ridge */}
          <path
            d="M -50 820 L 180 660 L 480 770 L 760 690 L 900 810 L -50 1080 Z"
            fill="url(#mountainsNearGrad)"
          />

          {/* Right cliff & Landmark Tower Monolith */}
          <path
            d="M 1320 830 L 1510 630 L 1750 690 L 1980 590 L 2050 640 L 2050 1080 L 1320 1080 Z"
            fill="url(#mountainsNearGrad)"
          />

          {/* MONOLITH TOWER / LIGHTHOUSE ON RIGHT CLIFF (PosteraLabs Pillar) */}
          <g transform="translate(1500, 520)">
            {/* Tower Base & Shaft */}
            <polygon
              points="6,110 34,110 26,20 14,20"
              fill="#2b0505"
              stroke="#ffe9e6"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            {/* Tower Lantern Top */}
            <rect
              x="12"
              y="8"
              width="16"
              height="12"
              rx="2"
              fill="#fff6f3"
              filter="url(#softGlow)"
            />
            {/* Tower Spire */}
            <polygon points="17,8 20,0 23,8" fill="#ffe9e6" />

            {/* Sweeping Beacon Light Ray */}
            <motion.polygon
              points="20,14 -420,-110 -400,-60"
              fill="url(#beaconBeam)"
              animate={{
                opacity: [0.35, 0.85, 0.35],
                transform: [
                  'rotate(0deg, 20, 14)',
                  'rotate(-12deg, 20, 14)',
                  'rotate(0deg, 20, 14)',
                ],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        </g>

        {/* 6. LAKE / REFLECTIVE WATER (LOWER SECTION) */}
        <motion.g
          style={{ y: waterScrollY }}
          transform={`translate(${mouseX * 30 * pFactor}, ${mouseY * 20 * pFactor})`}
        >
          {/* Base Water Surface */}
          <rect x="-100" y="760" width="2120" height="340" fill="url(#waterGrad)" />

          {/* Central Celestial Reflection Glow */}
          <motion.ellipse
            cx="960"
            cy="840"
            rx="180"
            ry="45"
            fill="url(#sunHaloGrad)"
            opacity="0.85"
            className="animate-pulse-subtle"
          />

          {/* Shimmering Horizontal Water Lines */}
          <g opacity="0.6">
            <line
              x1="760"
              y1="790"
              x2="1160"
              y2="790"
              stroke="url(#waterShimmer)"
              strokeWidth="2.5"
            />
            <line
              x1="680"
              y1="820"
              x2="1240"
              y2="820"
              stroke="url(#waterShimmer)"
              strokeWidth="3"
            />
            <line
              x1="820"
              y1="855"
              x2="1100"
              y2="855"
              stroke="url(#waterShimmer)"
              strokeWidth="2"
            />
            <line
              x1="620"
              y1="890"
              x2="1300"
              y2="890"
              stroke="url(#waterShimmer)"
              strokeWidth="3.5"
            />
            <line
              x1="740"
              y1="930"
              x2="1180"
              y2="930"
              stroke="url(#waterShimmer)"
              strokeWidth="2"
            />
            <line
              x1="520"
              y1="970"
              x2="1400"
              y2="970"
              stroke="url(#waterShimmer)"
              strokeWidth="4"
            />
          </g>

          {/* SAILING BOAT 1 (Mid Lake, Bobbing & Sailing Gently) */}
          <motion.g
            animate={{
              y: [0, -5, 0],
              x: [0, 45, 0],
              rotate: [0, 2, -1, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            transform="translate(820, 805)"
          >
            {/* Hull */}
            <path
              d="M 0 15 L 35 15 L 28 23 L 7 23 Z"
              fill="#240505"
              stroke="#ffe9e6"
              strokeWidth="0.6"
            />
            {/* Main Sail */}
            <path
              d="M 18 14 L 18 -18 L 36 12 Z"
              fill="#fff6f3"
              opacity="0.9"
            />
            {/* Jib Sail */}
            <path
              d="M 16 14 L 16 -12 L 3 13 Z"
              fill="#e05a5a"
              opacity="0.85"
            />
            {/* Reflection */}
            <path
              d="M 4 25 L 31 25 L 22 30 L 12 30 Z"
              fill="#e05a5a"
              opacity="0.25"
            />
          </motion.g>

          {/* SAILING BOAT 2 (Distant Lake, Gliding) */}
          <motion.g
            animate={{
              y: [0, -3, 0],
              x: [0, -30, 0],
              rotate: [0, -1.5, 1, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            transform="translate(1120, 785) scale(0.65)"
          >
            {/* Hull */}
            <path
              d="M 0 15 L 35 15 L 28 23 L 7 23 Z"
              fill="#240505"
            />
            {/* Main Sail */}
            <path
              d="M 18 14 L 18 -18 L 36 12 Z"
              fill="#ffe9e6"
              opacity="0.85"
            />
            {/* Jib Sail */}
            <path
              d="M 16 14 L 16 -12 L 3 13 Z"
              fill="#e05a5a"
              opacity="0.75"
            />
          </motion.g>
        </motion.g>
      </svg>

      {/* Foreground Film Grain Texture & Dark Vignette */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#140505] via-transparent to-[#140505]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#140505_100%)] opacity-70 pointer-events-none" />
    </div>
  );
};
