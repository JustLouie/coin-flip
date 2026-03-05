import useBetHistory from "@/hooks/useBetHistory";
import { cn } from "@/lib/utils";
import { ALL_CURRENCIES, CURRENCY_COLORS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "./stat-card";

const StatisticsTab = () => {
    const { stats, isLoading } = useBetHistory();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12 min-w-lg">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        )
    }

    if (!stats || stats.total === 0) {
        return (
            <Card className="border-border/50 bg-card/60 backdrop-blur-sm min-w-lg">
                <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <p className="text-sm">No statistics yet</p>
                    <p className="mt-1 text-xs">
                        Place some bets to see your performance
                    </p>
                </CardContent>
            </Card>
        )
    }

    const totalProfitLoss = ALL_CURRENCIES.reduce(
        (sum, c) => sum + stats.profitLoss[c],
        0
    );

    const isProfit = totalProfitLoss >= 0;

    return (
        <div className="flex flex-col gap-6 min-w-lg">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4  ">
                <StatCard label="Total Bets" value={stats.total.toString()} />
                
                <StatCard
                    label="Win / Loss Ratio"
                    value={`${stats.wins} / ${stats.losses}`}
                    sub={`${stats.winRate.toFixed(1)}% win rate`}
                    valueClass={stats.winRate >= 50 ? "text-emerald-400" : "text-red-400"}
                />

                <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
                    <CardContent className="flex flex-col gap-2 pt-6">
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Biggest Win / Loss
                        </span>
                        <div className="flex items-baseline gap-3">
                            <span className="font-mono text-xl font-bold tabular-nums text-emerald-400">
                                +{stats.biggestWin.toFixed(2)}
                            </span>
                            <span className="text-muted-foreground">/</span>
                            <span className="font-mono text-xl font-bold tabular-nums text-red-400">
                                -{stats.biggestLoss.toFixed(2)}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
                    <CardContent className="flex flex-col gap-2 pt-6">
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Current Profit / Loss
                        </span>
                        <span
                            className={cn(
                                "font-mono text-2xl font-bold tabular-nums",
                                isProfit ? "text-emerald-400" : "text-red-400"
                            )}
                        >
                            {isProfit ? "+" : ""}
                            {totalProfitLoss.toFixed(2)}
                        </span>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                            {ALL_CURRENCIES.map((c) => {
                                const val = stats.profitLoss[c];
                                if (val === 0) return null;
                                return (
                                    <span
                                        key={c}
                                        className="flex items-center gap-1 text-xs"
                                    >
                                        <span className={cn("font-semibold", CURRENCY_COLORS[c])}>
                                            {c}
                                        </span>
                                        <span
                                            className={cn(
                                                "font-mono",
                                                val >= 0 ? "text-emerald-400" : "text-red-400"
                                            )}
                                        >
                                            {val >= 0 ? "+" : ""}
                                            {val.toFixed(2)}
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default StatisticsTab;