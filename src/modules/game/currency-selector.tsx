import { CURRENCY_CONFIG, ALL_CURRENCIES, CURRENCY_COLORS } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const CurrencySelector = () =>{

    const selectedCurrency = "BTC";
    const isFlipping = false;

    return (
        <div className="flex flex-col gap-3">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Currency
            </label>
            <div className="flex gap-2">
                {ALL_CURRENCIES.map((currency) => (
                    <Button
                        variant={
                            selectedCurrency === currency ? "default" : "outline"
                        }
                        size="sm"
                        disabled={isFlipping}
                        onClick={() => {}}
                        className={cn(
                            "flex-1 gap-2 font-mono transition-all ",
                            selectedCurrency === currency &&
                                "bg-primary shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                        )}
                        key={currency}
                    >
                        <span
                            className={cn(
                                "font-bold",
                                selectedCurrency === currency
                                    ? "text-primary-foreground"
                                    : CURRENCY_COLORS[currency]
                            )}
                        >
                            {CURRENCY_CONFIG[currency].icon}
                        </span>
                        {currency}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default CurrencySelector