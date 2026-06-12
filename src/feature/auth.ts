import { useAuthStore } from "../stores/auth.store";
import type { ICreateWalletRequest } from "../types/request";
import axiosInstance from "../utils/axios";
import { useMutateData, type tOptionMutate } from "./hooks";

export function useCompleteRegistration(
  options?: tOptionMutate<ICreateWalletRequest, null>,
) {
  return useMutateData<ICreateWalletRequest, null>(
    "POST",
    "/api/auth/incomplate",
    undefined,
    options,
  );
}

export function useLogout() {
  const logoutStore = useAuthStore((state) => state.logout);
  return async () => {
    try {
      await axiosInstance.get("/api/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logoutStore();
      location.replace("/auth/login");
    }
  };
}
