import { Link, Navigate, useParams } from "react-router";
import TransactionDetailCard from "../../../components/transactions/TransactionDetailCard";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import {
  selectTransactions,
  useTransactionStore,
} from "../../../stores/transaction.store";

export default function AdminTransactionDetailPage() {
  const { id } = useParams();
  const transaction = useTransactionStore(selectTransactions).find(
    (item) => item.id === id,
  );

  if (!transaction) return <Navigate replace to="/admin/transactions" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Transaction Detail"
        description={transaction.id}
        actions={
          <Link to="/admin/transactions">
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
