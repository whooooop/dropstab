export interface CreatePortfolioParams {
  name: string;
  description: string;
  color: PortfolioColor;
  includeInTotal: boolean;
}

export interface PortfolioShort {
  btcChange24h: string,
  btcDominance: any,
  btcPriceUsd: string,
  ethChange24h: string,
  ethPriceUsd: string,
  globalInitialType: 'USD'
  portfolioGroups: PortfolioGroup[],
  profileImage: string | null,
  username: string
}

export enum PortfolioColor {
  INDIGO = 'INDIGO',
  CYAN = 'CYAN',
  PURPLE = 'PURPLE',
  ORANGE = 'ORANGE',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
}

export interface PortfolioGroup {
  id: number;
  name: string;
  description: string | null;
  username: string;
  userId: number;
  profileImage: string | null;
  sortOrder: number;
  shareType: string;
  portfolioSharingType: string;
  isSharingPublic: boolean;
  assetsCount: number;
  shareToken: string;
  following: boolean;
  followersCount: number;
  updatedAt: number | null;
  createdAt: number;
  needToIndex: boolean,
  sharingSlug: string,
  portfolioTotal: PortfolioTotal;
  assets: PortfolioAsset[],
  options: PortfolioOptions,
}

export interface PortfolioTotal {
  totalCap: CurrencyValues;
  initialCap: CurrencyValues;
  netChangeAbsolute: NetChange;
  netChangePercent: NetChange;
  profit: CurrencyValues;
}

export interface PortfolioAsset {
  id: number,
  slug: string,
  name: string,
  rank: number,
  symbol: string,
  image: string,
  custom: boolean,
  currencyId: number,
  portfolioId: number
}

export interface PortfolioOptions {
  chartTimeframe: string,
  showChart: boolean,
  showSmallHoldings: boolean,
  showHoldingsShareChart: boolean,
  showUpcomingEvents: boolean,
  showNotes: boolean,
  portfolioTimeframe: string,
  color: PortfolioColor,
  topPerformance: boolean,
  includeInTotal: boolean
}

export interface CurrencyValues {
  USD: string;
  BTC: string;
  ETH: string;
  BNB: string;
  SOL: string;
}

export interface NetChange {
  [key: string]: CurrencyValues;
}
