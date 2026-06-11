import { CreditCard } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";
import Loading from "../../../components/general/loading";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import { useFindPaymentCodeDetails } from "../../../feature/payment";
import { formatCurrency, formatDate } from "../../../utils/format";

export default function DetailPayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFindPaymentCodeDetails(id);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data && !isLoading) {
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
          { label: "Merchant", value: data?.data?.merchant || "-" },
          { label: "Kode pembayaran", value: data?.data?.code || "-" },
          { label: "Nominal", value: formatCurrency(data?.data?.amount || 0) },
          {
            label: "Kadaluarsa",
            value: formatDate(data?.data?.expires_at || ""),
          },
          { label: "Catatan", value: data?.data?.note || "-" },
        ]}
      />
      <div className="grid max-w-xl">
        <Button
          type="button"
          onClick={() => navigate(`/pay/${data?.data?.code}/pin`)}
        >
          <CreditCard size={18} />
          Bayar
        </Button>
      </div>
    </div>
  );
}
