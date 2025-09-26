"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Target,
  Award,
  Star,
  FileText,
  Upload,
  Download,
  Eye,
  Save,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Plus,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// TypeScript Interfaces
interface EvidenceFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  url?: string;
}

interface GoalInReview {
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

interface KRAInReview {
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

interface ReviewData {
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

interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
  department: string;
}

interface EnhancedReviewMatrixProps {
  user: User;
  reviewData: ReviewData;
  onSave: (data: ReviewData) => Promise<void>;
  onSubmit: (data: ReviewData) => Promise<void>;
  onFileUpload: (kraId: string, goalId: string | null, file: File) => Promise<EvidenceFile>;
  onDeleteEvidence: (evidenceId: string) => Promise<void>;
  readOnly?: boolean;
}

// Mock data for demonstration
const mockReviewData: ReviewData = {
  id: 'review-2024-001',
  employeeId: 'emp-001',
  employeeName: 'Sarah Johnson',
  reviewCycle: 'Annual Review 2024',
  reviewPeriod: {
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  currentStage: 'self',
  overallStatus: 'draft',
  lastSaved: new Date().toISOString(),
  kras: [
    {
      id: 'kra-1',
      name: 'Software Development & Code Quality',
      description: 'Deliver high-quality software solutions with clean, maintainable code',
      weightage: 40,
      category: 'Technical Excellence',
      selfAssessment: {
        rating: 4,
        comments: 'Consistently delivered high-quality code with minimal bugs. Implemented best practices for code reviews.',
        evidence: [
          {
            id: 'ev-1',
            name: 'Code_Quality_Report.pdf',
            size: '2.3 MB',
            type: 'PDF',
            uploadedAt: '2024-12-15'
          }
        ]
      },
      r1Review: {
        rating: 4,
        comments: 'Excellent technical delivery. Code quality has improved significantly.',
        validation: 'Evidence supports the self-assessment. Performance metrics are strong.',
        agrees: true
      },
      r2Review: {
        rating: 4,
        comments: 'Solid technical contribution to the team.',
        approval: 'Approved based on evidence and R1 feedback.',
        finalApproval: true
      },
      relatedGoals: [
        {
          id: 'goal-1',
          title: 'Reduce Bug Rate by 30%',
          description: 'Implement better testing practices and code review processes',
          targetValue: '30% reduction',
          currentProgress: 85,
          status: 'achieved',
          evidence: [
            {
              id: 'ev-2',
              name: 'Bug_Metrics_Q4.xlsx',
              size: '1.2 MB',
              type: 'Excel',
              uploadedAt: '2024-12-10'
            }
          ],
          selfAssessment: {
            achievementLevel: 'achieved',
            comments: 'Successfully reduced bug rate by 32% through improved testing and code reviews.',
            challengesFaced: 'Initial resistance to new code review processes from some team members.',
            nextSteps: 'Continue refinining processes and mentoring junior developers.'
          },
          r1Validation: {
            agrees: true,
            comments: 'Great achievement. The process improvements have had measurable impact.',
            evidenceReview: 'Bug metrics clearly show the improvement. Well documented progress.'
          },
          r2Validation: {
            finalApproval: true,
            comments: 'Excellent execution of this goal.',
            impactAssessment: 'Significant positive impact on product quality and team efficiency.'
          }
        },
        {
          id: 'goal-2',
          title: 'Complete Advanced React Certification',
          description: 'Enhance frontend development skills with advanced React concepts',
          targetValue: 'Certification completed',
          currentProgress: 100,
          status: 'exceeded',
          evidence: [
            {
              id: 'ev-3',
              name: 'React_Certificate.pdf',
              size: '850 KB',
              type: 'PDF',
              uploadedAt: '2024-11-20'
            }
          ],
          selfAssessment: {
            achievementLevel: 'exceeded',
            comments: 'Not only completed the certification but also scored in the top 5% of candidates.',
            challengesFaced: 'Balancing study time with project deadlines.',
            nextSteps: 'Share knowledge with the team through tech talks and mentoring.'
          },
          r1Validation: {
            agrees: true,
            comments: 'Outstanding achievement. Already seeing the benefits in current projects.',
            evidenceReview: 'Certificate shows exceptional performance. Knowledge is being applied effectively.'
          },
          r2Validation: {
            finalApproval: true,
            comments: 'Great initiative and execution.',
            impactAssessment: 'Enhanced team capabilities and improved frontend architecture.'
          }
        }
      ]
    },
    {
      id: 'kra-2',
      name: 'Project Leadership & Team Collaboration',
      description: 'Lead project initiatives and foster effective team collaboration',
      weightage: 35,
      category: 'Leadership',
      selfAssessment: {
        rating: 4,
        comments: 'Successfully led 3 major projects and mentored 2 junior developers.',
        evidence: []
      },
      r1Review: {
        rating: 4,
        comments: 'Strong leadership demonstrated across multiple projects.',
        validation: 'Team feedback confirms effective leadership and collaboration.',
        agrees: true
      },
      r2Review: {
        rating: 4,
        comments: 'Excellent leadership growth this year.',
        approval: 'Leadership potential is evident.',
        finalApproval: true
      },
      relatedGoals: [
        {
          id: 'goal-3',
          title: 'Mentor 2 Junior Developers',
          description: 'Provide guidance and support to junior team members',
          targetValue: '2 mentees successfully onboarded',
          currentProgress: 90,
          status: 'achieved',
          evidence: [
            {
              id: 'ev-4',
              name: 'Mentoring_Feedback.pdf',
              size: '1.5 MB',
              type: 'PDF',
              uploadedAt: '2024-12-01'
            }
          ],
          selfAssessment: {
            achievementLevel: 'achieved',
            comments: 'Successfully mentored both developers. They have shown significant improvement.',
            challengesFaced: 'Different learning styles required adaptive mentoring approaches.',
            nextSteps: 'Continue mentoring relationship and expand to more team members.'
          },
          r1Validation: {
            agrees: true,
            comments: 'Both mentees have provided excellent feedback about the guidance received.',
            evidenceReview: 'Mentoring feedback shows positive impact on both individuals.'
          },
          r2Validation: {
            finalApproval: true,
            comments: 'Great mentoring skills demonstrated.',
            impactAssessment: 'Improved team capability and knowledge transfer effectiveness.'
          }
        }
      ]
    },
    {
      id: 'kra-3',
      name: 'Innovation & Process Improvement',
      description: 'Drive innovation and continuous improvement in processes and tools',
      weightage: 25,
      category: 'Innovation',
      selfAssessment: {
        rating: 3,
        comments: 'Implemented automated testing pipeline and improved deployment process.',
        evidence: []
      },
      r1Review: {
        rating: 3,
        comments: 'Good progress on process improvements.',
        validation: 'Process changes have shown measurable benefits.',
        agrees: true
      },
      r2Review: {
        rating: 3,
        comments: 'Solid contribution to process improvement.',
        approval: 'Innovation efforts are recognized.',
        finalApproval: true
      },
      relatedGoals: []
    }
  ]
};

export function EnhancedReviewMatrix({
  user,
  reviewData = mockReviewData,
  onSave,
  onSubmit,
  onFileUpload,
  onDeleteEvidence,
  readOnly = false
}: EnhancedReviewMatrixProps) {
  const [data, setData] = useState<ReviewData>(reviewData);
  const [saving, setSaving] = useState(false);
  const [expandedKRAs, setExpandedKRAs] = useState<string[]>(['kra-1']);
  const [expandedGoals, setExpandedGoals] = useState<string[]>([]);

  // Determine user permissions based on current stage and role
  const canEdit = useMemo(() => {
    if (readOnly) return false;

    switch (data.currentStage) {
      case 'self':
        return user.role === 'EMPLOYEE' || user.id === data.employeeId;
      case 'r1':
        return user.role === 'TEAMLEAD' || user.role === 'MANAGER';
      case 'r2':
        return user.role === 'MANAGER';
      default:
        return false;
    }
  }, [data.currentStage, user.role, user.id, data.employeeId, readOnly]);

  const currentReviewStage = data.currentStage;

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved':
      case 'exceeded':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'not_started':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingLabel = (rating: number) => {
    const labels = ['', 'Unsatisfactory', 'Below Expectations', 'Meets Expectations', 'Exceeds Expectations', 'Outstanding'];
    return labels[rating] || 'Not Rated';
  };

  // Update functions
  const updateKRASelfAssessment = useCallback((kraId: string, field: string, value: any) => {
    if (!canEdit || currentReviewStage !== 'self') return;

    setData(prev => ({
      ...prev,
      kras: prev.kras.map(kra =>
        kra.id === kraId
          ? { ...kra, selfAssessment: { ...kra.selfAssessment, [field]: value }}
          : kra
      )
    }));
  }, [canEdit, currentReviewStage]);

  const updateKRAR1Review = useCallback((kraId: string, field: string, value: any) => {
    if (!canEdit || currentReviewStage !== 'r1') return;

    setData(prev => ({
      ...prev,
      kras: prev.kras.map(kra =>
        kra.id === kraId
          ? { ...kra, r1Review: { ...kra.r1Review, [field]: value }}
          : kra
      )
    }));
  }, [canEdit, currentReviewStage]);

  const updateKRAR2Review = useCallback((kraId: string, field: string, value: any) => {
    if (!canEdit || currentReviewStage !== 'r2') return;

    setData(prev => ({
      ...prev,
      kras: prev.kras.map(kra =>
        kra.id === kraId
          ? { ...kra, r2Review: { ...kra.r2Review, [field]: value }}
          : kra
      )
    }));
  }, [canEdit, currentReviewStage]);

  const updateGoalSelfAssessment = useCallback((kraId: string, goalId: string, field: string, value: any) => {
    if (!canEdit || currentReviewStage !== 'self') return;

    setData(prev => ({
      ...prev,
      kras: prev.kras.map(kra =>
        kra.id === kraId
          ? {
              ...kra,
              relatedGoals: kra.relatedGoals.map(goal =>
                goal.id === goalId
                  ? { ...goal, selfAssessment: { ...goal.selfAssessment, [field]: value }}
                  : goal
              )
            }
          : kra
      )
    }));
  }, [canEdit, currentReviewStage]);

  const updateGoalR1Validation = useCallback((kraId: string, goalId: string, field: string, value: any) => {
    if (!canEdit || currentReviewStage !== 'r1') return;

    setData(prev => ({
      ...prev,
      kras: prev.kras.map(kra =>
        kra.id === kraId
          ? {
              ...kra,
              relatedGoals: kra.relatedGoals.map(goal =>
                goal.id === goalId
                  ? { ...goal, r1Validation: { ...goal.r1Validation, [field]: value }}
                  : goal
              )
            }
          : kra
      )
    }));
  }, [canEdit, currentReviewStage]);

  const updateGoalR2Validation = useCallback((kraId: string, goalId: string, field: string, value: any) => {
    if (!canEdit || currentReviewStage !== 'r2') return;

    setData(prev => ({
      ...prev,
      kras: prev.kras.map(kra =>
        kra.id === kraId
          ? {
              ...kra,
              relatedGoals: kra.relatedGoals.map(goal =>
                goal.id === goalId
                  ? { ...goal, r2Validation: { ...goal.r2Validation, [field]: value }}
                  : goal
              )
            }
          : kra
      )
    }));
  }, [canEdit, currentReviewStage]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(data);
      setData(prev => ({ ...prev, lastSaved: new Date().toISOString() }));
    } catch (error) {
      console.error('Error saving review:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleFileUpload = async (kraId: string, goalId: string | null, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedFile = await onFileUpload(kraId, goalId, file);

      setData(prev => ({
        ...prev,
        kras: prev.kras.map(kra => {
          if (kra.id === kraId) {
            if (goalId) {
              // Add to goal evidence
              return {
                ...kra,
                relatedGoals: kra.relatedGoals.map(goal =>
                  goal.id === goalId
                    ? { ...goal, evidence: [...goal.evidence, uploadedFile] }
                    : goal
                )
              };
            } else {
              // Add to KRA evidence
              return {
                ...kra,
                selfAssessment: {
                  ...kra.selfAssessment,
                  evidence: [...kra.selfAssessment.evidence, uploadedFile]
                }
              };
            }
          }
          return kra;
        })
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const removeEvidence = async (kraId: string, goalId: string | null, evidenceId: string) => {
    try {
      // Call the delete service
      await onDeleteEvidence(evidenceId);

      // Update local state after successful deletion
      setData(prev => ({
        ...prev,
        kras: prev.kras.map(kra => {
          if (kra.id === kraId) {
            if (goalId) {
              return {
                ...kra,
                relatedGoals: kra.relatedGoals.map(goal =>
                  goal.id === goalId
                    ? { ...goal, evidence: goal.evidence.filter(e => e.id !== evidenceId) }
                    : goal
                )
              };
            } else {
              return {
                ...kra,
                selfAssessment: {
                  ...kra.selfAssessment,
                  evidence: kra.selfAssessment.evidence.filter(e => e.id !== evidenceId)
                }
              };
            }
          }
          return kra;
        })
      }));
    } catch (error) {
      console.error('Error removing evidence:', error);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enhanced Review Matrix</h1>
          <p className="text-gray-600 mt-1">KRA-Goal Integrated Performance Review</p>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="outline">{data.reviewCycle}</Badge>
            <Badge className={
              data.currentStage === 'self' ? 'bg-blue-100 text-blue-800' :
              data.currentStage === 'r1' ? 'bg-orange-100 text-orange-800' :
              data.currentStage === 'r2' ? 'bg-purple-100 text-purple-800' :
              'bg-green-100 text-green-800'
            }>
              {data.currentStage === 'self' ? 'Self Assessment' :
               data.currentStage === 'r1' ? 'R1 Review' :
               data.currentStage === 'r2' ? 'R2 Review' : 'Completed'}
            </Badge>
          </div>
        </div>
        <div className="flex gap-3">
          {canEdit && (
            <>
              <Button variant="outline" onClick={handleSave} disabled={saving} className="gap-2">
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button onClick={handleSubmit} className="gap-2">
                <Send className="w-4 h-4" />
                Submit Review
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Review Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Review Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium">Employee</Label>
              <p className="text-sm text-gray-600">{data.employeeName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Review Period</Label>
              <p className="text-sm text-gray-600">
                {new Date(data.reviewPeriod.startDate).toLocaleDateString()} - {new Date(data.reviewPeriod.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Badge variant="outline">{data.overallStatus}</Badge>
            </div>
            <div>
              <Label className="text-sm font-medium">Last Saved</Label>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(data.lastSaved).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KRA Review Matrix */}
      <div className="space-y-4">
        {data.kras.map((kra) => (
          <Card key={kra.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{kra.name}</CardTitle>
                    <p className="text-sm text-gray-600">{kra.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{kra.category}</Badge>
                  <Badge className="bg-blue-100 text-blue-800">{kra.weightage}% Weight</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <Accordion type="single" collapsible value={expandedKRAs.includes(kra.id) ? kra.id : ''}>
                <AccordionItem value={kra.id} className="border-none">
                  <AccordionTrigger
                    onClick={() => setExpandedKRAs(prev =>
                      prev.includes(kra.id)
                        ? prev.filter(id => id !== kra.id)
                        : [...prev, kra.id]
                    )}
                    className="hover:no-underline"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-medium">Review Details</span>
                      <div className="flex items-center gap-2">
                        {/* Rating indicators */}
                        <div className="text-sm text-gray-500">
                          Self: <span className={getRatingColor(kra.selfAssessment.rating)}>{kra.selfAssessment.rating}</span>
                        </div>
                        {currentReviewStage !== 'self' && (
                          <div className="text-sm text-gray-500">
                            R1: <span className={getRatingColor(kra.r1Review.rating)}>{kra.r1Review.rating}</span>
                          </div>
                        )}
                        {(currentReviewStage === 'r2' || currentReviewStage === 'completed') && (
                          <div className="text-sm text-gray-500">
                            R2: <span className={getRatingColor(kra.r2Review.rating)}>{kra.r2Review.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="space-y-6">
                      {/* Self Assessment Section */}
                      <div className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="w-4 h-4 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Self Assessment</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Rating (1-5)</Label>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              value={kra.selfAssessment.rating}
                              onChange={(e) => updateKRASelfAssessment(kra.id, 'rating', parseInt(e.target.value))}
                              disabled={!canEdit || currentReviewStage !== 'self'}
                              className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">{getRatingLabel(kra.selfAssessment.rating)}</p>
                          </div>
                          <div className="md:col-span-2">
                            <Label>Comments & Justification</Label>
                            <Textarea
                              value={kra.selfAssessment.comments}
                              onChange={(e) => updateKRASelfAssessment(kra.id, 'comments', e.target.value)}
                              disabled={!canEdit || currentReviewStage !== 'self'}
                              placeholder="Provide detailed comments about your performance in this KRA..."
                              className="mt-1 min-h-20"
                            />
                          </div>
                        </div>

                        {/* Evidence Upload */}
                        <div className="mt-4">
                          <Label className="mb-2 block">Evidence & Documentation</Label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {kra.selfAssessment.evidence.map((evidence) => (
                              <div key={evidence.id} className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
                                <FileText className="w-4 h-4" />
                                <span className="text-sm">{evidence.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeEvidence(kra.id, null, evidence.id)}
                                  disabled={!canEdit || currentReviewStage !== 'self'}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          {canEdit && currentReviewStage === 'self' && (
                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                onChange={(e) => handleFileUpload(kra.id, null, e)}
                                className="hidden"
                                id={`kra-evidence-${kra.id}`}
                                accept=".pdf,.doc,.docx,.xlsx,.jpg,.png"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById(`kra-evidence-${kra.id}`)?.click()}
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Evidence
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* R1 Review Section */}
                      {(currentReviewStage === 'r1' || currentReviewStage === 'r2' || currentReviewStage === 'completed') && (
                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-4 h-4 text-orange-600" />
                            <h4 className="font-semibold text-orange-900">R1 Review (Team Lead)</h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <Label>Rating (1-5)</Label>
                              <Input
                                type="number"
                                min="1"
                                max="5"
                                value={kra.r1Review.rating}
                                onChange={(e) => updateKRAR1Review(kra.id, 'rating', parseInt(e.target.value))}
                                disabled={!canEdit || currentReviewStage !== 'r1'}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label>Agrees with Self</Label>
                              <div className="mt-2">
                                <Checkbox
                                  checked={kra.r1Review.agrees}
                                  onCheckedChange={(checked) => updateKRAR1Review(kra.id, 'agrees', checked)}
                                  disabled={!canEdit || currentReviewStage !== 'r1'}
                                />
                                <span className="ml-2 text-sm">Yes, I agree</span>
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <Label>R1 Comments</Label>
                              <Textarea
                                value={kra.r1Review.comments}
                                onChange={(e) => updateKRAR1Review(kra.id, 'comments', e.target.value)}
                                disabled={!canEdit || currentReviewStage !== 'r1'}
                                placeholder="Provide R1 review comments..."
                                className="mt-1 min-h-16"
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <Label>Evidence Validation</Label>
                            <Textarea
                              value={kra.r1Review.validation}
                              onChange={(e) => updateKRAR1Review(kra.id, 'validation', e.target.value)}
                              disabled={!canEdit || currentReviewStage !== 'r1'}
                              placeholder="Comments on evidence and validation..."
                              className="mt-1 min-h-16"
                            />
                          </div>
                        </div>
                      )}

                      {/* R2 Review Section */}
                      {(currentReviewStage === 'r2' || currentReviewStage === 'completed') && (
                        <div className="border-l-4 border-purple-500 pl-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="w-4 h-4 text-purple-600" />
                            <h4 className="font-semibold text-purple-900">R2 Review (Manager)</h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <Label>Final Rating (1-5)</Label>
                              <Input
                                type="number"
                                min="1"
                                max="5"
                                value={kra.r2Review.rating}
                                onChange={(e) => updateKRAR2Review(kra.id, 'rating', parseInt(e.target.value))}
                                disabled={!canEdit || currentReviewStage !== 'r2'}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label>Final Approval</Label>
                              <div className="mt-2">
                                <Checkbox
                                  checked={kra.r2Review.finalApproval}
                                  onCheckedChange={(checked) => updateKRAR2Review(kra.id, 'finalApproval', checked)}
                                  disabled={!canEdit || currentReviewStage !== 'r2'}
                                />
                                <span className="ml-2 text-sm">Approved</span>
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <Label>R2 Comments</Label>
                              <Textarea
                                value={kra.r2Review.comments}
                                onChange={(e) => updateKRAR2Review(kra.id, 'comments', e.target.value)}
                                disabled={!canEdit || currentReviewStage !== 'r2'}
                                placeholder="Provide final review comments..."
                                className="mt-1 min-h-16"
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <Label>Approval Comments</Label>
                            <Textarea
                              value={kra.r2Review.approval}
                              onChange={(e) => updateKRAR2Review(kra.id, 'approval', e.target.value)}
                              disabled={!canEdit || currentReviewStage !== 'r2'}
                              placeholder="Final approval comments..."
                              className="mt-1 min-h-16"
                            />
                          </div>
                        </div>
                      )}

                      {/* Related Goals Section */}
                      {kra.relatedGoals.length > 0 && (
                        <div className="mt-6">
                          <Separator />
                          <div className="mt-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Award className="w-5 h-5 text-green-600" />
                              <h3 className="text-lg font-semibold text-green-900">Related Goals ({kra.relatedGoals.length})</h3>
                            </div>

                            <div className="space-y-4">
                              {kra.relatedGoals.map((goal) => (
                                <Card key={goal.id} className="border-l-4 border-green-500">
                                  <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h4 className="font-semibold">{goal.title}</h4>
                                        <p className="text-sm text-gray-600">{goal.description}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                          <span className="text-sm font-medium">Target: {goal.targetValue}</span>
                                          <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setExpandedGoals(prev =>
                                          prev.includes(goal.id)
                                            ? prev.filter(id => id !== goal.id)
                                            : [...prev, goal.id]
                                        )}
                                      >
                                        {expandedGoals.includes(goal.id) ?
                                          <ChevronUp className="w-4 h-4" /> :
                                          <ChevronDown className="w-4 h-4" />
                                        }
                                      </Button>
                                    </div>
                                  </CardHeader>

                                  <CardContent className="pt-0">
                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                      <div className="flex justify-between items-center mb-1">
                                        <Label className="text-sm">Progress</Label>
                                        <span className="text-sm font-medium">{goal.currentProgress}%</span>
                                      </div>
                                      <Progress value={goal.currentProgress} className="h-2" />
                                    </div>

                                    {expandedGoals.includes(goal.id) && (
                                      <div className="space-y-4">
                                        {/* Self Assessment */}
                                        <div className="bg-blue-50 rounded-lg p-4">
                                          <h5 className="font-medium text-blue-900 mb-3">Self Assessment</h5>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                              <Label>Achievement Level</Label>
                                              <select
                                                value={goal.selfAssessment.achievementLevel}
                                                onChange={(e) => updateGoalSelfAssessment(kra.id, goal.id, 'achievementLevel', e.target.value)}
                                                disabled={!canEdit || currentReviewStage !== 'self'}
                                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                                              >
                                                <option value="exceeded">Exceeded</option>
                                                <option value="achieved">Achieved</option>
                                                <option value="partial">Partially Achieved</option>
                                                <option value="not_achieved">Not Achieved</option>
                                              </select>
                                            </div>
                                            <div>
                                              <Label>Comments</Label>
                                              <Textarea
                                                value={goal.selfAssessment.comments}
                                                onChange={(e) => updateGoalSelfAssessment(kra.id, goal.id, 'comments', e.target.value)}
                                                disabled={!canEdit || currentReviewStage !== 'self'}
                                                className="mt-1 min-h-16"
                                              />
                                            </div>
                                            <div>
                                              <Label>Challenges Faced</Label>
                                              <Textarea
                                                value={goal.selfAssessment.challengesFaced}
                                                onChange={(e) => updateGoalSelfAssessment(kra.id, goal.id, 'challengesFaced', e.target.value)}
                                                disabled={!canEdit || currentReviewStage !== 'self'}
                                                className="mt-1 min-h-16"
                                              />
                                            </div>
                                            <div>
                                              <Label>Next Steps</Label>
                                              <Textarea
                                                value={goal.selfAssessment.nextSteps}
                                                onChange={(e) => updateGoalSelfAssessment(kra.id, goal.id, 'nextSteps', e.target.value)}
                                                disabled={!canEdit || currentReviewStage !== 'self'}
                                                className="mt-1 min-h-16"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        {/* R1 Validation */}
                                        {(currentReviewStage === 'r1' || currentReviewStage === 'r2' || currentReviewStage === 'completed') && (
                                          <div className="bg-orange-50 rounded-lg p-4">
                                            <h5 className="font-medium text-orange-900 mb-3">R1 Validation</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              <div>
                                                <Label>Agrees with Assessment</Label>
                                                <div className="mt-2">
                                                  <Checkbox
                                                    checked={goal.r1Validation.agrees}
                                                    onCheckedChange={(checked) => updateGoalR1Validation(kra.id, goal.id, 'agrees', checked)}
                                                    disabled={!canEdit || currentReviewStage !== 'r1'}
                                                  />
                                                  <span className="ml-2 text-sm">I agree with the self-assessment</span>
                                                </div>
                                              </div>
                                              <div>
                                                <Label>R1 Comments</Label>
                                                <Textarea
                                                  value={goal.r1Validation.comments}
                                                  onChange={(e) => updateGoalR1Validation(kra.id, goal.id, 'comments', e.target.value)}
                                                  disabled={!canEdit || currentReviewStage !== 'r1'}
                                                  className="mt-1 min-h-16"
                                                />
                                              </div>
                                              <div className="md:col-span-2">
                                                <Label>Evidence Review</Label>
                                                <Textarea
                                                  value={goal.r1Validation.evidenceReview}
                                                  onChange={(e) => updateGoalR1Validation(kra.id, goal.id, 'evidenceReview', e.target.value)}
                                                  disabled={!canEdit || currentReviewStage !== 'r1'}
                                                  className="mt-1 min-h-16"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {/* R2 Validation */}
                                        {(currentReviewStage === 'r2' || currentReviewStage === 'completed') && (
                                          <div className="bg-purple-50 rounded-lg p-4">
                                            <h5 className="font-medium text-purple-900 mb-3">R2 Validation</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              <div>
                                                <Label>Final Approval</Label>
                                                <div className="mt-2">
                                                  <Checkbox
                                                    checked={goal.r2Validation.finalApproval}
                                                    onCheckedChange={(checked) => updateGoalR2Validation(kra.id, goal.id, 'finalApproval', checked)}
                                                    disabled={!canEdit || currentReviewStage !== 'r2'}
                                                  />
                                                  <span className="ml-2 text-sm">Final approval granted</span>
                                                </div>
                                              </div>
                                              <div>
                                                <Label>R2 Comments</Label>
                                                <Textarea
                                                  value={goal.r2Validation.comments}
                                                  onChange={(e) => updateGoalR2Validation(kra.id, goal.id, 'comments', e.target.value)}
                                                  disabled={!canEdit || currentReviewStage !== 'r2'}
                                                  className="mt-1 min-h-16"
                                                />
                                              </div>
                                              <div className="md:col-span-2">
                                                <Label>Impact Assessment</Label>
                                                <Textarea
                                                  value={goal.r2Validation.impactAssessment}
                                                  onChange={(e) => updateGoalR2Validation(kra.id, goal.id, 'impactAssessment', e.target.value)}
                                                  disabled={!canEdit || currentReviewStage !== 'r2'}
                                                  className="mt-1 min-h-16"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {/* Evidence Files */}
                                        <div>
                                          <Label className="mb-2 block">Goal Evidence</Label>
                                          <div className="flex flex-wrap gap-2 mb-2">
                                            {goal.evidence.map((evidence) => (
                                              <div key={evidence.id} className="flex items-center gap-2 bg-green-100 rounded px-3 py-2">
                                                <FileText className="w-4 h-4 text-green-600" />
                                                <span className="text-sm">{evidence.name}</span>
                                                <Badge variant="outline" className="text-xs">{evidence.type}</Badge>
                                                <div className="flex gap-1">
                                                  <Button variant="ghost" size="sm">
                                                    <Eye className="w-3 h-3" />
                                                  </Button>
                                                  <Button variant="ghost" size="sm">
                                                    <Download className="w-3 h-3" />
                                                  </Button>
                                                  {canEdit && currentReviewStage === 'self' && (
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={() => removeEvidence(kra.id, goal.id, evidence.id)}
                                                    >
                                                      <X className="w-3 h-3" />
                                                    </Button>
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                          {canEdit && currentReviewStage === 'self' && (
                                            <div className="flex items-center gap-2">
                                              <input
                                                type="file"
                                                onChange={(e) => handleFileUpload(kra.id, goal.id, e)}
                                                className="hidden"
                                                id={`goal-evidence-${goal.id}`}
                                                accept=".pdf,.doc,.docx,.xlsx,.jpg,.png"
                                              />
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => document.getElementById(`goal-evidence-${goal.id}`)?.click()}
                                              >
                                                <Upload className="w-4 h-4 mr-2" />
                                                Upload Evidence
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Review Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {data.kras.length}
              </div>
              <p className="text-sm text-gray-600">Total KRAs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {data.kras.reduce((sum, kra) => sum + kra.relatedGoals.length, 0)}
              </div>
              <p className="text-sm text-gray-600">Related Goals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {data.kras.reduce((sum, kra) =>
                  sum + kra.selfAssessment.evidence.length +
                  kra.relatedGoals.reduce((goalSum, goal) => goalSum + goal.evidence.length, 0), 0)}
              </div>
              <p className="text-sm text-gray-600">Evidence Files</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}