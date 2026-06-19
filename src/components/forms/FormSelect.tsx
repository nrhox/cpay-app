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
      <span className="caption text-neutral-muted mb-1 block">{label}</span>
      <select
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        aria-autocomplete="none"
        className={clsx(
          "border-neutral-muted focus:border-primary focus:ring-primary bg-neutral-surface text-neutral-text w-full rounded-md text-sm",
          className,
        )}
        {...props}
      >
        <option value="">Pilih</option>
        {options.map((option, i) => (
          <option key={option.value + i} value={option.value}>
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
