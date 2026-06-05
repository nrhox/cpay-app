import { Link, useParams } from "react-router";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import WalletCard from "../../../components/wallet/WalletCard";
import { users } from "../../../dummy/users";
import { selectWallets, useWalletStore } from "../../../stores/wallet.store";
import { formatDate } from "../../../utils/format";
import AdminTransactionList from "../transactions/AdminTransactionList";

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const user = users.find((item) => item.id === id);
  const wallets = useWalletStore(selectWallets).filter(
    (wallet) => wallet.userId === id,
  );

  if (!user) return <EmptyState title="User tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={user.name}
        description={user.email}
        actions={
          <Link to="/admin/users">
            <Button type="button" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />
      <TransactionReview
        className="max-w-none"
        items={[
          { label: "Phone", value: user.phone },
          { label: "Role", value: user.role },
          { label: "Status", value: user.status },
          { label: "Created", value: formatDate(user.createdAt) },
        ]}
      />
      <div className="flex gap-2">
        <Button type="button">Open Suspend</Button>
        <Button type="button" variant="danger">
          Suspend
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {wallets.map((wallet) => (
          <Link key={wallet.id} to={`/admin/wallets/${wallet.id}`}>
            <WalletCard wallet={wallet} />
          </Link>
        ))}
      </div>
      <AdminTransactionList />
    </div>
  );
}
