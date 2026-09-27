import React from 'react';
import { GraduationCap, Award, Users } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="tentang" ref={ref} className={`py-24 section-alt reveal-section ${isVisible ? 'in-view' : ''}`}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start text-left">

          {/* Left: narrative */}
          <div className="lg:col-span-3 space-y-6">
            <h2
              className={`text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '100ms' }}
            >
              Tentang saya
            </h2>

            <div
              className={`space-y-4 text-base text-neutral-600 leading-relaxed reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '200ms' }}
            >
              <p>
                Saya mahasiswa Teknik Informatika di STT Wastukancana Purwakarta, aktif dalam organisasi, kegiatan sosial, dan pengembangan solusi berbasis teknologi. Saat ini dipercaya sebagai <strong className="text-neutral-900">Wakil Ketua Bidang Sosial Politik GMNI Wastukancana</strong>.
              </p>
              <p>
                Pengalaman kepemimpinan dimulai sejak SMA — sebagai Ketua Komisi A MPK dan Ketua Regu PMR di SMAN 1 Bungursari. Karakter kerja saya dibentuk oleh disiplin organisasi legislasi siswa dan tanggung jawab koordinasi tim medis lapangan.
              </p>
              <p>
                Tertarik pada inovasi teknologi yang berdampak nyata: dari sistem monitoring biogas cerdas hingga platform AI untuk pelestarian pangan tradisional Indonesia.
              </p>
            </div>

            <div
              className={`quote-block reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-sm text-neutral-600 italic leading-relaxed">
                "Teknologi terbaik bukan tentang kode yang rumit, tetapi sistem yang handal, akuntabel, dan berdampak nyata bagi masyarakat."
              </p>
            </div>
          </div>

          {/* Right: structured info with modern micro-cards */}
          <div className="lg:col-span-2 space-y-7">

            {/* Education */}
            <div
              className={`reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Pendidikan</h3>
              </div>
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-blue-300 transition-colors">
                  <p className="font-semibold text-neutral-900 text-sm">STT Wastukancana</p>
                  <p className="text-xs text-neutral-500 mt-0.5">S1 Teknik Informatika &middot; 2025 – Sekarang</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-colors">
                  <p className="font-semibold text-neutral-900 text-sm">SMAN 1 Bungursari</p>
                  <p className="text-xs text-neutral-500 mt-0.5">IPA &middot; Lulus 2025</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div
              className={`reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Pencapaian</h3>
              </div>
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-neutral-900 text-sm">Juara 1 KNEC 2026</p>
                    <span className="text-[10px] font-semibold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded">Nasional</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">Ketahanan Pangan & Energi</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/70 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-neutral-900 text-sm">Juara 5 MEA 2026</p>
                    <span className="text-[10px] font-semibold bg-blue-200/70 text-blue-900 px-2 py-0.5 rounded">Nasional</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">Merdeka Essay Award (AVO-BIO 2.0)</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-amber-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-neutral-900 text-sm">Top 10 LEON 2026</p>
                    <span className="text-[10px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">Nasional</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">Rekayasa Teknologi</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-neutral-900 text-sm">Top 25 SDGs Canvas 2026</p>
                    <span className="text-[10px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">Nasional</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">Top 25 dari 455 Tim &middot; Aksa Inovasi x Pusbisnas</p>
                </div>
              </div>
            </div>

            {/* Organization */}
            <div
              className={`reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Organisasi</h3>
              </div>
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                  <p className="font-semibold text-neutral-900 text-sm">GMNI Wastukancana</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Wakil Ketua Bidang Sosial Politik</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-neutral-900 text-sm">NOVO Club Batch 4</p>
                    <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded">Completed</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">ParagonCorp &middot; Group Project Completion</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
