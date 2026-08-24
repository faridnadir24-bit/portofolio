import React, { useState, useEffect } from 'react';
import { Search, FileText, Mail, ArrowRight, X, ExternalLink, Check } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenProject: (projectId: string) => void;
  onOpenCv: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen, onClose, onNavigate, onOpenProject, onOpenCv,
}) => {
  const [search, setSearch] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setSearch('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const sections = [
    { id: 'tentang', name: 'Tentang' },
    { id: 'proyek', name: 'Proyek' },
    { id: 'keahlian', name: 'Keahlian' },
    { id: 'pengalaman', name: 'Pengalaman' },
    { id: 'kontak', name: 'Kontak' },
  ];

  const query = search.toLowerCase();
  const filteredSections = sections.filter(s => s.name.toLowerCase().includes(query));
  const filteredProjects = PROJECTS.filter(p =>
    p.title.toLowerCase().includes(query) || p.tagline.toLowerCase().includes(query)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100">
          <Search className="w-4.5 h-4.5 text-neutral-400" />
          <input
            type="text"
            autoFocus
            placeholder="Cari proyek, bagian, atau perintah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-2 space-y-3 text-left">

          {/* Quick actions */}
          <div>
            <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wide px-2 py-1">Aksi Cepat</p>
            <button
              onClick={() => { onClose(); onOpenCv(); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-sm transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-700 group-hover:text-neutral-900">Buka CV</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-500" />
            </button>

            <button
              onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-sm transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-700 group-hover:text-neutral-900">Salin email</span>
              </div>
              {copiedText === 'email' ? (
                <span className="text-xs text-emerald-600 flex items-center gap-1"><Check className="w-3 h-3" /> Disalin</span>
              ) : (
                <span className="text-xs text-neutral-400">{PERSONAL_INFO.email}</span>
              )}
            </button>

            <a
              href="https://medium.com/@faridnadir24"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-sm transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-700 group-hover:text-neutral-900">Artikel Medium</span>
              </div>
            </a>
          </div>

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wide px-2 py-1">Proyek</p>
              {filteredProjects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => { onClose(); onOpenProject(proj.id); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-sm transition-colors group text-left"
                >
                  <div>
                    <p className="font-medium text-neutral-900">{proj.title}</p>
                    <p className="text-xs text-neutral-400 line-clamp-1">{proj.tagline}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-500 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Sections */}
          {filteredSections.length > 0 && (
            <div>
              <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wide px-2 py-1">Navigasi</p>
              {filteredSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => { onClose(); onNavigate(sec.id); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-50 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <span>{sec.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 text-[11px] text-neutral-400">
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-neutral-600 text-[10px]">Esc</kbd> untuk menutup
        </div>
      </div>
    </div>
  );
};
