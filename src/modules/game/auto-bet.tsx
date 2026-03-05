import { useId } from "react";
import { useGameContext } from "@/contexts/GameProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useBetSimulation from "@/hooks/useBetSimulation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const AutoBet = () => {
    const {
        autoBetEnabled,
        setAutoBetEnabled,
        numberOfRounds,
        setNumberOfRounds,
        isFlipping,
        isAutoBetting,
        autoBetCurrentRound,
        chosenSide,
        betAmount,
    } = useGameContext();

    const { startAutoBet, stopAutoBet } = useBetSimulation();
    const autoBetInfo = useId()

    const onRoundsChange = (e: { target: { value: string; }; }) => {
        setNumberOfRounds(Math.max(
            0,
            Math.min(100, parseInt(e.target.value) || 0)
        ))
    }

    const canStart = autoBetEnabled && !isFlipping && !!chosenSide &&betAmount > 0

    return (
        <div className='flex flex-col gap-4 rounded-xl border border-border/50 bg-card/30 p-4'>
            <div className='flex items-center justify-between'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Label
                                htmlFor={autoBetInfo}
                                className="text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-pointer underline decoration-dotted underline-offset-4"
                            >
                                Auto Bet (Martingale)
                            </Label>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[220px]">
                            <p>
                                Uses the Martingale strategy: doubles the bet after each loss
                                and resets to the base bet after a win.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Switch
                    id={autoBetInfo}
                    checked={autoBetEnabled}
                    onCheckedChange={setAutoBetEnabled}
                    disabled={isAutoBetting}
                />
            </div>
            {
                autoBetEnabled && (
                    <div className="flex flex-col gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-muted-foreground">
                                Number of Rounds
                            </label>
                            <Input
                                type="number"
                                value={numberOfRounds || ""}
                                onChange={onRoundsChange}
                                placeholder="10"
                                min={1}
                                max={100}
                                disabled={isAutoBetting}
                                className="font-mono bg-background"
                            />
                        </div>
                        {isAutoBetting && (
                            <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className="font-mono text-sm font-bold text-primary">
                                    {autoBetCurrentRound} / {numberOfRounds}
                                </span>
                            </div>
                        )}

                        {isAutoBetting ? (
                            <Button
                                variant="destructive"
                                onClick={stopAutoBet}
                                className="font-bold uppercase tracking-wider"
                                >
                                Stop Auto Bet
                            </Button>
                        ) : (
                            <Button
                                disabled={!canStart}
                                onClick={startAutoBet}
                                className={cn(
                                    "font-bold uppercase tracking-wider",
                                    canStart &&
                                    "bg-emerald-600 hover:bg-emerald-500 text-white"
                                )}
                            >
                                Start Auto Bet
                            </Button>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default AutoBet