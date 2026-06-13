import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect, type ReactNode } from "react";
import BRAND_LOGO from "./assets/CPay_Logo.svg";
import { useAuthStore } from "./stores/auth.store";
import type { ErrorResponseDefault, SuccessResponse } from "./types/response";
import type { IUser } from "./types/user";
import axiosInstance, { type ConfigAxiosRequest } from "./utils/axios";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  const { data, error, isLoading } = useQuery<
    SuccessResponse<IUser>,
    AxiosError<ErrorResponseDefault>
  >({
    queryKey: ["get_user"],
    queryFn: async () => {
      const res = await axiosInstance.get<SuccessResponse<IUser>>(
        "/api/v1/me",
        { _retry: false } as ConfigAxiosRequest,
      );
      return res.data;
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401 || error.response?.status === 400)
        return false;
      return failureCount < 3;
    },
  });

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (
      !isLoading &&
      ((error?.response?.status ?? 0) === 401 || error?.code === "ERR_NETWORK")
    ) {
      if (
        !currentPath.startsWith("/auth/login") &&
        !currentPath.startsWith("/legal")
      ) {
        location.replace("/auth/login");
      }
    }

    if (!isLoading && error?.response?.status === 400) {
      if (currentPath !== "/auth/login/incomplate") {
        location.replace("/auth/login/incomplate");
      }
    }

    if (!isLoading && !error && data) {
      setUser(data.data as IUser);

      if (currentPath.startsWith("/auth/login")) {
        location.replace("/");
      }
    }
  }, [data, error, isLoading, setUser]);

  const isAuthPage = window.location.pathname.startsWith("/auth/login");

  if (
    isLoading &&
    !isAuthPage &&
    !window.location.pathname.startsWith("/legal")
  ) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <img src={BRAND_LOGO} alt="logo" className="h-20 md:h-24" />
      </div>
    );
  }

  return children;
}
