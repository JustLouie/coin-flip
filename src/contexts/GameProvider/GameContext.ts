import {
  createContext,
  useContext
} from "react";
import type { Currency, CoinSide, CoinFlipResult } from "@/constants/types";

interface GameContextValue {
  selectedCurrency: Currency;
  balances: Record<Currency, number>;
  chosenSide: CoinSide | null;
  isFlipping: boolean;
  betAmount: number;
  lastResult: CoinFlipResult | null;
  autoBetEnabled: boolean,
  isAutoBetting: boolean,
  autoBetCurrentRound: number,
  numberOfRounds: number;
  setChosenSide: (s: CoinSide | null) => void;
  setBetAmount: (amount: number) => void;
  setIsFlipping: (flipping: boolean) => void;
  updateBalance: (currency: Currency, newBalance: number) => void;
  setLastResult: (r: CoinFlipResult | null) => void;
  setSelectedCurrency: (c: Currency) => void;
  setAutoBetEnabled: (e: boolean) => void;
  setNumberOfRounds: (r: number) => void;
  setIsAutoBetting: (r: boolean) => void;
  setAutoBetCurrentRound: (round: number) => void;
}

export const GameContext = createContext<GameContextValue | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}