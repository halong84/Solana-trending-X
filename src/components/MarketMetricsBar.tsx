import React from 'react';
import { Token } from '../types.ts';
import { TrendingUp, DollarSign, Coins, Target, Sparkles, ShieldCheck } from 'lucide-react';

interface MarketMetricsBarProps {
  tokens: Token[];
  strategyPresetMatches: number;
  onApplyStrategyPreset: () => void;
  lang: 'vi' | 'en';
}

export const MarketMetricsBar: React.FC<MarketMetricsBarProps> = ({
  tokens,
  strategyPresetMatches,
  onApplyStrategyPreset,
  lang,
}) => {
  const totalVolume = tokens.reduce((sum, t) => sum + (t.volume24h || 0), 0);
  
  // Breakdown statistics
  const pumpTokensCount = tokens.filter(
    (t) => t.isPumpFun || t.launchSource === 'Pump.fun' || t.address.toLowerCase().endsWith('pump')
  ).length;
  const dexTokensCount = tokens.length - pumpTokensCount;

  const gainersCount = tokens.filter((t) => (t.priceChange24h || 0) > 0).length;

  const lockedLpCount = tokens.filter(
    (t) => t.isLpLocked === true && (t.lpLockedPercent || 0) >= 95
  ).length;
  
  // Find top gainer
  const topGainer = tokens.length > 0 
    ? [...tokens].sort((a, b) => (b.priceChange24h || 0) - (a.priceChange24h || 0))[0]
    : null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      
      {/* Metric 1: Total Tracked Memecoins (Thống kê số lượng token) */}
      <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3.5 flex items-center space-x-3 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all shadow-sm">
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
          <Coins className="w-5 h-5" />
        </div>
        <div className="truncate">
          <p className="text-[11px] font-medium text-slate-400">
            {lang === 'vi' ? 'Tổng Memecoin Đang Quét' : 'Total Tracked Tokens'}
          </p>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-base sm:text-xl font-black text-white tracking-tight">
              {tokens.length}
            </span>
            <span className="text-[11px] font-semibold text-blue-400">
              token
            </span>
          </div>
          <p className="text-[10px] text-slate-400 truncate">
            {pumpTokensCount} Pump.fun • {dexTokensCount} DEX
          </p>
        </div>
      </div>

      {/* Metric 2: Target Strategy Matches (Kèo săn mục tiêu) */}
      <div 
        onClick={onApplyStrategyPreset}
        className="bg-gradient-to-br from-emerald-950/30 via-slate-900/80 to-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl p-3.5 flex items-center justify-between backdrop-blur-sm relative overflow-hidden group cursor-pointer transition-all shadow-sm hover:shadow-emerald-500/10"
        title={lang === 'vi' ? 'Nhấp để lọc nhanh các token đạt tiêu chuẩn này' : 'Click to filter tokens matching this preset'}
      >
        <div className="flex items-center space-x-3 truncate">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 group-hover:scale-105 transition-transform flex-shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div className="truncate">
            <div className="flex items-center space-x-1.5">
              <p className="text-[11px] font-bold text-emerald-400">
                {lang === 'vi' ? 'Kèo Chuẩn Mục Tiêu' : 'Target Strategy'}
              </p>
              <span className="px-1.5 py-0.2 rounded text-[8px] font-black bg-emerald-400 text-slate-950 uppercase animate-pulse">
                HOT
              </span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base sm:text-xl font-black text-white tracking-tight">
                {strategyPresetMatches}
              </span>
              <span className="text-[11px] font-semibold text-emerald-300">
                {lang === 'vi' ? 'token khớp' : 'matched'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              Tuổi 3-10d • ATH 200-300K • ATL &ge;10K
            </p>
          </div>
        </div>
        <Sparkles className="w-4 h-4 text-emerald-400 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all flex-shrink-0 hidden sm:block" />
      </div>

      {/* Metric 3: Total 24h Volume */}
      <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3.5 flex items-center space-x-3 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all shadow-sm">
        <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
          <DollarSign className="w-5 h-5" />
        </div>
        <div className="truncate">
          <p className="text-[11px] font-medium text-slate-400">
            {lang === 'vi' ? 'Tổng Volume 24h' : 'Total 24h Volume'}
          </p>
          <p className="text-base sm:text-xl font-black text-white tracking-tight">
            ${(totalVolume / 1_000_000).toFixed(2)}M
          </p>
          <p className="text-[10px] text-slate-400 truncate">
            {gainersCount}/{tokens.length} {lang === 'vi' ? 'token tăng trưởng' : 'gainers'}
          </p>
        </div>
      </div>

      {/* Metric 4: Top Gainer 24h */}
      <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3.5 flex items-center space-x-3 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all shadow-sm">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div className="truncate">
          <p className="text-[11px] font-medium text-slate-400">
            {lang === 'vi' ? 'Tăng mạnh nhất 24h' : 'Top 24h Gainer'}
          </p>
          <div className="flex items-center space-x-1.5 truncate">
            <span className="text-base sm:text-lg font-black text-white truncate">
              ${topGainer ? topGainer.symbol : '---'}
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              +{topGainer ? Math.round(topGainer.priceChange24h) : 0}%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 truncate flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
            <span>{lockedLpCount} token khóa LP an toàn</span>
          </p>
        </div>
      </div>

    </div>
  );
};
