import React from 'react';
import { 
  ArrowRight, 
  Trophy, 
  MapPin, 
  FileText, 
  ArrowUpRight,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  Award
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (id: string) => void;
  onOpenProject: (projectId: string) => void;
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenProject, onOpenCv }) => {
  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Availability & Location Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-white/10 text-xs font-mono text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AVAILABLE FOR COLLABORATION & RESEARCH</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-stone-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              PURWAKARTA, INDONESIA
            </span>
            <span>•</span>
            <span className="text-stone-300">STT WASTUKANCANA 2025</span>
          </div>
        </div>

        {/* 2-Column Hero: Left Oversized Typography + Right Prominent Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center text-left">
          
          {/* Left Column (7 cols): Giant Typography, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase leading-[0.92]">
                  FARID NADIR
                </h1>
                <span className="text-xl sm:text-3xl font-mono text-stone-500 font-bold">®</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light tracking-tight text-stone-400 uppercase leading-[0.95]">
                AMRULLOH.
              </h2>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-stone-300 leading-relaxed font-sans max-w-xl">
              Mahasiswa Teknik Informatika yang berfokus pada <span className="text-white font-semibold">rekayasa kecerdasan buatan (AI)</span>, <span className="text-white font-semibold">telemetri IoT mikroelektronika</span>, dan <span className="text-white font-semibold">arsitektur Full-Stack modern</span> untuk ketahanan energi, pangan, dan solusi berdampak nyata.
            </p>

            {/* Quick Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-stone-400 pt-1">
              <span className="flex items-center gap-1.5 text-stone-200">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Juara 1 Nasional KNEC 2026
              </span>
              <span>•</span>
              <span className="text-stone-300">GMNI Wastukancana</span>
              <span>•</span>
              <span className="text-stone-400">Purwakarta, ID</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-cta-projects"
                onClick={() => onNavigate('proyek')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-black hover:bg-stone-200 transition-all duration-200 active:scale-95 shadow-xl group"
              >
                <span>Explore Works // [05]</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-cv"
                onClick={onOpenCv}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-[#161616] hover:bg-[#1E1E1E] text-white border border-white/10 transition-all duration-200 active:scale-95"
              >
                <FileText className="w-4 h-4 text-stone-400" />
                <span>Resume / CV</span>
              </button>

              <button
                id="hero-cta-contact"
                onClick={() => onNavigate('kontak')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium text-stone-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>

          </div>

          {/* Right Column (5 cols): Large Prominent Portrait Photo Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden bg-[#161616] border border-white/10 p-3 shadow-2xl group">
              
              {/* Photo Frame Container */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#1C1C1C]">
                <img 
                  src={PERSONAL_INFO.profilePhotoUrl} 
                  alt={PERSONAL_INFO.name} 
                  className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />

                {/* Subtle Dark Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Floating Badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white font-semibold">
                    FN • 2026
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Active
                  </span>
                </div>

                {/* Bottom Floating Info inside Photo */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left p-3.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white tracking-tight">{PERSONAL_INFO.name}</span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                      🥇 Juara 1 KNEC
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-stone-400 truncate">
                    Wakil Ketua Bidang Sosial Politik GMNI
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bento Grid Spotlight (AVO-BIO Juara 1 & Capabilities) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-16 text-left">
          
          {/* Card 1: Champion Trophy Spotlight (Large 8 cols) */}
          <div 
            onClick={() => onOpenProject('avo-bio')}
            className="md:col-span-8 dark-card rounded-3xl p-6 sm:p-8 cursor-pointer relative overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>JUARA 1 NASIONAL KNEC 2026 // CASE STUDY [01]</span>
                </span>
                <span className="text-xs font-mono text-stone-400 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>Launch Simulator</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-stone-200 transition-colors">
                AVO-BIO: Smart Biogas Telemetry & AI Prediction
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl mt-2 font-sans">
                Sistem monitoring biogas real-time berbasis sensor IoT (ESP32) dan model AI prediktif yang meraih Juara 1 Nasional KNEC 2026 subtema Ketahanan Pangan & Energi.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/5">
              <div className="bg-[#111111] p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] font-mono text-stone-400 block">SENSOR UPTIME</span>
                <span className="text-lg font-bold font-mono text-white mt-0.5 block">99.4%</span>
              </div>
              <div className="bg-[#111111] p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] font-mono text-stone-400 block">GAS EFFICIENCY</span>
                <span className="text-lg font-bold font-mono text-emerald-400 mt-0.5 block">+34%</span>
              </div>
              <div className="bg-[#111111] p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] font-mono text-stone-400 block">SYSTEM STACK</span>
                <span className="text-xs font-semibold text-white mt-1 block font-mono">ESP32 + MQTT</span>
              </div>
            </div>
          </div>

          {/* Card 2: Core Engineering Discipline (4 cols) */}
          <div className="md:col-span-4 dark-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-stone-300 border border-white/10 block w-fit mb-3">
                Core Stack
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Systems & Architecture
              </h3>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed font-sans">
                Pengembangan aplikasi berbasis data, integrasi perangkat keras telemetri, dan model kecerdasan buatan.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {['React 19', 'Next.js', 'Python', 'ESP32', 'LSTM AI', 'Supabase', 'TypeScript'].map((tech, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-stone-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
