import type { Bet, Currency, BetStatistics } from "@/constants/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const countByOutcome = (bets: Bet[]) => {
  const wins = bets.filter((b) => b.outcome === "win").length;
  return { wins, losses: bets.length - wins };
}

const calcWinRate = (wins: number, total: number): number => {
  return total > 0 ? (wins / total) * 100 : 0;
};

const findBiggestWin = (bets: Bet[]): number => {
  return bets
    .filter((b) => b.outcome === "win")
    .reduce((max, b) => Math.max(max, b.amount), 0);
};

const findBiggestLoss = (bets: Bet[]): number => {
  return bets
    .filter((b) => b.outcome === "loss")
    .reduce((max, b) => Math.max(max, b.amount), 0);
};

const calcProfitLoss = (bets: Bet[]): Record<Currency, number> => {
  const pl: Record<Currency, number> = { BTC: 0, ETH: 0, SOL: 0 };

  for (const bet of bets) {
    pl[bet.currency] += bet.outcome === "win" ? bet.amount : -bet.amount;
  }

  return pl;
}

export const computeStats = (bets: Bet[]): BetStatistics => {
  const { wins, losses } = countByOutcome(bets);

  return {
    total: bets.length,
    wins,
    losses,
    winRate: calcWinRate(wins, bets.length),
    biggestWin: findBiggestWin(bets),
    biggestLoss: findBiggestLoss(bets),
    profitLoss: calcProfitLoss(bets),
  };
}
