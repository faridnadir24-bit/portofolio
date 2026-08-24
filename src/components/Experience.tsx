import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Trophy, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  Award
} from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="pengalaman" className="py-24 relative border-b border-white/5 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3">
            [ 04 • BACKGROUND & LEADERSHIP ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Education & <span className="text-stone-400 font-light">Track Record.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
            Riwayat pendidikan tinggi, pengalaman kepemimpinan organisasi, serta penghargaan kompetisi nasional yang telah diraih.
          </p>
        </div>

        {/* Timeline Bento Grid (Benjamin Creative Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          
          {TIMELINE.map((item, index) => {
            const isEducation = item.roleType === 'education';
            const isChampion = item.roleType === 'achievement';

            const IconComponent = isEducation 
              ? GraduationCap 
              : isChampion 
                ? Trophy 
                : Users;

            return (
              <div 
                key={item.id}
                id={`timeline-item-${item.id}`}
                className="dark-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top line: Period & Role Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono text-stone-400 flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      {item.period}
                    </span>

                    {item.badge && (
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                        isChampion
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          : 'bg-white/5 text-stone-400 border border-white/10'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Organization */}
                  <div className="flex items-start gap-3 mt-2">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-stone-400 mt-0.5">
                        {item.organization} • {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-300 mt-4 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
                    <ul className="space-y-1.5">
                      {item.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-stone-400 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
