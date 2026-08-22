import React, { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  BrainCircuit, 
  Database, 
  BarChart3, 
  Server, 
  Layout, 
  Palette, 
  Scan, 
  Microchip, 
  Radio, 
  Zap, 
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

// Map icon string name to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  Code2,
  Palette,
  BrainCircuit,
  Cpu,
  Scan,
  Microchip,
  Radio,
  Zap,
  Server,
  Database,
  BarChart3,
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Bidang' },
    ...SKILL_CATEGORIES.map(c => ({ id: c.id, label: c.title })),
  ];

  const displayedCategories = activeCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(c => c.id === activeCategory);

  return (
    <section id="keahlian" className="py-20 bg-white/70 border-y border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C7CE0]/10 text-[#6C7CE0] border border-[#6C7CE0]/20 mb-3">
            <span className="text-xs font-mono font-medium tracking-wider uppercase">03 • Kompetensi & Toolset</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2A3C] tracking-tight">
            Keahlian <span className="font-serif-italic font-normal text-[#6C7CE0]">Teknis</span>
          </h2>
          <p className="text-base text-[#5A5A72] mt-3 leading-relaxed">
            Kombinasi kemampuan pengembangan software modern, pemodelan data prediktif, serta integrasi hardware mikroelektronika.
          </p>
        </div>

        {/* Skill Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-stone-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`skill-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#2A2A3C] text-white shadow-xs font-semibold'
                  : 'bg-stone-100/80 text-[#5A5A72] hover:bg-stone-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Categories & Skills Grid */}
        <div className="space-y-12">
          {displayedCategories.map((category) => (
            <div key={category.id} className="text-left space-y-4">
              
              {/* Category Subhead */}
              <div className="flex items-center justify-between border-l-3 border-[#6C7CE0] pl-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2A2A3C]">{category.title}</h3>
                  <p className="text-xs text-[#5A5A72]">{category.description}</p>
                </div>
              </div>

              {/* Skills Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, sIdx) => {
                  const Icon = iconMap[skill.iconName] || Code2;
                  const isAdvanced = skill.level === 'Mahir';

                  return (
                    <div
                      key={sIdx}
                      className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs card-hover-lift flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Header: Icon & Proficiency Level */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6C7CE0]/15 to-[#B48CE0]/15 flex items-center justify-center text-[#5161C5] border border-[#6C7CE0]/20">
                            <Icon className="w-6 h-6" />
                          </div>

                          <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                            isAdvanced
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          }`}>
                            {skill.level}
                          </span>
                        </div>

                        {/* Skill Title & Description */}
                        <h4 className="font-serif font-bold text-base text-[#2A2A3C]">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-[#5A5A72] mt-2 leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {/* Tag Chips */}
                      <div className="mt-5 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                        {skill.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#FDF9F3] text-[#4A4A62] border border-stone-200/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Competency Matrix Quick Summary Table */}
        <div className="mt-14 p-6 rounded-2xl bg-stone-50 border border-stone-200/80 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#6C7CE0]" />
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#2A2A3C]">
              Ringkasan Matriks Penguasaan Teknologi
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: 'Frontend', tech: 'React / Next.js', grade: '92%' },
              { label: 'AI/ML Model', tech: 'LSTM & Fuzzy', grade: '88%' },
              { label: 'IoT Embedded', tech: 'ESP32 / MQTT', grade: '94%' },
              { label: 'Backend API', tech: 'Laravel / REST', grade: '85%' },
              { label: 'Database', tech: 'Supabase / SQL', grade: '90%' },
              { label: 'Data Visual', tech: 'D3 & Recharts', grade: '91%' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-mono text-[#7C7C92] block">{item.label}</span>
                <span className="text-xs font-semibold text-[#2A2A3C] block mt-0.5">{item.tech}</span>
                <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#6C7CE0] h-full rounded-full" style={{ width: item.grade }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
