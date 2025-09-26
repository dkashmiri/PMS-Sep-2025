import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter
} from 'recharts';
import { 
  Users, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Target, Award, Calendar, Clock, BarChart3,
  Activity, Zap, MessageSquare, Eye, Filter
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

interface ManagementDashboardProps {
  user: User;
}

export function ManagementDashboard({ user }: ManagementDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  // Mock team data
  const teamOverview = {
    totalMembers: 12,
    activeGoals: 48,
    completedGoals: 32,
    avgPerformance: 4.1,
    reviewsCompleted: 8,
    reviewsPending: 4
  };

  const teamMembers = [
    { 
      id: '1', name: 'Sarah Johnson', role: 'Senior Dev', 
      performance: 4.5, goalsCompleted: 8, goalsTotal: 10,
      lastActive: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=150&h=150&fit=crop&crop=face',
      status: 'excellent'
    },
    { 
      id: '2', name: 'Mike Chen', role: 'Product Designer', 
      performance: 4.2, goalsCompleted: 6, goalsTotal: 8,
      lastActive: '1 day ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'good'
    },
    { 
      id: '3', name: 'Emma Davis', role: 'Junior Dev', 
      performance: 3.8, goalsCompleted: 5, goalsTotal: 9,
      lastActive: '3 hours ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'good'
    },
    { 
      id: '4', name: 'David Wilson', role: 'QA Engineer', 
      performance: 3.2, goalsCompleted: 3, goalsTotal: 8,
      lastActive: '2 days ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'needs-attention'
    }
  ];

  const teamPerformanceTrend = [
    { month: 'Aug', avgScore: 3.9, goalCompletion: 78, teamSize: 10 },
    { month: 'Sep', avgScore: 4.0, goalCompletion: 82, teamSize: 11 },
    { month: 'Oct', avgScore: 4.1, goalCompletion: 85, teamSize: 11 },
    { month: 'Nov', avgScore: 4.2, goalCompletion: 88, teamSize: 12 },
    { month: 'Dec', avgScore: 4.0, goalCompletion: 84, teamSize: 12 },
    { month: 'Jan', avgScore: 4.1, goalCompletion: 87, teamSize: 12 }
  ];

  const goalCategories = [
    { category: 'Technical Skills', completed: 15, total: 20, color: '#4285f4' },
    { category: 'Leadership', completed: 8, total: 12, color: '#34a853' },
    { category: 'Process Improvement', completed: 6, total: 10, color: '#ea4335' },
    { category: 'Customer Focus', completed: 9, total: 14, color: '#fbc02d' },
    { category: 'Innovation', completed: 4, total: 8, color: '#9aa0a6' }
  ];

  const performanceDistribution = [
    { range: '4.5-5.0', count: 3, color: '#34a853' },
    { range: '4.0-4.4', count: 5, color: '#4285f4' },
    { range: '3.5-3.9', count: 3, color: '#fbc02d' },
    { range: '3.0-3.4', count: 1, color: '#ea4335' }
  ];

  const upcomingDeadlines = [
    { task: 'Q1 Review Cycle', assignee: 'Sarah Johnson', dueDate: '2025-02-15', priority: 'high' },
    { task: 'Skills Assessment', assignee: 'Mike Chen', dueDate: '2025-02-18', priority: 'medium' },
    { task: 'Goal Setting Session', assignee: 'Emma Davis', dueDate: '2025-02-20', priority: 'high' },
    { task: 'Performance Review', assignee: 'David Wilson', dueDate: '2025-02-25', priority: 'urgent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-success/10 text-success border-success/20';
      case 'good': return 'bg-primary/10 text-primary border-primary/20';
      case 'needs-attention': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Team Dashboard
          </h1>
          <p className="text-muted-foreground">
            Managing {teamOverview.totalMembers} team members in {user.department}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="google-button-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="google-button-primary">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Reviews
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-foreground">
                    {teamOverview.totalMembers}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    +1 this month
                  </Badge>
                </div>
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
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-foreground">
                    {teamOverview.avgPerformance}
                  </span>
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
              </div>
              <div className="w-12 h-12 bg-success-muted radius-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Goals Progress</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-foreground">
                    {teamOverview.completedGoals}/{teamOverview.activeGoals}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    67%
                  </Badge>
                </div>
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
                <p className="text-sm text-muted-foreground">Reviews Pending</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-foreground">
                    {teamOverview.reviewsPending}
                  </span>
                  {teamOverview.reviewsPending > 0 && (
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-destructive-muted radius-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="space-y-4">
        <TabsList className="grid w-full lg:w-auto grid-cols-3">
          <TabsTrigger value="month">This Month</TabsTrigger>
          <TabsTrigger value="quarter">This Quarter</TabsTrigger>
          <TabsTrigger value="year">This Year</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPeriod} className="space-y-6">
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            {/* Team Performance Trend */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Team Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={teamPerformanceTrend}>
                    <defs>
                      <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4285f4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4285f4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                    <XAxis dataKey="month" stroke="#9aa0a6" />
                    <YAxis stroke="#9aa0a6" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #dadce0',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(60,64,67,0.15)'
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="avgScore"
                      stroke="#4285f4"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPerformance)"
                      name="Avg Performance"
                    />
                    <Line
                      type="monotone"
                      dataKey="goalCompletion"
                      stroke="#34a853"
                      strokeWidth={2}
                      name="Goal Completion %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Distribution */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-success" />
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                    <XAxis dataKey="range" stroke="#9aa0a6" />
                    <YAxis stroke="#9aa0a6" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #dadce0',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {performanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Goal Categories Progress */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-warning" />
                Goal Categories Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goalCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {category.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {category.completed}/{category.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(category.completed / category.total) * 100}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Members & Upcoming Deadlines */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
            {/* Team Members */}
            <Card className="premium-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:surface-variant transition-premium">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {member.performance}/5.0
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {member.goalsCompleted}/{member.goalsTotal} goals
                          </p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                          {member.status.replace('-', ' ')}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-destructive" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="p-3 border border-border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{deadline.task}</p>
                        <Badge className={`text-xs ${getPriorityColor(deadline.priority)}`}>
                          {deadline.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{deadline.assignee}</p>
                      <p className="text-xs text-muted-foreground">Due: {deadline.dueDate}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}