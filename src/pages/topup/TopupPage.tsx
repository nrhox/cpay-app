import { useFormik } from "formik";
import { Banknote } from "lucide-react";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import Loading from "../../components/general/loading";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import { useMutateData } from "../../feature/hooks";
import { useGetAllWallet } from "../../feature/wallet";
import type { IRequestTopupRequest } from "../../types/request";
import type { ITopupRequest } from "../../types/topup";

const topupSchema = yup.object({
  wallet_number: yup.string().required("Wallet wajib dipilih"),
  amount: yup
    .number()
    .min(50000, "Minimal Rp50.000")
    .required("Nominal wajib diisi"),
});

export default function TopupPage() {
  const { data, isLoading } = useGetAllWallet();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutateData<
    IRequestTopupRequest,
    ITopupRequest
  >("POST", "/api/v1/top-up", ["request_top_up"], {
    onError: (err) => {
      const errRes = err.response?.data?.errors || [];
      errRes.forEach((v) => {
        setFieldError(v.field, v.message);
      });
    },
    onSuccess: (data) => {
      navigate(`/transactions/${data.data?.reference}`);
    },
  });

  const { values, setFieldError, handleChange, errors, touched, handleSubmit } =
    useFormik<IRequestTopupRequest>({
      initialValues: {
        wallet_number: "",
        amount: 50000,
      },
      validationSchema: topupSchema,
      onSubmit: (values) => {
        mutate(values);
      },
    });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Top Up Request"
        description="Ajukan top up untuk direview admin."
        actions={
          <Link to="/topup/history">
            <Button type="button" variant="secondary">
              History
            </Button>
          </Link>
        }
      />
      <Card className="max-w-2xl">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FormSelect
            label="Wallet"
            name="wallet_number"
            value={values.wallet_number}
            disabled={isPending}
            onChange={handleChange}
            options={(data?.data || []).map((wallet) => ({
              label: wallet.name,
              value: wallet.account_number,
            }))}
            error={touched.wallet_number ? errors.wallet_number : undefined}
          />
          <FormInput
            label="Amount"
            disabled={isPending}
            name="amount"
            type="number"
            value={values.amount}
            onChange={handleChange}
            error={touched.amount ? errors.amount : undefined}
          />
          <Button type="submit" disabled={isPending}>
            <Banknote size={18} />
            Create Request
          </Button>
        </form>
      </Card>
    </div>
  );
}
