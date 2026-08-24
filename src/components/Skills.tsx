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
  Sparkles
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

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
    { id: 'all', label: 'All Disciplines' },
    ...SKILL_CATEGORIES.map(c => ({ id: c.id, label: c.title })),
  ];

  const displayedCategories = activeCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(c => c.id === activeCategory);

  return (
    <section id="keahlian" className="py-24 relative border-b border-slate-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest mb-3">
            [ 03 • CAPABILITIES & TOOLSET ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
            Technical <span className="text-slate-500 font-light">Proficiency.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Perpaduan keahlian rekayasa sistem perangkat lunak modern, integrasi perangkat keras telemetri IoT, serta pemodelan AI.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 pb-2 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`skill-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="space-y-12">
          {displayedCategories.map((category) => (
            <div key={category.id} className="text-left space-y-4">
              
              <div className="flex items-center justify-between pl-3 border-l-4 border-indigo-600">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{category.title}</h3>
                  <p className="text-xs font-mono text-slate-500">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, sIdx) => {
                  const Icon = iconMap[skill.iconName] || Code2;

                  return (
                    <div
                      key={sIdx}
                      className="bright-card rounded-3xl p-6 flex flex-col justify-between hover:border-indigo-300"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>

                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                            {skill.level}
                          </span>
                        </div>

                        <h4 className="font-bold text-base text-slate-900">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                          {skill.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {skill.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-medium"
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

        {/* Quick Matrix Summary */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 text-left">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-sm sm:text-base text-slate-900 font-mono uppercase tracking-wider">
              Proficiency Benchmark
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: 'Frontend', tech: 'React / Next.js', grade: '92%', color: 'bg-blue-600' },
              { label: 'AI/ML Model', tech: 'LSTM & Gemini', grade: '88%', color: 'bg-purple-600' },
              { label: 'IoT Embedded', tech: 'ESP32 / MQTT', grade: '94%', color: 'bg-emerald-600' },
              { label: 'Backend API', tech: 'Laravel / Node', grade: '85%', color: 'bg-indigo-600' },
              { label: 'Database', tech: 'Supabase / SQL', grade: '90%', color: 'bg-teal-600' },
              { label: 'Data Visual', tech: 'D3 & Recharts', grade: '91%', color: 'bg-amber-600' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-mono text-slate-500 block font-medium">{item.label}</span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5 font-mono">{item.tech}</span>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: item.grade }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
