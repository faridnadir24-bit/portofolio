import React from 'react';
import { Trophy, Users, GraduationCap } from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';

const ROLE_DOT_COLORS: Record<string, string> = {
  education: 'text-blue-500',
  organization: 'text-emerald-500',
  achievement: 'text-amber-500',
};

const ROLE_BORDER_COLORS: Record<string, string> = {
  education: 'border-blue-300',
  organization: 'border-emerald-300',
  achievement: 'border-amber-300',
};

const ROLE_BG_COLORS: Record<string, string> = {
  education: 'bg-blue-50',
  organization: 'bg-emerald-50',
  achievement: 'bg-amber-50',
};

const ROLE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  achievement: Trophy,
  organization: Users,
  education: GraduationCap,
};

export const Experience: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="pengalaman"
      ref={ref}
      className={`py-24 reveal-section ${isVisible ? 'in-view' : ''}`}
    >
      <div className="section-divider" />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left pt-24">

        <div className={`reveal-item ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
            Pengalaman
          </h2>
          <p className="text-base text-neutral-500 mb-14 max-w-lg">
            Riwayat pendidikan, kepemimpinan organisasi, dan penghargaan kompetisi nasional.
          </p>
        </div>

        {/* Timeline with vertical line */}
        <div className="relative">
          {/* Vertical connector line — visible on all screens */}
          <div className="absolute left-3 sm:left-[5px] top-3 bottom-0 w-px bg-gradient-to-b from-neutral-300 via-neutral-200 to-transparent" />

          <div className="space-y-0">
            {TIMELINE.map((item, index) => {
              const isAchievement = item.roleType === 'achievement';
              const dotColor = ROLE_DOT_COLORS[item.roleType] || 'text-neutral-400';
              const borderColor = ROLE_BORDER_COLORS[item.roleType] || 'border-neutral-300';
              const bgColor = ROLE_BG_COLORS[item.roleType] || 'bg-neutral-50';
              const IconComponent = ROLE_ICONS[item.roleType];

              return (
                <div
                  key={item.id}
                  className={`flex gap-4 sm:gap-8 py-6 reveal-item ${isVisible ? 'in-view' : ''} ${
                    index < TIMELINE.length - 1 ? 'border-b border-neutral-100' : ''
                  } ${isAchievement ? 'bg-amber-50/40 -mx-4 px-4 rounded-xl border-amber-100' : ''}`}
                  style={{ transitionDelay: getStaggerDelay(index + 1, 60) }}
                >
                  {/* Timeline dot — always visible */}
                  <div className={`flex items-start pt-1.5 ${dotColor}`}>
                    <div className={`w-6 h-6 rounded-full border-2 ${borderColor} ${bgColor} flex items-center justify-center shrink-0`}>
                      {IconComponent ? (
                        <IconComponent className="w-3 h-3" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 flex-1">
                    {/* Left: period */}
                    <div className="sm:w-40 shrink-0">
                      <p className="text-sm text-neutral-400 font-mono">{item.period}</p>
                    </div>

                    {/* Right: content */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-3 flex-wrap">
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
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
