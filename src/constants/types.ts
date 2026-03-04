export type Currency = "BTC" | "ETH" | "SOL";

export interface UserData {
  balances: Record<Currency, number>;
  selectedCurrency: Currency;
}

export interface Bet {
  id: string;
  amount: number;
  profit: number;
  currency: Currency;
  outcome: "win" | "loss";
  balanceAfter: number;
  timestamp: string;
}

export interface CoinFlipResult {
  outcome: "win" | "loss";
  side: "heads" | "tails";
  newBalance: number;
  bet: Bet;
}

export interface CoinFlipRequest {
  amount: number;
  currency: Currency;
  chosenSide: "heads" | "tails";
}


export type CoinSide = "heads" | "tails";


export interface BetHistoryResponse {
  bets: Bet[];
  total: number;
}

export interface BetFilters {
  outcome: "all" | "win" | "loss";
  currency: "all" | Currency;
}