import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight, Search, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenCommandPalette: () => void;
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  theme,
  onToggleTheme,
  onNavigate,
  onOpenCommandPalette,
  onOpenCv,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'tentang', label: 'Tentang' },
    { id: 'proyek', label: 'Proyek' },
    { id: 'keahlian', label: 'Keahlian' },
    { id: 'pengalaman', label: 'Pengalaman' },
    { id: 'pencapaian', label: 'Sertifikat' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/80 dark:bg-[#09090B]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-neutral-800/80 shadow-xs'
        : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Farid Nadir
        </button>

        {/* Desktop Nav — with active underline indicator */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative text-sm transition-colors pb-0.5 ${
                activeSection === link.id
                  ? 'text-neutral-900 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              }`}
            >
              {link.label}
              {/* Active underline indicator */}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all"
            title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            aria-label="Toggle tema gelap atau terang"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>

          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 rounded-lg border border-neutral-200/60 dark:border-neutral-800 transition-colors"
            title="Buka menu cepat (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <kbd className="font-mono text-[10px] bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 shadow-2xs">Ctrl K</kbd>
          </button>

          <button
            onClick={onOpenCv}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          <button
            onClick={() => handleLinkClick('kontak')}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-2xs"
          >
            <span>Hubungi</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu backdrop & drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-40 animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden relative z-50 bg-white/95 dark:bg-[#09090B]/95 backdrop-blur-xl border-t border-neutral-100 dark:border-neutral-800 px-5 py-4 space-y-1 shadow-xl transition-all duration-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/80 dark:bg-blue-950/40'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
              <button onClick={() => { setMobileMenuOpen(false); onOpenCv(); }}
                className="flex-1 py-2.5 text-xs font-medium text-center border border-neutral-300 dark:border-neutral-700 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
              >Lihat CV</button>
              <button onClick={() => handleLinkClick('kontak')}
                className="flex-1 py-2.5 text-xs font-semibold text-center bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >Kontak</button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
