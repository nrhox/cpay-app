import { useAuthStore } from "../../stores/auth.store";
import type { ITransaction } from "../../types/transaction";
import { formatCurrency, formatDate } from "../../utils/format";
import { getTransactionDirection } from "../../utils/transaction";
import Card from "../ui/Card";

export default function TransactionDetailCard({
  transaction,
}: {
  transaction: ITransaction;
}) {
  const userId = useAuthStore((state) => state.currentUser?._id);
  return (
    <Card>
      <div className="text-primary grid gap-3 text-sm sm:grid-cols-2">
        <p>Referensi: {transaction?.reference || "-"}</p>
        <p>Jenis: {transaction?.type}</p>
        <p>Status: {transaction?.status}</p>
        <p>
          Jumlah:{" "}
          <span
            className={
              getTransactionDirection(transaction, userId || "") === "IN"
                ? "text-success text-sm font-bold"
                : "text-primary text-sm font-bold"
            }
          >
            {getTransactionDirection(transaction, userId || "") === "IN"
              ? "+"
              : "-"}
            {formatCurrency(transaction.amount)}
          </span>
        </p>
        <p>
          Arah:{" "}
          {getTransactionDirection(transaction, userId || "") === "IN"
            ? "Masuk"
            : "Keluar"}
        </p>
        <p>
          Tujuan: {transaction.destination?.username || "-"} |{" "}
          {transaction.destination?.wallet_name || "-"}
        </p>
        <p>
          Dari: {transaction.source?.username || "-"} |{" "}
          {transaction.source?.wallet_name || "-"}
        </p>
        <p>Catatan: {transaction.note ?? "-"}</p>
        <p>Tanggal: {formatDate(transaction.created_at)}</p>
      </div>
    </Card>
  );
}
