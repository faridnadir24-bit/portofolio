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
 * Deteksi environment automated headless (Puppeteer, Selenium, Playwright scraper)
 */
export const isAutomatedEnvironment = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    // 1. Standar navigator.webdriver flag
    if (navigator.webdriver) return true;

    // 2. User-Agent headless signatures
    const ua = navigator.userAgent.toLowerCase();
    if (
      ua.includes('headlesschrome') ||
      ua.includes('phantomjs') ||
      ua.includes('selenium') ||
      ua.includes('puppeteer') ||
      ua.includes('playwright')
    ) {
      return true;
    }

    // 3. Document hidden automation properties
    const docWithAutomation = document as unknown as {
      $cdc_asdjflasutopfhvcZLmcfl_?: unknown;
      __webdriver_evaluate?: unknown;
      __selenium_evaluate?: unknown;
    };
    if (
      docWithAutomation.$cdc_asdjflasutopfhvcZLmcfl_ ||
      docWithAutomation.__webdriver_evaluate ||
      docWithAutomation.__selenium_evaluate
    ) {
      return true;
    }
  } catch {
    // Fail-safe
  }
  return false;
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

  // 0. Headless Automation & Scraper Bot Detection
  if (isAutomatedEnvironment()) {
    return { isValid: false, isBotSilentDrop: true };
  }

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

  // 5. Anti-Injection Deep Inspection (SQLi / XSS payload detection)
  if (detectHarmfulPayload(name) || detectHarmfulPayload(subject) || detectHarmfulPayload(message)) {
    return {
      isValid: false,
      isBotSilentDrop: false,
      errorMessage: 'Pesan terdeteksi mengandung format kode atau karakter berbahaya (XSS/SQLi).',
    };
  }

  // 6. Input Sanitization & Length Validation
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

/**
 * Deep Inspection untuk pola SQL Injection dan XSS
 */
export const detectHarmfulPayload = (text: string): boolean => {
  if (!text) return false;
  const lower = text.toLowerCase();
  
  // XSS attack patterns
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i,
    /javascript\s*:/i,
    /data\s*:\s*text\/html/i,
    /vbscript\s*:/i,
    /on(?:error|load|click|mouseover|focus|blur|submit)\s*=/i,
    /<iframe\b/i,
    /<svg\b[^>]*onload/i,
    /<img\b[^>]*onerror/i,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(text)) return true;
  }

  // SQL Injection keywords pattern
  const sqliPatterns = [
    /\b(union\s+select|select\s+.*\s+from|insert\s+into|drop\s+table|delete\s+from)\b/i,
    /(\bor\s+1\s*=\s*1\b|\band\s+1\s*=\s*1\b)/i,
    /--\s*$/m,
  ];

  for (const pattern of sqliPatterns) {
    if (pattern.test(lower)) return true;
  }

  return false;
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

/**
 * Developer Console Security Warning Banner
 * Ditampilkan saat pengunjung / dev membuka F12 DevTools Console (mencegah Self-XSS & scamming).
 */
export const initConsoleSecurityBanner = (): void => {
  if (typeof window === 'undefined') return;

  // Prevent duplicate execution in React StrictMode
  const globalWin = window as unknown as { __FN_CONSOLE_GUARD_ACTIVE__?: boolean };
  if (globalWin.__FN_CONSOLE_GUARD_ACTIVE__) return;
  globalWin.__FN_CONSOLE_GUARD_ACTIVE__ = true;

  console.log(
    '%c⚠️ PERINGATAN KEAMANAN / SECURITY WARNING',
    'color:#EF4444;font-size:24px;font-weight:900;text-shadow:1px 1px 0 #000;padding:6px 0;'
  );
  console.log(
    '%cIni adalah fitur peramban (browser) yang ditujukan khusus untuk pengembang (developer).\nJika seseorang menyuruh Anda menyalin-tempel (copy-paste) kode atau script tertentu di sini, tindakan tersebut adalah penipuan (Self-XSS) yang dapat membahayakan keamanan Anda.',
    'color:#F59E0B;font-size:13px;line-height:1.5;font-weight:500;'
  );
  console.log(
    '%c🔒 Status Sistem: Dilindungi Content-Security-Policy (CSP), HSTS Preload, Anti-Clickjacking, dan Obfuscation Runtime.',
    'color:#10B981;font-size:12px;font-weight:600;padding:4px 0;'
  );
  console.log(
    '%c🚀 Portofolio Resmi: Farid Nadir Amrulloh — https://portofolio-gvgr.vercel.app\nTertarik kolaborasi teknologi atau riset? Hubungi langsung via formulir kontak atau faridnadir24@gmail.com',
    'color:#3B82F6;font-size:12px;font-style:italic;'
  );
};

/**
 * Runtime DOM Anti-Tamper Guard
 * Memantau DOM terhadap injeksi script atau iframe mencurigakan dari ekstensi browser tidak dikenal atau malware.
 */
export const initDomSecurityGuard = (): void => {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

  const globalWin = window as unknown as { __FN_DOM_GUARD_ACTIVE__?: boolean };
  if (globalWin.__FN_DOM_GUARD_ACTIVE__) return;
  globalWin.__FN_DOM_GUARD_ACTIVE__ = true;

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of Array.from(mutation.addedNodes)) {
        if (node instanceof HTMLElement) {
          // Deteksi dan netralkan script pihak ketiga asing yang diinjeksi
          if (node.tagName === 'SCRIPT') {
            const src = node.getAttribute('src');
            if (
              src &&
              !src.startsWith('/') &&
              !src.startsWith(window.location.origin) &&
              !src.includes('vercel') &&
              !src.includes('google')
            ) {
              node.remove();
              console.warn('[Security Guard] Foreign script injection neutralized:', src);
            }
          }
          // Deteksi dan netralkan iframe asing yang diinjeksi
          if (node.tagName === 'IFRAME') {
            const src = node.getAttribute('src');
            if (src && !src.startsWith(window.location.origin)) {
              node.remove();
              console.warn('[Security Guard] Unauthorized iframe injection neutralized:', src);
            }
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
};
