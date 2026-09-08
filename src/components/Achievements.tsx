import React, { useState, useEffect } from 'react';
import { Award, X, ZoomIn, FileText, Download, CheckCircle2, Clock } from 'lucide-react';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';

interface Certificate {
  id: string;
  title: string;
  event: string;
  subtheme: string;
  organizer: string;
  year: string;
  achievement: string;
  image: string;
  pdfUrl?: string;
  isChampion: boolean;
  isPendingCert?: boolean;
  note?: string;
  category: 'competition' | 'organization';
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'knec-2026',
    title: 'Juara 1 — KNEC 2026',
    event: 'Kilat National Essay Competition',
    subtheme: 'Subtema Ketahanan Pangan dan Energi',
    organizer: 'Kilat Akademik Nusantara & Komunitas Sobat Bumi UPP',
    year: '2026',
    achievement: 'Juara 1 Nasional',
    image: '/certificates/knec-2026.png',
    isChampion: true,
    category: 'competition',
  },
  {
    id: 'mea-2026',
    title: 'Juara 5 — Merdeka Essay Award (MEA) 2026',
    event: 'Lomba Esai Nasional Mahasiswa (Karya AVO-BIO 2.0)',
    subtheme: 'Gagasan Generasi Muda untuk Indonesia',
    organizer: 'Forum Cendekia Muda Indonesia (PT Forcemi Cendekia)',
    year: '2026',
    achievement: 'Juara 5 Nasional',
    image: '/certificates/mea-2026.png',
    pdfUrl: '/certificates/sk-penetapan-juara-mea-2026.pdf',
    isChampion: true,
    isPendingCert: true,
    note: 'SK Resmi No. 01.13/SK/FRC/MEA/VIII/2026 • E-Sertifikat proses penerbitan',
    category: 'competition',
  },
  {
    id: 'leon-2026',
    title: 'Top 10 Besar — LEON 2026',
    event: 'Lomba Esai Online Nasional',
    subtheme: 'Subtema Aplikasi & Rekayasa Teknologi',
    organizer: 'Forum Cendekia Muda Indonesia (FORCEMI)',
    year: '2026',
    achievement: 'Top 10 Nasional',
    image: '/certificates/leon-2026.png',
    isChampion: false,
    category: 'competition',
  },
  {
    id: 'pasundan-run-2026',
    title: 'Panitia Divisi Acara — Pasundan Run 2026',
    event: 'Pasundan Run 2026 – Run for Unity',
    subtheme: 'Kepanitiaan & Manajemen Operasional Lapangan',
    organizer: 'PADUKA-UNPAS (Paguyuban Barudak Purwakarta UNPAS)',
    year: '2026',
    achievement: 'Sertifikat Panitia',
    image: '/certificates/pasundan-run-2026.png',
    note: 'Sert. 11/PADUKA-UNPAS/08/2026',
    isChampion: false,
    category: 'organization',
  },
];

export const Achievements: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [activeTab, setActiveTab] = useState<'all' | 'competition' | 'organization'>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Close lightbox on Escape
  useEffect(() => {
    if (!selectedCert) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedCert]);

  const filteredCerts = activeTab === 'all'
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === activeTab);

  const tabs = [
    { id: 'all', label: 'Semua', count: CERTIFICATES.length },
    { id: 'competition', label: 'Kompetisi & Karya Ilmiah', count: CERTIFICATES.filter(c => c.category === 'competition').length },
    { id: 'organization', label: 'Kepanitiaan & Organisasi', count: CERTIFICATES.filter(c => c.category === 'organization').length },
  ];

  return (
    <>
      <section
        id="pencapaian"
        ref={ref}
        className={`py-24 section-alt reveal-section ${isVisible ? 'in-view' : ''}`}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">
          
          {/* Header & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className={`reveal-item ${isVisible ? 'in-view' : ''}`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-3">
                Pencapaian & Sertifikat
              </h2>
              <p className="text-base text-neutral-500 max-w-lg">
                Bukti legalitas penghargaan kompetisi ilmiah nasional serta kontribusi aktif dalam kepanitiaan dan organisasi.
              </p>
            </div>

            {/* Category tabs */}
            <div
              className={`flex flex-wrap gap-1.5 reveal-item ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: '150ms' }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 bg-white/70 border border-neutral-200/80'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === tab.id ? 'bg-neutral-700 text-neutral-200' : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCerts.map((cert, index) => (
              <div
                key={cert.id}
                className={`reveal-item ${isVisible ? 'in-view' : ''} group cursor-pointer`}
                style={{ transitionDelay: getStaggerDelay(index + 1, 90) }}
                onClick={() => setSelectedCert(cert)}
              >
                <div className="card-gradient-border overflow-hidden h-full flex flex-col justify-between">
                  <div>
                    {/* Certificate Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 border-b border-neutral-100">
                      <img
                        src={cert.image}
                        alt={`Sertifikat ${cert.title}`}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Status / Pending Banner on Thumbnail */}
                      {cert.isPendingCert && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-md flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>SK Resmi Dewan Juri</span>
                        </div>
                      )}

                      {/* Hover overlay with zoom hint */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3.5 py-2 rounded-xl bg-white/95 shadow-lg flex items-center gap-2 text-xs font-semibold text-neutral-800">
                          <ZoomIn className="w-4 h-4 text-blue-600" />
                          <span>Perbesar Piagam</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {cert.isChampion && (
                            <Award className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                          )}
                          <h3 className="font-bold text-neutral-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
                            {cert.title}
                          </h3>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-md shrink-0 ${
                            cert.isChampion
                              ? 'text-amber-800 bg-amber-50 border border-amber-200'
                              : 'text-neutral-700 bg-neutral-100 border border-neutral-200'
                          }`}
                        >
                          {cert.achievement}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-neutral-700">
                        {cert.event}
                      </p>

                      <p className="text-xs text-neutral-500 line-clamp-1">
                        {cert.subtheme}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 pb-5 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                    <span className="truncate max-w-[240px]">{cert.organizer}</span>
                    <span className="shrink-0 font-mono">{cert.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedCert(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedCert(null)}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all z-20 border border-white/20"
            title="Tutup (ESC)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-4xl w-full flex flex-col items-center max-h-[92vh] overflow-y-auto bg-neutral-950/90 rounded-2xl p-4 sm:p-6 border border-neutral-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image display */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-w-full max-h-[68vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Lightbox Information Bar */}
            <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base sm:text-lg">
                    {selectedCert.title}
                  </h4>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                      selectedCert.isChampion
                        ? 'text-amber-300 bg-amber-950/70 border border-amber-700'
                        : 'text-neutral-300 bg-neutral-800'
                    }`}
                  >
                    {selectedCert.achievement}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  {selectedCert.event} &middot; {selectedCert.organizer} ({selectedCert.year})
                </p>
                {selectedCert.note && (
                  <p className="text-xs text-blue-400 pt-0.5">
                    {selectedCert.note}
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Lihat Dokumen SK (PDF)</span>
                  </a>
                )}
                <a
                  href={selectedCert.image}
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Gambar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
