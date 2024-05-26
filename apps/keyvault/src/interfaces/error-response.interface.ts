export interface ErrorResponseData {
  statusCode: number;
  error: string;
  message: string | string[];
  timestamp?: string;
  path?: string;
}
