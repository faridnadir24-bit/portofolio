import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Users, 
  MapPin, 
  Cpu, 
  Activity, 
  CheckCircle2,
  Terminal,
  Github,
  ExternalLink,
  Code2,
  GitCommit
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useScrollReveal, getStaggerDelay } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';
import { AnimatedCounter } from './AnimatedCounter';

export const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  // Deterministic mock contribution grid (52 weeks x 4 rows mini matrix)
  const contributionLevels = [
    1, 2, 0, 3, 2, 4, 1, 0, 2, 3, 1, 4, 3, 2, 1, 0, 3, 4, 2, 1, 3, 0, 2, 4,
    2, 3, 1, 0, 4, 2, 3, 1, 2, 4, 3, 0, 1, 3, 2, 4, 1, 2, 0, 3, 4, 2, 1, 3
  ];

  return (
    <section id="tentang" ref={ref} className={`py-24 section-alt reveal-section ${isVisible ? 'in-view' : ''}`}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">
        
        {/* Section Header */}
        <div className={`mb-12 reveal-item ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              Profil &amp; Rekam Jejak
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Tentang Saya
          </h2>
          <p className="text-base text-neutral-500 dark:text-neutral-400 mt-2 max-w-xl">
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
                <span className="text-[11px] font-mono font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  01 / Profil &amp; Filosofi
                </span>
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                  STT Wastukancana
                </span>
              </div>

              <div className="space-y-3.5 text-neutral-600 dark:text-neutral-300 text-[15px] leading-relaxed">
                <p>
                  Saya mahasiswa Teknik Informatika di <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">STT Wastukancana Purwakarta</strong>, aktif dalam riset terapan, kegiatan organisasi kemahasiswaan, dan rekayasa perangkat lunak modern. Saat ini saya dipercaya sebagai <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">Wakil Ketua Bidang Sosial Politik GMNI Wastukancana</strong>.
                </p>
                <p>
                  Karakter kerja dan kedisiplinan saya dibentuk sejak SMA melalui tanggung jawab legislasi siswa sebagai <span className="text-neutral-800 dark:text-neutral-200 font-medium">Ketua Komisi A MPK</span> serta koordinasi tim medis tanggap darurat lapangan sebagai <span className="text-neutral-800 dark:text-neutral-200 font-medium">Ketua Regu PMR Wira SMAN 1 Bungursari</span>.
                </p>
                <p>
                  Fokus pengembangan saya terarah pada sistem yang solutif: mulai dari arsitektur telemetri sensor gas biogas hingga platform multimodal AI untuk konservasi kuliner nusantara.
                </p>
              </div>
            </div>

            {/* Editorial Quote */}
            <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-start gap-3">
              <span className="text-2xl text-blue-600 dark:text-blue-400 leading-none select-none font-serif">&ldquo;</span>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 italic leading-relaxed">
                Teknologi terbaik bukan tentang baris kode yang rumit, melainkan sistem yang andal, akuntabel, dan berdampak langsung bagi masyarakat.
              </p>
            </div>
          </SpotlightCard>

          {/* Bento Box 2: Location & Engineering Principles (1 column) */}
          <SpotlightCard
            className={`bento-card p-7 flex flex-col justify-between reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '250ms' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  02 / Wilayah &amp; Prinsip Rekayasa
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>

              {/* Status info card */}
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 text-left space-y-2">
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-xs font-medium font-mono">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>Purwakarta, Jawa Barat, ID</span>
                </div>
                <div className="inline-flex items-center gap-2 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-md border border-emerald-200/70 dark:border-emerald-800 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Terbuka untuk Magang &amp; Riset</span>
                </div>
              </div>

              {/* Core Engineering Principles */}
              <div className="space-y-2.5 pt-1 text-xs">
                <p className="text-[11px] font-mono font-semibold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                  Prinsip Sistem
                </p>
                <div className="p-2.5 rounded-lg bg-neutral-50/60 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 font-semibold text-[11px] font-mono">
                    <span className="text-blue-600 dark:text-blue-400">01.</span>
                    <span>Edge-First Telemetry</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                    Filter noise dan validasi sinyal di level mikrokontroler sebelum transmisi cloud.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-neutral-50/60 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 font-semibold text-[11px] font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400">02.</span>
                    <span>Event-Driven &amp; Lightweight</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                    Protokol MQTT QoS 1 untuk latensi di bawah 100ms dan efisiensi bandwidth.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 font-mono">
              <span>Status Kesiapan</span>
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">Siap Berkontribusi</span>
            </div>
          </SpotlightCard>

          {/* Bento Box 3: Metric Stats Counter (Spans all 3 columns) */}
          <SpotlightCard
            className={`bento-card p-6 sm:p-7 md:col-span-3 reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '350ms' }}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-mono font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                03 / Rekam Jejak Terukur
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Piagam Resmi Terverifikasi</span>
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Stat 1: KNEC Juara 1 */}
              <div className="p-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase font-mono">KNEC 2026</span>
                  <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tracking-tight">
                  <span className="text-amber-600 dark:text-amber-500 font-sans text-xl mr-0.5">#</span>
                  <AnimatedCounter target={1} />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Juara 1 Nasional Ketahanan Pangan &amp; Energi
                </p>
              </div>

              {/* Stat 2: SENADA Juara 3 */}
              <div className="p-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase font-mono">SENADA 2026</span>
                  <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tracking-tight">
                  <span className="text-blue-600 dark:text-blue-400 font-sans text-xl mr-0.5">#</span>
                  <AnimatedCounter target={3} />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Juara 3 Nasional Artificial Intelligence (AI)
                </p>
              </div>

              {/* Stat 3: MEA Juara 5 */}
              <div className="p-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase font-mono">MEA 2026</span>
                  <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tracking-tight">
                  <span className="text-emerald-600 dark:text-emerald-400 font-sans text-xl mr-0.5">#</span>
                  <AnimatedCounter target={5} />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Juara 5 Nasional Merdeka Essay Award
                </p>
              </div>

              {/* Stat 4 */}
              <div className="p-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase font-mono">AVO-BIO IoT</span>
                  <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tracking-tight">
                  <AnimatedCounter target={99.4} decimals={1} suffix="%" />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
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
              <span className="text-[11px] font-mono font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                04 / Pendidikan &amp; Organisasi
              </span>
              <GraduationCap className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* College */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">STT Wastukancana</span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">S1 Teknik Informatika</p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5 font-mono">2025 – Sekarang &middot; IPK Aktif</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Fokus: Algoritma, Sistem Cerdas, Jaringan, dan Pemrograman Web.
                </p>
              </div>

              {/* High School */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-neutral-500" />
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">SMAN 1 Bungursari</span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">Peminatan MIPA</p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5 font-mono">Lulus 2025</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Ketua Komisi A MPK &middot; Ketua Regu Pertolongan Pertama PMR.
                </p>
              </div>

              {/* GMNI */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">GMNI DPK Wastukancana</span>
                  <span className="text-[10px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded">Aktif</span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">Wakil Ketua Bidang Sosial Politik</p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5 font-mono">2026 – Sekarang</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Memimpin kajian isu sosial-politik dan advokasi kebijakan mahasiswa.
                </p>
              </div>

              {/* Novo Club */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Novo Club Batch 4</span>
                  <span className="text-[10px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded">Completed</span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">ParagonCorp (PT Paragon Technology)</p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5 font-mono">2026 &middot; Leadership Program</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Penyelesaian proyek kolaboratif inovasi sosial skala nasional.
                </p>
              </div>

            </div>
          </SpotlightCard>

          {/* Bento Box 5: Tech Stack & GitHub Activity Pulse (1 column) */}
          <SpotlightCard
            className={`bento-card p-7 flex flex-col justify-between reveal-item ${isVisible ? 'in-view' : ''}`}
            style={{ transitionDelay: '450ms' }}
          >
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    05 / Tech Stack
                  </span>
                  <Terminal className="w-4 h-4 text-neutral-500" />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    'ESP32 & IoT',
                    'MQTT Broker',
                    'Gemini Multimodal AI',
                    'React & Vite',
                    'TypeScript',
                    'Tailwind CSS',
                    'Python Analytics',
                    'Supabase & SQL',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/70 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors select-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live GitHub Activity Pulse */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                    <span className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">faridnadir24-bit</span>
                  </div>
                  <a
                    href="https://github.com/faridnadir24-bit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 font-mono"
                  >
                    <span>Profil</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* Contribution Heatmap Preview */}
                <div className="p-2.5 rounded-lg bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Aktif Coding &amp; CI/CD
                    </span>
                    <span>Recent Repos</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 pt-1">
                    {contributionLevels.map((lvl, idx) => {
                      const bg = 
                        lvl === 0 ? 'bg-neutral-200 dark:bg-neutral-800' :
                        lvl === 1 ? 'bg-emerald-300/80 dark:bg-emerald-900/80' :
                        lvl === 2 ? 'bg-emerald-400 dark:bg-emerald-700' :
                        lvl === 3 ? 'bg-emerald-500 dark:bg-emerald-600' :
                        'bg-emerald-600 dark:bg-emerald-500';
                      return (
                        <div
                          key={idx}
                          className={`h-2 rounded-[2px] ${bg} transition-transform hover:scale-125`}
                          title={`Aktivitas Kontribusi Minggu ${idx + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-between font-mono">
              <span>Arsitektur</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">Clean &amp; Modular</span>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
};
