
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import useHistory from "@/hooks/queries/useHistory";
import type {
  BetFilters,
} from "@/constants/types";


const useBetHistory = () => {
    const [filters, setFilters] = useState<BetFilters>({
        outcome: "all",
        currency: "all",
    })

    const debouncedFilters = useDebounce(filters, 300);
    const { history, isLoading } = useHistory(debouncedFilters);

    return {
        bets: history?.bets || [],
        total: history?.total || 0,
        isLoading,
        filters,
        setFilters
    }
}


export default useBetHistory