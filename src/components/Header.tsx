import React from 'react';
import { RefreshCw, Radio, Sparkles, Twitter, ExternalLink, Download } from 'lucide-react';

interface HeaderProps {
  lastUpdated: string | null;
  isLoading: boolean;
  onRefresh: () => void;
  lang: 'vi' | 'en';
  setLang: (l: 'vi' | 'en') => void;
  activeTab: 'board' | 'ai-report' | 'safety';
  setActiveTab: (tab: 'board' | 'ai-report' | 'safety') => void;
}

export const Header: React.FC<HeaderProps> = ({
  lastUpdated,
  isLoading,
  onRefresh,
  lang,
  setLang,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand & Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-purple-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <span className="text-xl font-black text-slate-950 tracking-tighter">⚡X</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  Solana X Radar
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
                  24H TRENDING
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {lang === 'vi' 
                  ? 'Theo dõi Memecoin Solana viral trên Twitter (X) & DEX' 
                  : 'Solana Memecoin Viral Tracker on X (Twitter) & DEX'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'board'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>{lang === 'vi' ? 'Bảng Memecoin' : 'Tokens'}</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-report')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'ai-report'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="flex items-center gap-1">
                {lang === 'vi' ? 'Quét X (AI)' : 'X Radar (AI)'}
                <span className="hidden md:inline-block px-1 py-0.2 text-[9px] bg-purple-400/20 text-purple-300 rounded font-bold">
                  HOT
                </span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'safety'
                  ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{lang === 'vi' ? 'An toàn / DYOR' : 'Safety'}</span>
            </button>
          </nav>

          {/* Actions: Download Source, Refresh & Language */}
          <div className="flex items-center space-x-2">
            <a
              href="/api/download-source"
              download="solana-x-trend-radar-source.tar.gz"
              title={lang === 'vi' ? 'Tải bộ mã nguồn (.tar.gz)' : 'Download Source Code (.tar.gz)'}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">
                {lang === 'vi' ? 'Tải mã nguồn' : 'Download Code'}
              </span>
            </a>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              title={lang === 'vi' ? 'Làm mới dữ liệu 24h' : 'Refresh 24h data'}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
              <span className="hidden md:inline">
                {isLoading ? (lang === 'vi' ? 'Đang tải...' : 'Syncing...') : (lang === 'vi' ? 'Làm mới' : 'Refresh')}
              </span>
            </button>

            {/* Language toggle */}
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => setLang('vi')}
                className={`px-2 py-1 rounded transition-colors font-medium ${
                  lang === 'vi' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                VI
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded transition-colors font-medium ${
                  lang === 'en' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
