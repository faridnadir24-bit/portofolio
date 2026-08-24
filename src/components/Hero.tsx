import React from 'react';
import { 
  ArrowRight, 
  Mail, 
  Trophy, 
  Cpu, 
  Sparkles, 
  MapPin, 
  Award,
  Database,
  ArrowUpRight,
  CheckCircle2,
  FileText
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
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono font-medium text-stone-600 tracking-wide">
                {PERSONAL_INFO.status}
              </span>
            </div>

            {/* Main Name Heading with Authentic Editorial Serif Contrast */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12]">
                Farid Nadir <br />
                <span className="font-serif-italic font-normal text-stone-600">
                  Amrulloh
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-mono font-semibold text-stone-600 uppercase tracking-wider">
                Mahasiswa Teknik Informatika • Leadership, Technology & Social Impact
              </p>
              <p className="text-base sm:text-lg font-normal text-stone-600 max-w-2xl leading-relaxed pt-1">
                "{PERSONAL_INFO.tagline}"
              </p>
            </div>

            {/* Quick Competency Badges (Harmonious Monochrome) */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium bg-stone-100 text-stone-700 border border-stone-200">
                <Cpu className="w-3.5 h-3.5 text-stone-600" />
                IoT & Embedded Hardware
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium bg-stone-100 text-stone-700 border border-stone-200">
                <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                AI & Machine Learning (LSTM)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium bg-stone-100 text-stone-700 border border-stone-200">
                <Database className="w-3.5 h-3.5 text-stone-600" />
                Full-Stack Systems & Supabase
              </span>
            </div>

            {/* CTA Action Buttons (Solid, High-Contrast Human Styling) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-cta-projects"
                onClick={() => onNavigate('proyek')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 shadow-sm hover:shadow-md transition-all duration-200 active:scale-98 group"
              >
                <span>Lihat 5 Proyek Rekayasa</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-cta-cv"
                onClick={onOpenCv}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white text-stone-800 hover:bg-stone-50 border border-stone-300 shadow-2xs hover:shadow-xs transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-stone-600" />
                <span>Lihat Resume / CV</span>
              </button>

              <button
                id="hero-cta-contact"
                onClick={() => onNavigate('kontak')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-stone-600" />
                <span>Hubungi</span>
              </button>
            </div>

            {/* Highlight Champion Banner (Tasteful Warm Bronze Accent) */}
            <div 
              onClick={() => onOpenProject('avo-bio')}
              className="inline-flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-stone-400 hover:shadow-sm cursor-pointer transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 flex-shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <p className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors flex items-center gap-1.5">
                  <span>Juara 1 Nasional KNEC 2026 (Ketahanan Pangan & Energi)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </p>
                <p className="text-stone-500 mt-0.5">Inovasi Sistem Cerdas Biogas AVO-BIO (Kilat Akademik Nusantara & Sobat Bumi UPP) • Klik untuk simulasi</p>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Main Card Container */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md relative overflow-hidden text-left">
                
                {/* Top header strip in card */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-mono font-medium text-stone-600">Purwakarta, Indonesia</span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    Informatika 2025
                  </span>
                </div>

                {/* Profile Visual: Elegant Avatar Frame */}
                <div className="relative rounded-2xl bg-stone-50 p-6 border border-stone-200 flex flex-col items-center justify-center text-center">
                  
                  {/* Portrait Avatar Representation */}
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-2xl bg-stone-200 p-1 shadow-xs">
                      <div className="w-full h-full rounded-xl bg-white flex flex-col items-center justify-center relative overflow-hidden">
                        <img 
                          src={PERSONAL_INFO.profilePhotoUrl} 
                          alt={PERSONAL_INFO.name} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>

                    {/* Verified Badge Icon */}
                    <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-xs border border-stone-200">
                      <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center text-white">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </div>
                    </div>
                  </div>

                  {/* Profile info text inside card */}
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    Farid Nadir Amrulloh
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-0.5">
                    STT Wastukancana Purwakarta
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] font-mono font-medium text-stone-700 border border-stone-200 shadow-2xs">
                    <span>Wakil Ketua Bidang Sospol GMNI</span>
                  </div>

                </div>

                {/* Card Quick Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-left">
                    <p className="text-[11px] font-mono text-stone-500">Prestasi Utama</p>
                    <p className="text-xs font-bold text-stone-900 mt-0.5">Juara 1 KNEC 2026</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-left">
                    <p className="text-[11px] font-mono text-stone-500">Kepemimpinan</p>
                    <p className="text-xs font-bold text-stone-900 mt-0.5">GMNI, MPK & PMR</p>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    Purwakarta, Jabar
                  </span>
                  <a 
                    href="#kontak"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('kontak');
                    }}
                    className="font-semibold text-stone-800 hover:text-stone-900 flex items-center gap-1 hover:underline"
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
