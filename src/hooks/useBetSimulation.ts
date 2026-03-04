import { useQueryClient } from "@tanstack/react-query";
import { useGameContext } from "@/contexts/GameProvider";
import useFlipCoin from "./mutations/useFlipCoin";

const useBetSimulation = () => {
  const queryClient = useQueryClient();
  const {
    selectedCurrency,
    betAmount,
    chosenSide,
    setIsFlipping,
    setLastResult,
    updateBalance,
  } = useGameContext();

  const { mutate: flipCoinMutation } = useFlipCoin({
        onSuccess: (result) => {
            setIsFlipping(false);
            updateBalance(selectedCurrency, result.newBalance);
            setLastResult(result);
            queryClient.invalidateQueries({ queryKey: ["betHistory"] });
            queryClient.invalidateQueries({ queryKey: ["userData"] });
        }
  });


  const flipCoin = (overrideBetAmount?: number) => {
    const amount = overrideBetAmount ?? betAmount;
    if (amount <= 0 || !chosenSide) return null;

    setIsFlipping(true);
    setLastResult(null);

    flipCoinMutation({
        amount,
        currency: selectedCurrency,
        chosenSide: chosenSide!,
    });
  }

  return {
    flipCoin
  };
}


export default useBetSimulation;