import TopupList from "../../../components/topup/TopupList";
import PageHeader from "../../../components/ui/PageHeader";
import { selectCurrentUser, useAuthStore } from "../../../stores/auth.store";
import { selectTopups, useTopupStore } from "../../../stores/topup.store";

export default function TopupHistoryPage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const topups = useTopupStore(selectTopups).filter(
    (topup) => topup.userId === currentUser.id,
  );

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Top Up History"
        description="Status pengajuan top up Anda."
      />
      <TopupList topups={topups} />
    </div>
  );
}
