import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCommandPalette: () => void;
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
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
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200/60' : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-sm font-bold text-neutral-900 tracking-tight hover:text-blue-600 transition-colors"
        >
          Farid Nadir
        </button>

        {/* Desktop Nav — simple text links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-sm transition-colors ${
                activeSection === link.id
                  ? 'text-neutral-900 font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCv}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-600 border border-neutral-300 rounded-lg hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          <button
            onClick={() => handleLinkClick('kontak')}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <span>Hubungi</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-5 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeSection === link.id
                  ? 'text-neutral-900 font-semibold bg-neutral-50'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 mt-2 border-t border-neutral-100 flex gap-2">
            <button onClick={() => { setMobileMenuOpen(false); onOpenCv(); }}
              className="flex-1 py-2.5 text-xs font-medium text-center border border-neutral-300 rounded-lg hover:bg-neutral-50"
            >Lihat CV</button>
            <button onClick={() => handleLinkClick('kontak')}
              className="flex-1 py-2.5 text-xs font-semibold text-center bg-neutral-900 text-white rounded-lg"
            >Kontak</button>
          </div>
        </div>
      )}
    </header>
  );
};
