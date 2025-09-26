import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Award, 
  Calendar as CalendarIcon,
  Download,
  Filter,
  PieChart,
  LineChart,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';

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

interface ReviewAnalyticsProps {
  user: User;
}

interface PerformanceMetrics {
  period: string;
  averageScore: number;
  completionRate: number;
  onTimeSubmission: number;
  participantCount: number;
  trends: {
    scoreChange: number;
    completionChange: number;
    participationChange: number;
  };
}

interface DepartmentAnalytics {
  department: string;
  avgScore: number;
  completionRate: number;
  employeeCount: number;
  topPerformers: number;
  improvementNeeded: number;
  trend: 'up' | 'down' | 'stable';
}

interface GoalKRAAlignment {
  employeeId: string;
  employeeName: string;
  department: string;
  kraScore: number;
  goalScore: number;
  alignmentScore: number;
  overallPerformance: number;
  zone: 'Green' | 'Yellow' | 'Red';
}

interface CompetencyAnalysis {
  competency: string;
  avgScore: number;
  improvement: number;
  departmentScores: { department: string; score: number }[];
}

const mockPerformanceMetrics: PerformanceMetrics[] = [
  {
    period: 'Q4 2024',
    averageScore: 4.2,
    completionRate: 94,
    onTimeSubmission: 87,
    participantCount: 243,
    trends: { scoreChange: 0.3, completionChange: 5, participationChange: 12 }
  },
  {
    period: 'Q3 2024',
    averageScore: 3.9,
    completionRate: 89,
    onTimeSubmission: 82,
    participantCount: 231,
    trends: { scoreChange: 0.1, completionChange: 2, participationChange: 8 }
  }
];

const mockDepartmentAnalytics: DepartmentAnalytics[] = [
  {
    department: 'Engineering',
    avgScore: 4.3,
    completionRate: 96,
    employeeCount: 85,
    topPerformers: 23,
    improvementNeeded: 8,
    trend: 'up'
  },
  {
    department: 'Product',
    avgScore: 4.1,
    completionRate: 92,
    employeeCount: 45,
    topPerformers: 12,
    improvementNeeded: 5,
    trend: 'up'
  },
  {
    department: 'Design',
    avgScore: 4.0,
    completionRate: 94,
    employeeCount: 28,
    topPerformers: 8,
    improvementNeeded: 3,
    trend: 'stable'
  },
  {
    department: 'Marketing',
    avgScore: 3.8,
    completionRate: 88,
    employeeCount: 32,
    topPerformers: 6,
    improvementNeeded: 9,
    trend: 'down'
  }
];

const mockGoalKRAAlignment: GoalKRAAlignment[] = [
  {
    employeeId: 'emp-1',
    employeeName: 'Sarah Johnson',
    department: 'Engineering',
    kraScore: 4.2,
    goalScore: 4.5,
    alignmentScore: 4.3,
    overallPerformance: 4.3,
    zone: 'Green'
  },
  {
    employeeId: 'emp-2',
    employeeName: 'Michael Chen',
    department: 'Product',
    kraScore: 4.0,
    goalScore: 3.8,
    alignmentScore: 3.9,
    overallPerformance: 3.9,
    zone: 'Green'
  },
  {
    employeeId: 'emp-3',
    employeeName: 'Emily Davis',
    department: 'Design',
    kraScore: 3.5,
    goalScore: 3.2,
    alignmentScore: 3.4,
    overallPerformance: 3.4,
    zone: 'Yellow'
  }
];

const mockCompetencyAnalysis: CompetencyAnalysis[] = [
  {
    competency: 'Leadership',
    avgScore: 4.1,
    improvement: 0.2,
    departmentScores: [
      { department: 'Engineering', score: 4.3 },
      { department: 'Product', score: 4.2 },
      { department: 'Design', score: 3.9 },
      { department: 'Marketing', score: 3.8 }
    ]
  },
  {
    competency: 'Communication',
    avgScore: 4.0,
    improvement: 0.1,
    departmentScores: [
      { department: 'Engineering', score: 3.8 },
      { department: 'Product', score: 4.2 },
      { department: 'Design', score: 4.1 },
      { department: 'Marketing', score: 4.3 }
    ]
  },
  {
    competency: 'Technical Skills',
    avgScore: 4.2,
    improvement: 0.3,
    departmentScores: [
      { department: 'Engineering', score: 4.5 },
      { department: 'Product', score: 4.0 },
      { department: 'Design', score: 4.1 },
      { department: 'Marketing', score: 3.2 }
    ]
  }
];

export function ReviewAnalytics({ user }: ReviewAnalyticsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2024');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-yellow-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'Green': return 'bg-green-100 text-green-800';
      case 'Yellow': return 'bg-yellow-100 text-yellow-800';
      case 'Red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatChange = (value: number, type: 'score' | 'percentage') => {
    const prefix = value > 0 ? '+' : '';
    const suffix = type === 'percentage' ? '%' : '';
    return `${prefix}${value}${suffix}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-google-gray-900">Review Analytics</h1>
          <p className="text-google-gray-600 mt-1">Performance insights and trends analysis</p>
        </div>
        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => setDateRange({ from: range?.from || null, to: range?.to || null })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-primary-muted rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+0.3</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-google-gray-600 mb-1">Avg Performance Score</p>
              <p className="text-2xl font-bold text-google-gray-900">4.2</p>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-success-muted rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+5%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-google-gray-600 mb-1">Completion Rate</p>
              <p className="text-2xl font-bold text-google-gray-900">94%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-warning-muted rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+7%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-google-gray-600 mb-1">On-Time Submissions</p>
              <p className="text-2xl font-bold text-google-gray-900">87%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-destructive-muted rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowDown className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">-2</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-google-gray-600 mb-1">Low Performers</p>
              <p className="text-2xl font-bold text-google-gray-900">18</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="departments" className="gap-2">
            <Users className="w-4 h-4" />
            Departments
          </TabsTrigger>
          <TabsTrigger value="goal-kra" className="gap-2">
            <Target className="w-4 h-4" />
            Goal-KRA Matrix
          </TabsTrigger>
          <TabsTrigger value="competencies" className="gap-2">
            <Award className="w-4 h-4" />
            Competencies
          </TabsTrigger>
          <TabsTrigger value="trends" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Green Zone (4.0+)</span>
                    </div>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Yellow Zone (3.0-3.9)</span>
                    </div>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Red Zone (&lt;3.0)</span>
                    </div>
                    <span className="font-medium">8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  Review Process Stages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Self-Assessment</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">R1 Review</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">R2 Review</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Performance Metrics Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPerformanceMetrics.map((metric, index) => (
                  <div key={index} className="border border-google-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-google-gray-900">{metric.period}</h3>
                      <Badge variant="outline">{metric.participantCount} participants</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-google-gray-600 mb-1">Average Score</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{metric.averageScore}</span>
                          <span className={`text-sm ${metric.trends.scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatChange(metric.trends.scoreChange, 'score')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-google-gray-600 mb-1">Completion Rate</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{metric.completionRate}%</span>
                          <span className={`text-sm ${metric.trends.completionChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatChange(metric.trends.completionChange, 'percentage')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-google-gray-600 mb-1">On-Time Submission</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{metric.onTimeSubmission}%</span>
                          <span className={`text-sm ${metric.trends.participationChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatChange(metric.trends.participationChange, 'percentage')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Department Analytics Tab */}
        <TabsContent value="departments" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Department Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockDepartmentAnalytics.map((dept) => (
                  <div key={dept.department} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-google-gray-900">{dept.department}</h3>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(dept.trend)}
                        <span className={`text-lg font-bold ${getScoreColor(dept.avgScore)}`}>
                          {dept.avgScore}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-google-gray-600 mb-1">Completion Rate</p>
                        <p className="text-lg font-semibold">{dept.completionRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-google-gray-600 mb-1">Employee Count</p>
                        <p className="text-lg font-semibold">{dept.employeeCount}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{dept.topPerformers}</p>
                        <p className="text-sm text-green-700">Top Performers</p>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{dept.improvementNeeded}</p>
                        <p className="text-sm text-red-700">Need Improvement</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goal-KRA Matrix Tab */}
        <TabsContent value="goal-kra" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Goal-KRA Alignment Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGoalKRAAlignment.map((employee) => (
                  <div key={employee.employeeId} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-google-gray-900">{employee.employeeName}</h3>
                        <p className="text-sm text-google-gray-600">{employee.department}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getZoneColor(employee.zone)}>{employee.zone}</Badge>
                        <span className="text-lg font-bold">{employee.overallPerformance}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-6">
                      <div className="text-center">
                        <p className="text-sm text-google-gray-600 mb-1">KRA Score</p>
                        <p className="text-xl font-bold text-blue-600">{employee.kraScore}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-google-gray-600 mb-1">Goal Score</p>
                        <p className="text-xl font-bold text-green-600">{employee.goalScore}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-google-gray-600 mb-1">Alignment</p>
                        <p className="text-xl font-bold text-purple-600">{employee.alignmentScore}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-google-gray-600 mb-1">Overall</p>
                        <p className={`text-xl font-bold ${getScoreColor(employee.overallPerformance)}`}>
                          {employee.overallPerformance}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-google-gray-200">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Review Report
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competencies Tab */}
        <TabsContent value="competencies" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Competency Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockCompetencyAnalysis.map((competency) => (
                  <div key={competency.competency} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-google-gray-900">{competency.competency}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${getScoreColor(competency.avgScore)}`}>
                          {competency.avgScore}
                        </span>
                        <div className="flex items-center gap-1">
                          <ArrowUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">+{competency.improvement}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {competency.departmentScores.map((dept) => (
                        <div key={dept.department} className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-google-gray-600 mb-1">{dept.department}</p>
                          <p className={`text-lg font-bold ${getScoreColor(dept.score)}`}>{dept.score}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Score Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-google-gray-300 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-google-gray-400 mx-auto mb-2" />
                    <p className="text-google-gray-500">Chart visualization would be integrated here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Completion Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-google-gray-300 rounded-lg">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-google-gray-400 mx-auto mb-2" />
                    <p className="text-google-gray-500">Chart visualization would be integrated here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}