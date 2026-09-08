import React, { useState, useEffect } from 'react';
import { Award, X, ZoomIn } from 'lucide-react';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';

interface Certificate {
  id: string;
  title: string;
  event: string;
  organizer: string;
  year: string;
  achievement: string;
  image: string;
  isChampion: boolean;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'knec-2026',
    title: 'Juara 1 — KNEC 2026',
    event: 'Kilat National Essay Competition',
    organizer: 'Kilat Akademik Nusantara & Komunitas Sobat Bumi UPP',
    year: '2026',
    achievement: 'Juara 1 Nasional',
    image: '/certificates/knec-2026.png',
    isChampion: true,
  },
  {
    id: 'leon-2026',
    title: 'Top 10 Besar — LEON 2026',
    event: 'Lomba Esai Online Nasional',
    organizer: 'Forum Cendekia Muda Indonesia (Forcemi)',
    year: '2026',
    achievement: 'Top 10 Nasional',
    image: '/certificates/leon-2026.png',
    isChampion: false,
  },
];

export const Achievements: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightboxImage) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxImage]);

  return (
    <>
      <section
        id="pencapaian"
        ref={ref}
        className={`py-24 section-alt reveal-section ${isVisible ? 'in-view' : ''}`}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">
          <div className={`reveal-item ${isVisible ? 'in-view' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              Pencapaian
            </h2>
            <p className="text-base text-neutral-500 mb-14 max-w-lg">
              Piagam penghargaan dari kompetisi karya tulis ilmiah dan inovasi teknologi tingkat nasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATES.map((cert, index) => (
              <div
                key={cert.id}
                className={`reveal-item ${isVisible ? 'in-view' : ''} group cursor-pointer`}
                style={{ transitionDelay: getStaggerDelay(index + 1, 100) }}
                onClick={() => setLightboxImage(cert.image)}
              >
                <div className="card-gradient-border overflow-hidden">
                  {/* Certificate Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img
                      src={cert.image}
                      alt={`Sertifikat ${cert.title}`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full bg-white/90 shadow-lg">
                        <ZoomIn className="w-5 h-5 text-neutral-700" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2.5">
                      {cert.isChampion && (
                        <Award className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                      )}
                      <h3 className="font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {cert.title}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-500">{cert.event}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-neutral-400">{cert.organizer}</span>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${
                          cert.isChampion
                            ? 'text-amber-800 bg-amber-50 border border-amber-200'
                            : 'text-neutral-500 bg-neutral-100'
                        }`}
                      >
                        {cert.achievement}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Sertifikat"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
