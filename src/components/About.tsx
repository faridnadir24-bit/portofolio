import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Users, 
  MapPin, 
  Cpu, 
  Activity, 
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';
import { AnimatedCounter } from './AnimatedCounter';

export const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="tentang" ref={ref} className={`py-24 section-alt reveal-section ${isVisible ? 'in-view' : ''}`}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">
        
        {/* Section Header */}
        <div className={`mb-12 reveal-item ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
              Profil & Rekam Jejak
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Tentang Saya
          </h2>
          <p className="text-base text-neutral-500 mt-2 max-w-xl">
            Mahasiswa Teknik Informatika, organisatoris, dan perekayasa sistem cerdas dengan komitmen pada telemetri IoT dan solusi berbasis dampak nyata.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Bento Box 1: Story & Narrative (Spans 2 columns on desktop) */}
          <SpotlightCard
            className={`bento-card p-7 md:col-span-2 flex flex-col justify-between reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  01 / Profil &amp; Filosofi
                </span>
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200">
                  STT Wastukancana
                </span>
              </div>

              <div className="space-y-3.5 text-neutral-600 text-[15px] leading-relaxed">
                <p>
                  Saya mahasiswa Teknik Informatika di <strong className="text-neutral-900 font-semibold">STT Wastukancana Purwakarta</strong>, aktif dalam riset terapan, kegiatan organisasi kemahasiswaan, dan rekayasa perangkat lunak modern. Saat ini saya dipercaya sebagai <strong className="text-neutral-900 font-semibold">Wakil Ketua Bidang Sosial Politik GMNI Wastukancana</strong>.
                </p>
                <p>
                  Karakter kerja dan kedisiplinan saya dibentuk sejak SMA melalui tanggung jawab legislasi siswa sebagai <span className="text-neutral-800 font-medium">Ketua Komisi A MPK</span> serta koordinasi tim medis tanggap darurat lapangan sebagai <span className="text-neutral-800 font-medium">Ketua Regu PMR Wira SMAN 1 Bungursari</span>.
                </p>
                <p>
                  Fokus pengembangan saya terarah pada sistem yang solutif: mulai dari arsitektur telemetri sensor gas biogas hingga platform multimodal AI untuk konservasi kuliner nusantara.
                </p>
              </div>
            </div>

            {/* Editorial Quote */}
            <div className="mt-6 pt-5 border-t border-neutral-100 flex items-start gap-3">
              <span className="text-2xl text-blue-600 leading-none select-none font-serif">&ldquo;</span>
              <p className="text-xs sm:text-sm text-neutral-500 italic leading-relaxed">
                Teknologi terbaik bukan tentang baris kode yang rumit, melainkan sistem yang andal, akuntabel, dan berdampak langsung bagi masyarakat.
              </p>
            </div>
          </SpotlightCard>

          {/* Bento Box 2: Location & Collaboration Availability (1 column) */}
          <SpotlightCard
            className={`bento-card p-7 flex flex-col justify-between reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '250ms' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  02 / Wilayah &amp; Ketersediaan
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>

              {/* Status info card */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 text-left space-y-2.5">
                <div className="flex items-center gap-2 text-neutral-700 text-xs font-medium font-mono">
                  <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span>Purwakarta, Jawa Barat, ID</span>
                </div>
                <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/70 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Terbuka untuk Magang &amp; Riset</span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed pt-0.5">
                  Siap berkontribusi dalam proyek software engineering, telemetri sensor IoT, dan komputasi terapan.
                </p>
              </div>

              {/* Core Principles */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>Pendekatan empiris &amp; terukur</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>Kolaborasi &amp; komunikasi tim solid</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Status Kesiapan</span>
              <span className="text-neutral-900 font-medium">Siap Berkontribusi</span>
            </div>
          </SpotlightCard>

          {/* Bento Box 3: Metric Stats Counter (Spans all 3 columns) */}
          <SpotlightCard
            className={`bento-card p-6 sm:p-7 md:col-span-3 reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '350ms' }}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-mono font-medium text-neutral-500 uppercase tracking-wider">
                03 / Rekam Jejak Terukur
              </span>
              <span className="text-xs text-neutral-500 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Piagam Resmi Terverifikasi</span>
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Stat 1 */}
              <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/80 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase font-mono">KNEC 2026</span>
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
                  <span className="text-amber-600 font-sans text-xl mr-0.5">#</span>
                  <AnimatedCounter target={1} />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Juara 1 Nasional Ketahanan Pangan &amp; Energi
                </p>
              </div>

              {/* Stat 2 */}
              <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/80 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase font-mono">MEA 2026</span>
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
                  <span className="text-blue-600 font-sans text-xl mr-0.5">#</span>
                  <AnimatedCounter target={5} />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Juara 5 Nasional Merdeka Essay Award
                </p>
              </div>

              {/* Stat 3 */}
              <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/80 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase font-mono">SEI 2026</span>
                  <Users className="w-3.5 h-3.5 text-neutral-400" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
                  <AnimatedCounter target={455} />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Top 25 Finalis dari 455 Tim Se-Indonesia
                </p>
              </div>

              {/* Stat 4 */}
              <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/80 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase font-mono">AVO-BIO IoT</span>
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
                  <AnimatedCounter target={99.4} decimals={1} suffix="%" />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Uptime Sensor MQTT Real-Time
                </p>
              </div>

            </div>
          </SpotlightCard>

          {/* Bento Box 4: Education & Organization (Spans 2 columns on desktop) */}
          <SpotlightCard
            className={`bento-card p-7 md:col-span-2 reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-mono font-medium text-neutral-500 uppercase tracking-wider">
                04 / Pendidikan &amp; Organisasi
              </span>
              <GraduationCap className="w-4 h-4 text-neutral-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* College */}
              <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-neutral-900">STT Wastukancana</span>
                </div>
                <p className="text-xs text-neutral-700 font-medium">S1 Teknik Informatika</p>
                <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">2025 – Sekarang &middot; IPK Aktif</p>
                <p className="text-xs text-neutral-500 mt-2">
                  Fokus: Algoritma, Sistem Cerdas, Jaringan, dan Pemrograman Web.
                </p>
              </div>

              {/* High School */}
              <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-neutral-500" />
                  <span className="text-xs font-bold text-neutral-900">SMAN 1 Bungursari</span>
                </div>
                <p className="text-xs text-neutral-700 font-medium">Peminatan MIPA</p>
                <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">Lulus 2025</p>
                <p className="text-xs text-neutral-500 mt-2">
                  Ketua Komisi A MPK &middot; Ketua Regu Pertolongan Pertama PMR.
                </p>
              </div>

              {/* GMNI */}
              <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-900">GMNI DPK Wastukancana</span>
                  <span className="text-[10px] font-mono font-medium bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded">Aktif</span>
                </div>
                <p className="text-xs text-neutral-700 font-medium">Wakil Ketua Bidang Sosial Politik</p>
                <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">2026 – Sekarang</p>
                <p className="text-xs text-neutral-500 mt-2">
                  Memimpin kajian isu sosial-politik dan advokasi kebijakan mahasiswa.
                </p>
              </div>

              {/* Novo Club */}
              <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-900">Novo Club Batch 4</span>
                  <span className="text-[10px] font-mono font-medium bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded">Completed</span>
                </div>
                <p className="text-xs text-neutral-700 font-medium">ParagonCorp (PT Paragon Technology)</p>
                <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">2026 &middot; Leadership Program</p>
                <p className="text-xs text-neutral-500 mt-2">
                  Penyelesaian proyek kolaboratif inovasi sosial skala nasional.
                </p>
              </div>

            </div>
          </SpotlightCard>

          {/* Bento Box 5: Core Engineering Stack & Tooling (1 column) */}
          <SpotlightCard
            className={`bento-card p-7 flex flex-col justify-between reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '450ms' }}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  05 / Tech Stack
                </span>
                <Terminal className="w-4 h-4 text-neutral-500" />
              </div>

              <p className="text-xs text-neutral-500 mb-4">
                Teknologi yang digunakan dalam riset dan implementasi sistem:
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  'ESP32 & IoT',
                  'MQTT Protocol',
                  'Gemini Multimodal AI',
                  'React & Vite',
                  'TypeScript',
                  'Tailwind CSS',
                  'Python Analytics',
                  'Supabase & SQL',
                  'Git & GitHub',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200/70 hover:border-neutral-300 transition-colors select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-neutral-100 text-xs text-neutral-500 flex items-center justify-between font-mono">
              <span>Arsitektur</span>
              <span className="font-semibold text-neutral-800">Clean &amp; Modular</span>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
};
