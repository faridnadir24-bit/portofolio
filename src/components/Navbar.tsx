import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Command, 
  FileText, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Code2,
  Briefcase,
  User,
  Mail
} from 'lucide-react';
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
  const [currentTime, setCurrentTime] = useState('');

  // Live WIB Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(`${timeStr} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'tentang', label: 'About', icon: User },
    { id: 'proyek', label: 'Work [05]', icon: Layers },
    { id: 'keahlian', label: 'Stack', icon: Code2 },
    { id: 'pengalaman', label: 'Experience', icon: Briefcase },
    { id: 'kontak', label: 'Contact', icon: Mail },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 transition-all duration-300 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand / Logo */}
        <button 
          id="brand-logo-btn"
          onClick={() => handleLinkClick('hero')} 
          className="flex items-center gap-2.5 bg-[#121212]/90 hover:bg-[#1A1A1A] border border-white/10 px-3.5 py-2 rounded-2xl backdrop-blur-xl shadow-lg transition-all group"
        >
          <div className="w-6 h-6 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs font-mono">
            FN
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-semibold text-white tracking-tight group-hover:text-stone-300 transition-colors">
              Farid Nadir
            </span>
            <span className="text-[10px] font-mono text-stone-400 block -mt-0.5">
              Systems & AI
            </span>
          </div>
        </button>

        {/* Desktop Navigation Floating Dock (Benjamin Creative Style) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#121212]/90 border border-white/10 p-1.5 rounded-full backdrop-blur-xl shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Clock, CV & Contact */}
        <div className="flex items-center gap-2">
          
          {/* Live Location & Clock Widget */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121212]/90 border border-white/10 text-[11px] font-mono text-stone-400 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>PWK • {currentTime || 'WIB'}</span>
          </div>

          {/* Quick Command Trigger (⌘K) */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-mono bg-[#121212]/90 hover:bg-[#1A1A1A] text-stone-300 border border-white/10 transition-colors backdrop-blur-xl"
            title="Aksi Cepat (Ctrl + K)"
          >
            <Command className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[11px] text-stone-500">⌘K</span>
          </button>

          {/* Resume / CV Modal Trigger */}
          <button
            onClick={onOpenCv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold bg-[#181818] hover:bg-[#222222] text-stone-200 border border-white/10 transition-all shadow-sm active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            <span>CV</span>
          </button>

          {/* Let's Talk CTA */}
          <button
            id="nav-contact-cta"
            onClick={() => handleLinkClick('kontak')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold bg-white text-black hover:bg-stone-200 transition-all duration-200 active:scale-95 shadow-md"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-2xl bg-[#121212] border border-white/10 text-white hover:bg-[#1A1A1A] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-6xl mx-auto mt-3 p-4 bg-[#121212]/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl space-y-2 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between px-3 py-2 bg-white/5 rounded-2xl mb-2 text-xs font-mono text-stone-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for Research & Projects
            </span>
            <span>{currentTime}</span>
          </div>

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-semibold bg-[#1A1A1A] text-white border border-white/10"
            >
              <FileText className="w-4 h-4 text-stone-400" />
              <span>Lihat CV</span>
            </button>

            <button
              onClick={() => handleLinkClick('kontak')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-semibold bg-white text-black"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
