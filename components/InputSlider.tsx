import React, { useState } from 'react';

interface InputSliderProps {
  label: string;
  value: number;
  min: number;
  max: number; // Absolute maximum for the text input
  sliderMax?: number; // Visual maximum for the slider (UX optimization)
  step?: number;
  unit?: string;
  tooltip?: React.ReactNode;
  onChange: (val: number) => void;
}

export const InputSlider: React.FC<InputSliderProps> = ({
  label,
  value,
  min,
  max,
  sliderMax,
  step = 1,
  unit = '',
  tooltip,
  onChange,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the sliderMax if provided, otherwise default to max.
  // This allows the slider to have better precision for 90% of use cases (e.g., 0-100k),
  // while the input box still allows "Whale" values (e.g., 1M).
  const effectiveSliderMax = sliderMax || max;

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty string for better typing experience
    if (inputValue === '') {
      onChange(0);
      return;
    }

    let val = parseFloat(inputValue);
    
    if (isNaN(val)) return;

    // Validation Logic against Absolute Max
    if (val < 0) {
      setError('El valor no puede ser negativo');
    } else if (val > max) {
      setError(`El valor máximo permitido es ${max.toLocaleString()}`);
    } else {
      setError(null);
    }
    
    onChange(val);
  };

  const handleBlur = () => {
    let clamped = value;
    if (value < min) clamped = min;
    if (value > max) clamped = max;
    
    if (clamped !== value) {
      onChange(clamped);
    }
    setError(null);
  };

  // Calculate percentage for the custom track background
  // We clamp the value to the effectiveSliderMax so the bar fills up completely if value > sliderMax
  const progressPercentage = ((Math.min(Math.max(value, min), effectiveSliderMax) - min) / (effectiveSliderMax - min)) * 100;

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2 relative">
          <label className="text-gray-400 text-sm font-medium tracking-wide flex items-center gap-1">
            {label}
            {tooltip && (
              <div 
                className="relative cursor-help group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <svg className="w-4 h-4 text-gray-500 hover:text-electric-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                
                <div className={`absolute bottom-full left-0 sm:left-1/2 sm:-translate-x-1/2 mb-2 w-64 p-3 bg-midnight border border-white/20 text-xs text-gray-200 rounded-lg shadow-2xl z-50 transition-all duration-200 origin-bottom ${showTooltip ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  {tooltip}
                  <div className="absolute top-full left-4 sm:left-1/2 sm:-translate-x-1/2 border-4 border-transparent border-t-white/20"></div>
                </div>
              </div>
            )}
          </label>
        </div>
        
        <div className={`flex items-baseline gap-1 bg-white/5 px-3 py-1 rounded-md border transition-colors ${error ? 'border-red-500 bg-red-500/10' : 'border-white/10 focus-within:border-electric-cyan/50'}`}>
          <span className={`${error ? 'text-red-400' : 'text-electric-cyan'} text-sm font-bold`}>{unit}</span>
          <input
            type="number"
            value={value}
            onChange={handleManualInput}
            onBlur={handleBlur}
            className="bg-transparent text-right w-24 text-white font-semibold outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {error && (
        <span className="text-[10px] text-red-400 font-medium -mt-2 text-right animate-pulse">{error}</span>
      )}
      
      <div className="relative h-6 flex items-center group/slider">
        <input
          type="range"
          min={min}
          max={effectiveSliderMax}
          step={step}
          value={Math.min(value, effectiveSliderMax)}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full z-10 opacity-0 cursor-pointer absolute inset-0" 
        />
        
        {/* Custom Track */}
        <div className="w-full h-1 bg-white/10 rounded-full absolute overflow-hidden">
          <div 
            className={`h-full transition-all duration-100 ease-out ${error ? 'bg-red-500' : 'bg-gradient-to-r from-blue-600 to-electric-cyan'}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Custom Thumb handle visual */}
        <div 
          className={`h-5 w-5 rounded-full absolute shadow-lg border-2 border-white pointer-events-none transition-all duration-100 ease-out group-hover/slider:scale-110 ${error ? 'bg-red-500 shadow-red-500/50' : 'bg-electric-cyan shadow-[0_0_15px_rgba(0,243,255,0.6)]'}`}
          style={{ left: `calc(${progressPercentage}% - 10px)` }}
        />
        
        {/* Overflow Indicator: Shows if value exceeds slider max */}
        {value > effectiveSliderMax && (
          <div className="absolute right-0 -top-2 text-[10px] text-electric-cyan font-bold animate-pulse">
            +
          </div>
        )}
      </div>
    </div>
  );
};