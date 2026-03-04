import {
  createContext,
  useContext
} from "react";

import type { Currency } from "@/constants/types";

interface GameContextValue {
  selectedCurrency: Currency;
  balances: Record<Currency, number>;
}

export const GameContext = createContext<GameContextValue | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}