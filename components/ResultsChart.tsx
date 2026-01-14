import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CalculationResult } from '../types';
import { formatCurrency } from '../utils/financial';

interface ResultsChartProps {
  data: (CalculationResult & { balanceB?: number })[];
  isComparing?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const balanceA = payload.find((p: any) => p.dataKey === 'balance');
    const balanceB = payload.find((p: any) => p.dataKey === 'balanceB');
    const principal = payload.find((p: any) => p.dataKey === 'totalPrincipal');

    return (
      <div className="glass-panel p-4 rounded-lg shadow-xl border border-white/10">
        <p className="text-gray-400 text-xs font-semibold mb-2">AÑO {label}</p>
        <div className="space-y-2">
          {balanceB && (
             <div>
              <p className="text-neon-purple font-bold text-lg leading-none">
                {formatCurrency(balanceB.value)}
              </p>
              <p className="text-[10px] text-gray-400">Escenario B</p>
            </div>
          )}
          
          {balanceA && (
            <div>
              <p className="text-electric-cyan font-bold text-lg leading-none">
                {formatCurrency(balanceA.value)}
              </p>
              <p className="text-[10px] text-gray-400">{balanceB ? 'Escenario A' : 'Balance Total'}</p>
            </div>
          )}
          
          <div className="w-full h-[1px] bg-white/10"></div>
          
          {principal && !balanceB && (
            <>
              <p className="text-white text-sm">
                {formatCurrency(principal.value)}
              </p>
              <p className="text-xs text-gray-500">Capital Aportado</p>
            </>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const ResultsChart: React.FC<ResultsChartProps> = ({ data, isComparing }) => {
  return (
    <div className="w-full h-[350px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            {/* Scenario A Gradient (Cyan) */}
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#00f3ff" stopOpacity={0.05} />
            </linearGradient>

            {/* Scenario B Gradient (Purple) */}
            <linearGradient id="colorBalanceB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#b026ff" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#b026ff" stopOpacity={0.05} />
            </linearGradient>
            
            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
            </linearGradient>
            
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
               <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
               <feOffset in="blur" dx="0" dy="0" result="offsetBlur"/>
               <feFlood floodColor="#00f3ff" floodOpacity="0.2" result="offsetColor"/>
               <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
               <feMerge>
                <feMergeNode in="offsetBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <filter id="glowPurple" x="-50%" y="-50%" width="200%" height="200%">
               <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
               <feOffset in="blur" dx="0" dy="0" result="offsetBlur"/>
               <feFlood floodColor="#b026ff" floodOpacity="0.2" result="offsetColor"/>
               <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
               <feMerge>
                <feMergeNode in="offsetBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="#6b7280" 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#6b7280" 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            tickFormatter={(value) => `$${(value / 1000)}k`}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }} />
          
          {/* Only show Principal if NOT comparing, to reduce clutter */}
          {!isComparing && (
            <Area
              type="monotone"
              dataKey="totalPrincipal"
              stackId="2"
              stroke="#6366f1"
              fill="url(#colorPrincipal)"
              strokeWidth={2}
              animationDuration={1500}
              activeDot={false}
            />
          )}

          {/* Scenario B (Render behind A slightly if overlapping, or use z-index) */}
          {isComparing && (
            <Area
              type="monotone"
              dataKey="balanceB"
              stackId="3" 
              stroke="#b026ff"
              fill="url(#colorBalanceB)"
              strokeWidth={3}
              filter="url(#glowPurple)"
              animationDuration={2000}
              activeDot={{ r: 5, fill: '#b026ff', stroke: '#fff' }}
            />
          )}

          {/* Scenario A */}
          <Area
            type="monotone"
            dataKey="balance"
            stackId="1" 
            stroke="#00f3ff"
            fill="url(#colorBalance)"
            strokeWidth={3}
            filter="url(#glow)"
            animationDuration={2000}
            activeDot={{ r: 6, fill: '#00f3ff', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};