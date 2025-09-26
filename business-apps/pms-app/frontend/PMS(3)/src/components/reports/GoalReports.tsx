import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  Target,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Award,
  Users,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

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

interface GoalReportsProps {
  user: User;
}

// Mock goal data
const goalAchievementData = [
  { month: 'Jan', completed: 85, inProgress: 45, planned: 30, overdue: 12 },
  { month: 'Feb', completed: 92, inProgress: 38, planned: 25, overdue: 8 },
  { month: 'Mar', completed: 88, inProgress: 42, planned: 35, overdue: 15 },
  { month: 'Apr', completed: 96, inProgress: 35, planned: 28, overdue: 6 },
  { month: 'May', completed: 89, inProgress: 48, planned: 32, overdue: 11 },
  { month: 'Jun', completed: 102, inProgress: 41, planned: 29, overdue: 7 }
];

const goalCategoryData = [
  { category: 'Business Growth', completed: 45, total: 52, percentage: 87 },
  { category: 'Skill Development', completed: 38, total: 42, percentage: 90 },
  { category: 'Process Improvement', completed: 28, total: 35, percentage: 80 },
  { category: 'Innovation', completed: 22, total: 30, percentage: 73 },
  { category: 'Team Collaboration', completed: 31, total: 36, percentage: 86 }
];

const goalStatusDistribution = [
  { name: 'Completed', value: 342, color: '#34a853', percentage: 54 },
  { name: 'In Progress', value: 156, color: '#4285f4', percentage: 25 },
  { name: 'Planned', value: 89, color: '#fbc02d', percentage: 14 },
  { name: 'Overdue', value: 45, color: '#ea4335', percentage: 7 }
];

const departmentGoalData = [
  { department: 'Engineering', goals: 125, completed: 98, completionRate: 78, avgScore: 87 },
  { department: 'Sales', goals: 89, completed: 76, completionRate: 85, avgScore: 91 },
  { department: 'Marketing', goals: 78, completed: 62, completionRate: 79, avgScore: 84 },
  { department: 'HR', goals: 45, completed: 41, completionRate: 91, avgScore: 89 },
  { department: 'Finance', goals: 56, completed: 48, completionRate: 86, avgScore: 88 }
];

const topGoalAchievers = [
  { name: 'Sarah Johnson', department: 'Engineering', goalsCompleted: 12, completionRate: 100, trend: 'up' },
  { name: 'Michael Chen', department: 'Sales', goalsCompleted: 11, completionRate: 92, trend: 'up' },
  { name: 'Emily Davis', department: 'Marketing', goalsCompleted: 10, completionRate: 91, trend: 'stable' },
  { name: 'David Wilson', department: 'HR', goalsCompleted: 9, completionRate: 90, trend: 'up' },
  { name: 'Lisa Anderson', department: 'Finance', goalsCompleted: 8, completionRate: 89, trend: 'down' }
];

const goalTimelineData = [
  { quarter: 'Q1 2024', planned: 180, completed: 165, completionRate: 92 },
  { quarter: 'Q2 2024', planned: 175, completed: 158, completionRate: 90 },
  { quarter: 'Q3 2024', planned: 185, completed: 172, completionRate: 93 },
  { quarter: 'Q4 2024', planned: 190, completed: 145, completionRate: 76 } // Current quarter
];

export function GoalReports({ user }: GoalReportsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const renderRoleBasedContent = () => {
    const canViewAllDepartments = ['ADMIN', 'HR'].includes(user.role);
    const canViewTeamData = ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD'].includes(user.role);

    return (
      <>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Goals</p>
                  <p className="text-3xl font-bold text-foreground">632</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+12</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-muted rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-foreground">342</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">54.1%</span>
                  </div>
                </div>
                <div className="p-3 bg-success-muted rounded-lg">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-3xl font-bold text-foreground">156</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary">24.7%</span>
                  </div>
                </div>
                <div className="p-3 bg-warning-muted rounded-lg">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-3xl font-bold text-foreground">45</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">7.1%</span>
                  </div>
                </div>
                <div className="p-3 bg-destructive-muted rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="achievers">Top Achievers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Goal Achievement Trend */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Goal Achievement Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={goalAchievementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Area type="monotone" dataKey="completed" stackId="1" stroke="#34a853" fill="#34a853" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="inProgress" stackId="1" stroke="#4285f4" fill="#4285f4" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="planned" stackId="1" stroke="#fbc02d" fill="#fbc02d" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="overdue" stackId="1" stroke="#ea4335" fill="#ea4335" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Goal Status Distribution */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Goal Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={goalStatusDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                      >
                        {goalStatusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Goal Categories Progress */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Goal Categories Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {goalCategoryData.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{category.category}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {category.completed}/{category.total}
                          </span>
                          <Badge variant={category.percentage >= 85 ? 'default' : category.percentage >= 75 ? 'secondary' : 'destructive'}>
                            {category.percentage}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Goal Categories Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={goalCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="category" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="completed" fill="#34a853" name="Completed" />
                    <Bar dataKey="total" fill="#e8e8e8" name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goalCategoryData.map((category, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{category.category}</h3>
                        <Badge variant={category.percentage >= 85 ? 'default' : category.percentage >= 75 ? 'secondary' : 'destructive'}>
                          {category.percentage}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={category.percentage} className="h-3" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{category.completed} completed</span>
                          <span>{category.total - category.completed} remaining</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            {canViewAllDepartments && (
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Department Goal Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={departmentGoalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="department" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="completionRate" fill="#4285f4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentGoalData.map((dept, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{dept.department}</h3>
                        <Badge variant="secondary">{dept.completionRate}%</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Goals</span>
                          <span className="font-medium">{dept.goals}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completed</span>
                          <span className="font-medium text-success">{dept.completed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Avg Score</span>
                          <span className="font-medium">{dept.avgScore}%</span>
                        </div>
                        <Progress value={dept.completionRate} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Quarterly Goal Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={goalTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="quarter" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="planned" fill="#e8e8e8" name="Planned" />
                    <Bar dataKey="completed" fill="#34a853" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {goalTimelineData.map((quarter, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{quarter.quarter}</h3>
                        <Badge variant={quarter.completionRate >= 90 ? 'default' : quarter.completionRate >= 80 ? 'secondary' : 'destructive'}>
                          {quarter.completionRate}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Planned</span>
                          <span className="font-medium">{quarter.planned}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completed</span>
                          <span className="font-medium text-success">{quarter.completed}</span>
                        </div>
                        <Progress value={quarter.completionRate} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Top Achievers Tab */}
          <TabsContent value="achievers" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Top Goal Achievers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topGoalAchievers.map((achiever, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                          {achiever.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{achiever.name}</h4>
                          <p className="text-sm text-muted-foreground">{achiever.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{achiever.goalsCompleted} goals</p>
                          <p className="text-sm text-muted-foreground">{achiever.completionRate}% rate</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {achiever.trend === 'up' && <TrendingUp className="h-4 w-4 text-success" />}
                          {achiever.trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive" />}
                          {achiever.trend === 'stable' && <div className="w-4 h-4 bg-warning rounded-full" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Goal Reports</h1>
          <p className="text-muted-foreground">Comprehensive goal analytics and achievement insights</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="business">Business Growth</SelectItem>
              <SelectItem value="skill">Skill Development</SelectItem>
              <SelectItem value="process">Process Improvement</SelectItem>
              <SelectItem value="innovation">Innovation</SelectItem>
              <SelectItem value="collaboration">Team Collaboration</SelectItem>
            </SelectContent>
          </Select>
          
          {['ADMIN', 'HR'].includes(user.role) && (
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {renderRoleBasedContent()}
    </div>
  );
}