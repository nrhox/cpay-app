import { Check, Copy, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";
import type { IWallet } from "../../types/wallet";
import { formatAccount, formatCurrency } from "../../utils/format";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

export default function WalletCard({
  wallet,
  active,
  copyIcon = false,
}: {
  wallet?: IWallet;
  active?: boolean;
  copyIcon?: boolean;
}) {
  const [isCopy, setIsCopy] = useState(false);

  function handleCopy(text: string) {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 2000);
    }
  }

  return (
    <Card className={active ? "border-neutral-muted" : undefined}>
      <div className="flex items-start justify-between gap-4">
        <div className="bg-primary-soft text-primary grid h-11 w-11 place-items-center rounded-md">
          <WalletIcon size={22} />
        </div>
        <Badge
          label={wallet?.status === "ACTIVE" ? "Aktif" : "Dibekukan"}
          tone={wallet?.status === "ACTIVE" ? "success" : "danger"}
        />
      </div>
      <p className="subheading mt-4 flex items-center">
        <span>{formatAccount(wallet?.account_number ?? "")}</span>
        {copyIcon && (
          <button
            onClick={() => handleCopy(wallet?.account_number || "")}
            className="hover:text-primary hover:bg-neutral-bg ml-1.5 rounded p-0.5 transition"
            title="Salin Referensi"
          >
            {isCopy ? (
              <Check className="text-success size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
        )}
      </p>
      <p className="caption text-neutral-text mt-1">{wallet?.name}</p>
      <p className="text-neutral-text mt-4 text-xl font-bold">
        {formatCurrency(wallet?.balance ?? 0)}
      </p>
    </Card>
  );
}
