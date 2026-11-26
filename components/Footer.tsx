'use client';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-4 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="text-center sm:text-left">
          <span className="font-semibold text-slate-200">CAMPUS CONNECT</span>
          <span className="mx-2 text-white/20">•</span>
          <span>LNCT Group of Colleges, Bhopal</span>
        </div>

        <div className="flex items-center gap-4">
          <span>04 Dec 2026</span>
          <span className="text-white/20">•</span>
          <a
            href="https://campus.mygov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            campus.mygov.in
          </a>
        </div>
      </div>
    </footer>
  );
}
