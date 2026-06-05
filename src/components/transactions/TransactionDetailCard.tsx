import type { Transaction } from "../../types";
import { formatCurrency, formatDate } from "../../utils/format";
import Card from "../ui/Card";

export default function TransactionDetailCard({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <Card>
      <div className="text-primary grid gap-3 text-sm sm:grid-cols-2">
        <p>Jenis: {transaction.type}</p>
        <p>Status: {transaction.status}</p>
        <p>
          Jumlah:{" "}
          <span
            className={
              transaction.direction === "IN"
                ? "text-success text-sm font-bold"
                : "text-primary text-sm font-bold"
            }
          >
            {transaction.direction === "IN" ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </span>
        </p>
        <p>Arah: {transaction.direction}</p>
        <p>Tujuan: {transaction.counterparty}</p>
        <p>Tanggal: {formatDate(transaction.createdAt)}</p>
        <p className="sm:col-span-2">Judul: {transaction.title}</p>
      </div>
    </Card>
  );
}
