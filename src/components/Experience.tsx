import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Trophy, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="pengalaman" className="py-20 relative">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-5 w-80 h-80 rounded-full orb-glow-periwinkle pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-5 w-80 h-80 rounded-full orb-glow-lavender pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C7CE0]/10 text-[#6C7CE0] border border-[#6C7CE0]/20 mb-3">
            <span className="text-xs font-mono font-medium tracking-wider uppercase">04 • Rekam Jejak & Riwayat</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2A3C] tracking-tight">
            Pendidikan & <span className="font-serif-italic font-normal text-[#6C7CE0]">Pengalaman</span>
          </h2>
          <p className="text-base text-[#5A5A72] mt-3 leading-relaxed">
            Perjalanan akademik, kepemimpinan organisasi siswa, dan pencapaian kompetisi inovasi teknologi yang membentuk integritas kerja.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#6C7CE0] before:via-[#B48CE0] before:to-stone-200">
          
          {TIMELINE.map((item, index) => {
            const isEducation = item.roleType === 'education';
            const isChampion = item.roleType === 'achievement';
            const isOrg = item.roleType === 'organization';

            const IconComponent = isEducation 
              ? GraduationCap 
              : isChampion 
                ? Trophy 
                : Users;

            const iconBg = isChampion
              ? 'bg-amber-500 text-white border-amber-300'
              : isEducation
                ? 'bg-[#6C7CE0] text-white border-[#5868CA]'
                : 'bg-[#B48CE0] text-white border-[#9D6DE3]';

            return (
              <div 
                key={item.id}
                id={`timeline-item-${item.id}`}
                className="relative text-left group"
              >
                {/* Timeline Node Dot / Icon */}
                <div className={`absolute -left-[30px] sm:-left-[42px] top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-xl ${iconBg} flex items-center justify-center shadow-md border-2 transition-transform group-hover:scale-110`}>
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Timeline Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs card-hover-lift">
                  
                  {/* Top Line: Period & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#FDF9F3] text-[#2A2A3C] border border-stone-200/80">
                        <Calendar className="w-3.5 h-3.5 text-[#6C7CE0]" />
                        {item.period}
                      </span>
                      
                      {item.badge && (
                        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                          isChampion
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : isEducation
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-[#7C7C92] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#6C7CE0]" />
                      {item.location}
                    </span>
                  </div>

                  {/* Role Title & Organization */}
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2A2A3C] mt-2 group-hover:text-[#6C7CE0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[#6C7CE0] font-semibold mt-0.5">
                    {item.organization}
                  </p>

                  {/* Description Paragraph */}
                  <p className="text-xs sm:text-sm text-[#4A4A62] mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Key Highlights Bulleted */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                      <span className="text-[11px] font-mono font-semibold text-[#5A5A72] block">
                        Capaian & Tanggung Jawab Utama:
                      </span>
                      <ul className="space-y-1.5">
                        {item.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-[#4A4A62]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
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
