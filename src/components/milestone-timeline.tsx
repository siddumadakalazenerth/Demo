export function MilestoneTimeline({
  milestones,
}: {
  milestones: { year: number; label: string }[];
}) {
  return (
    <ol className="space-y-5">
      {milestones.map((m) => (
        <li key={m.year} className="flex gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {m.year}
          </span>
          <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
        </li>
      ))}
    </ol>
  );
}
