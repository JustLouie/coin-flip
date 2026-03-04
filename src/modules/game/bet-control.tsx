import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameContext } from "@/contexts/GameProvider";
import CoinPutton from "./coin-button";
import useBetSimulation from "@/hooks/useBetSimulation";

const BetControls = () => {
  const {
    selectedCurrency,
    balances,
    chosenSide,
    setChosenSide,
    isFlipping,
    betAmount,
    setBetAmount,
  } = useGameContext();

  const { flipCoin } = useBetSimulation();

  const currentBalance = balances[selectedCurrency];

  function handleBetAmountChange(value: string) {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      setBetAmount(0);
    } else {
      setBetAmount(Math.min(num, currentBalance));
    }
  }

  const canFlip = true

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Bet Amount
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="number"
              value={betAmount || ""}
              onChange={(e) => handleBetAmountChange(e.target.value)}
              placeholder="0.00"
              disabled={isFlipping}
              step="1"
              min={10}
              max={currentBalance}
              className="pr-16 font-mono text-foreground bg-background"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
              {selectedCurrency}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Choose Side
        </label>
        <div className="grid grid-cols-2 gap-3">
          <CoinPutton
            side="heads"
            label="Heads"
            icon="H"
            selected={chosenSide === "heads"}
            disabled={isFlipping}
            onClick={() => setChosenSide("heads")}
          />
          <CoinPutton
            side="tails"
            label="Tails"
            icon="T"
            selected={chosenSide === "tails"}
            disabled={isFlipping}
            onClick={() => setChosenSide("tails")}
          />
        </div>
      </div>

      <Button
        size="lg"
        disabled={!canFlip}
        onClick={() => flipCoin()}
        className={cn(
          "mt-2 h-14 text-lg font-bold uppercase tracking-wider transition-all",
          canFlip &&
            "bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.25)]"
        )}
      >
        {isFlipping ? "Flipping..." : "Flip Coin"}
      </Button>

      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 px-4 py-3">
        <span className="text-xs text-muted-foreground">Balance</span>
        <span className="font-mono text-sm font-semibold text-foreground">
          {currentBalance.toFixed(2)} {selectedCurrency}
        </span>
      </div>
    </div>
  );
}

export default BetControls