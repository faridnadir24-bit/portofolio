import React from 'react';
import { ArrowRight, FileText, ArrowUpRight, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface HeroProps {
  onNavigate: (id: string) => void;
  onOpenProject: (projectId: string) => void;
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenProject, onOpenCv }) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="hero"
      ref={ref}
      className={`relative pt-36 pb-20 md:pt-44 md:pb-28 hero-gradient reveal-section overflow-hidden ${isVisible ? 'in-view' : ''}`}
    >
      {/* Subtle ambient lighting behind hero */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Two-column: text left, photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className="space-y-7 text-left">
            <div
              className={`flex items-center gap-2.5 text-sm reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-neutral-500 font-medium">Terbuka untuk kolaborasi</span>
            </div>

            <div className={`reveal-item ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '200ms' }}>
              <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Farid Nadir<br/>Amrulloh
                <span className="text-blue-600">.</span>
              </h1>
              <p className="mt-5 text-lg text-neutral-600 leading-relaxed max-w-lg">
                Mahasiswa Teknik Informatika di STT Wastukancana, merancang solusi berbasis <strong className="text-neutral-900 font-semibold">kecerdasan buatan</strong>, <strong className="text-neutral-900 font-semibold">telemetri IoT</strong>, dan arsitektur full-stack modern.
              </p>
            </div>

            {/* Achievement line */}
            <div
              className={`flex flex-wrap items-center gap-2 text-sm reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="font-semibold text-amber-800 bg-amber-50/90 px-3 py-1 rounded-lg border border-amber-200/80 shadow-2xs flex items-center gap-1.5">
                <span>🏆</span>
                <span>Juara 1 KNEC 2026</span>
              </span>
              <span className="font-semibold text-blue-800 bg-blue-50/90 px-3 py-1 rounded-lg border border-blue-200/80 shadow-2xs flex items-center gap-1.5">
                <span>🥇</span>
                <span>Juara 5 MEA 2026</span>
              </span>
              <span className="text-neutral-400 text-xs hidden sm:inline">&middot; STT Wastukancana</span>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-wrap items-center gap-3 pt-1 reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '400ms' }}
            >
              <button
                onClick={() => onNavigate('proyek')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/10 transition-all active:scale-[0.98]"
              >
                <span>Lihat Proyek</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCv}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-neutral-700 border border-neutral-300 hover:border-neutral-400 hover:bg-white hover:shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-neutral-400" />
                <span>Resume</span>
              </button>

              <button
                onClick={() => onNavigate('kontak')}
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-neutral-500 hover:text-blue-600 transition-colors link-underline"
              >
                <span>Hubungi saya</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Photo with float + zoom hover */}
          <div
            className={`flex justify-center lg:justify-end reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative w-full max-w-sm photo-float">
              <div className="aspect-[3/4] rounded-2xl photo-zoom bg-neutral-100 shadow-xl shadow-neutral-200/50">
                <img
                  src={PERSONAL_INFO.profilePhotoUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top rounded-2xl"
                  loading="eager"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                <span>Purwakarta, 2026</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured project */}
        <div
          onClick={() => onOpenProject('avo-bio')}
          className={`mt-20 card-gradient-border p-6 sm:p-8 cursor-pointer group reveal-item ${isVisible ? 'in-view' : ''}`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Proyek Unggulan</p>
                <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">2x Juara Nasional</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                AVO-BIO (v1 & 2.0)
              </h3>
              <p className="text-sm text-neutral-500 max-w-xl">
                Sistem telemetri biogas cerdas berbasis IoT & AI prediktif — Juara 1 Nasional KNEC 2026 & Juara 5 Merdeka Essay Award 2026.
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm shrink-0">
              <div className="text-center hidden sm:block">
                <p className="text-2xl font-bold text-neutral-900 font-mono">99.4%</p>
                <p className="text-xs text-neutral-400 mt-0.5">Uptime</p>
              </div>
              <div className="text-center hidden sm:block">
                <p className="text-2xl font-bold text-emerald-600 font-mono">+34%</p>
                <p className="text-xs text-neutral-400 mt-0.5">Efisiensi</p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => onNavigate('tentang')}
            className="group flex flex-col items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-900 transition-colors p-2"
            title="Gulir ke bagian Tentang"
          >
            <span>Jelajahi Profil</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-neutral-400 group-hover:text-blue-600 transition-colors" />
          </button>
        </div>

      </div>
    </section>
  );
};
