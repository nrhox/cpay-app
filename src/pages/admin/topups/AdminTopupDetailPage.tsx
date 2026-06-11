import { Link, useParams } from "react-router";
import Loading from "../../../components/general/loading";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import {
  useAdminApproveTopup,
  useAdminGetTopup,
  useAdminRejectTopup,
} from "../../../feature/admin";
import { formatCurrency, formatDate } from "../../../utils/format";

export default function AdminTopupDetailPage() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useAdminGetTopup(id);
  const {
    mutate: setApproved,
    isPending: isPendingApproved,
    isSuccess: isSuccessApproved,
  } = useAdminApproveTopup(id ?? "", {
    onSuccess: () => {
      refetch();
    },
  });

  const {
    mutate: setReject,
    isPending: isPendingReject,
    isSuccess: isSuccessReject,
  } = useAdminRejectTopup(id ?? "", {
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data && !isLoading)
    return <EmptyState title="Top up tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={data?.data?.reference ?? ""}
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
          { label: "User", value: data?.data?.user_id || "-" },
          { label: "Wallet", value: data?.data?.wallet_id || "-" },
          { label: "Amount", value: formatCurrency(data?.data?.amount ?? 0) },
          { label: "Status", value: data?.data?.status || "" },
          {
            label: "Requested",
            value: formatDate(data?.data?.requested_at || ""),
          },
        ]}
      />
      {data?.data?.status === "PENDING" && (
        <div className="flex gap-2">
          <Button
            type="button"
            disabled={
              isPendingApproved ||
              isPendingReject ||
              isLoading ||
              isSuccessApproved ||
              isSuccessReject
            }
            onClick={() => setApproved()}
          >
            Approve
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={
              isPendingApproved ||
              isPendingReject ||
              isLoading ||
              isSuccessApproved ||
              isSuccessReject
            }
            onClick={() => setReject()}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
