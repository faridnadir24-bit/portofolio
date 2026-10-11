import React, { useState, useEffect } from 'react';
import { X, Printer, Copy, Check, FileText, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { getSecureEmail, getSecureWhatsAppDisplay, getSecureWhatsAppNumber } from '../utils/security';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [waDisp, setWaDisp] = useState('');
  const [waNum, setWaNum] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail(getSecureEmail());
      setWaDisp(getSecureWhatsAppDisplay());
      setWaNum(getSecureWhatsAppNumber());
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-scroll-locked');
    } else {
      document.body.classList.remove('body-scroll-locked');
    }
    return () => document.body.classList.remove('body-scroll-locked');
  }, [isOpen]);

  if (!isOpen) return null;

  const rawAtsText = `FARID NADIR AMRULLOH
Purwakarta, Jawa Barat, Indonesia | Telp/WA: ${waDisp || '081902716562'} | Email: ${email || 'faridnadir24@gmail.com'}
LinkedIn: ${PERSONAL_INFO.linkedinUrl} | GitHub: ${PERSONAL_INFO.githubUrl} | Portofolio: https://portofolio-gvgr.vercel.app

============================================================
RINGKASAN PROFESIONAL
============================================================
Mahasiswa S1 Teknik Informatika di STT Wastukancana Purwakarta dengan fokus pada arsitektur sistem cerdas (AI), telemetri IoT, dan rekayasa full-stack modern. Memiliki rekam jejak prestasi kompetisi karya tulis ilmiah dan rekayasa teknologi tingkat nasional (Juara 1 KNEC 2026, Juara 5 MEA 2026, Top 10 LEON 2026, Top 25 SEI 2026 dari 455 tim). Berpengalaman memimpin organisasi mahasiswa sebagai Wakil Ketua Bidang Sosial Politik GMNI dan menyelesaikan program kepemimpinan kolaboratif nasional Novo Club Batch 4 (ParagonCorp).

============================================================
PENDIDIKAN
============================================================
STT Wastukancana Purwakarta                               2025 – Sekarang
S1 Teknik Informatika | IPK: Aktif
- Fokus Pembelajaran: Algoritma & Struktur Data, Jaringan Komputer, Pemrograman Web Modern, Arsitektur Perangkat Lunak.

SMAN 1 Bungursari Purwakarta                              Lulus 2025
Peminatan Matematika & Ilmu Pengetahuan Alam (MIPA)
- Aktif dalam kepemimpinan legislatif siswa (Ketua Komisi A MPK) dan kesiapsiagaan medis (Ketua Regu PMR).

============================================================
PENGHARGAAN & PRESTASI NASIONAL
============================================================
Juara 1 Nasional — Kilat National Essay Competition (KNEC)         Juli 2026
Penyelenggara: Kilat Akademik Nusantara & Komunitas Sobat Bumi UPP
- Merancang inovasi AVO-BIO: Sistem monitoring biogas real-time berbasis mikrokontroler ESP32 telemetri MQTT dan algoritma analitik prediktif.
- Meraih Juara 1 Nasional Subtema Ketahanan Pangan dan Energi dengan apresiasi tinggi dari dewan juri terkait kelayakan implementasi.

Juara 5 Nasional — Merdeka Essay Award (MEA) Mahasiswa             Agustus 2026
Penyelenggara: Forum Cendekia Muda Indonesia (PT Forcemi Cendekia)
- Mengembangkan AVO-BIO 2.0 dengan peningkatan model analitik komputasi terapan dan dashboard pemantauan digester terintegrasi.
- Terpilih sebagai Juara 5 Nasional dalam kompetisi bergengsi tingkat mahasiswa se-Indonesia.

Top 10 Besar Nasional — Lomba Esai Online Nasional (LEON)          Juli 2026
Penyelenggara: Forum Cendekia Muda Indonesia (FORCEMI)
- Merumuskan solusi rekayasa teknologi terapan dan inovasi digital berorientasi efisiensi sistem telemetri otomatis.

Top 25 Finalis Nasional — SDGs Canvas & Essay Indonesia (SEI)      September 2026
Penyelenggara: Aksa Inovasi x Pusat Bisnis Nasional (Pusbisnas)
- Lolos seleksi ketat dan dinobatkan sebagai Top 25 Finalis Nasional dari total 455 tim dan 1.175 delegasi mahasiswa seluruh Indonesia.

============================================================
PROYEK TEKNOLOGI & REKAYASA
============================================================
AVO-BIO (v1.0 & v2.0) — Smart Biogas Telemetry & AI Monitoring     2026
Teknologi: ESP32, MQTT Protocol, IoT Sensors, Python Analytics, Next.js, Tailwind CSS
- Mengembangkan arsitektur telemetri IoT untuk membaca parameter tekanan, suhu, dan konsentrasi gas digester secara real-time (Uptime 99.4%).
- Mengimplementasikan model komputasi prediktif yang meningkatkan efisiensi pemantauan volume gas sebesar +34%.
- Dianugerahi Juara 1 Nasional KNEC 2026 dan Juara 5 Nasional MEA 2026.

PANGANARA AI — Traditional Food Heritage Intelligence             2026
Teknologi: React, TypeScript, Google Gemini AI API, Tailwind CSS, Supabase
- Membangun platform digital cerdas untuk pengenalan dan dokumentasi pangan tradisional Indonesia berbasis visi komputer & multimodal LLM.
- Mengintegrasikan antarmuka interaktif responsif dengan pencarian semantik dan basis data kuliner nusantara.

Sistem Kasir & POS Modern (Point of Sale Prototype)                2025 – 2026
Teknologi: React, TypeScript, Responsive Web Design, State Management
- Merancang antarmuka sistem kasir retail cepat dengan pencatatan transaksi otomatis, manajemen katalog, dan kalkulasi margin laba real-time.

============================================================
PENGALAMAN ORGANISASI & KEPEMIMPINAN
============================================================
GMNI (Gerakan Mahasiswa Nasional Indonesia), DPK Wastukancana      2026 – Sekarang
Wakil Ketua Bidang Sosial Politik
- Memimpin perumusan dan koordinasi program kajian isu sosial-politik serta advokasi kebijakan kemahasiswaan.
- Mengoordinasikan komunikasi lintas elemen organisasi dan memfasilitasi forum diskusi dialektis mahasiswa.

Novo Club Batch 4 — ParagonCorp (PT Paragon Technology)           2026
Group Project Completion & Student Innovator
- Menyelesaikan proyek inovasi sosial kolaboratif nasional dan program pengembangan kepemimpinan kepemudaan.

Pasundan Run 2026 (PADUKA UNPAS)                                  2026
Panitia Divisi Acara & Manajemen Operasional Lapangan
- Mengoordinasikan alur kegiatan, manajemen panggung, dan kesiapan operasional acara lari massal skala regional.

MPK (Majelis Perwakilan Kelas) SMAN 1 Bungursari                   2024 – 2025
Ketua Komisi A
- Memimpin koordinasi legislasi siswa, mengawasi pelaksanaan program kerja OSIS, dan menyerap aspirasi siswa antar-kelas.

PMR (Palang Merah Remaja) Wira SMAN 1 Bungursari                  2024 – 2025
Ketua Regu Pertolongan Pertama
- Mengoordinasikan tim medis lapangan, kesiapsiagaan penanganan darurat kecelakaan, dan manajemen operasional posko kesehatan.

============================================================
KEAHLIAN TEKNIS & KOMPETENSI
============================================================
- Bahasa Pemrograman : TypeScript, JavaScript, Python, HTML5, CSS3, SQL
- Framework & Web    : React.js, Next.js, Tailwind CSS, Vite, Node.js (Dasar)
- Hardware & IoT     : Mikrokontroler ESP32, Protokol MQTT, Telemetri Sensor Gas
- Tools & Cloud      : Git, GitHub, Supabase, Vercel, REST API, Google Gemini API
- Soft Skills        : Kepemimpinan Organisasi, Analisis Kritis, Komunikasi Publik, Manajemen Proyek, Kolaborasi Tim
`;

  const handleCopyAtsText = () => {
    navigator.clipboard.writeText(rawAtsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[94vh] flex flex-col text-left print:max-w-none print:shadow-none print:border-none print:rounded-none print:m-0 print:max-h-none print:h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 sticky top-0 z-10 bg-white/95 backdrop-blur-xs print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-neutral-900 tracking-tight flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Curriculum Vitae</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              ATS-Friendly Single Column
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAtsText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
              title="Salin teks polos terstruktur untuk form lamaran"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Teks ATS'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-xs"
              title="Cetak langsung atau simpan sebagai PDF A4"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Simpan PDF / Cetak</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors ml-1"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ATS Document Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-7 bg-white font-sans text-neutral-900 leading-normal print:p-0 print:space-y-5 print:overflow-visible cv-document-canvas">
          
          {/* Header Section */}
          <div className="text-center border-b-2 border-neutral-900 pb-5 cv-section break-inside-avoid">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 font-sans">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-neutral-700 mt-1">
              Mahasiswa S1 Teknik Informatika &middot; IoT Telemetry, AI Systems &amp; Full-Stack Development
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-neutral-600 mt-2.5 font-mono">
              <span>Purwakarta, Jawa Barat, Indonesia</span>
              <span>&bull;</span>
              <a href={`tel:${waNum}`} className="hover:text-blue-600 hover:underline">{waDisp || '081902716562'}</a>
              <span>&bull;</span>
              <a href={`mailto:${email}`} className="hover:text-blue-600 hover:underline">{email || 'faridnadir24@gmail.com'}</a>
              <span>&bull;</span>
              <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
                LinkedIn
              </a>
              <span>&bull;</span>
              <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
                GitHub
              </a>
            </div>
          </div>

          {/* Section: Ringkasan Profesional */}
          <div className="space-y-2 cv-section break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-1">
              Ringkasan Profesional
            </h2>
            <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed text-justify">
              Mahasiswa S1 Teknik Informatika di STT Wastukancana Purwakarta dengan fokus kompetensi pada pengembangan sistem kecerdasan buatan (AI), telemetri IoT, dan aplikasi web modern. Memiliki rekam jejak riset dan inovasi yang terbukti dengan raihan berbagai penghargaan kompetisi karya tulis ilmiah dan rekayasa teknologi tingkat nasional (Juara 1 KNEC 2026, Juara 5 MEA 2026, Top 10 LEON 2026, Top 25 Finalis SEI 2026 dari 455 tim). Berpengalaman aktif dalam kepemimpinan organisasi kemahasiswaan serta program inkubasi kepemimpinan Novo Club Batch 4 oleh ParagonCorp.
            </p>
          </div>

          {/* Section: Pendidikan */}
          <div className="space-y-2.5 cv-section">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-1">
              Pendidikan
            </h2>
            <div className="space-y-3">
              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">STT Wastukancana Purwakarta</span>
                  <span className="text-neutral-600 font-mono text-xs">2025 – Sekarang</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs text-neutral-700 italic">
                  <span>S1 Teknik Informatika</span>
                  <span>Purwakarta, Jawa Barat</span>
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  Fokus Studi: Algoritma &amp; Struktur Data, Jaringan Komputer, Pemrograman Berorientasi Objek, dan Arsitektur Komputasi Modern.
                </p>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">SMAN 1 Bungursari Purwakarta</span>
                  <span className="text-neutral-600 font-mono text-xs">2022 – 2025</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs text-neutral-700 italic">
                  <span>Peminatan Matematika &amp; Ilmu Pengetahuan Alam (MIPA)</span>
                  <span>Lulus 2025</span>
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  Aktif dalam organisasi legislatif siswa (Ketua Komisi A MPK) dan tim medis sekolah (Ketua Regu PMR).
                </p>
              </div>
            </div>
          </div>

          {/* Section: Penghargaan & Prestasi Nasional */}
          <div className="space-y-2.5 cv-section">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-1">
              Penghargaan &amp; Prestasi Nasional
            </h2>
            <div className="space-y-3">
              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">
                    Juara 1 Nasional — Kilat National Essay Competition (KNEC) 2026
                  </span>
                  <span className="text-neutral-600 font-mono text-xs">Juli 2026</span>
                </div>
                <p className="text-xs text-neutral-700 italic">
                  Kilat Akademik Nusantara &amp; Komunitas Sobat Bumi UPP &middot; Subtema Ketahanan Pangan &amp; Energi
                </p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Merancang inovasi sistem monitoring biogas cerdas AVO-BIO berbasis sensor gas telemetri MQTT dan pemodelan AI prediktif.</li>
                  <li>Mendapatkan penilaian tertinggi dewan juri untuk relevansi metodologi dan kelayakan implementasi langsung di masyarakat.</li>
                </ul>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">
                    Juara 5 Nasional — Merdeka Essay Award (MEA) 2026
                  </span>
                  <span className="text-neutral-600 font-mono text-xs">Agustus 2026</span>
                </div>
                <p className="text-xs text-neutral-700 italic">
                  Forum Cendekia Muda Indonesia (PT Forcemi Cendekia) &middot; Kategori Mahasiswa Nasional
                </p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Mengembangkan evolusi sistem AVO-BIO 2.0 dengan integrasi dashboard analitik terpadu dan optimasi sensor multiparameter.</li>
                  <li>Terpilih sebagai salah satu pemenang terbaik nasional dari puluhan universitas se-Indonesia.</li>
                </ul>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">
                    Top 10 Besar Nasional — Lomba Esai Online Nasional (LEON) 2026
                  </span>
                  <span className="text-neutral-600 font-mono text-xs">Juli 2026</span>
                </div>
                <p className="text-xs text-neutral-700 italic">
                  Forum Cendekia Muda Indonesia (FORCEMI) &middot; Subtema Aplikasi &amp; Rekayasa Teknologi
                </p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Menyusun rancangan gagasan komputasi terapan untuk otomasi monitoring sistem lingkungan berbasis mikrokontroler.</li>
                </ul>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">
                    Top 25 Finalis Nasional — SDGs Canvas &amp; Essay Indonesia (SEI) 2026
                  </span>
                  <span className="text-neutral-600 font-mono text-xs">September 2026</span>
                </div>
                <p className="text-xs text-neutral-700 italic">
                  Aksa Inovasi x Pusat Bisnis Nasional (Pusbisnas) &middot; Top 25 dari 455 Tim &amp; 1.175 Delegasi
                </p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Lolos seleksi komprehensif gagasan berkelanjutan tingkat nasional mewakili STT Wastukancana Purwakarta.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Proyek Teknologi & Rekayasa */}
          <div className="space-y-2.5 cv-section">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-1">
              Proyek Teknologi &amp; Rekayasa
            </h2>
            <div className="space-y-3">
              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">
                    AVO-BIO — Smart Biogas Telemetry &amp; Predictive Monitoring (v1.0 &amp; 2.0)
                  </span>
                  <span className="text-neutral-600 font-mono text-xs">2026</span>
                </div>
                <p className="text-xs text-neutral-600 font-mono">
                  Stack: Mikrokontroler ESP32, Protokol MQTT, IoT Telemetry, Python Analytics, Next.js, Tailwind CSS
                </p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Merancang sistem pembacaan telemetri sensor gas digester secara real-time dengan pencapaian uptime 99.4%.</li>
                  <li>Mengintegrasikan model analitik prediksi produksi biogas yang meningkatkan efisiensi pemantauan hingga +34%.</li>
                  <li>Menghasilkan dua penghargaan nasional (Juara 1 KNEC 2026 dan Juara 5 MEA 2026).</li>
                </ul>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">
                    PANGANARA AI — Traditional Food Heritage Intelligence Platform
                  </span>
                  <span className="text-neutral-600 font-mono text-xs">2026</span>
                </div>
                <p className="text-xs text-neutral-600 font-mono">
                  Stack: React, TypeScript, Google Gemini Multimodal API, Tailwind CSS, Supabase
                </p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Membangun platform AI interaktif untuk katalogisasi cerdas, pengenalan citra bahan pangan, dan pelestarian kuliner tradisional nusantara.</li>
                  <li>Mengimplementasikan prompt engineering multimodal terstruktur untuk analisis nilai gizi dan rekomendasi resep autentik.</li>
                </ul>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">
                    Sistem Kasir &amp; POS Modern (Point of Sale Interface)
                  </span>
                  <span className="text-neutral-600 font-mono text-xs">2025 – 2026</span>
                </div>
                <p className="text-xs text-neutral-600 font-mono">
                  Stack: React, TypeScript, State Management, Responsive Web Design
                </p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Mengembangkan antarmuka kasir cepat untuk pencatatan transaksi retail terstruktur, manajemen inventaris, dan kalkulasi margin laba otomatis.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Pengalaman Kepemimpinan & Organisasi */}
          <div className="space-y-2.5 cv-section">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-1">
              Pengalaman Kepemimpinan &amp; Organisasi
            </h2>
            <div className="space-y-3">
              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">GMNI (Gerakan Mahasiswa Nasional Indonesia), DPK Wastukancana</span>
                  <span className="text-neutral-600 font-mono text-xs">2026 – Sekarang</span>
                </div>
                <p className="text-xs text-neutral-700 italic">Wakil Ketua Bidang Sosial Politik</p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Memimpin perumusan program kajian kebijakan publik, advokasi kemahasiswaan, dan koordinasi struktural internal.</li>
                  <li>Memfasilitasi forum diskusi dialektis serta membangun jejaring kolaborasi antarmahasiswa lintas jurusan.</li>
                </ul>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">Novo Club Batch 4 — ParagonCorp (PT Paragon Technology and Innovation)</span>
                  <span className="text-neutral-600 font-mono text-xs">2026</span>
                </div>
                <p className="text-xs text-neutral-700 italic">Group Project Completion &amp; Student Leader</p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Menyelesaikan program intensif pengembangan kepemimpinan, inovasi sosial, dan manajemen proyek kolaboratif skala nasional.</li>
                </ul>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">Pasundan Run 2026 (PADUKA UNPAS)</span>
                  <span className="text-neutral-600 font-mono text-xs">2026</span>
                </div>
                <p className="text-xs text-neutral-700 italic">Panitia Divisi Acara &middot; Manajemen Operasional Lapangan</p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Mengoordinasikan alur kegiatan, manajemen panggung, dan kesiapan operasional acara lari massal skala regional.</li>
                </ul>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">MPK (Majelis Perwakilan Kelas) SMAN 1 Bungursari</span>
                  <span className="text-neutral-600 font-mono text-xs">2024 – 2025</span>
                </div>
                <p className="text-xs text-neutral-700 italic">Ketua Komisi A</p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Mengawasi realisasi program kerja organisasi siswa dan memimpin koordinasi regulasi antar-perwakilan kelas.</li>
                </ul>
              </div>

              <div className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                  <span className="font-bold text-neutral-900">PMR (Palang Merah Remaja) Wira SMAN 1 Bungursari</span>
                  <span className="text-neutral-600 font-mono text-xs">2024 – 2025</span>
                </div>
                <p className="text-xs text-neutral-700 italic">Ketua Regu Pertolongan Pertama</p>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                  <li>Mengoordinasikan tim medis pertolongan pertama, kesiapsiagaan tanggap darurat, dan logistik UKS.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Keahlian Teknis & Kompetensi */}
          <div className="space-y-2 cv-section break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-1">
              Keahlian Teknis &amp; Kompetensi
            </h2>
            <div className="text-xs sm:text-[13px] text-neutral-800 space-y-1.5 leading-relaxed">
              <p>
                <strong className="font-semibold text-neutral-900">Bahasa Pemrograman:</strong> TypeScript, JavaScript, Python, HTML5, CSS3, SQL (Dasar)
              </p>
              <p>
                <strong className="font-semibold text-neutral-900">Framework &amp; Frontend:</strong> React.js, Next.js, Tailwind CSS, Vite, Node.js (Dasar)
              </p>
              <p>
                <strong className="font-semibold text-neutral-900">Hardware &amp; IoT:</strong> Mikrokontroler ESP32, Protokol MQTT, Telemetri Sensor Gas (MQ Series, Sensor Tekanan)
              </p>
              <p>
                <strong className="font-semibold text-neutral-900">Alat &amp; Platform:</strong> Git, GitHub, Supabase, Vercel, REST API, Google Gemini API
              </p>
              <p>
                <strong className="font-semibold text-neutral-900">Kompetensi Manajerial:</strong> Kepemimpinan Organisasi, Perumusan Karya Ilmiah, Komunikasi Publik, Manajemen Event, Problem Solving
              </p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer (Hidden on print) */}
        <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 print:hidden">
          <span className="font-mono">Format A4 Standar ATS &middot; Optimal untuk Scanner HRD</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-neutral-700 hover:bg-neutral-200 transition-colors font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
