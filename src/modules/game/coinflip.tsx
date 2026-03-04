import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useGameContext } from "@/contexts/GameProvider";

const CoinFlip = () => {
    const { isFlipping, lastResult } = useGameContext();

    const [landedSide, setLandedSide] = useState<"heads" | "tails" | null>(null);

    const flipKey = useRef(0);

    const showResult = !isFlipping && lastResult;
    const isWin = lastResult?.outcome === "win";

    useEffect(() => {
        if (lastResult?.side) {
            setLandedSide(lastResult.side);
        }
    }, [lastResult]);

    
    useEffect(() => {
        if (isFlipping) {
            flipKey.current += 1;
        }
    }, [isFlipping]);


    const getAnimationClass = () => {
        if (isFlipping) {
            return landedSide === "tails"
                ? "animate-coin-flip-tails"
                : "animate-coin-flip-heads";
        }

        
        if (landedSide === "tails") return "rotate-y-180";
            return "";
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative">
                <div 
                    className={cn(
                        "relative h-40 w-40 transition-transform duration-100 transform-3d",
                        getAnimationClass()
                    )}
                >
                    {/* Heads */}
                    <div
                        className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-amber-400/60 bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_30px_rgba(251,191,36,0.3)] backface-hidden"
                        
                    >
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold text-amber-950">H</span>
                            <span className="text-xs font-semibold tracking-wider text-amber-900">
                                HEADS
                            </span>
                        </div>
                        <div className="absolute inset-2 rounded-full border-2 border-amber-300/40" />
                    </div>

                    {/* Tails */}
                    <div
                        className='absolute inset-0 flex items-center justify-center rounded-full border-4 border-slate-400/60 bg-gradient-to-br from-slate-300 to-slate-500 shadow-[0_0_30px_rgba(148,163,184,0.3)] backface-hidden rotate-y-180'
                    >
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold text-slate-900">T</span>
                            <span className="text-xs font-semibold tracking-wider text-slate-800">
                                TAILS
                            </span>
                        </div>
                        <div className="absolute inset-2 rounded-full border-2 border-slate-200/40" />
                    </div>
                </div>
            </div>
            <div className="flex h-16 items-center justify-center">
                {isFlipping && (
                    <p className="animate-pulse text-sm font-medium text-muted-foreground">
                        Flipping...
                    </p>
                )}
                {showResult && (
                    <div
                        className={cn(
                            "flex flex-col items-center gap-1 animate-in fade-in zoom-in-95 duration-300",
                            isWin ? "text-emerald-400" : "text-red-400"
                        )}
                    >
                        <p className="text-2xl font-bold">
                            {isWin ? "YOU WIN!" : "YOU LOSE"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Landed on{" "}
                            <span className="font-semibold text-foreground">
                                {lastResult.side.toUpperCase()}
                            </span>
                            {isWin && (
                                <span className="text-emerald-400">
                                    {" "}
                                    +{lastResult.bet.profit.toFixed(2)}{" "}
                                    {lastResult.bet.currency}
                                </span>
                            )}
                        </p>
                    </div>
                )}
                {!isFlipping && !lastResult && (
                    <p className="text-sm text-muted-foreground">
                        Place a bet and flip the coin
                    </p>
                )}
            </div>
        </div>
    )
}

export default CoinFlip