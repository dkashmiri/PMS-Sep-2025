import { PerformanceZone } from './common.types';

export interface PerformanceMetrics {
  totalEmployees: number;
  reviewsCompleted: number;
  reviewsInProgress: number;
  reviewsPending: number;
  averageRating: number;
  ratingDistribution: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
  zoneDistribution: {
    GREEN: number;
    YELLOW: number;
    RED: number;
  };
  departmentPerformance: DepartmentPerformance[];
  goalAchievementRate: number;
  averageGoalProgress: number;
}

export interface DepartmentPerformance {
  departmentId: string;
  departmentName: string;
  totalEmployees: number;
  averageRating: number;
  goalAchievementRate: number;
  reviewCompletionRate: number;
  performanceZone: PerformanceZone;
  trendDirection: 'UP' | 'DOWN' | 'STABLE';
}

export interface EmployeePerformance {
  employeeId: string;
  employeeName: string;
  department: string;
  currentRating: number;
  previousRating?: number;
  ratingTrend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  goalsCompleted: number;
  totalGoals: number;
  goalAchievementRate: number;
  performanceZone: PerformanceZone;
  lastReviewDate?: Date;
  nextReviewDate?: Date;
}

export interface GoalAnalytics {
  totalGoals: number;
  completedGoals: number;
  inProgressGoals: number;
  overDueGoals: number;
  averageCompletionTime: number;
  goalsByCategory: CategoryAnalytics[];
  goalsByPriority: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    CRITICAL: number;
  };
  monthlyGoalTrends: MonthlyTrend[];
  topPerformingGoals: TopGoal[];
  underPerformingGoals: TopGoal[];
}

export interface CategoryAnalytics {
  categoryId: string;
  categoryName: string;
  totalGoals: number;
  completedGoals: number;
  averageProgress: number;
  averageRating: number;
  trendDirection: 'UP' | 'DOWN' | 'STABLE';
}

export interface TopGoal {
  goalId: string;
  goalTitle: string;
  employeeName: string;
  department: string;
  progress: number;
  rating?: number;
  category: string;
}

export interface MonthlyTrend {
  month: string;
  year: number;
  goalsCreated: number;
  goalsCompleted: number;
  averageProgress: number;
  averageRating: number;
}

export interface ReviewAnalytics {
  totalReviews: number;
  completedReviews: number;
  pendingReviews: number;
  overDueReviews: number;
  averageCompletionTime: number;
  reviewsByPhase: {
    SELF_ASSESSMENT: number;
    R1_REVIEW: number;
    R2_REVIEW: number;
    FINALIZED: number;
  };
  reviewerWorkload: ReviewerWorkload[];
  reviewQuality: ReviewQuality;
  cycleComparison: CycleComparison[];
}

export interface ReviewerWorkload {
  reviewerId: string;
  reviewerName: string;
  totalAssigned: number;
  completed: number;
  pending: number;
  averageTimePerReview: number;
  workloadScore: 'LOW' | 'MEDIUM' | 'HIGH' | 'OVERLOADED';
}

export interface ReviewQuality {
  averageDetailScore: number;
  averageFeedbackQuality: number;
  incompleteReviews: number;
  qualityByReviewer: {
    reviewerId: string;
    reviewerName: string;
    qualityScore: number;
    feedbackRating: number;
  }[];
}

export interface CycleComparison {
  cycleId: string;
  cycleName: string;
  completionRate: number;
  averageRating: number;
  goalAchievementRate: number;
  employeeParticipation: number;
  timeToCompletion: number;
}

export interface TeamAnalytics {
  teamId: string;
  teamName: string;
  teamLead: string;
  totalMembers: number;
  averagePerformance: number;
  teamGoalAlignment: number;
  collaborationScore: number;
  performanceDistribution: {
    highPerformers: number;
    averagePerformers: number;
    needsImprovement: number;
  };
  teamGoals: {
    totalGoals: number;
    sharedGoals: number;
    individualGoals: number;
    completionRate: number;
  };
  skillGaps: SkillGap[];
  recommendations: TeamRecommendation[];
}

export interface SkillGap {
  skillArea: string;
  currentLevel: number;
  requiredLevel: number;
  gapScore: number;
  affectedEmployees: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface TeamRecommendation {
  type: 'TRAINING' | 'GOAL_ADJUSTMENT' | 'RESOURCE_ALLOCATION' | 'PROCESS_IMPROVEMENT';
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  expectedImpact: string;
  estimatedEffort: string;
  targetDate?: Date;
}

export interface TrendAnalysis {
  performanceTrends: {
    period: string;
    averageRating: number;
    participationRate: number;
    goalAchievementRate: number;
    employeeSatisfaction: number;
  }[];
  predictiveAnalytics: {
    nextQuarterPerformance: number;
    riskFactors: RiskFactor[];
    opportunities: Opportunity[];
    recommendedActions: RecommendedAction[];
  };
  benchmarking: {
    industryAverage: number;
    companySizeAverage: number;
    topPerformersAverage: number;
    ourPerformance: number;
    gap: number;
    ranking: number;
  };
}

export interface RiskFactor {
  factor: string;
  probability: number;
  impact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  mitigationStrategies: string[];
}

export interface Opportunity {
  area: string;
  potential: number;
  description: string;
  requiredActions: string[];
  expectedTimeframe: string;
}

export interface RecommendedAction {
  action: string;
  category: 'PROCESS' | 'TRAINING' | 'RESOURCE' | 'POLICY' | 'TECHNOLOGY';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  expectedOutcome: string;
  estimatedEffort: string;
  targetDate?: Date;
}

export interface AnalyticsFilter {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  departments?: string[];
  roles?: string[];
  performanceZones?: PerformanceZone[];
  goalCategories?: string[];
  kraCategories?: string[];
  reviewCycles?: string[];
  employeeIds?: string[];
  includeInactive?: boolean;
}

export interface ExportOptions {
  format: 'PDF' | 'EXCEL' | 'CSV' | 'POWERPOINT';
  sections: string[];
  includeCharts: boolean;
  includeRawData: boolean;
  customFilters?: AnalyticsFilter;
  recipients?: string[];
  scheduleType?: 'ONE_TIME' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
}

export interface DashboardWidget {
  id: string;
  type: 'CHART' | 'METRIC' | 'TABLE' | 'PROGRESS' | 'TREND';
  title: string;
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
  position: { x: number; y: number };
  data: any;
  refreshInterval?: number;
  permissions: string[];
  isVisible: boolean;
}

export interface AnalyticsReport {
  id: string;
  name: string;
  description?: string;
  reportType: 'PERFORMANCE' | 'GOALS' | 'REVIEWS' | 'TEAM' | 'TRENDS' | 'CUSTOM';
  filters: AnalyticsFilter;
  widgets: DashboardWidget[];
  generatedBy: string;
  generatedAt: Date;
  exportOptions?: ExportOptions;
  isScheduled: boolean;
  scheduleConfig?: {
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
    recipients: string[];
    nextRunDate: Date;
  };
}