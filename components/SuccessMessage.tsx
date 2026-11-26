'use client';

import { motion } from 'framer-motion';

interface SuccessMessageProps {
  onReset: () => void;
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <section className="py-20 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-2xl border border-emerald-500/30 p-8 sm:p-12 max-w-xl w-full text-center shadow-xl"
      >
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Update Recorded
        </h2>

        <p className="text-slate-300 text-base leading-relaxed mb-8">
          Your contribution has been recorded. Thank you for being part of Campus Connect!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-xl font-semibold text-sm text-white cursor-pointer transition-opacity hover:opacity-95"
            style={{
              background: 'linear-gradient(135deg, #E11D48 0%, #F97316 100%)',
            }}
          >
            Submit Another Update
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-white/15 hover:bg-white/5 transition-colors cursor-pointer"
          >
            Back to Top
          </button>
        </div>
      </motion.div>
    </section>
  );
}
