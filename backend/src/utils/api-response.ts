import type { Response } from 'express';

interface ApiResponseBody<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode = 200,
  ): Response<ApiResponseBody<T>> {
    return res.status(statusCode).json({ success: true, message, data });
  }

  static created<T>(
    res: Response,
    message: string,
    data?: T,
  ): Response<ApiResponseBody<T>> {
    return res.status(201).json({ success: true, message, data });
  }

  static error(
    res: Response,
    message: string,
    statusCode = 500,
    error?: unknown,
  ): Response<ApiResponseBody<never>> {
    return res.status(statusCode).json({ success: false, message, error });
  }
}
