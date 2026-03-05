import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
    label: string;
    value: string;
    valueClass?: string;
    sub?: string;
}

const StatCard = ({ label, value, valueClass, sub }: StatCardProps) => {

    return (
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
            <CardContent className="flex flex-col gap-1 pt-6">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                </span>
                <span
                    className={cn(
                        "text-2xl font-bold tabular-nums tracking-tight",
                        valueClass || "text-foreground"
                    )}
                >
                    {value}
                </span>
                {sub && (
                    <span className="text-xs text-muted-foreground">{sub}</span>
                )}
            </CardContent>
        </Card>
    );
}

export default StatCard;