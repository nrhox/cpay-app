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
        <span className="caption text-neutral-muted mb-1 block">{label}</span>
      )}
      <Input
        className={clsx(
          "border-neutral-muted focus:border-primary focus:ring-primary w-full rounded-md text-sm",
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
