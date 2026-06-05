import { Link } from "react-router";
import AdminListView, {
  type SortOption,
} from "../../../components/admin/AdminListView";
import { StatusTone } from "../../../components/admin/tone";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import { usePaymentStore } from "../../../stores/payment.store";
import type { PaymentCode } from "../../../types";
import { formatCurrency, formatDate } from "../../../utils/format";
import { NewestFirst, TextCompare } from "../../../utils/sort";

const paymentCodeSortOptions: SortOption<PaymentCode>[] = [
  {
    label: "Dibuat terbaru",
    value: "created-desc",
    compare: (first, second) => NewestFirst(first.createdAt, second.createdAt),
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

export default function AdminPaymentCodesPage() {
  const paymentCodes = usePaymentStore((state) => state.paymentCodes);
  const closePaymentCode = usePaymentStore((state) => state.closePaymentCode);

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Payment Code Monitoring"
        description="Pantau dan tutup payment code aktif."
      />
      <AdminListView
        items={paymentCodes}
        searchPlaceholder="Cari merchant, kode, status, atau user"
        searchText={(paymentCode) =>
          `${paymentCode.merchant} ${paymentCode.code} ${paymentCode.status} ${paymentCode.userId} ${paymentCode.walletId}`
        }
        sortOptions={paymentCodeSortOptions}
        renderItem={(paymentCode) => (
          <div
            key={paymentCode.id}
            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link
              to={`/admin/payment-codes/${paymentCode.id}`}
              className="min-w-0 flex-1"
            >
              <p className="text-primary text-sm font-semibold">
                {paymentCode.merchant}
              </p>
              <p className="caption text-primary">
                {paymentCode.code} | Expires {formatDate(paymentCode.expiresAt)}
              </p>
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-primary text-sm font-bold">
                {formatCurrency(paymentCode.amount)}
              </p>
              <Badge
                label={paymentCode.status}
                tone={StatusTone(paymentCode.status)}
              />
              <Button
                type="button"
                variant="danger"
                disabled={paymentCode.status !== "ACTIVE"}
                onClick={() => closePaymentCode(paymentCode.id)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
