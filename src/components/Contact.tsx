import React, { useState } from 'react';
import { Mail, Send, ArrowUpRight, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', subject: '', message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);
  const [submitAttempts, setSubmitAttempts] = useState<number>(0);
  const [formLoadTime] = useState<number>(Date.now());

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setIsCopiedEmail(true);
    setTimeout(() => setIsCopiedEmail(false), 2500);
  };

  const sanitizeInput = (text: string): string => {
    return text
      .replace(/<[^>]*>/gi, '')
      .replace(/javascript\s*:/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/data\s*:\s*text\/html/gi, '')
      .replace(/&#?x?[0-9a-f]+;/gi, '')
      .replace(/\0/g, '')
      .trim()
      .slice(0, 2000);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.length > 0) return;
    if (Date.now() - formLoadTime < 3000) {
      setSubmitFeedback('Mohon isi formulir dengan wajar.');
      return;
    }
    const now = Date.now();
    const cooldown = Math.min(4000 * Math.pow(2, Math.max(0, submitAttempts - 1)), 60000);
    if (now - lastSubmitTime < cooldown) {
      const remainSec = Math.ceil((cooldown - (now - lastSubmitTime)) / 1000);
      setSubmitFeedback(`Tunggu ${remainSec} detik sebelum mengirim lagi.`);
      return;
    }
    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanSubject = sanitizeInput(formData.subject);
    const cleanMessage = sanitizeInput(formData.message);
    if (!cleanName || !cleanEmail || !cleanMessage) {
      setSubmitFeedback('Lengkapi formulir dengan teks yang valid.');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setSubmitFeedback('Format email tidak valid.');
      return;
    }
    setLastSubmitTime(now);
    setSubmitAttempts(prev => prev + 1);

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(cleanSubject || 'Pesan dari Portofolio')}&body=${encodeURIComponent(
      `Halo Farid Nadir,\n\nNama: ${cleanName}\nEmail: ${cleanEmail}\n\nPesan:\n${cleanMessage}`
    )}`;
    setSubmitFeedback('Membuka email client...');
    setTimeout(() => { window.location.href = mailtoUrl; }, 600);
  };

  return (
    <section id="kontak" className="py-24 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">

        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Mari terhubung
          </h2>
          <p className="text-base text-neutral-500 mt-3">
            Terbuka untuk kolaborasi riset, kompetisi inovasi, dan kesempatan magang teknologi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left: direct channels */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Email</h3>
              <div className="flex items-center gap-3">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-base font-semibold text-neutral-900 hover:text-blue-600 transition-colors break-all">
                  {PERSONAL_INFO.email}
                </a>
                <button onClick={handleCopyEmail} className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors" title="Salin">
                  {isCopiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {isCopiedEmail && <p className="text-xs text-emerald-600 mt-1">Disalin!</p>}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">WhatsApp</h3>
              <a
                href={`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encodeURIComponent('Halo Farid Nadir, saya melihat portofolio Anda dan ingin berdiskusi.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-neutral-900 hover:text-blue-600 transition-colors"
              >
                <span>{PERSONAL_INFO.whatsappDisplay}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </a>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Profil</h3>
              <div className="flex gap-4">
                <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-600 hover:text-blue-600 transition-colors">LinkedIn ↗</a>
                <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-600 hover:text-blue-600 transition-colors">GitHub ↗</a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="hidden" aria-hidden="true">
              <input type="text" name="_hp" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-name" className="text-xs font-medium text-neutral-500 block mb-1.5">Nama</label>
                <input id="c-name" type="text" required maxLength={100} autoComplete="name"
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="text-xs font-medium text-neutral-500 block mb-1.5">Email</label>
                <input id="c-email" type="email" required maxLength={254} autoComplete="email"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="email@domain.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="c-subject" className="text-xs font-medium text-neutral-500 block mb-1.5">Subjek</label>
              <input id="c-subject" type="text" maxLength={200} autoComplete="off"
                value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                placeholder="Kolaborasi Riset / Pertanyaan Proyek"
              />
            </div>

            <div>
              <label htmlFor="c-message" className="text-xs font-medium text-neutral-500 block mb-1.5">Pesan</label>
              <textarea id="c-message" required rows={4} maxLength={2000} autoComplete="off"
                value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
                placeholder="Tuliskan pesan Anda..."
              />
            </div>

            {submitFeedback && (
              <p className="text-sm text-blue-600">{submitFeedback}</p>
            )}

            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors active:scale-[0.98]">
              <Send className="w-4 h-4" />
              <span>Kirim Pesan</span>
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};
