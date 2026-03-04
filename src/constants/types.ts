export type Currency = "BTC" | "ETH" | "SOL";


export interface UserData {
  balances: Record<Currency, number>;
  selectedCurrency: Currency;
}