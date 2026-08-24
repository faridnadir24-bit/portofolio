import React from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  Users, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Disiplin & Tanggung Jawab',
      description: 'Menjaga komitmen ketepatan waktu, kualitas kode teruji, dan integritas penyelesaian target.',
      badge: 'Work Ethics',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-100 text-blue-700',
    },
    {
      icon: BrainCircuit,
      title: 'Sistem Terapan & AI',
      description: 'Mengolah data telemetri sensor menjadi model prediksi cerdas dan otomasi yang bermanfaat.',
      badge: 'Engineering',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBg: 'bg-indigo-100 text-indigo-700',
    },
    {
      icon: Users,
      title: 'Kepemimpinan Kolaboratif',
      description: 'Terbukti memimpin organisasi mahasiswa dan legislasi siswa dengan koordinasi terarah.',
      badge: 'Leadership',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <section id="tentang" className="py-24 relative border-b border-slate-200/80 bg-slate-50/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest mb-3">
            [ 01 • ABOUT & BACKGROUND ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
            Engineering with <br />
            <span className="text-slate-500 font-light">Purpose & Discipline.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Mahasiswa Teknik Informatika STT Wastukancana yang berdedikasi menciptakan sistem komputasi berdaya guna tinggi di persimpangan AI, IoT, dan platform digital.
          </p>
        </div>

        {/* Bento Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start mb-12">
          
          {/* Main Narrative Card (7 cols) */}
          <div className="md:col-span-7 bright-card rounded-3xl p-6 sm:p-8 space-y-5 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Profil & Dedikasi Riset
            </h3>
            
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              {PERSONAL_INFO.bio}
            </p>

            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Karakter kerja saya ditempa oleh kedisiplinan dan tanggung jawab kepemimpinan. Dipercaya menjabat sebagai <strong className="text-slate-900">Wakil Ketua Bidang Sosial Politik GMNI Wastukancana Purwakarta</strong> (2026–Sekarang), <strong className="text-slate-900">Ketua Komisi A MPK SMA Negeri 1 Bungursari</strong>, serta <strong className="text-slate-900">Ketua Regu PMR</strong>, membekali saya dengan integritas tata kelola, manajemen waktu, dan problem-solving yang sistematis.
            </p>

            {/* Quote Block */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border-l-4 border-indigo-600 text-xs sm:text-sm text-indigo-950 font-sans italic">
              "Teknologi terbaik bukan hanya tentang kode yang rumit, tetapi sistem yang handal, akuntabel, dan berdampak nyata bagi masyarakat."
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-sans">
                  Juara 1 Nasional KNEC 2026 (Ketahanan Pangan & Energi - AVO-BIO).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-sans">
                  Top 10 Besar Nasional LEON 2026 (Rekayasa Teknologi - FORCEMI).
                </span>
              </div>
            </div>
          </div>

          {/* Education & Overview Bento Cards (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            
            {/* Education Widget */}
            <div className="bright-card rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900">STT Wastukancana</h4>
                  <p className="text-xs font-mono text-slate-500">S1 Teknik Informatika • 2025 - Sekarang</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs font-mono text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900">Purwakarta, Jawa Barat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Major Focus:</span>
                  <span className="font-semibold text-indigo-600">Applied AI, IoT & Systems</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic Status:</span>
                  <span className="text-emerald-700 font-bold">Active Student</span>
                </div>
              </div>
            </div>

            {/* High School Widget */}
            <div className="bright-card rounded-3xl p-6 sm:p-7 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">SMAN 1 Bungursari</h4>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">IPA • 2025</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pendidikan sains eksakta & kepemimpinan organisasi legislasi siswa (MPK) dan tim medis lapangan (PMR).
              </p>
            </div>

            {/* Organization Widget */}
            <div className="bright-card rounded-3xl p-6 sm:p-7 space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-mono font-bold text-slate-900 uppercase">Organisasi Aktif</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">GMNI Wastukancana & NOVO Club</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wakil Ketua Bidang Sosial Politik GMNI Wastukancana Purwakarta & kontributor kegiatan eksternal pemuda di NOVO Club.
              </p>
            </div>

          </div>

        </div>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="bright-card rounded-3xl p-6 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${val.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${val.color}`}>
                      {val.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-slate-900">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-sans">
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
