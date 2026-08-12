import { ShieldCheck } from "lucide-react";

export function CertificationBadges({ certifications }: { certifications: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {certifications.map((c) => (
        <span
          key={c}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium"
        >
          <ShieldCheck className="size-3.5 text-primary" /> {c}
        </span>
      ))}
    </div>
  );
}
