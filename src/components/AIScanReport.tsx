import React from 'react';
import { AIScanResult } from '../types.ts';
import { Sparkles, RefreshCw, Twitter, ExternalLink, Globe, Search } from 'lucide-react';

interface AIScanReportProps {
  scanResult: AIScanResult | null;
  isLoading: boolean;
  onRescan: () => void;
  lang: 'vi' | 'en';
  onFilterByTicker: (ticker: string) => void;
}

export const AIScanReport: React.FC<AIScanReportProps> = ({
  scanResult,
  isLoading,
  onRescan,
  lang,
  onFilterByTicker,
}) => {
  // Simple markdown renderer for headers, bold, bullet points
  const renderFormattedSummary = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // H3 / H4
      if (line.startsWith('#### ') || line.startsWith('### ')) {
        const title = line.replace(/^#{3,4}\s+/, '');
        return (
          <h4 key={idx} className="text-base sm:text-lg font-bold text-emerald-400 mt-5 mb-2.5 flex items-center gap-2">
            {title}
          </h4>
        );
      }
      // Horizontal rule
      if (line.trim() === '---') {
        return <hr key={idx} className="border-slate-800 my-4" />;
      }
      // Bullet list items
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const text = line.replace(/^[\*\-]\s+/, '');
        return (
          <li key={idx} className="text-xs sm:text-sm text-slate-300 ml-4 list-disc leading-relaxed my-1.5">
            {renderInlineMarkdown(text)}
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed my-1">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  // Convert **bold** and [links](url) and $TICKER into interactive chips
  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|\$[A-Z0-9_]{2,15})/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a
              key={i}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline inline-flex items-center gap-0.5"
            >
              {match[1]} <ExternalLink className="w-2.5 h-2.5" />
            </a>
          );
        }
      }
      if (part.startsWith('$') && part.length >= 3) {
        const ticker = part.slice(1);
        return (
          <button
            key={i}
            onClick={() => onFilterByTicker(ticker)}
            className="inline-flex items-center px-1.5 py-0.2 mx-0.5 rounded bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold transition-colors cursor-pointer border border-emerald-500/20"
            title={`Lọc token $${ticker}`}
          >
            {part}
          </button>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900/80 to-slate-900 border border-purple-500/30 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {lang === 'vi' ? 'Radar AI: Quét Xu Hướng X (Twitter) 24h' : 'AI Radar: 24h X (Twitter) Trend Scanner'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'vi'
                ? 'Sử dụng Gemini 3.8 Flash kết hợp Google Search Grounding để tổng hợp các cashtag memecoin Solana đang bùng nổ, câu chuyện viral, và rủi ro trực tiếp từ cộng đồng Crypto Twitter.'
                : 'Powered by Gemini 3.8 Flash with Google Search Grounding to detect exploding Solana memecoin cashtags, viral narratives, and community sentiment.'}
            </p>
          </div>

          <button
            onClick={onRescan}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? (lang === 'vi' ? 'Đang quét X...' : 'Scanning X...') : (lang === 'vi' ? 'Quét lại X ngay' : 'Rescan X Now')}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading && !scanResult ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
            <Sparkles className="w-6 h-6 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              {lang === 'vi' ? 'Đang trinh sát các bài đăng viral trên X...' : 'Scouting viral posts on X...'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'vi' ? 'Đang tổng hợp các cashtag $TICKER và thảo luận từ các KOL Crypto...' : 'Synthesizing cashtags & CT influencer discussions...'}
            </p>
          </div>
        </div>
      ) : scanResult ? (
        <div className="space-y-6">
          {/* Formatted Report Card */}
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Twitter className="w-4 h-4 text-sky-400" />
                {lang === 'vi' ? 'Báo cáo tổng hợp từ X / Twitter trong 24 giờ' : 'Synthesized 24h X Intelligence'}
              </span>
              <span>
                {lang === 'vi' ? 'Cập nhật lúc:' : 'Updated:'} {new Date(scanResult.timestamp).toLocaleTimeString()}
              </span>
            </div>

            <div className="prose prose-invert max-w-none">
              {renderFormattedSummary(scanResult.summary)}
            </div>
          </div>

          {/* Sources and Search Grounding */}
          {scanResult.sources && scanResult.sources.length > 0 && (
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5 uppercase">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'vi' ? 'Nguồn tin & Dữ liệu đối chiếu' : 'Sources & Cross-references'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {scanResult.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 text-xs flex items-center space-x-1.5 border border-slate-700/50 transition-colors"
                  >
                    <span className="truncate max-w-[200px]">{src.title}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 text-sm">
          {lang === 'vi' ? 'Nhấn "Quét lại X ngay" để tạo báo cáo xu hướng mới nhất.' : 'Click "Rescan X Now" to generate the latest trend report.'}
        </div>
      )}
    </div>
  );
};
