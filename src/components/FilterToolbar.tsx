import React, { useState } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  BarChart3, 
  Droplets, 
  RotateCcw, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Star,
  Users
} from 'lucide-react';

interface FilterToolbarProps {
  minMarketCap: number;
  setMinMarketCap: (val: number) => void;
  maxMarketCap: number;
  setMaxMarketCap: (val: number) => void;
  minVolume: number;
  setMinVolume: (val: number) => void;
  minLiquidity: number;
  setMinLiquidity: (val: number) => void;
  minAgeDays: number;
  setMinAgeDays: (val: number) => void;
  maxAgeDays: number;
  setMaxAgeDays: (val: number) => void;
  minAthMarketCap: number;
  setMinAthMarketCap: (val: number) => void;
  maxAthMarketCap: number;
  setMaxAthMarketCap: (val: number) => void;
  maxAtlMarketCap: number;
  setMaxAtlMarketCap: (val: number) => void;
  onlyCelebrity: boolean;
  setOnlyCelebrity: (val: boolean) => void;
  onApplyCelebrityStrategyPreset: () => void;
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
  minAgeDays,
  setMinAgeDays,
  maxAgeDays,
  setMaxAgeDays,
  minAthMarketCap,
  setMinAthMarketCap,
  maxAthMarketCap,
  setMaxAthMarketCap,
  maxAtlMarketCap,
  setMaxAtlMarketCap,
  onlyCelebrity,
  setOnlyCelebrity,
  onApplyCelebrityStrategyPreset,
  totalCount,
  filteredCount,
  lang,
  onResetFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if celebrity preset is active
  const isCelebrityPresetActive = 
    minAgeDays === 3 && 
    maxAgeDays === 10 && 
    minAthMarketCap === 200_000 && 
    maxAthMarketCap === 300_000 && 
    maxAtlMarketCap === 15_000 && 
    onlyCelebrity;

  // Count active criteria
  const activeCount = [
    minMarketCap > 0 || maxMarketCap > 0,
    minVolume > 0,
    minLiquidity > 0,
    minAgeDays > 0 || maxAgeDays > 0,
    minAthMarketCap > 0 || maxAthMarketCap > 0,
    maxAtlMarketCap > 0,
    onlyCelebrity,
  ].filter(Boolean).length;

  const formatShortNumber = (num: number) => {
    if (!num) return '$0';
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
    return `$${num}`;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3.5 backdrop-blur-md shadow-md space-y-3">
      
      {/* Quick Strategy Preset Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-slate-900 border border-amber-500/30 rounded-xl p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400/30" />
          </span>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-white">
                {lang === 'vi' ? 'Chiến lược Săn Kèo KOL / Celebrity trên X' : 'X Celebrity / KOL Meta Scanner'}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-amber-400 text-slate-950 uppercase">
                HOT
              </span>
            </div>
            <p className="text-[11px] text-amber-200/80">
              {lang === 'vi'
                ? 'Lọc: Tuổi 3-10 ngày • ATH $200K-$300K • ATL đáy ~$10K • Liên quan Người nổi tiếng trên X'
                : 'Filter: Age 3-10d • ATH $200K-$300K • ATL floor ~$10K • Celebrity / KOL on X'}
            </p>
          </div>
        </div>

        <button
          onClick={onApplyCelebrityStrategyPreset}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer flex-shrink-0 ${
            isCelebrityPresetActive
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30 ring-2 ring-amber-300'
              : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isCelebrityPresetActive ? (lang === 'vi' ? '✓ Đang bật bộ lọc này' : '✓ Active') : (lang === 'vi' ? 'Áp dụng bộ lọc này ngay' : 'Apply Preset')}</span>
        </button>
      </div>

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
            <span>{lang === 'vi' ? 'Tùy chỉnh thông số lọc' : 'Custom Filters'}</span>
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
          {onlyCelebrity && (
            <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center gap-1 text-[11px] font-semibold">
              <Users className="w-3 h-3" />
              {lang === 'vi' ? 'KOL / Celeb X' : 'Celeb X'}
              <button onClick={() => setOnlyCelebrity(false)} className="hover:text-rose-400 ml-0.5 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(minAgeDays > 0 || maxAgeDays > 0) && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-purple-400" />
              {minAgeDays > 0 && maxAgeDays > 0
                ? `${minAgeDays}-${maxAgeDays}d`
                : minAgeDays > 0
                ? `>${minAgeDays}d`
                : `<${maxAgeDays}d`}
              <button onClick={() => { setMinAgeDays(0); setMaxAgeDays(0); }} className="hover:text-rose-400 ml-0.5 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(minAthMarketCap > 0 || maxAthMarketCap > 0) && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 text-[11px]">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              ATH {formatShortNumber(minAthMarketCap)}-{formatShortNumber(maxAthMarketCap)}
              <button onClick={() => { setMinAthMarketCap(0); setMaxAthMarketCap(0); }} className="hover:text-rose-400 ml-0.5 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {maxAtlMarketCap > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 text-[11px]">
              <TrendingDown className="w-3 h-3 text-rose-400" />
              ATL &le; {formatShortNumber(maxAtlMarketCap)}
              <button onClick={() => setMaxAtlMarketCap(0)} className="hover:text-rose-400 ml-0.5 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {minMarketCap > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 text-[11px]">
              MC &gt; {formatShortNumber(minMarketCap)}
              <button onClick={() => setMinMarketCap(0)} className="hover:text-rose-400 ml-0.5 cursor-pointer">
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
              <span>{lang === 'vi' ? 'Đặt lại toàn bộ' : 'Reset All'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Filter Panel */}
      {isOpen && (
        <div className="pt-3 border-t border-slate-800/80 space-y-4 text-xs">
          
          {/* Row 1: Special Strategy Controls (Age, ATH, ATL, Celebrity Toggle) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/70">
            
            {/* Age Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  {lang === 'vi' ? 'Tuổi Token (Age)' : 'Token Age (Days)'}
                </span>
                {(minAgeDays > 0 || maxAgeDays > 0) && (
                  <button onClick={() => { setMinAgeDays(0); setMaxAgeDays(0); }} className="text-[10px] text-slate-400 hover:text-slate-200">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => { setMinAgeDays(3); setMaxAgeDays(10); }}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer w-full text-center ${
                    minAgeDays === 3 && maxAgeDays === 10
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  3 - 10 ngày (Mục tiêu)
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Min ngày</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minAgeDays || ''}
                    onChange={(e) => setMinAgeDays(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Max ngày</label>
                  <input
                    type="number"
                    placeholder="Không giới hạn"
                    value={maxAgeDays || ''}
                    onChange={(e) => setMaxAgeDays(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* ATH Market Cap */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'vi' ? 'Vốn hóa Đỉnh (ATH)' : 'ATH Market Cap'}
                </span>
                {(minAthMarketCap > 0 || maxAthMarketCap > 0) && (
                  <button onClick={() => { setMinAthMarketCap(0); setMaxAthMarketCap(0); }} className="text-[10px] text-slate-400 hover:text-slate-200">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => { setMinAthMarketCap(200_000); setMaxAthMarketCap(300_000); }}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer w-full text-center ${
                    minAthMarketCap === 200_000 && maxAthMarketCap === 300_000
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  $200K - $300K (Mục tiêu)
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Min ATH ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minAthMarketCap || ''}
                    onChange={(e) => setMinAthMarketCap(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Max ATH ($)</label>
                  <input
                    type="number"
                    placeholder="Không giới hạn"
                    value={maxAthMarketCap || ''}
                    onChange={(e) => setMaxAthMarketCap(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* ATL Market Cap */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                  {lang === 'vi' ? 'Đáy Sập (ATL Floor)' : 'ATL Floor Market Cap'}
                </span>
                {maxAtlMarketCap > 0 && (
                  <button onClick={() => setMaxAtlMarketCap(0)} className="text-[10px] text-slate-400 hover:text-slate-200">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setMaxAtlMarketCap(15_000)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer w-full text-center ${
                    maxAtlMarketCap === 15_000
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  Đáy &le; $15K (~10K)
                </button>
              </div>
              <div>
                <label className="text-[9px] text-slate-500 block mb-0.5">Đáy ATL tối đa ($)</label>
                <input
                  type="number"
                  placeholder="Ví dụ: 15000"
                  value={maxAtlMarketCap || ''}
                  onChange={(e) => setMaxAtlMarketCap(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                />
              </div>
            </div>

            {/* Celebrity Meta Toggle */}
            <div className="space-y-2 flex flex-col justify-between">
              <div>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  {lang === 'vi' ? 'Người nổi tiếng / KOL X' : 'Celebrity / KOL on X'}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">
                  {lang === 'vi'
                    ? 'Chỉ hiển thị các token do người nổi tiếng/KOL tạo hoặc lấy cảm hứng trực tiếp từ X (Elon, Trump, Tate, Portnoy, Speed...).'
                    : 'Show only tokens created by or inspired by viral X celebrities & KOLs.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOnlyCelebrity(!onlyCelebrity)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  onlyCelebrity
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{onlyCelebrity ? '✓ Đang lọc: Chỉ KOL & Người nổi tiếng' : 'Bật: Chỉ KOL & Người nổi tiếng'}</span>
              </button>
            </div>

          </div>

          {/* Row 2: Standard Liquidity & Volume Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Filter 1: Current Market Cap */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'vi' ? 'Vốn hóa Hiện tại (MC)' : 'Current Market Cap'}
                </span>
                {(minMarketCap > 0 || maxMarketCap > 0) && (
                  <button onClick={() => { setMinMarketCap(0); setMaxMarketCap(0); }} className="text-[10px] text-slate-400 hover:text-slate-200">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">{lang === 'vi' ? 'Tối thiểu ($)' : 'Min ($)'}</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minMarketCap || ''}
                    onChange={(e) => setMinMarketCap(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">{lang === 'vi' ? 'Tối đa ($)' : 'Max ($)'}</label>
                  <input
                    type="number"
                    placeholder="Không giới hạn"
                    value={maxMarketCap || ''}
                    onChange={(e) => setMaxMarketCap(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
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
                  <button onClick={() => setMinVolume(0)} className="text-[10px] text-slate-400 hover:text-slate-200">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">{lang === 'vi' ? 'Khối lượng tối thiểu ($)' : 'Min Volume ($)'}</label>
                <input
                  type="number"
                  placeholder="Ví dụ: 20000"
                  value={minVolume || ''}
                  onChange={(e) => setMinVolume(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
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
                  <button onClick={() => setMinLiquidity(0)} className="text-[10px] text-slate-400 hover:text-slate-200">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">{lang === 'vi' ? 'Thanh khoản tối thiểu ($)' : 'Min Liquidity ($)'}</label>
                <input
                  type="number"
                  placeholder="Ví dụ: 10000"
                  value={minLiquidity || ''}
                  onChange={(e) => setMinLiquidity(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                />
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
