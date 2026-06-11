import { Link, useParams } from "react-router";
import Loading from "../../../components/general/loading";
import PaymentCodeCard from "../../../components/payment/PaymentCodeCard";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import {
  useAdminCancelPaymentCode,
  useAdminGetPaymentCode,
} from "../../../feature/admin";
import { formatCurrency, formatDate } from "../../../utils/format";

export default function AdminPaymentCodeDetailPage() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useAdminGetPaymentCode(id);
  const { mutate, isPending, isSuccess } = useAdminCancelPaymentCode(id ?? "", {
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data && !isLoading)
    return <EmptyState title="Payment code tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={data?.data?.merchant || ""}
        description={data?.data?.code}
        actions={
          <Link to="/admin/payment-codes">
            <Button type="button" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />
      <PaymentCodeCard paymentCode={data?.data} />
      <TransactionReview
        className="max-w-none"
        items={[
          { label: "User", value: data?.data?.user_id ?? "-" },
          { label: "Wallet", value: data?.data?.wallet_id ?? "-" },
          { label: "Amount", value: formatCurrency(data?.data?.amount ?? 0) },
          { label: "Status", value: data?.data?.status ?? "-" },
          { label: "Created", value: formatDate(data?.data?.created_at || "") },
          { label: "Expires", value: formatDate(data?.data?.expires_at || "") },
          { label: "Note", value: data?.data?.note || "-" },
        ]}
      />
      {data?.data?.status === "ACTIVE" && (
        <div className="grid max-w-xl">
          <Button
            type="button"
            variant="danger"
            disabled={isLoading || isPending || isSuccess}
            onClick={() => mutate()}
          >
            Close Payment Code
          </Button>
        </div>
      )}
    </div>
  );
}
