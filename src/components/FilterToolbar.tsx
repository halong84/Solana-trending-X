import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, DollarSign, BarChart3, Droplets, RotateCcw } from 'lucide-react';

interface FilterToolbarProps {
  minMarketCap: number;
  setMinMarketCap: (val: number) => void;
  maxMarketCap: number;
  setMaxMarketCap: (val: number) => void;
  minVolume: number;
  setMinVolume: (val: number) => void;
  minLiquidity: number;
  setMinLiquidity: (val: number) => void;
  totalCount: number;
  filteredCount: number;
  lang: 'vi' | 'en';
  onResetFilters: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  minMarketCap,
  setMinMarketCap,
  maxMarketCap,
  setMaxMarketCap,
  minVolume,
  setMinVolume,
  minLiquidity,
  setMinLiquidity,
  totalCount,
  filteredCount,
  lang,
  onResetFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Count active criteria
  const activeCount = [
    minMarketCap > 0 || maxMarketCap > 0,
    minVolume > 0,
    minLiquidity > 0,
  ].filter(Boolean).length;

  const formatShortNumber = (num: number) => {
    if (num >= 1_000_000) return `$${num / 1_000_000}M`;
    if (num >= 1_000) return `$${num / 1_000}K`;
    return `$${num}`;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3.5 backdrop-blur-md shadow-md space-y-3">
      {/* Top Header Row of Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeCount > 0 || isOpen
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'vi' ? 'Bộ lọc nâng cao' : 'Advanced Filters'}</span>
            {activeCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center ml-1">
                {activeCount}
              </span>
            )}
            {isOpen ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
          </button>

          {/* Result counter indicator */}
          <span className="text-xs text-slate-400">
            {lang === 'vi' ? 'Hiển thị:' : 'Showing:'}{' '}
            <strong className="text-emerald-400 font-bold">{filteredCount}</strong> / {totalCount} tokens
          </span>
        </div>

        {/* Active Filter Chips & Quick Reset */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs">
          {minMarketCap > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 text-[11px]">
              MC &gt; {formatShortNumber(minMarketCap)}
              <button onClick={() => setMinMarketCap(0)} className="hover:text-rose-400 ml-0.5 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {maxMarketCap > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 text-[11px]">
              MC &lt; {formatShortNumber(maxMarketCap)}
              <button onClick={() => setMaxMarketCap(0)} className="hover:text-rose-400 ml-0.5 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {minVolume > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 text-[11px]">
              Vol &gt; {formatShortNumber(minVolume)}
              <button onClick={() => setMinVolume(0)} className="hover:text-rose-400 ml-0.5 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {minLiquidity > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 text-[11px]">
              Liq &gt; {formatShortNumber(minLiquidity)}
              <button onClick={() => setMinLiquidity(0)} className="hover:text-rose-400 ml-0.5 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {activeCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 ml-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{lang === 'vi' ? 'Đặt lại' : 'Reset'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Filter Panel */}
      {isOpen && (
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Filter 1: Market Cap */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'vi' ? 'Vốn hóa (Market Cap)' : 'Market Cap'}
              </span>
              {(minMarketCap > 0 || maxMarketCap > 0) && (
                <button
                  onClick={() => { setMinMarketCap(0); setMaxMarketCap(0); }}
                  className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {lang === 'vi' ? 'Mặc định' : 'Clear'}
                </button>
              )}
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => { setMinMarketCap(0); setMaxMarketCap(0); }}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minMarketCap === 0 && maxMarketCap === 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {lang === 'vi' ? 'Tất cả' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => { setMinMarketCap(0); setMaxMarketCap(100_000); }}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minMarketCap === 0 && maxMarketCap === 100_000
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                &lt; $100K (Trench)
              </button>
              <button
                type="button"
                onClick={() => { setMinMarketCap(100_000); setMaxMarketCap(1_000_000); }}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minMarketCap === 100_000 && maxMarketCap === 1_000_000
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                $100K - $1M
              </button>
              <button
                type="button"
                onClick={() => { setMinMarketCap(1_000_000); setMaxMarketCap(10_000_000); }}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minMarketCap === 1_000_000 && maxMarketCap === 10_000_000
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                $1M - $10M
              </button>
              <button
                type="button"
                onClick={() => { setMinMarketCap(10_000_000); setMaxMarketCap(0); }}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minMarketCap === 10_000_000 && maxMarketCap === 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                &gt; $10M (Bluechip)
              </button>
            </div>

            {/* Custom Min/Max Inputs */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">{lang === 'vi' ? 'Tối thiểu ($)' : 'Min ($)'}</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minMarketCap || ''}
                  onChange={(e) => setMinMarketCap(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">{lang === 'vi' ? 'Tối đa ($)' : 'Max ($)'}</label>
                <input
                  type="number"
                  placeholder={lang === 'vi' ? 'Không giới hạn' : 'No limit'}
                  value={maxMarketCap || ''}
                  onChange={(e) => setMaxMarketCap(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Filter 2: 24h Volume */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
                {lang === 'vi' ? 'Volume giao dịch (24h)' : '24h Trading Volume'}
              </span>
              {minVolume > 0 && (
                <button
                  onClick={() => setMinVolume(0)}
                  className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {lang === 'vi' ? 'Mặc định' : 'Clear'}
                </button>
              )}
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setMinVolume(0)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minVolume === 0
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {lang === 'vi' ? 'Tất cả' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setMinVolume(10_000)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minVolume === 10_000
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                &gt; $10K
              </button>
              <button
                type="button"
                onClick={() => setMinVolume(50_000)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minVolume === 50_000
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                &gt; $50K
              </button>
              <button
                type="button"
                onClick={() => setMinVolume(250_000)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minVolume === 250_000
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                &gt; $250K
              </button>
              <button
                type="button"
                onClick={() => setMinVolume(1_000_000)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minVolume === 1_000_000
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                &gt; $1M+
              </button>
            </div>

            {/* Custom Min Input */}
            <div className="pt-1">
              <label className="text-[10px] text-slate-400 block mb-0.5">{lang === 'vi' ? 'Khối lượng tối thiểu ($)' : 'Min Volume ($)'}</label>
              <input
                type="number"
                placeholder="0"
                value={minVolume || ''}
                onChange={(e) => setMinVolume(Number(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Filter 3: Liquidity */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-teal-400" />
                {lang === 'vi' ? 'Thanh khoản (Liquidity)' : 'Pool Liquidity'}
              </span>
              {minLiquidity > 0 && (
                <button
                  onClick={() => setMinLiquidity(0)}
                  className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {lang === 'vi' ? 'Mặc định' : 'Clear'}
                </button>
              )}
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setMinLiquidity(0)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minLiquidity === 0
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {lang === 'vi' ? 'Tất cả' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setMinLiquidity(10_000)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minLiquidity === 10_000
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                &gt; $10K
              </button>
              <button
                type="button"
                onClick={() => setMinLiquidity(50_000)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minLiquidity === 50_000
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                &gt; $50K (An toàn)
              </button>
              <button
                type="button"
                onClick={() => setMinLiquidity(100_000)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  minLiquidity === 100_000
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                &gt; $100K+ (Sâu)
              </button>
            </div>

            {/* Custom Min Input */}
            <div className="pt-1">
              <label className="text-[10px] text-slate-400 block mb-0.5">{lang === 'vi' ? 'Thanh khoản tối thiểu ($)' : 'Min Liquidity ($)'}</label>
              <input
                type="number"
                placeholder="0"
                value={minLiquidity || ''}
                onChange={(e) => setMinLiquidity(Number(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
