import React, { useState } from 'react';
import { 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  BarChart3, 
  ExternalLink,
  Code2,
  Activity,
  CheckCircle,
  Eye
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
    { id: 'all', label: 'Semua Proyek' },
    { id: 'ai-iot', label: 'IoT & Smart System' },
    { id: 'data-dashboard', label: 'Data & Forecasting' },
    { id: 'web-fullstack', label: 'Web & Heritage' },
  ];

  return (
    <section id="proyek" className="py-20 relative border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200 mb-3">
              <span className="text-xs font-mono font-medium tracking-wider uppercase">02 • Karya & Inovasi</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Proyek <span className="font-serif-italic font-normal text-stone-600">Unggulan</span>
            </h2>
            <p className="text-base text-stone-600 mt-3 leading-relaxed">
              Koleksi sistem komputasi terapan, algoritma analitik, dan arsitektur IoT yang dirancang untuk menjawab tantangan riil dengan metrik terukur.
            </p>
          </div>

          {/* Category Filter Pills (Monochrome Harmony) */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  filterCategory === tab.id
                    ? 'bg-white text-stone-900 font-semibold shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const isChampion = project.awardBadge?.isChampion;

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs card-hover-lift flex flex-col justify-between overflow-hidden text-left relative group"
              >
                <div className="p-6 flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* Award & Category Pill Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {project.awardBadge ? (
                        <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full ${
                          isChampion 
                            ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}>
                          <Trophy className={`w-3 h-3 ${isChampion ? 'text-amber-700' : 'text-stone-500'}`} />
                          <span>{project.awardBadge.text}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                          {project.categoryLabel}
                        </span>
                      )}

                      <span className="text-[11px] font-mono text-stone-500">
                        {project.awardBadge?.year || '2026'}
                      </span>
                    </div>

                    {/* Project Title & Tagline */}
                    <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-stone-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-stone-500 font-medium mt-1">
                      {project.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    
                    {/* 1-2 Metric Badges (Warm neutral surface) */}
                    <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="text-left">
                          <span className="text-[10px] font-mono text-stone-500 block truncate">
                            {metric.label}
                          </span>
                          <span className="text-sm sm:text-base font-serif font-bold text-stone-900 block mt-0.5">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills (Monochrome tags) */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-stone-100 text-stone-700 border border-stone-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[11px] font-mono bg-stone-50 text-stone-500 border border-stone-200/60">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-3.5 bg-stone-50/80 border-t border-stone-200/80 flex items-center justify-between gap-2">
                  {project.liveDemoUrl ? (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-stone-700 hover:text-stone-900 transition-colors"
                      title="Buka Website Demo Eksternal"
                    >
                      <ExternalLink className="w-3 h-3 text-stone-600" />
                      <span>Live App</span>
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-stone-400" />
                      Simulator
                    </span>
                  )}

                  <button
                    id={`btn-prototype-${project.id}`}
                    onClick={() => onOpenProject(project.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-stone-700 group/btn transition-colors"
                  >
                    <span>Coba Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Champion note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-2xs flex-shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                Semua prototipe dibuat dengan implementasi arsitektur nyata
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Klik "Coba Simulator" untuk menguji interaktivitas telemetri atau klik "Live App" untuk membuka web di tab baru.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onOpenProject('avo-bio')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 shadow-xs whitespace-nowrap"
          >
            Eksplorasi AVO-BIO (Juara 1)
          </button>
        </div>

      </div>
    </section>
  );
};
