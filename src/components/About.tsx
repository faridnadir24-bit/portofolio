import React from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  Users, 
  Award, 
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Disiplin & Tanggung Jawab',
      description: 'Menjaga komitmen ketepatan waktu, kualitas kode teruji, dan integritas penyelesaian target.',
      badge: 'Work Ethics',
    },
    {
      icon: BrainCircuit,
      title: 'Sistem Terapan & AI',
      description: 'Mengolah data telemetri sensor menjadi model prediksi cerdas dan otomasi yang bermanfaat.',
      badge: 'Engineering',
    },
    {
      icon: Users,
      title: 'Kepemimpinan Kolaboratif',
      description: 'Terbukti memimpin organisasi mahasiswa dan legislasi siswa dengan koordinasi terarah.',
      badge: 'Leadership',
    },
  ];

  return (
    <section id="tentang" className="py-24 relative border-b border-white/5 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3">
            [ 01 • ABOUT & BACKGROUND ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Engineering with <br />
            <span className="text-stone-400 font-light">Purpose & Discipline.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
            Mahasiswa Teknik Informatika STT Wastukancana yang berdedikasi menciptakan sistem komputasi berdaya guna tinggi di persimpangan AI, IoT, dan platform digital.
          </p>
        </div>

        {/* Bento Story Grid (Benjamin Creative Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start mb-12">
          
          {/* Main Narrative Card (7 cols) */}
          <div className="md:col-span-7 dark-card rounded-3xl p-6 sm:p-8 space-y-5 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Profil & Dedikasi Riset
            </h3>
            
            <p className="text-sm text-stone-300 leading-relaxed font-sans">
              {PERSONAL_INFO.bio}
            </p>

            <p className="text-sm text-stone-300 leading-relaxed font-sans">
              Karakter kerja saya ditempa oleh kedisiplinan dan tanggung jawab kepemimpinan. Dipercaya menjabat sebagai <strong className="text-white">Wakil Ketua Bidang Sosial Politik GMNI Wastukancana Purwakarta</strong> (2026–Sekarang), <strong className="text-white">Ketua Komisi A MPK SMA Negeri 1 Bungursari</strong>, serta <strong className="text-white">Ketua Regu PMR</strong>, membekali saya dengan integritas tata kelola, manajemen waktu, dan problem-solving yang sistematis.
            </p>

            {/* Quote Block */}
            <div className="p-4 rounded-2xl bg-[#161616] border-l-2 border-white text-xs sm:text-sm text-stone-200 font-mono italic">
              "Teknologi terbaik bukan hanya tentang kode yang rumit, tetapi sistem yang handal, akuntabel, dan berdampak nyata bagi masyarakat."
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-stone-300 font-sans">
                  Juara 1 Nasional KNEC 2026 (Ketahanan Pangan & Energi - AVO-BIO).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-stone-300 font-sans">
                  Top 10 Besar Nasional LEON 2026 (Rekayasa Teknologi - FORCEMI).
                </span>
              </div>
            </div>
          </div>

          {/* Education & Overview Bento Cards (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            
            {/* Education Widget */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">STT Wastukancana</h4>
                  <p className="text-xs font-mono text-stone-400">S1 Teknik Informatika • 2025 - Sekarang</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-2 text-xs font-mono text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-400">Location:</span>
                  <span className="text-white">Purwakarta, Jawa Barat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Major Focus:</span>
                  <span className="text-white">Applied AI, IoT & Systems</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Academic Status:</span>
                  <span className="text-emerald-400">Active Student</span>
                </div>
              </div>
            </div>

            {/* High School Widget */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white">SMAN 1 Bungursari</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-stone-400">IPA • 2025</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Pendidikan sains eksakta & kepemimpinan organisasi legislasi siswa (MPK) dan tim medis lapangan (PMR).
              </p>
            </div>

            {/* Organization Widget */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-stone-400" />
                <span className="text-xs font-mono font-bold text-white uppercase">Organisasi Aktif</span>
              </div>
              <h4 className="font-bold text-sm text-white">GMNI Wastukancana & NOVO Club</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Wakil Ketua Bidang Sosial Politik GMNI Wastukancana Purwakarta & kontributor program pengembangan diri pemuda di NOVO Club.
              </p>
            </div>

          </div>

        </div>

        {/* 3 Core Values (Benjamin Creative Dark Bento Triple) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="dark-card rounded-3xl p-6 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-stone-400 border border-white/10">
                      {val.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-white">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed font-sans">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
