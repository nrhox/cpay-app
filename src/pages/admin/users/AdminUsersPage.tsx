import { Link } from "react-router";
import AdminListView, {
  type SortOption,
} from "../../../components/admin/AdminListView";
import { StatusTone } from "../../../components/admin/tone";
import Badge from "../../../components/ui/Badge";
import PageHeader from "../../../components/ui/PageHeader";
import { users } from "../../../dummy/users";
import type { User } from "../../../types";
import { NewestFirst, TextCompare } from "../../../utils/sort";

const UserSortOptions: SortOption<User>[] = [
  {
    label: "Nama A-Z",
    value: "name-asc",
    compare: (first, second) => TextCompare(first.name, second.name),
  },
  {
    label: "Terbaru",
    value: "created-desc",
    compare: (first, second) => NewestFirst(first.createdAt, second.createdAt),
  },
  {
    label: "Status",
    value: "status-asc",
    compare: (first, second) => TextCompare(first.status, second.status),
  },
];

export default function AdminUsersPage() {
  return (
    <div className="grid gap-5">
      <PageHeader title="User List" description="Daftar pengguna CPay." />
      <AdminListView
        items={users}
        searchPlaceholder="Cari nama, email, atau phone"
        searchText={(user) =>
          `${user.name} ${user.email} ${user.phone} ${user.role} ${user.status}`
        }
        sortOptions={UserSortOptions}
        renderItem={(user) => (
          <Link
            key={user.id}
            to={`/admin/users/${user.id}`}
            className="hover:bg-primary-50 flex items-center justify-between gap-3 p-4"
          >
            <div>
              <p className="text-primary text-sm font-semibold">{user.name}</p>
              <p className="caption text-primary">
                {user.email} | {user.phone}
              </p>
            </div>
            <Badge label={user.status} tone={StatusTone(user.status)} />
          </Link>
        )}
      />
    </div>
  );
}
