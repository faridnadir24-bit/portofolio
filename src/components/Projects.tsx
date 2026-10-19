import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Award } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';

interface ProjectsProps {
  onOpenProject: (projectId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  const filteredProjects = filterCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filterCategory);

  const filters = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'ai-iot', label: 'IoT & AI' },
    { id: 'data-dashboard', label: 'Prediksi & Analitik' },
    { id: 'web-fullstack', label: 'Full-Stack Web' },
  ];

  return (
    <section
      id="proyek"
      ref={ref}
      className={`py-24 reveal-section ${isVisible ? 'in-view' : ''}`}
    >
      <div className="section-divider" />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-24">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 text-left">
          <div className={`reveal-item ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                Karya Unggulan
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Proyek Rekayasa
            </h2>
            <p className="text-base text-neutral-500 dark:text-neutral-400 mt-2 max-w-lg">
              Sistem perangkat lunak dan komputasi terapan yang dirancang untuk keandalan tinggi dan pembuktian dampak nyata.
            </p>
          </div>

          {/* Sliding Pill Filter Container */}
          <div
            className={`p-1 bg-neutral-100/90 dark:bg-neutral-900/90 rounded-xl border border-neutral-200/80 dark:border-neutral-800 inline-flex flex-wrap items-center gap-1 reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            {filters.map((f) => {
              const isActive = filterCategory === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilterCategory(f.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project list with SpotlightCards */}
        <div className="space-y-4">
          {filteredProjects.map((project, index) => {
            const isChampion = project.awardBadge?.isChampion;
            const isFeatured = index === 0 || index === 1;

            return (
              <SpotlightCard
                key={project.id}
                onClick={() => onOpenProject(project.id)}
                className={`card-gradient-border p-6 sm:p-7 cursor-pointer group text-left reveal-item ${isVisible ? 'in-view' : ''} ${isFeatured ? 'border-l-4 border-l-blue-600 dark:border-l-blue-500' : ''}`}
                style={{ transitionDelay: getStaggerDelay(index + 2, 80) }}
                spotlightColor="rgba(37, 99, 235, 0.09)"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                  <div className="space-y-2.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      {isChampion && (
                        <span className="text-xs font-mono font-medium text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-md border border-amber-200/80 dark:border-amber-800/80 shrink-0 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Juara 1 Nasional</span>
                        </span>
                      )}
                      {project.awardBadge && !isChampion && (
                        <span className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded-md border border-neutral-200/80 dark:border-neutral-700 shrink-0">
                          {project.awardBadge.text}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack inline chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Metrics — mobile display */}
                    <div className="flex items-center gap-5 pt-2 sm:hidden">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="text-left">
                          <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono">{m.value}</p>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right side: metrics (desktop) + link button */}
                  <div className="flex items-center gap-5 sm:gap-6 shrink-0 self-start sm:self-center">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="text-right hidden sm:block">
                        <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono">{m.value}</p>
                        <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium font-mono">{m.label}</p>
                      </div>
                    ))}

                    <div className="flex items-center gap-2">
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-neutral-800 transition-colors"
                          title="Buka Demo Proyek"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <div className="p-2 rounded-xl text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 group-hover:bg-blue-50/50 dark:group-hover:bg-neutral-800 transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
