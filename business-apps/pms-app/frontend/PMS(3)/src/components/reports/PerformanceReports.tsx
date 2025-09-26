import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Download,
  Filter,
  Search,
  Calendar,
  FileText,
  Eye,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

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

interface PerformanceReportsProps {
  user: User;
}

// Mock performance data
const performanceData = [
  { month: 'Jan', avgScore: 85, completionRate: 92, reviews: 145 },
  { month: 'Feb', avgScore: 87, completionRate: 88, reviews: 152 },
  { month: 'Mar', avgScore: 89, completionRate: 95, reviews: 148 },
  { month: 'Apr', avgScore: 91, completionRate: 90, reviews: 160 },
  { month: 'May', avgScore: 88, completionRate: 93, reviews: 155 },
  { month: 'Jun', avgScore: 92, completionRate: 97, reviews: 163 }
];

const departmentScores = [
  { department: 'Engineering', avgScore: 91, employees: 45, highPerformers: 32 },
  { department: 'Sales', avgScore: 88, employees: 32, highPerformers: 25 },
  { department: 'Marketing', avgScore: 85, employees: 28, highPerformers: 20 },
  { department: 'HR', avgScore: 90, employees: 15, highPerformers: 12 },
  { department: 'Finance', avgScore: 87, employees: 18, highPerformers: 14 }
];

const performanceDistribution = [
  { range: '90-100', count: 45, color: '#34a853' },
  { range: '80-89', count: 62, color: '#4285f4' },
  { range: '70-79', count: 28, color: '#fbc02d' },
  { range: '60-69', count: 12, color: '#ff9800' },
  { range: 'Below 60', count: 5, color: '#ea4335' }
];

const topPerformers = [
  { name: 'Sarah Johnson', department: 'Engineering', score: 96, trend: 'up' },
  { name: 'Michael Chen', department: 'Sales', score: 94, trend: 'up' },
  { name: 'Emily Davis', department: 'Marketing', score: 93, trend: 'stable' },
  { name: 'David Wilson', department: 'HR', score: 92, trend: 'up' },
  { name: 'Lisa Anderson', department: 'Finance', score: 91, trend: 'down' }
];

const reviewMetrics = [
  { cycle: 'Q1 2024', completed: 142, pending: 8, overdue: 3 },
  { cycle: 'Q2 2024', completed: 139, pending: 12, overdue: 5 },
  { cycle: 'Q3 2024', completed: 145, pending: 7, overdue: 2 },
  { cycle: 'Current', completed: 89, pending: 45, overdue: 8 }
];

export function PerformanceReports({ user }: PerformanceReportsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold text-foreground">89.2</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+2.4%</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-muted rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-3xl font-bold text-foreground">94.3%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+1.8%</span>
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
                  <p className="text-sm text-muted-foreground">High Performers</p>
                  <p className="text-3xl font-bold text-foreground">45</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+7</span>
                  </div>
                </div>
                <div className="p-3 bg-warning-muted rounded-lg">
                  <Award className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reviews Pending</p>
                  <p className="text-3xl font-bold text-foreground">23</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">+5</span>
                  </div>
                </div>
                <div className="p-3 bg-destructive-muted rounded-lg">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Trend */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
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
                      <Line type="monotone" dataKey="avgScore" stroke="#4285f4" strokeWidth={3} />
                      <Line type="monotone" dataKey="completionRate" stroke="#34a853" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Distribution */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Performance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={performanceDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ range, count }) => `${range}: ${count}`}
                      >
                        {performanceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                          {performer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{performer.name}</h4>
                          <p className="text-sm text-muted-foreground">{performer.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {performer.trend === 'up' && <TrendingUp className="h-4 w-4 text-success" />}
                          {performer.trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive" />}
                          {performer.trend === 'stable' && <div className="w-4 h-4 bg-warning rounded-full" />}
                        </div>
                        <Badge variant="secondary" className="text-lg font-semibold">
                          {performer.score}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Performance Trends Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
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
                    <Line type="monotone" dataKey="avgScore" stroke="#4285f4" strokeWidth={3} name="Average Score" />
                    <Line type="monotone" dataKey="completionRate" stroke="#34a853" strokeWidth={3} name="Completion Rate" />
                    <Line type="monotone" dataKey="reviews" stroke="#fbc02d" strokeWidth={3} name="Total Reviews" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            {canViewAllDepartments && (
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Department Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={departmentScores}>
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
                      <Bar dataKey="avgScore" fill="#4285f4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentScores.map((dept, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{dept.department}</h3>
                        <Badge variant="secondary">{dept.avgScore}%</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Employees</span>
                          <span className="font-medium">{dept.employees}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">High Performers</span>
                          <span className="font-medium text-success">{dept.highPerformers}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Detailed Reports Tab */}
          <TabsContent value="detailed" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Review Completion Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reviewMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="cycle" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="completed" fill="#34a853" />
                    <Bar dataKey="pending" fill="#fbc02d" />
                    <Bar dataKey="overdue" fill="#ea4335" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Detailed Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-muted-foreground">Department</th>
                        <th className="text-left p-3 text-muted-foreground">Avg Score</th>
                        <th className="text-left p-3 text-muted-foreground">Employees</th>
                        <th className="text-left p-3 text-muted-foreground">High Performers</th>
                        <th className="text-left p-3 text-muted-foreground">Completion Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentScores.map((dept, index) => (
                        <tr key={index} className="border-b border-border hover:bg-surface">
                          <td className="p-3 font-medium">{dept.department}</td>
                          <td className="p-3">
                            <Badge variant={dept.avgScore >= 90 ? 'default' : dept.avgScore >= 80 ? 'secondary' : 'destructive'}>
                              {dept.avgScore}%
                            </Badge>
                          </td>
                          <td className="p-3">{dept.employees}</td>
                          <td className="p-3 text-success font-medium">{dept.highPerformers}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-border rounded-full h-2">
                                <div 
                                  className="h-2 bg-success rounded-full" 
                                  style={{ width: `${(dept.highPerformers / dept.employees) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {Math.round((dept.highPerformers / dept.employees) * 100)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
          <h1 className="text-3xl font-semibold text-foreground mb-2">Performance Reports</h1>
          <p className="text-muted-foreground">Comprehensive performance analytics and insights</p>
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