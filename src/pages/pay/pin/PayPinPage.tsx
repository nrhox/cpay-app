import { Navigate, useNavigate, useParams } from "react-router";
import PinInput from "../../../components/transactions/PinInput";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import { selectCurrentUser, useAuthStore } from "../../../stores/auth.store";
import { usePaymentStore } from "../../../stores/payment.store";
import { useTransactionStore } from "../../../stores/transaction.store";
import { useWalletStore } from "../../../stores/wallet.store";
import { formatCurrency, makeId } from "../../../utils/format";

export default function PayPinPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const paymentCode = usePaymentStore((state) =>
    state.paymentCodes.find(
      (item) => item.code === (id ?? "") && item.status === "ACTIVE",
    ),
  );

  const currentUser = useAuthStore(selectCurrentUser);
  const payPaymentCode = usePaymentStore((state) => state.payPaymentCode);
  const adjustBalance = useWalletStore((state) => state.adjustBalance);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  if (!paymentCode) {
    return <Navigate to="/pay" />;
  }

  const completePayment = () => {
    const paid = payPaymentCode(paymentCode.code);
    if (!paid) return;

    adjustBalance(paid.walletId, -paid.amount);
    addTransaction({
      id: makeId("trx"),
      walletId: paid.walletId,
      userId: currentUser.id,
      type: "PAYMENT",
      title: "Payment code paid",
      amount: paid.amount,
      direction: "OUT",
      counterparty: paid.merchant,
      status: "SUCCESS",
      createdAt: new Date().toISOString(),
    });
    navigate("/dashboard");
  };

  return (
    <div className="grid gap-5">
      <PageHeader
        title="PIN Pembayaran"
        description="Masukkan PIN 6 digit untuk menyelesaikan pembayaran."
      />
      <TransactionReview
        items={[
          { label: "Merchant", value: paymentCode.merchant },
          { label: "Kode pembayaran", value: paymentCode.code },
          { label: "Nominal", value: formatCurrency(paymentCode.amount) },
          { label: "Catatan", value: paymentCode.note || "-" },
        ]}
      />
      <Card className="max-w-xl">
        <PinInput onComplete={completePayment} />
      </Card>
    </div>
  );
}
