'use client';

import { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import WorkUpdateForm from '@/components/WorkUpdateForm';
import Footer from '@/components/Footer';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b0d17] text-slate-100">
      {/* Subtle static sunset ambient backdrop */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(225, 29, 72, 0.16), transparent 65%), radial-gradient(ellipse 60% 45% at 85% 20%, rgba(124, 58, 237, 0.12), transparent 60%), radial-gradient(ellipse 70% 40% at 15% 85%, rgba(249, 115, 22, 0.08), transparent 60%)',
        }}
      />

      <div className="relative z-10">
        <HeroSection onSubmitClick={scrollToForm} />

        <div ref={formRef} id="form-section">
          <WorkUpdateForm />
        </div>

        <Footer />
      </div>
    </main>
  );
}
