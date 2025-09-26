import { BaseEntity, PerformanceZone } from './common.types';
import { User } from './auth.types';

export interface FinancialYear extends BaseEntity {
  year: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  description?: string;
}

export interface ReviewCycle extends BaseEntity {
  financialYearId: string;
  name: string;
  type: 'ANNUAL' | 'HALF_YEARLY' | 'QUARTERLY' | 'MONTHLY';
  startDate: Date;
  endDate: Date;
  selfAssessmentDeadline: Date;
  r1ReviewDeadline: Date;
  r2ReviewDeadline: Date;
  isActive: boolean;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  description?: string;
}

export interface ReviewSchedule extends BaseEntity {
  reviewCycleId: string;
  phase: 'GOAL_SETTING' | 'SELF_ASSESSMENT' | 'R1_REVIEW' | 'R2_REVIEW' | 'FINALIZATION';
  startDate: Date;
  endDate: Date;
  reminderDays: number[];
  isCompleted: boolean;
}

export interface ReviewHeader extends BaseEntity {
  reviewCycleId: string;
  employeeId: string;
  r1ReviewerId?: string;
  r2ReviewerId?: string;
  overallRating?: number;
  overallComments?: string;
  performanceZone?: PerformanceZone;
  status: 'DRAFT' | 'SELF_ASSESSMENT_PENDING' | 'SELF_ASSESSMENT_COMPLETED' | 
          'R1_REVIEW_PENDING' | 'R1_REVIEW_COMPLETED' | 
          'R2_REVIEW_PENDING' | 'R2_REVIEW_COMPLETED' | 'FINALIZED';
  selfAssessmentDate?: Date;
  r1ReviewDate?: Date;
  r2ReviewDate?: Date;
  finalizedDate?: Date;
  isDraft: boolean;
}

export interface ReviewDetail extends BaseEntity {
  reviewHeaderId: string;
  kraId: string;
  goalId?: string;
  weight: number;
  selfRating?: number;
  selfComments?: string;
  r1Rating?: number;
  r1Comments?: string;
  r2Rating?: number;
  r2Comments?: string;
  finalRating?: number;
  finalComments?: string;
  evidenceAttachments?: string[];
}

export interface ReviewComment extends BaseEntity {
  reviewHeaderId: string;
  commentType: 'STRENGTH' | 'IMPROVEMENT' | 'GOAL' | 'GENERAL';
  phase: 'SELF_ASSESSMENT' | 'R1_REVIEW' | 'R2_REVIEW';
  comment: string;
  userId: string;
  isPrivate: boolean;
}

export interface ReviewAttachment extends BaseEntity {
  reviewHeaderId: string;
  reviewDetailId?: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  filePath: string;
  uploadedBy: string;
  description?: string;
}

export interface ReviewerMapping extends BaseEntity {
  employeeId: string;
  r1ReviewerId: string;
  r2ReviewerId: string;
  reviewCycleId: string;
  isActive: boolean;
  effectiveDate: Date;
  endDate?: Date;
}

export interface ReviewWorkflow {
  step: number;
  phase: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedDate?: Date;
  assignedTo?: string;
  deadline?: Date;
  estimatedDuration?: number;
}

export interface ReviewSummary {
  totalReviews: number;
  completedReviews: number;
  pendingSelfAssessment: number;
  pendingR1Review: number;
  pendingR2Review: number;
  finalizedReviews: number;
  averageRating: number;
  greenZone: number;
  yellowZone: number;
  redZone: number;
}

export interface PerformanceHistory extends BaseEntity {
  employeeId: string;
  reviewCycleId: string;
  overallRating: number;
  performanceZone: PerformanceZone;
  goalsAchieved: number;
  totalGoals: number;
  kraAverageRating: number;
  improvementAreas: string[];
  strengths: string[];
  nextCycleGoals: string[];
}

export interface ReviewTemplate {
  id: string;
  name: string;
  description?: string;
  sections: ReviewTemplateSection[];
  isDefault: boolean;
  applicableRoles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewTemplateSection {
  id: string;
  title: string;
  description?: string;
  weight: number;
  order: number;
  fields: ReviewTemplateField[];
}

export interface ReviewTemplateField {
  id: string;
  name: string;
  type: 'TEXT' | 'TEXTAREA' | 'RATING' | 'SELECT' | 'MULTISELECT' | 'DATE' | 'NUMBER';
  label: string;
  placeholder?: string;
  isRequired: boolean;
  order: number;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}