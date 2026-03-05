import type { Currency, CoinSide, CoinFlipResult } from "@/constants/types";

type GameAction =
  | { type: "SET_CURRENCY"; payload: Currency }
  | { type: "SET_BET_AMOUNT"; payload: number }
  | { type: "SET_CHOSEN_SIDE"; payload: CoinSide | null }
  | { type: "SET_FLIPPING"; payload: boolean }
  | { type: "SET_BALANCES"; payload: Record<Currency, number> }
  | { type: "UPDATE_BALANCE"; currency: Currency; newBalance: number }
  | { type: "SET_LAST_RESULT"; payload: CoinFlipResult | null }
  | { type: "SET_AUTO_BET_ENABLED"; payload: boolean }
  | { type: "SET_ROUND_NUMBERS"; payload: number }
  | { type: "SET_AUTO_BETTING"; payload: boolean }
  | { type: "SET_AUTO_BET_ROUND"; payload: number };


export interface InitialStateType {
  selectedCurrency: Currency;
  balances: Record<Currency, number>;
  chosenSide: CoinSide | null;
  isFlipping: boolean;
  betAmount: number;
  lastResult: CoinFlipResult | null;
  autoBetEnabled: boolean,
  isAutoBetting: boolean,
  autoBetCurrentRound: number,
  numberOfRounds: number
}


const gameReducer = (state: InitialStateType, action: GameAction): InitialStateType => {
  switch (action.type) {
    case "SET_CURRENCY":
      return { ...state, selectedCurrency: action.payload };

    case "SET_BET_AMOUNT":
      return { ...state, betAmount: action.payload };

    case "SET_CHOSEN_SIDE":
      return { ...state, chosenSide: action.payload };

    case "SET_FLIPPING":
      return { ...state, isFlipping: action.payload };
    
    case "SET_BALANCES":
      return { ...state, balances: action.payload };

    case "UPDATE_BALANCE":
      return {
        ...state,
        balances: { ...state.balances, [action.currency]: action.newBalance },
      };

    case "SET_LAST_RESULT":
      return { ...state, lastResult: action.payload };

    case "SET_AUTO_BET_ENABLED":
      return { ...state, autoBetEnabled: action.payload };

    case "SET_ROUND_NUMBERS":
      return {
        ...state,
        numberOfRounds: action.payload,
      };
      
    case "SET_AUTO_BETTING":
      return { ...state, isAutoBetting: action.payload };

    case "SET_AUTO_BET_ROUND":
      return { ...state, autoBetCurrentRound: action.payload };

    default:
      return state;
  }
}


export default gameReducer;