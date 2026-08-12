import { useMemo, useState } from "react";
import { computeMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/properties";

/** Roadmap 10.1 — EMI calculator reusing the same math as the /pricing page. */
export function EmiCalculator() {
  const [price, setPrice] = useState(7500000);
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8.5);

  const result = useMemo(
    () => computeMortgage({ price, downPct, years, rate }),
    [price, downPct, years, rate],
  );

  return (
    <div className="grid gap-6 rounded-3xl bg-secondary p-6 md:grid-cols-2 md:p-8">
      <div className="space-y-5">
        <Field
          label="Property price"
          value={formatPrice(price)}
          min={2000000}
          max={50000000}
          step={100000}
          current={price}
          onChange={setPrice}
        />
        <Field
          label="Down payment"
          value={`${downPct}%`}
          min={0}
          max={60}
          step={1}
          current={downPct}
          onChange={setDownPct}
        />
        <Field
          label="Loan term"
          value={`${years} years`}
          min={5}
          max={30}
          step={1}
          current={years}
          onChange={setYears}
        />
        <Field
          label="Interest rate"
          value={`${rate.toFixed(1)}%`}
          min={6}
          max={14}
          step={0.1}
          current={rate}
          onChange={setRate}
        />
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-surface p-6">
        <p className="text-sm text-muted-foreground">Estimated monthly EMI</p>
        <p className="mt-2 font-display text-4xl font-light tabular-nums">
          {formatPrice(Math.round(result.monthly))}
        </p>
        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between border-b border-border pb-2">
            <dt className="text-muted-foreground">Loan amount</dt>
            <dd className="tabular-nums">{formatPrice(Math.round(result.principal))}</dd>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <dt className="text-muted-foreground">Total interest</dt>
            <dd className="tabular-nums">{formatPrice(Math.round(result.interest))}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
      />
    </div>
  );
}
