import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import useHistory from "@/hooks/queries/useHistory";
import { computeStats } from "@/lib/utils";
import type {
  BetFilters,
  BetStatistics
} from "@/constants/types";


const useBetHistory = () => {
    const [filters, setFilters] = useState<BetFilters>({
        outcome: "all",
        currency: "all",
        amount: ''
    })

    const debouncedFilters = useDebounce(filters, 300);
    const { history, isLoading } = useHistory(debouncedFilters);

    const stats: BetStatistics = useMemo(
        () => computeStats(history?.bets ?? []),
        [history?.bets]
    );

    return {
        bets: history?.bets || [],
        total: history?.total || 0,
        isLoading,
        filters,
        setFilters,
        stats
    }
}


export default useBetHistory