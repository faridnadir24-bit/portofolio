import React, { useState, useEffect } from 'react';
import { Mail, Send, ArrowUpRight, Copy, Check, ShieldCheck } from 'lucide-react';
import { ContactFormData } from '../types';
import {
  getSecureEmail,
  getSecureWhatsAppDisplay,
  getSecureWhatsAppUrl,
  validateFormSubmission,
  recordSubmission,
  checkRateLimit,
  sanitizeText,
} from '../utils/security';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', subject: '', message: '',
  });

  // Multiple realistic honeypot traps for scrapers and auto-fill bots
  const [honeypots, setHoneypots] = useState({
    user_fax_website: '',
    b_email_secondary: '',
    sys_trap_token: '',
  });

  // Dynamic Contact State (Obfuscated from static crawlers)
  const [displayEmail, setDisplayEmail] = useState<string>('Memuat kontak aman...');
  const [displayWa, setDisplayWa] = useState<string>('Memuat WhatsApp...');
  const [waUrl, setWaUrl] = useState<string>('#');

  const [formLoadTime, setFormLoadTime] = useState<number>(Date.now());
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [rateLimitCooldown, setRateLimitCooldown] = useState<number>(0);

  // Initialize runtime de-obfuscation on client mount
  useEffect(() => {
    setFormLoadTime(Date.now());
    setDisplayEmail(getSecureEmail());
    setDisplayWa(getSecureWhatsAppDisplay());
    setWaUrl(getSecureWhatsAppUrl());

    // Check rate limit state
    const limit = checkRateLimit();
    if (!limit.allowed) {
      setRateLimitCooldown(limit.remainingSeconds);
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (rateLimitCooldown <= 0) return;
    const timer = setInterval(() => {
      setRateLimitCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [rateLimitCooldown]);

  const markUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  };

  const handleCopyEmail = () => {
    const email = getSecureEmail();
    navigator.clipboard.writeText(email);
    setIsCopiedEmail(true);
    setTimeout(() => setIsCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitFeedback(null);
    setIsSuccess(false);

    // Run multi-layer security validation
    const check = validateFormSubmission({
      honeypot1: honeypots.user_fax_website,
      honeypot2: honeypots.b_email_secondary,
      honeypot3: honeypots.sys_trap_token,
      formLoadTime,
      hasUserInteracted,
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    // 1. Bot Trapped -> Silent Blackhole (Bot thinks it succeeded, but we do nothing)
    if (check.isBotSilentDrop) {
      setSubmitFeedback('Pesan Anda telah berhasil diproses.');
      setIsSuccess(true);
      return;
    }

    // 2. Human validation error
    if (!check.isValid) {
      setSubmitFeedback(check.errorMessage || 'Terjadi kesalahan pada data formulir.');
      setIsSuccess(false);
      return;
    }

    // 3. Legitimate human submission
    recordSubmission();
    setRateLimitCooldown(45);

    const cleanName = sanitizeText(formData.name);
    const cleanEmail = sanitizeText(formData.email);
    const cleanSubject = sanitizeText(formData.subject);
    const cleanMessage = sanitizeText(formData.message);
    const targetEmail = getSecureEmail();

    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
      cleanSubject || 'Pesan dari Portofolio'
    )}&body=${encodeURIComponent(
      `Halo Farid Nadir,\n\nNama: ${cleanName}\nEmail: ${cleanEmail}\n\nPesan:\n${cleanMessage}`
    )}`;

    setIsSuccess(true);
    setSubmitFeedback('Membuka email client Anda...');
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section
      id="kontak"
      className="py-24 border-t border-neutral-100"
      onMouseMove={markUserInteraction}
      onTouchStart={markUserInteraction}
      onKeyDown={markUserInteraction}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-left">

        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Formulir Terproteksi Anti-Spam</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Mari terhubung
          </h2>
          <p className="text-base text-neutral-500 mt-3">
            Terbuka untuk kolaborasi riset, kompetisi inovasi, dan kesempatan magang teknologi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left: direct channels with anti-scraping obfuscation */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Email</h3>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${displayEmail}`}
                  className="text-base font-semibold text-neutral-900 hover:text-blue-600 transition-colors break-all"
                >
                  {displayEmail}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                  title="Salin Email"
                >
                  {isCopiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {isCopiedEmail && <p className="text-xs text-emerald-600 mt-1">Email disalin ke clipboard!</p>}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">WhatsApp</h3>
              <a
                href={waUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-neutral-900 hover:text-blue-600 transition-colors"
              >
                <span>{displayWa}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </a>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Profil</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/farid-nadir-amrulloh-149290360/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-600 hover:text-blue-600 transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com/faridnadir24-bit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-600 hover:text-blue-600 transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right: Secured Form */}
          <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>

            {/* Invisible Multi-Honeypots for Auto-fill Spambots */}
            <div
              style={{
                opacity: 0,
                position: 'absolute',
                top: 0,
                left: '-9999px',
                height: 0,
                width: 0,
                zIndex: -1,
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="user_fax_website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypots.user_fax_website}
                onChange={(e) => setHoneypots({ ...honeypots, user_fax_website: e.target.value })}
              />
              <input
                type="email"
                name="b_email_secondary"
                tabIndex={-1}
                autoComplete="off"
                value={honeypots.b_email_secondary}
                onChange={(e) => setHoneypots({ ...honeypots, b_email_secondary: e.target.value })}
              />
              <input
                type="text"
                name="sys_trap_token"
                tabIndex={-1}
                autoComplete="off"
                value={honeypots.sys_trap_token}
                onChange={(e) => setHoneypots({ ...honeypots, sys_trap_token: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-name" className="text-xs font-medium text-neutral-500 block mb-1.5">
                  Nama
                </label>
                <input
                  id="c-name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={markUserInteraction}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="text-xs font-medium text-neutral-500 block mb-1.5">
                  Email Anda
                </label>
                <input
                  id="c-email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={markUserInteraction}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="nama@domain.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="c-subject" className="text-xs font-medium text-neutral-500 block mb-1.5">
                Subjek
              </label>
              <input
                id="c-subject"
                type="text"
                maxLength={200}
                autoComplete="off"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                onFocus={markUserInteraction}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                placeholder="Kolaborasi Riset / Pertanyaan Proyek"
              />
            </div>

            <div>
              <label htmlFor="c-message" className="text-xs font-medium text-neutral-500 block mb-1.5">
                Pesan
              </label>
              <textarea
                id="c-message"
                required
                rows={4}
                maxLength={2000}
                autoComplete="off"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={markUserInteraction}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
                placeholder="Tuliskan pesan Anda..."
              />
            </div>

            {submitFeedback && (
              <p className={`text-sm ${isSuccess ? 'text-emerald-600 font-medium' : 'text-rose-600'}`}>
                {submitFeedback}
              </p>
            )}

            {rateLimitCooldown > 0 && (
              <p className="text-xs text-amber-600">
                ⏳ Cooldown aktif: Tunggu {rateLimitCooldown} detik untuk mengirim pesan berikutnya.
              </p>
            )}

            <button
              type="submit"
              disabled={rateLimitCooldown > 0}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all ${
                rateLimitCooldown > 0
                  ? 'bg-neutral-400 cursor-not-allowed'
                  : 'bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98]'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{rateLimitCooldown > 0 ? `Tunggu (${rateLimitCooldown}s)` : 'Kirim Pesan'}</span>
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};
