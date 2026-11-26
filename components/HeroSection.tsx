'use client';

import { motion } from 'framer-motion';
import PalmTree from './PalmTree';

interface HeroSectionProps {
  onSubmitClick: () => void;
}

export default function HeroSection({ onSubmitClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      {/* Subtle palm tree silhouettes */}
      <div className="absolute bottom-0 left-0 w-40 md:w-64 opacity-[0.14] pointer-events-none">
        <PalmTree side="left" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 md:w-64 opacity-[0.14] pointer-events-none">
        <PalmTree side="right" />
      </div>

      {/* Minimal top header bar */}
      <header className="fixed top-0 left-0 right-0 z-30 border-b border-white/10 bg-[#0b0d17]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold tracking-tight text-white">
              my<span className="text-cyan-400">GOV</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs sm:text-sm font-medium text-slate-300">
              LNCT Group of Colleges
            </span>
          </div>

          <div className="hidden md:block text-xs text-slate-400">
            Ministry of Electronics &amp; IT, Govt. of India
          </div>

          <a
            href="https://campus.mygov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3.5 py-1.5 rounded-lg border border-white/15 text-slate-200 hover:bg-white/5 transition-colors"
          >
            campus.mygov.in
          </a>
        </div>
      </header>

      {/* Main hero content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-medium text-slate-300 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span>MyGov × LNCT Bhopal • Team Work Updates</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
        >
          CAMPUS <span className="gradient-text">CONNECT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-slate-300 uppercase mb-8"
        >
          PEOPLE &nbsp;|&nbsp; IDEAS &nbsp;|&nbsp; BRIGHTER TOMORROW
        </motion.p>

        {/* Clean Event Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl px-6 py-5 mb-10 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left"
        >
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Event Date</div>
              <div className="text-sm font-semibold text-white">04 December 2026</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Time</div>
              <div className="text-sm font-semibold text-white">02:00 PM – 04:00 PM</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Venue</div>
              <div className="text-sm font-semibold text-white">LNCT Group of Colleges, Bhopal</div>
            </div>
          </div>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmitClick}
          className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm sm:text-base text-white tracking-wide cursor-pointer transition-all shadow-lg shadow-rose-950/40"
          style={{
            background: 'linear-gradient(135deg, #E11D48 0%, #F97316 100%)',
          }}
        >
          <span>SUBMIT YOUR DAILY WORK UPDATE</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>

        {/* Subtle partner line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-xs text-slate-500"
        >
          LNCT Kalchuri Incubation Center &nbsp;•&nbsp; Anupam – A Unit of Kothiya Society &nbsp;•&nbsp; MeitY
        </motion.p>
      </div>
    </section>
  );
}
