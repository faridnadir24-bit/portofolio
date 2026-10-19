import React, { useState, useEffect } from 'react';
import { Search, FileText, Mail, ArrowRight, X, ExternalLink, Check, Award, Sun, Moon } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { getSecureEmail } from '../utils/security';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenProject: (projectId: string) => void;
  onOpenCv: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen, onClose, onNavigate, onOpenProject, onOpenCv, theme, onToggleTheme,
}) => {
  const [search, setSearch] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  const [selectedIndex, setSelectedIndex] = useState(0);

  const sections = [
    { id: 'tentang', name: 'Tentang' },
    { id: 'proyek', name: 'Proyek' },
    { id: 'keahlian', name: 'Keahlian' },
    { id: 'pengalaman', name: 'Pengalaman' },
    { id: 'pencapaian', name: 'Pencapaian & Sertifikat' },
    { id: 'kontak', name: 'Kontak' },
  ];

  const query = search.toLowerCase();
  const filteredSections = sections.filter(s => s.name.toLowerCase().includes(query));
  const filteredProjects = PROJECTS.filter(p =>
    p.title.toLowerCase().includes(query) || p.tagline.toLowerCase().includes(query)
  );

  // Flatten searchable list for keyboard navigation
  type ActionItem = 
    | { type: 'theme'; label: string }
    | { type: 'cv'; label: string }
    | { type: 'copy_email'; label: string }
    | { type: 'pencapaian'; label: string }
    | { type: 'project'; id: string; title: string }
    | { type: 'section'; id: string; name: string };

  const allActions: ActionItem[] = [
    ...(onToggleTheme ? [{ type: 'theme' as const, label: theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap' }] : []),
    { type: 'cv', label: 'Buka CV' },
    { type: 'copy_email', label: 'Salin email' },
    { type: 'pencapaian', label: 'Lihat Piagam & Sertifikat (7)' },
    ...filteredProjects.map(p => ({ type: 'project' as const, id: p.id, title: p.title })),
    ...filteredSections.map(s => ({ type: 'section' as const, id: s.id, name: s.name })),
  ];

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const executeAction = (index: number) => {
    const item = allActions[index];
    if (!item) return;
    if (item.type === 'theme') {
      onToggleTheme?.();
      onClose();
    } else if (item.type === 'cv') {
      onClose();
      onOpenCv();
    } else if (item.type === 'copy_email') {
      handleCopy(email || getSecureEmail(), 'email');
    } else if (item.type === 'pencapaian') {
      onClose();
      onNavigate('pencapaian');
    } else if (item.type === 'project') {
      onClose();
      onOpenProject(item.id);
    } else if (item.type === 'section') {
      onClose();
      onNavigate(item.id);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, allActions.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allActions.length) % Math.max(1, allActions.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeAction(selectedIndex);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setEmail(getSecureEmail());
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, selectedIndex, allActions]);

  useEffect(() => {
    if (isOpen) setSearch('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const hasNoResults = filteredProjects.length === 0 && filteredSections.length === 0 && search.trim() !== '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-[#121214] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[70vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100 dark:border-neutral-800/80">
          <Search className="w-4.5 h-4.5 text-neutral-400" />
          <input
            type="text"
            autoFocus
            placeholder="Cari proyek, bagian, atau perintah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-2 space-y-3 text-left">
          {hasNoResults ? (
            <div className="py-8 text-center text-neutral-400 space-y-2">
              <p className="text-sm">Tidak ditemukan hasil untuk <span className="text-neutral-900 dark:text-neutral-100 font-semibold">"{search}"</span></p>
              <p className="text-xs text-neutral-400">Coba kata kunci lain atau gunakan tombol navigasi.</p>
            </div>
          ) : (
            <>
              {/* Quick actions */}
              <div>
                <p className="text-[11px] font-mono font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2 py-1">Aksi Cepat</p>
                {onToggleTheme && (
                  <button
                    onClick={() => { onToggleTheme(); onClose(); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors group ${
                      selectedIndex === 0
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300'
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {theme === 'dark' ? (
                        <Sun className={`w-4 h-4 ${selectedIndex === 0 ? 'text-amber-500' : 'text-neutral-400'}`} />
                      ) : (
                        <Moon className={`w-4 h-4 ${selectedIndex === 0 ? 'text-blue-600' : 'text-neutral-400'}`} />
                      )}
                      <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                        {theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
                      </span>
                    </div>
                    <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500">Theme</kbd>
                  </button>
                )}

                <button
                  onClick={() => { onClose(); onOpenCv(); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors group ${
                    selectedIndex === (onToggleTheme ? 1 : 0)
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className={`w-4 h-4 ${selectedIndex === (onToggleTheme ? 1 : 0) ? 'text-blue-600' : 'text-neutral-400'}`} />
                    <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-100">Buka CV</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-500" />
                </button>

                <button
                  onClick={() => handleCopy(email || getSecureEmail(), 'email')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors group ${
                    selectedIndex === (onToggleTheme ? 2 : 1)
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className={`w-4 h-4 ${selectedIndex === (onToggleTheme ? 2 : 1) ? 'text-blue-600' : 'text-neutral-400'}`} />
                    <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-100">Salin email</span>
                  </div>
                  {copiedText === 'email' ? (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Disalin</span>
                  ) : (
                    <span className="text-xs text-neutral-400">{email || 'faridnadir24@...'}</span>
                  )}
                </button>

                <button
                  onClick={() => { onClose(); onNavigate('pencapaian'); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors group ${
                    selectedIndex === (onToggleTheme ? 3 : 2)
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-100">Lihat Piagam &amp; Sertifikat (7)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-500" />
                </button>
              </div>

              {/* Projects */}
              {filteredProjects.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2 py-1">Proyek</p>
                  {filteredProjects.map((proj, pIdx) => {
                    const itemGlobalIndex = (onToggleTheme ? 4 : 3) + pIdx;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => { onClose(); onOpenProject(proj.id); }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors group text-left ${
                          selectedIndex === itemGlobalIndex
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">{proj.title}</p>
                          <p className="text-xs text-neutral-400 dark:text-neutral-500 line-clamp-1">{proj.tagline}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-500 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sections */}
              {filteredSections.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2 py-1">Navigasi</p>
                  {filteredSections.map((sec, sIdx) => {
                    const itemGlobalIndex = (onToggleTheme ? 4 : 3) + filteredProjects.length + sIdx;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => { onClose(); onNavigate(sec.id); }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                          selectedIndex === itemGlobalIndex
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-medium'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                        }`}
                      >
                        <span>{sec.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/80 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 dark:text-neutral-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-[10px]">↓</kbd> navigasi
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-[10px]">↵</kbd> pilih
            </span>
          </div>
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-[10px]">Esc</kbd> tutup
          </span>
        </div>
      </div>
    </div>
  );
};
