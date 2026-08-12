import { ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

/** Roadmap 3.4 — select several localities within one search instead of one at a time. */
export function MultiLocationSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (loc: string) =>
    onChange(selected.includes(loc) ? selected.filter((l) => l !== loc) : [...selected, loc]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-left text-sm outline-none focus:ring-2 focus:ring-ring/30"
        >
          <span className={selected.length ? "text-foreground" : "text-muted-foreground"}>
            {selected.length ? `${selected.length} localities selected` : "Any locality"}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        <div className="max-h-64 space-y-1 overflow-y-auto">
          {options.map((loc) => (
            <label
              key={loc}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary"
            >
              <Checkbox checked={selected.includes(loc)} onCheckedChange={() => toggle(loc)} />
              {loc}
            </label>
          ))}
        </div>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="mt-2 w-full rounded-lg px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-secondary"
          >
            Clear localities
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
