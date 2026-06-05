import { Navigate, useLocation, useNavigate } from "react-router";
import PinInput from "../../../components/transactions/PinInput";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import { selectCurrentUser, useAuthStore } from "../../../stores/auth.store";
import { useTransactionStore } from "../../../stores/transaction.store";
import { selectWallets, useWalletStore } from "../../../stores/wallet.store";
import type { TransferForm } from "../../../types";
import { formatCurrency, makeId } from "../../../utils/format";

interface TransferPinState extends TransferForm {
  destinationAccount: string;
}

export default function TransferPinPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuthStore(selectCurrentUser);
  const wallets = useWalletStore(selectWallets).filter(
    (wallet) => wallet.userId === currentUser.id,
  );
  const adjustBalance = useWalletStore((state) => state.adjustBalance);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const transfer = location.state as TransferPinState | null;
  const selectedWallet = wallets.find(
    (wallet) => wallet.id === transfer?.fromWalletId,
  );

  if (!transfer?.destinationAccount || !transfer.fromWalletId)
    return <Navigate to="/transfer" replace />;

  const completeTransfer = () => {
    adjustBalance(transfer.fromWalletId, -Number(transfer.amount));
    addTransaction({
      id: makeId("trx"),
      walletId: transfer.fromWalletId,
      userId: currentUser.id,
      type: "TRANSFER",
      title: "Transfer sent",
      amount: Number(transfer.amount),
      direction: "OUT",
      counterparty: transfer.destinationAccount,
      status: "SUCCESS",
      createdAt: new Date().toISOString(),
    });
    navigate("/dashboard");
  };

  return (
    <div className="grid gap-5">
      <PageHeader
        title="PIN Transfer"
        description="Masukkan PIN 6 digit untuk menyelesaikan transfer."
      />
      <TransactionReview
        items={[
          { label: "Tujuan", value: transfer.destinationAccount },
          { label: "Wallet", value: selectedWallet?.name ?? "-" },
          { label: "Nominal", value: formatCurrency(Number(transfer.amount)) },
          { label: "Catatan", value: transfer.note || "-" },
        ]}
      />
      <Card className="max-w-xl">
        <PinInput onComplete={completeTransfer} />
      </Card>
    </div>
  );
}
