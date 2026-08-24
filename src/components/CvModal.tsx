import React from 'react';
import { X, Printer, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 sticky top-0 z-10 bg-white print:hidden">
          <p className="text-sm font-semibold text-neutral-900">Curriculum Vitae</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document */}
        <div className="p-8 sm:p-10 overflow-y-auto space-y-8 bg-white print:p-0">

          {/* Name + Contact */}
          <div className="border-b border-neutral-200 pb-6">
            <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">{PERSONAL_INFO.name}</h1>
            <p className="text-sm text-neutral-500 mt-1">Mahasiswa Teknik Informatika · Leadership, Technology & Social Impact</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500 mt-3 pt-3 border-t border-neutral-100">
              <span>Purwakarta, Indonesia</span>
              <span>·</span>
              <a href={`tel:${PERSONAL_INFO.whatsappNumber}`} className="hover:text-neutral-900">081902716562</a>
              <span>·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-neutral-900">{PERSONAL_INFO.email}</a>
              <span>·</span>
              <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 underline">LinkedIn</a>
              <span>·</span>
              <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 underline">GitHub</a>
            </div>
          </div>

          {/* Profil */}
          <div>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Profil</h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Mahasiswa Teknik Informatika yang aktif dalam organisasi, kegiatan sosial, dan pengembangan solusi berbasis teknologi. Memiliki pengalaman kepemimpinan sejak SMA hingga perguruan tinggi serta pengalaman mengembangkan prototype website dan AI untuk kompetisi. Tertarik pada inovasi teknologi, kepemimpinan, kolaborasi, dan pengembangan solusi yang bermanfaat bagi masyarakat.
            </p>
          </div>

          {/* Pendidikan */}
          <div>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Pendidikan</h2>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div><span className="font-semibold text-neutral-900">STT Wastukancana</span> <span className="text-neutral-500">· S1 Teknik Informatika</span></div>
                <span className="text-xs text-neutral-400">2025 – Sekarang</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div><span className="font-semibold text-neutral-900">SMAN 1 Bungursari</span> <span className="text-neutral-500">· IPA</span></div>
                <span className="text-xs text-neutral-400">Lulus 2025</span>
              </div>
            </div>
          </div>

          {/* Organisasi */}
          <div>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Pengalaman Organisasi</h2>
            <div className="space-y-4 text-sm">
              {[
                { org: 'GMNI, DPK Wastukancana', role: 'Wakil Ketua Bidang Sosial Politik', period: '2026 – Sekarang', desc: 'Terlibat dalam pengembangan kegiatan dan diskusi sosial-politik serta koordinasi internal organisasi.' },
                { org: 'MPK SMAN 1 Bungursari', role: 'Ketua Komisi A Bidang Agama', period: '2024 – 2025', desc: 'Memimpin koordinasi bidang dan bekerja bersama anggota untuk menjalankan program organisasi.' },
                { org: 'PMR SMAN 1 Bungursari', role: 'Ketua Regu Pertolongan Pertama', period: '2024 – 2025', desc: 'Mengkoordinasikan anggota regu dan mendukung kesiapan kegiatan pertolongan pertama serta UKS.' },
                { org: 'NOVO Club', role: 'Peserta/Kontributor', period: '2026', desc: 'Mengikuti kegiatan pengembangan diri dan jejaring di luar lingkungan perkuliahan.' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div><span className="font-semibold text-neutral-900">{item.org}</span> <span className="text-neutral-500">· {item.role}</span></div>
                    <span className="text-xs text-neutral-400">{item.period}</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">• {item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer */}
          <div>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Volunteer</h2>
            <div className="text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div><span className="font-semibold text-neutral-900">Pasundan Run</span> <span className="text-neutral-500">· Volunteer, Divisi Acara</span></div>
                <span className="text-xs text-neutral-400">2026</span>
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">• Mendukung koordinasi dan pelaksanaan kegiatan serta beradaptasi dengan kebutuhan operasional di lapangan.</p>
            </div>
          </div>

          {/* Proyek */}
          <div>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Proyek Teknologi</h2>
            <div className="space-y-3.5 text-sm">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-semibold text-neutral-900">PANGANARA AI</span>
                  <span className="text-xs text-neutral-400">2026</span>
                </div>
                <p className="text-xs text-neutral-600 mt-0.5">• Platform berbasis AI untuk mengenalkan pangan tradisional Indonesia dan mendukung pelestarian budaya.</p>
                <a href="https://panganara-ai-delta.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-0.5">
                  panganara-ai-delta.vercel.app <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-semibold text-neutral-900">AVO-BIO — Biogas Monitoring</span>
                  <span className="text-xs text-neutral-400">2026</span>
                </div>
                <p className="text-xs text-neutral-600 mt-0.5">• Prototype pemantauan biogas berbasis web untuk kompetisi (sensor telemetri ESP32 & AI prediktif).</p>
                <a href="https://biogas-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-0.5">
                  biogas-ten.vercel.app <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-semibold text-neutral-900">Web Prototypes</span>
                  <span className="text-xs text-neutral-400">2025 – 2026</span>
                </div>
                <p className="text-xs text-neutral-600 mt-0.5">• Beberapa prototype website dan solusi digital bersama tim untuk kompetisi dan eksplorasi teknologi.</p>
              </div>
            </div>
          </div>

          {/* Pencapaian */}
          <div>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Pencapaian</h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold text-neutral-900">Juara 1 — Kilat National Essay Competition (KNEC) 2026</p>
                <p className="text-xs text-neutral-500">Subtema Ketahanan Pangan dan Energi · Juli 2026</p>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Top 10 Besar — Lomba Esai Online Nasional (LEON) 2026</p>
                <p className="text-xs text-neutral-500">Subtema Aplikasi & Rekayasa Teknologi · Juli 2026</p>
              </div>
            </div>
          </div>

          {/* Keahlian */}
          <div>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Keahlian</h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Leadership & Teamwork · Event Coordination · Public Communication · Problem Solving · HTML/CSS · JavaScript · Next.js · React · Python · Supabase · AI/Gemini · Git/GitHub
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400 print:hidden">
          <span>{PERSONAL_INFO.name}</span>
          <button onClick={onClose} className="px-3 py-1.5 rounded-lg text-neutral-600 hover:bg-neutral-200 transition-colors">Tutup</button>
        </div>
      </div>
    </div>
  );
};
