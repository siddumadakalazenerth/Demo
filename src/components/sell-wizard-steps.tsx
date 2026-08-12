import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export type WizardStep = { label: string };

/** Horizontal step pills + progress bar — same pill idiom as the Hero intent tabs and /faq state selector. */
export function SellWizardSteps({
  steps,
  activeIndex,
  completedSteps,
  onSelect,
}: {
  steps: WizardStep[];
  activeIndex: number;
  completedSteps: boolean[];
  onSelect: (index: number) => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => {
          const active = i === activeIndex;
          const done = completedSteps[i] && !active;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => onSelect(i)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : done
                    ? "border-border bg-secondary text-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              <span
                className={`grid size-4 shrink-0 place-items-center rounded-full text-[10px] ${
                  active
                    ? "bg-primary-foreground text-primary"
                    : done
                      ? "bg-primary text-primary-foreground"
                      : "bg-border text-foreground"
                }`}
              >
                {done ? <Check className="size-2.5" /> : i + 1}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>
      <Progress value={((activeIndex + 1) / steps.length) * 100} className="mt-4" />
      <p className="mt-1.5 text-xs text-muted-foreground">
        Step {activeIndex + 1} of {steps.length} — {steps[activeIndex]?.label}
      </p>
    </div>
  );
}
