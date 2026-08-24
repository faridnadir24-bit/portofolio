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
    <section id="proyek" className="py-24 relative border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Benjamin Creative Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div>
            <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3">
              [ 02 • SELECTED ENGINEERING WORK ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Featured <span className="text-stone-400 font-light">Projects.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-300 mt-2 max-w-xl">
              Koleksi sistem perangkat lunak, komputasi terapan, dan telemetri IoT yang dirancang untuk performa tinggi dan dampak nyata.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#121212] p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  filterCategory === tab.id
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid / Stack (High Impact Dark Bento Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isChampion = project.awardBadge?.isChampion;
            const projectNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="dark-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between text-left relative group"
              >
                <div>
                  
                  {/* Top Bar: Index Number & Award Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono text-stone-400 font-bold">
                      [{projectNumber}]
                    </span>

                    {project.awardBadge ? (
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        isChampion 
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' 
                          : 'bg-white/5 text-stone-300 border border-white/10'
                      }`}>
                        <Trophy className={`w-3 h-3 ${isChampion ? 'text-amber-400' : 'text-stone-400'}`} />
                        <span>{project.awardBadge.text}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-stone-400 border border-white/10">
                        {project.categoryLabel}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-stone-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-stone-400 font-medium mt-1">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-300 mt-3.5 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  
                  {/* Metrics Box (Benjamin Style Clean Dark Grid) */}
                  <div className="grid grid-cols-2 gap-2 bg-[#0C0C0C] p-3 rounded-2xl border border-white/5">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-left">
                        <span className="text-[10px] font-mono text-stone-400 block truncate">
                          {metric.label}
                        </span>
                        <span className="text-sm sm:text-base font-bold font-mono text-white block mt-0.5">
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
                        className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-white/5 text-stone-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: Live App + Simulator */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    {project.liveDemoUrl ? (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-stone-300 hover:text-white transition-colors"
                        title="Open External Production App"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                        <span>Live Demo ↗</span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        Prototype
                      </span>
                    )}

                    <button
                      id={`btn-prototype-${project.id}`}
                      onClick={() => onOpenProject(project.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-stone-300 group/btn transition-colors"
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
        <div className="mt-12 p-6 sm:p-8 rounded-3xl dark-card flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-2xs flex-shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">
                All 5 prototypes are built with production architecture & testable telemetry
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Click "Launch Sim" on any project card to interact with the integrated real-time engine.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onOpenProject('avo-bio')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-stone-200 transition-all whitespace-nowrap active:scale-95 shadow-md"
          >
            Launch AVO-BIO (Juara 1)
          </button>
        </div>

      </div>
    </section>
  );
};
