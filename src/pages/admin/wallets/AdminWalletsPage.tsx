import { Link } from "react-router";
import AdminListView, {
  type SortOption,
} from "../../../components/admin/AdminListView";
import { StatusTone } from "../../../components/admin/tone";
import Badge from "../../../components/ui/Badge";
import PageHeader from "../../../components/ui/PageHeader";
import { selectWallets, useWalletStore } from "../../../stores/wallet.store";
import type { Wallet } from "../../../types";
import { formatCurrency } from "../../../utils/format";
import { NewestFirst, TextCompare } from "../../../utils/sort";

const WalletSortOptions: SortOption<Wallet>[] = [
  {
    label: "Nama A-Z",
    value: "name-asc",
    compare: (first, second) => TextCompare(first.name, second.name),
  },
  {
    label: "Saldo terbesar",
    value: "balance-desc",
    compare: (first, second) => second.balance - first.balance,
  },
  {
    label: "Terbaru",
    value: "created-desc",
    compare: (first, second) => NewestFirst(first.createdAt, second.createdAt),
  },
];

export default function AdminWalletsPage() {
  const wallets = useWalletStore(selectWallets);

  return (
    <div className="grid gap-5">
      <PageHeader title="Wallet List" description="Semua wallet pengguna." />
      <AdminListView
        items={wallets}
        searchPlaceholder="Cari wallet, account, atau user"
        searchText={(wallet) =>
          `${wallet.name} ${wallet.accountNumber} ${wallet.userId} ${wallet.status}`
        }
        sortOptions={WalletSortOptions}
        renderItem={(wallet) => (
          <Link
            key={wallet.id}
            to={`/admin/wallets/${wallet.id}`}
            className="hover:bg-primary-50 flex items-center justify-between gap-3 p-4"
          >
            <div>
              <p className="text-primary text-sm font-semibold">
                {wallet.name}
              </p>
              <p className="caption text-primary">
                {wallet.accountNumber} | {wallet.userId}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-primary text-sm font-bold">
                {formatCurrency(wallet.balance)}
              </p>
              <Badge label={wallet.status} tone={StatusTone(wallet.status)} />
            </div>
          </Link>
        )}
      />
    </div>
  );
}
