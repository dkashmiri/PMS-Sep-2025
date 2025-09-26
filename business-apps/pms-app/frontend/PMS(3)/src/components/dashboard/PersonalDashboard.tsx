import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Target, Award, 
  Calendar, CheckCircle, Clock, Star,
  BarChart3, Activity, Zap, Trophy
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

interface PersonalDashboardProps {
  user: User;
}

export function PersonalDashboard({ user }: PersonalDashboardProps) {
  // Mock data for personal dashboard
  const personalStats = {
    overallRating: 4.2,
    goalsCompleted: 8,
    totalGoals: 12,
    currentStreak: 15,
    reviewsCompleted: 3,
    nextReviewDue: '2025-02-15'
  };

  const goalProgress = [
    { name: 'Q1 Revenue Target', progress: 85, status: 'on-track', due: '2025-03-31' },
    { name: 'Team Collaboration', progress: 92, status: 'ahead', due: '2025-02-28' },
    { name: 'Skills Development', progress: 67, status: 'on-track', due: '2025-04-15' },
    { name: 'Customer Satisfaction', progress: 78, status: 'on-track', due: '2025-03-15' },
    { name: 'Process Improvement', progress: 45, status: 'behind', due: '2025-02-20' }
  ];

  const performanceTrend = [
    { month: 'Aug', score: 3.8, goals: 85 },
    { month: 'Sep', score: 4.0, goals: 88 },
    { month: 'Oct', score: 4.1, goals: 92 },
    { month: 'Nov', score: 4.3, goals: 89 },
    { month: 'Dec', score: 4.2, goals: 94 },
    { month: 'Jan', score: 4.4, goals: 87 }
  ];

  const skillsData = [
    { skill: 'Technical', current: 85, target: 90 },
    { skill: 'Leadership', current: 78, target: 85 },
    { skill: 'Communication', current: 92, target: 95 },
    { skill: 'Problem Solving', current: 88, target: 90 },
    { skill: 'Innovation', current: 75, target: 85 }
  ];

  const weeklyActivity = [
    { day: 'Mon', completed: 3, planned: 4 },
    { day: 'Tue', completed: 5, planned: 5 },
    { day: 'Wed', completed: 2, planned: 3 },
    { day: 'Thu', completed: 4, planned: 4 },
    { day: 'Fri', completed: 6, planned: 6 },
    { day: 'Sat', completed: 1, planned: 2 },
    { day: 'Sun', completed: 0, planned: 1 }
  ];

  const achievementCategories = [
    { name: 'Goals', value: 35, color: '#4285f4' },
    { name: 'Reviews', value: 25, color: '#34a853' },
    { name: 'Skills', value: 20, color: '#ea4335' },
    { name: 'Collaboration', value: 20, color: '#fbc02d' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'bg-success text-success-foreground';
      case 'on-track': return 'bg-primary text-primary-foreground';
      case 'behind': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ahead': return <TrendingUp className="w-3 h-3" />;
      case 'on-track': return <Target className="w-3 h-3" />;
      case 'behind': return <TrendingDown className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Good morning, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's how you're performing this month
          </p>
        </div>
        <Button className="google-button-primary">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule 1:1
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Rating</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-foreground">
                    {personalStats.overallRating}
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`w-4 h-4 ${
                          star <= personalStats.overallRating 
                            ? 'fill-warning text-warning' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-warning-muted radius-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-warning" />
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
                    {personalStats.goalsCompleted}/{personalStats.totalGoals}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    67%
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary-muted radius-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-foreground">
                    {personalStats.currentStreak}
                  </span>
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success-muted radius-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reviews Done</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-foreground">
                    {personalStats.reviewsCompleted}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    This cycle
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-destructive-muted radius-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Performance Trend */}
        <Card className="premium-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={performanceTrend}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285f4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4285f4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34a853" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#34a853" stopOpacity={0}/>
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
                  dataKey="score"
                  stroke="#4285f4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  name="Performance Score"
                />
                <Area
                  type="monotone"
                  dataKey="goals"
                  stroke="#34a853"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorGoals)"
                  name="Goal Completion %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Achievement Distribution */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={achievementCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {achievementCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #dadce0',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {achievementCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-foreground">{category.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals and Skills Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* Current Goals */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Current Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goalProgress.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{goal.name}</span>
                  <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
                    {getStatusIcon(goal.status)}
                    <span className="ml-1">{goal.status}</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={goal.progress} className="flex-1" />
                  <span className="text-xs text-muted-foreground w-12">
                    {goal.progress}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Due: {goal.due}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills Development */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-success" />
              Skills Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={skillsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                <XAxis type="number" domain={[0, 100]} stroke="#9aa0a6" />
                <YAxis dataKey="skill" type="category" stroke="#9aa0a6" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #dadce0',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="current" fill="#4285f4" radius={[0, 4, 4, 0]} />
                <Bar dataKey="target" fill="#e8e8e8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            This Week's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
              <XAxis dataKey="day" stroke="#9aa0a6" />
              <YAxis stroke="#9aa0a6" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #dadce0',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="completed" fill="#34a853" radius={[4, 4, 0, 0]} name="Completed" />
              <Bar dataKey="planned" fill="#e8e8e8" radius={[4, 4, 0, 0]} name="Planned" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}