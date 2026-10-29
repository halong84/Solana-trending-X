/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Token, AIScanResult, FilterCategory } from './types.ts';
import { Header } from './components/Header.tsx';
import { MarketMetricsBar } from './components/MarketMetricsBar.tsx';
import { TokenCard } from './components/TokenCard.tsx';
import { TokenModal } from './components/TokenModal.tsx';
import { AIScanReport } from './components/AIScanReport.tsx';
import { RiskSafetyGuide } from './components/RiskSafetyGuide.tsx';
import { FilterToolbar } from './components/FilterToolbar.tsx';
import { 
  Search, 
  Flame, 
  TrendingUp, 
  Zap, 
  Bot, 
  Dog, 
  Layers, 
  ArrowUpDown, 
  Filter,
  Radio,
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoadingTokens, setIsLoadingTokens] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'board' | 'ai-report' | 'safety'>('board');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'boost' | 'gainers' | 'volume' | 'marketcap'>('boost');

  // Advanced Filters: Market Cap, Volume, Liquidity
  const [minMarketCap, setMinMarketCap] = useState<number>(0);
  const [maxMarketCap, setMaxMarketCap] = useState<number>(0);
  const [minVolume, setMinVolume] = useState<number>(0);
  const [minLiquidity, setMinLiquidity] = useState<number>(0);

  // Specific Strategy: Age (3-10d), ATH (200K-300K), ATL (~10K), Celebrity/KOL on X
  const [minAgeDays, setMinAgeDays] = useState<number>(0);
  const [maxAgeDays, setMaxAgeDays] = useState<number>(0);
  const [minAthMarketCap, setMinAthMarketCap] = useState<number>(0);
  const [maxAthMarketCap, setMaxAthMarketCap] = useState<number>(0);
  const [maxAtlMarketCap, setMaxAtlMarketCap] = useState<number>(0);
  const [onlyCelebrity, setOnlyCelebrity] = useState<boolean>(false);

  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  // AI Scan state
  const [scanResult, setScanResult] = useState<AIScanResult | null>(null);
  const [isLoadingAIScan, setIsLoadingAIScan] = useState<boolean>(false);

  // Fetch trending tokens from backend API
  const fetchTrendingTokens = async () => {
    setIsLoadingTokens(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/trending');
      if (!res.ok) throw new Error('Không thể tải danh sách memecoin');
      const data = await res.json();
      setTokens(data.tokens || []);
      setLastUpdated(data.updatedAt || new Date().toISOString());
    } catch (err: any) {
      console.error('Fetch trending tokens error:', err);
      setErrorMsg(err.message || 'Lỗi khi tải dữ liệu thị trường');
    } finally {
      setIsLoadingTokens(false);
    }
  };

  // Fetch AI X scan report
  const fetchAIScan = async () => {
    setIsLoadingAIScan(true);
    try {
      const res = await fetch('/api/ai-scan-x', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Lỗi khi quét thông tin từ X');
      const data = await res.json();
      setScanResult(data);
    } catch (err: any) {
      console.error('Fetch AI scan error:', err);
    } finally {
      setIsLoadingAIScan(false);
    }
  };

  useEffect(() => {
    fetchTrendingTokens();
    fetchAIScan();

    // Auto-refresh tokens every 60 seconds
    const interval = setInterval(() => {
      fetchTrendingTokens();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filter and Sort tokens
  const filteredTokens = useMemo(() => {
    let result = [...tokens];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.symbol.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.address.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filterCategory === 'celebrity-kol') {
      result = result.filter((t) => t.isCelebrityMeta);
    } else if (filterCategory === 'hot-x') {
      result = result.filter((t) => t.isBoosted || t.xMentionTrend === 'Viral Leader');
    } else if (filterCategory === 'gainers') {
      result = result.filter((t) => (t.priceChange24h || 0) > 15);
    } else if (filterCategory === 'pumpfun') {
      result = result.filter((t) => t.isPumpFun);
    } else if (filterCategory === 'ai-agents') {
      result = result.filter(
        (t) =>
          t.category.toLowerCase().includes('ai') ||
          t.name.toLowerCase().includes('ai') ||
          ['FARTCOIN', 'AI16Z', 'GRIFFAIN', 'GOAT', 'ACT', 'SWARMS', 'ZEREBRO'].includes(t.symbol)
      );
    } else if (filterCategory === 'culture-animals') {
      result = result.filter(
        (t) =>
          t.category.toLowerCase().includes('animal') ||
          t.category.toLowerCase().includes('culture') ||
          t.category.toLowerCase().includes('cat') ||
          t.category.toLowerCase().includes('dog') ||
          ['MOODENG', 'PNUT', 'CHILLGUY', 'POPCAT', 'WIF', 'BONK'].includes(t.symbol)
      );
    }

    // Age in Days filter (e.g. 3 to 10 days)
    if (minAgeDays > 0) {
      result = result.filter((t) => (t.ageDays || 0) >= minAgeDays);
    }
    if (maxAgeDays > 0) {
      result = result.filter((t) => (t.ageDays || 0) <= maxAgeDays);
    }

    // ATH Market Cap filter (e.g. $200K - $300K)
    if (minAthMarketCap > 0) {
      result = result.filter((t) => (t.athMarketCapUsd || 0) >= minAthMarketCap);
    }
    if (maxAthMarketCap > 0) {
      result = result.filter((t) => (t.athMarketCapUsd || 0) <= maxAthMarketCap);
    }

    // ATL Floor Market Cap filter (e.g. <= $15K (~10K))
    if (maxAtlMarketCap > 0) {
      result = result.filter((t) => (t.atlMarketCapUsd || 0) <= maxAtlMarketCap);
    }

    // Only Celebrity / KOL on X filter
    if (onlyCelebrity) {
      result = result.filter((t) => t.isCelebrityMeta);
    }

    // Market Cap filter
    if (minMarketCap > 0) {
      result = result.filter((t) => (t.marketCapUsd || 0) >= minMarketCap);
    }
    if (maxMarketCap > 0) {
      result = result.filter((t) => (t.marketCapUsd || 0) <= maxMarketCap);
    }

    // Volume 24h filter
    if (minVolume > 0) {
      result = result.filter((t) => (t.volume24h || 0) >= minVolume);
    }

    // Liquidity filter
    if (minLiquidity > 0) {
      result = result.filter((t) => (t.liquidityUsd || 0) >= minLiquidity);
    }

    // Sort order
    if (sortBy === 'gainers') {
      result.sort((a, b) => (b.priceChange24h || 0) - (a.priceChange24h || 0));
    } else if (sortBy === 'volume') {
      result.sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0));
    } else if (sortBy === 'marketcap') {
      result.sort((a, b) => (b.marketCapUsd || 0) - (a.marketCapUsd || 0));
    } else {
      // Default: Boost score and trending status
      result.sort((a, b) => (b.boostScore || 0) - (a.boostScore || 0));
    }

    return result;
  }, [
    tokens, 
    searchQuery, 
    filterCategory, 
    sortBy, 
    minMarketCap, 
    maxMarketCap, 
    minVolume, 
    minLiquidity,
    minAgeDays,
    maxAgeDays,
    minAthMarketCap,
    maxAthMarketCap,
    maxAtlMarketCap,
    onlyCelebrity
  ]);

  const handleApplyCelebrityStrategyPreset = () => {
    setMinAgeDays(3);
    setMaxAgeDays(10);
    setMinAthMarketCap(200_000);
    setMaxAthMarketCap(300_000);
    setMaxAtlMarketCap(15_000);
    setOnlyCelebrity(true);
    setFilterCategory('celebrity-kol');
  };

  const handleResetFilters = () => {
    setMinMarketCap(0);
    setMaxMarketCap(0);
    setMinVolume(0);
    setMinLiquidity(0);
    setMinAgeDays(0);
    setMaxAgeDays(0);
    setMinAthMarketCap(0);
    setMaxAthMarketCap(0);
    setMaxAtlMarketCap(0);
    setOnlyCelebrity(false);
    setFilterCategory('all');
    setSearchQuery('');
  };

  const handleFilterByTicker = (ticker: string) => {
    setSearchQuery(ticker);
    setActiveTab('board');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Header
        lastUpdated={lastUpdated}
        isLoading={isLoadingTokens}
        onRefresh={fetchTrendingTokens}
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Market Metrics Ticker */}
        <MarketMetricsBar tokens={tokens} lang={lang} />

        {/* View 1: Main Token Board */}
        {activeTab === 'board' && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 backdrop-blur-md">
              
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={lang === 'vi' ? 'Tìm theo $TICKER, Tên hoặc Contract Address (CA)...' : 'Search by $TICKER, Name or CA...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'vi' ? 'Sắp xếp:' : 'Sort:'}</span>
                </span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="boost">{lang === 'vi' ? '🔥 Độ Hot trên X (Trending)' : '🔥 Trending on X'}</option>
                  <option value="gainers">{lang === 'vi' ? '🚀 Tăng mạnh nhất 24h' : '🚀 Top 24h Gainers'}</option>
                  <option value="volume">{lang === 'vi' ? '📊 Volume 24h lớn nhất' : '📊 Highest 24h Volume'}</option>
                  <option value="marketcap">{lang === 'vi' ? '💎 Vốn hóa (Market Cap)' : '💎 Market Cap'}</option>
                </select>
              </div>

            </div>

            {/* Advanced Filters Toolbar (Market Cap, Volume, Liquidity, Age, ATH, ATL, Celebrity) */}
            <FilterToolbar
              minMarketCap={minMarketCap}
              setMinMarketCap={setMinMarketCap}
              maxMarketCap={maxMarketCap}
              setMaxMarketCap={setMaxMarketCap}
              minVolume={minVolume}
              setMinVolume={setMinVolume}
              minLiquidity={minLiquidity}
              setMinLiquidity={setMinLiquidity}
              minAgeDays={minAgeDays}
              setMinAgeDays={setMinAgeDays}
              maxAgeDays={maxAgeDays}
              setMaxAgeDays={setMaxAgeDays}
              minAthMarketCap={minAthMarketCap}
              setMinAthMarketCap={setMinAthMarketCap}
              maxAthMarketCap={maxAthMarketCap}
              setMaxAthMarketCap={setMaxAthMarketCap}
              maxAtlMarketCap={maxAtlMarketCap}
              setMaxAtlMarketCap={setMaxAtlMarketCap}
              onlyCelebrity={onlyCelebrity}
              setOnlyCelebrity={setOnlyCelebrity}
              onApplyCelebrityStrategyPreset={handleApplyCelebrityStrategyPreset}
              totalCount={tokens.length}
              filteredCount={filteredTokens.length}
              lang={lang}
              onResetFilters={handleResetFilters}
            />

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  filterCategory === 'all' && !onlyCelebrity
                    ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Tất cả memecoin' : 'All Memecoins'}</span>
                <span className="text-[10px] bg-slate-800/80 px-1.5 py-0.2 rounded-full text-slate-400">{tokens.length}</span>
              </button>

              {/* Special Celebrity / KOL Strategy Pill */}
              <button
                onClick={() => {
                  if (filterCategory === 'celebrity-kol') {
                    handleResetFilters();
                  } else {
                    handleApplyCelebrityStrategyPreset();
                  }
                }}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  filterCategory === 'celebrity-kol' || onlyCelebrity
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-300'
                    : 'bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30'
                }`}
              >
                <span>👑</span>
                <span>{lang === 'vi' ? 'Kèo KOL X (Tuổi 3-10d | ATH 200K-300K | ATL 10K)' : 'X KOL Meta (3-10d | ATH 200K-300K | ATL 10K)'}</span>
                <span className="text-[10px] bg-slate-950/40 text-amber-950 px-1.5 py-0.2 rounded-full font-black">
                  {tokens.filter(t => t.isCelebrityMeta).length}
                </span>
              </button>

              <button
                onClick={() => setFilterCategory('hot-x')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  filterCategory === 'hot-x'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'vi' ? 'Viral & Hot trên X' : 'Trending on X'}</span>
              </button>

              <button
                onClick={() => setFilterCategory('gainers')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  filterCategory === 'gainers'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'vi' ? 'Tăng > 15% (24h)' : '24h Gainers > 15%'}</span>
              </button>

              <button
                onClick={() => setFilterCategory('pumpfun')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  filterCategory === 'pumpfun'
                    ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-teal-400" />
                <span>Pump.fun Trenches</span>
              </button>

              <button
                onClick={() => setFilterCategory('ai-agents')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  filterCategory === 'ai-agents'
                    ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span>{lang === 'vi' ? 'Meta AI Agents' : 'AI Agent Meta'}</span>
              </button>

              <button
                onClick={() => setFilterCategory('culture-animals')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  filterCategory === 'culture-animals'
                    ? 'bg-pink-500/20 text-pink-300 font-bold border border-pink-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Dog className="w-3.5 h-3.5 text-pink-400" />
                <span>{lang === 'vi' ? 'Động vật & Linh vật' : 'Animals & Mascot Cults'}</span>
              </button>
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="bg-rose-950/40 border border-rose-500/30 text-rose-300 p-4 rounded-2xl text-xs flex items-center justify-between">
                <span>{errorMsg}</span>
                <button
                  onClick={fetchTrendingTokens}
                  className="px-3 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold cursor-pointer"
                >
                  {lang === 'vi' ? 'Thử lại' : 'Retry'}
                </button>
              </div>
            )}

            {/* Token Grid */}
            {isLoadingTokens && tokens.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-64 rounded-2xl bg-slate-900/40 border border-slate-800/60 animate-pulse p-4" />
                ))}
              </div>
            ) : filteredTokens.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTokens.map((token) => (
                  <TokenCard
                    key={token.id}
                    token={token}
                    lang={lang}
                    onSelectToken={setSelectedToken}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                <Search className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="text-base font-semibold text-white">
                  {lang === 'vi' ? 'Không tìm thấy memecoin phù hợp' : 'No memecoins matched your filter'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'vi' ? 'Hãy thử tìm kiếm từ khóa khác hoặc bỏ bộ lọc hiện tại.' : 'Try a different keyword or reset filters.'}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-emerald-400 font-medium transition-colors cursor-pointer"
                >
                  {lang === 'vi' ? 'Đặt lại toàn bộ bộ lọc' : 'Reset All Filters'}
                </button>
              </div>
            )}

          </div>
        )}

        {/* View 2: AI Scan Report Tab */}
        {activeTab === 'ai-report' && (
          <AIScanReport
            scanResult={scanResult}
            isLoading={isLoadingAIScan}
            onRescan={fetchAIScan}
            lang={lang}
            onFilterByTicker={handleFilterByTicker}
          />
        )}

        {/* View 3: Safety and DYOR Guide */}
        {activeTab === 'safety' && <RiskSafetyGuide lang={lang} />}

      </main>

      {/* Token Details Modal */}
      {selectedToken && (
        <TokenModal
          token={selectedToken}
          onClose={() => setSelectedToken(null)}
          lang={lang}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 mt-12 py-6 text-center text-xs text-slate-500 space-y-2">
        <p>
          ⚡ Solana X Trend Radar • Dữ liệu cập nhật trực tiếp từ DexScreener & Twitter (X) • AI phân tích xu hướng 24h
        </p>
        <p className="text-[11px] text-slate-600 max-w-xl mx-auto px-4">
          Tuyên bố miễn trừ trách nhiệm (DYOR): Memecoin có mức độ biến động cực lớn và tiềm ẩn rủi ro mất 100% vốn. Thông tin trong ứng dụng chỉ mang tính chất tham khảo số liệu on-chain và mạng xã hội, không phải là lời khuyên tài chính.
        </p>
      </footer>

    </div>
  );
}
