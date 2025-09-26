import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  BarChart3,
  TrendingUp,
  Target,
  Users,
  Award,
  AlertTriangle,
  Calendar,
  PieChart,
  LineChart,
  Activity,
  Download,
  Filter,
  RefreshCw,
  Eye
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

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

interface AnalyticsDashboardProps {
  user: User;
}

// Mock data for analytics
const performanceTrendData = [
  { month: 'Jan', performance: 85, goals: 78, reviews: 82 },
  { month: 'Feb', performance: 88, goals: 82, reviews: 85 },
  { month: 'Mar', performance: 87, goals: 85, reviews: 88 },
  { month: 'Apr', performance: 91, goals: 89, reviews: 90 },
  { month: 'May', performance: 89, goals: 87, reviews: 92 },
  { month: 'Jun', performance: 93, goals: 91, reviews: 94 }
];

const departmentPerformanceData = [
  { department: 'Engineering', performance: 92, goals: 89, employees: 45 },
  { department: 'Sales', performance: 88, goals: 91, employees: 32 },
  { department: 'Marketing', performance: 85, goals: 87, employees: 28 },
  { department: 'HR', performance: 90, goals: 88, employees: 15 },
  { department: 'Finance', performance: 87, goals: 85, employees: 18 }
];

const goalStatusData = [
  { name: 'Completed', value: 342, color: '#34a853' },
  { name: 'In Progress', value: 156, color: '#4285f4' },
  { name: 'At Risk', value: 89, color: '#fbc02d' },
  { name: 'Overdue', value: 45, color: '#ea4335' }
];

const reviewCompletionData = [
  { cycle: 'Q1 2024', selfAssessment: 95, r1Review: 88, r2Review: 82, final: 78 },
  { cycle: 'Q2 2024', selfAssessment: 92, r1Review: 85, r2Review: 80, final: 75 },
  { cycle: 'Q3 2024', selfAssessment: 98, r1Review: 91, r2Review: 87, final: 82 },
  { cycle: 'Q4 2024', selfAssessment: 89, r1Review: 79, r2Review: 73, final: 68 }
];

export function AnalyticsDashboard({ user }: AnalyticsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const kpiCards = [
    {
      title: 'Overall Performance',
      value: '91.2%',
      change: '+5.3%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Average performance score'
    },
    {
      title: 'Goal Completion',
      value: '87.5%',
      change: '+12.1%',
      changeType: 'positive' as const,
      icon: Target,
      description: 'Goals completed on time'
    },
    {
      title: 'Active Employees',
      value: '138',
      change: '+8',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Employees in current cycle'
    },
    {
      title: 'Review Completion',
      value: '82.3%',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: Award,
      description: 'Reviews completed'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive performance insights and analytics</p>
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
          
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="premium-card hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  kpi.changeType === 'positive' ? 'bg-success-muted' : 'bg-destructive-muted'
                }`}>
                  <kpi.icon className={`h-6 w-6 ${
                    kpi.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  }`} />
                </div>
                <Badge variant={kpi.changeType === 'positive' ? 'default' : 'destructive'} className="text-xs">
                  {kpi.change}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{kpi.value}</h3>
                <h4 className="font-medium text-foreground mb-1">{kpi.title}</h4>
                <p className="text-sm text-muted-foreground">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="goals" className="gap-2">
            <Target className="h-4 w-4" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="reviews" className="gap-2">
            <Award className="h-4 w-4" />
            Reviews
          </TabsTrigger>
          <TabsTrigger value="teams" className="gap-2">
            <Users className="h-4 w-4" />
            Teams
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trend */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={performanceTrendData}>
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
                    <Line type="monotone" dataKey="performance" stroke="#4285f4" strokeWidth={3} />
                    <Line type="monotone" dataKey="goals" stroke="#34a853" strokeWidth={2} />
                    <Line type="monotone" dataKey="reviews" stroke="#fbc02d" strokeWidth={2} />
                  </RechartsLineChart>
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
                      data={goalStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {goalStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Department Performance Overview */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Department Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentPerformanceData}>
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
                  <Bar dataKey="performance" fill="#4285f4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="goals" fill="#34a853" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High Performers</p>
                    <p className="text-2xl font-bold text-success">42</p>
                    <p className="text-xs text-muted-foreground">Above 90% score</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Needs Support</p>
                    <p className="text-2xl font-bold text-warning">8</p>
                    <p className="text-xs text-muted-foreground">Below 70% score</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold text-primary">87.3%</p>
                    <p className="text-xs text-muted-foreground">Organization wide</p>
                  </div>
                  <Activity className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceTrendData}>
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
                  <Area type="monotone" dataKey="performance" stackId="1" stroke="#4285f4" fill="#4285f4" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="goals" stackId="1" stroke="#34a853" fill="#34a853" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {goalStatusData.map((status, index) => (
              <Card key={index} className="premium-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{status.name}</p>
                      <p className="text-2xl font-bold" style={{ color: status.color }}>{status.value}</p>
                    </div>
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: status.color }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Goal Achievement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={performanceTrendData}>
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
                  <Line type="monotone" dataKey="goals" stroke="#34a853" strokeWidth={3} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Review Completion Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reviewCompletionData}>
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
                  <Bar dataKey="selfAssessment" fill="#4285f4" />
                  <Bar dataKey="r1Review" fill="#34a853" />
                  <Bar dataKey="r2Review" fill="#fbc02d" />
                  <Bar dataKey="final" fill="#ea4335" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Team Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentPerformanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" />
                  <YAxis dataKey="department" type="category" stroke="var(--muted-foreground)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="performance" fill="#4285f4" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}