import { useRef } from 'react'
import { useQueryClient } from "@tanstack/react-query";
import { useGameContext } from "@/contexts/GameProvider";
import useFlipCoin from "./mutations/useFlipCoin";

const useBetSimulation = () => {
  const queryClient = useQueryClient();
  const {
    selectedCurrency,
    betAmount,
    chosenSide,
    numberOfRounds,
    setIsFlipping,
    setLastResult,
    updateBalance,
    setIsAutoBetting,
    setAutoBetCurrentRound,
    setBetAmount,
  } = useGameContext();

  const { mutate: flipCoinMutation, mutateAsync: flipCoinMutationAsync } = useFlipCoin({
        onSuccess: async (result) => {
            await new Promise((resolve) =>
              setTimeout(resolve, 700)
            );
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


  const autoBetRef = useRef(false);
  const baseBetRef = useRef(0);

  const startAutoBet = async () => {
    autoBetRef.current = true;
    baseBetRef.current = betAmount;
    setIsAutoBetting(true);
    setAutoBetCurrentRound(0);

    let currentBet = betAmount;

    

    for (let i = 0; i < numberOfRounds; i++) {
      if (!autoBetRef.current) break;

      setAutoBetCurrentRound(i + 1);
      setBetAmount(parseFloat(currentBet.toFixed(8)));

      setIsFlipping(true);
      setLastResult(null);

      const result = await flipCoinMutationAsync({
          amount: currentBet,
          currency: selectedCurrency,
          chosenSide: chosenSide!,
      })

      // Martingale: double on loss, reset to base on win
      currentBet = result.outcome === "win" ? baseBetRef.current : currentBet * 2;

      // Pause between rounds
      await new Promise((resolve) => setTimeout(resolve, 600));

    }

    autoBetRef.current = false;
    setIsAutoBetting(false);
    setAutoBetCurrentRound(0);
    setBetAmount(baseBetRef.current);

  }

  const stopAutoBet = () => {
    autoBetRef.current = false;
  };


  return {
    flipCoin,
    stopAutoBet,
    startAutoBet
  };
}


export default useBetSimulation;