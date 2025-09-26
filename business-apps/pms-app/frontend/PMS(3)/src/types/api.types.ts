export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: PaginationMeta;
  timestamp?: string;
  requestId?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
  path: string;
  method: string;
  statusCode: number;
}

export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

export interface PaginatedRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface BulkOperationRequest {
  operation: string;
  ids: string[];
  data?: Record<string, any>;
  options?: Record<string, any>;
}

export interface BulkOperationResponse {
  totalProcessed: number;
  successful: number;
  failed: number;
  results: {
    id: string;
    success: boolean;
    error?: string;
    data?: any;
  }[];
}

export interface FileUploadRequest {
  file: File;
  category?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface FileUploadResponse {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  url: string;
  uploadDate: string;
}

export interface ExportRequest {
  format: 'PDF' | 'EXCEL' | 'CSV';
  filters?: Record<string, any>;
  columns?: string[];
  template?: string;
  options?: Record<string, any>;
}

export interface ExportResponse {
  fileId: string;
  fileName: string;
  fileUrl: string;
  expiresAt: string;
  fileSize: number;
}

export interface SearchRequest {
  query: string;
  entities?: string[];
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
  highlight?: boolean;
}

export interface SearchResponse {
  totalHits: number;
  results: SearchResult[];
  facets?: Record<string, any>;
  suggestions?: string[];
  tookMs: number;
}

export interface SearchResult {
  id: string;
  type: string;
  title: string;
  description?: string;
  highlights?: Record<string, string[]>;
  score: number;
  metadata?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface RequestOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheKey?: string;
  cacheTTL?: number;
  signal?: AbortSignal;
}

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
  interceptors?: {
    request?: (config: any) => any;
    response?: (response: any) => any;
    error?: (error: any) => any;
  };
}

export interface EndpointConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  timeout?: number;
  retries?: number;
  cache?: boolean;
  auth?: boolean;
  rateLimit?: {
    requests: number;
    window: number;
  };
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: string;
  id?: string;
}

export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeat?: {
    interval: number;
    message: string;
  };
}

export interface HealthCheck {
  status: 'healthy' | 'unhealthy' | 'degraded';
  version: string;
  uptime: number;
  timestamp: string;
  checks: {
    database: HealthCheckResult;
    redis: HealthCheckResult;
    external: HealthCheckResult[];
  };
}

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  responseTime: number;
  error?: string;
  details?: Record<string, any>;
}