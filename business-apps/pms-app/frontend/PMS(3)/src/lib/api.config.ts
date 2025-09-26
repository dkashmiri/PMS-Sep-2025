import { ApiConfig } from '../types/api.types';

// Safe environment variable getter with fallbacks
const getEnvVar = (key: string, fallback: string): string => {
  try {
    // Try to get from import.meta.env (Vite)
    if (typeof import.meta !== 'undefined' && 
        import.meta.env && 
        typeof import.meta.env[key] === 'string' && 
        import.meta.env[key].trim() !== '') {
      return import.meta.env[key];
    }
    
    // Fallback to process.env (Node.js/SSR)
    if (typeof process !== 'undefined' && 
        process.env && 
        typeof process.env[key] === 'string' && 
        process.env[key]!.trim() !== '') {
      return process.env[key]!;
    }
    
    return fallback;
  } catch (error) {
    console.warn(`Failed to access environment variable ${key}, using fallback:`, error);
    return fallback;
  }
};

// API Configuration
export const API_CONFIG: ApiConfig = {
  baseURL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3001/api'),
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// App Configuration
export const APP_CONFIG = {
  title: getEnvVar('VITE_APP_TITLE', 'PMS Enhanced'),
  version: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  environment: getEnvVar('VITE_APP_ENV', 'development'),
  enableMockApi: getEnvVar('VITE_ENABLE_MOCK_API', 'true') === 'true',
  debugMode: getEnvVar('VITE_DEBUG_MODE', 'true') === 'true',
  authServiceUrl: getEnvVar('VITE_AUTH_SERVICE_URL', 'http://localhost:3002/api/auth'),
  websocketUrl: getEnvVar('VITE_WEBSOCKET_URL', 'ws://localhost:3001/ws'),
  isDevelopment: getEnvVar('VITE_APP_ENV', 'development') === 'development',
  isProduction: getEnvVar('VITE_APP_ENV', 'development') === 'production',
} as const;

// Log configuration in development
if (APP_CONFIG.debugMode) {
  console.log('🚀 PMS Configuration:', APP_CONFIG);
  console.log('🔧 API Configuration:', API_CONFIG);
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // Users
  USERS: {
    LIST: '/users',
    GET: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    BULK: '/users/bulk',
    SEARCH: '/users/search',
    PROFILE: '/users/profile',
  },

  // Organizations
  ORGANIZATIONS: {
    LIST: '/organizations',
    GET: (id: string) => `/organizations/${id}`,
    CREATE: '/organizations',
    UPDATE: (id: string) => `/organizations/${id}`,
    DELETE: (id: string) => `/organizations/${id}`,
    OPERATING_UNITS: (id: string) => `/organizations/${id}/operating-units`,
  },

  // Departments
  DEPARTMENTS: {
    LIST: '/departments',
    GET: (id: string) => `/departments/${id}`,
    CREATE: '/departments',
    UPDATE: (id: string) => `/departments/${id}`,
    DELETE: (id: string) => `/departments/${id}`,
    BY_OPERATING_UNIT: (unitId: string) => `/departments/operating-unit/${unitId}`,
  },

  // Projects
  PROJECTS: {
    LIST: '/projects',
    GET: (id: string) => `/projects/${id}`,
    CREATE: '/projects',
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
    BY_DEPARTMENT: (deptId: string) => `/projects/department/${deptId}`,
  },

  // Domains
  DOMAINS: {
    LIST: '/domains',
    GET: (id: string) => `/domains/${id}`,
    CREATE: '/domains',
    UPDATE: (id: string) => `/domains/${id}`,
    DELETE: (id: string) => `/domains/${id}`,
  },

  // KRAs
  KRAS: {
    LIST: '/kras',
    GET: (id: string) => `/kras/${id}`,
    CREATE: '/kras',
    UPDATE: (id: string) => `/kras/${id}`,
    DELETE: (id: string) => `/kras/${id}`,
    CATEGORIES: '/kras/categories',
    TEMPLATES: '/kras/templates',
    ASSIGNMENTS: '/kras/assignments',
    BULK_ASSIGN: '/kras/bulk-assign',
    LIBRARY: '/kras/library',
    VALIDATE: '/kras/validate',
  },

  // Goals
  GOALS: {
    LIST: '/goals',
    GET: (id: string) => `/goals/${id}`,
    CREATE: '/goals',
    UPDATE: (id: string) => `/goals/${id}`,
    DELETE: (id: string) => `/goals/${id}`,
    MY_GOALS: '/goals/my-goals',
    TEAM_GOALS: '/goals/team-goals',
    CATEGORIES: '/goals/categories',
    TEMPLATES: '/goals/templates',
    PROGRESS: (id: string) => `/goals/${id}/progress`,
    EVIDENCE: (id: string) => `/goals/${id}/evidence`,
    ALIGNMENT: (id: string) => `/goals/${id}/alignment`,
    HISTORY: (id: string) => `/goals/${id}/history`,
    ANALYTICS: '/goals/analytics',
    BULK: '/goals/bulk',
  },

  // Reviews
  REVIEWS: {
    LIST: '/reviews',
    GET: (id: string) => `/reviews/${id}`,
    CREATE: '/reviews',
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
    MY_REVIEWS: '/reviews/my-reviews',
    TEAM_REVIEWS: '/reviews/team-reviews',
    CYCLES: '/reviews/cycles',
    SELF_ASSESSMENT: (id: string) => `/reviews/${id}/self-assessment`,
    R1_REVIEW: (id: string) => `/reviews/${id}/r1-review`,
    R2_REVIEW: (id: string) => `/reviews/${id}/r2-review`,
    FINALIZE: (id: string) => `/reviews/${id}/finalize`,
    COMMENTS: (id: string) => `/reviews/${id}/comments`,
    ATTACHMENTS: (id: string) => `/reviews/${id}/attachments`,
    WORKFLOW: (id: string) => `/reviews/${id}/workflow`,
    ANALYTICS: '/reviews/analytics',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    PERFORMANCE: '/analytics/performance',
    GOALS: '/analytics/goals',
    REVIEWS: '/analytics/reviews',
    TEAM: '/analytics/team',
    TRENDS: '/analytics/trends',
    EXPORT: '/analytics/export',
    REPORTS: '/analytics/reports',
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    GET: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/mark-read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    DELETE: (id: string) => `/notifications/${id}`,
    PREFERENCES: '/notifications/preferences',
    TEMPLATES: '/notifications/templates',
    SEND_BULK: '/notifications/send-bulk',
    ANALYTICS: '/notifications/analytics',
  },

  // File Uploads
  UPLOADS: {
    UPLOAD: '/uploads',
    GET: (id: string) => `/uploads/${id}`,
    DELETE: (id: string) => `/uploads/${id}`,
    BULK_DELETE: '/uploads/bulk-delete',
  },

  // Reports
  REPORTS: {
    GENERATE: '/reports/generate',
    LIST: '/reports',
    GET: (id: string) => `/reports/${id}`,
    DELETE: (id: string) => `/reports/${id}`,
    EXPORT: (id: string) => `/reports/${id}/export`,
    SCHEDULE: '/reports/schedule',
  },

  // Admin
  ADMIN: {
    SYSTEM_CONFIG: '/admin/system-config',
    AUDIT_LOGS: '/admin/audit-logs',
    HEALTH_CHECK: '/admin/health',
    CACHE_CLEAR: '/admin/cache/clear',
    BACKUP: '/admin/backup',
    MAINTENANCE: '/admin/maintenance',
  },
} as const;

// Request timeout configurations for different operations
export const TIMEOUT_CONFIG = {
  SHORT: 5000,      // For quick operations like GET requests
  MEDIUM: 15000,    // For standard operations like POST/PUT
  LONG: 30000,      // For file uploads and reports
  VERY_LONG: 60000, // For bulk operations and exports
} as const;

// Rate limiting configurations
export const RATE_LIMIT_CONFIG = {
  STANDARD: { requests: 100, window: 60000 }, // 100 requests per minute
  BULK_OPERATIONS: { requests: 10, window: 60000 }, // 10 requests per minute
  FILE_UPLOADS: { requests: 20, window: 60000 }, // 20 requests per minute
  REPORTS: { requests: 5, window: 60000 }, // 5 requests per minute
} as const;

// Cache configurations
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  LONG_TTL: 30 * 60 * 1000,   // 30 minutes
  SHORT_TTL: 1 * 60 * 1000,   // 1 minute
  KEYS: {
    USER_PROFILE: 'user:profile',
    ORGANIZATIONS: 'organizations',
    DEPARTMENTS: 'departments',
    PROJECTS: 'projects',
    DOMAINS: 'domains',
    KRA_CATEGORIES: 'kra:categories',
    GOAL_CATEGORIES: 'goal:categories',
    NOTIFICATIONS: 'notifications:count',
  },
} as const;

// Error codes
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  TIMEOUT: 'TIMEOUT',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const;