export interface SuccessResponse<T = unknown> {
  data?: T;
  message?: string;
}

export interface iMetaData {
  total_page: number;
  total_data: number;
}

export interface SuccessResponsePaging<T = unknown> {
  data?: T[];
  message?: string;
  meta: iMetaData;
}

export interface iError {
  field: string;
  message: string;
}

export interface ErrorResponseDefault {
  message: string;
  errors?: iError[];
}
