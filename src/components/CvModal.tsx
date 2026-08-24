import React from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="w-full max-w-4xl bg-[#141414] rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-auto max-h-[92vh] flex flex-col text-left text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161616] sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider">
              Official Curriculum Vitae • Farid Nadir Amrulloh
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold bg-white hover:bg-stone-200 text-black shadow-md transition-all active:scale-95"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-2xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-[#121212] print:bg-white print:text-black print:p-0">
          
          {/* Header CV */}
          <div className="border-b border-white/10 print:border-stone-300 pb-6 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-black text-white print:text-black tracking-tight uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm sm:text-base text-stone-400 print:text-stone-700 font-semibold mt-1 font-mono">
              Mahasiswa Teknik Informatika | Leadership, Technology & Social Impact
            </p>
            
            {/* Contact Strip */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs font-mono text-stone-400 print:text-stone-600 mt-3 pt-3 border-t border-white/5 print:border-stone-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" /> Purwakarta, Indonesia
              </span>
              <span>•</span>
              <a href={`tel:${PERSONAL_INFO.whatsappNumber}`} className="flex items-center gap-1 hover:text-white print:hover:text-black">
                <Phone className="w-3.5 h-3.5 text-stone-400" /> 081902716562
              </a>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1 hover:text-white print:hover:text-black">
                <Mail className="w-3.5 h-3.5 text-stone-400" /> {PERSONAL_INFO.email}
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white print:hover:text-black font-semibold underline">
                LinkedIn
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white print:hover:text-black font-semibold underline">
                GitHub
              </a>
            </div>
          </div>

          {/* 1. PROFIL */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white print:text-black border-b border-white/20 print:border-stone-800 pb-1 mb-2.5">
              PROFIL
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 print:text-stone-700 leading-relaxed font-sans">
              Mahasiswa Teknik Informatika yang aktif dalam organisasi, kegiatan sosial, dan pengembangan solusi berbasis teknologi. Memiliki pengalaman kepemimpinan sejak SMA hingga perguruan tinggi serta pengalaman mengembangkan prototype website dan AI untuk kompetisi. Tertarik pada inovasi teknologi, kepemimpinan, kolaborasi, dan pengembangan solusi yang bermanfaat bagi masyarakat.
            </p>
          </div>

          {/* 2. PENDIDIKAN */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white print:text-black border-b border-white/20 print:border-stone-800 pb-1 mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> PENDIDIKAN
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <span className="font-bold text-white print:text-black">STT Wastukancana</span>
                  <span className="text-stone-400 print:text-stone-600"> | S1 Teknik Informatika</span>
                </div>
                <span className="font-mono text-xs text-stone-500">2025 - Sekarang | Purwakarta</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <span className="font-bold text-white print:text-black">SMAN 1 Bungursari</span>
                  <span className="text-stone-400 print:text-stone-600"> | IPA</span>
                </div>
                <span className="font-mono text-xs text-stone-500">Lulus 2025 | Purwakarta</span>
              </div>
            </div>
          </div>

          {/* 3. PENGALAMAN ORGANISASI & KEPEMIMPINAN */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white print:text-black border-b border-white/20 print:border-stone-800 pb-1 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> PENGALAMAN ORGANISASI & KEPEMIMPINAN
            </h2>
            <div className="space-y-4 text-xs sm:text-sm">
              
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-white print:text-black">
                    GMNI, DPK Wastukancana <span className="font-normal text-stone-400 print:text-stone-600">| Wakil Ketua Bidang Sosial Politik</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500">2026 - Sekarang</span>
                </div>
                <p className="text-xs text-stone-400 print:text-stone-600 mt-0.5 leading-relaxed">
                  • Terlibat dalam pengembangan kegiatan dan diskusi sosial-politik serta koordinasi internal organisasi.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-white print:text-black">
                    MPK SMAN 1 Bungursari <span className="font-normal text-stone-400 print:text-stone-600">| Ketua Komisi A Bidang Agama</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500">2024 - 2025</span>
                </div>
                <p className="text-xs text-stone-400 print:text-stone-600 mt-0.5 leading-relaxed">
                  • Memimpin koordinasi bidang dan bekerja bersama anggota untuk menjalankan program organisasi.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-white print:text-black">
                    PMR SMAN 1 Bungursari <span className="font-normal text-stone-400 print:text-stone-600">| Ketua Regu Pertolongan Pertama</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500">2024 - 2025</span>
                </div>
                <p className="text-xs text-stone-400 print:text-stone-600 mt-0.5 leading-relaxed">
                  • Mengkoordinasikan anggota regu dan mendukung kesiapan kegiatan pertolongan pertama serta UKS.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-white print:text-black">
                    NOVO Club <span className="font-normal text-stone-400 print:text-stone-600">| Peserta/Kontributor Kegiatan Eksternal</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500">2026</span>
                </div>
                <p className="text-xs text-stone-400 print:text-stone-600 mt-0.5 leading-relaxed">
                  • Mengikuti kegiatan pengembangan diri dan jejaring di luar lingkungan perkuliahan.
                </p>
              </div>

            </div>
          </div>

          {/* 4. PENGALAMAN KEGIATAN & VOLUNTEER */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white print:text-black border-b border-white/20 print:border-stone-800 pb-1 mb-3 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4" /> PENGALAMAN KEGIATAN & VOLUNTEER
            </h2>
            <div className="text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="font-bold text-white print:text-black">
                  Pasundan Run <span className="font-normal text-stone-400 print:text-stone-600">| Volunteer, Divisi Acara</span>
                </span>
                <span className="font-mono text-xs text-stone-500">2026</span>
              </div>
              <p className="text-xs text-stone-400 print:text-stone-600 mt-0.5 leading-relaxed">
                • Mendukung koordinasi dan pelaksanaan kegiatan serta beradaptasi dengan kebutuhan operasional di lapangan.
              </p>
            </div>
          </div>

          {/* 5. PROYEK & INISIATIF TEKNOLOGI */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white print:text-black border-b border-white/20 print:border-stone-800 pb-1 mb-3 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> PROYEK & INISIATIF TEKNOLOGI
            </h2>
            <div className="space-y-3.5 text-xs sm:text-sm">
              
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-white print:text-black">PANGANARA AI</span>
                  <span className="font-mono text-xs text-stone-500">2026</span>
                </div>
                <p className="text-xs text-stone-400 print:text-stone-600 mt-0.5 leading-relaxed">
                  • Mengembangkan prototype platform berbasis AI untuk mengenalkan pangan tradisional Indonesia dan mendukung pelestarian budaya.
                </p>
                <a 
                  href="https://panganara-ai-delta.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-300 print:text-blue-600 hover:underline mt-0.5"
                >
                  <span>Demo: https://panganara-ai-delta.vercel.app/</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-white print:text-black">Biogas Monitoring Prototype (AVO-BIO)</span>
                  <span className="font-mono text-xs text-stone-500">2026</span>
                </div>
                <p className="text-xs text-stone-400 print:text-stone-600 mt-0.5 leading-relaxed">
                  • Mengembangkan prototype pemantauan biogas berbasis web untuk kompetisi (Integrasi sensor telemetri ESP32 & AI).
                </p>
                <a 
                  href="https://biogas-ten.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-300 print:text-blue-600 hover:underline mt-0.5"
                >
                  <span>Demo: https://biogas-ten.vercel.app/</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-white print:text-black">Web Development Prototypes</span>
                  <span className="font-mono text-xs text-stone-500">2025 - 2026</span>
                </div>
                <p className="text-xs text-stone-400 print:text-stone-600 mt-0.5 leading-relaxed">
                  • Mengembangkan beberapa prototype website dan solusi digital bersama tim untuk kompetisi dan eksplorasi teknologi (SIRKULAR, NERACA, POS Resto).
                </p>
              </div>

            </div>
          </div>

          {/* 6. PENCAPAIAN */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 print:text-amber-800 border-b border-amber-500/30 pb-1 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> PENCAPAIAN
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">🥇</span>
                <div>
                  <span className="font-bold text-white print:text-black">Juara 1 - Kilat National Essay Competition (KNEC) 2026</span>
                  <p className="text-xs text-stone-400 print:text-stone-600">Subtema Ketahanan Pangan dan Energi | Jul 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-stone-400 font-bold">🏅</span>
                <div>
                  <span className="font-bold text-white print:text-black">Top 10 Besar Terbaik - Lomba Esai Online Nasional (LEON) 2026</span>
                  <p className="text-xs text-stone-400 print:text-stone-600">Subtema Aplikasi & Rekayasa Teknologi | Jul 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* 7. KEAHLIAN */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white print:text-black border-b border-white/20 print:border-stone-800 pb-1 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> KEAHLIAN
            </h2>
            <div className="p-4 rounded-2xl bg-[#181818] print:bg-stone-100 border border-white/5 print:border-stone-200 text-xs sm:text-sm text-stone-300 print:text-stone-800 leading-relaxed font-mono">
              Leadership & Teamwork • Event Coordination • Public Communication • Problem Solving • HTML/CSS • JavaScript • Next.js • React • Python • Supabase • AI/Gemini • Git/GitHub
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#161616] border-t border-white/10 flex items-center justify-between text-xs text-stone-500 font-mono print:hidden">
          <span>{PERSONAL_INFO.name} • Curriculum Vitae</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
