import { Link, Navigate, useParams } from "react-router";
import TransactionDetailCard from "../../components/transactions/TransactionDetailCard";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import { useTransactionStore } from "../../stores/transaction.store";

export default function TransferDetailPage() {
  const { id } = useParams();
  const transaction = useTransactionStore((state) =>
    state.transactions.find((v) => v.id === id),
  );

  if (!transaction) {
    return <Navigate replace to="/transactions" />;
  }

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Transaction Detail"
        description="Rincian transaksi anda."
        actions={
          <Link to="/transactions">
            <Button type="button" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />
      <TransactionDetailCard transaction={transaction} />
    </div>
  );
}
