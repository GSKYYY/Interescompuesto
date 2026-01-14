import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../utils/financial';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 800; // ms
    const startValue = displayValue;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = startValue + (endValue - startValue) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return (
    <span className={className}>
      {formatCurrency(displayValue)}
    </span>
  );
};