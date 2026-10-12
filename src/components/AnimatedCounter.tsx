import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 1600,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [count, setCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic curve: 1 - (1 - t)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * target;

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, target, duration]);

  const formattedValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};
