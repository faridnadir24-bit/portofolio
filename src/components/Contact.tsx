import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  MessageSquare, 
  ArrowUpRight,
  ExternalLink,
  Sparkles
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setIsCopiedEmail(true);
    setTimeout(() => setIsCopiedEmail(false), 2500);
  };

  const sanitizeInput = (text: string): string => {
    return text.replace(/[<>]/g, '').trim();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.length > 0) {
      console.warn('Bot submission blocked.');
      return;
    }

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
    <section id="kontak" className="py-24 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Statement Header (Benjamin Creative Style) */}
        <div className="text-left mb-16 space-y-4">
          <div className="text-xs font-mono text-stone-400 uppercase tracking-widest">
            [ 05 • GET IN TOUCH ]
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.95]">
            LET'S WORK <br />
            <span className="text-stone-400 font-light">TOGETHER.</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
            Terbuka untuk kolaborasi riset kecerdasan buatan, telemetri IoT, kompetisi inovasi sains, serta kesempatan magang teknologi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Direct Channels (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            
            {/* Email Box */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400 uppercase">Direct Email</span>
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
                  title="Salin Email"
                >
                  {isCopiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-lg sm:text-xl font-bold font-mono text-white hover:text-stone-300 transition-colors block break-all"
              >
                {PERSONAL_INFO.email}
              </a>
              {isCopiedEmail && (
                <p className="text-xs font-mono text-emerald-400">✓ Email address copied to clipboard</p>
              )}
            </div>

            {/* WhatsApp Box */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-stone-400 uppercase block">WhatsApp</span>
                <span className="text-lg font-bold font-mono text-white mt-1 block">
                  {PERSONAL_INFO.whatsappDisplay}
                </span>
              </div>

              <a
                id="whatsapp-direct-btn"
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-white text-black text-xs font-bold hover:bg-stone-200 transition-all active:scale-95 shadow-md flex items-center gap-1.5"
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
                className="dark-card rounded-2xl p-4 flex items-center justify-between text-stone-300 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-xs font-bold">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                id="social-github-btn"
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dark-card rounded-2xl p-4 flex items-center justify-between text-stone-300 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span className="text-xs font-bold">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>

          </div>

          {/* Contact Message Form (7 cols) */}
          <div className="md:col-span-7 dark-card rounded-3xl p-6 sm:p-8 text-left">
            <h3 className="text-xl font-bold text-white mb-6">
              Send a Direct Message
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
                  <label htmlFor="contact-name" className="text-xs font-mono text-stone-400 block">
                    NAME *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name / Organization"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-2xl bg-[#0C0C0C] border border-white/10 text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-stone-400 block">
                    EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-2xl bg-[#0C0C0C] border border-white/10 text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-mono text-stone-400 block">
                  SUBJECT
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. Research Collaboration / Project Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-2xl bg-[#0C0C0C] border border-white/10 text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-stone-400 block">
                  MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Describe your project, ideas, or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-2xl bg-[#0C0C0C] border border-white/10 text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              {submitFeedback && (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-stone-300">
                  {submitFeedback}
                </div>
              )}

              <button
                id="submit-contact-form-btn"
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold bg-white text-black hover:bg-stone-200 transition-all duration-200 active:scale-95 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
