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
    <section id="pengalaman" className="py-24 relative border-b border-slate-200/80 bg-slate-50/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest mb-3">
            [ 04 • BACKGROUND & LEADERSHIP ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
            Education & <span className="text-slate-500 font-light">Track Record.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Riwayat pendidikan tinggi, pengalaman kepemimpinan organisasi, serta penghargaan kompetisi nasional yang telah diraih.
          </p>
        </div>

        {/* Timeline Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          
          {TIMELINE.map((item, index) => {
            const isEducation = item.roleType === 'education';
            const isChampion = item.roleType === 'achievement';

            const IconComponent = isEducation 
              ? GraduationCap 
              : isChampion 
                ? Trophy 
                : Users;

            const iconBg = isEducation
              ? 'bg-blue-100 text-blue-700'
              : isChampion
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-100 text-emerald-700';

            return (
              <div 
                key={item.id}
                id={`timeline-item-${item.id}`}
                className="bright-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-indigo-300"
              >
                <div>
                  
                  {/* Top line: Period & Role Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono text-slate-600 flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 font-medium">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {item.period}
                    </span>

                    {item.badge && (
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold ${
                        isChampion
                          ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs'
                          : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Organization */}
                  <div className="flex items-start gap-3 mt-2">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold flex-shrink-0 mt-0.5 ${iconBg}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 mt-0.5">
                        {item.organization} • {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    <ul className="space-y-1.5">
                      {item.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
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
