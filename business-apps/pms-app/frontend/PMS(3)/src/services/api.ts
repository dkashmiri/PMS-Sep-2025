import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { ApiResponse, ApiError, RequestOptions } from '../types/api.types';
import { API_CONFIG, ERROR_CODES, TIMEOUT_CONFIG } from '../lib/api.config';

class ApiService {
  private client: AxiosInstance;
  private retryQueue: Map<string, number> = new Map();

  constructor() {
    this.client = axios.create(API_CONFIG);
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId();

        // Add timestamp
        config.headers['X-Request-Time'] = new Date().toISOString();

        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          headers: config.headers,
          data: config.data,
        });

        return config;
      },
      (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`, {
          data: response.data,
          headers: response.headers,
        });
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, {
          error: error.response?.data,
          headers: error.response?.headers,
        });

        // Handle token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            await this.refreshToken();
            return this.client(originalRequest);
          } catch (refreshError) {
            this.handleAuthError();
            return Promise.reject(refreshError);
          }
        }

        // Handle retry logic
        if (this.shouldRetry(error) && !originalRequest._retry) {
          const retryCount = this.retryQueue.get(originalRequest.url || '') || 0;
          
          if (retryCount < (API_CONFIG.retries || 3)) {
            this.retryQueue.set(originalRequest.url || '', retryCount + 1);
            originalRequest._retry = true;
            
            await this.delay(API_CONFIG.retryDelay * Math.pow(2, retryCount));
            return this.client(originalRequest);
          }
        }

        return Promise.reject(this.transformError(error));
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('pms_token');
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async refreshToken(): Promise<void> {
    const refreshToken = localStorage.getItem('pms_refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/auth/refresh`, {
        refreshToken,
      });

      const { token, refreshToken: newRefreshToken } = response.data.data;
      localStorage.setItem('pms_token', token);
      localStorage.setItem('pms_refresh_token', newRefreshToken);
    } catch (error) {
      localStorage.removeItem('pms_token');
      localStorage.removeItem('pms_refresh_token');
      throw error;
    }
  }

  private handleAuthError(): void {
    localStorage.removeItem('pms_token');
    localStorage.removeItem('pms_refresh_token');
    localStorage.removeItem('pms_user');
    window.location.href = '/login';
  }

  private shouldRetry(error: AxiosError): boolean {
    const status = error.response?.status;
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    return retryableStatuses.includes(status || 0) || !error.response;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private transformError(error: AxiosError): ApiError {
    const response = error.response;
    const status = response?.status || 0;
    
    let code = ERROR_CODES.INTERNAL_ERROR;
    let message = 'An unexpected error occurred';

    if (status === 401) {
      code = ERROR_CODES.UNAUTHORIZED;
      message = 'Authentication required';
    } else if (status === 403) {
      code = ERROR_CODES.FORBIDDEN;
      message = 'Access forbidden';
    } else if (status === 404) {
      code = ERROR_CODES.NOT_FOUND;
      message = 'Resource not found';
    } else if (status === 422) {
      code = ERROR_CODES.VALIDATION_ERROR;
      message = 'Validation failed';
    } else if (status === 429) {
      code = ERROR_CODES.RATE_LIMITED;
      message = 'Rate limit exceeded';
    } else if (error.code === 'ECONNABORTED') {
      code = ERROR_CODES.TIMEOUT;
      message = 'Request timeout';
    } else if (!response) {
      code = ERROR_CODES.NETWORK_ERROR;
      message = 'Network error';
    }

    return {
      code,
      message: response?.data?.message || message,
      details: response?.data?.details,
      timestamp: new Date().toISOString(),
      path: error.config?.url || '',
      method: error.config?.method?.toUpperCase() || '',
      statusCode: status,
    };
  }

  // Generic request method
  async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        timeout: options.timeout || TIMEOUT_CONFIG.MEDIUM,
        signal: options.signal,
      };

      if (data) {
        if (method === 'GET') {
          config.params = data;
        } else {
          config.data = data;
        }
      }

      const response = await this.client(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Convenience methods
  async get<T = any>(url: string, params?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('GET', url, params, options);
  }

  async post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('POST', url, data, options);
  }

  async put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', url, data, options);
  }

  async patch<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', url, data, options);
  }

  async delete<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  // File upload method
  async uploadFile<T = any>(
    url: string,
    file: File,
    data?: Record<string, any>,
    options?: RequestOptions & {
      onProgress?: (progress: number) => void;
    }
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    try {
      const response = await this.client.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: options?.timeout || TIMEOUT_CONFIG.LONG,
        signal: options?.signal,
        onUploadProgress: (progressEvent) => {
          if (options?.onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            options.onProgress(progress);
          }
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Download file method
  async downloadFile(
    url: string,
    filename?: string,
    options?: RequestOptions
  ): Promise<void> {
    try {
      const response = await this.client.get(url, {
        responseType: 'blob',
        timeout: options?.timeout || TIMEOUT_CONFIG.LONG,
        signal: options?.signal,
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      throw error;
    }
  }

  // WebSocket connection helper
  createWebSocket(url: string, protocols?: string[]): WebSocket {
    const token = this.getAuthToken();
    const wsUrl = `${url}?token=${token}`;
    return new WebSocket(wsUrl, protocols);
  }

  // Cache helper methods
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  setCacheItem(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  getCacheItem<T = any>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clearCache(pattern?: string): void {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;