import { Link, useParams } from "react-router";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import WalletCard from "../../../components/wallet/WalletCard";
import { users } from "../../../dummy/users";
import { selectWallets, useWalletStore } from "../../../stores/wallet.store";
import { formatCurrency, formatDate } from "../../../utils/format";

export default function AdminWalletDetailPage() {
  const { id } = useParams();
  const wallet = useWalletStore(selectWallets).find((item) => item.id === id);
  const owner = users.find((user) => user.id === wallet?.userId);

  if (!wallet) return <EmptyState title="Wallet tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={wallet.name}
        description={wallet.accountNumber}
        actions={
          <Link to="/admin/wallets">
            <Button type="button" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />
      <WalletCard wallet={wallet} />
      <TransactionReview
        className="max-w-none"
        items={[
          { label: "Owner", value: owner?.name ?? wallet.userId },
          { label: "User ID", value: wallet.userId },
          { label: "Status", value: wallet.status },
          { label: "Balance", value: formatCurrency(wallet.balance) },
          { label: "Primary", value: wallet.isPrimary ? "Yes" : "No" },
          { label: "Created", value: formatDate(wallet.createdAt) },
        ]}
      />
    </div>
  );
}
