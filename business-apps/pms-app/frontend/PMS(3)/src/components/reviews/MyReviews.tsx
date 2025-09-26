import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Target,
  Award,
  Star,
  Eye,
  Edit,
  Send,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Activity
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
  department: string;
  domain: string;
  project?: string;
  manager?: string;
  avatar?: string;
}

interface MyReviewsProps {
  user: User;
}

interface ReviewItem {
  id: string;
  title: string;
  type: 'Self-Assessment' | 'Manager-Review' | 'Peer-Review' | 'Goal-Review';
  cycle: string;
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Completed' | 'Overdue';
  dueDate: Date;
  progress: number;
  reviewer?: string;
  kraScore?: number;
  goalScore?: number;
  overallScore?: number;
}

interface PerformanceSummary {
  currentScore: number;
  previousScore: number;
  trend: 'up' | 'down' | 'stable';
  kraProgress: number;
  goalProgress: number;
  competencyProgress: number;
  lastReviewDate: Date;
}

const mockReviews: ReviewItem[] = [
  {
    id: 'review-1',
    title: 'Annual Performance Review 2024',
    type: 'Self-Assessment',
    cycle: 'Annual 2024',
    status: 'In Progress',
    dueDate: new Date('2024-03-15'),
    progress: 65,
    kraScore: 4.2,
    goalScore: 4.0
  },
  {
    id: 'review-2',
    title: 'Q1 Goal Review 2024',
    type: 'Goal-Review',
    cycle: 'Q1 2024',
    status: 'Completed',
    dueDate: new Date('2024-01-31'),
    progress: 100,
    reviewer: 'Michael Chen',
    kraScore: 4.1,
    goalScore: 4.3,
    overallScore: 4.2
  },
  {
    id: 'review-3',
    title: 'Manager Review - Michael Chen',
    type: 'Manager-Review',
    cycle: 'Annual 2024',
    status: 'Submitted',
    dueDate: new Date('2024-03-20'),
    progress: 100,
    reviewer: 'Michael Chen'
  }
];

const mockPerformanceSummary: PerformanceSummary = {
  currentScore: 4.2,
  previousScore: 3.9,
  trend: 'up',
  kraProgress: 75,
  goalProgress: 85,
  competencyProgress: 70,
  lastReviewDate: new Date('2024-01-31')
};

export function MyReviews({ user }: MyReviewsProps) {
  const [activeTab, setActiveTab] = useState('current');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Self-Assessment': return 'bg-blue-100 text-blue-800';
      case 'Manager-Review': return 'bg-purple-100 text-purple-800';
      case 'Peer-Review': return 'bg-green-100 text-green-800';
      case 'Goal-Review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Submitted': return <Send className="w-4 h-4" />;
      case 'In Progress': return <Edit className="w-4 h-4" />;
      case 'Overdue': return <AlertCircle className="w-4 h-4" />;
      case 'Not Started': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-google-gray-900">My Reviews</h1>
          <p className="text-google-gray-600 mt-1">Track and complete your performance reviews</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Reports
          </Button>
          <Button className="gap-2 google-button-primary">
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Performance Summary */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary-muted flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-google-gray-600 mb-1">Current Score</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-bold text-google-gray-900">{mockPerformanceSummary.currentScore}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">
                    +{(mockPerformanceSummary.currentScore - mockPerformanceSummary.previousScore).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-success-muted flex items-center justify-center">
                <Target className="w-8 h-8 text-success" />
              </div>
              <p className="text-sm text-google-gray-600 mb-1">KRA Progress</p>
              <p className="text-2xl font-bold text-google-gray-900">{mockPerformanceSummary.kraProgress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${mockPerformanceSummary.kraProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-warning-muted flex items-center justify-center">
                <Award className="w-8 h-8 text-warning" />
              </div>
              <p className="text-sm text-google-gray-600 mb-1">Goal Progress</p>
              <p className="text-2xl font-bold text-google-gray-900">{mockPerformanceSummary.goalProgress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${mockPerformanceSummary.goalProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-destructive-muted flex items-center justify-center">
                <Star className="w-8 h-8 text-destructive" />
              </div>
              <p className="text-sm text-google-gray-600 mb-1">Competencies</p>
              <p className="text-2xl font-bold text-google-gray-900">{mockPerformanceSummary.competencyProgress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${mockPerformanceSummary.competencyProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current" className="gap-2">
            <Activity className="w-4 h-4" />
            Current Reviews
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <FileText className="w-4 h-4" />
            Review History
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        {/* Current Reviews Tab */}
        <TabsContent value="current" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Active Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReviews.filter(review => 
                  review.status === 'In Progress' || review.status === 'Not Started' || review.status === 'Overdue'
                ).map((review) => (
                  <div key={review.id} className="border border-google-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{review.title}</h3>
                          <Badge className={getStatusColor(review.status)}>
                            {getStatusIcon(review.status)}
                            <span className="ml-1">{review.status}</span>
                          </Badge>
                          <Badge className={getTypeColor(review.type)}>{review.type}</Badge>
                        </div>
                        <p className="text-sm text-google-gray-600 mb-3">{review.cycle}</p>
                        
                        {/* Due date and urgency */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-google-gray-500" />
                            <span className="text-google-gray-600">
                              Due: {review.dueDate.toLocaleDateString()}
                            </span>
                          </div>
                          <div className={`flex items-center gap-2 ${
                            getDaysUntilDue(review.dueDate) < 0 ? 'text-red-600' : 
                            getDaysUntilDue(review.dueDate) <= 3 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            <Clock className="w-4 h-4" />
                            <span>
                              {getDaysUntilDue(review.dueDate) < 0 
                                ? `${Math.abs(getDaysUntilDue(review.dueDate))} days overdue`
                                : getDaysUntilDue(review.dueDate) === 0 
                                ? 'Due today'
                                : `${getDaysUntilDue(review.dueDate)} days remaining`
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="google-button-primary">
                          {review.status === 'Not Started' ? 'Start Review' : 'Continue'}
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-google-gray-600">Progress</span>
                        <span className="text-sm font-medium">{review.progress}%</span>
                      </div>
                      <div className="w-full bg-google-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${review.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Scores if available */}
                    {(review.kraScore || review.goalScore) && (
                      <div className="flex gap-4 mt-4 pt-4 border-t border-google-gray-200">
                        {review.kraScore && (
                          <div className="text-center">
                            <p className="text-sm text-google-gray-600">KRA Score</p>
                            <p className="text-lg font-bold text-blue-600">{review.kraScore}</p>
                          </div>
                        )}
                        {review.goalScore && (
                          <div className="text-center">
                            <p className="text-sm text-google-gray-600">Goal Score</p>
                            <p className="text-lg font-bold text-green-600">{review.goalScore}</p>
                          </div>
                        )}
                        {review.overallScore && (
                          <div className="text-center">
                            <p className="text-sm text-google-gray-600">Overall</p>
                            <p className="text-lg font-bold text-purple-600">{review.overallScore}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Review History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Completed Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReviews.filter(review => 
                  review.status === 'Completed' || review.status === 'Submitted'
                ).map((review) => (
                  <div key={review.id} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{review.title}</h3>
                          <Badge className={getStatusColor(review.status)}>
                            {getStatusIcon(review.status)}
                            <span className="ml-1">{review.status}</span>
                          </Badge>
                          <Badge className={getTypeColor(review.type)}>{review.type}</Badge>
                        </div>
                        <p className="text-sm text-google-gray-600 mb-2">{review.cycle}</p>
                        {review.reviewer && (
                          <p className="text-sm text-google-gray-500">Reviewed by: {review.reviewer}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>

                    {/* Final Scores */}
                    {review.overallScore && (
                      <div className="flex gap-6 mt-4 pt-4 border-t border-google-gray-200">
                        <div className="text-center">
                          <p className="text-sm text-google-gray-600">KRA Score</p>
                          <p className="text-xl font-bold text-blue-600">{review.kraScore}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-google-gray-600">Goal Score</p>
                          <p className="text-xl font-bold text-green-600">{review.goalScore}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-google-gray-600">Overall Score</p>
                          <p className="text-xl font-bold text-purple-600">{review.overallScore}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Feedback & Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-google-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-google-gray-900 mb-3">Recent Feedback</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-900">Excellent technical skills</p>
                        <p className="text-xs text-green-700">From: Michael Chen • Q1 2024</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">Strong team collaboration</p>
                        <p className="text-xs text-blue-700">From: Jessica Wong • Q1 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-google-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-google-gray-900 mb-3">Development Goals</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Leadership Skills</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Public Speaking</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}