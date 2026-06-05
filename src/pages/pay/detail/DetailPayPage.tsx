import { CreditCard } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import { usePaymentStore } from "../../../stores/payment.store";
import { formatCurrency, formatDate } from "../../../utils/format";

export default function DetailPayPage() {
  const { id } = useParams();
  const paymentCode = usePaymentStore((state) =>
    state.paymentCodes.find(
      (item) => item.code === (id ?? "") && item.status === "ACTIVE",
    ),
  );
  const navigate = useNavigate();

  if (!paymentCode) {
    return <Navigate to="/pay" />;
  }

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Rangkuman Pembayaran"
        description="Periksa detail pembayaran sebelum memasukkan PIN."
      />
      <TransactionReview
        items={[
          { label: "Merchant", value: paymentCode.merchant },
          { label: "Kode pembayaran", value: paymentCode.code },
          { label: "Nominal", value: formatCurrency(paymentCode.amount) },
          { label: "Kadaluarsa", value: formatDate(paymentCode.expiresAt) },
          { label: "Catatan", value: paymentCode.note || "-" },
        ]}
      />
      <div className="grid max-w-xl">
        <Button
          type="button"
          onClick={() => navigate(`/pay/${paymentCode.code}/pin`)}
        >
          <CreditCard size={18} />
          Bayar
        </Button>
      </div>
    </div>
  );
}
