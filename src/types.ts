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
}

export interface AIScanResult {
  summary: string;
  timestamp: string;
  searchQueries?: string[];
  sources?: { title: string; url: string }[];
}

export type FilterCategory = 'all' | 'hot-x' | 'gainers' | 'pumpfun' | 'ai-agents' | 'culture-animals';
