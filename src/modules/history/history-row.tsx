import type { Currency, Bet } from "@/constants/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

const CURRENCY_COLORS: Record<Currency, string> = {
  BTC: "text-amber-400",
  ETH: "text-blue-400",
  SOL: "text-purple-400",
};

const HistoryRow = ({ bet }: { bet: Bet }) => {
  const isWin = bet.outcome === "win";
  const time = new Date(bet.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <TableRow className="border-border/30 hover:bg-card/80">
      <TableCell className="font-mono text-xs text-muted-foreground">
        {time}
      </TableCell>
      <TableCell>
        <span
          className={cn(
            "font-mono text-xs font-semibold",
            CURRENCY_COLORS[bet.currency]
          )}
        >
          {bet.currency}
        </span>
      </TableCell>
      <TableCell className="font-mono text-xs">
        {bet.amount.toFixed(2)}
      </TableCell>
      <TableCell>
        <Badge
          variant={isWin ? "default" : "destructive"}
          className={cn(
            "text-[10px] font-bold uppercase",
            isWin && "bg-emerald-600 hover:bg-emerald-500 text-white"
          )}
        >
          {bet.outcome}
        </Badge>
      </TableCell>
      <TableCell
        className={cn(
          "text-right font-mono text-xs font-semibold",
          isWin ? "text-emerald-400" : "text-red-400"
        )}
      >
        {bet.balanceAfter.toFixed(2)}
      </TableCell>
    </TableRow>
  );
}

export default HistoryRow;