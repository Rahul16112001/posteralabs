import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, Sparkles, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CustomCursor } from './components/CustomCursor';
import { ParticleCanvas } from './components/ParticleCanvas';
import { AgencyBackground } from './components/AgencyBackground';
import { OrbitalRing } from './components/OrbitalRing';

export const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const email = 'posteralabs@gmail.com';

  // Preloader reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Parallax coordinates normalized from -1 to 1
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

  // Mobile touch drag parallax
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

    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 65,
        spread: 70,
        origin: { x: originX, y: originY },
        colors: ['#ffffff', '#b61c1c', '#e02424', '#ffdddd'],
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

  const headlineWords = "We're rebuilding something beautiful.".split(" ");

  return (
    <div
      ref={containerRef}
      onTouchMove={handleTouchMove}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between selection:bg-[#b61c1c] selection:text-white overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* 1. Custom Magnetic Glowing Cursor */}
      <CustomCursor />

      {/* 2. Interactive Reactive Floating White & Crimson Starlight Particles */}
      <ParticleCanvas />

      {/* 3. Pinterest-Inspired Luxury Fluid Crimson Aurora & Grid Background */}
      <AgencyBackground mouseX={mousePosition.x} mouseY={mousePosition.y} />

      {/* 4. Cinematic Intro Preloader Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#0c0202] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              {/* Pure White Glowing Logo */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full bg-[#b61c1c]/50 blur-2xl" />
                <img
                  src="/assets/logo_white_transparent.png"
                  alt="PosteraLabs"
                  className="w-16 h-16 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-wider font-heading text-white uppercase">
                  Postera<span className="text-[#b61c1c]">Labs</span>
                </span>
              </div>
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full bg-gradient-to-r from-[#b61c1c] via-white to-[#b61c1c]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. TOP NAVIGATION / HEADER */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 w-full px-6 sm:px-12 lg:px-20 pt-8 pb-4 flex items-center justify-between"
      >
        {/* Brand Logo & Wordmark */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          {/* Pure White High-Visibility Logo */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full bg-white/20 blur-md group-hover:bg-[#b61c1c]/50 transition-all duration-300" />
            <img
              src="/assets/logo_white_transparent.png"
              alt="PosteraLabs Logo"
              className="w-11 h-11 md:w-13 md:h-13 object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.9)] group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-white flex items-center gap-0.5 leading-none">
              Postera<span className="text-[#b61c1c]">Labs</span>
            </span>
            <span className="text-[11px] md:text-[12px] font-semibold tracking-[0.24em] uppercase text-white/70 mt-1">
              Video Editing Agency
            </span>
          </div>
        </motion.div>
      </motion.header>

      {/* 6. MAIN CONTENT SECTION */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 sm:px-8 max-w-5xl mx-auto text-center py-8 md:py-14">
        {/* Orbital Marquee Ring with Pure White Central Emblem */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-12"
        >
          <OrbitalRing />
        </motion.div>

        {/* HEADLINE: Word-by-Word Masked Reveal in Syne Font */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight font-heading text-white leading-[1.08] md:leading-[1.04] max-w-4xl mb-6 select-none">
          {headlineWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <motion.span
                className="inline-block hover:text-[#b61c1c] transition-colors duration-200 cursor-default"
                initial={{ y: '110%', opacity: 0, rotate: 2 }}
                animate={{ y: '0%', opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.45 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
              >
                {word === 'beautiful.' ? (
                  <span className="bg-gradient-to-r from-white via-[#ff9999] to-[#b61c1c] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(182,28,28,0.8)]">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* SUBTEXT in Plus Jakarta Sans */}
        <motion.p
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl font-normal text-white/80 max-w-2xl leading-relaxed mb-10 md:mb-12"
        >
          Our website is under maintenance and will take a little time to rebuild.{' '}
          <span className="text-white font-semibold">PosteraLabs is with you, always.</span>
        </motion.p>

        {/* CONTACT CTA & ACTIONS CONTAINER */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Mailto Link Button */}
          <motion.a
            href={`mailto:${email}`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="interactive-element relative group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#b61c1c] hover:bg-[#d92222] text-white font-semibold text-base md:text-lg shadow-[0_10px_35px_rgba(182,28,28,0.6),0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_45px_rgba(182,28,28,0.8),0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer Sheen Layer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />

            <Mail className="w-5 h-5 transition-transform group-hover:scale-110 text-white" />
            <span className="text-white font-semibold tracking-wide">Contact us at {email}</span>
            <ArrowUpRight className="w-4 h-4 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-white" />
          </motion.a>

          {/* Quick 1-Click Copy Email Button */}
          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Copy email address"
            className="interactive-element relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-full glass-panel text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300 font-semibold text-sm md:text-base w-full sm:w-auto cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div
                  key="copied"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex items-center gap-2 text-white"
                >
                  <Check className="w-4 h-4 text-[#ff5555]" />
                  <span className="font-bold">Copied!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4 text-white/80" />
                  <span>Copy Address</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Live Copy Toast */}
        <AnimatePresence>
          {isCopied && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 px-4 py-1.5 rounded-full bg-[#b61c1c]/30 border border-white/20 backdrop-blur-md text-xs font-medium text-white flex items-center gap-2 shadow-[0_0_20px_rgba(182,28,28,0.5)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Email address copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 7. MINIMALIST FOOTER */}
      <motion.footer
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 w-full px-6 sm:px-12 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-white/60 border-t border-white/10 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 font-medium text-white/80">
          <span>© PosteraLabs</span>
          <span className="w-1 h-1 rounded-full bg-[#b61c1c]" />
          <span className="text-white/50">All Rights Reserved</span>
        </div>

        <div className="flex items-center gap-2 text-white/70">
          <span>Direct Desk:</span>
          <a
            href={`mailto:${email}`}
            className="text-white hover:text-[#b61c1c] transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-[#b61c1c]"
          >
            {email}
          </a>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;
