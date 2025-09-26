"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
  FileText,
  Upload,
  Paperclip,
  Eye,
  Save,
  Send,
  CheckCircle,
  AlertCircle,
  Star,
  MessageSquare,
  Calendar,
  User,
  Building2,
  Target,
  Award,
  TrendingUp,
  X,
  Download,
  Edit,
  Lock,
  Clock
} from 'lucide-react';

// Import types
import { ReviewData, KRAInReview, GoalInReview, EvidenceFile } from '@/types/review-matrix.types';

// Additional interfaces for matrix-specific functionality
interface MatrixCellData {
  rating: number;
  comments: string;
  submittedAt?: Date;
  status: 'draft' | 'submitted' | 'pending' | 'approved';
  canEdit: boolean;
}

interface MatrixRow {
  kra: KRAInReview;
  selfReview: MatrixCellData;
  r1Review: MatrixCellData;
  r2Review: MatrixCellData;
  finalScore: number;
  evidenceCount: number;
  attachmentCount: number;
}

// Mock data generator for demonstration
const generateMockData = (): ReviewData => ({
  id: "review-001",
  employeeId: "emp-001",
  employeeName: "John Doe",
  reviewCycle: "Q1 2025",
  reviewPeriod: {
    startDate: "2025-01-01",
    endDate: "2025-03-31"
  },
  currentStage: "r2",
  overallStatus: "in_review",
  lastSaved: "2025-01-15T10:30:00Z",
  kras: [
    {
      id: "kra-1",
      name: "Technical Excellence",
      description: "Maintain high technical standards and code quality",
      weightage: 30,
      category: "Technical",
      relatedGoals: [
        {
          id: "goal-1",
          title: "React Certification",
          description: "Complete React Developer Certification",
          targetValue: "Certification obtained",
          currentProgress: 75,
          status: "in_progress",
          evidence: [
            { id: "ev-1", name: "progress-screenshot.png", size: "2.1 MB", type: "image/png", uploadedAt: "2025-01-10" }
          ],
          selfAssessment: {
            achievementLevel: "partial",
            comments: "Made good progress, exam scheduled for next month",
            challengesFaced: "Time management with regular work",
            nextSteps: "Complete final modules and take exam"
          },
          r1Validation: {
            agrees: true,
            comments: "Good progress shown",
            evidenceReview: "Evidence supports progress claims"
          },
          r2Validation: {
            finalApproval: false,
            comments: "Awaiting final completion",
            impactAssessment: "Will enhance team capabilities"
          }
        }
      ],
      selfAssessment: {
        rating: 8,
        comments: "Consistently delivered high-quality code and maintained best practices",
        evidence: [
          { id: "ev-2", name: "code-review-feedback.pdf", size: "1.5 MB", type: "application/pdf", uploadedAt: "2025-01-12" }
        ]
      },
      r1Review: {
        rating: 7,
        comments: "Good technical skills, room for improvement in documentation",
        validation: "Performance meets expectations",
        agrees: true
      },
      r2Review: {
        rating: 8,
        comments: "Strong technical contributor to the team",
        approval: "Approved with recommendations",
        finalApproval: true
      }
    },
    {
      id: "kra-2",
      name: "Code Quality",
      description: "Ensure code quality standards and testing coverage",
      weightage: 25,
      category: "Technical",
      relatedGoals: [
        {
          id: "goal-2",
          title: "Zero Bug Goal",
          description: "Achieve zero production bugs in Q1",
          targetValue: "0 bugs",
          currentProgress: 100,
          status: "achieved",
          evidence: [
            { id: "ev-3", name: "bug-tracking-report.xlsx", size: "856 KB", type: "application/xlsx", uploadedAt: "2025-01-14" }
          ],
          selfAssessment: {
            achievementLevel: "achieved",
            comments: "Successfully maintained zero production bugs throughout Q1",
            challengesFaced: "Required extra testing effort",
            nextSteps: "Continue this standard for Q2"
          },
          r1Validation: {
            agrees: true,
            comments: "Excellent achievement",
            evidenceReview: "Bug tracking data confirms zero production issues"
          },
          r2Validation: {
            finalApproval: true,
            comments: "Outstanding quality focus",
            impactAssessment: "Significantly improved product stability"
          }
        }
      ],
      selfAssessment: {
        rating: 7,
        comments: "Maintained high code quality standards with comprehensive testing",
        evidence: [
          { id: "ev-4", name: "test-coverage-report.html", size: "945 KB", type: "text/html", uploadedAt: "2025-01-13" }
        ]
      },
      r1Review: {
        rating: 8,
        comments: "Excellent attention to testing and quality",
        validation: "Above expectations",
        agrees: true
      },
      r2Review: {
        rating: 7,
        comments: "Good quality focus, continue the momentum",
        approval: "Approved",
        finalApproval: true
      }
    },
    {
      id: "kra-3",
      name: "Team Collaboration",
      description: "Effective collaboration and knowledge sharing",
      weightage: 20,
      category: "Behavioral",
      relatedGoals: [
        {
          id: "goal-3",
          title: "Knowledge Sharing Sessions",
          description: "Conduct 2 technical sessions for team",
          targetValue: "2 sessions",
          currentProgress: 100,
          status: "exceeded",
          evidence: [
            { id: "ev-5", name: "session-feedback.pdf", size: "1.2 MB", type: "application/pdf", uploadedAt: "2025-01-11" }
          ],
          selfAssessment: {
            achievementLevel: "exceeded",
            comments: "Conducted 3 sessions instead of 2, received excellent feedback",
            challengesFaced: "Scheduling conflicts with team",
            nextSteps: "Plan monthly sessions going forward"
          },
          r1Validation: {
            agrees: true,
            comments: "Great initiative, team benefited significantly",
            evidenceReview: "Feedback forms show high satisfaction"
          },
          r2Validation: {
            finalApproval: true,
            comments: "Exceeded expectations, valuable contribution",
            impactAssessment: "Improved team technical knowledge significantly"
          }
        }
      ],
      selfAssessment: {
        rating: 9,
        comments: "Actively collaborated and shared knowledge with the team",
        evidence: [
          { id: "ev-6", name: "collaboration-feedback.pdf", size: "678 KB", type: "application/pdf", uploadedAt: "2025-01-09" }
        ]
      },
      r1Review: {
        rating: 9,
        comments: "Outstanding collaboration and leadership",
        validation: "Exceeds expectations",
        agrees: true
      },
      r2Review: {
        rating: 8,
        comments: "Strong team player with leadership qualities",
        approval: "Approved with appreciation",
        finalApproval: true
      }
    },
    {
      id: "kra-4",
      name: "Customer Focus",
      description: "Understanding and addressing customer needs",
      weightage: 25,
      category: "Business",
      relatedGoals: [
        {
          id: "goal-4",
          title: "Customer Satisfaction",
          description: "Achieve 90% customer satisfaction rating",
          targetValue: "90%",
          currentProgress: 85,
          status: "in_progress",
          evidence: [
            { id: "ev-7", name: "customer-feedback.csv", size: "234 KB", type: "text/csv", uploadedAt: "2025-01-08" }
          ],
          selfAssessment: {
            achievementLevel: "partial",
            comments: "Currently at 85%, working on improvement initiatives",
            challengesFaced: "Some complex customer requirements",
            nextSteps: "Implement customer feedback improvements"
          },
          r1Validation: {
            agrees: true,
            comments: "Good progress, close to target",
            evidenceReview: "Customer feedback data is comprehensive"
          },
          r2Validation: {
            finalApproval: false,
            comments: "Need to reach target by quarter end",
            impactAssessment: "Critical for customer retention"
          }
        }
      ],
      selfAssessment: {
        rating: 7,
        comments: "Good customer focus with room for improvement",
        evidence: []
      },
      r1Review: {
        rating: 6,
        comments: "Customer focus is good but needs more proactive approach",
        validation: "Meets expectations",
        agrees: true
      },
      r2Review: {
        rating: 7,
        comments: "Satisfactory customer focus, continue improving",
        approval: "Approved with improvement plan",
        finalApproval: true
      }
    }
  ]
});

const ComprehensiveReviewMatrix: React.FC = () => {
  const [reviewData] = useState<ReviewData>(generateMockData());
  const [selectedEvidence, setSelectedEvidence] = useState<{ kra: string; files: EvidenceFile[] } | null>(null);
  const [editingCell, setEditingCell] = useState<{ kraId: string; type: 'self' | 'r1' | 'r2' } | null>(null);
  const [tempRating, setTempRating] = useState<number>(0);
  const [tempComments, setTempComments] = useState<string>('');

  // Calculate final scores
  const matrixData = useMemo((): MatrixRow[] => {
    return reviewData.kras.map(kra => {
      const selfScore = kra.selfAssessment.rating || 0;
      const r1Score = kra.r1Review.rating || 0;
      const r2Score = kra.r2Review.rating || 0;

      // Final score calculation: Self 20% + R1 40% + R2 40%
      const finalScore = (selfScore * 0.2 + r1Score * 0.4 + r2Score * 0.4) * (kra.weightage / 100);

      return {
        kra,
        selfReview: {
          rating: selfScore,
          comments: kra.selfAssessment.comments,
          status: selfScore > 0 ? 'submitted' : 'draft',
          canEdit: reviewData.currentStage === 'self'
        },
        r1Review: {
          rating: r1Score,
          comments: kra.r1Review.comments,
          status: r1Score > 0 ? 'submitted' : 'pending',
          canEdit: reviewData.currentStage === 'r1'
        },
        r2Review: {
          rating: r2Score,
          comments: kra.r2Review.comments,
          status: r2Score > 0 ? 'submitted' : 'pending',
          canEdit: reviewData.currentStage === 'r2'
        },
        finalScore,
        evidenceCount: kra.selfAssessment.evidence?.length || 0,
        attachmentCount: kra.relatedGoals.reduce((acc, goal) => acc + (goal.evidence?.length || 0), 0)
      };
    });
  }, [reviewData]);

  const overallScore = useMemo(() => {
    return matrixData.reduce((sum, row) => sum + row.finalScore, 0);
  }, [matrixData]);

  const performanceZone = useMemo(() => {
    if (overallScore >= 8) return { label: 'GREEN', color: 'bg-green-500', textColor: 'text-green-700' };
    if (overallScore >= 5) return { label: 'YELLOW', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    return { label: 'RED', color: 'bg-red-500', textColor: 'text-red-700' };
  }, [overallScore]);

  const handleEditCell = useCallback((kraId: string, type: 'self' | 'r1' | 'r2') => {
    const row = matrixData.find(r => r.kra.id === kraId);
    if (!row) return;

    const cellData = row[`${type}Review`];
    if (!cellData.canEdit) return;

    setEditingCell({ kraId, type });
    setTempRating(cellData.rating);
    setTempComments(cellData.comments);
  }, [matrixData]);

  const handleSaveCell = useCallback(() => {
    // In a real implementation, this would save to the backend
    console.log('Saving cell:', { editingCell, rating: tempRating, comments: tempComments });
    setEditingCell(null);
  }, [editingCell, tempRating, tempComments]);

  const handleCancelEdit = useCallback(() => {
    setEditingCell(null);
    setTempRating(0);
    setTempComments('');
  }, []);

  const getRatingColor = (rating: number): string => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 5) return 'text-yellow-600';
    if (rating > 0) return 'text-red-600';
    return 'text-gray-400';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const renderRatingCell = (row: MatrixRow, type: 'self' | 'r1' | 'r2') => {
    const cellData = row[`${type}Review`];
    const isEditing = editingCell?.kraId === row.kra.id && editingCell?.type === type;

    if (isEditing) {
      return (
        <div className="space-y-2 p-2 bg-blue-50 rounded">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min="1"
              max="10"
              value={tempRating}
              onChange={(e) => setTempRating(Number(e.target.value))}
              className="w-16"
            />
            <Button size="sm" onClick={handleSaveCell} className="px-2">
              <Save className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancelEdit} className="px-2">
              <X className="h-3 w-3" />
            </Button>
          </div>
          <Textarea
            value={tempComments}
            onChange={(e) => setTempComments(e.target.value)}
            placeholder="Add comments..."
            className="min-h-20 text-xs"
          />
        </div>
      );
    }

    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className={`text-lg font-semibold ${getRatingColor(cellData.rating)}`}>
            {cellData.rating > 0 ? cellData.rating : '—'}
          </span>
          <div className="flex items-center space-x-1">
            {getStatusIcon(cellData.status)}
            {cellData.canEdit ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => handleEditCell(row.kra.id, type)}
              >
                <Edit className="h-3 w-3" />
              </Button>
            ) : (
              <Lock className="h-3 w-3 text-gray-400" />
            )}
          </div>
        </div>
        {cellData.comments && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs text-gray-600 truncate cursor-pointer">
                  {cellData.comments.length > 50
                    ? `${cellData.comments.substring(0, 50)}...`
                    : cellData.comments}
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p className="whitespace-pre-wrap">{cellData.comments}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {reviewData.reviewCycle} Performance Review Matrix
              </CardTitle>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{reviewData.employeeName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building2 className="h-4 w-4" />
                  <span>Sales Department</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{reviewData.reviewPeriod.startDate} to {reviewData.reviewPeriod.endDate}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Current Stage</div>
              <Badge variant="outline" className="mt-1">
                {reviewData.currentStage.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Matrix Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-80 sticky left-0 bg-gray-50 z-10">
                    <div className="font-semibold">KRA Details</div>
                    <div className="text-xs text-gray-500 mt-1">Name • Weight • Category</div>
                  </TableHead>
                  <TableHead className="w-60">
                    <div className="font-semibold">Goals & Progress</div>
                    <div className="text-xs text-gray-500 mt-1">Status • Evidence</div>
                  </TableHead>
                  <TableHead className="w-48 text-center">
                    <div className="font-semibold">Self Assessment</div>
                    <div className="text-xs text-gray-500 mt-1">Rating • Comments</div>
                  </TableHead>
                  <TableHead className="w-48 text-center">
                    <div className="font-semibold">R1 Review</div>
                    <div className="text-xs text-gray-500 mt-1">Team Lead Rating</div>
                  </TableHead>
                  <TableHead className="w-48 text-center">
                    <div className="font-semibold">R2 Review</div>
                    <div className="text-xs text-gray-500 mt-1">Manager Rating</div>
                  </TableHead>
                  <TableHead className="w-32 text-center">
                    <div className="font-semibold">Final Score</div>
                    <div className="text-xs text-gray-500 mt-1">Weighted</div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matrixData.map((row, index) => (
                  <TableRow key={row.kra.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {/* KRA Details Column */}
                    <TableCell className="sticky left-0 bg-inherit z-10 border-r">
                      <div className="space-y-2">
                        <div>
                          <div className="font-semibold text-gray-900">{row.kra.name}</div>
                          <div className="text-xs text-gray-600 flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {row.kra.weightage}%
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {row.kra.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs px-2 h-7"
                                onClick={() => setSelectedEvidence({
                                  kra: row.kra.id,
                                  files: row.kra.selfAssessment.evidence || []
                                })}
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                Evidence
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Evidence Files - {row.kra.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-2">
                                {(selectedEvidence?.files || []).map((file) => (
                                  <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div className="flex items-center space-x-2">
                                      <FileText className="h-4 w-4" />
                                      <div>
                                        <div className="text-sm font-medium">{file.name}</div>
                                        <div className="text-xs text-gray-500">{file.size} • {file.uploadedAt}</div>
                                      </div>
                                    </div>
                                    <div className="flex space-x-1">
                                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                        <Download className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                <Button size="sm" className="w-full">
                                  <Upload className="h-3 w-3 mr-1" />
                                  Upload New File
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" variant="outline" className="text-xs px-2 h-7">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Comments
                          </Button>

                          <Button size="sm" variant="outline" className="text-xs px-2 h-7">
                            <Paperclip className="h-3 w-3 mr-1" />
                            Files ({row.evidenceCount + row.attachmentCount})
                          </Button>
                        </div>
                      </div>
                    </TableCell>

                    {/* Goals & Progress Column */}
                    <TableCell>
                      <div className="space-y-2">
                        {row.kra.relatedGoals.map((goal) => (
                          <div key={goal.id} className="bg-gray-50 p-2 rounded text-xs">
                            <div className="font-medium text-gray-900 mb-1">{goal.title}</div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <Progress value={goal.currentProgress} className="flex-1 h-2 mr-2" />
                                <span className="text-xs font-medium">{goal.currentProgress}%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant={goal.status === 'achieved' || goal.status === 'exceeded' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {goal.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                                {goal.evidence.length > 0 && (
                                  <div className="flex items-center text-green-600">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    <span className="text-xs">Evidence ✓</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>

                    {/* Self Assessment */}
                    <TableCell className="text-center">
                      {renderRatingCell(row, 'self')}
                    </TableCell>

                    {/* R1 Review */}
                    <TableCell className="text-center">
                      {renderRatingCell(row, 'r1')}
                    </TableCell>

                    {/* R2 Review */}
                    <TableCell className="text-center">
                      {renderRatingCell(row, 'r2')}
                    </TableCell>

                    {/* Final Score */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className={`text-lg font-bold ${getRatingColor(row.finalScore)}`}>
                          {row.finalScore.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {row.kra.weightage}% weight
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{overallScore.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
            <div className="text-center">
              <Badge className={`${performanceZone.color} text-white text-lg px-4 py-2`}>
                {performanceZone.label} ZONE
              </Badge>
              <div className="text-sm text-gray-600 mt-1">Performance Zone</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {reviewData.overallStatus.toUpperCase()}
              </div>
              <div className="text-sm text-gray-600">Review Status</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Label htmlFor="overall-comments" className="text-sm font-medium">
              Overall Comments & Development Areas
            </Label>
            <Textarea
              id="overall-comments"
              placeholder="Add overall performance comments, development areas, and action plans..."
              className="mt-2 min-h-20"
            />
          </div>

          <div className="flex justify-between mt-6">
            <div className="flex space-x-2">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline">
                Print Review
              </Button>
            </div>
            <div className="flex space-x-2">
              {reviewData.currentStage === 'self' && (
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Submit for R1 Review
                </Button>
              )}
              {reviewData.currentStage === 'r1' && (
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Submit for R2 Review
                </Button>
              )}
              {reviewData.currentStage === 'r2' && (
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve & Submit
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ComprehensiveReviewMatrix };
export default ComprehensiveReviewMatrix;