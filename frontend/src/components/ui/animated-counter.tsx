import React, { useEffect, useRef, useState } from "react";

export interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function parseNumberString(str: string): {
  prefix: string;
  target: number;
  decimals: number;
  suffix: string;
} {
  const match = str.match(/^([^\d.]*)([\d]+(?:\.[\d]+)?)(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, decimals: 0, suffix: str };
  }
  const prefix = match[1] || "";
  const numStr = match[2];
  const suffix = match[3] || "";
  const target = parseFloat(numStr);
  const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length || 0) : 0;
  return { prefix, target, decimals, suffix };
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1800,
  className = "",
}) => {
  const { prefix, target, decimals, suffix } = parseNumberString(value);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<string>(() => {
    return `${prefix}${(0).toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let animationFrameId: number;
    let isMounted = true;

    const startAnimation = () => {
      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!isMounted) return;
        if (startTime === null) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic curve: quick start, gentle deceleration
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;

        setDisplayValue(`${prefix}${current.toFixed(decimals)}${suffix}`);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue(`${prefix}${target.toFixed(decimals)}${suffix}`);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            // Reset to 0 when scrolled completely out of view so scrolling back in re-triggers
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            setDisplayValue(`${prefix}${(0).toFixed(decimals)}${suffix}`);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      isMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [value, target, decimals, prefix, suffix, duration]);

  return (
    <span ref={containerRef} className={`tabular-nums ${className}`}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
