import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, Sparkles, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CustomCursor } from './components/CustomCursor';
import { ParticleCanvas } from './components/ParticleCanvas';
import { LandscapeScene } from './components/LandscapeScene';
import { OrbitalRing } from './components/OrbitalRing';

export const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const email = 'posteralabs@gmail.com';

  // Preloader transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Mouse Parallax coordinates normalized from -1 to 1
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Touch drag parallax for mobile devices
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      const x = (touch.clientX / innerWidth) * 2 - 1;
      const y = (touch.clientY / innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    }
  };

  // Copy Email with Confetti
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setIsCopied(true);

    // Confetti explosion
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 60,
        spread: 65,
        origin: { x: originX, y: originY },
        colors: ['#b61c1c', '#e05a5a', '#ffe9e6', '#fff6f3', '#ffc53d'],
        disableForReducedMotion: true,
        scalar: 0.9,
      });
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setIsCopied(false);
    }, 2800);
  };

  // Headline words for staggered masked slide-up
  const headlineWords = "We're rebuilding something beautiful.".split(" ");

  return (
    <div
      ref={containerRef}
      onTouchMove={handleTouchMove}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between selection:bg-[#b61c1c] selection:text-white overflow-x-hidden font-['Fredoka',sans-serif]"
    >
      {/* 1. Custom Magnetic Glowing Cursor */}
      <CustomCursor />

      {/* 2. Interactive Reactive Floating Fireflies & Particles Canvas */}
      <ParticleCanvas />

      {/* 3. Illustrated Vector Cinematic Landscape with Parallax */}
      <LandscapeScene mouseX={mousePosition.x} mouseY={mousePosition.y} />

      {/* 4. Cinematic Intro Preloader Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#140303] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              {/* Clean glowing logo without brown box */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full bg-[#b61c1c]/40 blur-2xl" />
                <img
                  src="/assets/logo_red_transparent.png"
                  alt="PosteraLabs"
                  className="w-16 h-16 object-contain drop-shadow-[0_0_25px_rgba(224,90,90,0.9)]"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-wider text-[#fff6f3] uppercase">
                  Postera<span className="text-[#e05a5a]">Labs</span>
                </span>
              </div>
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full bg-gradient-to-r from-[#b61c1c] via-[#ffe9e6] to-[#e05a5a]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. TOP NAVIGATION / HEADER (Clean brand logo & wordmark only) */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 w-full px-6 sm:px-12 lg:px-20 pt-8 pb-4 flex items-center justify-between"
      >
        {/* Brand Logo & Wordmark */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          {/* Clean Large Logo (No brown background container) */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full bg-[#b61c1c]/30 blur-lg group-hover:bg-[#e05a5a]/50 transition-all duration-300" />
            <img
              src="/assets/logo_red_transparent.png"
              alt="PosteraLabs Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-[0_0_12px_rgba(224,90,90,0.8)] group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300 filter brightness-110"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-[#fff6f3] flex items-center gap-0.5 leading-none">
              Postera<span className="text-[#e05a5a]">Labs</span>
            </span>
            <span className="text-[11px] md:text-[12px] font-medium tracking-[0.22em] uppercase text-[#ffe9e6]/70 mt-1">
              Video Editing Agency
            </span>
          </div>
        </motion.div>
      </motion.header>

      {/* 6. MAIN CONTENT SECTION (Full-Screen Visual Centerpiece) */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 sm:px-8 max-w-5xl mx-auto text-center py-8 md:py-14">
        {/* Orbital Marquee Ring with Clean Floating Logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-12"
        >
          <OrbitalRing />
        </motion.div>

        {/* HEADLINE: Word-by-Word Masked Reveal with Fluid Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#fff6f3] leading-[1.1] md:leading-[1.08] max-w-4xl mb-6 select-none">
          {headlineWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <motion.span
                className="inline-block hover:text-[#e05a5a] transition-colors duration-200 cursor-default"
                initial={{ y: '110%', opacity: 0, rotate: 3 }}
                animate={{ y: '0%', opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.5 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
              >
                {word === 'beautiful.' ? (
                  <span className="bg-gradient-to-r from-[#ffe9e6] via-[#e05a5a] to-[#ffb8b8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(224,90,90,0.7)]">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl md:text-2xl font-normal text-[#ffe9e6]/85 max-w-2xl leading-relaxed mb-10 md:mb-12 font-['Fredoka']"
        >
          Our website is under maintenance and will take a little time to rebuild.{' '}
          <span className="text-white font-medium">PosteraLabs is with you, always.</span>
        </motion.p>

        {/* CONTACT CTA & ACTIONS CONTAINER */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Mailto Link Button */}
          <motion.a
            href={`mailto:${email}`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="interactive-element relative group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#b61c1c] via-[#e05a5a] to-[#b61c1c] bg-[length:200%_auto] hover:bg-right text-white font-semibold text-base md:text-lg shadow-[0_10px_35px_rgba(182,28,28,0.5),0_0_20px_rgba(224,90,90,0.3)] hover:shadow-[0_15px_45px_rgba(224,90,90,0.7),0_0_30px_rgba(255,233,230,0.4)] transition-all duration-500 overflow-hidden"
          >
            {/* Shimmer Sheen Layer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />

            <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Contact us at {email}</span>
            <ArrowUpRight className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </motion.a>

          {/* Quick 1-Click Copy Email Button */}
          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Copy email address"
            className="interactive-element relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-full glass-panel text-[#ffe9e6] hover:text-white hover:border-[#e05a5a]/60 hover:bg-[#b61c1c]/20 transition-all duration-300 font-medium text-sm md:text-base w-full sm:w-auto cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div
                  key="copied"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex items-center gap-2 text-[#ffe9e6]"
                >
                  <Check className="w-4 h-4 text-[#e05a5a]" />
                  <span className="font-semibold">Copied!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4 text-[#e05a5a]" />
                  <span>Copy Address</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Live Copy Feedback Floating Toast */}
        <AnimatePresence>
          {isCopied && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 px-4 py-1.5 rounded-full bg-[#e05a5a]/20 border border-[#e05a5a]/40 backdrop-blur-md text-xs font-medium text-[#fff6f3] flex items-center gap-2 shadow-[0_0_20px_rgba(224,90,90,0.3)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffe9e6]" />
              <span>Email address copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 7. MINIMALIST FOOTER */}
      <motion.footer
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 w-full px-6 sm:px-12 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-[#ffe9e6]/60 border-t border-[#ffe9e6]/10 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 font-medium text-[#ffe9e6]/80">
          <span>© PosteraLabs</span>
          <span className="w-1 h-1 rounded-full bg-[#e05a5a]" />
          <span className="text-[#ffe9e6]/50">All Rights Reserved</span>
        </div>

        <div className="flex items-center gap-2 text-[#ffe9e6]/60">
          <span>Direct Desk:</span>
          <a
            href={`mailto:${email}`}
            className="text-[#ffe9e6] hover:text-[#e05a5a] transition-colors underline underline-offset-4 decoration-[#e05a5a]/50"
          >
            {email}
          </a>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;
