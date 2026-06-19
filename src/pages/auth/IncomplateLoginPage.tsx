import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as yup from "yup";
import BRAND from "../../assets/CPay_Logo.svg";
import FormInput from "../../components/forms/FormInput";
import PinInput from "../../components/transactions/PinInput";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useCompleteRegistration } from "../../feature/auth";

interface iForm {
  wallet_name: string;
  pin: string;
}

const formSchema = yup.object({
  wallet_name: yup
    .string()
    .required("wajib diisi")
    .max(100, "maksimal 100 huruf"),
  pin: yup.string().required("").length(6, `PIN harus ${6} digit`),
});

export default function IncomplatePage() {
  const navigate = useNavigate();

  const initialValues: iForm = {
    pin: "",
    wallet_name: "",
  };

  const { isPending, isSuccess, mutate } = useCompleteRegistration({
    onError: (err) => {
      if (err.response?.data.errors) {
        err.response.data.errors.forEach((err) => {
          setFieldError(err.field as "pin" | "wallet_name", err.message);
        });
      }
    },
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    handleChange,
    setFieldError,
  } = useFormik<iForm>({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <main className="bg-neutral-bg grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md">
        <img src={BRAND} className="h-14" alt="cpay" />
        <p className="paragraph text-neutral-text mt-1">
          Selesaikan pendafataran
        </p>
        <div className="mt-4">
          <div className="mb-4 space-y-4">
            <FormInput
              disabled={isPending || isSuccess}
              label="Nama wallet"
              value={values.wallet_name}
              error={errors.wallet_name}
              onChange={handleChange}
              name="wallet_name"
            />
            <div>
              <PinInput
                disabled={isPending || isSuccess}
                onComplete={(v) => setFieldValue("pin", v)}
              />
              {errors.pin && <p className="text-danger">{errors.pin}</p>}
            </div>
          </div>

          <Button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isPending || isSuccess}
          >
            Selesai
          </Button>
        </div>
      </Card>
    </main>
  );
}
