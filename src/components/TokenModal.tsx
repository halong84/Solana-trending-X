import React, { useState, useEffect } from 'react';
import { Token } from '../types.ts';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Twitter, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Send, 
  BarChart2, 
  AlertTriangle,
  Flame,
  Share2
} from 'lucide-react';

interface TokenModalProps {
  token: Token | null;
  onClose: () => void;
  lang: 'vi' | 'en';
}

export const TokenModal: React.FC<TokenModalProps> = ({ token, onClose, lang }) => {
  const [copiedCA, setCopiedCA] = useState(false);
  const [copiedTweet, setCopiedTweet] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'security' | 'raid'>('ai');

  useEffect(() => {
    if (!token) return;
    setAiAnalysis(null);
    setIsLoadingAI(true);

    // Call server AI endpoint to analyze this token
    fetch('/api/ai-analyze-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(token),
    })
      .then((res) => res.json())
      .then((data) => {
        setAiAnalysis(data.analysis || 'Không có dữ liệu phân tích.');
      })
      .catch((err) => {
        console.error('AI analyze failed:', err);
        setAiAnalysis('Lỗi khi phân tích bằng AI. Vui lòng kiểm tra lại kết nối.');
      })
      .finally(() => {
        setIsLoadingAI(false);
      });
  }, [token]);

  if (!token) return null;

  const copyCA = () => {
    navigator.clipboard.writeText(token.address);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  const tweetText = `Solana Memecoin Radar: Checking out $${token.symbol} (${token.name}) trending on X in the last 24h! 🚀\n\nCA: ${token.address}\n\n#Solana #SolanaMeme #PumpFun $${token.symbol}`;

  const copyTweetContent = () => {
    navigator.clipboard.writeText(tweetText);
    setCopiedTweet(true);
    setTimeout(() => setCopiedTweet(false), 2000);
  };

  const openXIntent = () => {
    const encoded = encodeURIComponent(tweetText);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank');
  };

  const rugCheckUrl = `https://rugcheck.xyz/tokens/${token.address}`;
  const solscanUrl = `https://solscan.io/token/${token.address}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center space-x-3.5">
            {token.icon ? (
              <img 
                src={token.icon} 
                alt={token.symbol} 
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20 bg-slate-800"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                {token.symbol.slice(0, 2)}
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  ${token.symbol}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {token.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">{token.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">{lang === 'vi' ? 'Giá USD' : 'Price'}</span>
              <span className="text-sm font-bold text-white font-mono">${token.priceUsd < 0.0001 ? token.priceUsd.toExponential(3) : token.priceUsd.toFixed(6)}</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">{lang === 'vi' ? 'Biến động 24h' : '24h Change'}</span>
              <span className={`text-sm font-bold ${token.priceChange24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h?.toFixed(1) || 0}%
              </span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">{lang === 'vi' ? 'Volume 24h' : '24h Volume'}</span>
              <span className="text-sm font-bold text-slate-200">${Math.round(token.volume24h || 0).toLocaleString()}</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">{lang === 'vi' ? 'Vốn hóa (MC)' : 'Market Cap'}</span>
              <span className="text-sm font-bold text-slate-200">${Math.round(token.marketCapUsd || 0).toLocaleString()}</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-teal-400 uppercase font-semibold block">{lang === 'vi' ? 'Thanh khoản' : 'Liquidity'}</span>
              <span className="text-sm font-bold text-teal-300 font-mono">${Math.round(token.liquidityUsd || 0).toLocaleString()}</span>
            </div>
          </div>

          {/* Full Contract Address */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
            <div className="truncate">
              <span className="text-[10px] font-semibold text-slate-500 block uppercase">
                {lang === 'vi' ? 'Địa chỉ Hợp đồng (CA)' : 'Contract Address (CA)'}
              </span>
              <span className="text-xs text-slate-300 font-mono truncate block select-all">
                {token.address}
              </span>
            </div>
            <button
              onClick={copyCA}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 font-medium text-xs border border-emerald-500/30 transition-colors flex-shrink-0 cursor-pointer"
            >
              {copiedCA ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCA ? (lang === 'vi' ? 'Đã sao chép' : 'Copied') : (lang === 'vi' ? 'Sao chép CA' : 'Copy CA')}</span>
            </button>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-800 text-xs font-semibold space-x-4">
            <button
              onClick={() => setActiveTab('ai')}
              className={`pb-2.5 transition-colors flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'ai'
                  ? 'border-b-2 border-purple-400 text-purple-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === 'vi' ? 'AI Soi Kèo & Sức Hút trên X' : 'AI Analysis & X Sentiment'}</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-2.5 transition-colors flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'security'
                  ? 'border-b-2 border-emerald-400 text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'vi' ? 'Bảo mật & RugCheck' : 'Security Check'}</span>
            </button>
            <button
              onClick={() => setActiveTab('raid')}
              className={`pb-2.5 transition-colors flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'raid'
                  ? 'border-b-2 border-sky-400 text-sky-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Twitter className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'vi' ? 'Raid & Tweet X' : 'Raid & Tweet'}</span>
            </button>
          </div>

          {/* Tab 1: AI Analysis */}
          {activeTab === 'ai' && (
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {lang === 'vi' ? 'Đánh giá từ Gemini 3.8 Flash' : 'Gemini 3.8 Flash Insights'}
                </span>
                {isLoadingAI && (
                  <span className="text-xs text-slate-400 animate-pulse">
                    {lang === 'vi' ? 'Đang phân tích token...' : 'Analyzing token...'}
                  </span>
                )}
              </div>

              {isLoadingAI ? (
                <div className="py-6 flex flex-col items-center justify-center space-y-2">
                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-slate-400">
                    {lang === 'vi' ? 'Đang đọc dữ liệu on-chain và sentiment trên X...' : 'Reading on-chain data & X sentiment...'}
                  </p>
                </div>
              ) : (
                <div className="text-xs text-slate-300 leading-relaxed space-y-2 whitespace-pre-line font-normal">
                  {aiAnalysis}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Security & RugCheck */}
          {activeTab === 'security' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                <p>
                  {lang === 'vi' 
                    ? 'Memecoin Solana có mức độ biến động cực kỳ lớn và nhiều token mang tính chất pump-and-dump. Luôn kiểm tra kỹ Contract Address (CA) trên RugCheck trước khi hoán đổi (swap).'
                    : 'Solana memecoins have extreme volatility and many are quick pump-and-dump schemes. Always verify CA on RugCheck before trading.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href={rugCheckUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-semibold text-slate-200 block">RugCheck.xyz</span>
                      <span className="text-[11px] text-slate-400">{lang === 'vi' ? 'Kiểm tra Dev & Mint authority' : 'Check Dev & Mint'}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </a>

                <a
                  href={solscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4 text-purple-400" />
                    <div>
                      <span className="font-semibold text-slate-200 block">Solscan Explorer</span>
                      <span className="text-[11px] text-slate-400">{lang === 'vi' ? 'Xem Holders & Giao dịch' : 'Holders & Transactions'}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400" />
                </a>
              </div>
            </div>
          )}

          {/* Tab 3: Raid on X */}
          {activeTab === 'raid' && (
            <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                  <Twitter className="w-4 h-4" />
                  {lang === 'vi' ? 'Tạo bài đăng Tweet trên X nhanh' : 'Quick Tweet / Raid on X'}
                </span>
              </div>
              <textarea
                readOnly
                value={tweetText}
                rows={4}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono resize-none focus:outline-none"
              />
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={copyTweetContent}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1 cursor-pointer transition-colors"
                >
                  {copiedTweet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTweet ? (lang === 'vi' ? 'Đã sao chép' : 'Copied') : (lang === 'vi' ? 'Sao chép Tweet' : 'Copy Tweet')}</span>
                </button>
                <button
                  onClick={openXIntent}
                  className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Đăng lên X ngay' : 'Tweet on X'}</span>
                </button>
              </div>
            </div>
          )}

          {/* External Links Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
            <a
              href={token.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-medium flex items-center space-x-1.5 transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Xem bài đăng X' : 'View on X'}</span>
            </a>

            <a
              href={token.dexUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-colors"
            >
              <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>DEX Screener</span>
            </a>

            {token.pumpFunUrl && (
              <a
                href={token.pumpFunUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center space-x-1.5 transition-colors"
              >
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pump.fun</span>
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
