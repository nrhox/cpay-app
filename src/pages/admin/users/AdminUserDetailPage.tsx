import { Link, useParams } from "react-router";
import Loading from "../../../components/general/loading";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import WalletCard from "../../../components/wallet/WalletCard";
import {
  useAdminActiveUser,
  useAdminGetUserById,
  useAdminGetUserWallets,
  useAdminSuspendUser,
} from "../../../feature/admin";
import { formatDate } from "../../../utils/format";

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useAdminGetUserById(id);
  const { data: dataWallets, isLoading: isLoadingWallet } =
    useAdminGetUserWallets(id);
  const { mutate: setSuspend, isPending: isPendingSuspend } =
    useAdminSuspendUser(id ?? "", {
      onSuccess: () => {
        refetch();
      },
    });

  const { mutate: setActive, isPending: isPendingActive } = useAdminActiveUser(
    id ?? "",
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data && !isLoading)
    return <EmptyState title="User tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={data?.data?.full_name ?? "-"}
        description={data?.data?.email}
        actions={
          <Link to="/admin/users">
            <Button type="button" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />
      <Card className="max-w-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={data?.data?.avatar_url}
              className="border-primary size-20 rounded-full border-2"
            />
            <div>
              <h2 className="subheading">
                {data?.data?.full_name} -{" "}
                {data?.data?.role === 2 ? "Admin" : "User"}
              </h2>
              <p className="paragraph text-primary mt-1">{data?.data?.email}</p>
              <p className="paragraph text-primary mt-1">
                Masuk pada {formatDate(data?.data?.created_at ?? "")}
              </p>
            </div>
          </div>
          <Badge label={data?.data?.status ?? ""} tone="success" />
        </div>

        <div className="text-primary mt-5 flex flex-col gap-2">
          <h3 className="text-lg">Masuk menggunakan</h3>
          {data?.data?.oauth_providers.map((prov, i) => (
            <p key={i} className="text-base capitalize">
              {i + 1}. {prov.provider}
            </p>
          ))}
        </div>
      </Card>
      <div className="flex gap-2">
        {data?.data?.status === "SUSPENDED" ? (
          <Button
            onClick={() => setActive()}
            disabled={isLoading || isPendingActive || isPendingSuspend}
            type="button"
          >
            Open Suspend
          </Button>
        ) : (
          <Button
            onClick={() => setSuspend()}
            disabled={isLoading || isPendingActive || isPendingSuspend}
            type="button"
            variant="danger"
          >
            Suspend
          </Button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoadingWallet && <Loading />}

        {!isLoadingWallet &&
          dataWallets?.data?.map((wallet, i) => (
            <WalletCard wallet={wallet} key={i} />
          ))}
      </div>
    </div>
  );
}
