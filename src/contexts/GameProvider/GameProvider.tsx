import {
  type ReactNode,
} from "react";
import { GameContext } from "./GameContext";
import useUser from "@/hooks/useUser";
import { INITIAL_BALANCES, INITIAL_SELECTED_CURRENCY } from "@/constants";


const GameProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser()

  return (
    <GameContext.Provider
      value={{
        balances: user ? user.balances : INITIAL_BALANCES,
        selectedCurrency: user ? user.selectedCurrency : INITIAL_SELECTED_CURRENCY,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}




export default GameProvider