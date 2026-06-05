import { ArrowLeftFromLineIcon } from "lucide-react";
import { useNavigate } from "react-router";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import { selectCurrentUser, useAuthStore } from "../../stores/auth.store";
import { formatDate } from "../../utils/format";

export default function ProfilePage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const navigate = useNavigate();

  return (
    <div className="grid gap-5">
      <PageHeader title="Profile" description="Informasi akun CPay." />
      <Card className="max-w-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="subheading">{currentUser.name}</h2>
            <p className="paragraph text-primary mt-1">{currentUser.email}</p>
          </div>
          <Badge label={currentUser.status} tone="success" />
        </div>
        <div className="text-primary mt-5 grid gap-2 text-sm sm:grid-cols-2">
          <p>Phone: {currentUser.phone}</p>
          <p>Role: {currentUser.role}</p>
          <p>Joined: {formatDate(currentUser.createdAt)}</p>
        </div>
      </Card>
      <div className="max-w-52">
        <Button
          variant="danger"
          onClick={() => navigate("/login")}
          className="w-full"
        >
          <ArrowLeftFromLineIcon size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
}
