import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';

const LEVEL_BADGES: Record<string, { label: string; className: string }> = {
  'Mahir': { label: 'Produksi', className: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800' },
  'Menengah': { label: 'Eksplorasi', className: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800' },
};

export const Skills: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="keahlian" ref={ref} className={`py-24 section-alt reveal-section ${isVisible ? 'in-view' : ''}`}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">

        <div className={`reveal-item ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
            Keahlian
          </h2>
          <p className="text-base text-neutral-500 dark:text-neutral-400 mb-14 max-w-xl">
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
              <h3 className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide mb-6">
                {category.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {category.skills.map((skill, sIdx) => {
                  const badge = LEVEL_BADGES[skill.level];
                  return (
                    <div
                      key={sIdx}
                      className="group p-4 rounded-xl border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 hover:bg-white dark:hover:bg-[#161618] hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {skill.name}
                        </h4>
                        {badge ? (
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${badge.className}`}>
                            {badge.label}
                          </span>
                        ) : (
                          <span className="text-xs text-neutral-400 dark:text-neutral-500">{skill.level}</span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2">
                        {skill.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/60 px-2 py-0.5 rounded-md border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
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

      </div>
    </section>
  );
};
