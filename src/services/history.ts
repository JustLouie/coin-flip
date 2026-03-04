import axios from "axios";
import type { BetFilters } from "@/constants/types";

export const getHistory = async (filters: BetFilters) => {
    const params = new URLSearchParams();
    if (filters.currency !== "all") params.set("currency", filters.currency);
    if (filters.outcome !== "all") params.set("outcome", filters.outcome);

    const requestUrl = `/api/bet-history?${params.toString()}`;
    const response = await axios.get(requestUrl);
    return response.data
}