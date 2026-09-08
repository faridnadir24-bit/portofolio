import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';

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

          {/* Right: structured info */}
          <div className="lg:col-span-2 space-y-8">

            {/* Education */}
            <div
              className={`reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-4">Pendidikan</h3>
              <div className="space-y-4">
                <div className="pl-4 border-l-2 border-blue-500">
                  <p className="font-semibold text-neutral-900">STT Wastukancana</p>
                  <p className="text-sm text-neutral-500">S1 Teknik Informatika &middot; 2025 – Sekarang</p>
                </div>
                <div className="pl-4 border-l-2 border-neutral-200">
                  <p className="font-semibold text-neutral-900">SMAN 1 Bungursari</p>
                  <p className="text-sm text-neutral-500">IPA &middot; Lulus 2025</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div
              className={`reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-4">Pencapaian</h3>
              <div className="space-y-3">
                <div className="pl-4 border-l-2 border-amber-400">
                  <p className="font-semibold text-neutral-900">Juara 1 KNEC 2026</p>
                  <p className="text-sm text-neutral-500">Ketahanan Pangan & Energi</p>
                </div>
                <div className="pl-4 border-l-2 border-amber-300">
                  <p className="font-semibold text-neutral-900">Top 10 LEON 2026</p>
                  <p className="text-sm text-neutral-500">Rekayasa Teknologi</p>
                </div>
              </div>
            </div>

            {/* Organization */}
            <div
              className={`reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '400ms' }}
            >
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-4">Organisasi</h3>
              <div className="space-y-3">
                <div className="pl-4 border-l-2 border-emerald-400">
                  <p className="font-semibold text-neutral-900">GMNI Wastukancana</p>
                  <p className="text-sm text-neutral-500">Wakil Ketua Bidang Sosial Politik</p>
                </div>
                <div className="pl-4 border-l-2 border-emerald-300">
                  <p className="font-semibold text-neutral-900">NOVO Club</p>
                  <p className="text-sm text-neutral-500">Pengembangan diri & networking</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
