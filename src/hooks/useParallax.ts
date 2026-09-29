import { useEffect, useRef } from 'react';

/**
 * Subtle scroll-driven parallax for an element.
 * Shifts the element vertically by `speed` factor relative to scroll position.
 * Default speed 0.08 = ~15px total shift over typical viewport scroll.
 */
export function useParallax(speed: number = 0.08) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const offset = (elementCenter - viewportCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}
