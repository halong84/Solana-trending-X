import React from 'react';
import { Token } from '../types.ts';
import { Flame, TrendingUp, Twitter, Zap, DollarSign } from 'lucide-react';

interface MarketMetricsBarProps {
  tokens: Token[];
  lang: 'vi' | 'en';
}

export const MarketMetricsBar: React.FC<MarketMetricsBarProps> = ({ tokens, lang }) => {
  const totalVolume = tokens.reduce((sum, t) => sum + (t.volume24h || 0), 0);
  
  // Find top gainer
  const topGainer = tokens.length > 0 
    ? [...tokens].sort((a, b) => (b.priceChange24h || 0) - (a.priceChange24h || 0))[0]
    : null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      
      {/* Metric 1: Total 24h Volume */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center space-x-3 backdrop-blur-sm relative overflow-hidden group">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-400">
            {lang === 'vi' ? 'Tổng Volume 24h' : 'Total 24h Volume'}
          </p>
          <p className="text-base sm:text-lg font-bold text-white tracking-tight">
            ${(totalVolume / 1_000_000).toFixed(1)}M
          </p>
        </div>
      </div>

      {/* Metric 2: Top Gainer 24h */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center space-x-3 backdrop-blur-sm relative overflow-hidden group">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div className="truncate">
          <p className="text-[11px] font-medium text-slate-400">
            {lang === 'vi' ? 'Tăng mạnh nhất 24h' : 'Top 24h Gainer'}
          </p>
          <div className="flex items-center space-x-1.5 truncate">
            <span className="text-sm sm:text-base font-bold text-white truncate">
              ${topGainer ? topGainer.symbol : '---'}
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              +{topGainer ? Math.round(topGainer.priceChange24h) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Metric 3: Dominant X Narrative */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center space-x-3 backdrop-blur-sm relative overflow-hidden group">
        <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition-transform">
          <Flame className="w-5 h-5" />
        </div>
        <div className="truncate">
          <p className="text-[11px] font-medium text-slate-400">
            {lang === 'vi' ? 'Meta dẫn dắt trên X' : 'Hot Narrative on X'}
          </p>
          <p className="text-sm sm:text-base font-bold text-purple-300 truncate">
            AI Agents & Animal Memes
          </p>
        </div>
      </div>

      {/* Metric 4: Direct Twitter / X Search shortcut */}
      <a
        href="https://x.com/search?q=%23solanameme+OR+%23pumpfun&f=live"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-3.5 flex items-center justify-between backdrop-blur-sm transition-all group"
      >
        <div className="flex items-center space-x-3 truncate">
          <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-105 transition-transform">
            <Twitter className="w-5 h-5" />
          </div>
          <div className="truncate">
            <p className="text-[11px] font-medium text-slate-400">
              {lang === 'vi' ? 'Khám phá trên X' : 'Live Feed on X'}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-sky-300 truncate">
              #SolanaMeme #PumpFun
            </p>
          </div>
        </div>
        <Zap className="w-4 h-4 text-sky-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </a>

    </div>
  );
};
