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
  Award,
  Zap
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
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-dot-pattern border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-slate-100/60"
    >
      {/* Subtle colorful top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-100/60 via-blue-50/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Availability & Location Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-medium text-emerald-800 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AVAILABLE FOR COLLABORATION & RESEARCH</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              PURWAKARTA, ID
            </span>
            <span>•</span>
            <span className="text-slate-700 font-medium">STT WASTUKANCANA 2025</span>
          </div>
        </div>

        {/* 2-Column Hero: Left Big Typography + Right Full-Color Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center text-left">
          
          {/* Left Column (7 cols): Giant Typography, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 uppercase leading-[0.92]">
                  FARID NADIR
                </h1>
                <span className="text-xl sm:text-3xl font-mono text-indigo-600 font-bold">®</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light tracking-tight text-slate-500 uppercase leading-[0.95]">
                AMRULLOH.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans max-w-xl">
              Mahasiswa Teknik Informatika yang berfokus pada <span className="text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded-md">rekayasa sistem cerdas (AI)</span>, <span className="text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded-md">telemetri IoT mikroelektronika</span>, dan <span className="text-slate-900 font-semibold">arsitektur Full-Stack modern</span> untuk ketahanan energi, pangan, dan solusi berdampak nyata.
            </p>

            {/* Quick Badges Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-semibold shadow-2xs">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                Juara 1 Nasional KNEC 2026
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                🏛️ GMNI Wastukancana
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                📍 Purwakarta, ID
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-cta-projects"
                onClick={() => onNavigate('proyek')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-95 group"
              >
                <span>Explore Works // [05]</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-cv"
                onClick={onOpenCv}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm transition-all duration-200 active:scale-95"
              >
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Resume / CV</span>
              </button>

              <button
                id="hero-cta-contact"
                onClick={() => onNavigate('kontak')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition-all duration-200"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4 text-indigo-600" />
              </button>
            </div>

          </div>

          {/* Right Column (5 cols): Large Prominent Full-Color Photo Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden bg-white border border-slate-200/90 p-3 shadow-xl transition-all duration-300 hover:shadow-2xl group">
              
              {/* Photo Frame Container (Full Vibrant Color, Sharp & Clear) */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100">
                <img 
                  src={PERSONAL_INFO.profilePhotoUrl} 
                  alt={PERSONAL_INFO.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Gradient at Bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Floating Badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-[11px] font-mono text-slate-800 font-bold shadow-sm">
                    FN • 2026
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-[10px] font-mono text-white font-semibold shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Active
                  </span>
                </div>

                {/* Bottom Floating Info inside Photo */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 tracking-tight">{PERSONAL_INFO.name}</span>
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-bold border border-amber-200">
                      🥇 Juara 1 KNEC
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-600 truncate">
                    Wakil Ketua Bidang Sosial Politik GMNI Wastukancana
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bento Grid Highlights underneath */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-16 text-left">
          
          {/* Card 1: Champion Spotlight (8 cols) */}
          <div 
            onClick={() => onOpenProject('avo-bio')}
            className="md:col-span-8 bright-card rounded-3xl p-6 sm:p-8 cursor-pointer relative overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-amber-800 font-bold flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <span>JUARA 1 NASIONAL KNEC 2026 // CASE STUDY [01]</span>
                </span>
                <span className="text-xs font-mono text-indigo-600 font-semibold flex items-center gap-1 group-hover:text-indigo-800 transition-colors">
                  <span>Launch Simulator</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                AVO-BIO: Smart Biogas Telemetry & AI Prediction
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mt-2 font-sans">
                Sistem monitoring biogas real-time berbasis sensor IoT (ESP32) dan model AI prediktif yang meraih Juara 1 Nasional KNEC 2026 subtema Ketahanan Pangan & Energi.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-100">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                <span className="text-[10px] font-mono text-slate-500 block font-medium">SENSOR UPTIME</span>
                <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block">99.4%</span>
              </div>
              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200/60">
                <span className="text-[10px] font-mono text-emerald-700 block font-medium">GAS EFFICIENCY</span>
                <span className="text-lg font-bold font-mono text-emerald-700 mt-0.5 block">+34%</span>
              </div>
              <div className="bg-indigo-50/60 p-3 rounded-2xl border border-indigo-200/60">
                <span className="text-[10px] font-mono text-indigo-700 block font-medium">SYSTEM STACK</span>
                <span className="text-xs font-semibold text-indigo-900 mt-1 block font-mono">ESP32 + MQTT</span>
              </div>
            </div>
          </div>

          {/* Card 2: Core Engineering Discipline (4 cols) */}
          <div className="md:col-span-4 bright-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold block w-fit mb-3">
                Core Capabilities
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Systems & Architecture
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                Pengembangan aplikasi berbasis data, integrasi perangkat keras telemetri sensor, dan model kecerdasan buatan terapan.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
              {[
                { name: 'React 19', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
                { name: 'Next.js', bg: 'bg-slate-100 text-slate-800 border-slate-300' },
                { name: 'Python', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
                { name: 'ESP32 IoT', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                { name: 'LSTM AI', bg: 'bg-purple-50 text-purple-800 border-purple-200' },
                { name: 'Supabase', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
              ].map((tech, idx) => (
                <span key={idx} className={`text-[10px] font-mono px-2.5 py-1 rounded-xl border font-semibold ${tech.bg}`}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
