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
import { useAdminGetAllUsers } from "../../../feature/admin";
import { formatDate } from "../../../utils/format";
import type { IUser } from "../../../types/user";

const UserSortOptions: SortOption<IUser>[] = [
  {
    label: "Terbaru",
    sortBy: "created_at",
    sort: "desc",
  },
  {
    label: "Nama A - Z",
    sortBy: "full_name",
    sort: "asc",
  },
  {
    label: "Nama Z - A",
    sortBy: "full_name",
    sort: "desc",
  },
  {
    label: "Status",
    sortBy: "status",
    sort: "asc",
  },
];

export default function AdminUsersPage() {
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
  } = useAdminGetAllUsers({
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
      <PageHeader title="User List" description="Daftar pengguna CPay." />
      <AdminListView
        items={data?.pages?.flatMap((v) => v.data ?? []) || []}
        searchPlaceholder="Cari nama, email, atau phone"
        sortOptions={UserSortOptions}
        renderItem={(user) => (
          <Link
            key={user._id}
            to={`/admin/users/${user._id}`}
            className="hover:bg-primary-50 flex items-center justify-between gap-3 p-4"
          >
            <div>
              <p className="text-primary text-sm font-semibold">
                {user.full_name}
              </p>
              <p className="caption text-primary">
                {user.email} | {formatDate(user.created_at)}
              </p>
            </div>
            <Badge
              label={user.status}
              tone={StatusTone(user.status ?? "ACTIVE")}
            />
          </Link>
        )}
      />
      {(hasNextPage || isFetching) && (
        <div ref={ref} className="h-5 w-full"></div>
      )}
      {(isFetchingNextPage || isLoading) && <Loading />}
    </div>
  );
}
