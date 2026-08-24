import React from 'react';
import { ArrowUp, Trophy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0A0A0A] border-t border-white/5 py-16 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5 items-start">
          
          {/* Brand Col (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs font-mono">
                FN
              </div>
              <div>
                <h3 className="font-bold text-base text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs font-mono text-stone-400">
                  Systems & AI Engineer • {PERSONAL_INFO.university}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed font-sans">
              Merancang sistem komputasi terapan, algoritma kecerdasan buatan, dan telemetri IoT mikroelektronika dengan akuntabilitas dan performa tinggi.
            </p>
          </div>

          {/* Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-mono text-stone-400">
              <li>
                <button onClick={() => onNavigate('tentang')} className="hover:text-white transition-colors">
                  01 // About
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('proyek')} className="hover:text-white transition-colors">
                  02 // Work [05]
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('keahlian')} className="hover:text-white transition-colors">
                  03 // Stack
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pengalaman')} className="hover:text-white transition-colors">
                  04 // Experience
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kontak')} className="hover:text-white transition-colors">
                  05 // Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Key Honor (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-2">
              Recognition
            </span>
            <div className="p-4 bg-[#141414] rounded-2xl border border-white/5 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold font-mono">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Juara 1 KNEC 2026</span>
              </div>
              <p className="text-stone-400 text-[11px]">AVO-BIO: Smart Biogas Telemetry</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <p>© 2026 {PERSONAL_INFO.name}. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span>PURWAKARTA, WEST JAVA, ID</span>
            <button
              id="footer-scroll-top-btn"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
