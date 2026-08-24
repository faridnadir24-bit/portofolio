import React from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Users, 
  Sparkles,
  ExternalLink,
  HeartHandshake
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

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
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/90 sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6C7CE0] animate-pulse" />
            <span className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
              Curriculum Vitae (CV) Resmi • Farid Nadir Amrulloh
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#2A2A3C] hover:bg-stone-900 text-white shadow-xs transition-colors"
              title="Cetak atau Simpan PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Unduh PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document Body (Exact matching structure with user's official PDF) */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-white print:p-0">
          
          {/* Header CV */}
          <div className="border-b border-stone-200 pb-6 text-center sm:text-left">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E232A] tracking-tight uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm sm:text-base text-[#5865F2] font-semibold mt-1">
              Mahasiswa Teknik Informatika | Leadership, Technology & Social Impact
            </p>
            
            {/* Contact Strip */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs font-mono text-stone-600 mt-3 pt-3 border-t border-stone-100">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#5865F2]" /> Purwakarta, Indonesia
              </span>
              <span>•</span>
              <a href={`tel:${PERSONAL_INFO.whatsappNumber}`} className="flex items-center gap-1 hover:text-[#5865F2]">
                <Phone className="w-3.5 h-3.5 text-[#5865F2]" /> 081902716562
              </a>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1 hover:text-[#5865F2]">
                <Mail className="w-3.5 h-3.5 text-[#5865F2]" /> {PERSONAL_INFO.email}
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#5865F2] text-[#0077B5] font-semibold">
                LinkedIn
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#5865F2] text-stone-800 font-semibold">
                GitHub
              </a>
            </div>
          </div>

          {/* 1. PROFIL */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5865F2] border-b-2 border-[#5865F2]/30 pb-1 mb-2.5">
              PROFIL
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              Mahasiswa Teknik Informatika yang aktif dalam organisasi, kegiatan sosial, dan pengembangan solusi berbasis teknologi. Memiliki pengalaman kepemimpinan sejak SMA hingga perguruan tinggi serta pengalaman mengembangkan prototype website dan AI untuk kompetisi. Tertarik pada inovasi teknologi, kepemimpinan, kolaborasi, dan pengembangan solusi yang bermanfaat bagi masyarakat.
            </p>
          </div>

          {/* 2. PENDIDIKAN */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5865F2] border-b-2 border-[#5865F2]/30 pb-1 mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> PENDIDIKAN
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <span className="font-bold text-stone-900">STT Wastukancana</span>
                  <span className="text-stone-600"> | S1 Teknik Informatika</span>
                </div>
                <span className="font-mono text-xs text-stone-500">2025 - Sekarang | Purwakarta</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <span className="font-bold text-stone-900">SMAN 1 Bungursari</span>
                  <span className="text-stone-600"> | IPA</span>
                </div>
                <span className="font-mono text-xs text-stone-500">Lulus 2025 | Purwakarta</span>
              </div>
            </div>
          </div>

          {/* 3. PENGALAMAN ORGANISASI & KEPEMIMPINAN */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5865F2] border-b-2 border-[#5865F2]/30 pb-1 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> PENGALAMAN ORGANISASI & KEPEMIMPINAN
            </h2>
            <div className="space-y-4 text-xs sm:text-sm">
              
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-stone-900">
                    GMNI, DPK Wastukancana <span className="font-normal text-stone-600">| Wakil Ketua Bidang Sosial Politik</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500">2026 - Sekarang</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  • Terlibat dalam pengembangan kegiatan dan diskusi sosial-politik serta koordinasi internal organisasi.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-stone-900">
                    MPK SMAN 1 Bungursari <span className="font-normal text-stone-600">| Ketua Komisi A Bidang Agama</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500">2024 - 2025</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  • Memimpin koordinasi bidang dan bekerja bersama anggota untuk menjalankan program organisasi.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-stone-900">
                    PMR SMAN 1 Bungursari <span className="font-normal text-stone-600">| Ketua Regu Pertolongan Pertama</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500">2024 - 2025</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  • Mengkoordinasikan anggota regu dan mendukung kesiapan kegiatan pertolongan pertama serta UKS.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-stone-900">
                    NOVO Club <span className="font-normal text-stone-600">| Peserta/Kontributor Kegiatan Eksternal</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500">2026</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  • Mengikuti kegiatan pengembangan diri dan jejaring di luar lingkungan perkuliahan.
                </p>
              </div>

            </div>
          </div>

          {/* 4. PENGALAMAN KEGIATAN & VOLUNTEER */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5865F2] border-b-2 border-[#5865F2]/30 pb-1 mb-3 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4" /> PENGALAMAN KEGIATAN & VOLUNTEER
            </h2>
            <div className="text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="font-bold text-stone-900">
                  Pasundan Run <span className="font-normal text-stone-600">| Volunteer, Divisi Acara</span>
                </span>
                <span className="font-mono text-xs text-stone-500">2026</span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                • Mendukung koordinasi dan pelaksanaan kegiatan serta beradaptasi dengan kebutuhan operasional di lapangan.
              </p>
            </div>
          </div>

          {/* 5. PROYEK & INISIATIF TEKNOLOGI */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5865F2] border-b-2 border-[#5865F2]/30 pb-1 mb-3 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> PROYEK & INISIATIF TEKNOLOGI
            </h2>
            <div className="space-y-3.5 text-xs sm:text-sm">
              
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-stone-900">PANGANARA AI</span>
                  <span className="font-mono text-xs text-stone-500">2026</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  • Mengembangkan prototype platform berbasis AI untuk mengenalkan pangan tradisional Indonesia dan mendukung pelestarian budaya.
                </p>
                <a 
                  href="https://panganara-ai-delta.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#5865F2] hover:underline mt-0.5"
                >
                  <span>Demo: https://panganara-ai-delta.vercel.app/</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-stone-900">Biogas Monitoring Prototype (AVO-BIO)</span>
                  <span className="font-mono text-xs text-stone-500">2026</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  • Mengembangkan prototype pemantauan biogas berbasis web untuk kompetisi (Integrasi sensor telemetri ESP32 & AI).
                </p>
                <a 
                  href="https://biogas-ten.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#5865F2] hover:underline mt-0.5"
                >
                  <span>Demo: https://biogas-ten.vercel.app/</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-stone-900">Web Development Prototypes</span>
                  <span className="font-mono text-xs text-stone-500">2025 - 2026</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  • Mengembangkan beberapa prototype website dan solusi digital bersama tim untuk kompetisi dan eksplorasi teknologi (SIRKULAR, NERACA, POS Resto).
                </p>
              </div>

            </div>
          </div>

          {/* 6. PENCAPAIAN */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 border-b-2 border-amber-500/30 pb-1 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" /> PENCAPAIAN
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">🥇</span>
                <div>
                  <span className="font-bold text-stone-900">Juara 1 - Kilat National Essay Competition (KNEC) 2026</span>
                  <p className="text-xs text-stone-600">Subtema Ketahanan Pangan dan Energi | Jul 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-stone-500 font-bold">🏅</span>
                <div>
                  <span className="font-bold text-stone-900">Top 10 Besar Terbaik - Lomba Esai Online Nasional (LEON) 2026</span>
                  <p className="text-xs text-stone-600">Subtema Aplikasi & Rekayasa Teknologi | Jul 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* 7. KEAHLIAN */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5865F2] border-b-2 border-[#5865F2]/30 pb-1 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> KEAHLIAN
            </h2>
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-mono">
              Leadership & Teamwork • Event Coordination • Public Communication • Problem Solving • HTML/CSS • JavaScript • Next.js • React • Python • Supabase • AI/Gemini • Git/GitHub
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-mono print:hidden">
          <span>{PERSONAL_INFO.name} • Curriculum Vitae</span>
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
