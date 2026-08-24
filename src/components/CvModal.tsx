import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, TIMELINE } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80 sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6C7CE0] animate-pulse" />
            <span className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
              Preview Resume / Curriculum Vitae
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors"
              title="Cetak atau Simpan PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-white print:p-0">
          
          {/* Header CV */}
          <div className="border-b border-stone-200 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2A3C] tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-base text-[#6C7CE0] font-medium mt-1">
                  {PERSONAL_INFO.title}
                </p>
              </div>
              <div className="text-xs font-mono text-stone-600 space-y-1">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#6C7CE0]" /> {PERSONAL_INFO.email}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#6C7CE0]" /> {PERSONAL_INFO.whatsappDisplay}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6C7CE0]" /> {PERSONAL_INFO.location}
                </p>
              </div>
            </div>
            <p className="text-sm text-stone-600 mt-4 leading-relaxed font-sans">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Pendidikan */}
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#6C7CE0] flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4" /> Riwayat Pendidikan
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-800">
                      Sekolah Tinggi Teknologi Wastukancana Purwakarta
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">S1 Teknik Informatika</p>
                  </div>
                  <span className="text-xs font-mono text-stone-500">2025 – Sekarang</span>
                </div>
                <p className="text-xs text-stone-600 mt-2">
                  Fokus riset terapan: Kecerdasan Buatan (AI Time-Series), Internet of Things (ESP32/MQTT), dan Full-Stack Web.
                </p>
              </div>
            </div>
          </div>

          {/* Prestasi & Penghargaan */}
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-600 flex items-center gap-2 mb-3">
              <Award className="w-4 h-4" /> Prestasi & Penghargaan Kompetisi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 mb-1.5">
                  Juara 1 Nasional
                </div>
                <h3 className="font-serif font-bold text-sm text-stone-800">
                  Kilat National Essay Competition (KNEC) 2026
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Subtema Ketahanan Pangan & Energi — Inovasi sistem biogas cerdas AVO-BIO.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-200 text-stone-700 mb-1.5">
                  Top 10 Nasional
                </div>
                <h3 className="font-serif font-bold text-sm text-stone-800">
                  Lomba Esai Online Nasional (LEON) 2026
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Subtema Aplikasi & Rekayasa Teknologi oleh FORCEMI.
                </p>
              </div>
            </div>
          </div>

          {/* 5 Proyek Utama */}
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#6C7CE0] flex items-center gap-2 mb-3">
              <Code2 className="w-4 h-4" /> Proyek Rekayasa & Portofolio
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/80">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-sm text-stone-800">{p.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                        {p.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {p.techStack.map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Summary */}
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" /> Keahlian Teknis (Tech Stack)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                <span className="font-semibold text-stone-800 block mb-1">Frontend & UI Engineering:</span>
                <p className="text-stone-600">React.js, Next.js, TypeScript, Tailwind CSS, Component Architecture</p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                <span className="font-semibold text-stone-800 block mb-1">AI & Machine Learning:</span>
                <p className="text-stone-600">Python, LSTM Time-Series, YOLOv8 Computer Vision, Fuzzy Logic</p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                <span className="font-semibold text-stone-800 block mb-1">IoT & Embedded Hardware:</span>
                <p className="text-stone-600">ESP32, MQTT Protocol, Mosquitto Broker, Sensor Telemetry (Gas, Suhu, PLTS)</p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                <span className="font-semibold text-stone-800 block mb-1">Backend & Database:</span>
                <p className="text-stone-600">Laravel REST API, Supabase, PostgreSQL, IndexedDB Offline-Sync</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-mono print:hidden">
          <span>Official Digital Resume • {PERSONAL_INFO.name}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 text-white font-medium hover:bg-stone-900 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
