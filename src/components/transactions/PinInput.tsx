import clsx from "clsx";
import { useFormik } from "formik";
import {
  useCallback,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import * as yup from "yup";
import Input from "../forms/Input";

interface PinInputProps {
  label?: string;
  helper?: string;
  disabled?: boolean;
  onChange?: (pin: string) => void;
  onComplete: (pin: string) => void;
}

interface FormValues {
  pin: string[];
}

const PIN_LENGTH = 6;

const pinSchema = yup.object().shape({
  pin: yup
    .array()
    .of(
      yup
        .string()
        .matches(/^[0-9]$/, "Harus angka")
        .required(""),
    )
    .length(PIN_LENGTH, `PIN harus ${PIN_LENGTH} digit`),
});

export default function PinInput({
  label = "PIN",
  helper = "Masukan pin anda.",
  onComplete,
  onChange,
  disabled,
}: PinInputProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const initialValues: FormValues = {
    pin: Array(PIN_LENGTH).fill(""),
  };

  const { values, errors, touched, setFieldValue, handleSubmit } =
    useFormik<FormValues>({
      initialValues,
      validationSchema: pinSchema,
      onSubmit: (values) => {
        const fullPin = values.pin.join("");
        onComplete(fullPin);
      },
    });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;

    if (/^[0-9]$/.test(val) || val === "") {
      const newPin = [...values.pin];
      newPin[index] = val;
      setFieldValue("pin", newPin);

      if (val !== "" && index < PIN_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (onChange) {
        onChange(newPin.join(""));
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (values.pin[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newPin = [...values.pin];
        newPin[index] = "";
        setFieldValue("pin", newPin);
      }
    }
  };

  const handleKeyUp = useCallback(
    (index: number) => {
      if (
        index === PIN_LENGTH - 1 &&
        values.pin.join("").length === PIN_LENGTH
      ) {
        handleSubmit();
      }
    },
    [handleSubmit, values.pin],
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="block">
          <span className="caption text-primary mb-1 block">{label}</span>
          <div className="flex gap-2">
            {values.pin.map((digit, index) => {
              const isFieldTouched = Array.isArray(touched.pin)
                ? touched.pin[index]
                : !!touched.pin;

              const hasFieldError = Array.isArray(errors.pin)
                ? errors.pin[index]
                : !!errors.pin;

              const hasError = isFieldTouched && hasFieldError;

              return (
                <Input
                  disabled={disabled}
                  key={index}
                  autoFocus={index === 0}
                  className={clsx(
                    "w-full rounded-md text-center text-sm font-semibold tracking-[0.4em]",
                    hasError
                      ? "border-danger focus:border-danger focus:ring-danger"
                      : "border-light-gray focus:border-primary-500 focus:ring-primary-500",
                  )}
                  inputMode="numeric"
                  name="pin"
                  pattern="[0-9]*"
                  value={digit}
                  type="password"
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onKeyUp={() => handleKeyUp(index)}
                />
              );
            })}
          </div>
        </label>
      </form>
      <p className="caption text-primary mt-3">{helper}</p>
    </div>
  );
}
