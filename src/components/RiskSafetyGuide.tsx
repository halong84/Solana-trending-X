import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  ExternalLink, 
  Lock, 
  Users, 
  Zap, 
  Flame, 
  HelpCircle 
} from 'lucide-react';

interface RiskSafetyGuideProps {
  lang: 'vi' | 'en';
}

export const RiskSafetyGuide: React.FC<RiskSafetyGuideProps> = ({ lang }) => {
  const [caInput, setCaInput] = useState('');

  const checkCa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caInput.trim()) return;
    window.open(`https://rugcheck.xyz/tokens/${caInput.trim()}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Top Warning Banner */}
      <div className="bg-amber-950/30 border border-amber-500/30 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1.5">
              {lang === 'vi' ? 'Bảo Vệ Vốn & Quy Tắc Sống Còn Khi Săn Meme Trên X' : 'Capital Protection & Memecoin Survival Rules'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              {lang === 'vi'
                ? 'Thị trường memecoin Solana trên X và Pump.fun có tốc độ sinh tử tính bằng phút. Hơn 95% các token xuất hiện trên mạng xã hội sẽ về 0. Không bao giờ giao dịch theo cảm tính (FOMO) nếu chưa kiểm tra an toàn hợp đồng.'
                : 'The Solana memecoin market on X and Pump.fun moves in minutes. Over 95% of tokens launched return to zero. Never FOMO into a token without verifying its contract integrity.'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Quick CA Checker */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm shadow-xl">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-emerald-400" />
          {lang === 'vi' ? 'Tra Cứu Nhanh Contract Address (CA) Trên RugCheck' : 'Quick Contract Address (CA) Checker on RugCheck'}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {lang === 'vi'
            ? 'Dán bất kỳ địa chỉ token Solana nào để kiểm tra trực tiếp điểm rủi ro, phân bổ ví dev và quyền mint.'
            : 'Paste any Solana token address to inspect its risk score, dev wallet allocation, and mint permissions.'}
        </p>

        <form onSubmit={checkCa} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            placeholder={lang === 'vi' ? 'Nhập Solana Token CA (ví dụ: ED5nyyWEzp...)' : 'Enter Solana Token CA...'}
            value={caInput}
            onChange={(e) => setCaInput(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-sm flex-shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Kiểm Tra Ngay' : 'Check Token'}</span>
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs">
          <span className="text-slate-500">{lang === 'vi' ? 'Ví dụ phổ biến:' : 'Quick examples:'}</span>
          <button
            type="button"
            onClick={() => setCaInput('ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY')}
            className="text-emerald-400 hover:underline font-mono text-[11px]"
          >
            $MOODENG
          </button>
          <span className="text-slate-600">•</span>
          <button
            type="button"
            onClick={() => setCaInput('9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump')}
            className="text-emerald-400 hover:underline font-mono text-[11px]"
          >
            $FARTCOIN
          </button>
          <span className="text-slate-600">•</span>
          <button
            type="button"
            onClick={() => setCaInput('2qEHjDLDLbuBgRYvsxhc5RefnsHyisAZD95mwU42pump')}
            className="text-emerald-400 hover:underline font-mono text-[11px]"
          >
            $PNUT
          </button>
        </div>
      </div>

      {/* Survival Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Rule 1 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center space-x-2.5 text-emerald-400">
            <Lock className="w-5 h-5" />
            <h4 className="font-bold text-sm text-white">
              {lang === 'vi' ? '1. Thanh khoản phải được Khóa hoặc Đốt (Burn LP)' : '1. Liquidity Must Be Locked or Burned'}
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'vi'
              ? 'Đối với token trên Raydium/Orca, kiểm tra xem pool thanh khoản đã bị đốt (burned) chưa. Nếu thanh khoản chưa khóa, dev có thể rút sạch tiền bất cứ lúc nào (Rug pull).'
              : 'For Raydium/Orca pairs, verify if LP tokens are burned. Unlocked liquidity allows devs to pull the pool anytime.'}
          </p>
        </div>

        {/* Rule 2 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center space-x-2.5 text-purple-400">
            <Users className="w-5 h-5" />
            <h4 className="font-bold text-sm text-white">
              {lang === 'vi' ? '2. Phân Bổ Ví Dev & Top 10 Holders (< 15-20%)' : '2. Top 10 Holders & Dev Wallet (< 15-20%)'}
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'vi'
              ? 'Nếu 10 ví hàng đầu nắm giữ trên 20-30% tổng cung (trừ pool thanh khoản), nguy cơ bị xả lũ đè giá khi vừa có lãi là cực kỳ cao.'
              : 'If top 10 wallets hold more than 20-30% of supply, you face immense dump risk from early snipers and insider cabals.'}
          </p>
        </div>

        {/* Rule 3 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center space-x-2.5 text-sky-400">
            <Zap className="w-5 h-5" />
            <h4 className="font-bold text-sm text-white">
              {lang === 'vi' ? '3. Nhận Diện "Dev Bundled" & Sniper Bots' : '3. Detect "Dev Bundles" & Sniper Bots'}
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'vi'
              ? 'Nhiều dev sử dụng Jito bundles để mua 40% cung bằng 10 ví khác nhau ngay block khởi tạo. Hãy dùng RugCheck để xem cờ cảnh báo "Bundled Supply".'
              : 'Devs frequently use Jito bundles to purchase large allocations across multiple dummy wallets in the genesis block.'}
          </p>
        </div>

        {/* Rule 4 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center space-x-2.5 text-amber-400">
            <Flame className="w-5 h-5" />
            <h4 className="font-bold text-sm text-white">
              {lang === 'vi' ? '4. Tránh Mạo Danh Tài Khoản X (Twitter Clones)' : '4. Beware of Impersonator Accounts on X'}
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'vi'
              ? 'Khi một meme bùng nổ, hàng chục tài khoản giả mạo KOL với tick xanh sẽ đăng hợp đồng CA giả. Luôn đối chiếu CA từ nhiều nguồn uy tín.'
              : 'Scammers create verified impersonator accounts copying trending tickers to promote honeypots. Always verify CA across multiple trackers.'}
          </p>
        </div>

      </div>
    </div>
  );
};
