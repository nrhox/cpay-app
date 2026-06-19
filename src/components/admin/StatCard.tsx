import type { LucideIcon } from "lucide-react";
import Card from "../ui/Card";

export default function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="caption text-neutral-text">{label}</p>
          <p className="text-neutral-text mt-1 text-2xl font-bold">{value}</p>
        </div>
        <div className="bg-primary-soft text-primary grid h-11 w-11 place-items-center rounded-md">
          <Icon size={22} />
        </div>
      </div>
    </Card>
  );
}
