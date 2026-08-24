import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  FileText, 
  Mail, 
  BookOpen, 
  ArrowRight, 
  X, 
  ExternalLink,
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
    { id: 'hero', name: 'Hero / Beranda Utama', category: 'Navigation' },
    { id: 'tentang', name: 'Tentang & Latar Belakang', category: 'Navigation' },
    { id: 'proyek', name: 'Koleksi Proyek [05]', category: 'Navigation' },
    { id: 'keahlian', name: 'Keahlian & Kemampuan Teknis', category: 'Navigation' },
    { id: 'pengalaman', name: 'Pendidikan & Pengalaman Organisasi', category: 'Navigation' },
    { id: 'kontak', name: 'Kontak & Kolaborasi', category: 'Navigation' },
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/80">
          <Search className="w-5 h-5 text-indigo-600" />
          <input
            type="text"
            autoFocus
            placeholder="Ketik nama proyek, bagian web, atau perintah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 font-mono"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Results */}
        <div className="overflow-y-auto p-3 space-y-4 text-left">
          
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Aksi Cepat
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenCv();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-indigo-50/60 text-slate-700 hover:text-indigo-900 transition-colors group text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span>Buka Curriculum Vitae Resmi (CV)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </button>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-indigo-50/60 text-slate-700 hover:text-indigo-900 transition-colors group text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Salin Email ({PERSONAL_INFO.email})</span>
                </div>
                {copiedText === 'email' ? (
                  <span className="text-xs font-mono text-emerald-600 flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" /> Disalin!
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-mono">Salin</span>
                )}
              </button>

              <a
                href="https://medium.com/@faridnadir24"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-indigo-50/60 text-slate-700 hover:text-indigo-900 transition-colors group text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl bg-slate-100 text-slate-700">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>Baca Artikel Teknis AVO-BIO di Medium</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
              </a>
            </div>
          </div>

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Koleksi Proyek
              </div>
              <div className="space-y-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onClose();
                      onOpenProject(proj.id);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors group text-sm text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{proj.title}</span>
                          {proj.awardBadge?.isChampion && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold">
                              Juara 1
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{proj.tagline}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {filteredSections.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Lompat ke Bagian
              </div>
              <div className="space-y-1">
                {filteredSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      onClose();
                      onNavigate(sec.id);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-2xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors text-sm font-mono"
                  >
                    <span>{sec.name}</span>
                    <span className="text-[11px] text-indigo-600 font-semibold">Lompat ↵</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Tekan <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">Esc</kbd> untuk menutup</span>
          <span>FN • Portfolio</span>
        </div>
      </div>
    </div>
  );
};
