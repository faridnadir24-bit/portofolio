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
    { id: 'pencapaian', label: 'Sertifikat' },
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
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-12 text-left">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">

          {/* Column 1 — Brand & Social */}
          <div className="space-y-4">
            <p className="font-bold text-neutral-900 dark:text-neutral-100">{PERSONAL_INFO.name}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
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
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Navigasi
            </p>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3 — Status & Colophon */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Status
            </p>

            {/* Availability pill */}
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Tersedia untuk magang &amp; kolaborasi</span>
            </span>

            {/* Tech colophon */}
            <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed pt-2">
              Dibangun dengan React, TypeScript &amp; Tailwind CSS
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
          <p>&copy; 2026 {PERSONAL_INFO.name}</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
