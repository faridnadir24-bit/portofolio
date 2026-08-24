import React from 'react';
import { TIMELINE } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="pengalaman" className="py-24 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">

        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
          Pengalaman
        </h2>
        <p className="text-base text-neutral-500 mb-14 max-w-lg">
          Riwayat pendidikan, kepemimpinan organisasi, dan penghargaan kompetisi nasional.
        </p>

        {/* Clean timeline list */}
        <div className="space-y-0">
          {TIMELINE.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row gap-4 sm:gap-8 py-6 ${
                index < TIMELINE.length - 1 ? 'border-b border-neutral-100' : ''
              }`}
            >
              {/* Left: period */}
              <div className="sm:w-44 shrink-0">
                <p className="text-sm text-neutral-400 font-mono">{item.period}</p>
              </div>

              {/* Right: content */}
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                  {item.badge && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                      item.roleType === 'achievement'
                        ? 'text-amber-800 bg-amber-50 border border-amber-200'
                        : 'text-neutral-500 bg-neutral-100'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-500">
                  {item.organization} &middot; {item.location}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed mt-2">
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {item.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="text-sm text-neutral-500 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-neutral-300">
                        {hl}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
