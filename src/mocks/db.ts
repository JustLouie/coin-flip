import { INITIAL_BALANCES, INITIAL_SELECTED_CURRENCY } from "@/constants";
import type { Bet, Currency, UserData } from "@/constants/types";

const DEFAULT_USER_DATA = {
    balances: INITIAL_BALANCES,
    selectedCurrency: INITIAL_SELECTED_CURRENCY,
}

const getUserData = () => {
    const storedData = localStorage.getItem('user');
    return storedData ? JSON.parse(storedData) : DEFAULT_USER_DATA;
}


const updateBalance = (currency: Currency, newBalance: number): UserData => {
    const current = getUserData();
    const updated = {
      ...current,
      balances: { ...current.balances, [currency]: newBalance },
    };

    localStorage.setItem('user', JSON.stringify(updated));
    return updated;
}


const getBetHistory = () => {
    const storedData = localStorage.getItem('bet-history');
    return storedData ? JSON.parse(storedData) : [];

}

const saveBet = (bet: Bet) => {
    const history = getBetHistory();
    const updated = [bet, ...history].slice(0, 20);
    localStorage.setItem('bet-history', JSON.stringify(updated));
    return updated;
}


export const db = {
    getUserData,
    updateBalance,
    getBetHistory,
    saveBet
}