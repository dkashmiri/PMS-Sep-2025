import { BaseEntity } from './common.types';

export interface KRA extends BaseEntity {
  title: string;
  description: string;
  code: string;
  categoryId: string;
  weight: number;
  measurementCriteria: string;
  targetValue?: number;
  unit?: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY';
  applicableRoles: string[];
  departments: string[];
  domains: string[];
  isActive: boolean;
  isCore: boolean;
  level: 'INDIVIDUAL' | 'TEAM' | 'DEPARTMENT' | 'ORGANIZATION';
  parentKRAId?: string;
  subKRAs?: KRA[];
  tags?: string[];
  order: number;
}

export interface KRACategory extends BaseEntity {
  name: string;
  code: string;
  description?: string;
  color: string;
  icon?: string;
  isActive: boolean;
  parentCategoryId?: string;
  subCategories?: KRACategory[];
  order: number;
}

export interface KRATemplate extends BaseEntity {
  name: string;
  description?: string;
  templateType: 'ROLE_BASED' | 'DEPARTMENT_BASED' | 'LEVEL_BASED' | 'GENERIC';
  applicableRoles: string[];
  departments: string[];
  domains: string[];
  isActive: boolean;
  version: string;
  isDefault: boolean;
  kraTemplateDetails: KRATemplateDetail[];
}

export interface KRATemplateDetail extends BaseEntity {
  kraTemplateId: string;
  kraId: string;
  weight: number;
  isMandatory: boolean;
  customizationAllowed: boolean;
  order: number;
  alternativeKRAIds?: string[];
}

export interface KRAAssignment extends BaseEntity {
  employeeId: string;
  kraId: string;
  reviewCycleId: string;
  weight: number;
  customDescription?: string;
  targetValue?: number;
  customMeasurementCriteria?: string;
  isActive: boolean;
  assignedBy: string;
  assignedDate: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
  comments?: string;
}

export interface KRALibrary extends BaseEntity {
  industryType: string;
  functionalArea: string;
  experienceLevel: 'ENTRY' | 'MID' | 'SENIOR' | 'LEAD' | 'EXECUTIVE';
  kras: KRALibraryItem[];
  isPublic: boolean;
  contributedBy?: string;
  approvedBy?: string;
  usageCount: number;
  rating: number;
  reviews: KRALibraryReview[];
}

export interface KRALibraryItem {
  kraId: string;
  recommendedWeight: number;
  adaptationNotes?: string;
  successMetrics: string[];
  commonPitfalls: string[];
  bestPractices: string[];
}

export interface KRALibraryReview {
  reviewerId: string;
  rating: number;
  comment: string;
  usefulnessScore: number;
  createdAt: Date;
}

export interface KRAMapping extends BaseEntity {
  employeeId: string;
  kraId: string;
  reviewCycleId: string;
  mappingType: 'AUTO' | 'MANUAL' | 'SUGGESTED';
  weight: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedDate?: Date;
  rejectionReason?: string;
  alternativeSuggestions?: string[];
}

export interface KRAAnalytics {
  totalKRAs: number;
  activeKRAs: number;
  byCategory: { [categoryId: string]: number };
  byDepartment: { [department: string]: number };
  byRole: { [role: string]: number };
  utilizationRate: number;
  averageWeight: number;
  mostUsedKRAs: {
    kraId: string;
    kraTitle: string;
    usageCount: number;
    averageRating: number;
  }[];
  performanceDistribution: {
    kraId: string;
    kraTitle: string;
    averageRating: number;
    greenZone: number;
    yellowZone: number;
    redZone: number;
  }[];
}

export interface KRABenchmark extends BaseEntity {
  kraId: string;
  industryType: string;
  companySize: 'STARTUP' | 'SME' | 'LARGE' | 'ENTERPRISE';
  benchmarkValue: number;
  unit: string;
  percentile: number;
  dataSource: string;
  lastUpdated: Date;
  isVerified: boolean;
  verifiedBy?: string;
}

export interface KRAGap extends BaseEntity {
  employeeId: string;
  kraId: string;
  currentRating: number;
  expectedRating: number;
  gapScore: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendedActions: string[];
  targetCompletionDate?: Date;
  progressNotes?: string;
  isAddressed: boolean;
  addressedDate?: Date;
}

export interface KRABulkOperation {
  operation: 'ASSIGN' | 'UNASSIGN' | 'UPDATE_WEIGHT' | 'UPDATE_STATUS' | 'REASSIGN';
  kraIds: string[];
  targetEmployeeIds?: string[];
  parameters: Record<string, any>;
  performedBy: string;
  reason?: string;
  scheduledDate?: Date;
  isCompleted: boolean;
  results?: {
    successful: { kraId: string; employeeId?: string }[];
    failed: { kraId: string; employeeId?: string; error: string }[];
  };
}

export interface KRAValidation {
  kraId: string;
  validationType: 'SMART_CHECK' | 'MEASURABILITY' | 'RELEVANCE' | 'ACHIEVABILITY';
  isValid: boolean;
  validationScore: number;
  suggestions: string[];
  validatedBy?: string;
  validatedDate?: Date;
  automatedCheck: boolean;
}

export interface KRADependency extends BaseEntity {
  parentKRAId: string;
  dependentKRAId: string;
  dependencyType: 'PREREQUISITE' | 'PARALLEL' | 'SEQUENTIAL';
  description?: string;
  isActive: boolean;
  weight: number;
}