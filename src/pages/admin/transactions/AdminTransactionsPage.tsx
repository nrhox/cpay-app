import PageHeader from "../../../components/ui/PageHeader";
import AdminTransactionList from "./AdminTransactionList";

export default function AdminTransactionsPage() {
  return (
    <div className="grid gap-5">
      <PageHeader
        title="Transaction Monitoring"
        description="Semua pergerakan dana dalam sistem."
      />
      <AdminTransactionList />
    </div>
  );
}
