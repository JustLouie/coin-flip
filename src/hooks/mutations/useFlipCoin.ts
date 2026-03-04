import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { flipCoin } from "@/services/flip";
import type { CoinFlipRequest, CoinFlipResult } from "@/constants/types";

const useFlipCoin = (options: UseMutationOptions<CoinFlipResult, Error, CoinFlipRequest, unknown>) => {
    return useMutation({
        mutationFn: flipCoin,
        ...options
    });
}

export default useFlipCoin

    