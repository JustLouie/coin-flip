import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/services/history";
import type { BetFilters } from "@/constants/types";

const useUser = (filters: BetFilters) => {
    const { data: history, isLoading } = useQuery({
        queryKey: ['user', filters],
        queryFn: () => getHistory(filters)
    })

    return { history, isLoading }
}

export default useUser