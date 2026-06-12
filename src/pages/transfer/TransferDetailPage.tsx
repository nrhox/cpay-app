import { Link, useParams } from "react-router";
import Loading from "../../components/general/loading";
import TransactionDetailCard from "../../components/transactions/TransactionDetailCard";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import { useGetOneTransaction } from "../../feature/transaction";

export default function TransferDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetOneTransaction(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Detail Transaksi"
        description="Rincian transaksi anda."
        actions={
          <Link to="/transactions">
            <Button type="button" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />
      {data?.data && !isLoading ? (
        <TransactionDetailCard transaction={data.data} />
      ) : (
        <EmptyState title="Belum ada transaksi" />
      )}
    </div>
  );
}
