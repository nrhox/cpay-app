import { Link, useParams } from "react-router";
import TransactionList from "../../../components/transfer/TransactionList";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import WalletCard from "../../../components/wallet/WalletCard";
import {
  selectTransactions,
  useTransactionStore,
} from "../../../stores/transaction.store";
import { selectWallets, useWalletStore } from "../../../stores/wallet.store";
import { formatDate } from "../../../utils/format";

export default function WalletDetailPage() {
  const { id } = useParams();
  const wallet = useWalletStore(selectWallets).find((item) => item.id === id);
  const transactions = useTransactionStore(selectTransactions).filter(
    (transaction) => transaction.walletId === id,
  );

  if (!wallet) return <EmptyState title="Wallet tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={wallet.name}
        description={wallet.accountNumber}
        actions={
          <Link to="/wallets">
            <Button type="button" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />
      <WalletCard wallet={wallet} />
      <Card>
        <h2 className="subheading">Wallet Detail</h2>
        <div className="text-primary mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <p>Status: {wallet.status}</p>
          <p>Created: {formatDate(wallet.createdAt)}</p>
          <p>Currency: {wallet.currency}</p>
          <p>Primary: {wallet.isPrimary ? "Yes" : "No"}</p>
        </div>
      </Card>
      <Card>
        <h2 className="subheading mb-3">Transactions</h2>
        <TransactionList transactions={transactions} />
      </Card>
    </div>
  );
}
