import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../stores/auth.store";
import type { ITransaction, ITransactionParty } from "../../types/transaction";
import { formatAccount, formatCurrency, formatDate } from "../../utils/format";
import Card from "../ui/Card";

const getStatusLabel = (status: string) => {
  switch (status) {
    case "SUCCESS":
      return "Berhasil";
    case "PENDING":
      return "Menunggu";
    case "FAILED":
      return "Gagal";
    case "CANCELLED":
      return "Dibatalkan";
    default:
      return status;
  }
};

const getTransactionTypeLabel = (type: string) => {
  switch (type) {
    case "TOPUP":
      return "Top Up Saldo";
    case "TRANSFER":
      return "Transfer Dana";
    case "PAYMENT":
      return "Pembayaran";
    default:
      return type;
  }
};

function TransactionParty({
  title,
  party,
  currentUserId,
}: {
  title: string;
  currentUserId: string;
  party: ITransactionParty;
}) {
  return (
    <Card className="p-4">
      <h3 className="text-primary-950 mb-2 border-b border-gray-200 pb-3 text-base font-bold">
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm md:grid-cols-2">
        {party.user_id !== currentUserId && (
          <div className="flex items-center justify-between border-b border-gray-50 py-1">
            <span className="text-primary">Nama Pengguna</span>
            <span className="text-primary-950 font-semibold">
              {party.username || "-"}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-gray-50 py-1">
          <span className="text-primary">Nama Dompet</span>
          <span className="text-primary-950 font-semibold">
            {party.wallet_name || "-"}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-50 py-1">
          <span className="text-primary">Nomor Rekening</span>
          <span className="text-primary-950 font-mono font-semibold">
            {party.account_number ? formatAccount(party.account_number) : "-"}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default function TransactionDetailCard({
  transaction,
}: {
  transaction: ITransaction;
}) {
  const userId = useAuthStore((state) => state.currentUser?._id ?? "");
  const [copiedRef, setCopiedRef] = useState(false);

  const handleCopy = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card className="p-4">
        <h3 className="text-primary-950 mb-2 border-b border-gray-200 pb-3 text-base font-bold">
          Informasi Transaksi
        </h3>

        <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm md:grid-cols-2">
          <div className="flex items-center justify-between border-b border-gray-50 py-1">
            <span className="text-primary">Nomor Referensi</span>
            <div className="text-primary-950 flex items-center gap-1.5 font-mono font-semibold">
              <span className="select-all">
                {transaction?.reference || "-"}
              </span>
              <button
                onClick={() => handleCopy(transaction?.reference || "")}
                className="hover:text-primary-600 rounded p-1 text-gray-400 transition hover:bg-gray-100"
                title="Salin Referensi"
              >
                {copiedRef ? (
                  <Check className="text-success h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-50 py-1">
            <span className="text-primary">Jenis Transaksi</span>
            <span className="text-primary-950 font-semibold">
              {getTransactionTypeLabel(transaction?.type)}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-50 py-1">
            <span className="text-primary">Status</span>
            <span
              className={`font-semibold ${transaction?.status === "SUCCESS" ? "text-success" : transaction?.status === "PENDING" ? "text-warning" : "text-danger"}`}
            >
              {getStatusLabel(transaction?.status)}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-50 py-1">
            <span className="text-primary">Jumlah</span>
            <span className="text-primary-950 font-bold">
              {formatCurrency(transaction?.amount || 0)}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-50 py-1">
            <span className="text-primary">Mata Uang</span>
            <span className="text-primary-950 font-semibold">
              {transaction?.currency || "-"}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-50 py-1">
            <span className="text-primary">Tanggal &amp; Waktu</span>
            <span className="text-primary-950 font-semibold">
              {transaction?.created_at
                ? formatDate(transaction.created_at)
                : "-"}
            </span>
          </div>

          <div className="flex items-start justify-between border-b border-gray-50 py-1">
            <span className="text-primary">Catatan</span>
            <span className="text-primary-950 max-w-50 text-right font-semibold wrap-break-word">
              {transaction?.note || "-"}
            </span>
          </div>
        </div>
      </Card>

      {transaction.source && (
        <TransactionParty
          currentUserId={userId}
          party={transaction.source}
          title="Detail Pengirim (Dari)"
        />
      )}

      {transaction.destination && (
        <TransactionParty
          currentUserId={userId}
          party={transaction.destination}
          title="Detail Penerima (Tujuan)"
        />
      )}
    </div>
  );
}
