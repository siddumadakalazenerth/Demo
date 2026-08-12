export function computeMortgage({
  price,
  downPct,
  years,
  rate,
}: {
  price: number;
  downPct: number;
  years: number;
  rate: number;
}) {
  const down = (price * downPct) / 100;
  const principal = Math.max(price - down, 0);
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  const total = monthly * n;
  return { down, principal, monthly, total, interest: total - principal };
}
