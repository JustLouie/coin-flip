import { ALL_CURRENCIES, CURRENCY_COLORS, CURRENCY_CONFIG } from "@/constants"
import { cn } from "@/lib/utils"


const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-400 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-base font-bold tracking-tight text-foreground">
                        CoinFlip
                    </h1>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                        Crypto Simulator
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {ALL_CURRENCIES.map((currency) => (
                        <div key={currency} className="flex items-center gap-1.5">
                            <span
                                className={cn(
                                    "text-xs font-bold",
                                    CURRENCY_COLORS[currency]
                                )}
                            >
                                {CURRENCY_CONFIG[currency].icon} {currency}
                            </span>
                            <span className="font-mono text-xs text-foreground">
                                1000
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Header