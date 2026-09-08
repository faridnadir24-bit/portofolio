import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';

const LEVEL_COLORS: Record<string, string> = {
  'Mahir': 'bg-blue-500',
  'Menengah': 'bg-amber-400',
};

export const Skills: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="keahlian" ref={ref} className={`py-24 section-alt reveal-section ${isVisible ? 'in-view' : ''}`}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">

        <div className={`reveal-item ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
            Keahlian
          </h2>
          <p className="text-base text-neutral-500 mb-14 max-w-xl">
            Perpaduan rekayasa perangkat lunak modern, integrasi perangkat keras telemetri IoT, dan pemodelan kecerdasan buatan.
          </p>
        </div>

        <div className="space-y-14">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <div
              key={category.id}
              className={`reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: getStaggerDelay(catIdx + 1, 120) }}
            >
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-6">
                {category.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="group p-4 rounded-xl border border-transparent hover:border-neutral-200 hover:bg-white hover:shadow-sm transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-semibold text-neutral-900 text-sm group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <span className={`skill-level-dot ${LEVEL_COLORS[skill.level] || 'bg-neutral-300'}`} />
                        <span className="text-xs text-neutral-400">{skill.level}</span>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-2">
                      {skill.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100 hover:border-neutral-200 hover:text-neutral-500 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
