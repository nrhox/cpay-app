import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-5">
      <PageHeader
        title="Admin Dashboard"
        description="Monitoring operasional CPay."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card>
          <p className="subheading">Kelas bang admin</p>
        </Card>
      </div>
    </div>
  );
}
