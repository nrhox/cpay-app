import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useSearchParams } from "react-router";
import AdminListView, {
  type SortOption,
} from "../../../components/admin/AdminListView";
import { TopupTone } from "../../../components/admin/tone";
import Loading from "../../../components/general/loading";
import Badge from "../../../components/ui/Badge";
import PageHeader from "../../../components/ui/PageHeader";
import { useAdminListAllTopups } from "../../../feature/admin";
import { formatCurrency, formatDate } from "../../../utils/format";
import type { ITopupRequest } from "../../../types/topup";

const topupSortOptions: SortOption<ITopupRequest>[] = [
  {
    label: "Status",
    sort: "asc",
    sortBy: "status",
  },
  {
    label: "Request terbaru",
    sortBy: "requested_at",
    sort: "desc",
  },
  {
    label: "Nominal terbesar",
    sortBy: "amount",
    sort: "desc",
  },
];

export default function AdminTopupsPage() {
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
  } = useAdminListAllTopups({
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
        title="Top Up Requests"
        description="Approve atau cancel request pending."
      />
      <AdminListView
        items={data?.pages?.flatMap((v) => v.data ?? []) || []}
        searchPlaceholder="Cari referensi, bank, status, atau user"
        sortOptions={topupSortOptions}
        renderItem={(topup) => (
          <div
            key={topup._id}
            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link to={`/admin/topups/${topup._id}`} className="min-w-0 flex-1">
              <p className="text-primary text-sm font-semibold">
                {topup.wallet_id} | {topup.reference}
              </p>
              <p className="caption text-primary">
                {formatDate(topup.requested_at)} | {topup.user_id}
              </p>
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-primary text-sm font-bold">
                {formatCurrency(topup.amount)}
              </p>
              <Badge label={topup.status} tone={TopupTone(topup.status)} />
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
