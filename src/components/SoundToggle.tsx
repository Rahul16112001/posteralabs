import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Cinematic Warm Harmonic Drone (E Minor chords & soft harmonics)
        const frequencies = [82.41, 123.47, 164.81, 246.94, 329.63];
        const oscs: OscillatorNode[] = [];

        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          const oscGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle frequency modulation
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
          lfoGain.gain.setValueAtTime(0.6, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.2 / (idx + 1), ctx.currentTime);

          if (panner) {
            panner.pan.setValueAtTime((idx % 2 === 0 ? 1 : -1) * 0.4, ctx.currentTime);
            osc.connect(oscGain);
            oscGain.connect(panner);
            panner.connect(masterGain);
          } else {
            osc.connect(oscGain);
            oscGain.connect(masterGain);
          }

          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio initialization failed', err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
        setTimeout(() => {
          oscillatorsRef.current.forEach((o) => {
            try {
              o.stop();
            } catch {
              // Ignore if already stopped
            }
          });
          oscillatorsRef.current = [];
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
          setIsPlaying(false);
        }, 1500);
      }
    }
  };

  return (
    <button
      onClick={toggleSound}
      aria-label={isPlaying ? 'Mute ambient sound' : 'Unmute ambient sound'}
      className="interactive-element flex items-center gap-2 px-3.5 py-2 rounded-full glass-pill text-xs md:text-sm text-[#ffe9e6] hover:text-white hover:border-[#e05a5a]/50 transition-all duration-300 group cursor-pointer"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3.5">
            <span className="w-0.5 h-3 bg-[#e05a5a] rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
            <span className="w-0.5 h-4 bg-[#fff6f3] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 h-2.5 bg-[#e05a5a] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s]" />
          </div>
          <span className="hidden sm:inline font-medium">Atmosphere ON</span>
          <Volume2 className="w-4 h-4 text-[#e05a5a]" />
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-[#ffe9e6]/70 group-hover:text-[#e05a5a] transition-colors" />
          <span className="hidden sm:inline font-medium text-[#ffe9e6]/80">Sound Experience</span>
        </>
      )}
    </button>
  );
};
