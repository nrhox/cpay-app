import { QrCode } from "lucide-react";
import { Link } from "react-router";
import PaymentCodeCard from "../../components/payment/PaymentCodeCard";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import { selectCurrentUser, useAuthStore } from "../../stores/auth.store";
import { usePaymentStore } from "../../stores/payment.store";

export default function PaymentCodesPage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const paymentCodes = usePaymentStore((state) => state.paymentCodes).filter(
    (paymentCode) => paymentCode.userId === currentUser.id,
  );

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Payment Codes"
        description="Kode pembayaran yang dibuat untuk merchant."
        actions={
          <Link to="/payment-codes/create">
            <Button type="button">
              <QrCode size={18} />
              Create
            </Button>
          </Link>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paymentCodes.map((paymentCode) => (
          <Link key={paymentCode.id} to={`/payment-codes/${paymentCode.id}`}>
            <PaymentCodeCard paymentCode={paymentCode} />
          </Link>
        ))}
      </div>
    </div>
  );
}
