import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight, 
  Terminal, 
  FolderGit2, 
  User, 
  GraduationCap, 
  Mail,
  Cpu,
  FileText,
  Command
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  onOpenCv: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onNavigate,
  onOpenCv,
  onOpenCommandPalette
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'tentang', label: 'Tentang Saya', icon: User },
    { id: 'proyek', label: 'Proyek', icon: FolderGit2 },
    { id: 'keahlian', label: 'Keahlian', icon: Cpu },
    { id: 'pengalaman', label: 'Pendidikan & Pengalaman', icon: GraduationCap },
    { id: 'kontak', label: 'Kontak', icon: Mail },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/85 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-white font-serif font-bold text-base shadow-xs group-hover:scale-105 transition-transform">
              FN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
                  Farid Nadir Amrulloh
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-stone-100 text-stone-600 border border-stone-200">
                  TI Wastukancana
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden md:block">
                AI, IoT & Systems Engineer
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100 p-1.5 rounded-full border border-stone-200 backdrop-blur-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-stone-900 font-semibold shadow-xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-900' : 'text-stone-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Command Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 hover:bg-stone-200/80 text-stone-600 border border-stone-200 transition-colors shadow-2xs group"
              title="Cari & Aksi Cepat (Ctrl + K)"
            >
              <Command className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-900" />
              <span className="hidden xl:inline text-[11px] font-mono text-stone-400">Ctrl K</span>
            </button>

            {/* Resume / CV Button */}
            <button
              onClick={onOpenCv}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 shadow-2xs hover:shadow-xs transition-all active:scale-98"
            >
              <FileText className="w-3.5 h-3.5 text-stone-600" />
              <span>Lihat CV</span>
            </button>

            <button
              id="nav-contact-cta"
              onClick={() => handleLinkClick('kontak')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 shadow-xs hover:shadow-sm transition-all duration-200 active:scale-98"
            >
              <span>Hubungi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#2A2A3C] hover:bg-stone-100 border border-stone-200/60 transition-colors"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu-dropdown"
            className="lg:hidden mt-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="px-3 py-2 bg-stone-50 rounded-xl mb-2 flex items-center justify-between">
              <span className="text-xs font-mono text-[#5A5A72]">Mahasiswa Informatika</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active 2026
              </span>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-stone-100 text-stone-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-stone-900' : 'text-stone-400'}`} />
                    <span>{link.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-400" />
                </button>
              );
            })}

            <div className="pt-2 border-t border-stone-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCv();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 transition-colors"
              >
                <FileText className="w-4 h-4 text-stone-600" />
                <span>Lihat & Unduh CV</span>
              </button>

              <button
                id="mobile-cta-btn"
                onClick={() => handleLinkClick('kontak')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
              >
                <span>Hubungi Saya</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
