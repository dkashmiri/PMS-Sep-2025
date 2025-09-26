// Enhanced Review Matrix specific interfaces

export interface EvidenceFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  url?: string;
}

export interface GoalInReview {
  id: string;
  title: string;
  description: string;
  targetValue: string;
  currentProgress: number; // percentage
  status: 'achieved' | 'in_progress' | 'not_started' | 'exceeded';
  evidence: EvidenceFile[];
  selfAssessment: {
    achievementLevel: 'exceeded' | 'achieved' | 'partial' | 'not_achieved';
    comments: string;
    challengesFaced: string;
    nextSteps: string;
  };
  r1Validation: {
    agrees: boolean;
    comments: string;
    evidenceReview: string;
  };
  r2Validation: {
    finalApproval: boolean;
    comments: string;
    impactAssessment: string;
  };
}

export interface KRAInReview {
  id: string;
  name: string;
  description: string;
  weightage: number;
  category: string;
  relatedGoals: GoalInReview[];
  selfAssessment: {
    rating: number;
    comments: string;
    evidence: EvidenceFile[];
  };
  r1Review: {
    rating: number;
    comments: string;
    validation: string;
    agrees: boolean;
  };
  r2Review: {
    rating: number;
    comments: string;
    approval: string;
    finalApproval: boolean;
  };
}

export interface ReviewData {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewCycle: string;
  reviewPeriod: {
    startDate: string;
    endDate: string;
  };
  currentStage: 'self' | 'r1' | 'r2' | 'hr' | 'completed';
  kras: KRAInReview[];
  overallStatus: 'draft' | 'submitted' | 'in_review' | 'approved';
  lastSaved: string;
}