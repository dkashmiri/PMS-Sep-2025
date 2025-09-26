import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  Target,
  Award,
  Clock,
  Users,
  Filter,
  Download,
  Calendar,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  LineChart
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

interface GoalAnalyticsProps {
  user: User;
}

// Mock analytics data
const analyticsData = {
  overview: {
    totalGoals: 156,
    completedGoals: 52,
    activeGoals: 89,
    overdueGoals: 15,
    avgProgress: 68,
    avgCompletionTime: 45,
    successRate: 78,
    kraAlignment: 85
  },
  performance: {
    greenZone: { count: 89, percentage: 57 },
    yellowZone: { count: 45, percentage: 29 },
    redZone: { count: 22, percentage: 14 }
  },
  trends: {
    monthlyCompletion: [
      { month: 'Jan', completed: 12, created: 15, progress: 68 },
      { month: 'Feb', completed: 8, created: 18, progress: 72 },
      { month: 'Mar', completed: 15, created: 12, progress: 75 },
      { month: 'Apr', completed: 10, created: 20, progress: 65 },
      { month: 'May', completed: 7, created: 16, progress: 70 }
    ],
    categoryBreakdown: [
      { category: 'Technical', count: 45, percentage: 29, avgProgress: 72 },
      { category: 'Professional', count: 38, percentage: 24, avgProgress: 68 },
      { category: 'Leadership', count: 42, percentage: 27, avgProgress: 65 },
      { category: 'Personal', count: 31, percentage: 20, avgProgress: 74 }
    ],
    priorityDistribution: [
      { priority: 'Critical', count: 12, percentage: 8, avgProgress: 62 },
      { priority: 'High', count: 45, percentage: 29, avgProgress: 70 },
      { priority: 'Medium', count: 68, percentage: 44, avgProgress: 72 },
      { priority: 'Low', count: 31, percentage: 19, avgProgress: 75 }
    ]
  },
  departmentPerformance: [
    { department: 'Engineering', goals: 45, completed: 32, avgProgress: 78, successRate: 85 },
    { department: 'Marketing', goals: 28, completed: 18, avgProgress: 72, successRate: 82 },
    { department: 'Sales', goals: 35, completed: 25, avgProgress: 75, successRate: 88 },
    { department: 'HR', goals: 22, completed: 15, avgProgress: 68, successRate: 79 },
    { department: 'Finance', goals: 18, completed: 12, avgProgress: 70, successRate: 81 }
  ],
  topPerformers: [
    { id: '1', name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=40&h=40&fit=crop&crop=face', completedGoals: 8, avgProgress: 92, successRate: 95 },
    { id: '2', name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', completedGoals: 7, avgProgress: 89, successRate: 91 },
    { id: '3', name: 'Jessica Wong', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', completedGoals: 6, avgProgress: 87, successRate: 88 },
    { id: '4', name: 'David Kumar', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', completedGoals: 6, avgProgress: 85, successRate: 86 },
    { id: '5', name: 'Emily Parker', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face', completedGoals: 5, avgProgress: 83, successRate: 84 }
  ],
  insights: [
    {
      type: 'positive',
      title: 'Improved Completion Rate',
      description: 'Goal completion rate increased by 12% compared to last quarter',
      metric: '+12%',
      icon: TrendingUp
    },
    {
      type: 'warning',
      title: 'Leadership Goals Lagging',
      description: 'Leadership category goals are 8% behind average progress',
      metric: '-8%',
      icon: AlertTriangle
    },
    {
      type: 'positive',
      title: 'High KRA Alignment',
      description: '85% of goals are properly aligned with KRAs',
      metric: '85%',
      icon: Zap
    },
    {
      type: 'neutral',
      title: 'Average Completion Time',
      description: 'Goals are being completed in an average of 45 days',
      metric: '45 days',
      icon: Clock
    }
  ]
};

export function GoalAnalytics({ user }: GoalAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('current_quarter');
  const [department, setDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            Goal Analytics & Insights
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analytics, performance insights, and trend analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_quarter">Current Quarter</SelectItem>
              <SelectItem value="last_quarter">Last Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Hero Analytics Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MXx8fHwxNzU4Nzc3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Analytics Dashboard"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/80 via-blue-50/80 to-green-50/80" />
        </div>
        <CardContent className="relative p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl text-blue-600">{analyticsData.overview.totalGoals}</p>
              <p className="text-sm text-muted-foreground">Total Goals</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {getTrendIcon('up')}
                <span className="text-xs text-green-600">+15%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl text-green-600">{analyticsData.overview.successRate}%</p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {getTrendIcon('up')}
                <span className="text-xs text-green-600">+5%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl text-purple-600">{analyticsData.overview.avgProgress}%</p>
              <p className="text-sm text-muted-foreground">Avg Progress</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {getTrendIcon('up')}
                <span className="text-xs text-green-600">+8%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-3xl text-orange-600">{analyticsData.overview.avgCompletionTime}</p>
              <p className="text-sm text-muted-foreground">Avg Days</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {getTrendIcon('down')}
                <span className="text-xs text-green-600">-3 days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <LineChart className="w-4 h-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Departments
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Zones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Performance Zones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray={`${analyticsData.performance.greenZone.percentage}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-green-600">
                        {analyticsData.performance.greenZone.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Green Zone</span>
                    </div>
                    <span className="text-sm font-medium">{analyticsData.performance.greenZone.count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Yellow Zone</span>
                    </div>
                    <span className="text-sm font-medium">{analyticsData.performance.yellowZone.count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Red Zone</span>
                    </div>
                    <span className="text-sm font-medium">{analyticsData.performance.redZone.count}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.trends.categoryBreakdown.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{category.count}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.avgProgress}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Priority Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Priority Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.trends.priorityDistribution.map((priority, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{priority.priority}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{priority.count}</span>
                        <Badge variant="outline" className="text-xs">
                          {priority.avgProgress}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={priority.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.topPerformers.map((performer, index) => (
                  <div key={performer.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <img 
                      src={performer.avatar} 
                      alt={performer.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {performer.completedGoals} goals completed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{performer.avgProgress}%</p>
                      <p className="text-xs text-muted-foreground">avg progress</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {performer.successRate}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl text-blue-600">{analyticsData.overview.kraAlignment}%</p>
                    <p className="text-sm text-muted-foreground">KRA Alignment</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Zap className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-600">High</span>
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl text-green-600">{analyticsData.overview.completedGoals}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+12%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm">{analyticsData.overview.avgProgress}%</span>
                    </div>
                    <Progress value={analyticsData.overview.avgProgress} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-sm">{analyticsData.overview.successRate}%</span>
                    </div>
                    <Progress value={analyticsData.overview.successRate} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">KRA Alignment</span>
                      <span className="text-sm">{analyticsData.overview.kraAlignment}%</span>
                    </div>
                    <Progress value={analyticsData.overview.kraAlignment} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Goal Completion Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Goals Created</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Goals Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Average Progress</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                  {analyticsData.trends.monthlyCompletion.map((month, index) => (
                    <div key={index} className="text-center space-y-2">
                      <p className="text-sm font-medium">{month.month}</p>
                      <div className="space-y-1">
                        <div className="h-16 flex items-end justify-center gap-1">
                          <div 
                            className="w-4 bg-blue-500 rounded-t"
                            style={{ height: `${(month.created / 20) * 100}%` }}
                          ></div>
                          <div 
                            className="w-4 bg-green-500 rounded-t"
                            style={{ height: `${(month.completed / 20) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p>{month.created} / {month.completed}</p>
                          <p>{month.progress}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.departmentPerformance.map((dept, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{dept.department}</h4>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {dept.successRate}% success rate
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Goals</p>
                        <p className="text-lg font-medium">{dept.goals}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Completed</p>
                        <p className="text-lg font-medium text-green-600">{dept.completed}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Progress</p>
                        <p className="text-lg font-medium text-purple-600">{dept.avgProgress}%</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={dept.avgProgress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analyticsData.insights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getInsightIcon(insight.type)}`}>
                      <insight.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge variant="outline" className={`${getInsightIcon(insight.type)}`}>
                          {insight.metric}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Key Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-blue-900">Improve Leadership Goal Focus</h5>
                  <p className="text-sm text-blue-700 mt-1">
                    Consider providing additional support for leadership category goals as they're showing lower progress rates.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-green-900">Maintain Technical Excellence</h5>
                  <p className="text-sm text-green-700 mt-1">
                    Technical goals are performing well. Continue current approach and consider expanding similar initiatives.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-yellow-900">Monitor Overdue Goals</h5>
                  <p className="text-sm text-yellow-700 mt-1">
                    15 goals are currently overdue. Consider reassessing timelines and providing additional resources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}