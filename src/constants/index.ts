import { type Currency } from "./types"

export const ALL_CURRENCIES: Currency[] = ["BTC", "ETH", "SOL"];
export const CURRENCY_COLORS: Record<Currency, string> = {
  BTC: "text-amber-400",
  ETH: "text-blue-400",
  SOL: "text-purple-400",
};


export const CURRENCY_CONFIG: Record<
  Currency,
  { name: string; symbol: string; icon: string }
> = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
  },
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
  },
  SOL: {
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
  },
};