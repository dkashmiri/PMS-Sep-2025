import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Calendar as CalendarIcon,
  Users, 
  Target, 
  Award, 
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  Download,
  Filter,
  Search,
  Eye,
  FileText,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity
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

interface CrossCycleAnalysisProps {
  user: User;
}

interface PerformanceCycle {
  id: string;
  name: string;
  period: string;
  startDate: Date;
  endDate: Date;
  type: 'Annual' | 'Quarterly' | 'Project-Based';
  status: 'Completed' | 'Active' | 'Planned';
}

interface EmployeePerformanceTrend {
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  trends: {
    cycle: string;
    kraScore: number;
    goalScore: number;
    overallScore: number;
    performanceZone: 'Green' | 'Yellow' | 'Red';
    date: Date;
  }[];
  averageImprovement: number;
  consistencyScore: number;
  trajectory: 'Improving' | 'Stable' | 'Declining';
}

interface DepartmentComparison {
  department: string;
  averageScore: number;
  improvement: number;
  employeeCount: number;
  topPerformers: number;
  cycles: {
    period: string;
    avgScore: number;
    completionRate: number;
  }[];
}

interface GoalAchievementPattern {
  goalCategory: string;
  achievementRate: number;
  trend: number;
  cycleData: {
    period: string;
    achieved: number;
    total: number;
    rate: number;
  }[];
}

interface CompetencyEvolution {
  competency: string;
  currentLevel: number;
  previousLevel: number;
  improvement: number;
  departmentData: {
    department: string;
    currentLevel: number;
    improvement: number;
  }[];
}

const mockPerformanceCycles: PerformanceCycle[] = [
  {
    id: 'cycle-2024-annual',
    name: 'Annual Review 2024',
    period: '2024',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    type: 'Annual',
    status: 'Active'
  },
  {
    id: 'cycle-2023-annual',
    name: 'Annual Review 2023',
    period: '2023',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    type: 'Annual',
    status: 'Completed'
  },
  {
    id: 'cycle-2024-q1',
    name: 'Q1 Review 2024',
    period: 'Q1 2024',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31'),
    type: 'Quarterly',
    status: 'Completed'
  }
];

const mockEmployeeTrends: EmployeePerformanceTrend[] = [
  {
    employeeId: 'emp-1',
    employeeName: 'Sarah Johnson',
    department: 'Engineering',
    position: 'Senior Developer',
    trends: [
      {
        cycle: '2022',
        kraScore: 3.8,
        goalScore: 3.9,
        overallScore: 3.8,
        performanceZone: 'Green',
        date: new Date('2022-12-31')
      },
      {
        cycle: '2023',
        kraScore: 4.1,
        goalScore: 4.2,
        overallScore: 4.1,
        performanceZone: 'Green',
        date: new Date('2023-12-31')
      },
      {
        cycle: 'Q1 2024',
        kraScore: 4.3,
        goalScore: 4.4,
        overallScore: 4.3,
        performanceZone: 'Green',
        date: new Date('2024-03-31')
      }
    ],
    averageImprovement: 0.25,
    consistencyScore: 4.1,
    trajectory: 'Improving'
  },
  {
    employeeId: 'emp-2',
    employeeName: 'Michael Chen',
    department: 'Product',
    position: 'Product Manager',
    trends: [
      {
        cycle: '2022',
        kraScore: 4.2,
        goalScore: 4.0,
        overallScore: 4.1,
        performanceZone: 'Green',
        date: new Date('2022-12-31')
      },
      {
        cycle: '2023',
        kraScore: 3.9,
        goalScore: 3.8,
        overallScore: 3.9,
        performanceZone: 'Green',
        date: new Date('2023-12-31')
      },
      {
        cycle: 'Q1 2024',
        kraScore: 3.7,
        goalScore: 3.6,
        overallScore: 3.7,
        performanceZone: 'Yellow',
        date: new Date('2024-03-31')
      }
    ],
    averageImprovement: -0.2,
    consistencyScore: 3.9,
    trajectory: 'Declining'
  }
];

const mockDepartmentComparisons: DepartmentComparison[] = [
  {
    department: 'Engineering',
    averageScore: 4.2,
    improvement: 0.3,
    employeeCount: 85,
    topPerformers: 23,
    cycles: [
      { period: '2022', avgScore: 3.9, completionRate: 92 },
      { period: '2023', avgScore: 4.1, completionRate: 94 },
      { period: 'Q1 2024', avgScore: 4.2, completionRate: 96 }
    ]
  },
  {
    department: 'Product',
    averageScore: 4.0,
    improvement: 0.1,
    employeeCount: 45,
    topPerformers: 12,
    cycles: [
      { period: '2022', avgScore: 3.9, completionRate: 89 },
      { period: '2023', avgScore: 4.0, completionRate: 91 },
      { period: 'Q1 2024', avgScore: 4.0, completionRate: 93 }
    ]
  },
  {
    department: 'Design',
    averageScore: 4.1,
    improvement: 0.2,
    employeeCount: 28,
    topPerformers: 8,
    cycles: [
      { period: '2022', avgScore: 3.9, completionRate: 95 },
      { period: '2023', avgScore: 4.0, completionRate: 96 },
      { period: 'Q1 2024', avgScore: 4.1, completionRate: 97 }
    ]
  }
];

const mockGoalPatterns: GoalAchievementPattern[] = [
  {
    goalCategory: 'Technical Skills',
    achievementRate: 87,
    trend: 5,
    cycleData: [
      { period: '2022', achieved: 78, total: 95, rate: 82 },
      { period: '2023', achieved: 82, total: 98, rate: 84 },
      { period: 'Q1 2024', achieved: 89, total: 102, rate: 87 }
    ]
  },
  {
    goalCategory: 'Leadership',
    achievementRate: 76,
    trend: -2,
    cycleData: [
      { period: '2022', achieved: 42, total: 54, rate: 78 },
      { period: '2023', achieved: 45, total: 58, rate: 78 },
      { period: 'Q1 2024', achieved: 46, total: 61, rate: 76 }
    ]
  },
  {
    goalCategory: 'Innovation',
    achievementRate: 92,
    trend: 8,
    cycleData: [
      { period: '2022', achieved: 35, total: 42, rate: 83 },
      { period: '2023', achieved: 38, total: 44, rate: 86 },
      { period: 'Q1 2024', achieved: 42, total: 46, rate: 92 }
    ]
  }
];

const mockCompetencyEvolution: CompetencyEvolution[] = [
  {
    competency: 'Technical Leadership',
    currentLevel: 4.2,
    previousLevel: 3.9,
    improvement: 0.3,
    departmentData: [
      { department: 'Engineering', currentLevel: 4.3, improvement: 0.2 },
      { department: 'Product', currentLevel: 4.0, improvement: 0.4 },
      { department: 'Design', currentLevel: 4.1, improvement: 0.3 }
    ]
  },
  {
    competency: 'Communication',
    currentLevel: 4.0,
    previousLevel: 3.8,
    improvement: 0.2,
    departmentData: [
      { department: 'Engineering', currentLevel: 3.8, improvement: 0.1 },
      { department: 'Product', currentLevel: 4.2, improvement: 0.3 },
      { department: 'Design', currentLevel: 4.1, improvement: 0.2 }
    ]
  }
];

export function CrossCycleAnalysis({ user }: CrossCycleAnalysisProps) {
  const [activeTab, setActiveTab] = useState('trends');
  const [selectedCycles, setSelectedCycles] = useState<string[]>(['cycle-2023-annual', 'cycle-2024-q1']);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const [searchTerm, setSearchTerm] = useState('');

  const getTrendIcon = (trajectory: string) => {
    switch (trajectory) {
      case 'Improving': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'Declining': return <ArrowDown className="w-4 h-4 text-red-600" />;
      case 'Stable': return <Minus className="w-4 h-4 text-yellow-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrajectoryColor = (trajectory: string) => {
    switch (trajectory) {
      case 'Improving': return 'text-green-600';
      case 'Declining': return 'text-red-600';
      case 'Stable': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'Green': return 'bg-green-100 text-green-800';
      case 'Yellow': return 'bg-yellow-100 text-yellow-800';
      case 'Red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatChange = (value: number, isPercentage = false) => {
    const prefix = value > 0 ? '+' : '';
    const suffix = isPercentage ? '%' : '';
    return `${prefix}${value.toFixed(1)}${suffix}`;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-google-gray-900">Cross-Cycle Analysis</h1>
          <p className="text-google-gray-600 mt-1">Comprehensive performance trends and patterns across review cycles</p>
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
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-primary-muted rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+0.2</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-google-gray-600 mb-1">Average Performance Trend</p>
              <p className="text-2xl font-bold text-google-gray-900">4.1</p>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-success-muted rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+12%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-google-gray-600 mb-1">Employees Improving</p>
              <p className="text-2xl font-bold text-google-gray-900">68%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-warning-muted rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-warning" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+5%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-google-gray-600 mb-1">Goal Achievement Rate</p>
              <p className="text-2xl font-bold text-google-gray-900">85%</p>
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
                <ArrowDown className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">-3</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-google-gray-600 mb-1">Underperformers</p>
              <p className="text-2xl font-bold text-google-gray-900">18</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trends" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance Trends
          </TabsTrigger>
          <TabsTrigger value="departments" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Department Analysis
          </TabsTrigger>
          <TabsTrigger value="goals" className="gap-2">
            <Target className="w-4 h-4" />
            Goal Patterns
          </TabsTrigger>
          <TabsTrigger value="competencies" className="gap-2">
            <Star className="w-4 h-4" />
            Competency Evolution
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-2">
            <Lightbulb className="w-4 h-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Performance Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Employee Performance Trends
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-google-gray-400" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 premium-input"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockEmployeeTrends.map((employee) => (
                  <div key={employee.employeeId} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{employee.employeeName}</h3>
                          <Badge variant="outline">{employee.department}</Badge>
                          <Badge variant="outline">{employee.position}</Badge>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            {getTrendIcon(employee.trajectory)}
                            <span className={`font-medium ${getTrajectoryColor(employee.trajectory)}`}>
                              {employee.trajectory}
                            </span>
                          </div>
                          <span className="text-sm text-google-gray-600">
                            Avg Improvement: {formatChange(employee.averageImprovement)}
                          </span>
                          <span className="text-sm text-google-gray-600">
                            Consistency: {employee.consistencyScore}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>

                    {/* Performance Timeline */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-google-gray-700">Performance Timeline</h4>
                      <div className="flex gap-6 overflow-x-auto">
                        {employee.trends.map((trend, index) => (
                          <div key={index} className="flex-shrink-0 text-center p-4 bg-google-gray-50 rounded-lg min-w-32">
                            <p className="text-sm font-medium text-google-gray-700 mb-2">{trend.cycle}</p>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-google-gray-600">Overall</p>
                                <p className={`text-lg font-bold ${getScoreColor(trend.overallScore)}`}>
                                  {trend.overallScore}
                                </p>
                              </div>
                              <Badge className={getZoneColor(trend.performanceZone)} variant="outline">
                                {trend.performanceZone}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Scores */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600 mb-1">Latest KRA Score</p>
                        <p className="text-lg font-bold text-blue-700">
                          {employee.trends[employee.trends.length - 1]?.kraScore}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600 mb-1">Latest Goal Score</p>
                        <p className="text-lg font-bold text-green-700">
                          {employee.trends[employee.trends.length - 1]?.goalScore}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600 mb-1">Trend Direction</p>
                        <p className={`text-lg font-bold ${getTrajectoryColor(employee.trajectory)}`}>
                          {formatChange(employee.averageImprovement)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Department Analysis Tab */}
        <TabsContent value="departments" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Department Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockDepartmentComparisons.map((dept) => (
                  <div key={dept.department} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-google-gray-900">{dept.department}</h3>
                      <div className="flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">{formatChange(dept.improvement)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-google-gray-600 mb-1">Current Score</p>
                        <p className={`text-2xl font-bold ${getScoreColor(dept.averageScore)}`}>
                          {dept.averageScore}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-google-gray-600 mb-1">Employees</p>
                        <p className="text-2xl font-bold text-google-gray-900">{dept.employeeCount}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-google-gray-600">Top Performers</span>
                        <span className="font-medium">{dept.topPerformers}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(dept.topPerformers / dept.employeeCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-google-gray-700 mb-3">Historical Performance</p>
                      <div className="space-y-2">
                        {dept.cycles.map((cycle, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-google-gray-600">{cycle.period}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{cycle.avgScore}</span>
                              <span className="text-xs text-google-gray-500">({cycle.completionRate}%)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goal Patterns Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Goal Achievement Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockGoalPatterns.map((pattern) => (
                  <div key={pattern.goalCategory} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-google-gray-900">{pattern.goalCategory}</h3>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-google-gray-600">Achievement Rate</p>
                          <p className="text-xl font-bold text-green-600">{pattern.achievementRate}%</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {pattern.trend > 0 ? (
                            <ArrowUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm ${pattern.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatChange(pattern.trend, true)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {pattern.cycleData.map((cycle, index) => (
                        <div key={index} className="text-center p-4 bg-google-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-google-gray-700 mb-2">{cycle.period}</p>
                          <p className="text-lg font-bold text-google-gray-900">{cycle.rate}%</p>
                          <p className="text-xs text-google-gray-600">
                            {cycle.achieved}/{cycle.total} goals
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competency Evolution Tab */}
        <TabsContent value="competencies" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Competency Evolution Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockCompetencyEvolution.map((competency) => (
                  <div key={competency.competency} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-google-gray-900">{competency.competency}</h3>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-google-gray-600">Current Level</p>
                          <p className={`text-xl font-bold ${getScoreColor(competency.currentLevel)}`}>
                            {competency.currentLevel}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-google-gray-600">Improvement</p>
                          <div className="flex items-center gap-1">
                            <ArrowUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600">{formatChange(competency.improvement)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium text-google-gray-700">Department Breakdown</p>
                      {competency.departmentData.map((dept, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-google-gray-50 rounded">
                          <span className="text-sm font-medium">{dept.department}</span>
                          <div className="flex items-center gap-4">
                            <span className={`font-bold ${getScoreColor(dept.currentLevel)}`}>
                              {dept.currentLevel}
                            </span>
                            <div className="flex items-center gap-1">
                              <ArrowUp className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-green-600">{formatChange(dept.improvement)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
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
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Strong Upward Trend</p>
                      <p className="text-sm text-green-700">68% of employees showing performance improvement across cycles</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Technical Skills Excellence</p>
                      <p className="text-sm text-blue-700">Technical goals showing 87% achievement rate with +5% trend</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-purple-900">Innovation Growth</p>
                      <p className="text-sm text-purple-700">Innovation competency showing strongest improvement (+8% trend)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Areas for Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">Leadership Development</p>
                      <p className="text-sm text-yellow-700">Leadership goals showing declining trend (-2%), needs focus</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-900">Performance Decline</p>
                      <p className="text-sm text-orange-700">18 employees showing declining performance trajectory</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">Department Variation</p>
                      <p className="text-sm text-red-700">Significant performance gaps between departments need alignment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-900 mb-1">Focus on Leadership Development</h4>
                  <p className="text-sm text-blue-700">
                    Implement targeted leadership training programs to address the declining trend in leadership goals achievement.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-green-900 mb-1">Leverage Technical Excellence</h4>
                  <p className="text-sm text-green-700">
                    Build on the strong technical skills performance by creating mentorship programs and knowledge sharing initiatives.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-purple-900 mb-1">Promote Innovation Culture</h4>
                  <p className="text-sm text-purple-700">
                    Continue fostering innovation with dedicated time for creative projects and cross-functional collaboration.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium text-orange-900 mb-1">Support Declining Performers</h4>
                  <p className="text-sm text-orange-700">
                    Implement personalized development plans and regular check-ins for employees showing declining performance.
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