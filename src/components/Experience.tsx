import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Trophy, 
  Calendar, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="pengalaman" className="py-20 relative border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200 mb-3">
            <span className="text-xs font-mono font-medium tracking-wider uppercase">04 • Rekam Jejak & Riwayat</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Pendidikan & <span className="font-serif-italic font-normal text-stone-600">Pengalaman</span>
          </h2>
          <p className="text-base text-stone-600 mt-3 leading-relaxed">
            Perjalanan akademik, kepemimpinan organisasi siswa, dan pencapaian kompetisi inovasi teknologi yang membentuk integritas kerja.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-300">
          
          {TIMELINE.map((item) => {
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
                className="relative text-left group"
              >
                {/* Timeline Node Dot / Icon */}
                <div className={`absolute -left-[30px] sm:-left-[42px] top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-xl ${
                  isChampion
                    ? 'bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs'
                    : 'bg-stone-900 text-white shadow-xs'
                } flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Timeline Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs card-hover-lift">
                  
                  {/* Top Line: Period & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                        <Calendar className="w-3.5 h-3.5 text-stone-500" />
                        {item.period}
                      </span>
                      
                      {item.badge && (
                        <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full ${
                          isChampion
                            ? 'bg-amber-50 text-amber-900 border border-amber-200'
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {item.location}
                    </span>
                  </div>

                  {/* Role Title & Organization */}
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 mt-2 group-hover:text-stone-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-stone-600 font-semibold mt-0.5">
                    {item.organization}
                  </p>

                  {/* Description Paragraph */}
                  <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Key Highlights Bulleted */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                      <span className="text-[11px] font-mono font-semibold text-stone-700 block">
                        Capaian & Tanggung Jawab Utama:
                      </span>
                      <ul className="space-y-1.5">
                        {item.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-stone-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-stone-800 flex-shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
