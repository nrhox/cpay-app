import { Wallet as WalletIcon } from "lucide-react";
import type { IWallet } from "../../types/wallet";
import { formatAccount, formatCurrency } from "../../utils/format";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

export default function WalletCard({
  wallet,
  active,
}: {
  wallet?: IWallet;
  active?: boolean;
}) {
  return (
    <Card className={active ? "border-primary-soft" : undefined}>
      <div className="flex items-start justify-between gap-4">
        <div className="bg-primary-soft text-primary grid h-11 w-11 place-items-center rounded-md">
          <WalletIcon size={22} />
        </div>
        <Badge
          label={wallet?.status === "ACTIVE" ? "Aktif" : "Dibekukan"}
          tone={wallet?.status === "ACTIVE" ? "success" : "danger"}
        />
      </div>
      <p className="subheading mt-4">{wallet?.name}</p>
      <p className="caption text-neutral-text mt-1">
        {formatAccount(wallet?.account_number ?? "")}
      </p>
      <p className="text-neutral-text mt-4 text-xl font-bold">
        {formatCurrency(wallet?.balance ?? 0)}
      </p>
    </Card>
  );
}
