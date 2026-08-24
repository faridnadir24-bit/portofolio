import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  MessageSquare, 
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Security honeypot trap to capture malicious automated spambots
  const [honeypot, setHoneypot] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setIsCopiedEmail(true);
    setTimeout(() => setIsCopiedEmail(false), 2500);
  };

  // Sanitize input to prevent XSS / malicious code injection
  const sanitizeInput = (text: string): string => {
    return text.replace(/[<>]/g, '').trim();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Security Bot Trap Check (Honeypot)
    if (honeypot.length > 0) {
      console.warn('Bot submission blocked.');
      return;
    }

    // 2. Client-side Rate Limiting (Prevent spam flooding)
    const now = Date.now();
    if (now - lastSubmitTime < 4000) {
      setSubmitFeedback('Mohon tunggu beberapa detik sebelum mengirim pesan kembali.');
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanSubject = sanitizeInput(formData.subject);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setSubmitFeedback('Mohon lengkapi formulir dengan teks yang valid.');
      return;
    }

    setLastSubmitTime(now);

    // Prepare direct mailto link as secure fallback
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(cleanSubject || 'Pesan Kolaborasi Portofolio')}&body=${encodeURIComponent(
      `Halo Farid Nadir,\n\nNama: ${cleanName}\nEmail: ${cleanEmail}\n\nPesan:\n${cleanMessage}`
    )}`;

    setIsSubmitted(true);
    setSubmitFeedback('Pesan siap dikirim! Membuka aplikasi email Anda...');
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Halo Farid Nadir Amrulloh, saya melihat landing page portfolio Anda dan ingin berdiskusi mengenai kolaborasi / proyek.`
    );
    return `https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="kontak" className="py-20 bg-white/70 border-t border-stone-200/60 relative">
      
      {/* Background Orbs */}
      <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full orb-glow-periwinkle pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full orb-glow-lavender pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C7CE0]/10 text-[#6C7CE0] border border-[#6C7CE0]/20 mb-3">
            <span className="text-xs font-mono font-medium tracking-wider uppercase">05 • Hubungi & Terhubung</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2A3C] tracking-tight">
            Mari <span className="font-serif-italic font-normal text-[#6C7CE0]">Berdiskusi & Berkolaborasi</span>
          </h2>
          <p className="text-base text-[#5A5A72] mt-3 leading-relaxed">
            Terbuka untuk kesempatan magang teknologi, riset sistem kecerdasan buatan & IoT, kompetisi inovasi, serta diskusi proyek perangkat lunak.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4 text-left">
            
            {/* Email Card with Quick Copy */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs card-hover-lift">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#6C7CE0]/10 flex items-center justify-center text-[#6C7CE0]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#6A6A82] block">Email Resmi</span>
                    <a 
                      href={`mailto:${PERSONAL_INFO.email}`} 
                      className="font-serif font-bold text-base text-[#2A2A3C] hover:text-[#6C7CE0] transition-colors break-all"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl text-stone-500 hover:text-[#6C7CE0] hover:bg-[#6C7CE0]/10 transition-colors"
                  title="Salin Email"
                >
                  {isCopiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {isCopiedEmail && (
                <p className="text-[11px] font-mono text-emerald-600 mt-2">✓ Alamat email berhasil disalin!</p>
              )}
            </div>

            {/* WhatsApp Direct Link Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs card-hover-lift">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#6A6A82] block">WhatsApp / Chat</span>
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif font-bold text-base text-[#2A2A3C] hover:text-emerald-600 transition-colors"
                    >
                      {PERSONAL_INFO.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <a
                  id="whatsapp-direct-btn"
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-2xs"
                >
                  <span>Chat Langsung</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#B48CE0]/15 flex items-center justify-center text-[#8452B8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#6A6A82] block">Domisili & Kampus</span>
                  <span className="font-serif font-bold text-base text-[#2A2A3C]">
                    Purwakarta, Jawa Barat
                  </span>
                  <p className="text-xs text-[#5A5A72] mt-0.5">STT Wastukancana (WIB / UTC+7)</p>
                </div>
              </div>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                id="social-linkedin-btn"
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs hover:border-[#6C7CE0] hover:shadow-xs flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                  <span className="text-xs font-semibold text-[#2A2A3C] group-hover:text-[#6C7CE0]">LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#6C7CE0]" />
              </a>

              <a
                id="social-github-btn"
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs hover:border-[#6C7CE0] hover:shadow-xs flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-[#2A2A3C]" />
                  <span className="text-xs font-semibold text-[#2A2A3C] group-hover:text-[#6C7CE0]">GitHub</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#6C7CE0]" />
              </a>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm text-left">
            <h3 className="font-serif font-bold text-xl text-[#2A2A3C]">
              Kirim Pesan Langsung
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5A72] mt-1 mb-6">
              Silakan isi formulir di bawah ini, saya akan merespon sesegera mungkin.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Invisible Honeypot Field for Bot Detection */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="_gotcha_honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono font-medium text-[#4A4A62] block">
                    Nama Anda *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso / Tim Recruiter"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C7CE0]/40 focus:border-[#6C7CE0] transition-colors text-[#2A2A3C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono font-medium text-[#4A4A62] block">
                    Alamat Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="email@instansi.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C7CE0]/40 focus:border-[#6C7CE0] transition-colors text-[#2A2A3C]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-mono font-medium text-[#4A4A62] block">
                  Subjek / Topik Diskusi
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Contoh: Undangan Diskusi Proyek AVO-BIO / Kesempatan Magang"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C7CE0]/40 focus:border-[#6C7CE0] transition-colors text-[#2A2A3C]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono font-medium text-[#4A4A62] block">
                  Pesan Anda *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tuliskan rincian pesan, pertanyaan, atau tawaran kolaborasi Anda di sini..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C7CE0]/40 focus:border-[#6C7CE0] transition-colors text-[#2A2A3C] resize-none"
                />
              </div>

              {submitFeedback && (
                <div className="p-3 rounded-xl bg-[#6C7CE0]/10 border border-[#6C7CE0]/30 text-xs text-[#5161C5] font-medium">
                  {submitFeedback}
                </div>
              )}

              <button
                id="submit-contact-form-btn"
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold bg-[#6C7CE0] text-white hover:bg-[#5868CA] shadow-sm hover:shadow-md transition-all duration-200 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan Sekarang</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
