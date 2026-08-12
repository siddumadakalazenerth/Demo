import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatPrice, type PricePoint } from "@/lib/properties";

const config: ChartConfig = {
  price: { label: "Price", color: "var(--color-primary)" },
};

export function PriceHistoryChart({ data }: { data: PricePoint[] }) {
  return (
    <ChartContainer config={config} className="h-[220px] w-full">
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={70}
          tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`}
        />
        <ChartTooltip
          content={<ChartTooltipContent formatter={(value) => formatPrice(Number(value))} />}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="var(--color-price)"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
