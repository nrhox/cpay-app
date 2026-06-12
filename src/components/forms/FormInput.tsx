import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import Input from "./Input";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function FormInput({
  label,
  error,
  className,
  ...props
}: FormInputProps) {
  return (
    <label className="block">
      {label && (
        <span className="caption text-primary mb-1 block">{label}</span>
      )}
      <Input
        className={clsx(
          "border-light-gray focus:border-primary-500 focus:ring-primary-500 w-full rounded-md text-sm",
          className,
        )}
        {...props}
      />
      {error ? (
        <span className="caption text-danger mt-1 block">{error}</span>
      ) : null}
    </label>
  );
}
