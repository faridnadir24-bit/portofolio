import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  ArrowUpRight
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

  const [honeypot, setHoneypot] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);
  const [submitAttempts, setSubmitAttempts] = useState<number>(0);
  const [formLoadTime] = useState<number>(Date.now());

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setIsCopiedEmail(true);
    setTimeout(() => setIsCopiedEmail(false), 2500);
  };

  // Deep sanitization: strip HTML tags, script injections, event handlers, and dangerous patterns
  const sanitizeInput = (text: string): string => {
    return text
      .replace(/<[^>]*>/gi, '')                     // Strip all HTML tags
      .replace(/javascript\s*:/gi, '')              // Remove javascript: URIs
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers (onclick=, onerror=, etc.)
      .replace(/data\s*:\s*text\/html/gi, '')       // Block data:text/html payloads
      .replace(/&#?x?[0-9a-f]+;/gi, '')            // Strip HTML entities used for encoding attacks
      .replace(/\0/g, '')                           // Remove null bytes
      .trim()
      .slice(0, 2000);                              // Hard cap at 2000 chars
  };

  // Strict email format validation (RFC 5322 simplified)
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot bot trap
    if (honeypot.length > 0) {
      console.warn('[Security] Honeypot triggered — bot submission blocked.');
      return;
    }

    // Behavioral timing check: form filled too fast → likely automated
    if (Date.now() - formLoadTime < 3000) {
      console.warn('[Security] Form submitted suspiciously fast — blocked.');
      setSubmitFeedback('Mohon isi formulir dengan wajar dan tidak terburu-buru.');
      return;
    }

    // Progressive rate limiting: 4s → 8s → 16s cooldown
    const now = Date.now();
    const cooldown = Math.min(4000 * Math.pow(2, Math.max(0, submitAttempts - 1)), 60000);
    if (now - lastSubmitTime < cooldown) {
      const remainSec = Math.ceil((cooldown - (now - lastSubmitTime)) / 1000);
      setSubmitFeedback(`Mohon tunggu ${remainSec} detik sebelum mengirim pesan kembali.`);
      return;
    }

    // Input length enforcement
    if (formData.name.length > 100 || formData.email.length > 254 || formData.subject.length > 200 || formData.message.length > 2000) {
      setSubmitFeedback('Input terlalu panjang. Mohon periksa kembali formulir Anda.');
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanSubject = sanitizeInput(formData.subject);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setSubmitFeedback('Mohon lengkapi formulir dengan teks yang valid (tanpa kode HTML/script).');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setSubmitFeedback('Format email tidak valid. Mohon masukkan alamat email yang benar.');
      return;
    }

    setLastSubmitTime(now);
    setSubmitAttempts(prev => prev + 1);

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(cleanSubject || 'Pesan Kolaborasi Portofolio')}&body=${encodeURIComponent(
      `Halo Farid Nadir,\n\nNama: ${cleanName}\nEmail: ${cleanEmail}\n\nPesan:\n${cleanMessage}`
    )}`;

    setIsSubmitted(true);
    setSubmitFeedback('Membuka email client Anda...');
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Halo Farid Nadir Amrulloh, saya melihat website portofolio Anda dan ingin berdiskusi mengenai kolaborasi / proyek.`
    );
    return `https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="kontak" className="py-24 relative border-t border-slate-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Statement Header */}
        <div className="text-left mb-16 space-y-4">
          <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest">
            [ 05 • GET IN TOUCH ]
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.95]">
            LET'S WORK <br />
            <span className="text-slate-500 font-light">TOGETHER.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Terbuka untuk kolaborasi riset kecerdasan buatan, telemetri IoT, kompetisi inovasi sains, serta kesempatan magang teknologi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Direct Channels (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            
            {/* Email Box */}
            <div className="bright-card rounded-3xl p-6 sm:p-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Direct Email</span>
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Salin Email"
                >
                  {isCopiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-lg sm:text-xl font-bold font-mono text-slate-900 hover:text-indigo-600 transition-colors block break-all"
              >
                {PERSONAL_INFO.email}
              </a>
              {isCopiedEmail && (
                <p className="text-xs font-mono text-emerald-600">✓ Alamat email disalin ke clipboard</p>
              )}
            </div>

            {/* WhatsApp Box */}
            <div className="bright-card rounded-3xl p-6 sm:p-7 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase font-semibold block">WhatsApp</span>
                <span className="text-lg font-bold font-mono text-slate-900 mt-1 block">
                  {PERSONAL_INFO.whatsappDisplay}
                </span>
              </div>

              <a
                id="whatsapp-direct-btn"
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
              >
                <span>Chat WA</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Channels */}
            <div className="grid grid-cols-2 gap-3">
              <a
                id="social-linkedin-btn"
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bright-card rounded-2xl p-4 flex items-center justify-between text-slate-800 hover:text-indigo-600 hover:border-indigo-200"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                id="social-github-btn"
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bright-card rounded-2xl p-4 flex items-center justify-between text-slate-800 hover:text-slate-900 hover:border-slate-400"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-slate-800" />
                  <span className="text-xs font-bold">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>

          </div>

          {/* Contact Message Form (7 cols) */}
          <div className="md:col-span-7 bright-card rounded-3xl p-6 sm:p-8 text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Kirim Pesan Langsung
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
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
                  <label htmlFor="contact-name" className="text-xs font-mono text-slate-600 block font-semibold">
                    NAMA *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Nama / Instansi Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-slate-600 block font-semibold">
                    EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder="nama@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-mono text-slate-600 block font-semibold">
                  SUBJEK
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  maxLength={200}
                  autoComplete="off"
                  placeholder="cth. Kolaborasi Riset / Pertanyaan Proyek"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-slate-600 block font-semibold">
                  PESAN *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  maxLength={2000}
                  autoComplete="off"
                  placeholder="Tuliskan pesan, ide proyek, atau pertanyaan Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors resize-none"
                />
              </div>

              {submitFeedback && (
                <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs font-mono text-indigo-900">
                  {submitFeedback}
                </div>
              )}

              <button
                id="submit-contact-form-btn"
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-600/25"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
