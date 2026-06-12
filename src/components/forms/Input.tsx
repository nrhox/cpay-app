import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function Input({
  ...props
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      aria-autocomplete="none"
      {...props}
    />
  );
}
