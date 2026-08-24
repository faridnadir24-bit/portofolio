import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  return (
    <section id="keahlian" className="py-24 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">

        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
          Keahlian
        </h2>
        <p className="text-base text-neutral-500 mb-14 max-w-xl">
          Perpaduan rekayasa perangkat lunak modern, integrasi perangkat keras telemetri IoT, dan pemodelan kecerdasan buatan.
        </p>

        <div className="space-y-14">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.id}>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-6">
                {category.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-semibold text-neutral-900 text-sm">
                        {skill.name}
                      </h4>
                      <span className="text-xs text-neutral-400">{skill.level}</span>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-2">
                      {skill.description}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {skill.tags.join(' · ')}
                    </p>
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
