import React, { useState, useEffect, useCallback } from 'react';
import { Award, X, ZoomIn, FileText, Download, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';

interface Certificate {
  id: string;
  title: string;
  event: string;
  subtheme: string;
  organizer: string;
  year: string;
  achievement: string;
  credentialNo?: string;
  image: string;
  pdfUrl?: string;
  isChampion: boolean;
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
    credentialNo: 'No. 017/Ket-Ene/KNEC/SOBI/VII/2026',
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
    credentialNo: 'No. 13. 327 /FRC/MEA/VIII/2026',
    image: '/certificates/mea-2026.png',
    pdfUrl: '/certificates/sk-penetapan-juara-mea-2026.pdf',
    isChampion: true,
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
    credentialNo: 'No. 13. 972 /FRC/LEON/VII/2026',
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
    credentialNo: 'Sert. 11/PADUKA-UNPAS/08/2026',
    image: '/certificates/pasundan-run-2026.png',
    isChampion: false,
    category: 'organization',
  },
];

export const Achievements: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [activeTab, setActiveTab] = useState<'all' | 'competition' | 'organization'>('all');
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  const filteredCerts = activeTab === 'all'
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === activeTab);

  const selectedCert = selectedCertIndex !== null ? filteredCerts[selectedCertIndex] : null;

  const handleNextCert = useCallback(() => {
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((prev) => (prev! + 1) % filteredCerts.length);
  }, [selectedCertIndex, filteredCerts.length]);

  const handlePrevCert = useCallback(() => {
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((prev) => (prev! - 1 + filteredCerts.length) % filteredCerts.length);
  }, [selectedCertIndex, filteredCerts.length]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (selectedCertIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCertIndex(null);
      if (e.key === 'ArrowRight') handleNextCert();
      if (e.key === 'ArrowLeft') handlePrevCert();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedCertIndex, handleNextCert, handlePrevCert]);

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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 mb-3 shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Legalitas & Rekam Jejak</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-2">
                Pencapaian & Sertifikat
              </h2>
              <p className="text-base text-neutral-500 max-w-lg">
                Piagam resmi kompetisi ilmiah nasional serta sertifikasi kepanitiaan dan kepemimpinan organisasi.
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
                  onClick={() => {
                    setActiveTab(tab.id as typeof activeTab);
                    setSelectedCertIndex(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 bg-white/80 border border-neutral-200/80'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.id ? 'bg-neutral-700 text-neutral-200' : 'bg-neutral-100 text-neutral-600'
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
                onClick={() => setSelectedCertIndex(index)}
              >
                <div className="card-gradient-border overflow-hidden h-full flex flex-col justify-between bg-white hover:shadow-xl transition-all duration-300">
                  <div>
                    {/* Certificate Thumbnail with framed paper effect */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 border-b border-neutral-100 p-2.5">
                      <div className="w-full h-full rounded-lg overflow-hidden border border-neutral-200/80 shadow-xs relative bg-white">
                        <img
                          src={cert.image}
                          alt={`Sertifikat ${cert.title}`}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Hover overlay with zoom hint */}
                        <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xs shadow-lg flex items-center gap-2 text-xs font-semibold text-neutral-900 border border-neutral-200">
                            <ZoomIn className="w-3.5 h-3.5 text-blue-600" />
                            <span>Buka Piagam</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
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
                  <div className="px-5 pb-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                    <span className="truncate max-w-[240px]">{cert.organizer}</span>
                    <span className="shrink-0 font-mono font-medium text-neutral-500">{cert.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal with Gallery Carousel Navigation */}
      {selectedCert && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedCertIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedCertIndex(null)}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white transition-all z-30 border border-white/20 shadow-lg"
            title="Tutup (ESC)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevCert();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white transition-all z-30 border border-white/20 shadow-lg group hover:scale-105"
            title="Sertifikat Sebelumnya (←)"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextCert();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white transition-all z-30 border border-white/20 shadow-lg group hover:scale-105"
            title="Sertifikat Selanjutnya (→)"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-4xl w-full flex flex-col items-center max-h-[92vh] overflow-y-auto bg-neutral-950/95 rounded-2xl p-4 sm:p-6 border border-neutral-800 shadow-2xl mx-12 sm:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with counter */}
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/80 text-xs text-neutral-400">
              <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                {selectedCertIndex! + 1} dari {filteredCerts.length} Piagam
              </span>
              <span className="hidden sm:inline text-neutral-500">
                Gunakan tombol panah keyboard ← / → untuk navigasi
              </span>
            </div>

            {/* Image display */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-w-full max-h-[64vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Lightbox Information Bar */}
            <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-white text-base sm:text-lg">
                    {selectedCert.title}
                  </h4>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                      selectedCert.isChampion
                        ? 'text-amber-300 bg-amber-950/80 border border-amber-700'
                        : 'text-neutral-300 bg-neutral-800 border border-neutral-700'
                    }`}
                  >
                    {selectedCert.achievement}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 font-medium">
                  {selectedCert.event} &middot; {selectedCert.organizer}
                </p>
                <div className="flex items-center gap-3 text-xs text-neutral-400 flex-wrap">
                  {selectedCert.credentialNo && (
                    <span className="font-mono bg-neutral-800/80 px-2 py-0.5 rounded text-neutral-300">
                      {selectedCert.credentialNo}
                    </span>
                  )}
                  <span>Tahun: {selectedCert.year}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto flex-wrap">
                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Lihat SK (PDF)</span>
                  </a>
                )}
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition-colors"
                  title="Buka Gambar Resolusi Penuh"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Tab Baru</span>
                </a>
                <a
                  href={selectedCert.image}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition-colors"
                  title="Unduh Piagam"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
