import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  BrainCircuit, 
  Users, 
  Award, 
  Terminal, 
  CheckCircle,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Tanggung Jawab & Disiplin',
      description: 'Menjaga komitmen ketepatan waktu, kualitas kode yang dapat dipertanggungjawabkan, dan konsistensi penyelesaian proyek.',
      badge: 'Prinsip Kerja',
      color: 'from-[#6C7CE0]/15 to-[#6C7CE0]/5 text-[#5161C5]',
    },
    {
      icon: BrainCircuit,
      title: 'Sistem Berbasis Data & AI',
      description: 'Antusias mentransformasi data mentah dan telemetri sensor menjadi keputusan cerdas menggunakan pemodelan AI serta algoritma adaptif.',
      badge: 'Fokus Teknik',
      color: 'from-[#B48CE0]/15 to-[#B48CE0]/5 text-[#8452B8]',
    },
    {
      icon: Users,
      title: 'Kepemimpinan & Kolaborasi',
      description: 'Berpengalaman sebagai Ketua Komisi A MPK SMA dalam merumuskan legislasi siswa, mediasi aspirasi, dan mengarahkan tim dengan akuntabilitas.',
      badge: 'Organisasi',
      color: 'from-amber-500/15 to-amber-500/5 text-amber-700',
    },
  ];

  return (
    <section id="tentang" className="py-20 bg-white/60 border-y border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C7CE0]/10 text-[#6C7CE0] border border-[#6C7CE0]/20 mb-3">
            <span className="text-xs font-mono font-medium tracking-wider uppercase">01 • Profil & Filosofi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2A3C] tracking-tight">
            Tentang <span className="font-serif-italic font-normal text-[#6C7CE0]">Farid Nadir Amrulloh</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5A5A72] mt-3 leading-relaxed">
            Mahasiswa Teknik Informatika STT Wastukancana dengan dedikasi tinggi pada rekayasa sistem terdistribusi, kecerdasan buatan terapan, dan inovasi solutif berbasis sains teknologi.
          </p>
        </div>

        {/* Two-Column About Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4 text-left">
            <h3 className="font-serif font-bold text-xl text-[#2A2A3C] flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-[#6C7CE0]"></span>
              Dedikasi Rekayasa Perangkat Lunak & Inovasi Cerdas
            </h3>
            
            <p className="text-sm sm:text-base text-[#4A4A62] leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>

            <p className="text-sm sm:text-base text-[#4A4A62] leading-relaxed">
              Karakter saya dibentuk oleh kedisiplinan dan tanggung jawab tinggi. Berpengalaman memimpin <strong>Komisi A MPK SMA Negeri 1 Bungursari</strong> serta dipercaya sebagai <strong>Wakil Ketua Bidang Sosial Politik GMNI Wastukancana Purwakarta</strong> (Agustus 2026–Sekarang), membekali saya dengan integritas tata kelola, kepemimpinan organisasi, manajemen waktu yang ketat, serta kebiasaan berpikir terstruktur dalam menyelesaikan masalah.
            </p>

            {/* Quote Box */}
            <div className="p-4 rounded-xl bg-[#FDF9F3] border-l-3 border-[#6C7CE0] text-sm text-[#2A2A3C] font-medium italic mt-4">
              "Teknologi terbaik bukan sekadar baris kode yang elegan, melainkan sistem yang handal, dapat dipertanggungjawabkan, dan memberikan dampak nyata bagi masyarakat."
            </div>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#4A4A62]">
                  Juara 1 Nasional KNEC 2026 (Ketahanan Pangan & Energi - AVO-BIO).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#4A4A62]">
                  Top 10 Besar Nasional LEON 2026 (Aplikasi & Rekayasa Teknologi - FORCEMI).
                </span>
              </div>
            </div>
          </div>

          {/* Quick Fact / Academics Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#6C7CE0]/10 flex items-center justify-center text-[#6C7CE0]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2A2A3C]">STT Wastukancana</h4>
                  <p className="text-xs text-[#5A5A72]">Teknik Informatika • Angkatan 2025</p>
                </div>
              </div>
              
              <ul className="space-y-2.5 text-xs text-[#4A4A62] border-t border-stone-100 pt-3">
                <li className="flex items-center justify-between">
                  <span className="text-[#6A6A82]">Lokasi Kampus:</span>
                  <span className="font-medium text-[#2A2A3C]">Purwakarta, Jawa Barat</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-[#6A6A82]">Minat Utama:</span>
                  <span className="font-medium text-[#2A2A3C]">Sistem Cerdas, AI & IoT Terapan</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-[#6A6A82]">Organisasi Aktif:</span>
                  <span className="font-medium text-[#6C7CE0]">Wakil Ketua Sospol GMNI Wastukancana</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-[#6A6A82]">Status Akademik:</span>
                  <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Aktif Mahasiswa</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#6C7CE0]/8 via-[#B48CE0]/8 to-white rounded-2xl p-6 border border-[#6C7CE0]/20 shadow-xs text-left">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-[#6C7CE0]" />
                <span className="text-xs font-mono font-semibold text-[#5161C5] uppercase">Pengalaman Organisasi</span>
              </div>
              <h4 className="font-serif font-bold text-base text-[#2A2A3C]">GMNI & MPK SMA</h4>
              <p className="text-xs text-[#5A5A72] mt-1.5 leading-relaxed">
                Aktif memimpin advokasi sosial politik di GMNI Wastukancana Purwakarta serta pengalaman kepemimpinan legislasi siswa sebagai Ketua Komisi A MPK SMA Negeri 1 Bungursari.
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
                className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs card-hover-lift text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-[#5A5A72] border border-stone-200/60">
                      {val.badge}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#2A2A3C]">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5A5A72] mt-2 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-mono font-medium text-[#6C7CE0]">
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
