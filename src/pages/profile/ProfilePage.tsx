import { ArrowLeftFromLineIcon } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import { useLogout } from "../../feature/auth";
import { useAuthStore } from "../../stores/auth.store";
import { formatDate } from "../../utils/format";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.currentUser);
  const logout = useLogout();

  return (
    <div className="grid gap-5">
      <PageHeader title="Profile" description="Informasi akun CPay." />
      <Card className="max-w-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar_url}
              className="border-primary size-20 rounded-full border-2"
            />
            <div>
              <h2 className="subheading">{user?.full_name}</h2>
              <p className="paragraph text-primary mt-1">{user?.email}</p>
              <p className="paragraph text-primary mt-1">
                Masuk pada {formatDate(user?.created_at ?? "")}
              </p>
            </div>
          </div>
          <Badge label={user?.status ?? ""} tone="success" />
        </div>

        <div className="text-primary mt-5 flex flex-col gap-2">
          <h3 className="text-lg">Masuk menggunakan</h3>
          {user?.oauth_providers.map((prov, i) => (
            <p key={i} className="text-base capitalize">
              {i + 1}. {prov.provider}
            </p>
          ))}
        </div>
      </Card>
      <div className="max-w-52">
        <Button variant="danger" className="w-full" onClick={() => logout()}>
          <ArrowLeftFromLineIcon size={20} />
          Keluar
        </Button>
      </div>
    </div>
  );
}
