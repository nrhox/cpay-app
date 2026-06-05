import { useFormik } from "formik";
import { Wallet } from "lucide-react";
import * as yup from "yup";
import FormInput from "../../../components/forms/FormInput";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import type { CreateWallet } from "../../../types";

const createWalletSchema = yup.object({
  name: yup.string().required("Wallet wajib dipilih"),
});

export default function CreateWalletPage() {
  const formik = useFormik<CreateWallet>({
    initialValues: {
      name: "",
    },
    validationSchema: createWalletSchema,
    onSubmit: (_, helpers) => {
      helpers.resetForm();
    },
  });

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Create Payment Code"
        description="Buat kode untuk dibayar merchant."
      />
      <Card className="max-w-2xl">
        <form className="grid gap-4" onSubmit={formik.handleSubmit}>
          <FormInput
            label="Nama dompet"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name ? formik.errors.name : undefined}
          />
          <Button type="submit">
            <Wallet size={18} />
            Create Code
          </Button>
        </form>
      </Card>
    </div>
  );
}
