import React, { useState } from 'react';
import { ArrowRight, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

interface ProjectsProps {
  onOpenProject: (projectId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredProjects = filterCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filterCategory);

  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'ai-iot', label: 'IoT & AI' },
    { id: 'data-dashboard', label: 'Prediksi' },
    { id: 'web-fullstack', label: 'Full-Stack' },
  ];

  return (
    <section id="proyek" className="py-24 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Proyek
            </h2>
            <p className="text-base text-neutral-500 mt-2 max-w-lg">
              Sistem perangkat lunak dan komputasi terapan yang dirancang untuk performa tinggi dan dampak nyata.
            </p>
          </div>

          <div className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterCategory(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors ${
                  filterCategory === f.id
                    ? 'bg-neutral-900 text-white font-medium'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project list — clean stacked cards, not uniform bento */}
        <div className="space-y-4">
          {filteredProjects.map((project) => {
            const isChampion = project.awardBadge?.isChampion;

            return (
              <div
                key={project.id}
                onClick={() => onOpenProject(project.id)}
                className="card p-6 sm:p-7 cursor-pointer group text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      {isChampion && (
                        <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                          Juara 1
                        </span>
                      )}
                      {project.awardBadge && !isChampion && (
                        <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md shrink-0">
                          {project.awardBadge.text}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack — inline text, not pills */}
                    <p className="text-xs text-neutral-400 pt-1">
                      {project.techStack.join(' · ')}
                    </p>
                  </div>

                  {/* Right side: metrics + arrow */}
                  <div className="flex items-center gap-5 sm:gap-6 shrink-0">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="text-right hidden sm:block">
                        <p className="text-lg font-bold text-neutral-900 font-mono">{m.value}</p>
                        <p className="text-[11px] text-neutral-400">{m.label}</p>
                      </div>
                    ))}

                    <div className="flex items-center gap-2">
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
