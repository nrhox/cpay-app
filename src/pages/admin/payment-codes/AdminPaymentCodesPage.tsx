import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useSearchParams } from "react-router";
import AdminListView, {
  type SortOption,
} from "../../../components/admin/AdminListView";
import { StatusTone } from "../../../components/admin/tone";
import Loading from "../../../components/general/loading";
import Badge from "../../../components/ui/Badge";
import PageHeader from "../../../components/ui/PageHeader";
import { useAdminListAllPaymentCodes } from "../../../feature/admin";
import { formatCurrency, formatDate } from "../../../utils/format";
import type { IPaymentCode } from "../../../types/paymentCode";

const paymentCodeSortOptions: SortOption<IPaymentCode>[] = [
  {
    label: "Dibuat terbaru",
    sortBy: "created_at",
    sort: "desc",
  },
  {
    label: "Nominal terbesar",
    sort: "desc",
    sortBy: "amount",
  },
  {
    label: "Status",
    sortBy: "status",
    sort: "desc",
  },
];

export default function AdminPaymentCodesPage() {
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const sort_by = searchParams.get("sort_by") || "";
  const sort = searchParams.get("sort") || "";

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = useAdminListAllPaymentCodes({
    q,
    sort,
    sort_by,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Payment Code Monitoring"
        description="Pantau dan tutup payment code aktif."
      />
      <AdminListView
        items={data?.pages?.flatMap((v) => v.data ?? []) || []}
        searchPlaceholder="Cari merchant, kode atau status"
        sortOptions={paymentCodeSortOptions}
        renderItem={(paymentCode) => (
          <div
            key={paymentCode._id}
            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link
              to={`/admin/payment-codes/${paymentCode._id}`}
              className="min-w-0 flex-1"
            >
              <p className="text-primary text-sm font-semibold">
                {paymentCode.merchant}
              </p>
              <p className="caption text-primary">
                {paymentCode.code} | Expires{" "}
                {formatDate(paymentCode.expires_at)}
              </p>
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-primary text-sm font-bold">
                {formatCurrency(paymentCode.amount)}
              </p>
              <Badge
                label={paymentCode.status}
                tone={StatusTone(paymentCode.status)}
              />
            </div>
          </div>
        )}
      />

      {(hasNextPage || isFetching) && (
        <div ref={ref} className="h-5 w-full"></div>
      )}
      {(isFetchingNextPage || isLoading) && <Loading />}
    </div>
  );
}
