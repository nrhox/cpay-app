import { Link, useParams } from "react-router";
import PaymentCodeCard from "../../../components/payment/PaymentCodeCard";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import { usePaymentStore } from "../../../stores/payment.store";
import { formatCurrency, formatDate } from "../../../utils/format";

export default function PaymentCodeDetailPage() {
  const { id } = useParams();
  const paymentCode = usePaymentStore((state) =>
    state.paymentCodes.find((item) => item.id === id),
  );

  if (!paymentCode) return <EmptyState title="Payment code tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={paymentCode.merchant}
        description={paymentCode.code}
        actions={
          <Link to="/payment-codes">
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
          { label: "Amount", value: formatCurrency(paymentCode.amount) },
          { label: "Status", value: paymentCode.status },
          { label: "Created", value: formatDate(paymentCode.createdAt) },
          { label: "Expires", value: formatDate(paymentCode.expiresAt) },
          { label: "Note", value: paymentCode.note || "-" },
        ]}
      />
    </div>
  );
}
