import { ArrowDownLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import type { Transaction } from "../../types";
import { formatCurrency, formatDate } from "../../utils/format";
import EmptyState from "../ui/EmptyState";

export default function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  if (transactions.length === 0)
    return <EmptyState title="Belum ada transaksi" />;

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <Link
          key={transaction.id}
          to={`/transactions/${transaction.id}`}
          className="block"
        >
          <div className="border-light-gray flex items-center gap-3 rounded-lg border bg-white p-4">
            <div className="bg-primary-50 text-primary-700 grid h-10 w-10 shrink-0 place-items-center rounded-md">
              {transaction.direction === "IN" ? (
                <ArrowDownLeft size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-primary truncate text-sm font-semibold">
                {transaction.title}
              </p>
              <p className="caption text-primary truncate">
                {transaction.counterparty} | {formatDate(transaction.createdAt)}
              </p>
            </div>
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
            <ChevronRight className="text-primary shrink-0" size={18} />
          </div>
        </Link>
      ))}
    </div>
  );
}
