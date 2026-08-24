import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { id: 'tentang', label: 'Tentang' },
    { id: 'proyek', label: 'Proyek' },
    { id: 'keahlian', label: 'Keahlian' },
    { id: 'pengalaman', label: 'Pengalaman' },
    { id: 'kontak', label: 'Kontak' },
  ];

  return (
    <footer className="border-t border-neutral-200 py-12 text-left">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        <div className="flex flex-col sm:flex-row justify-between gap-8 pb-10">
          {/* Brand */}
          <div className="space-y-2 max-w-sm">
            <p className="font-bold text-neutral-900">{PERSONAL_INFO.name}</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Teknik Informatika &middot; STT Wastukancana Purwakarta
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>&copy; 2026 {PERSONAL_INFO.name}</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
