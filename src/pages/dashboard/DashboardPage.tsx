import { Banknote, CreditCard, QrCode, Send } from "lucide-react";
import { Link } from "react-router";
import TransactionList from "../../components/transfer/TransactionList";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import WalletCard from "../../components/wallet/WalletCard";
import { selectCurrentUser, useAuthStore } from "../../stores/auth.store";
import {
  selectTransactions,
  useTransactionStore,
} from "../../stores/transaction.store";
import {
  selectActiveWalletId,
  selectWallets,
  useWalletStore,
} from "../../stores/wallet.store";
import { formatCurrency } from "../../utils/format";

const quickActions = [
  { label: "Top Up", href: "/topup", icon: Banknote },
  { label: "Transfer", href: "/transfer", icon: Send },
  { label: "Create Code", href: "/payment-codes/create", icon: QrCode },
  { label: "Pay", href: "/pay", icon: CreditCard },
];

export default function DashboardPage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const wallets = useWalletStore(selectWallets).filter(
    (wallet) => wallet.userId === currentUser.id,
  );
  const activeWalletId = useWalletStore(selectActiveWalletId);
  const setActiveWallet = useWalletStore((state) => state.setActiveWallet);
  const activeWallet =
    wallets.find((wallet) => wallet.id === activeWalletId) ?? wallets[0];
  const transactions = useTransactionStore(selectTransactions)
    .filter((transaction) => transaction.userId === currentUser.id)
    .slice(0, 5);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dashboard"
        description="Ringkasan wallet aktif, saldo, dan transaksi terbaru."
      />
      <div className="grid w-full gap-4 lg:grid-cols-2">
        <WalletCard wallet={activeWallet} active />
        <Card>
          <p className="caption text-primary">Total balance</p>
          <p className="text-primary mt-2 text-2xl font-bold">
            {formatCurrency(
              wallets.reduce((total, wallet) => total + wallet.balance, 0),
            )}
          </p>
          <label className="mt-5 block">
            <span className="caption text-primary mb-1 block">
              Active wallet
            </span>
            <select
              className="border-light-gray w-full rounded-md text-sm"
              value={activeWallet.id}
              onChange={(event) => setActiveWallet(event.target.value)}
            >
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </select>
          </label>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActions.map((action) => (
          <Link key={action.href} to={action.href}>
            <Button
              type="button"
              variant="secondary"
              className="h-16 w-full flex-col"
            >
              <action.icon size={19} />
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="subheading">Recent Transactions</h2>
          <Link
            className="text-primary-700 text-sm font-semibold"
            to="/transactions"
          >
            View all
          </Link>
        </div>
        <TransactionList transactions={transactions} />
      </Card>
    </div>
  );
}
