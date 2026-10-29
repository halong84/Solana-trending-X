import React, { useState } from 'react';
import { Token } from '../types.ts';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Twitter, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Flame, 
  BarChart2, 
  ShieldAlert
} from 'lucide-react';

interface TokenCardProps {
  token: Token;
  lang: 'vi' | 'en';
  onSelectToken: (token: Token) => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, lang, onSelectToken }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrice = (p: number) => {
    if (!p || p === 0) return '$0.00';
    if (p < 0.000001) return `$${p.toExponential(3)}`;
    if (p < 0.0001) return `$${p.toFixed(7)}`;
    if (p < 0.01) return `$${p.toFixed(5)}`;
    if (p < 1) return `$${p.toFixed(4)}`;
    return `$${p.toFixed(2)}`;
  };

  const formatNumber = (num: number) => {
    if (!num) return '$0';
    if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`;
    return `$${Math.round(num).toLocaleString()}`;
  };

  const isPositive = (token.priceChange24h || 0) >= 0;

  return (
    <div 
      onClick={() => onSelectToken(token)}
      className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-4 transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-emerald-500/5 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Top ambient glow bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isPositive ? 'from-emerald-500 via-teal-400 to-emerald-600' : 'from-rose-500 via-pink-500 to-rose-600'} opacity-75 group-hover:opacity-100 transition-opacity`} />

      <div>
        {/* Token Header: Icon + Name + Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3 truncate">
            {token.icon ? (
              <img 
                src={token.icon} 
                alt={token.symbol} 
                className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-700 bg-slate-800 flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-emerald-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-inner">
                {token.symbol.slice(0, 2)}
              </div>
            )}
            <div className="truncate">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-base text-white tracking-tight truncate">
                  ${token.symbol}
                </span>
                {token.isBoosted && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                    <Flame className="w-2.5 h-2.5" />
                    HOT
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate">{token.name}</p>
            </div>
          </div>

          {/* Category Tag */}
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 flex-shrink-0 max-w-[110px] truncate">
            {token.category}
          </span>
        </div>

        {/* Price & 24h Change */}
        <div className="flex items-baseline justify-between mb-3 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/40">
          <div>
            <p className="text-[10px] uppercase font-semibold text-slate-500">
              {lang === 'vi' ? 'Giá hiện tại' : 'Price'}
            </p>
            <p className="text-base font-bold text-white tracking-tight">
              {formatPrice(token.priceUsd)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-semibold text-slate-500">
              {lang === 'vi' ? 'Biến động 24h' : '24h Change'}
            </p>
            <div className={`flex items-center justify-end text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
              <span>{isPositive ? '+' : ''}{token.priceChange24h?.toFixed(1) || 0}%</span>
            </div>
          </div>
        </div>

        {/* Volume, Market Cap & Liquidity Grid */}
        <div className="grid grid-cols-3 gap-1.5 text-xs mb-3">
          <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/40 truncate">
            <span className="text-[10px] text-slate-400 block truncate">{lang === 'vi' ? 'Vol 24h' : '24h Vol'}</span>
            <span className="font-semibold text-slate-200 truncate block">{formatNumber(token.volume24h)}</span>
          </div>
          <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/40 truncate">
            <span className="text-[10px] text-slate-400 block truncate">{lang === 'vi' ? 'Vốn hóa' : 'MC'}</span>
            <span className="font-semibold text-slate-200 truncate block">{formatNumber(token.marketCapUsd)}</span>
          </div>
          <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/40 truncate">
            <span className="text-[10px] text-teal-400/90 block truncate">{lang === 'vi' ? 'Thanh khoản' : 'Liq'}</span>
            <span className="font-semibold text-teal-300 truncate block">{formatNumber(token.liquidityUsd)}</span>
          </div>
        </div>

        {/* Description snippet */}
        {token.description && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 italic">
            "{token.description}"
          </p>
        )}
      </div>

      {/* Action Buttons: Copy CA, X Link, DexScreener, AI */}
      <div className="pt-2 border-t border-slate-800/70 flex flex-col gap-2">
        {/* Contract Address row */}
        <div className="flex items-center justify-between text-xs bg-slate-950/70 px-2.5 py-1.5 rounded-lg border border-slate-800/60">
          <span className="text-[11px] text-slate-400 font-mono">
            CA: {token.address.slice(0, 4)}...{token.address.slice(-4)}
          </span>
          <button
            onClick={copyAddress}
            title={lang === 'vi' ? 'Sao chép địa chỉ hợp đồng' : 'Copy Contract Address'}
            className="flex items-center space-x-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>{lang === 'vi' ? 'Đã chép' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>{lang === 'vi' ? 'Chép CA' : 'Copy'}</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Links Row */}
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {/* X (Twitter) Search / Profile button */}
          <a
            href={token.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={lang === 'vi' ? 'Mở thảo luận trên X' : 'View mentions on X'}
            className="flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors font-medium text-[11px]"
          >
            <Twitter className="w-3 h-3" />
            <span className="truncate">X Feed</span>
          </a>

          {/* DexScreener Chart button */}
          <a
            href={token.dexUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={lang === 'vi' ? 'Mở biểu đồ DEX Screener' : 'Open DEX Screener chart'}
            className="flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors font-medium text-[11px]"
          >
            <BarChart2 className="w-3 h-3" />
            <span>Chart</span>
          </a>

          {/* AI Deep Dive trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectToken(token);
            }}
            title={lang === 'vi' ? 'AI Phân tích chi tiết' : 'AI Analysis'}
            className="flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-colors font-medium text-[11px]"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>AI Soi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
