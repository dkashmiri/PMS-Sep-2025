import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, ComposedChart, ScatterChart, Scatter,
  TreeMap, FunnelChart, Funnel, LabelList
} from 'recharts';
import {
  Building2, Users, TrendingUp, TrendingDown, Target, AlertTriangle,
  Award, BarChart3, PieChart as PieChartIcon, Activity, Clock,
  Filter, Download, Settings, AlertCircle, CheckCircle, XCircle,
  Calendar, MessageSquare, BookOpen, Globe, Zap, Star
} from 'lucide-react';
import { User } from '../../types/auth.types';

interface OrganizationDashboardProps {
  user: User;
}

interface OrgStats {
  totalEmployees: number;
  activeEmployees: number;
  totalDepartments: number;
  overallPerformanceScore: number;
  reviewCompletionRate: number;
  goalAchievementRate: number;
  pendingReviews: number;
  overDueGoals: number;
}

interface DepartmentMetrics {
  id: string;
  name: string;
  employeeCount: number;
  avgPerformanceScore: number;
  goalCompletionRate: number;
  reviewCompletionRate: number;
  performanceZoneDistribution: {
    GREEN: number;
    YELLOW: number;
    RED: number;
  };
  needsAttention: boolean;
}

interface SystemActivity {
  id: string;
  type: 'review_submitted' | 'goal_created' | 'goal_completed' | 'feedback_given' | 'user_login';
  description: string;
  user: string;
  department: string;
  timestamp: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface PerformanceTrendData {
  period: string;
  avgScore: number;
  goalCompletion: number;
  reviewCompletion: number;
  employeeCount: number;
}

export function OrganizationDashboard({ user }: OrganizationDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  // Mock data for organization dashboard
  const orgStats: OrgStats = {
    totalEmployees: 245,
    activeEmployees: 238,
    totalDepartments: 8,
    overallPerformanceScore: 4.1,
    reviewCompletionRate: 87,
    goalAchievementRate: 78,
    pendingReviews: 23,
    overDueGoals: 15
  };

  const departmentMetrics: DepartmentMetrics[] = [
    {
      id: '1', name: 'Engineering', employeeCount: 65, avgPerformanceScore: 4.2,
      goalCompletionRate: 82, reviewCompletionRate: 90,
      performanceZoneDistribution: { GREEN: 45, YELLOW: 15, RED: 5 },
      needsAttention: false
    },
    {
      id: '2', name: 'Product', employeeCount: 25, avgPerformanceScore: 4.3,
      goalCompletionRate: 85, reviewCompletionRate: 95,
      performanceZoneDistribution: { GREEN: 20, YELLOW: 4, RED: 1 },
      needsAttention: false
    },
    {
      id: '3', name: 'Sales', employeeCount: 45, avgPerformanceScore: 4.4,
      goalCompletionRate: 88, reviewCompletionRate: 85,
      performanceZoneDistribution: { GREEN: 35, YELLOW: 8, RED: 2 },
      needsAttention: false
    },
    {
      id: '4', name: 'Marketing', employeeCount: 30, avgPerformanceScore: 4.0,
      goalCompletionRate: 75, reviewCompletionRate: 80,
      performanceZoneDistribution: { GREEN: 18, YELLOW: 9, RED: 3 },
      needsAttention: true
    },
    {
      id: '5', name: 'Design', employeeCount: 18, avgPerformanceScore: 3.9,
      goalCompletionRate: 70, reviewCompletionRate: 88,
      performanceZoneDistribution: { GREEN: 10, YELLOW: 6, RED: 2 },
      needsAttention: true
    },
    {
      id: '6', name: 'HR', employeeCount: 15, avgPerformanceScore: 4.1,
      goalCompletionRate: 80, reviewCompletionRate: 100,
      performanceZoneDistribution: { GREEN: 12, YELLOW: 3, RED: 0 },
      needsAttention: false
    },
    {
      id: '7', name: 'Finance', employeeCount: 22, avgPerformanceScore: 4.2,
      goalCompletionRate: 85, reviewCompletionRate: 95,
      performanceZoneDistribution: { GREEN: 18, YELLOW: 3, RED: 1 },
      needsAttention: false
    },
    {
      id: '8', name: 'Operations', employeeCount: 25, avgPerformanceScore: 3.8,
      goalCompletionRate: 68, reviewCompletionRate: 75,
      performanceZoneDistribution: { GREEN: 12, YELLOW: 10, RED: 3 },
      needsAttention: true
    }
  ];

  const organizationTrend: PerformanceTrendData[] = [
    { period: 'Q1 2024', avgScore: 3.9, goalCompletion: 72, reviewCompletion: 80, employeeCount: 220 },
    { period: 'Q2 2024', avgScore: 4.0, goalCompletion: 75, reviewCompletion: 83, employeeCount: 230 },
    { period: 'Q3 2024', avgScore: 4.05, goalCompletion: 78, reviewCompletion: 85, employeeCount: 235 },
    { period: 'Q4 2024', avgScore: 4.08, goalCompletion: 80, reviewCompletion: 87, employeeCount: 240 },
    { period: 'Q1 2025', avgScore: 4.1, goalCompletion: 78, reviewCompletion: 87, employeeCount: 245 }
  ];

  const performanceZoneDistribution = [
    { zone: 'GREEN', count: 170, percentage: 69, color: '#10B981' },
    { zone: 'YELLOW', count: 58, percentage: 24, color: '#F59E0B' },
    { zone: 'RED', count: 17, percentage: 7, color: '#EF4444' }
  ];

  const goalCategoryAnalysis = [
    { category: 'Technical Skills', totalGoals: 180, completed: 145, avgRating: 4.2, departments: 8 },
    { category: 'Leadership', totalGoals: 95, completed: 78, avgRating: 3.9, departments: 6 },
    { category: 'Customer Focus', totalGoals: 120, completed: 98, avgRating: 4.1, departments: 5 },
    { category: 'Innovation', totalGoals: 75, completed: 55, avgRating: 3.8, departments: 4 },
    { category: 'Collaboration', totalGoals: 200, completed: 175, avgRating: 4.3, departments: 8 },
    { category: 'Process Improvement', totalGoals: 85, completed: 62, avgRating: 4.0, departments: 6 }
  ];

  const systemActivities: SystemActivity[] = [
    {
      id: '1', type: 'review_submitted', description: 'Q1 Performance Review submitted',
      user: 'Sarah Johnson', department: 'Engineering', timestamp: '2 hours ago', priority: 'MEDIUM'
    },
    {
      id: '2', type: 'goal_completed', description: 'Customer Satisfaction goal completed',
      user: 'Mike Chen', department: 'Product', timestamp: '4 hours ago', priority: 'HIGH'
    },
    {
      id: '3', type: 'goal_created', description: 'New leadership development goal created',
      user: 'Emily Davis', department: 'Design', timestamp: '6 hours ago', priority: 'LOW'
    },
    {
      id: '4', type: 'feedback_given', description: '360 feedback provided for team member',
      user: 'Alex Turner', department: 'Engineering', timestamp: '8 hours ago', priority: 'MEDIUM'
    },
    {
      id: '5', type: 'review_submitted', description: 'Manager review submitted',
      user: 'Lisa Wang', department: 'Marketing', timestamp: '1 day ago', priority: 'MEDIUM'
    }
  ];

  const departmentComparison = departmentMetrics.map(dept => ({
    department: dept.name,
    score: dept.avgPerformanceScore,
    goals: dept.goalCompletionRate,
    reviews: dept.reviewCompletionRate,
    employees: dept.employeeCount
  }));

  const reviewCompletionFunnel = [
    { stage: 'Self Review', completed: 210, total: 245, percentage: 86 },
    { stage: 'Manager Review', completed: 180, total: 210, percentage: 86 },
    { stage: 'HR Review', completed: 165, total: 180, percentage: 92 },
    { stage: 'Final Calibration', completed: 150, total: 165, percentage: 91 },
    { stage: 'Completed', completed: 150, total: 150, percentage: 100 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'review_submitted': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'goal_created': return <Target className="w-4 h-4 text-blue-600" />;
      case 'goal_completed': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'feedback_given': return <MessageSquare className="w-4 h-4 text-purple-600" />;
      case 'user_login': return <Globe className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4" />;
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

  const departmentsNeedingAttention = departmentMetrics.filter(dept => dept.needsAttention);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of organization-wide performance and metrics • {orgStats.totalEmployees} employees across {orgStats.totalDepartments} departments
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedTimeframe} onValueChange={(value: any) => setSelectedTimeframe(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => console.log('Export organization report')}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {(departmentsNeedingAttention.length > 0 || orgStats.pendingReviews > 20) && (
        <Alert className="border-l-4 border-l-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Attention Required:</strong>{' '}
            {departmentsNeedingAttention.length > 0 &&
              `${departmentsNeedingAttention.length} departments need immediate attention. `
            }
            {orgStats.pendingReviews > 20 &&
              `${orgStats.pendingReviews} reviews are pending completion.`
            }
          </AlertDescription>
        </Alert>
      )}

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Org Performance Score</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {orgStats.overallPerformanceScore}
                  </span>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Goal Achievement</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {orgStats.goalAchievementRate}%
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Organization wide
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
                <p className="text-sm text-gray-600">Active Employees</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {orgStats.activeEmployees}
                  </span>
                  <span className="text-sm text-gray-500">
                    /{orgStats.totalEmployees}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Review Completion</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {orgStats.reviewCompletionRate}%
                  </span>
                  <Badge
                    variant={orgStats.pendingReviews > 20 ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {orgStats.pendingReviews} pending
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

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Distribution and Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-purple-600" />
                  Organization Performance Zones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={performanceZoneDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {performanceZoneDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {performanceZoneDistribution.map((zone) => (
                    <div key={zone.zone} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: zone.color }}
                        />
                        <span className="text-sm text-gray-900">{zone.zone} Zone</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {zone.count} employees ({zone.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Organization Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={organizationTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="period" stroke="#6B7280" />
                    <YAxis yAxisId="left" stroke="#6B7280" />
                    <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="avgScore"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Avg Score"
                    />
                    <Bar yAxisId="right" dataKey="goalCompletion" fill="#10B981" name="Goal Completion %" />
                    <Line yAxisId="right" type="monotone" dataKey="reviewCompletion" stroke="#F59E0B" strokeWidth={3} name="Review Completion %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Department Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Department Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="department" stroke="#6B7280" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="score" fill="#6366F1" name="Performance Score" />
                  <Bar dataKey="goals" fill="#10B981" name="Goal Completion %" />
                  <Bar dataKey="reviews" fill="#F59E0B" name="Review Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          {/* Department Filter */}
          <div className="flex items-center gap-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departmentMetrics.map(dept => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentMetrics
              .filter(dept => selectedDepartment === 'all' || dept.id === selectedDepartment)
              .map((department) => (
              <Card
                key={department.id}
                className={`${department.needsAttention ? 'border-l-4 border-l-red-500' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{department.name}</h3>
                      <p className="text-sm text-gray-600">{department.employeeCount} employees</p>
                    </div>
                    {department.needsAttention && (
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg Performance</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{department.avgPerformanceScore}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(department.avgPerformanceScore)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Goal Completion</span>
                        <span className="text-sm font-medium">{department.goalCompletionRate}%</span>
                      </div>
                      <Progress value={department.goalCompletionRate} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Review Completion</span>
                        <span className="text-sm font-medium">{department.reviewCompletionRate}%</span>
                      </div>
                      <Progress value={department.reviewCompletionRate} className="h-2" />
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-gray-500 mb-2">Performance Distribution</p>
                      <div className="flex gap-2">
                        <Badge className="text-xs bg-green-100 text-green-800">
                          GREEN: {department.performanceZoneDistribution.GREEN}
                        </Badge>
                        <Badge className="text-xs bg-yellow-100 text-yellow-800">
                          YELLOW: {department.performanceZoneDistribution.YELLOW}
                        </Badge>
                        <Badge className="text-xs bg-red-100 text-red-800">
                          RED: {department.performanceZoneDistribution.RED}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Performance Score Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="department" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Bar dataKey="score" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Employee Count vs Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={departmentComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="employees" stroke="#6B7280" name="Employees" />
                    <YAxis dataKey="score" stroke="#6B7280" name="Performance Score" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter dataKey="score" fill="#8B5CF6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          {/* Review Completion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Review Completion Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewCompletionFunnel.map((stage, index) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{stage.stage}</h3>
                      <span className="text-sm text-gray-600">
                        {stage.completed}/{stage.total} ({stage.percentage}%)
                      </span>
                    </div>
                    <Progress value={stage.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {/* Goal Category Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Goal Category Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goalCategoryAnalysis.map((category) => (
                  <div key={category.category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{category.category}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {category.completed}/{category.totalGoals} completed
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {category.departments} departments
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{category.avgRating}</span>
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={(category.completed / category.totalGoals) * 100}
                      className="h-3"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* System Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Recent System Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{activity.user}</span>
                        <Badge variant="outline" className="text-xs">{activity.department}</Badge>
                        <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}