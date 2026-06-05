import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";

export default function Providers({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
