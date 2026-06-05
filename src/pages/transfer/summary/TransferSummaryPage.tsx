import { useFormik } from "formik";
import { CheckCircle2 } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router";
import * as yup from "yup";
import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import { selectCurrentUser, useAuthStore } from "../../../stores/auth.store";
import {
  selectActiveWalletId,
  selectWallets,
  useWalletStore,
} from "../../../stores/wallet.store";
import type { TransferForm } from "../../../types";

interface TransferDestinationState {
  destinationAccount: string;
}

const transferSchema = yup.object({
  fromWalletId: yup.string().required("Wallet wajib dipilih"),
  destinationAccount: yup
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
  const location = useLocation();
  const currentUser = useAuthStore(selectCurrentUser);
  const wallets = useWalletStore(selectWallets).filter(
    (wallet) => wallet.userId === currentUser.id,
  );
  const activeWalletId = useWalletStore(selectActiveWalletId);
  const state = location.state as TransferDestinationState | null;

  const formik = useFormik<TransferForm>({
    initialValues: {
      fromWalletId: activeWalletId,
      destinationAccount: state?.destinationAccount ?? "",
      amount: 10000,
      note: "",
    },
    validationSchema: transferSchema,
    onSubmit: (values) => {
      navigate("/transfer/pin", {
        state: {
          ...values,
          destinationAccount:
            state?.destinationAccount ?? values.destinationAccount,
        },
      });
    },
  });

  if (!state?.destinationAccount) return <Navigate to="/transfer" replace />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Rangkuman Transfer"
        description="Lengkapi detail transfer sebelum konfirmasi."
      />
      <Card className="max-w-2xl">
        <div className="border-light-gray mb-5 rounded-md border p-4">
          <p className="caption text-primary">Akun tujuan</p>
          <p className="subheading text-primary mt-1">
            {state.destinationAccount}
          </p>
        </div>
        <form className="grid gap-4" onSubmit={formik.handleSubmit}>
          <FormSelect
            label="From wallet"
            name="fromWalletId"
            value={formik.values.fromWalletId}
            onChange={formik.handleChange}
            options={wallets.map((wallet) => ({
              label: wallet.name,
              value: wallet.id,
            }))}
            error={
              formik.touched.fromWalletId
                ? formik.errors.fromWalletId
                : undefined
            }
          />
          <FormInput
            label="Amount"
            name="amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount ? formik.errors.amount : undefined}
          />
          <FormInput
            label="Note"
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
            error={formik.touched.note ? formik.errors.note : undefined}
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
