import React from 'react';

type LegalSection = 'about' | 'privacy' | 'terms' | 'cookies' | null;

interface FooterProps {
  onOpenLegal: (section: LegalSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 mt-20 bg-black/40 pt-12 pb-24 lg:pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              Interés Compuesto Pro
            </h4>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Herramienta líder en análisis financiero personal. Ayudando a miles de usuarios a visualizar su futuro y tomar decisiones de inversión inteligentes mediante el poder del interés compuesto.
            </p>
          </div>
          
          <div>
            <h5 className="text-white font-semibold mb-4">Legal</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => onOpenLegal('terms')} className="hover:text-electric-cyan transition-colors">Términos y Condiciones</button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('privacy')} className="hover:text-electric-cyan transition-colors">Política de Privacidad</button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('cookies')} className="hover:text-electric-cyan transition-colors">Política de Cookies</button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4">Empresa</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => onOpenLegal('about')} className="hover:text-electric-cyan transition-colors">Sobre Nosotros</button>
              </li>
              <li>
                <span className="opacity-50 cursor-not-allowed">Contacto (Próximamente)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Compound Interest Pro. Todos los derechos reservados.</p>
          <div className="flex gap-4">
             <span>v2.4.0 (Stable)</span>
             <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};