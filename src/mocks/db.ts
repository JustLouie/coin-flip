import { INITIAL_BALANCES, INITIAL_SELECTED_CURRENCY } from "@/constants";

const DEFAULT_USER_DATA = {
    balances: INITIAL_BALANCES,
    selectedCurrency: INITIAL_SELECTED_CURRENCY,
}

const getUserData = () => {
    const storedData = localStorage.getItem('user');
    return storedData ? JSON.parse(storedData) : DEFAULT_USER_DATA;
}


export const db = {
    getUserData,
}