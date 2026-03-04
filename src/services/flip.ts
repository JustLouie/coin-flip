import axios from 'axios';
import type { CoinFlipRequest } from "@/constants/types";

export const flipCoin = async (data: CoinFlipRequest) => {
    const response = await axios.post('/api/coin-flip', data);
    return response.data;
}