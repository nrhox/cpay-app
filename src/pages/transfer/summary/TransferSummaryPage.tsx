import { useFormik } from "formik";
import { CheckCircle2 } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router";
import * as yup from "yup";
import AlertError from "../../../components/allert/AlertError";
import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import Loading from "../../../components/general/loading";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import { useGetAllWallet } from "../../../feature/wallet";
import type { ITransferBalanceRequest } from "../../../types/request";
import type { IWalletWithUser } from "../../../types/wallet";
import { formatAccount } from "../../../utils/format";

interface TransferDestinationState {
  wallet: IWalletWithUser;
  error?: string;
}

const transferSchema = yup.object({
  wallet_id: yup.string().required("Wallet wajib dipilih"),
  destination: yup
    .string()
    .min(8, "Nomor rekening terlalu pendek")
    .required("Tujuan wajib diisi"),
  amount: yup
    .number()
    .min(10000, "Minimal Rp10.000")
    .required("Nominal wajib diisi"),
  note: yup.string().max(80, "Maksimal 80 karakter"),
});

export default function TransferSummaryPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllWallet();
  const location = useLocation();
  const state = location.state as TransferDestinationState | null;

  const { touched, errors, values, handleChange, handleSubmit } =
    useFormik<ITransferBalanceRequest>({
      initialValues: {
        wallet_id: "",
        destination: state?.wallet?.account_number || "",
        amount: 10000,
        note: "",
        pin: "",
      },
      validationSchema: transferSchema,
      onSubmit: (values) => {
        navigate("/transfer/pin", {
          state: {
            data: values,
            wallet: state?.wallet || null,
          },
        });
      },
    });

  if (!state?.wallet) return <Navigate to="/transfer" replace />;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Rangkuman Transfer"
        description="Lengkapi detail transfer sebelum konfirmasi."
      />
      <Card className="max-w-2xl">
        <div className="border-neutral-muted mb-3 rounded-md border p-4">
          <p className="caption text-neutral-text">Akun tujuan</p>
          <p className="subheading text-neutral-text mt-1">
            {formatAccount(state.wallet.account_number)} -{" "}
            {state.wallet.user.full_name}
          </p>
        </div>

        {state.error && <AlertError message={state.error} />}
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FormSelect
            label="Dari Rekening"
            name="wallet_id"
            value={values.wallet_id}
            onChange={handleChange}
            options={(data?.data || []).map((wallet) => ({
              label: wallet.name,
              value: wallet._id,
            }))}
            error={touched.wallet_id ? errors.wallet_id : undefined}
          />
          <FormInput
            label="Nominal"
            name="amount"
            type="number"
            value={values.amount}
            onChange={handleChange}
            error={touched.amount ? errors.amount : undefined}
          />
          <FormInput
            label="Catatan"
            name="note"
            value={values.note}
            onChange={handleChange}
            error={touched.note ? errors.note : undefined}
          />
          <Button type="submit">
            <CheckCircle2 size={18} />
            Konfirmasi
          </Button>
        </form>
      </Card>
    </div>
  );
}
