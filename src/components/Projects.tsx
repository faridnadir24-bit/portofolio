import React, { useState } from 'react';
import { 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Activity,
  Layers,
  Code2
} from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface ProjectsProps {
  onOpenProject: (projectId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredProjects = filterCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filterCategory);

  const filterTabs = [
    { id: 'all', label: 'All Projects [05]' },
    { id: 'ai-iot', label: 'IoT & Embedded' },
    { id: 'data-dashboard', label: 'AI & Forecast' },
    { id: 'web-fullstack', label: 'Full-Stack Web' },
  ];

  return (
    <section id="proyek" className="py-24 relative border-b border-slate-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div>
            <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest mb-3">
              [ 02 • SELECTED ENGINEERING WORK ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Featured <span className="text-slate-500 font-light">Projects.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Koleksi sistem perangkat lunak, komputasi terapan, dan telemetri IoT yang dirancang untuk performa tinggi dan dampak nyata.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  filterCategory === tab.id
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid / Stack (Bright Modern Bento Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isChampion = project.awardBadge?.isChampion;
            const projectNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="bright-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between text-left relative group hover:border-indigo-300"
              >
                <div>
                  
                  {/* Top Bar: Index Number & Award Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono text-slate-400 font-bold">
                      [{projectNumber}]
                    </span>

                    {project.awardBadge ? (
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        isChampion 
                          ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs' 
                          : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                      }`}>
                        <Trophy className={`w-3 h-3 ${isChampion ? 'text-amber-600' : 'text-indigo-600'}`} />
                        <span>{project.awardBadge.text}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                        {project.categoryLabel}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 font-medium mt-1">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-3.5 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  
                  {/* Metrics Box */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-left">
                        <span className="text-[10px] font-mono text-slate-500 block truncate font-medium">
                          {metric.label}
                        </span>
                        <span className="text-sm sm:text-base font-bold font-mono text-slate-900 block mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-indigo-50/70 text-indigo-800 border border-indigo-100 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: Live App + Simulator */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {project.liveDemoUrl ? (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                        title="Open External Production App"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo ↗</span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 font-medium">
                        <Activity className="w-3 h-3 text-indigo-500" />
                        Prototype
                      </span>
                    )}

                    <button
                      id={`btn-prototype-${project.id}`}
                      onClick={() => onOpenProject(project.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-indigo-600 group/btn transition-colors"
                    >
                      <span>Launch Sim</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner note */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shadow-2xs flex-shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                Semua 5 prototipe dibuat dengan arsitektur produksi dan telemetri teruji
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Klik "Launch Sim" pada kartu proyek mana pun untuk mencoba simulator interaktif real-time.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onOpenProject('avo-bio')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all whitespace-nowrap active:scale-95 shadow-md shadow-indigo-600/20"
          >
            Launch AVO-BIO (Juara 1)
          </button>
        </div>

      </div>
    </section>
  );
};
