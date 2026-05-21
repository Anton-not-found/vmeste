export interface IApiError {
  status: number;
  message: string;
  errors?: string[]; 
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: IApiError;
}