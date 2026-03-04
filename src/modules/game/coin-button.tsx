import { cn } from "@/lib/utils";
import type { CoinSide } from "@/constants/types";

const CoinButton = ({
  side,
  label,
  icon,
  selected,
  disabled,
  onClick,
}: {
  side: CoinSide;
  label: string;
  icon: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 transition-all",
        "hover:border-primary/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        selected
          ? side === "heads"
            ? "border-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
            : "border-slate-400 bg-slate-400/10 shadow-[0_0_15px_rgba(148,163,184,0.15)]"
          : "border-border bg-card/50"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold",
          selected
            ? side === "heads"
              ? "bg-amber-400 text-amber-950"
              : "bg-slate-400 text-slate-900"
            : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "text-sm font-semibold",
          selected ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </button>
  );
}

export default CoinButton