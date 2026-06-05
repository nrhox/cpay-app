import { Wallet as WalletIcon } from "lucide-react";
import type { Wallet } from "../../types";
import { formatCurrency } from "../../utils/format";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

export default function WalletCard({
  wallet,
  active,
}: {
  wallet: Wallet;
  active?: boolean;
}) {
  return (
    <Card className={active ? "border-primary-500" : undefined}>
      <div className="flex items-start justify-between gap-4">
        <div className="bg-primary-50 text-primary-700 grid h-11 w-11 place-items-center rounded-md">
          <WalletIcon size={22} />
        </div>
        <Badge
          label={active ? "Active" : wallet.status}
          tone={wallet.status === "ACTIVE" ? "success" : "danger"}
        />
      </div>
      <p className="subheading mt-4">{wallet.name}</p>
      <p className="caption text-primary mt-1">{wallet.accountNumber}</p>
      <p className="text-primary mt-4 text-xl font-bold">
        {formatCurrency(wallet.balance)}
      </p>
    </Card>
  );
}
