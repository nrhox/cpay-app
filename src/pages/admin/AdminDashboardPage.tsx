import { Activity, ClipboardList, QrCode, Users, Wallet } from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import { users } from "../../dummy/users";
import { usePaymentStore } from "../../stores/payment.store";
import { selectTopups, useTopupStore } from "../../stores/topup.store";
import {
  selectTransactions,
  useTransactionStore,
} from "../../stores/transaction.store";
import { selectWallets, useWalletStore } from "../../stores/wallet.store";

export default function AdminDashboardPage() {
  const wallets = useWalletStore(selectWallets);
  const topups = useTopupStore(selectTopups);
  const transactions = useTransactionStore(selectTransactions);
  const paymentCodes = usePaymentStore((state) => state.paymentCodes);

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Admin Dashboard"
        description="Monitoring operasional CPay."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Users" value={users.length} icon={Users} />
        <StatCard label="Total Wallets" value={wallets.length} icon={Wallet} />
        <StatCard
          label="Pending Topups"
          value={topups.filter((topup) => topup.status === "PENDING").length}
          icon={ClipboardList}
        />
        <StatCard
          label="Active Codes"
          value={
            paymentCodes.filter(
              (paymentCode) => paymentCode.status === "ACTIVE",
            ).length
          }
          icon={QrCode}
        />
        <StatCard
          label="Transactions"
          value={transactions.length}
          icon={Activity}
        />
      </div>
    </div>
  );
}
