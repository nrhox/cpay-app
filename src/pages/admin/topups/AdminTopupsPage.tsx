import { Link } from "react-router";
import AdminListView, {
  type SortOption,
} from "../../../components/admin/AdminListView";
import { ApproveTopupRequest } from "../../../components/admin/ApproveTopupRequest";
import { TopupTone } from "../../../components/admin/tone";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import { selectTopups, useTopupStore } from "../../../stores/topup.store";
import type { TopupRequest } from "../../../types";
import { formatCurrency, formatDate } from "../../../utils/format";
import { NewestFirst, TextCompare } from "../../../utils/sort";

const topupSortOptions: SortOption<TopupRequest>[] = [
  {
    label: "Request terbaru",
    value: "requested-desc",
    compare: (first, second) =>
      NewestFirst(first.requestedAt, second.requestedAt),
  },
  {
    label: "Nominal terbesar",
    value: "amount-desc",
    compare: (first, second) => second.amount - first.amount,
  },
  {
    label: "Status",
    value: "status-asc",
    compare: (first, second) => TextCompare(first.status, second.status),
  },
];

export default function AdminTopupsPage() {
  const topups = useTopupStore(selectTopups);
  const cancelTopup = useTopupStore((state) => state.cancelTopup);

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Top Up Requests"
        description="Approve atau cancel request pending."
      />
      <AdminListView
        items={topups}
        searchPlaceholder="Cari referensi, bank, status, atau user"
        searchText={(topup) =>
          `${topup.reference} ${topup.bankName} ${topup.status} ${topup.userId} ${topup.walletId}`
        }
        sortOptions={topupSortOptions}
        renderItem={(topup) => (
          <div
            key={topup.id}
            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link to={`/admin/topups/${topup.id}`} className="min-w-0 flex-1">
              <p className="text-primary text-sm font-semibold">
                {topup.bankName} | {topup.reference}
              </p>
              <p className="caption text-primary">
                {formatDate(topup.requestedAt)} | {topup.userId}
              </p>
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-primary text-sm font-bold">
                {formatCurrency(topup.amount)}
              </p>
              <Badge label={topup.status} tone={TopupTone(topup.status)} />
              <Button
                type="button"
                disabled={topup.status !== "PENDING"}
                onClick={() => ApproveTopupRequest(topup)}
              >
                Approve
              </Button>
              <Button
                type="button"
                variant="danger"
                disabled={topup.status !== "PENDING"}
                onClick={() => cancelTopup(topup.id)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
