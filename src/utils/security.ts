/**
 * Security & Anti-Spam Utility Suite
 * Melindungi kontak (Email & WhatsApp) dari bot scrapers, spammers, dan flooders.
 */

// Obfuscated contact parts (Mencegah regex scraper bot mendeteksi plain email/phone di static code)
const EMAIL_ENCODED = 'ZmFyaWRuYWRpcjI0QGdtYWlsLmNvbQ=='; // Base64
const WA_ENCODED = 'NjI4MTkwMjcxNjU2Mg=='; // Base64 6281902716562
const WA_DISP_ENCODED = 'MDgxOTAyNzE2NTYy'; // Base64 081902716562

export const decodeContactString = (encoded: string): string => {
  try {
    if (typeof window === 'undefined') return '';
    return atob(encoded);
  } catch {
    return '';
  }
};

export const getSecureEmail = (): string => decodeContactString(EMAIL_ENCODED);
export const getSecureWhatsAppNumber = (): string => decodeContactString(WA_ENCODED);
export const getSecureWhatsAppDisplay = (): string => decodeContactString(WA_DISP_ENCODED);

export const getSecureWhatsAppUrl = (customText?: string): string => {
  const num = getSecureWhatsAppNumber();
  const msg = encodeURIComponent(customText || 'Halo Farid Nadir, saya melihat portofolio Anda dan ingin berdiskusi.');
  return `https://wa.me/${num}?text=${msg}`;
};

/**
 * Anti-Spam & Behavioral Verification
 */
const RATE_LIMIT_STORAGE_KEY = 'fn_last_submit_ts';
const COOLDOWN_SECONDS = 45;

export interface AntiSpamCheckResult {
  isValid: boolean;
  isBotSilentDrop: boolean;
  errorMessage?: string;
}

export const checkRateLimit = (): { allowed: boolean; remainingSeconds: number } => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    if (!raw) return { allowed: true, remainingSeconds: 0 };
    
    const lastTs = parseInt(raw, 10);
    if (isNaN(lastTs)) return { allowed: true, remainingSeconds: 0 };
    
    const elapsedSec = Math.floor((Date.now() - lastTs) / 1000);
    if (elapsedSec < COOLDOWN_SECONDS) {
      return { allowed: false, remainingSeconds: COOLDOWN_SECONDS - elapsedSec };
    }
    return { allowed: true, remainingSeconds: 0 };
  } catch {
    return { allowed: true, remainingSeconds: 0 };
  }
};

export const recordSubmission = (): void => {
  try {
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, Date.now().toString());
  } catch {
    // Ignore storage quota or blocked errors
  }
};

/**
 * Validasi form multi-layer anti-bot
 */
export const validateFormSubmission = (options: {
  honeypot1: string; // fake website field
  honeypot2: string; // fake secondary email
  honeypot3: string; // fake token
  formLoadTime: number;
  hasUserInteracted: boolean;
  name: string;
  email: string;
  subject: string;
  message: string;
}): AntiSpamCheckResult => {
  const { honeypot1, honeypot2, honeypot3, formLoadTime, hasUserInteracted, name, email, message } = options;

  // 1. Check Multi-Honeypots: Jika ada yang terisi, ini 100% bot!
  // Kami gunakan teknik "Silent Blackhole" agar bot mengira berhasil dan tidak mencoba teknik brute force lain.
  if (honeypot1.trim().length > 0 || honeypot2.trim().length > 0 || honeypot3.trim().length > 0) {
    return { isValid: false, isBotSilentDrop: true };
  }

  // 2. Behavioral Check: Minimal waktu pengisian form manusia (minimal 3 detik)
  const timeElapsed = Date.now() - formLoadTime;
  if (timeElapsed < 3000) {
    return {
      isValid: false,
      isBotSilentDrop: false,
      errorMessage: 'Pengisian form terlalu cepat. Mohon luangkan waktu beberapa detik.',
    };
  }

  // 3. User Interaction Check: Memastikan ada mouse move, focus, atau key event
  if (!hasUserInteracted) {
    return {
      isValid: false,
      isBotSilentDrop: true, // Bot headless yang menembak submit langsung
    };
  }

  // 4. Rate Limiting Check (Anti-Flooding via LocalStorage)
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    return {
      isValid: false,
      isBotSilentDrop: false,
      errorMessage: `Mohon tunggu ${rateLimit.remainingSeconds} detik sebelum mengirim pesan lagi.`,
    };
  }

  // 5. Input Sanitization & Length Validation
  const cleanName = sanitizeText(name);
  const cleanEmail = sanitizeText(email);
  const cleanMessage = sanitizeText(message);

  if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
    return {
      isValid: false,
      isBotSilentDrop: false,
      errorMessage: 'Nama harus diisi dengan benar (2 - 100 karakter).',
    };
  }

  if (!isValidEmailFormat(cleanEmail)) {
    return {
      isValid: false,
      isBotSilentDrop: false,
      errorMessage: 'Format email tidak valid. Gunakan format nama@domain.com.',
    };
  }

  if (!cleanMessage || cleanMessage.length < 5 || cleanMessage.length > 2500) {
    return {
      isValid: false,
      isBotSilentDrop: false,
      errorMessage: 'Pesan harus diisi antara 5 hingga 2500 karakter.',
    };
  }

  return { isValid: true, isBotSilentDrop: false };
};

export const sanitizeText = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/gi, '') // Strip HTML tags
    .replace(/javascript\s*:/gi, '') // Strip JS protocol
    .replace(/data\s*:\s*text\/html/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Strip inline event handlers
    .replace(/&#?x?[0-9a-f]+;/gi, '') // Strip HTML entities
    .replace(/\0/g, '') // Strip null bytes
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Strip zero-width invisible characters (sering dipakai spammer)
    .trim();
};

export const isValidEmailFormat = (email: string): boolean => {
  if (!email || email.length > 254) return false;
  // RFC 5322 standard regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
};
