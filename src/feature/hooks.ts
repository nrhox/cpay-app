import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  ErrorResponseDefault,
  SuccessResponse,
  SuccessResponsePaging,
} from "../types/response";
import axiosInstance from "../utils/axios";

export type tOptionQuery<TData = unknown> = Omit<
  UseQueryOptions<SuccessResponse<TData>, AxiosError<ErrorResponseDefault>>,
  "queryKey" | "queryFn"
>;

export function useFetchData<TData = unknown>(
  queryKey: unknown[],
  path: string,
  options?: tOptionQuery<TData>,
) {
  return useQuery<SuccessResponse<TData>, AxiosError<ErrorResponseDefault>>({
    queryKey: [...queryKey, path],
    queryFn: async () => {
      const res = await axiosInstance.get<SuccessResponse<TData>>(path);
      return res.data;
    },
    ...options,
  });
}

export type tFetchQueryParams = {
  q?: string;
  sort_by?: string;
  sort?: "asc" | "desc" | string;
};

export function useFetchInfinite<TData>(
  queryKey: unknown[],
  path: string,
  queryParams?: tFetchQueryParams,
) {
  const { q = "", sort_by = "", sort = "" } = queryParams || {};

  return useInfiniteQuery<
    SuccessResponsePaging<TData>,
    AxiosError<ErrorResponseDefault>
  >({
    queryKey: [...queryKey, path, q, sort_by, sort],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<SuccessResponsePaging<TData>>(path, {
        params: {
          page: pageParam,
          q: q || undefined,
          sort: sort || undefined,
          order_by: sort_by || undefined,
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPage = lastPage.meta.total_page ?? 1;
      const nextPage = allPages.length + 1;

      if (nextPage > totalPage) {
        return undefined;
      }

      return nextPage;
    },
  });
}

type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export type tOptionMutate<TBody = unknown, TData = unknown> = Omit<
  UseMutationOptions<
    SuccessResponse<TData>,
    AxiosError<ErrorResponseDefault>,
    TBody
  >,
  "mutationKey" | "mutationFn"
>;

export function useMutateData<TBody = unknown, TData = unknown>(
  method: MutationMethod,
  path: string,
  mutationKey?: unknown[],
  options?: tOptionMutate<TBody, TData>,
) {
  return useMutation({
    mutationKey,
    mutationFn: async (body: TBody) => {
      const response = await axiosInstance.request<SuccessResponse<TData>>({
        url: path,
        method,
        data: body,
      });
      return response.data;
    },
    ...options,
  });
}
