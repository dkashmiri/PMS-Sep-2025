export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface FilterParams extends PaginationParams {
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  department?: string;
  domain?: string;
  project?: string;
  role?: string;
}

export interface Organization {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  operatingUnits: OperatingUnit[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OperatingUnit {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  departments: Department[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  operatingUnitId: string;
  name: string;
  code: string;
  description?: string;
  managerId?: string;
  isActive: boolean;
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Domain {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  departmentId: string;
  name: string;
  code: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  managerId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditTrail {
  id: string;
  entityType: string;
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW';
  userId: string;
  userName: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface NotificationPreference {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  reviewReminders: boolean;
  goalDeadlines: boolean;
  systemUpdates: boolean;
  teamUpdates: boolean;
}

export interface SystemConfig {
  id: string;
  key: string;
  value: string;
  description?: string;
  category: string;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PerformanceZone = 'GREEN' | 'YELLOW' | 'RED';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}