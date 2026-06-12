import { ArrowRight } from "lucide-react";
import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import FormInput from "../../components/forms/FormInput";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import { useGetOneWallet } from "../../feature/wallet";

export default function TransferPage() {
  const navigate = useNavigate();
  const [destinationAccount, setDestinationAccount] = useState("");
  const [destinationError, setDestinationError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const { isLoading, error, isSuccess, data } = useGetOneWallet(
    destinationAccount,
    {
      enabled: isSubmit,
    },
  );

  useEffect(() => {
    if (isSuccess && destinationAccount.trim() !== "" && data.data) {
      navigate("/transfer/summary", {
        state: { wallet: data.data },
      });
    }
  }, [data?.data, destinationAccount, isSuccess, navigate]);

  const handleSubmit = (event: SubmitEvent) => {
    if (!isLoading) {
      event.preventDefault();
      const nextDestination = destinationAccount.trim();

      if (nextDestination.length !== 12) {
        setDestinationError("Nomor rekening tidak ada");
        return;
      }

      setIsSubmit(true);
    }
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
            label="Rekening Tujuan"
            name="destinationAccount"
            inputMode="numeric"
            disabled={isLoading}
            value={destinationAccount}
            onChange={(event) => {
              setDestinationAccount(event.target.value.replace(/\D/g, ""));
              setDestinationError("");
              setIsSubmit(false);
            }}
            error={error?.response?.data.message || destinationError}
          />
          <Button disabled={isLoading} type="submit">
            Berikutnya
            <ArrowRight size={18} />
          </Button>
        </form>
      </Card>
    </div>
  );
}
