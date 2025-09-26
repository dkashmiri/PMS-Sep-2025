import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  Award,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

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

interface ReviewReportsProps {
  user: User;
}

// Mock review data
const reviewCycleData = [
  { cycle: 'Q1 2024', selfAssessment: 95, r1Review: 88, r2Review: 82, final: 78, employees: 142 },
  { cycle: 'Q2 2024', selfAssessment: 92, r1Review: 85, r2Review: 80, final: 75, employees: 145 },
  { cycle: 'Q3 2024', selfAssessment: 98, r1Review: 91, r2Review: 87, final: 82, employees: 148 },
  { cycle: 'Q4 2024', selfAssessment: 89, r1Review: 79, r2Review: 73, final: 68, employees: 150 }
];

const reviewStatusData = [
  { name: 'Completed', value: 128, color: '#34a853', percentage: 85 },
  { name: 'In Progress', value: 15, color: '#4285f4', percentage: 10 },
  { name: 'Pending', value: 5, color: '#fbc02d', percentage: 3 },
  { name: 'Overdue', value: 2, color: '#ea4335', percentage: 2 }
];

const departmentReviewData = [
  { department: 'Engineering', completed: 42, pending: 3, overdue: 0, completionRate: 93 },
  { department: 'Sales', completed: 28, pending: 2, overdue: 2, completionRate: 87 },
  { department: 'Marketing', completed: 25, pending: 2, overdue: 1, completionRate: 89 },
  { department: 'HR', completed: 14, pending: 1, overdue: 0, completionRate: 93 },
  { department: 'Finance', completed: 16, pending: 1, overdue: 1, completionRate: 89 }
];

const reviewerWorkloadData = [
  { reviewer: 'Michael Chen', directReports: 8, completed: 6, pending: 2, avgRating: 4.2 },
  { reviewer: 'Sarah Johnson', directReports: 6, completed: 5, pending: 1, avgRating: 4.5 },
  { reviewer: 'Emily Davis', directReports: 7, completed: 7, pending: 0, avgRating: 4.1 },
  { reviewer: 'David Wilson', directReports: 5, completed: 4, pending: 1, avgRating: 4.3 },
  { reviewer: 'Lisa Anderson', directReports: 6, completed: 5, pending: 1, avgRating: 4.4 }
];

const reviewTimelineData = [
  { stage: 'Self Assessment', avgDays: 3.2, target: 3, status: 'good' },
  { stage: 'R1 Review', avgDays: 5.8, target: 5, status: 'warning' },
  { stage: 'R2 Review', avgDays: 4.1, target: 4, status: 'good' },
  { stage: 'Final Review', avgDays: 2.5, target: 2, status: 'good' }
];

const performanceZoneData = [
  { zone: 'Green Zone', count: 89, percentage: 59, color: '#34a853' },
  { zone: 'Yellow Zone', count: 45, percentage: 30, color: '#fbc02d' },
  { zone: 'Red Zone', count: 16, percentage: 11, color: '#ea4335' }
];

export function ReviewReports({ user }: ReviewReportsProps) {
  const [selectedCycle, setSelectedCycle] = useState('q4-2024');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const renderRoleBasedContent = () => {
    const canViewAllDepartments = ['ADMIN', 'HR'].includes(user.role);
    const canViewReviewerData = ['ADMIN', 'HR', 'MANAGER'].includes(user.role);

    return (
      <>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-3xl font-bold text-foreground">85.3%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+3.2%</span>
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
                  <p className="text-sm text-muted-foreground">Avg Cycle Time</p>
                  <p className="text-3xl font-bold text-foreground">15.6</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">days</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-muted rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue Reviews</p>
                  <p className="text-3xl font-bold text-foreground">2</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">1.3%</span>
                  </div>
                </div>
                <div className="p-3 bg-destructive-muted rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-3xl font-bold text-foreground">4.3</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Award className="h-4 w-4 text-warning" />
                    <span className="text-sm text-warning">out of 5</span>
                  </div>
                </div>
                <div className="p-3 bg-warning-muted rounded-lg">
                  <Award className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cycles">Review Cycles</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Review Status Distribution */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Review Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={reviewStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                      >
                        {reviewStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Zone Distribution */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Performance Zone Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceZoneData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="zone" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="count" fill={(entry) => entry.color} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Review Timeline Analysis */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Review Timeline Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviewTimelineData.map((stage, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          stage.status === 'good' ? 'bg-success' : 
                          stage.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                        }`} />
                        <div>
                          <h4 className="font-medium text-foreground">{stage.stage}</h4>
                          <p className="text-sm text-muted-foreground">Target: {stage.target} days</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">{stage.avgDays}</p>
                        <p className="text-sm text-muted-foreground">avg days</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Review Cycles Tab */}
          <TabsContent value="cycles" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Review Cycle Completion Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={reviewCycleData}>
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
                    <Line type="monotone" dataKey="selfAssessment" stroke="#4285f4" strokeWidth={2} name="Self Assessment" />
                    <Line type="monotone" dataKey="r1Review" stroke="#34a853" strokeWidth={2} name="R1 Review" />
                    <Line type="monotone" dataKey="r2Review" stroke="#fbc02d" strokeWidth={2} name="R2 Review" />
                    <Line type="monotone" dataKey="final" stroke="#ea4335" strokeWidth={2} name="Final Review" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviewCycleData.map((cycle, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{cycle.cycle}</h3>
                        <Badge variant="secondary">{cycle.employees} employees</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Self Assessment</span>
                          <span className="font-medium">{cycle.selfAssessment}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">R1 Review</span>
                          <span className="font-medium">{cycle.r1Review}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">R2 Review</span>
                          <span className="font-medium">{cycle.r2Review}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Final Review</span>
                          <span className="font-medium text-success">{cycle.final}%</span>
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
                  <CardTitle>Department Review Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={departmentReviewData}>
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
                      <Bar dataKey="completed" fill="#34a853" name="Completed" />
                      <Bar dataKey="pending" fill="#fbc02d" name="Pending" />
                      <Bar dataKey="overdue" fill="#ea4335" name="Overdue" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentReviewData.map((dept, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{dept.department}</h3>
                        <Badge variant={dept.completionRate >= 90 ? 'default' : dept.completionRate >= 80 ? 'secondary' : 'destructive'}>
                          {dept.completionRate}%
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completed</span>
                          <span className="font-medium text-success">{dept.completed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Pending</span>
                          <span className="font-medium text-warning">{dept.pending}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Overdue</span>
                          <span className="font-medium text-destructive">{dept.overdue}</span>
                        </div>
                        <Progress value={dept.completionRate} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviewers Tab */}
          <TabsContent value="reviewers" className="space-y-6">
            {canViewReviewerData && (
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Reviewer Workload Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviewerWorkloadData.map((reviewer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                            {reviewer.reviewer.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{reviewer.reviewer}</h4>
                            <p className="text-sm text-muted-foreground">{reviewer.directReports} direct reports</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Completed</p>
                            <p className="font-semibold text-success">{reviewer.completed}/{reviewer.directReports}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <p className="font-semibold text-warning">{reviewer.pending}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Avg Rating</p>
                            <Badge variant="secondary">{reviewer.avgRating}/5</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Review Process Timeline Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {reviewTimelineData.map((stage, index) => (
                    <Card key={index} className="border-2 border-dashed border-border">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          stage.status === 'good' ? 'bg-success-muted' : 
                          stage.status === 'warning' ? 'bg-warning-muted' : 'bg-destructive-muted'
                        }`}>
                          <Clock className={`h-6 w-6 ${
                            stage.status === 'good' ? 'text-success' : 
                            stage.status === 'warning' ? 'text-warning' : 'text-destructive'
                          }`} />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{stage.stage}</h3>
                        <p className="text-2xl font-bold text-foreground mb-1">{stage.avgDays}</p>
                        <p className="text-sm text-muted-foreground mb-2">avg days</p>
                        <Badge variant={stage.status === 'good' ? 'default' : stage.status === 'warning' ? 'secondary' : 'destructive'}>
                          Target: {stage.target}d
                        </Badge>
                      </CardContent>
                    </Card>
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
          <h1 className="text-3xl font-semibold text-foreground mb-2">Review Reports</h1>
          <p className="text-muted-foreground">Comprehensive review cycle analytics and insights</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedCycle} onValueChange={setSelectedCycle}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q2-2024">Q2 2024</SelectItem>
              <SelectItem value="q3-2024">Q3 2024</SelectItem>
              <SelectItem value="q4-2024">Q4 2024</SelectItem>
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