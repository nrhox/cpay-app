import { Link, useParams } from "react-router";
import Loading from "../../../components/general/loading";
import PaymentCodeCard from "../../../components/payment/PaymentCodeCard";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import { useFindPaymentCodeDetails } from "../../../feature/payment";
import { formatCurrency, formatDate } from "../../../utils/format";

export default function PaymentCodeDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useFindPaymentCodeDetails(id);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data && !isLoading)
    return <EmptyState title="Payment code tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={data?.data?.merchant || "-"}
        description={data?.data?.note || "-"}
        actions={
          <Link to="/payment-codes">
            <Button type="button" variant="secondary">
              Kembali
            </Button>
          </Link>
        }
      />
      <PaymentCodeCard paymentCode={data?.data || undefined} copyIcon={true} />
      <TransactionReview
        className="max-w-none"
        items={[
          { label: "Jumlah", value: formatCurrency(data?.data?.amount || 0) },
          { label: "Status", value: data?.data?.status || "" },
          { label: "Dibuat", value: formatDate(data?.data?.created_at || "") },
          {
            label: "Kadaluarsa",
            value: formatDate(data?.data?.expires_at || ""),
          },
          { label: "Catatan", value: data?.data?.note || "-" },
        ]}
      />
    </div>
  );
}
