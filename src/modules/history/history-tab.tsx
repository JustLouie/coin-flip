import type { Bet, BetFilters } from "@/constants/types";
import {ALL_CURRENCIES } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HistoryRow from "./history-row";
import { Input } from "@/components/ui/input";
import useBetHistory from "@/hooks/useBetHistory";


const HistoryTab = () => {
  const { bets, isLoading, filters, setFilters } = useBetHistory()

  function updateFilter(updates: Partial<BetFilters>) {
    setFilters((prev) => ({ ...prev, ...updates }));
  }

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>Bet History</CardTitle>
        <div className='flex flex-wrap items-center justify-between gap-3 pt-2'>
          {/* Filters by Currency */}
          <div className="flex gap-1.5">
            <Button
              variant={filters.currency === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter({ currency: "all" })}
              className="h-8 text-xs"
            >
              All
            </Button>
            {
              ALL_CURRENCIES.map((currency) => (
                <Button
                  key={currency}
                  variant={filters.currency === currency ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    updateFilter({
                      currency: filters.currency === currency ? "all" : currency,
                    })
                  }
                  className="h-8 text-xs"
                >
                  {currency}
                </Button>
              ))
            }
          </div>
          {/* Filters by Outcome (win/loss) */}
          <div className="flex gap-1.5">
            <Button
              variant={filters.outcome === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter({ outcome: "all" })}
              className="h-8 text-xs"
            >
              All Results
            </Button>
            <Button
              variant={filters.outcome === "win" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                updateFilter({
                  outcome: filters.outcome === "win" ? "all" : "win",
                })
              }
              className="h-8 text-xs"
            >
              Wins
            </Button>
            <Button
              variant={filters.outcome === "loss" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                updateFilter({
                  outcome: filters.outcome === "loss" ? "all" : "loss",
                })
              }
              className="h-8 text-xs"
            >
              Losses
            </Button>
          </div>
          {/* Filter by amount (balance after) */}
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-xs text-muted-foreground">
              Amount:
            </span>
            <Input
              type="number"
              value={filters.amount}
              onChange={(e) => updateFilter({ amount: e.target.value })}
              placeholder="0.00"
              className="h-8 w-50 bg-background font-mono text-xs"
              step="1"
              min={0}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {
          isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <p className="text-sm">No bets found</p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-xs">Time</TableHead>
                    <TableHead className="text-xs">Currency</TableHead>
                    <TableHead className="text-xs">Bet</TableHead>
                    <TableHead className="text-xs">Result</TableHead>
                    <TableHead className="text-xs text-right">
                      Balance After
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bets.map((bet: Bet) => (
                    <HistoryRow key={bet.id} bet={bet} />
                  ))}
                </TableBody>
              </Table>
            </div>
          )
        }

      </CardContent>
    </Card>
  )
}


export default HistoryTab;