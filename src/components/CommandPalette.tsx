import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  FileText, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  BookOpen, 
  ArrowRight, 
  X, 
  ExternalLink,
  Flame,
  Check
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenProject: (projectId: string) => void;
  onOpenCv: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenProject,
  onOpenCv,
}) => {
  const [search, setSearch] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const sections = [
    { id: 'hero', name: 'Beranda / Hero', category: 'Navigasi' },
    { id: 'tentang', name: 'Tentang & Profil', category: 'Navigasi' },
    { id: 'proyek', name: 'Daftar 5 Proyek Rekayasa', category: 'Navigasi' },
    { id: 'keahlian', name: 'Keahlian Teknis & Tech Stack', category: 'Navigasi' },
    { id: 'pengalaman', name: 'Pendidikan, Organisasi & Prestasi', category: 'Navigasi' },
    { id: 'kontak', name: 'Kontak & Kolaborasi', category: 'Navigasi' },
  ];

  const filteredSections = sections.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProjects = PROJECTS.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tagline.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryLabel.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-stone-950/60 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-100 bg-stone-50/50">
          <Search className="w-5 h-5 text-[#6C7CE0]" />
          <input
            type="text"
            autoFocus
            placeholder="Ketik untuk mencari proyek, navigasi, atau kontak (misal: AVO-BIO, CV)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none outline-none text-[#2A2A3C] placeholder:text-stone-400 font-sans"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-200/60 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Results */}
        <div className="overflow-y-auto p-2 space-y-4 text-left">
          
          {/* Quick Actions */}
          <div>
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-400 px-3 py-1">
              Aksi Cepat
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenCv();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#6C7CE0]/10 text-stone-700 hover:text-[#5868CA] transition-colors group text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-[#6C7CE0]/15 text-[#6C7CE0]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span>Lihat & Unduh Ringkasan CV (Curriculum Vitae)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#6C7CE0] transition-colors" />
              </button>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-700 transition-colors group text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-stone-100 text-stone-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Salin Email ({PERSONAL_INFO.email})</span>
                </div>
                {copiedText === 'email' ? (
                  <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Tersalin!
                  </span>
                ) : (
                  <span className="text-xs text-stone-400 font-mono">Salin</span>
                )}
              </button>

              <a
                href="https://medium.com/@faridnadir24"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-700 transition-colors group text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-stone-100 text-stone-600">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>Baca Artikel Riset AVO-BIO di Medium</span>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
              </a>
            </div>
          </div>

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-400 px-3 py-1">
                5 Proyek & Simulator
              </div>
              <div className="space-y-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onClose();
                      onOpenProject(proj.id);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#6C7CE0]/10 text-stone-700 hover:text-[#5868CA] transition-colors group text-sm text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-stone-100 group-hover:bg-[#6C7CE0]/20 text-[#6C7CE0]">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-stone-800 flex items-center gap-2">
                          <span>{proj.title}</span>
                          {proj.awardBadge?.isChampion && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold">
                              Juara 1
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 line-clamp-1">{proj.tagline}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#6C7CE0] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {filteredSections.length > 0 && (
            <div>
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-400 px-3 py-1">
                Halaman & Navigasi
              </div>
              <div className="space-y-1">
                {filteredSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      onClose();
                      onNavigate(sec.id);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-stone-100 text-stone-700 transition-colors text-sm"
                  >
                    <span>{sec.name}</span>
                    <span className="text-[11px] font-mono text-stone-400">Lompat</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
          <span>Tips: Tekan <kbd className="px-1 py-0.5 rounded bg-stone-200 text-stone-600">Esc</kbd> untuk menutup</span>
          <span>Farid Nadir Amrulloh • Portfolio</span>
        </div>
      </div>
    </div>
  );
};
