import React, { useState, useMemo } from 'react';
import { calculateCompoundInterest, formatCurrency } from './utils/financial';
import { InputSlider } from './components/InputSlider';
import { ResultsChart } from './components/ResultsChart';
import { AdSpace } from './components/AdSpace';
import { AnimatedNumber } from './components/AnimatedNumber';
import { SEOBlog } from './components/SEOBlog';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { InputState } from './types';

const INITIAL_STATE: InputState = {
  initialPrincipal: 5000,
  monthlyContribution: 500,
  interestRate: 8,
  years: 20,
  inflationRate: 0,
};

type LegalSection = 'about' | 'privacy' | 'terms' | 'cookies' | null;

export default function App() {
  const [isComparing, setIsComparing] = useState(false);
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');
  const [legalSection, setLegalSection] = useState<LegalSection>(null);
  
  const [scenarioA, setScenarioA] = useState<InputState>(INITIAL_STATE);
  const [scenarioB, setScenarioB] = useState<InputState>({ ...INITIAL_STATE, interestRate: 10 });

  // Calculate Scenario A
  const resultsA = useMemo(() => {
    return calculateCompoundInterest(
      scenarioA.initialPrincipal,
      scenarioA.monthlyContribution,
      scenarioA.interestRate,
      scenarioA.years,
      scenarioA.inflationRate
    );
  }, [scenarioA]);

  // Calculate Scenario B
  const resultsB = useMemo(() => {
    return calculateCompoundInterest(
      scenarioB.initialPrincipal,
      scenarioB.monthlyContribution,
      scenarioB.interestRate,
      scenarioB.years,
      scenarioB.inflationRate
    );
  }, [scenarioB]);

  // Merge Data for Chart
  const mergedData = useMemo(() => {
    return resultsA.data.map((item, index) => {
      const itemB = resultsB.data[index];
      return {
        ...item,
        balanceB: isComparing && itemB ? itemB.balance : undefined
      };
    });
  }, [resultsA, resultsB, isComparing]);

  const updateInput = (key: keyof InputState, value: number) => {
    if (activeTab === 'A') {
      setScenarioA(prev => ({ ...prev, [key]: value }));
    } else {
      setScenarioB(prev => ({ ...prev, [key]: value }));
    }
  };

  const activeInputs = activeTab === 'A' ? scenarioA : scenarioB;

  const toggleComparison = () => {
    if (!isComparing) {
      setScenarioB({ ...scenarioA });
      setActiveTab('B');
    } else {
      setActiveTab('A');
    }
    setIsComparing(!isComparing);
  };

  const handleExportCSV = () => {
    const fmt = (n: number) => n.toFixed(2);
    const date = new Date().toLocaleDateString('es-ES');
    
    let rows = [
      ['REPORTE DE INTERÉS COMPUESTO PRO'],
      [`Generado el: ${date}`],
      [],
      ['ESCENARIO A'],
      ['Capital Inicial', 'Aportación Mensual', 'Tasa Anual (%)', 'Años', 'Inflación (%)'],
      [fmt(scenarioA.initialPrincipal), fmt(scenarioA.monthlyContribution), fmt(scenarioA.interestRate), scenarioA.years.toString(), fmt(scenarioA.inflationRate)],
      ['Balance Final', fmt(resultsA.summary.finalBalance)],
      []
    ];

    if (isComparing) {
      rows = rows.concat([
        ['ESCENARIO B'],
        ['Capital Inicial', 'Aportación Mensual', 'Tasa Anual (%)', 'Años', 'Inflación (%)'],
        [fmt(scenarioB.initialPrincipal), fmt(scenarioB.monthlyContribution), fmt(scenarioB.interestRate), scenarioB.years.toString(), fmt(scenarioB.inflationRate)],
        ['Balance Final', fmt(resultsB.summary.finalBalance)],
        []
      ]);
    }

    rows.push(['DETALLE ANUAL']);
    rows.push(['Año', 'Escenario A - Balance', 'Escenario A - Capital', isComparing ? 'Escenario B - Balance' : ''].filter(Boolean));

    mergedData.forEach(row => {
      const rowData = [
        row.year.toString(),
        fmt(row.balance),
        fmt(row.totalPrincipal),
      ];
      if (isComparing) rowData.push(fmt(row.balanceB || 0));
      rows.push(rowData);
    });

    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Reporte_Interes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getInflationTooltip = (rate: number) => {
    const exampleValue = 10000;
    const years = 20;
    const futureValue = exampleValue * Math.pow(1 - (rate / 100), years);
    
    return (
      <div className="space-y-2">
        <p className="font-bold text-white mb-1">Impacto de la Inflación</p>
        <p>Es la pérdida del poder adquisitivo del dinero con el tiempo.</p>
        <div className="bg-white/10 p-2 rounded mt-2">
          <p className="font-semibold text-electric-cyan text-[10px] uppercase">Ejemplo</p>
          <p>Con una inflación del <strong>{rate}%</strong>, $10,000 guardados hoy valdrán aproximadamente <strong>{formatCurrency(futureValue)}</strong> en {years} años.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-midnight font-sans text-gray-200 selection:bg-electric-cyan/30 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-electric-cyan/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Header */}
        <header className="py-8 border-b border-white/5 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 animate-slide-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Interés <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-500">Compuesto</span>
            </h1>
            <p className="text-gray-400 mt-1">Simulador de crecimiento patrimonial profesional</p>
          </div>
          
          <div className="flex gap-4 items-center">
            <button 
              onClick={toggleComparison}
              className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all ${isComparing ? 'bg-neon-purple/20 border-neon-purple text-neon-purple shadow-[0_0_10px_rgba(176,38,255,0.3)]' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
            >
              {isComparing ? 'Modo Comparación: ON' : 'Comparar Escenarios'}
            </button>

            <button 
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-2 px-6 py-2 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/20 transition-all font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Exportar
            </button>
          </div>
        </header>

        {/* Top Ad (Leaderboard) */}
        <div className="mb-8 w-full flex justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <AdSpace type="horizontal" className="max-w-4xl shadow-lg shadow-black/40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Layout */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Cards: Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Balance Final</p>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl lg:text-3xl font-bold text-white shadow-neon text-shadow flex items-center gap-2">
                    {isComparing && <span className="w-2 h-2 rounded-full bg-electric-cyan"></span>}
                    <AnimatedNumber value={resultsA.summary.finalBalance} />
                  </div>
                  {isComparing && (
                    <div className="text-xl font-bold text-neon-purple flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-neon-purple"></span>
                      <AnimatedNumber value={resultsB.summary.finalBalance} />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                 <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Contribución Total</p>
                 <div className="flex flex-col gap-1">
                   <div className="text-xl lg:text-2xl font-bold text-gray-200">
                     <AnimatedNumber value={resultsA.summary.totalContributions} />
                   </div>
                   {isComparing && (
                     <div className="text-lg font-bold text-gray-400">
                       <AnimatedNumber value={resultsB.summary.totalContributions} />
                     </div>
                   )}
                 </div>
                 <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-full"></div>
                 </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                 <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Interés Ganado</p>
                 <div className="flex flex-col gap-1">
                   <div className="text-xl lg:text-2xl font-bold text-electric-cyan">
                     <AnimatedNumber value={resultsA.summary.totalInterest} />
                   </div>
                   {isComparing && (
                     <div className="text-lg font-bold text-neon-purple">
                       <AnimatedNumber value={resultsB.summary.totalInterest} />
                     </div>
                   )}
                 </div>
                 <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-electric-cyan to-blue-500 w-full"></div>
                 </div>
              </div>
            </div>

            {/* Strategic Ad Placement */}
            <div className="w-full animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <AdSpace type="horizontal" className="h-[90px] w-full opacity-80 hover:opacity-100 transition-opacity" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              
              {/* Controls Column */}
              <div className="glass-panel rounded-2xl p-6 lg:col-span-1 h-fit border-t-4 border-t-electric-cyan">
                
                {/* Tabs for Comparison */}
                {isComparing && (
                  <div className="flex p-1 bg-white/5 rounded-lg mb-6">
                    <button 
                      onClick={() => setActiveTab('A')}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'A' ? 'bg-electric-cyan text-midnight shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                      ESCENARIO A
                    </button>
                    <button 
                      onClick={() => setActiveTab('B')}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'B' ? 'bg-neon-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                      ESCENARIO B
                    </button>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span className={`w-1 h-6 rounded-full ${activeTab === 'A' ? 'bg-electric-cyan' : 'bg-neon-purple'}`}></span>
                  Parámetros {isComparing && activeTab}
                </h3>
                
                <InputSlider 
                  label="Capital Inicial" 
                  value={activeInputs.initialPrincipal} 
                  min={0} 
                  max={10000000} 
                  sliderMax={100000} 
                  step={100}
                  unit="$"
                  onChange={(v) => updateInput('initialPrincipal', v)} 
                />
                
                <InputSlider 
                  label="Aportación Mensual" 
                  value={activeInputs.monthlyContribution} 
                  min={0} 
                  max={500000} 
                  sliderMax={5000}
                  step={50}
                  unit="$"
                  onChange={(v) => updateInput('monthlyContribution', v)} 
                />
                
                <InputSlider 
                  label="Tasa de Interés Anual" 
                  value={activeInputs.interestRate} 
                  min={0} 
                  max={100} 
                  sliderMax={15}
                  step={0.1}
                  unit="%"
                  onChange={(v) => updateInput('interestRate', v)} 
                />
                
                <InputSlider 
                  label="Tiempo de Inversión" 
                  value={activeInputs.years} 
                  min={1} 
                  max={100} 
                  sliderMax={50}
                  unit="Años"
                  onChange={(v) => updateInput('years', v)} 
                />

                <div className="pt-4 mt-4 border-t border-white/10">
                  <InputSlider 
                    label="Tasa de Inflación" 
                    value={activeInputs.inflationRate} 
                    min={0} 
                    max={50} 
                    sliderMax={10}
                    step={0.1}
                    unit="%"
                    tooltip={getInflationTooltip(activeInputs.inflationRate)}
                    onChange={(v) => updateInput('inflationRate', v)} 
                  />
                </div>
              </div>

              {/* Chart Column */}
              <div className="glass-panel rounded-2xl p-6 lg:col-span-2 flex flex-col min-h-[500px]">
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                  <h3 className="text-lg font-semibold text-white">Proyección de Crecimiento</h3>
                  
                  <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-electric-cyan"></span>
                      <span className="text-gray-400">Escenario A</span>
                    </div>
                    {isComparing && (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-neon-purple"></span>
                        <span className="text-gray-400">Escenario B</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-grow w-full h-full">
                  <ResultsChart data={mergedData} isComparing={isComparing} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6 flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
             <div className="sticky top-8 space-y-6 w-full">
                <div className="glass-panel p-6 rounded-2xl border-l-2 border-electric-cyan">
                  <h4 className="text-white font-bold mb-2">Consejo Pro</h4>
                  <p className="text-sm text-gray-400">
                    {isComparing 
                      ? "Compara cómo una diferencia del 1-2% en el retorno anual puede duplicar tu dinero a largo plazo."
                      : `Aumentar tu contribución mensual en $100 puede generar extra ${formatCurrency(100 * 12 * Math.pow(1.08, 20))} en 20 años.`
                    }
                  </p>
                </div>
                <AdSpace type="sidebar" className="mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)] border-white/5" />
                <div className="hidden lg:block">
                  <AdSpace type="box" className="mx-auto opacity-70" />
                </div>
             </div>
          </div>
        </div>
        
        {/* SEO Blog Section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <SEOBlog />
        </div>

      </div>

      {/* Footer & Modals */}
      <Footer onOpenLegal={setLegalSection} />
      <LegalModal 
        isOpen={!!legalSection} 
        section={legalSection} 
        onClose={() => setLegalSection(null)} 
      />
      
      {/* Mobile Sticky Footer Ad */}
      <div className="fixed bottom-0 left-0 w-full lg:hidden z-50 animate-slide-up">
        <AdSpace type="mobile-sticky" />
      </div>

    </div>
  );
}