import TransactionList from "../../components/transfer/TransactionList";
import PageHeader from "../../components/ui/PageHeader";
import { selectCurrentUser, useAuthStore } from "../../stores/auth.store";
import {
  selectTransactions,
  useTransactionStore,
} from "../../stores/transaction.store";

export default function TransactionHistoryPage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const transactions = useTransactionStore(selectTransactions).filter(
    (transaction) => transaction.userId === currentUser.id,
  );

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Transaction History"
        description="Riwayat transaksi wallet Anda."
      />
      <TransactionList transactions={transactions} />
    </div>
  );
}
