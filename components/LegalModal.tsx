import React from 'react';

type LegalSection = 'about' | 'privacy' | 'terms' | 'cookies' | null;

interface LegalModalProps {
  isOpen: boolean;
  section: LegalSection;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, section, onClose }) => {
  if (!isOpen || !section) return null;

  const renderContent = () => {
    switch (section) {
      case 'about':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-electric-cyan mb-6">Sobre Nosotros</h2>
            <p>
              Somos un equipo multidisciplinario conformado por analistas financieros certificados y desarrolladores de software senior, unidos por una misión clara: <strong>democratizar el acceso a herramientas de planificación financiera de alto nivel.</strong>
            </p>
            <p>
              En un entorno económico cada vez más complejo, creemos que la educación financiera no debería ser un privilegio, sino un derecho. Esta herramienta ha sido desarrollada utilizando algoritmos y fórmulas matemáticas estándar de la industria financiera (Valor Futuro, Series Geométricas y Ajuste por Inflación) para garantizar la máxima precisión en las proyecciones.
            </p>
            <p>
              Nuestro compromiso es la transparencia y la objetividad. No vendemos productos financieros ni estamos afiliados a ninguna entidad bancaria específica. Nuestro objetivo es proporcionarle los datos y las proyecciones visuales necesarias para que usted pueda tomar decisiones informadas sobre su futuro y alcanzar su libertad financiera.
            </p>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-electric-cyan mb-6">Política de Privacidad</h2>
            <h3 className="text-lg font-semibold text-white">1. Recopilación de Datos y Procesamiento Local</h3>
            <p>
              Respetamos profundamente su privacidad. Esta aplicación funciona principalmente en el lado del cliente (su navegador). Los datos financieros que usted introduce en la calculadora (capital, tasas de interés, plazos) se procesan localmente en su dispositivo y <strong>no son almacenados en nuestros servidores ni compartidos con terceros</strong> para la creación de perfiles financieros.
            </p>
            
            <h3 className="text-lg font-semibold text-white">2. Archivos de Registro (Log Files)</h3>
            <p>
              Como la mayoría de los sitios web, utilizamos archivos de registro. Estos archivos simplemente registran a los visitantes del sitio (un procedimiento estándar para las empresas de alojamiento y una parte de los análisis de los servicios de alojamiento). La información recopilada incluye direcciones de protocolo de internet (IP), tipo de navegador, proveedor de servicios de internet (ISP), fecha y hora, páginas de referencia/salida y, posiblemente, el número de clics. Esta información se utiliza para analizar tendencias, administrar el sitio, rastrear el movimiento de los usuarios en el sitio web y recopilar información demográfica.
            </p>

            <h3 className="text-lg font-semibold text-white">3. Cookies de Google DoubleClick DART</h3>
            <p>
              Google es uno de los proveedores externos en nuestro sitio. También utiliza cookies, conocidas como cookies DART, para mostrar anuncios a los visitantes de nuestro sitio en función de su visita a este y a otros sitios en Internet. Sin embargo, los visitantes pueden optar por rechazar el uso de cookies DART visitando la Política de privacidad de la red de contenido y anuncios de Google en la siguiente URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-electric-cyan hover:underline">https://policies.google.com/technologies/ads</a>
            </p>

            <h3 className="text-lg font-semibold text-white">4. Socios Publicitarios</h3>
            <p>
              Nuestros socios publicitarios (como Google AdSense) pueden utilizar cookies y web beacons en nuestro sitio. Los servidores de anuncios de terceros o las redes publicitarias utilizan tecnologías como cookies, JavaScript o Web Beacons que se utilizan en sus respectivos anuncios y enlaces que aparecen en este sitio web, que se envían directamente al navegador de los usuarios. Reciben automáticamente su dirección IP cuando esto ocurre. Estas tecnologías se utilizan para medir la efectividad de sus campañas publicitarias y/o para personalizar el contenido publicitario que usted ve en los sitios web que visita.
            </p>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-electric-cyan mb-6">Términos y Condiciones de Uso</h2>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="text-lg font-bold text-red-400 mb-2">DESCARGO DE RESPONSABILIDAD (DISCLAIMER)</h3>
              <p className="text-sm text-gray-300">
                Los resultados proporcionados por esta calculadora de interés compuesto son estimaciones basadas en los datos ingresados por el usuario y fórmulas matemáticas teóricas. <strong>Estos resultados tienen fines exclusivamente educativos e informativos.</strong>
              </p>
            </div>
            
            <h3 className="text-lg font-semibold text-white mt-4">1. No es Asesoramiento Financiero</h3>
            <p>
              El contenido de este sitio web no constituye, ni debe interpretarse como, asesoramiento financiero, de inversión, legal o fiscal profesional. Antes de tomar cualquier decisión financiera significativa, le recomendamos encarecidamente que consulte con un asesor financiero certificado que pueda evaluar su situación personal, tolerancia al riesgo y objetivos específicos.
            </p>

            <h3 className="text-lg font-semibold text-white">2. Naturaleza de las Proyecciones</h3>
            <p>
              Las proyecciones futuras no garantizan rendimientos pasados ni futuros. Los mercados financieros son volátiles y están sujetos a riesgos que esta calculadora no puede prever. Asumimos una tasa de interés constante para fines de simplificación, lo cual rara vez ocurre en escenarios de inversión del mundo real.
            </p>

            <h3 className="text-lg font-semibold text-white">3. Limitación de Responsabilidad</h3>
            <p>
              Al utilizar este sitio web, usted acepta que los propietarios, desarrolladores y afiliados de esta herramienta no serán responsables por ninguna pérdida o daño, directo o indirecto, que surja del uso de la información o las herramientas proporcionadas aquí. Usted es el único responsable de sus decisiones financieras.
            </p>
          </div>
        );
      case 'cookies':
        return (
          <div className="space-y-4">
             <h2 className="text-2xl font-bold text-electric-cyan mb-6">Política de Cookies</h2>
             <p>
               Utilizamos cookies para mejorar su experiencia de navegación, analizar nuestro tráfico y personalizar el contenido y los anuncios.
             </p>
             
             <div className="overflow-x-auto mt-4">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-white/20">
                     <th className="py-2 px-4 font-semibold text-white">Tipo de Cookie</th>
                     <th className="py-2 px-4 font-semibold text-white">Propósito</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm text-gray-300">
                   <tr className="border-b border-white/10 bg-white/5">
                     <td className="py-3 px-4">Cookies Técnicas</td>
                     <td className="py-3 px-4">Esenciales para el funcionamiento básico del sitio y guardar sus preferencias de sesión.</td>
                   </tr>
                   <tr className="border-b border-white/10">
                     <td className="py-3 px-4">Cookies Analíticas</td>
                     <td className="py-3 px-4">Nos ayudan a entender cómo los visitantes interactúan con el sitio (ej. Google Analytics).</td>
                   </tr>
                   <tr className="border-b border-white/10 bg-white/5">
                     <td className="py-3 px-4">Cookies Publicitarias</td>
                     <td className="py-3 px-4">Utilizadas por empresas como Google para mostrar anuncios relevantes basados en sus intereses.</td>
                   </tr>
                 </tbody>
               </table>
             </div>

             <h3 className="text-lg font-semibold text-white mt-6">Control de Cookies</h3>
             <p>
               Usted tiene el derecho de aceptar o rechazar las cookies. Puede modificar la configuración de su navegador para rechazar las cookies si lo prefiere, aunque esto podría afectar la funcionalidad de algunos sitios web.
             </p>
             <p>
               Para más información sobre cómo Google utiliza los datos cuando usted usa los sitios o aplicaciones de sus socios, visite: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-electric-cyan hover:underline">www.google.com/policies/privacy/partners/</a>
             </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-midnight border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="p-8 text-gray-300 leading-relaxed">
          {renderContent()}
        </div>
        
        <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};