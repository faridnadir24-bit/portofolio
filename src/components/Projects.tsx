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
    <section id="proyek" className="py-20 relative">
      
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full orb-glow-periwinkle pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full orb-glow-lavender pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C7CE0]/10 text-[#6C7CE0] border border-[#6C7CE0]/20 mb-3">
              <span className="text-xs font-mono font-medium tracking-wider uppercase">02 • Karya & Prototipe</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2A3C] tracking-tight">
              Proyek <span className="font-serif-italic font-normal text-[#6C7CE0]">Unggulan</span>
            </h2>
            <p className="text-base text-[#5A5A72] mt-3 leading-relaxed">
              Koleksi sistem perangkat lunak, algoritma kecerdasan buatan, dan arsitektur IoT yang dirancang untuk menjawab tantangan riil dengan metrik terukur.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200/80 self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  filterCategory === tab.id
                    ? 'bg-white text-[#2A2A3C] font-semibold shadow-xs border border-stone-200/80'
                    : 'text-[#5A5A72] hover:text-[#2A2A3C] hover:bg-white/40'
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
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs card-hover-lift flex flex-col justify-between overflow-hidden text-left relative group"
              >
                
                {/* Top Accent Strip */}
                <div 
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(to right, ${project.gradient.from}, ${project.gradient.to})`
                  }}
                />

                <div className="p-6 flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* Award & Category Pill Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {project.awardBadge ? (
                        <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full ${
                          isChampion 
                            ? 'bg-amber-100/90 text-amber-900 border border-amber-300 shadow-2xs' 
                            : 'bg-[#6C7CE0]/10 text-[#5161C5] border border-[#6C7CE0]/20'
                        }`}>
                          <Trophy className={`w-3 h-3 ${isChampion ? 'text-amber-600' : 'text-[#6C7CE0]'}`} />
                          <span>{project.awardBadge.text}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-[#5A5A72] border border-stone-200">
                          {project.categoryLabel}
                        </span>
                      )}

                      <span className="text-[11px] font-mono text-[#7C7C92]">
                        {project.awardBadge?.year || '2026'}
                      </span>
                    </div>

                    {/* Project Title & Tagline */}
                    <h3 className="font-serif font-bold text-xl text-[#2A2A3C] group-hover:text-[#6C7CE0] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#6C7CE0] font-medium mt-0.5">
                      {project.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#4A4A62] mt-3 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    
                    {/* 1-2 Metric Badges (Mandatory as per instructions) */}
                    <div className="grid grid-cols-2 gap-2 bg-[#FDF9F3] p-3 rounded-xl border border-stone-200/70">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="text-left">
                          <span className="text-[10px] font-mono text-[#6A6A82] block truncate">
                            {metric.label}
                          </span>
                          <span className="text-sm sm:text-base font-serif font-bold text-[#2A2A3C] block mt-0.5">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-stone-100/90 text-[#5A5A72] border border-stone-200/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[11px] font-mono bg-stone-50 text-[#7C7C92] border border-stone-200/50">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2">
                  {project.liveDemoUrl ? (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-stone-600 hover:text-[#5865F2] transition-colors"
                      title="Buka Website Demo Eksternal"
                    >
                      <ExternalLink className="w-3 h-3 text-[#5865F2]" />
                      <span>Live App</span>
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-[#7C7C92] flex items-center gap-1">
                      <Activity className="w-3 h-3 text-[#6C7CE0]" />
                      Interactive Sim
                    </span>
                  )}

                  <button
                    id={`btn-prototype-${project.id}`}
                    onClick={() => onOpenProject(project.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] hover:text-[#3C49C5] group/btn transition-colors"
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
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#6C7CE0]/8 via-[#B48CE0]/8 to-white border border-[#6C7CE0]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-amber-500 shadow-2xs">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#2A2A3C]">
                Semua prototipe dibuat dengan implementasi arsitektur nyata
              </h4>
              <p className="text-xs text-[#5A5A72]">
                Klik "Lihat Prototype →" di setiap kartu proyek untuk menguji kalkulasi simulasi sensor telemetri & arsitektur sistem.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onOpenProject('avo-bio')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-[#2A2A3C] hover:bg-stone-50 border border-stone-200/90 shadow-2xs whitespace-nowrap"
          >
            Eksplorasi AVO-BIO (Juara 1)
          </button>
        </div>

      </div>
    </section>
  );
};
