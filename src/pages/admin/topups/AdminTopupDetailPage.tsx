import { Link, useParams } from "react-router";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import { users } from "../../../dummy/users";
import { selectTopups, useTopupStore } from "../../../stores/topup.store";
import { selectWallets, useWalletStore } from "../../../stores/wallet.store";
import { formatCurrency, formatDate } from "../../../utils/format";
import { ApproveTopupRequest } from "../../../components/admin/ApproveTopupRequest";

export default function AdminTopupDetailPage() {
  const { id } = useParams();
  const topup = useTopupStore(selectTopups).find((item) => item.id === id);
  const wallet = useWalletStore(selectWallets).find(
    (item) => item.id === topup?.walletId,
  );
  const owner = users.find((user) => user.id === topup?.userId);
  const cancelTopup = useTopupStore((state) => state.cancelTopup);

  if (!topup) return <EmptyState title="Top up tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={topup.reference}
        description="Detail request top up."
        actions={
          <Link to="/admin/topups">
            <Button type="button" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />
      <TransactionReview
        className="max-w-none"
        items={[
          { label: "User", value: owner?.name ?? topup.userId },
          { label: "Wallet", value: wallet?.name ?? topup.walletId },
          { label: "Bank", value: topup.bankName },
          { label: "Amount", value: formatCurrency(topup.amount) },
          { label: "Status", value: topup.status },
          { label: "Requested", value: formatDate(topup.requestedAt) },
          {
            label: "Reviewed",
            value: topup.reviewedAt ? formatDate(topup.reviewedAt) : "-",
          },
        ]}
      />
      <div className="flex gap-2">
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
  );
}
