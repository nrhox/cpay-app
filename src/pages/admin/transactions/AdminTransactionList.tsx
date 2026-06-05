import { Link } from "react-router";
import AdminListView from "../../../components/admin/AdminListView";
import { StatusTone } from "../../../components/admin/tone";
import Badge from "../../../components/ui/Badge";
import {
  selectTransactions,
  useTransactionStore,
} from "../../../stores/transaction.store";
import { formatCurrency, formatDate } from "../../../utils/format";
import { TransactionSortOptions } from "../AdminConstant";

export default function AdminTransactionList() {
  const transactions = useTransactionStore(selectTransactions);

  return (
    <AdminListView
      items={transactions}
      searchPlaceholder="Cari transaksi, counterparty, status, atau user"
      searchText={(transaction) =>
        `${transaction.title} ${transaction.counterparty} ${transaction.type} ${transaction.status} ${transaction.userId} ${transaction.walletId}`
      }
      sortOptions={TransactionSortOptions}
      renderItem={(transaction) => (
        <Link
          key={transaction.id}
          to={`/admin/transactions/${transaction.id}`}
          className="hover:bg-primary-50 flex items-center justify-between gap-3 p-4"
        >
          <div>
            <p className="text-primary text-sm font-semibold">
              {transaction.title}
            </p>
            <p className="caption text-primary">
              {transaction.counterparty} | {formatDate(transaction.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p
              className={
                transaction.direction === "IN"
                  ? "text-success text-sm font-bold"
                  : "text-primary text-sm font-bold"
              }
            >
              {transaction.direction === "IN" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>
            <Badge
              label={transaction.status}
              tone={StatusTone(transaction.status)}
            />
          </div>
        </Link>
      )}
    />
  );
}
