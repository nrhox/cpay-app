import { ArrowDownLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import type { ITransaction } from "../../types/transaction";
import { formatCurrency, formatDate } from "../../utils/format";
import { getTransactionDirection } from "../../utils/transaction";
import EmptyState from "../ui/EmptyState";

export default function TransactionList({
  transactions,
  userId,
}: {
  transactions: ITransaction[];
  userId?: string;
}) {
  if (transactions.length === 0)
    return <EmptyState title="Belum ada transaksi" />;

  return (
    <div className="space-y-3">
      {transactions.map((transaction, i) => (
        <Link
          key={i}
          to={`/transactions/${transaction.reference}`}
          className="block"
        >
          <div className="border-neutral-muted bg-neutral-surface flex items-center gap-3 rounded-lg border p-4">
            <div className="bg-primary-soft text-primary grid h-10 w-10 shrink-0 place-items-center rounded-md">
              {getTransactionDirection(transaction, userId ?? "") === "IN" ? (
                <ArrowDownLeft size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-neutral-text truncate text-sm font-semibold">
                {transaction.reference}
              </p>
              <p className="caption text-neutral-text truncate">
                {transaction.type !== "TOPUP" &&
                getTransactionDirection(transaction, userId ?? "") === "IN"
                  ? "Dari " +
                    (transaction.source?.username ?? "") +
                    " | " +
                    (transaction.destination?.wallet_name ?? "")
                  : "Ke " +
                    (transaction.destination?.username ?? "Admin") +
                    " | " +
                    (transaction.destination?.wallet_name ?? "Admin")}{" "}
                |{" "}
                {formatDate(transaction.created_at ?? new Date().toISOString())}
              </p>
            </div>
            <p
              className={
                getTransactionDirection(transaction, userId ?? "") === "IN"
                  ? "text-success text-sm font-bold"
                  : "text-neutral-text text-sm font-bold"
              }
            >
              {getTransactionDirection(transaction, userId ?? "") === "IN"
                ? "+"
                : "-"}
              {formatCurrency(transaction.amount)}
            </p>
            <ChevronRight className="text-neutral-text shrink-0" size={18} />
          </div>
        </Link>
      ))}
    </div>
  );
}
