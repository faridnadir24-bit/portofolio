import React from 'react';
import { 
  ArrowRight, 
  Mail, 
  Trophy, 
  MapPin, 
  FileText, 
  ArrowUpRight,
  Sparkles,
  Layers,
  Code2,
  Activity,
  CheckCircle2
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
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-grid-pattern border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Availability & Location Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-white/10 text-xs font-mono text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AVAILABLE FOR RESEARCH & COLLABORATION</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-stone-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FB4617]" />
              PURWAKARTA, ID
            </span>
            <span>//</span>
            <span className="text-stone-300">STT WASTUKANCANA 2025</span>
          </div>
        </div>

        {/* Big Statement Headline (Benjamin Creative Style) */}
        <div className="text-left space-y-6 max-w-5xl">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.92]">
                FARID NADIR
              </h1>
              <span className="text-2xl sm:text-4xl font-mono text-[#FB4617] font-bold">®</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-stone-400 uppercase leading-[0.95]">
              AMRULLOH.
            </h2>
          </div>

          <p className="text-base sm:text-xl text-stone-300 max-w-3xl leading-relaxed font-normal">
            Mahasiswa Teknik Informatika yang berfokus pada <span className="text-white font-semibold">rekayasa sistem cerdas (AI)</span>, <span className="text-white font-semibold">telemetri IoT mikroelektronika</span>, dan <span className="text-white font-semibold">arsitektur Full-Stack modern</span> untuk ketahanan energi, pangan, dan solusi berdampak nyata.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              id="hero-cta-projects"
              onClick={() => onNavigate('proyek')}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold bg-white text-black hover:bg-stone-200 transition-all duration-200 active:scale-95 shadow-xl group"
            >
              <span>Explore Works // [05]</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-cta-cv"
              onClick={onOpenCv}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-[#161616] hover:bg-[#1E1E1E] text-white border border-white/10 transition-all duration-200 active:scale-95"
            >
              <FileText className="w-4 h-4 text-stone-400" />
              <span>Resume / CV *</span>
            </button>

            <button
              id="hero-cta-contact"
              onClick={() => onNavigate('kontak')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-medium text-stone-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4 text-[#FB4617]" />
            </button>
          </div>
        </div>

        {/* Signature Benjamin Hoang Orange Highlight Ticker */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-[#FD6A3A] to-[#FB4617] p-3 text-white overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase px-2">
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-white" />
              JUARA 1 NASIONAL KNEC 2026 (KETAHANAN PANGAN & ENERGI)
            </span>
            <span className="hidden md:inline-block">
              STT WASTUKANCANA • GMNI SOCIAL-POLITICAL LEADER
            </span>
          </div>
        </div>

        {/* Bento Grid Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-8 text-left">
          
          {/* Card 1: Champion Trophy Spotlight (Large 7 cols) */}
          <div 
            onClick={() => onOpenProject('avo-bio')}
            className="md:col-span-7 dark-card rounded-3xl p-6 sm:p-8 cursor-pointer relative overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-[#FB4617] font-bold">
                  // CASE STUDY [01]
                </span>
                <span className="text-xs font-mono text-stone-400 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>Launch Simulator</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-stone-200 transition-colors">
                AVO-BIO: Smart Biogas Telemetry & AI Prediction
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl mt-2 font-sans">
                Sistem monitoring biogas real-time berbasis sensor IoT (ESP32) dan model AI prediktif yang meraih Juara 1 Nasional KNEC 2026 subtema Ketahanan Pangan & Energi.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/5">
              <div className="bg-[#111111] p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] font-mono text-stone-400 block">SENSOR UPTIME</span>
                <span className="text-lg font-bold font-mono text-white mt-0.5 block">99.4%</span>
              </div>
              <div className="bg-[#111111] p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] font-mono text-stone-400 block">GAS EFFICIENCY</span>
                <span className="text-lg font-bold font-mono text-emerald-400 mt-0.5 block">+34%</span>
              </div>
              <div className="bg-[#111111] p-3 rounded-2xl border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-stone-400 block">SYSTEM STACK</span>
                <span className="text-xs font-semibold text-white mt-1 block font-mono">ESP32 + MQTT</span>
              </div>
            </div>
          </div>

          {/* Card 2: Profile & Leadership Roles (5 cols) */}
          <div className="md:col-span-5 dark-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-[#111111] flex-shrink-0">
                  <img 
                    src={PERSONAL_INFO.profilePhotoUrl} 
                    alt={PERSONAL_INFO.name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-stone-300 border border-white/10">
                  Leadership & Impact
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-xs text-stone-300 mt-1 font-mono">
                Wakil Ketua Bidang Sosial Politik GMNI Wastukancana
              </p>
              <p className="text-xs text-stone-400 mt-3 leading-relaxed font-sans">
                Memadukan kedisiplinan organisasi legislasi siswa (Eks Ketua Komisi A MPK SMA) dengan kemampuan komputasi perangkat lunak dan riset terapan.
              </p>
            </div>

            {/* Quick Badges Stack */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {['React 19', 'Next.js', 'Python', 'ESP32', 'LSTM AI', 'Supabase'].map((tech, idx) => (
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
