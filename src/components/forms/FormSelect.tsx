import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { label: string; value: string }[];
}

export default function FormSelect({
  label,
  error,
  options,
  className,
  ...props
}: FormSelectProps) {
  return (
    <label className="block">
      <span className="caption text-primary mb-1 block">{label}</span>
      <select
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        aria-autocomplete="none"
        className={clsx(
          "border-light-gray focus:border-primary-500 focus:ring-primary-500 w-full rounded-md text-sm",
          className,
        )}
        {...props}
      >
        <option value="">Pilih</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="caption text-danger mt-1 block">{error}</span>
      ) : null}
    </label>
  );
}
