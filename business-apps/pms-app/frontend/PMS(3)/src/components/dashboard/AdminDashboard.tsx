import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  ScatterChart, Scatter, ComposedChart
} from 'recharts';
import { 
  Building2, Users, TrendingUp, TrendingDown, AlertTriangle,
  Target, Award, Calendar, Settings, BarChart3,
  Activity, Zap, MessageSquare, Download, 
  Filter, Globe, Shield, Database
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

interface AdminDashboardProps {
  user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [selectedView, setSelectedView] = useState('overview');
  
  // Mock organization-wide data
  const orgStats = {
    totalEmployees: 247,
    departments: 8,
    activeGoals: 892,
    completedReviews: 186,
    avgPerformance: 4.1,
    retentionRate: 94.2
  };

  const departmentPerformance = [
    { dept: 'Engineering', employees: 45, avgRating: 4.3, goalCompletion: 87, satisfaction: 4.2 },
    { dept: 'Product', employees: 28, avgRating: 4.1, goalCompletion: 82, satisfaction: 4.0 },
    { dept: 'Design', employees: 18, avgRating: 4.2, goalCompletion: 89, satisfaction: 4.1 },
    { dept: 'Marketing', employees: 32, avgRating: 3.9, goalCompletion: 78, satisfaction: 3.8 },
    { dept: 'Sales', employees: 41, avgRating: 4.0, goalCompletion: 85, satisfaction: 3.9 },
    { dept: 'HR', employees: 12, avgRating: 4.2, goalCompletion: 91, satisfaction: 4.3 },
    { dept: 'Finance', employees: 15, avgRating: 4.1, goalCompletion: 88, satisfaction: 4.0 },
    { dept: 'Operations', employees: 56, avgRating: 3.8, goalCompletion: 76, satisfaction: 3.7 }
  ];

  const performanceTrends = [
    { month: 'Jul', performance: 3.8, engagement: 82, retention: 93.1, goals: 78 },
    { month: 'Aug', performance: 3.9, engagement: 84, retention: 93.5, goals: 81 },
    { month: 'Sep', performance: 4.0, engagement: 85, retention: 94.0, goals: 83 },
    { month: 'Oct', performance: 4.1, engagement: 87, retention: 94.2, goals: 85 },
    { month: 'Nov', performance: 4.2, engagement: 86, retention: 94.1, goals: 87 },
    { month: 'Dec', performance: 4.0, engagement: 83, retention: 93.8, goals: 84 },
    { month: 'Jan', performance: 4.1, engagement: 85, retention: 94.2, goals: 86 }
  ];

  const goalCategories = [
    { name: 'Technical Skills', value: 145, completion: 78, color: '#4285f4' },
    { name: 'Leadership', value: 89, completion: 82, color: '#34a853' },
    { name: 'Customer Focus', value: 156, completion: 74, color: '#ea4335' },
    { name: 'Innovation', value: 92, completion: 69, color: '#fbc02d' },
    { name: 'Process Improvement', value: 124, completion: 81, color: '#9aa0a6' },
    { name: 'Collaboration', value: 178, completion: 85, color: '#ab47bc' },
    { name: 'Communication', value: 108, completion: 88, color: '#ff7043' }
  ];

  const roleDistribution = [
    { role: 'Employees', count: 189, percentage: 76.5, color: '#4285f4' },
    { role: 'Team Leads', count: 32, percentage: 13.0, color: '#34a853' },
    { role: 'Managers', count: 18, percentage: 7.3, color: '#ea4335' },
    { role: 'Directors', count: 6, percentage: 2.4, color: '#fbc02d' },
    { role: 'Executives', count: 2, percentage: 0.8, color: '#9aa0a6' }
  ];

  const systemMetrics = [
    { metric: 'User Adoption', value: 94.2, trend: 'up', change: '+2.1%' },
    { metric: 'Goal Completion Rate', value: 82.5, trend: 'up', change: '+5.3%' },
    { metric: 'Review Completion', value: 87.8, trend: 'down', change: '-1.2%' },
    { metric: 'Platform Engagement', value: 78.9, trend: 'up', change: '+3.7%' }
  ];

  const upcomingEvents = [
    { event: 'Q1 Review Cycle Kickoff', date: '2025-02-15', participants: 247, status: 'scheduled' },
    { event: 'Performance Calibration', date: '2025-02-20', participants: 58, status: 'in-progress' },
    { event: 'Goal Setting Workshop', date: '2025-02-25', participants: 124, status: 'scheduled' },
    { event: 'Leadership Development', date: '2025-03-01', participants: 32, status: 'scheduled' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-primary/10 text-primary border-primary/20';
      case 'in-progress': return 'bg-warning/10 text-warning border-warning/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Organization Dashboard
          </h1>
          <p className="text-muted-foreground">
            Complete overview of performance across all departments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="google-button-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="google-button-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button className="google-button-primary">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-lg">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <span className="text-2xl font-bold text-foreground">
                  {orgStats.totalEmployees}
                </span>
              </div>
              <div className="w-12 h-12 bg-primary-muted radius-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <span className="text-2xl font-bold text-foreground">
                  {orgStats.departments}
                </span>
              </div>
              <div className="w-12 h-12 bg-success-muted radius-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Goals</p>
                <span className="text-2xl font-bold text-foreground">
                  {orgStats.activeGoals}
                </span>
              </div>
              <div className="w-12 h-12 bg-warning-muted radius-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <span className="text-2xl font-bold text-foreground">
                  {orgStats.avgPerformance}
                </span>
              </div>
              <div className="w-12 h-12 bg-destructive-muted radius-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Retention Rate</p>
                <span className="text-2xl font-bold text-foreground">
                  {orgStats.retentionRate}%
                </span>
              </div>
              <div className="w-12 h-12 bg-primary-muted radius-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reviews Done</p>
                <span className="text-2xl font-bold text-foreground">
                  {orgStats.completedReviews}
                </span>
              </div>
              <div className="w-12 h-12 bg-success-muted radius-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-4">
        <TabsList className="grid w-full lg:w-auto grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Organization Trends */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Organization Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={performanceTrends}>
                  <defs>
                    <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4285f4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4285f4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                  <XAxis dataKey="month" stroke="#9aa0a6" />
                  <YAxis yAxisId="left" stroke="#9aa0a6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9aa0a6" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #dadce0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(60,64,67,0.15)'
                    }} 
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="performance"
                    stroke="#4285f4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPerformance)"
                    name="Performance Score"
                  />
                  <Bar yAxisId="right" dataKey="goals" fill="#34a853" name="Goal Completion %" />
                  <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#ea4335" strokeWidth={2} name="Retention Rate" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* System Metrics and Role Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            {/* System Health Metrics */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-success" />
                  System Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{metric.metric}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-foreground">
                            {metric.value}%
                          </span>
                          <Badge className={`text-xs ${
                            metric.trend === 'up' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-destructive/10 text-destructive'
                          }`}>
                            {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {metric.change}
                          </Badge>
                        </div>
                      </div>
                      <ResponsiveContainer width={80} height={50}>
                        <AreaChart data={[
                          { value: metric.value - 5 },
                          { value: metric.value - 2 },
                          { value: metric.value + 1 },
                          { value: metric.value }
                        ]}>
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={metric.trend === 'up' ? '#34a853' : '#ea4335'}
                            fill={metric.trend === 'up' ? '#34a853' : '#ea4335'}
                            fillOpacity={0.2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Role Distribution */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Role Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={roleDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {roleDistribution.map((role) => (
                    <div key={role.role} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: role.color }}
                        />
                        <span className="text-sm text-foreground">{role.role}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-foreground">{role.count}</span>
                        <span className="text-xs text-muted-foreground ml-2">({role.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-warning" />
                Upcoming Organization Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{event.event}</h4>
                      <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Date: {event.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.participants} participants
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Department Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                  <XAxis dataKey="dept" stroke="#9aa0a6" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#9aa0a6" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #dadce0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="avgRating" fill="#4285f4" radius={[4, 4, 0, 0]} name="Avg Rating" />
                  <Bar dataKey="goalCompletion" fill="#34a853" radius={[4, 4, 0, 0]} name="Goal Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-warning" />
                Goal Categories Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={goalCategories} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                  <XAxis type="number" stroke="#9aa0a6" />
                  <YAxis dataKey="name" type="category" stroke="#9aa0a6" width={120} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #dadce0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {goalCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Performance vs Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="avgRating" name="Performance" stroke="#9aa0a6" />
                    <YAxis dataKey="satisfaction" name="Satisfaction" stroke="#9aa0a6" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #dadce0',
                        borderRadius: '8px'
                      }} 
                      cursor={{ strokeDasharray: '3 3' }} 
                    />
                    <Scatter dataKey="employees" fill="#4285f4" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#9aa0a6" />
                    <YAxis stroke="#9aa0a6" />
                    <Tooltip />
                    <Line type="monotone" dataKey="engagement" stroke="#34a853" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}