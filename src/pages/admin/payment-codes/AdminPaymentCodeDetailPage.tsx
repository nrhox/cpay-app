import { Link, useParams } from "react-router";
import PaymentCodeCard from "../../../components/payment/PaymentCodeCard";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import { users } from "../../../dummy/users";
import { usePaymentStore } from "../../../stores/payment.store";
import { selectWallets, useWalletStore } from "../../../stores/wallet.store";
import { formatCurrency, formatDate } from "../../../utils/format";

export default function AdminPaymentCodeDetailPage() {
  const { id } = useParams();
  const paymentCode = usePaymentStore((state) =>
    state.paymentCodes.find((item) => item.id === id),
  );
  const closePaymentCode = usePaymentStore((state) => state.closePaymentCode);
  const wallet = useWalletStore(selectWallets).find(
    (item) => item.id === paymentCode?.walletId,
  );
  const owner = users.find((user) => user.id === paymentCode?.userId);

  if (!paymentCode) return <EmptyState title="Payment code tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={paymentCode.merchant}
        description={paymentCode.code}
        actions={
          <Link to="/admin/payment-codes">
            <Button type="button" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />
      <PaymentCodeCard paymentCode={paymentCode} />
      <TransactionReview
        className="max-w-none"
        items={[
          { label: "User", value: owner?.name ?? paymentCode.userId },
          { label: "Wallet", value: wallet?.name ?? paymentCode.walletId },
          { label: "Amount", value: formatCurrency(paymentCode.amount) },
          { label: "Status", value: paymentCode.status },
          { label: "Created", value: formatDate(paymentCode.createdAt) },
          { label: "Expires", value: formatDate(paymentCode.expiresAt) },
          { label: "Note", value: paymentCode.note || "-" },
        ]}
      />
      <div className="grid max-w-xl">
        <Button
          type="button"
          variant="danger"
          disabled={paymentCode.status !== "ACTIVE"}
          onClick={() => closePaymentCode(paymentCode.id)}
        >
          Close Payment Code
        </Button>
      </div>
    </div>
  );
}
