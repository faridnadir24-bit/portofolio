import React from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  Users, 
  Award, 
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Tanggung Jawab & Disiplin',
      description: 'Menjaga komitmen ketepatan waktu, kualitas kode yang dapat dipertanggungjawabkan, dan konsistensi penyelesaian proyek secara terukur.',
      badge: 'Prinsip Kerja',
    },
    {
      icon: BrainCircuit,
      title: 'Sistem Berbasis Data & AI',
      description: 'Antusias mentransformasi data telemetri sensor menjadi keputusan cerdas menggunakan pemodelan AI serta algoritma komputasi adaptif.',
      badge: 'Fokus Teknik',
    },
    {
      icon: Users,
      title: 'Kepemimpinan & Kolaborasi',
      description: 'Berpengalaman memimpin organisasi mahasiswa dan legislasi siswa dalam mediasi aspirasi, tata kelola, dan kerja sama tim yang solid.',
      badge: 'Organisasi',
    },
  ];

  return (
    <section id="tentang" className="py-20 bg-white/60 border-b border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200 mb-3">
            <span className="text-xs font-mono font-medium tracking-wider uppercase">01 • Profil & Filosofi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Tentang <span className="font-serif-italic font-normal text-stone-600">Farid Nadir Amrulloh</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
            Mahasiswa Teknik Informatika STT Wastukancana dengan dedikasi tinggi pada rekayasa sistem terdistribusi, kecerdasan buatan terapan, dan inovasi solutif berbasis sains teknologi.
          </p>
        </div>

        {/* Two-Column About Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4 text-left">
            <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-stone-900"></span>
              Dedikasi Rekayasa Perangkat Lunak & Inovasi Cerdas
            </h3>
            
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Karakter saya dibentuk oleh kedisiplinan dan tanggung jawab tinggi. Berpengalaman memimpin <strong>Komisi A MPK SMA Negeri 1 Bungursari</strong>, <strong>Ketua Regu PMR</strong>, serta dipercaya sebagai <strong>Wakil Ketua Bidang Sosial Politik GMNI Wastukancana Purwakarta</strong> (2026–Sekarang), membekali saya dengan integritas tata kelola, kepemimpinan organisasi, manajemen waktu yang ketat, serta kebiasaan berpikir terstruktur dalam menyelesaikan masalah.
            </p>

            {/* Quote Box */}
            <div className="p-4 rounded-xl bg-stone-50 border-l-2 border-stone-800 text-sm text-stone-800 font-medium italic mt-4">
              "Teknologi terbaik bukan sekadar baris kode yang elegan, melainkan sistem yang handal, dapat dipertanggungjawabkan, dan memberikan dampak nyata bagi masyarakat."
            </div>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-stone-600">
                  Juara 1 Nasional KNEC 2026 (Ketahanan Pangan & Energi - AVO-BIO).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-stone-600">
                  Top 10 Besar Nasional LEON 2026 (Aplikasi & Rekayasa Teknologi - FORCEMI).
                </span>
              </div>
            </div>
          </div>

          {/* Quick Fact / Academics Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">STT Wastukancana</h4>
                  <p className="text-xs text-stone-500">Teknik Informatika • Angkatan 2025</p>
                </div>
              </div>
              
              <ul className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <li className="flex items-center justify-between">
                  <span className="text-stone-500">Lokasi Kampus:</span>
                  <span className="font-medium text-stone-900">Purwakarta, Jawa Barat</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-stone-500">Minat Utama:</span>
                  <span className="font-medium text-stone-900">Sistem Cerdas, AI & IoT Terapan</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-stone-500">Organisasi Aktif:</span>
                  <span className="font-medium text-stone-900">Wakil Ketua Sospol GMNI Wastukancana</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-stone-500">Status Akademik:</span>
                  <span className="font-medium text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">Aktif Mahasiswa</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs text-left">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-stone-700" />
                <span className="text-xs font-mono font-semibold text-stone-700 uppercase">Pengalaman Organisasi</span>
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900">GMNI, MPK & PMR</h4>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Aktif memimpin advokasi sosial politik di GMNI Wastukancana Purwakarta, kepemimpinan komisi legislasi MPK, serta kepalangmerahan dan relawan medis PMR SMA Negeri 1 Bungursari.
              </p>
            </div>
          </div>

        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs card-hover-lift text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                      {val.badge}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-stone-900">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-mono font-medium text-stone-500">
                  <span>Pilar Karakter</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
