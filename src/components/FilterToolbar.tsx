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
  Users,
  Lock,
  ShieldCheck,
  Rocket,
  Flame,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  LaunchSourceFilter, 
  CelebrityFilter, 
  LpLockFilter, 
  UnruggableFilter 
} from '../types.ts';

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
  minAtlMarketCap: number;
  setMinAtlMarketCap: (val: number) => void;
  maxAtlMarketCap: number;
  setMaxAtlMarketCap: (val: number) => void;
  // Nguồn phát hành
  launchSourceFilter: LaunchSourceFilter;
  setLaunchSourceFilter: (val: LaunchSourceFilter) => void;
  // Tinh chỉnh tiêu chí thanh khoản
  lpLockFilter: LpLockFilter;
  setLpLockFilter: (val: LpLockFilter) => void;
  unruggableFilter: UnruggableFilter;
  setUnruggableFilter: (val: UnruggableFilter) => void;
  onApplyStrategyPreset: () => void;
  matchingPresetCount: number;
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
  minAtlMarketCap,
  setMinAtlMarketCap,
  maxAtlMarketCap,
  setMaxAtlMarketCap,
  launchSourceFilter,
  setLaunchSourceFilter,
  lpLockFilter,
  setLpLockFilter,
  unruggableFilter,
  setUnruggableFilter,
  onApplyStrategyPreset,
  matchingPresetCount,
  totalCount,
  filteredCount,
  lang,
  onResetFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if strategy preset is active: Age 3-10d, ATH 200K-300K, ATL min 10K (Không yêu cầu KOL)
  const isStrategyPresetActive = 
    minAgeDays === 3 && 
    maxAgeDays === 10 && 
    minAthMarketCap === 200_000 && 
    maxAthMarketCap === 300_000 && 
    minAtlMarketCap === 10_000;

  // Count active criteria
  const activeCount = [
    minMarketCap > 0 || maxMarketCap > 0,
    minVolume > 0,
    minLiquidity > 0,
    minAgeDays > 0 || maxAgeDays > 0,
    minAthMarketCap > 0 || maxAthMarketCap > 0,
    minAtlMarketCap > 0 || maxAtlMarketCap > 0,
    launchSourceFilter !== 'all',
    lpLockFilter !== 'all',
    unruggableFilter !== 'all',
  ].filter(Boolean).length;

  const formatShortNumber = (num: number) => {
    if (!num) return '$0';
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
    return `$${num}`;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3.5 backdrop-blur-md shadow-md space-y-3">
      
      {/* Quick Strategy Preset Banner: Tuổi 3-10d, ATH 200K-300K, ATL tối thiểu 10K (Bỏ KOL) */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-slate-900 border border-emerald-500/30 rounded-xl p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex-shrink-0">
            <Star className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
          </span>
          <div>
            <div className="flex items-center space-x-1.5 flex-wrap gap-1">
              <span className="text-xs font-bold text-white">
                {lang === 'vi' ? 'Chiến lược Săn Kèo: Tuổi 3-10 ngày • ATH $200K-$300K • ATL tối thiểu $10K' : 'Strategy Preset: Age 3-10d • ATH $200K-$300K • ATL Min $10K'}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-400 text-slate-950 uppercase">
                {matchingPresetCount} TOKEN KHỚP
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80">
              {lang === 'vi'
                ? `Lọc chuẩn on-chain: Tuổi 3 đến 10 ngày • Đỉnh ATH $200K-$300K • Đáy ATL tối thiểu $10,000 (Có ${matchingPresetCount} memecoin thỏa mãn)`
                : `On-chain filters: Age 3 to 10 days • ATH $200K-$300K • ATL min $10,000 (${matchingPresetCount} memecoins match)`}
            </p>
          </div>
        </div>

        <button
          onClick={onApplyStrategyPreset}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer flex-shrink-0 ${
            isStrategyPresetActive
              ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-300'
              : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isStrategyPresetActive ? (lang === 'vi' ? `✓ Đang lọc (${filteredCount} token)` : `✓ Active (${filteredCount})`) : (lang === 'vi' ? `Áp dụng ngay (${matchingPresetCount} token)` : `Apply (${matchingPresetCount})`)}</span>
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
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-300 font-medium">
              {lang === 'vi' ? 'Hiển thị:' : 'Showing:'}{' '}
              <strong className="text-emerald-400 font-black text-sm">{filteredCount}</strong> / {totalCount} token
            </span>
            {filteredCount < totalCount && (
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700/60 hidden sm:inline">
                {lang === 'vi' ? `(Lọc bỏ ${totalCount - filteredCount} token)` : `(Filtered ${totalCount - filteredCount})`}
              </span>
            )}
          </div>
        </div>

        {/* Active Filter Chips & Quick Reset */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs">
          {/* Tiêu chí tinh chỉnh: Thanh khoản đã khóa */}
          {lpLockFilter !== 'all' && (
            <span className={`px-2 py-0.5 rounded-lg border flex items-center gap-1 text-[11px] font-semibold ${
              lpLockFilter === 'locked_only' 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
            }`}>
              <Lock className="w-3 h-3" />
              {lpLockFilter === 'locked_only' 
                ? (lang === 'vi' ? 'LP Đã Khóa >=95%' : 'LP Locked >=95%') 
                : (lang === 'vi' ? 'LP Chưa Khóa (Rủi ro)' : 'Unlocked LP (Risky)')}
              <button onClick={() => setLpLockFilter('all')} className="hover:text-rose-400 ml-0.5 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Tiêu chí tinh chỉnh: Chống rút LP */}
          {unruggableFilter !== 'all' && (
            <span className={`px-2 py-0.5 rounded-lg border flex items-center gap-1 text-[11px] font-semibold ${
              unruggableFilter === 'unruggable_only' 
                ? 'bg-teal-500/20 border-teal-500/40 text-teal-300' 
                : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
            }`}>
              <ShieldCheck className="w-3 h-3" />
              {unruggableFilter === 'unruggable_only' 
                ? (lang === 'vi' ? 'Không thể rút LP (Unruggable)' : 'Unruggable Pool') 
                : (lang === 'vi' ? 'Nguy cơ rút LP' : 'Pull Risk')}
              <button onClick={() => setUnruggableFilter('all')} className="hover:text-rose-400 ml-0.5 cursor-pointer">
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
          {minAtlMarketCap > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 flex items-center gap-1 text-[11px] font-semibold">
              <TrendingDown className="w-3 h-3 text-rose-400" />
              ATL &ge; {formatShortNumber(minAtlMarketCap)}
              <button onClick={() => setMinAtlMarketCap(0)} className="hover:text-rose-400 ml-0.5 cursor-pointer">
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
          {launchSourceFilter !== 'all' && (
            <span className="px-2 py-0.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center gap-1 text-[11px] font-semibold">
              <Rocket className="w-3 h-3 text-indigo-400" />
              Nguồn: {launchSourceFilter === 'pumpfun' ? 'Pump.fun' : launchSourceFilter === 'moonshot' ? 'Moonshot' : launchSourceFilter === 'raydium' ? 'Raydium' : 'Meteora'}
              <button onClick={() => setLaunchSourceFilter('all')} className="hover:text-rose-400 ml-0.5 cursor-pointer">
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
          
          {/* SECTION 1: THỜI GIAN, ATH & ATL (Tuổi 3-10d, ATH 200K-300K, ATL tối thiểu 10K) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/70">
            
            {/* Age Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  {lang === 'vi' ? 'Tuổi Token (Age)' : 'Token Age (Days)'}
                </span>
                {(minAgeDays > 0 || maxAgeDays > 0) && (
                  <button onClick={() => { setMinAgeDays(0); setMaxAgeDays(0); }} className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer">
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
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
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
                  <button onClick={() => { setMinAthMarketCap(0); setMaxAthMarketCap(0); }} className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer">
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
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
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

            {/* ATL Market Cap: Hỗ trợ Min ATL tối thiểu 10K */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                  {lang === 'vi' ? 'Đáy Sập (ATL Floor)' : 'ATL Floor Market Cap'}
                </span>
                {(minAtlMarketCap > 0 || maxAtlMarketCap > 0) && (
                  <button onClick={() => { setMinAtlMarketCap(0); setMaxAtlMarketCap(0); }} className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => { setMinAtlMarketCap(10_000); setMaxAtlMarketCap(0); }}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer w-full text-center ${
                    minAtlMarketCap === 10_000
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  ATL tối thiểu &ge; $10K (Mục tiêu)
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Min ATL ($) (Tối thiểu)</label>
                  <input
                    type="number"
                    placeholder="Ví dụ: 10000"
                    value={minAtlMarketCap || ''}
                    onChange={(e) => setMinAtlMarketCap(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Max ATL ($)</label>
                  <input
                    type="number"
                    placeholder="Không giới hạn"
                    value={maxAtlMarketCap || ''}
                    onChange={(e) => setMaxAtlMarketCap(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 2: TINH CHỈNH AN TOÀN THANH KHOẢN & CHỐNG RÚT LP (ANTI-RUG) */}
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <span className="font-bold text-white flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'vi' ? 'TINH CHỈNH AN TOÀN THANH KHOẢN (ANTI-RUG & PULL-PROOF)' : 'REFINED LIQUIDITY SECURITY (ANTI-RUG)'}</span>
              </span>
              <span className="text-[11px] text-slate-400">
                {lang === 'vi' ? 'Phân loại chính xác giữa pool đã đốt LP vĩnh viễn và pool chưa khóa còn nguy cơ' : 'Accurately distinguish 100% burned pools from unlocked risky pools'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {/* Control 1: Nguồn phát hành token */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{lang === 'vi' ? 'Nguồn phát hành Token' : 'Launchpad Origin'}</span>
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'pumpfun', label: 'Pump.fun' },
                    { id: 'raydium', label: 'Raydium' },
                    { id: 'moonshot', label: 'Moonshot' },
                    { id: 'meteora', label: 'Meteora' },
                  ].map((src) => (
                    <button
                      key={src.id}
                      type="button"
                      onClick={() => setLaunchSourceFilter(src.id as any)}
                      className={`py-1.5 px-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center truncate ${
                        launchSourceFilter === src.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm ring-1 ring-indigo-400'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {src.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Thanh khoản đã khóa (Refined) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'vi' ? 'Trạng thái Khóa LP' : 'LP Lock Status'}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {lpLockFilter === 'locked_only' ? '>=95% Burned' : lpLockFilter === 'unlocked_risky' ? 'Chưa khóa' : 'Tất cả'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setLpLockFilter('all')}
                    className={`py-2 px-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center truncate ${
                      lpLockFilter === 'all'
                        ? 'bg-slate-800 text-white border border-slate-600'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {lang === 'vi' ? 'Tất cả' : 'All'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setLpLockFilter('locked_only')}
                    className={`py-2 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer text-center truncate ${
                      lpLockFilter === 'locked_only'
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/60 shadow-sm ring-1 ring-emerald-500/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    🔒 {lang === 'vi' ? 'Đã khóa >=95%' : 'Locked >=95%'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setLpLockFilter('unlocked_risky')}
                    className={`py-2 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer text-center truncate ${
                      lpLockFilter === 'unlocked_risky'
                        ? 'bg-rose-500/30 text-rose-300 border border-rose-500/60 shadow-sm ring-1 ring-rose-500/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    ⚠️ {lang === 'vi' ? 'Chưa khóa LP' : 'Unlocked'}
                  </button>
                </div>
              </div>

              {/* Control 3: Không thể rút thanh khoản (Refined) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    <span>{lang === 'vi' ? 'Chống rút LP (Unruggable)' : 'Unruggable Pool'}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {unruggableFilter === 'unruggable_only' ? '100% Unruggable' : unruggableFilter === 'pull_risk' ? 'Có rủi ro' : 'Tất cả'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setUnruggableFilter('all')}
                    className={`py-2 px-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center truncate ${
                      unruggableFilter === 'all'
                        ? 'bg-slate-800 text-white border border-slate-600'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {lang === 'vi' ? 'Tất cả' : 'All'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setUnruggableFilter('unruggable_only')}
                    className={`py-2 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer text-center truncate ${
                      unruggableFilter === 'unruggable_only'
                        ? 'bg-teal-500/30 text-teal-300 border border-teal-500/60 shadow-sm ring-1 ring-teal-500/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    🛡️ {lang === 'vi' ? 'Unruggable 100%' : 'Unruggable'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setUnruggableFilter('pull_risk')}
                    className={`py-2 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer text-center truncate ${
                      unruggableFilter === 'pull_risk'
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-500/60 shadow-sm ring-1 ring-amber-500/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    ⚠️ {lang === 'vi' ? 'Nguy cơ rút LP' : 'Pull Risk'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: THỊ TRƯỜNG CHUNG (Vốn hóa, Volume 24h, Thanh khoản) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Filter 1: Current Market Cap */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'vi' ? 'Vốn hóa Hiện tại (MC)' : 'Current Market Cap'}
                </span>
                {(minMarketCap > 0 || maxMarketCap > 0) && (
                  <button onClick={() => { setMinMarketCap(0); setMaxMarketCap(0); }} className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {[
                  { label: '<$50K', min: 0, max: 50_000 },
                  { label: '$50K-$300K', min: 50_000, max: 300_000 },
                  { label: '$300K-$1M', min: 300_000, max: 1_000_000 },
                  { label: '>$1M', min: 1_000_000, max: 0 },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setMinMarketCap(preset.min); setMaxMarketCap(preset.max); }}
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] whitespace-nowrap border border-slate-800 cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Min ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minMarketCap || ''}
                    onChange={(e) => setMinMarketCap(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Max ($)</label>
                  <input
                    type="number"
                    placeholder="Không giới hạn"
                    value={maxMarketCap || ''}
                    onChange={(e) => setMaxMarketCap(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Filter 2: Volume 24h */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                  {lang === 'vi' ? 'Khối lượng 24h (Volume)' : '24h Volume'}
                </span>
                {minVolume > 0 && (
                  <button onClick={() => setMinVolume(0)} className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {[
                  { label: '>$5K', min: 5_000 },
                  { label: '>$25K', min: 25_000 },
                  { label: '>$100K', min: 100_000 },
                  { label: '>$500K', min: 500_000 },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMinVolume(preset.min)}
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] whitespace-nowrap border border-slate-800 cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-[9px] text-slate-500 block mb-0.5">Volume 24h tối thiểu ($)</label>
                <input
                  type="number"
                  placeholder="Ví dụ: 25000"
                  value={minVolume || ''}
                  onChange={(e) => setMinVolume(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
                />
              </div>
            </div>

            {/* Filter 3: Liquidity USD */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-teal-400" />
                  {lang === 'vi' ? 'Thanh khoản (Liquidity)' : 'Liquidity (USD)'}
                </span>
                {minLiquidity > 0 && (
                  <button onClick={() => setMinLiquidity(0)} className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer">
                    {lang === 'vi' ? 'Mặc định' : 'Clear'}
                  </button>
                )}
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {[
                  { label: '>$5K', min: 5_000 },
                  { label: '>$10K', min: 10_000 },
                  { label: '>$50K', min: 50_000 },
                  { label: '>$200K', min: 200_000 },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMinLiquidity(preset.min)}
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] whitespace-nowrap border border-slate-800 cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-[9px] text-slate-500 block mb-0.5">Thanh khoản tối thiểu ($)</label>
                <input
                  type="number"
                  placeholder="Ví dụ: 10000"
                  value={minLiquidity || ''}
                  onChange={(e) => setMinLiquidity(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
                />
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
