import { ArrowRight } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import FormInput from "../../components/forms/FormInput";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";

export default function TransferPage() {
  const navigate = useNavigate();
  const [destinationAccount, setDestinationAccount] = useState("");
  const [destinationError, setDestinationError] = useState("");

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const nextDestination = destinationAccount.trim();

    if (nextDestination.length < 8) {
      setDestinationError("Nomor rekening terlalu pendek");
      return;
    }

    navigate("/transfer/summary", {
      state: { destinationAccount: nextDestination },
    });
  };

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Transfer"
        description="Masukkan rekening tujuan transfer."
      />
      <Card className="max-w-xl">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FormInput
            label="Destination account"
            name="destinationAccount"
            inputMode="numeric"
            value={destinationAccount}
            onChange={(event) => {
              setDestinationAccount(event.target.value.replace(/\D/g, ""));
              setDestinationError("");
            }}
            error={destinationError}
          />
          <Button type="submit">
            Berikutnya
            <ArrowRight size={18} />
          </Button>
        </form>
      </Card>
    </div>
  );
}
