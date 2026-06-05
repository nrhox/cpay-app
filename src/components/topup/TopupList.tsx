import type { TopupRequest } from "../../types";
import { formatCurrency, formatDate } from "../../utils/format";
import Badge from "../ui/Badge";

const topupTone = (status: TopupRequest["status"]) => {
  if (status === "APPROVED") return "success";
  if (status === "PENDING") return "warning";
  return "danger";
};

export default function TopupList({ topups }: { topups: TopupRequest[] }) {
  return (
    <div className="divide-border border-light-gray divide-y rounded-lg border bg-white">
      {topups.map((topup) => (
        <div
          key={topup.id}
          className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-primary text-sm font-semibold">
              {topup.bankName} • {topup.reference}
            </p>
            <p className="caption text-primary">
              {formatDate(topup.requestedAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-primary text-sm font-bold">
              {formatCurrency(topup.amount)}
            </p>
            <Badge label={topup.status} tone={topupTone(topup.status)} />
          </div>
        </div>
      ))}
    </div>
  );
}
