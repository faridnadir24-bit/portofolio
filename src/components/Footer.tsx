import React from 'react';
import { ArrowUp, Heart, Sparkles, Trophy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-white border-t border-stone-200/80 py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-100 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C7CE0] to-[#B48CE0] flex items-center justify-center text-white font-serif font-bold text-base shadow-2xs">
                FN
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2A2A3C]">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-[#5A5A72]">
                  {PERSONAL_INFO.title} • {PERSONAL_INFO.university}
                </p>
              </div>
            </div>
            <p className="text-xs text-[#5A5A72] max-w-md leading-relaxed pt-1">
              Fokus pada rekayasa perangkat lunak, sistem cerdas berbasis AI, IoT terapan, dan perancangan platform yang akuntabel serta berdampak luas.
            </p>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono font-semibold text-[#2A2A3C] uppercase tracking-wider block">
              Navigasi Halaman
            </span>
            <ul className="space-y-1.5 text-xs text-[#5A5A72]">
              <li>
                <button onClick={() => onNavigate('tentang')} className="hover:text-[#6C7CE0] transition-colors">
                  Tentang Saya
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('proyek')} className="hover:text-[#6C7CE0] transition-colors">
                  Proyek & Prototype
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('keahlian')} className="hover:text-[#6C7CE0] transition-colors">
                  Keahlian Teknis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pengalaman')} className="hover:text-[#6C7CE0] transition-colors">
                  Pendidikan & Pengalaman
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kontak')} className="hover:text-[#6C7CE0] transition-colors">
                  Kontak & Pesan
                </button>
              </li>
            </ul>
          </div>

          {/* Key Honor Col */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono font-semibold text-[#2A2A3C] uppercase tracking-wider block">
              Inovasi Utama
            </span>
            <div className="p-3 bg-[#FDF9F3] rounded-xl border border-stone-200/80 text-xs">
              <div className="flex items-center gap-1.5 text-amber-600 font-semibold mb-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>Juara 1 Nasional KNEC 2026</span>
              </div>
              <p className="text-[#6A6A82]">AVO-BIO: Biogas Monitoring (Kilat Akademik Nusantara & Sobat Bumi UPP)</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7C7C92]">
          <p>© 2026 {PERSONAL_INFO.name}. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="font-mono">Purwakarta, Jawa Barat, ID</span>
            <button
              id="footer-scroll-top-btn"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#2A2A3C] font-mono text-[11px] transition-colors"
            >
              <span>Ke Atas</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
