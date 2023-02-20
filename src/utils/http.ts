import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { activeConfig } from "./axios.config";

enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
  }

  
class Http {
    private instance: AxiosInstance | null = null;
  
    private get http(): AxiosInstance {
      return this.instance != null ? this.instance : this.initHttp();
    }
  
    initHttp() {
      const foo = axios.create( activeConfig);
  
      foo.interceptors.response.use(
        (response) => response,
        (error) => {
          return this.handleError(error);
        }
      );
  
      this.instance = foo;
      return foo;
    }
  
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
      return this.http.request(config);
    }
  
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
      return this.http.get<T, R>(url, config);
    }
  
    post<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: T,
      config?: AxiosRequestConfig
    ): Promise<R> {
      return this.http.post<T, R>(url, data, config);
    }
  
    put<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: T,
      config?: AxiosRequestConfig
    ): Promise<R> {
      return this.http.put<T, R>(url, data, config);
    }
  
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
      return this.http.delete<T, R>(url, config);
    }
  
    // Handle global app errors
    // We can handle generic app errors depending on the status code
    private handleError(error: any) {
      const { status } = error;
  
      switch (status) {
        case StatusCode.InternalServerError: {
          // Handle InternalServerError
          break;
        }
        case StatusCode.Forbidden: {
          // Handle Forbidden
          break;
        }
        case StatusCode.Unauthorized: {
          // Handle Unauthorized
          break;
        }
        case StatusCode.TooManyRequests: {
          // Handle TooManyRequests
          break;
        }
      }
  
      return Promise.reject(error);
    }
  }
  
  export const http = new Http();