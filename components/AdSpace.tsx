import React from 'react';

interface AdSpaceProps {
  type: 'horizontal' | 'sidebar' | 'box' | 'mobile-sticky';
  className?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({ type, className = '' }) => {
  const getDimensions = () => {
    switch (type) {
      case 'horizontal': return 'h-[90px] w-full';
      case 'sidebar': return 'h-[600px] w-[300px]';
      case 'box': return 'h-[250px] w-full';
      case 'mobile-sticky': return 'h-[50px] w-full';
      default: return 'h-[90px] w-full';
    }
  };

  const getLabel = () => {
     if (type === 'mobile-sticky') return null; // Too small for label
     return <span className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-2">Publicidad</span>;
  };

  return (
    <div className={`flex flex-col items-center justify-center bg-white/5 border border-white/10 overflow-hidden relative ${type === 'mobile-sticky' ? 'border-t border-b-0 backdrop-blur-xl bg-black/80 z-50' : 'rounded-lg'} ${getDimensions()} ${className}`}>
      {getLabel()}
      
      {type === 'mobile-sticky' ? (
         <div className="text-[10px] text-gray-500 flex items-center gap-2">
            <span className="w-1 h-1 bg-electric-cyan rounded-full animate-pulse"></span>
            Anuncio Patrocinado
         </div>
      ) : (
        <>
          <div className="w-16 h-1 bg-white/10 rounded-full mb-2"></div>
          <div className="w-8 h-1 bg-white/10 rounded-full"></div>
          {/* Decorative gradient blob */}
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-electric-cyan/10 blur-xl rounded-full pointer-events-none"></div>
        </>
      )}
    </div>
  );
};