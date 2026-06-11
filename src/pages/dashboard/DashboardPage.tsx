import { Banknote, CreditCard, QrCode, Send } from "lucide-react";
import { Link } from "react-router";
import Loading from "../../components/general/loading";
import TransactionList from "../../components/transfer/TransactionList";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import WalletCard from "../../components/wallet/WalletCard";
import { useGetAllCurrentTransaction } from "../../feature/transaction";
import { useGetAllWallet } from "../../feature/wallet";
import { formatCurrency } from "../../utils/format";

const quickActions = [
  { label: "Top Up", href: "/topup", icon: Banknote },
  { label: "Transfer", href: "/transfer", icon: Send },
  { label: "Create Code", href: "/payment-codes/create", icon: QrCode },
  { label: "Pay", href: "/pay", icon: CreditCard },
];

export default function DashboardPage() {
  const { data, isLoading } = useGetAllWallet();
  const { data: transaction, isLoading: isLoadingTransaction } =
    useGetAllCurrentTransaction();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dashboard"
        description="Ringkasan wallet aktif, saldo, dan transaksi terbaru."
      />
      <div className="grid w-full gap-4 lg:grid-cols-2">
        <WalletCard wallet={(data?.data ?? []).find((v) => v.is_primary)} />
        <Card>
          <p className="caption text-primary">Total balance</p>
          <p className="text-primary mt-2 text-2xl font-bold">
            {formatCurrency(
              (data?.data ?? []).reduce(
                (total, wallet) => total + wallet.balance,
                0,
              ),
            )}
          </p>
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
        {isLoadingTransaction && <Loading />}
        {!isLoadingTransaction &&
          transaction?.pages.map((group, i) => (
            <TransactionList key={i + "_"} transactions={group.data || []} />
          ))}
      </Card>
    </div>
  );
}
