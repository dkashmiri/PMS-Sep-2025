import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar
} from 'recharts';
import {
  TrendingUp, TrendingDown, Target, Award, Calendar, CheckCircle, Clock, Star,
  BarChart3, Activity, Zap, Trophy, Bell, AlertTriangle, Download,
  BookOpen, MessageCircle, FileText, ArrowRight, Plus
} from 'lucide-react';
import { User } from '../../types/auth.types';

interface PersonalDashboardProps {
  user: User;
}

interface PersonalStats {
  overallScore: number;
  performanceZone: 'GREEN' | 'YELLOW' | 'RED';
  goalsCompleted: number;
  totalGoals: number;
  pendingReviews: number;
  achievementStreak: number;
  nextReviewDue: string;
}

interface GoalProgress {
  id: string;
  name: string;
  progress: number;
  status: 'ahead' | 'on-track' | 'behind' | 'at-risk';
  due: string;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface PendingAction {
  id: string;
  type: 'review' | 'goal_update' | 'feedback' | 'training';
  title: string;
  description: string;
  dueDate: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export function PersonalDashboard({ user }: PersonalDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'quarter' | 'year'>('quarter');

  // Mock data for personal dashboard
  const personalStats: PersonalStats = {
    overallScore: 4.2,
    performanceZone: 'GREEN',
    goalsCompleted: 8,
    totalGoals: 12,
    pendingReviews: 2,
    achievementStreak: 15,
    nextReviewDue: '2025-02-15'
  };

  const goalProgress: GoalProgress[] = [
    {
      id: '1', name: 'Q1 Revenue Growth', progress: 85, status: 'on-track',
      due: '2025-03-31', category: 'Financial', priority: 'HIGH'
    },
    {
      id: '2', name: 'Team Leadership Skills', progress: 92, status: 'ahead',
      due: '2025-02-28', category: 'Leadership', priority: 'MEDIUM'
    },
    {
      id: '3', name: 'Customer Satisfaction Score', progress: 67, status: 'behind',
      due: '2025-04-15', category: 'Customer', priority: 'HIGH'
    },
    {
      id: '4', name: 'Process Innovation', progress: 78, status: 'on-track',
      due: '2025-03-15', category: 'Innovation', priority: 'MEDIUM'
    },
    {
      id: '5', name: 'Technical Certification', progress: 45, status: 'at-risk',
      due: '2025-02-20', category: 'Skills', priority: 'LOW'
    }
  ];

  const performanceTrend = [
    { period: 'Q2 2024', score: 3.8, goals: 85, zone: 'YELLOW' },
    { period: 'Q3 2024', score: 4.0, goals: 88, zone: 'GREEN' },
    { period: 'Q4 2024', score: 4.1, goals: 92, zone: 'GREEN' },
    { period: 'Q1 2025', score: 4.2, goals: 87, zone: 'GREEN' }
  ];

  const recentFeedback = [
    {
      id: '1',
      reviewer: 'Sarah Johnson',
      role: 'Manager',
      feedback: 'Excellent leadership in the Q4 project delivery. Keep up the great work!',
      rating: 5,
      date: '2025-01-15'
    },
    {
      id: '2',
      reviewer: 'Mike Chen',
      role: 'Peer',
      feedback: 'Great collaboration on the customer analytics project.',
      rating: 4,
      date: '2025-01-10'
    },
    {
      id: '3',
      reviewer: 'Alex Turner',
      role: 'Direct Report',
      feedback: 'Provides clear guidance and is always available for support.',
      rating: 5,
      date: '2025-01-08'
    }
  ];

  const pendingActions: PendingAction[] = [
    {
      id: '1',
      type: 'review',
      title: 'Self Assessment Due',
      description: 'Complete Q1 2025 self-assessment review',
      dueDate: '2025-02-01',
      priority: 'HIGH'
    },
    {
      id: '2',
      type: 'goal_update',
      title: 'Goal Progress Update',
      description: 'Update progress on Customer Satisfaction goal',
      dueDate: '2025-01-30',
      priority: 'MEDIUM'
    },
    {
      id: '3',
      type: 'feedback',
      title: 'Team Feedback Pending',
      description: 'Provide feedback for 3 team members',
      dueDate: '2025-02-05',
      priority: 'MEDIUM'
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Goal Achieved!',
      message: 'You have successfully completed the Team Leadership Skills goal.',
      timestamp: '2 hours ago',
      isRead: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Review Reminder',
      message: 'Your self-assessment is due in 3 days.',
      timestamp: '1 day ago',
      isRead: false
    },
    {
      id: '3',
      type: 'info',
      title: 'New Development Opportunity',
      message: 'Advanced Analytics course is now available.',
      timestamp: '2 days ago',
      isRead: true
    }
  ];

  const skillsRadarData = [
    { skill: 'Technical', current: 85, target: 90, fullMark: 100 },
    { skill: 'Leadership', current: 78, target: 85, fullMark: 100 },
    { skill: 'Communication', current: 92, target: 95, fullMark: 100 },
    { skill: 'Problem Solving', current: 88, target: 90, fullMark: 100 },
    { skill: 'Innovation', current: 75, target: 85, fullMark: 100 },
    { skill: 'Collaboration', current: 90, target: 95, fullMark: 100 }
  ];

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'GREEN': return 'bg-green-100 text-green-800 border-green-200';
      case 'YELLOW': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'RED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'bg-green-100 text-green-800';
      case 'on-track': return 'bg-blue-100 text-blue-800';
      case 'behind': return 'bg-orange-100 text-orange-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'info': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const exportDashboard = () => {
    // Implementation for exporting dashboard data
    console.log('Exporting dashboard data...');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your performance overview for this quarter
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportDashboard}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Set New Goal
          </Button>
        </div>
      </div>

      {/* Performance Zone Alert */}
      {personalStats.performanceZone !== 'GREEN' && (
        <Alert className="border-l-4 border-l-orange-500 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Your current performance zone is <strong>{personalStats.performanceZone}</strong>.
            Consider focusing on your at-risk goals to improve your overall score.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Performance Score</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {personalStats.overallScore}
                  </span>
                  <Badge className={`text-xs ${getZoneColor(personalStats.performanceZone)}`}>
                    {personalStats.performanceZone}
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Goals Progress</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {personalStats.goalsCompleted}/{personalStats.totalGoals}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {Math.round((personalStats.goalsCompleted / personalStats.totalGoals) * 100)}%
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Achievement Streak</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {personalStats.achievementStreak}
                  </span>
                  <span className="text-sm text-gray-500">days</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Actions</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {pendingActions.length}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    Due Soon
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="development">Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Trend Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceTrend}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="period" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorScore)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skills Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Skills Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={skillsRadarData}>
                    <RadialBar dataKey="current" cornerRadius={10} fill="#3B82F6" />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  Recent Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{feedback.reviewer}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{feedback.feedback}</p>
                    <p className="text-gray-500 text-xs mt-2">{feedback.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
                    } ${
                      notification.type === 'success' ? 'border-l-green-500' :
                      notification.type === 'warning' ? 'border-l-orange-500' :
                      notification.type === 'info' ? 'border-l-blue-500' :
                      'border-l-red-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {/* Goals Progress Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Current Goals Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {goalProgress.map((goal) => (
                <div key={goal.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{goal.name}</h3>
                      <p className="text-sm text-gray-500">{goal.category} • Due: {goal.due}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
                        {goal.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={goal.progress} className="flex-1" />
                    <span className="text-sm font-medium text-gray-900 w-12">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          {/* Extended Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                Feedback History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-medium text-gray-900">{feedback.reviewer}</span>
                        <span className="text-gray-500 text-sm ml-2">({feedback.role})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < feedback.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{feedback.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{feedback.feedback}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-6">
          {/* Development Opportunities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Development Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-medium text-indigo-900">Advanced Analytics Certification</h3>
                  <p className="text-sm text-indigo-700 mt-1">Enhance your data analysis skills with this comprehensive course.</p>
                  <Button size="sm" className="mt-3">
                    Enroll Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900">Leadership Mentoring Program</h3>
                  <p className="text-sm text-green-700 mt-1">Develop leadership skills through one-on-one mentoring.</p>
                  <Button size="sm" variant="outline" className="mt-3">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Goal Achiever</h4>
                    <p className="text-sm text-yellow-700">Completed Team Leadership Skills goal ahead of schedule</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Star className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-900">Top Performer</h4>
                    <p className="text-sm text-green-700">Ranked in top 10% for Q4 2024 performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Pending Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingActions.map((action) => (
              <div key={action.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs ${getPriorityColor(action.priority)}`}>
                    {action.priority}
                  </Badge>
                  <span className="text-xs text-gray-500">Due: {action.dueDate}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  Take Action <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}