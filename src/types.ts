export interface Token {
  id: string;
  symbol: string;
  name: string;
  address: string;
  priceUsd: number;
  priceChange24h: number;
  priceChange1h?: number;
  volume24h: number;
  liquidityUsd: number;
  marketCapUsd: number;
  txns24h: number;
  boostScore: number;
  icon?: string;
  header?: string;
  description?: string;
  xUrl: string;
  xHandle: string;
  telegramUrl?: string;
  websiteUrl?: string;
  dexUrl: string;
  pumpFunUrl?: string;
  category: string;
  isPumpFun: boolean;
  isBoosted: boolean;
  xMentionTrend: string;
  ageDays: number;
  pairCreatedAt?: number;
  athMarketCapUsd: number;
  atlMarketCapUsd: number;
  // Tiêu chí độc lập: KOL & Người nổi tiếng trên X
  isCelebrityMeta?: boolean;
  celebrityName?: string;
  celebrityXHandle?: string;
  celebrityRole?: 'created_by' | 'inspired_by' | 'endorsed_by';
  // Nguồn phát hành
  launchSource?: 'Pump.fun' | 'Moonshot' | 'Raydium' | 'Meteora' | 'Standard DEX';
  // Tinh chỉnh an toàn thanh khoản & Chống rút LP (Anti-Rugpull)
  isLpLocked?: boolean;
  lpLockedPercent?: number; // 0 - 100
  lpLockType?: 'burned' | 'locked' | 'bonding_curve' | 'unlocked';
  isLpPullProof?: boolean; // Không thể rút thanh khoản: LP 100% burn/lock + Mint Revoked
  mintAuthorityRevoked?: boolean;
  freezeAuthorityRevoked?: boolean;
  securityScore?: number; // 0 - 100
  securityWarnings?: string[];
}

export interface AIScanResult {
  summary: string;
  timestamp: string;
  searchQueries?: string[];
  sources?: { title: string; url: string }[];
}

export type FilterCategory = 'all' | 'hot-x' | 'gainers' | 'pumpfun' | 'ai-agents' | 'culture-animals';
export type LaunchSourceFilter = 'all' | 'pumpfun' | 'moonshot' | 'raydium' | 'meteora';
export type CelebrityFilter = 'all' | 'any_celeb' | 'created_by' | 'endorsed_or_inspired';
export type LpLockFilter = 'all' | 'locked_only' | 'unlocked_risky';
export type UnruggableFilter = 'all' | 'unruggable_only' | 'pull_risk';

