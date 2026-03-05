import {
  useEffect,
  type ReactNode,
  useReducer
} from "react";
import { GameContext } from "./GameContext";
import useUser from "@/hooks/queries/useUser";
import { INITIAL_BALANCES, INITIAL_SELECTED_CURRENCY, MIN_BET } from "@/constants";
import type { CoinSide, Currency, UserData, CoinFlipResult } from "@/constants/types";
import gameReducer, { type InitialStateType } from "./reducer";


const initialState: InitialStateType = {
  selectedCurrency: INITIAL_SELECTED_CURRENCY,
  balances: { ...INITIAL_BALANCES },
  betAmount: MIN_BET,
  chosenSide: null,
  isFlipping: false,
  lastResult: null,
  autoBetCurrentRound: 0,
  numberOfRounds: 10,
  autoBetEnabled: false,
  isAutoBetting: false,
};

const GameProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser()
  const [state, dispatch] = useReducer(gameReducer, initialState);


  const setUserBalance = (user: UserData) => {
    dispatch({ type: "SET_BALANCES", payload: { ...initialState.balances, [user.selectedCurrency]: user.balances[user.selectedCurrency] } });
  }

  const updateBalance = (currency: Currency, newBalance: number) => {
    dispatch({ type: "UPDATE_BALANCE", currency, newBalance });
  }
  const setChosenSide = (side: CoinSide | null) => {
    dispatch({ type: "SET_CHOSEN_SIDE", payload: side });
  }

  const setBetAmount = (amount: number) => {
    dispatch({ type: "SET_BET_AMOUNT", payload: amount });
  }

  const setIsFlipping = (flipping: boolean) => {
    dispatch({ type: "SET_FLIPPING", payload: flipping });
  }

  const setLastResult = (result: CoinFlipResult | null) => {
      dispatch({ type: "SET_LAST_RESULT", payload: result });
  }

  const setSelectedCurrency = (c: Currency) => {
      dispatch({ type: "SET_CURRENCY", payload: c });
  }

  const setAutoBetEnabled = (enable: boolean) => {
      dispatch({ type: "SET_AUTO_BET_ENABLED", payload: enable });
  }

  const setNumberOfRounds = (round: number) => {
      dispatch({ type: "SET_ROUND_NUMBERS", payload: round });
  }

  const setIsAutoBetting = (enable: boolean) => {
      dispatch({ type: "SET_AUTO_BETTING", payload: enable });
  }

  const setAutoBetCurrentRound = (round: number) => {
      dispatch({ type: "SET_AUTO_BET_ROUND", payload: round });
  }


  useEffect(() => {
    if (user) {
      setUserBalance(user);
    }
  }, [user]);


  return (
    <GameContext.Provider
      value={{
        ...state,
        updateBalance,
        setChosenSide,
        setIsFlipping,
        setBetAmount,
        setLastResult,
        setSelectedCurrency,
        setAutoBetEnabled,
        setNumberOfRounds,
        setIsAutoBetting,
        setAutoBetCurrentRound
      }}
    >
      {children}
    </GameContext.Provider>
  );
}




export default GameProvider