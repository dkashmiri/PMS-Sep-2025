import { BaseEntity, PerformanceZone } from './common.types';

export interface Goal extends BaseEntity {
  title: string;
  description: string;
  categoryId: string;
  employeeId: string;
  managerId?: string;
  reviewCycleId: string;
  kraId?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'DRAFT' | 'ACTIVE' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DEFERRED';
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  startDate: Date;
  targetDate: Date;
  completedDate?: Date;
  weight: number;
  isSmartGoal: boolean;
  smartCriteria?: SmartCriteria;
  alignmentScore?: number;
  achievementPercentage: number;
  selfRating?: number;
  managerRating?: number;
  finalRating?: number;
  notes?: string;
  tags?: string[];
  isPrivate: boolean;
  parentGoalId?: string;
  subGoals?: Goal[];
}

export interface SmartCriteria {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  isValidated: boolean;
}

export interface GoalCategory extends BaseEntity {
  name: string;
  code: string;
  description?: string;
  color: string;
  icon?: string;
  isActive: boolean;
  parentCategoryId?: string;
  subCategories?: GoalCategory[];
  order: number;
}

export interface GoalTemplate extends BaseEntity {
  name: string;
  description?: string;
  categoryId: string;
  title: string;
  goalDescription: string;
  suggestedWeight: number;
  estimatedDuration?: number;
  smartCriteria?: SmartCriteria;
  tags?: string[];
  applicableRoles: string[];
  isActive: boolean;
  usageCount: number;
}

export interface GoalProgress extends BaseEntity {
  goalId: string;
  progressDate: Date;
  currentValue: number;
  progressPercentage: number;
  notes?: string;
  attachments?: string[];
  reportedBy: string;
  milestone?: string;
  isAutoCalculated: boolean;
}

export interface GoalEvidence extends BaseEntity {
  goalId: string;
  progressId?: string;
  title: string;
  description: string;
  evidenceType: 'DOCUMENT' | 'LINK' | 'IMAGE' | 'VIDEO' | 'OTHER';
  fileName?: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  url?: string;
  uploadedBy: string;
  verifiedBy?: string;
  verifiedDate?: Date;
  isVerified: boolean;
  tags?: string[];
}

export interface GoalAchievementHistory extends BaseEntity {
  goalId: string;
  employeeId: string;
  reviewCycleId: string;
  targetValue: number;
  achievedValue: number;
  achievementPercentage: number;
  selfRating: number;
  managerRating: number;
  finalRating: number;
  performanceZone: PerformanceZone;
  completionDate?: Date;
  notes?: string;
}

export interface GoalKRAMapping extends BaseEntity {
  goalId: string;
  kraId: string;
  alignmentScore: number;
  mappingType: 'PRIMARY' | 'SECONDARY' | 'SUPPORTING';
  weight: number;
  notes?: string;
  isAutoMapped: boolean;
  verifiedBy?: string;
  verifiedDate?: Date;
}

export interface GoalMilestone extends BaseEntity {
  goalId: string;
  title: string;
  description?: string;
  targetDate: Date;
  completedDate?: Date;
  isCompleted: boolean;
  order: number;
  weight: number;
  dependencies?: string[];
}

export interface GoalCollaboration extends BaseEntity {
  goalId: string;
  collaboratorId: string;
  role: 'REVIEWER' | 'CONTRIBUTOR' | 'STAKEHOLDER' | 'OBSERVER';
  permissions: ('VIEW' | 'COMMENT' | 'UPDATE' | 'APPROVE')[];
  isActive: boolean;
  addedBy: string;
}

export interface GoalAnalytics {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  overDueGoals: number;
  averageAchievementRate: number;
  goalsByCategory: { [categoryId: string]: number };
  goalsByPriority: { [priority: string]: number };
  goalsByStatus: { [status: string]: number };
  monthlyProgress: {
    month: string;
    goalsCreated: number;
    goalsCompleted: number;
    averageProgress: number;
  }[];
  topPerformers: {
    employeeId: string;
    employeeName: string;
    achievementRate: number;
    completedGoals: number;
  }[];
}

export interface CrossCycleGoalAnalysis {
  employeeId: string;
  cycles: {
    cycleId: string;
    cycleName: string;
    totalGoals: number;
    completedGoals: number;
    averageRating: number;
    achievementRate: number;
    topCategories: string[];
  }[];
  trends: {
    improvementAreas: string[];
    consistentStrengths: string[];
    progressTrend: 'IMPROVING' | 'STABLE' | 'DECLINING';
    recommendedFocus: string[];
  };
}

export interface GoalRecommendation {
  id: string;
  employeeId: string;
  recommendationType: 'SKILL_BASED' | 'ROLE_BASED' | 'PERFORMANCE_BASED' | 'INDUSTRY_TREND';
  goalTemplate: GoalTemplate;
  reason: string;
  confidence: number;
  suggestedTimeline: number;
  prerequisites?: string[];
  expectedOutcomes: string[];
  isAccepted?: boolean;
  createdAt: Date;
}

export interface GoalBulkOperation {
  operation: 'UPDATE_STATUS' | 'UPDATE_CATEGORY' | 'UPDATE_DEADLINE' | 'ASSIGN_REVIEWER' | 'DELETE';
  goalIds: string[];
  parameters: Record<string, any>;
  performedBy: string;
  reason?: string;
  scheduledDate?: Date;
  isCompleted: boolean;
  results?: {
    successful: string[];
    failed: { goalId: string; error: string }[];
  };
}