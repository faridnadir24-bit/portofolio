import React from 'react';
import { ArrowUp, Github, Linkedin, MessageCircle } from 'lucide-react';
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
    { id: 'pencapaian', label: 'Pencapaian' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const socials = [
    {
      label: 'GitHub',
      icon: Github,
      href: PERSONAL_INFO.githubUrl,
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      href: PERSONAL_INFO.linkedinUrl,
    },
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      href: PERSONAL_INFO.whatsappUrl,
    },
  ];

  return (
    <footer className="border-t border-neutral-200 py-12 text-left">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">

          {/* Column 1 — Brand & Social */}
          <div className="space-y-4">
            <p className="font-bold text-neutral-900">{PERSONAL_INFO.name}</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Teknik Informatika &middot; STT Wastukancana Purwakarta
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Navigasi
            </p>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3 — Status & Colophon */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Status
            </p>

            {/* Availability pill */}
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-sm text-emerald-700">
              <span aria-hidden="true">🟢</span>
              Tersedia untuk magang &amp; kolaborasi
            </span>

            {/* Tech colophon */}
            <p className="text-xs text-neutral-400 leading-relaxed pt-2">
              Dibangun dengan React, TypeScript &amp; Tailwind CSS
            </p>
          </div>
        </div>

        {/* Bottom bar */}
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
