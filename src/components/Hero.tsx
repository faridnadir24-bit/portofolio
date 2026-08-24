import React from 'react';
import { 
  ArrowRight, 
  Mail, 
  Trophy, 
  Cpu, 
  Sparkles, 
  MapPin, 
  Award,
  Layers,
  Database,
  ArrowUpRight,
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
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Background Pastel Glow Orbs (Subtle, gentle on light background) */}
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full orb-glow-periwinkle pointer-events-none -z-10" />
      <div className="absolute top-28 right-10 w-96 h-96 rounded-full orb-glow-lavender pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/80 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono font-medium text-[#4A4A62] tracking-wide">
                {PERSONAL_INFO.status}
              </span>
            </div>

            {/* Main Name Heading with Serif and Italic Emphasis */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#2A2A3C] leading-[1.12]">
                Farid Nadir <br />
                <span className="font-serif-italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#6C7CE0] via-[#8E7FE8] to-[#B48CE0]">
                  Amrulloh
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-mono font-semibold text-[#6C7CE0] uppercase tracking-wider">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-base sm:text-lg font-normal text-[#4A4A62] max-w-2xl leading-relaxed pt-1">
                "{PERSONAL_INFO.tagline}"
              </p>
            </div>

            {/* Quick Competency Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#6C7CE0]/8 text-[#5161C5] border border-[#6C7CE0]/20">
                <Cpu className="w-3.5 h-3.5" />
                IoT & Microcontroller
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#B48CE0]/10 text-[#8452B8] border border-[#B48CE0]/20">
                <Sparkles className="w-3.5 h-3.5" />
                AI & Machine Learning (LSTM)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-[#4A4A62] border border-stone-200">
                <Database className="w-3.5 h-3.5" />
                Full-Stack & Supabase
              </span>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-cta-projects"
                onClick={() => onNavigate('proyek')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-[#6C7CE0] text-white hover:bg-[#5868CA] shadow-xs hover:shadow-md transition-all duration-200 active:scale-98 group"
              >
                <span>Lihat 5 Proyek</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-cta-cv"
                onClick={onOpenCv}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white text-[#2A2A3C] hover:bg-stone-50 border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-[#6C7CE0]" />
                <span>Lihat Resume / CV</span>
              </button>

              <button
                id="hero-cta-contact"
                onClick={() => onNavigate('kontak')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-transparent text-[#5A5A72] hover:text-[#2A2A3C] hover:bg-stone-100/70 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-[#6C7CE0]" />
                <span>Hubungi</span>
              </button>
            </div>

            {/* Highlight Champion Pill */}
            <div 
              onClick={() => onOpenProject('avo-bio')}
              className="inline-flex items-center gap-3 p-3 rounded-2xl bg-white/90 border border-stone-200/80 shadow-xs hover:border-[#6C7CE0]/50 hover:shadow-sm cursor-pointer transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 flex-shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <p className="font-semibold text-[#2A2A3C] group-hover:text-[#6C7CE0] transition-colors flex items-center gap-1.5">
                  <span>Juara 1 Nasional KNEC 2026 (Ketahanan Pangan & Energi)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#6C7CE0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </p>
                <p className="text-[#6A6A82]">Inovasi Sistem Cerdas Biogas AVO-BIO (Kilat Akademik Nusantara & Sobat Bumi UPP) • Klik untuk melihat prototype</p>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Portrait Card in Rounded Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Decorative background border offset */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#6C7CE0]/30 via-[#B48CE0]/30 to-amber-200/30 blur-md opacity-70 -z-10"></div>
              
              {/* Main Card Container */}
              <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-lg relative overflow-hidden">
                
                {/* Top header strip in card */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-mono font-medium text-[#4A4A62]">Purwakarta, Indonesia</span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#6C7CE0]/10 text-[#6C7CE0]">
                    Informatika 2025
                  </span>
                </div>

                {/* Profile Visual: Elegant Avatar / Visual Frame with Geometric accents */}
                <div className="relative rounded-2xl bg-gradient-to-b from-stone-50 to-stone-100/70 p-6 border border-stone-200/60 flex flex-col items-center justify-center text-center overflow-hidden">
                  
                  {/* Background graphic elements */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#6C7CE0]/10 blur-xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#B48CE0]/10 blur-xl"></div>
                  
                  {/* Portrait Avatar Representation */}
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-[#6C7CE0] via-[#8B84E5] to-[#B48CE0] p-1 shadow-md">
                      <div className="w-full h-full rounded-xl bg-white flex flex-col items-center justify-center relative overflow-hidden">
                        {PERSONAL_INFO.profilePhotoUrl ? (
                          <img 
                            src={PERSONAL_INFO.profilePhotoUrl} 
                            alt={PERSONAL_INFO.name} 
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-[#F7F8FE] to-[#EDE8F8] flex flex-col items-center justify-center">
                            <span className="font-serif font-bold text-3xl text-[#5161C5]">
                              FN
                            </span>
                            <span className="text-[10px] font-mono text-[#8452B8] mt-0.5 tracking-wider font-semibold">
                              AMRULLOH
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Verified Badge Icon */}
                    <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-xs">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Profile info text inside card */}
                  <h3 className="font-serif font-bold text-xl text-[#2A2A3C]">
                    Farid Nadir Amrulloh
                  </h3>
                  <p className="text-xs font-medium text-[#5A5A72] mt-0.5">
                    STT Wastukancana Purwakarta
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] font-mono font-medium text-[#2A2A3C] border border-stone-200/90 shadow-2xs">
                    <span>Eks Ketua Komisi A MPK SMA</span>
                  </div>

                </div>

                {/* Card Quick Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-[#FDF9F3] border border-stone-200/70 text-left">
                    <p className="text-[11px] font-mono text-[#6A6A82]">Prestasi Utama</p>
                    <p className="text-xs font-bold text-[#2A2A3C] mt-0.5">Juara 1 KNEC 2026</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FDF9F3] border border-stone-200/70 text-left">
                    <p className="text-[11px] font-mono text-[#6A6A82]">Fokus Riset</p>
                    <p className="text-xs font-bold text-[#2A2A3C] mt-0.5">IoT, AI & Energi</p>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[#6A6A82] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#6C7CE0]" />
                    Purwakarta, Jabar
                  </span>
                  <a 
                    href="#kontak"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('kontak');
                    }}
                    className="font-medium text-[#6C7CE0] hover:text-[#5161C5] flex items-center gap-1"
                  >
                    <span>Kirim Pesan</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
