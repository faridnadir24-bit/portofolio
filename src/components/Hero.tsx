import React from 'react';
import { ArrowRight, FileText, ArrowUpRight, ChevronDown, Award, Github, Terminal, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagneticHover } from '../hooks/useMagneticHover';
import { useParallax } from '../hooks/useParallax';

interface HeroProps {
  onNavigate: (id: string) => void;
  onOpenProject: (projectId: string) => void;
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenProject, onOpenCv }) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const magneticPrimary = useMagneticHover(3);
  const magneticSecondary = useMagneticHover(2);
  const parallaxRef = useParallax(0.04);

  return (
    <section
      id="hero"
      ref={ref}
      className={`relative pt-36 pb-20 md:pt-44 md:pb-28 reveal-section overflow-hidden ${isVisible ? 'in-view' : ''}`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Two-column: text left, photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className="space-y-6 text-left">

            {/* Developer status pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>git:main (clean) &middot; 29 repos &middot; Purwakarta, ID</span>
            </div>

            <div className={`reveal-clip ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '200ms' }}>
              <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.05]">
                Farid Nadir<br/>Amrulloh
                <span className="text-blue-600 dark:text-blue-500">.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg font-sans">
                Mahasiswa Teknik Informatika di STT Wastukancana Purwakarta. Merancang arsitektur <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">telemetri IoT ESP32</strong>, sistem <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">SCADA industri</strong>, dan <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">model AI terapan</strong>.
              </p>
            </div>

            {/* Achievement line */}
            <div
              className={`flex flex-wrap items-center gap-2 text-sm reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="font-mono text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                <span>Juara 1 KNEC 2026</span>
              </span>
              <span className="font-mono text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Juara 3 SENADA 2026</span>
              </span>
              <span className="font-mono text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Juara 5 MEA 2026</span>
              </span>
              <span className="text-neutral-400 dark:text-neutral-500 text-xs hidden sm:inline font-mono">&middot; STT Wastukancana</span>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-wrap items-center gap-3 pt-2 reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '400ms' }}
            >
              <button
                ref={magneticPrimary.ref as React.RefObject<HTMLButtonElement>}
                onMouseMove={magneticPrimary.onMouseMove}
                onMouseLeave={magneticPrimary.onMouseLeave}
                onClick={() => onNavigate('proyek')}
                className="magnetic-hover inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>Eksplorasi Prototipe</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                ref={magneticSecondary.ref as React.RefObject<HTMLButtonElement>}
                onMouseMove={magneticSecondary.onMouseMove}
                onMouseLeave={magneticSecondary.onMouseLeave}
                onClick={onOpenCv}
                className="magnetic-hover inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-white dark:hover:bg-neutral-800 transition-all"
              >
                <FileText className="w-4 h-4 text-neutral-400" />
                <span>Curriculum Vitae</span>
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Profil GitHub Farid Nadir"
              >
                <Github className="w-4 h-4" />
                <span className="font-mono text-xs">github/faridnadir24-bit ↗</span>
              </a>
            </div>
          </div>

          {/* Right: Photo with clean stable engineering framing */}
          <div
            className={`flex justify-center lg:justify-end reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div ref={parallaxRef} className="relative w-full max-w-sm">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-200/40 dark:shadow-black/50">
                <img
                  src={PERSONAL_INFO.profilePhotoUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>

              {/* Verified developer tag */}
              <div className="absolute bottom-4 -left-3 bg-white/95 dark:bg-[#111215]/95 border border-neutral-200/90 dark:border-neutral-800 shadow-lg rounded-xl px-3.5 py-2 flex items-center gap-2.5 text-xs text-neutral-900 dark:text-neutral-100 font-mono">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <div>
                  <p className="font-bold leading-none">Farid Nadir</p>
                  <p className="text-[10px] text-neutral-400 leading-none mt-0.5">IoT &amp; AI Systems</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                <span>STT Wastukancana &middot; 2026</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Ready to Build
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured project highlight card */}
        <div
          onClick={() => onOpenProject('avo-bio')}
          className={`mt-16 card-gradient-border p-6 sm:p-7 cursor-pointer group reveal-item ${isVisible ? 'in-view' : ''}`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-mono">
                  Prototipe Utama
                </span>
                <span className="text-[11px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-200 dark:border-neutral-700">
                  github.com/faridnadir24-bit/biogas ↗
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                AVO-BIO (v1 &amp; v2.0) — Smart Biogas Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
                Sistem telemetri sensor gas biogas real-time berbasis ESP32 MQTT &amp; komputasi analitik prediktif — Juara 1 Nasional KNEC 2026 &amp; Juara 5 Merdeka Essay Award 2026.
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm shrink-0">
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-mono">99.4%</p>
                <p className="text-xs text-neutral-400 mt-0.5 font-mono">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">+34%</p>
                <p className="text-xs text-neutral-400 mt-0.5 font-mono">Efisiensi</p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-300 dark:text-neutral-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => onNavigate('tentang')}
            className="group flex flex-col items-center gap-1.5 text-xs font-mono text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors p-2"
            title="Gulir ke bagian Tentang"
          >
            <span>Jelajahi Profil &amp; Rekam Jejak</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-neutral-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </button>
        </div>

      </div>
    </section>
  );
};
