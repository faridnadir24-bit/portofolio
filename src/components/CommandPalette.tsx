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
    { id: 'hero', name: 'Hero / Introduction', category: 'Navigation' },
    { id: 'tentang', name: 'About & Background', category: 'Navigation' },
    { id: 'proyek', name: 'Selected Work [05 Projects]', category: 'Navigation' },
    { id: 'keahlian', name: 'Capabilities & Stack', category: 'Navigation' },
    { id: 'pengalaman', name: 'Experience & Education', category: 'Navigation' },
    { id: 'kontak', name: 'Contact & Collaboration', category: 'Navigation' },
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-xl bg-[#141414] rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#161616]">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, project, or section..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none outline-none text-white placeholder:text-stone-500 font-mono"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Results */}
        <div className="overflow-y-auto p-3 space-y-4 text-left">
          
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 px-3 py-1">
              Quick Actions
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenCv();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-white/5 text-stone-300 hover:text-white transition-colors group text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl bg-white/5 text-stone-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span>View Official Curriculum Vitae (CV)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-white/5 text-stone-300 hover:text-white transition-colors group text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl bg-white/5 text-stone-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Copy Email ({PERSONAL_INFO.email})</span>
                </div>
                {copiedText === 'email' ? (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </span>
                ) : (
                  <span className="text-xs text-stone-500 font-mono">Copy</span>
                )}
              </button>

              <a
                href="https://medium.com/@faridnadir24"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-white/5 text-stone-300 hover:text-white transition-colors group text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl bg-white/5 text-stone-300">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>Read AVO-BIO Technical Article on Medium</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-600 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 px-3 py-1">
                Selected Work
              </div>
              <div className="space-y-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onClose();
                      onOpenProject(proj.id);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-white/5 text-stone-300 hover:text-white transition-colors group text-sm text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-xl bg-white/5 text-stone-300">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{proj.title}</span>
                          {proj.awardBadge?.isChampion && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                              Juara 1
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-400 line-clamp-1">{proj.tagline}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-white shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {filteredSections.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 px-3 py-1">
                Jump to Section
              </div>
              <div className="space-y-1">
                {filteredSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      onClose();
                      onNavigate(sec.id);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-2xl hover:bg-white/5 text-stone-300 hover:text-white transition-colors text-sm font-mono"
                  >
                    <span>{sec.name}</span>
                    <span className="text-[11px] text-stone-500">Jump ↵</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#0C0C0C] border-t border-white/5 flex items-center justify-between text-[11px] text-stone-500 font-mono">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-stone-300">Esc</kbd> to close</span>
          <span>FN • Portfolio</span>
        </div>
      </div>
    </div>
  );
};
