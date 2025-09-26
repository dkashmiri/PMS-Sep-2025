import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, ScatterChart, Scatter
} from 'recharts';
import {
  Users, TrendingUp, TrendingDown, Target, AlertTriangle, Clock,
  Award, UserCheck, Calendar, MessageSquare, BarChart3,
  PieChart as PieChartIcon, Filter, Download, Plus, ArrowRight,
  Star, CheckCircle, XCircle, AlertCircle, Eye
} from 'lucide-react';
import { User } from '../../types/auth.types';

interface TeamDashboardProps {
  user: User;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  performanceScore: number;
  performanceZone: 'GREEN' | 'YELLOW' | 'RED';
  goalsCompleted: number;
  totalGoals: number;
  pendingReviews: number;
  lastActivity: string;
  needsAttention: boolean;
}

interface TeamStats {
  totalMembers: number;
  averagePerformance: number;
  pendingReviews: number;
  overDueGoals: number;
  teamGoalAchievement: number;
  activeGoals: number;
}

interface DepartmentComparison {
  department: string;
  averageScore: number;
  goalAchievement: number;
  memberCount: number;
}

export function TeamDashboard({ user }: TeamDashboardProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'needs_attention' | 'high_performers'>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

  // Mock data for team dashboard
  const teamStats: TeamStats = {
    totalMembers: 12,
    averagePerformance: 4.1,
    pendingReviews: 8,
    overDueGoals: 3,
    teamGoalAchievement: 78,
    activeGoals: 45
  };

  const teamMembers: TeamMember[] = [
    {
      id: '1', name: 'Sarah Johnson', role: 'Senior Developer', performanceScore: 4.5,
      performanceZone: 'GREEN', goalsCompleted: 8, totalGoals: 10, pendingReviews: 1,
      lastActivity: '2 hours ago', needsAttention: false
    },
    {
      id: '2', name: 'Mike Chen', role: 'Product Analyst', performanceScore: 4.2,
      performanceZone: 'GREEN', goalsCompleted: 6, totalGoals: 8, pendingReviews: 0,
      lastActivity: '1 day ago', needsAttention: false
    },
    {
      id: '3', name: 'Emily Davis', role: 'UX Designer', performanceScore: 3.8,
      performanceZone: 'YELLOW', goalsCompleted: 4, totalGoals: 9, pendingReviews: 2,
      lastActivity: '3 hours ago', needsAttention: true
    },
    {
      id: '4', name: 'Alex Turner', role: 'Junior Developer', performanceScore: 3.2,
      performanceZone: 'RED', goalsCompleted: 2, totalGoals: 7, pendingReviews: 3,
      lastActivity: '1 week ago', needsAttention: true
    },
    {
      id: '5', name: 'Lisa Wang', role: 'QA Engineer', performanceScore: 4.3,
      performanceZone: 'GREEN', goalsCompleted: 7, totalGoals: 8, pendingReviews: 0,
      lastActivity: '4 hours ago', needsAttention: false
    },
    {
      id: '6', name: 'David Rodriguez', role: 'DevOps Engineer', performanceScore: 4.0,
      performanceZone: 'GREEN', goalsCompleted: 5, totalGoals: 6, pendingReviews: 1,
      lastActivity: '6 hours ago', needsAttention: false
    }
  ];

  const performanceDistribution = [
    { zone: 'GREEN', count: 8, percentage: 67 },
    { zone: 'YELLOW', count: 3, percentage: 25 },
    { zone: 'RED', count: 1, percentage: 8 }
  ];

  const teamTrend = [
    { month: 'Sep', avgScore: 3.9, goalCompletion: 72, memberCount: 10 },
    { month: 'Oct', avgScore: 4.0, goalCompletion: 75, memberCount: 11 },
    { month: 'Nov', avgScore: 4.1, goalCompletion: 78, memberCount: 12 },
    { month: 'Dec', avgScore: 4.2, goalCompletion: 80, memberCount: 12 },
    { month: 'Jan', avgScore: 4.1, goalCompletion: 78, memberCount: 12 }
  ];

  const departmentComparisons: DepartmentComparison[] = [
    { department: 'Engineering', averageScore: 4.1, goalAchievement: 78, memberCount: 12 },
    { department: 'Product', averageScore: 4.3, goalAchievement: 82, memberCount: 8 },
    { department: 'Design', averageScore: 3.9, goalAchievement: 75, memberCount: 6 },
    { department: 'Marketing', averageScore: 4.0, goalAchievement: 77, memberCount: 10 },
    { department: 'Sales', averageScore: 4.4, goalAchievement: 85, memberCount: 15 }
  ];

  const goalCategoryAnalysis = [
    { category: 'Technical Skills', completed: 18, total: 25, avgRating: 4.2 },
    { category: 'Leadership', completed: 12, total: 18, avgRating: 3.8 },
    { category: 'Innovation', completed: 8, total: 15, avgRating: 4.0 },
    { category: 'Customer Focus', completed: 14, total: 20, avgRating: 4.1 },
    { category: 'Collaboration', completed: 22, total: 30, avgRating: 4.3 }
  ];

  const upcomingDeadlines = [
    { id: '1', employee: 'Emily Davis', task: 'Q1 Self Review', dueDate: '2025-02-01', priority: 'HIGH' },
    { id: '2', employee: 'Alex Turner', task: 'Technical Skills Goal Update', dueDate: '2025-02-03', priority: 'HIGH' },
    { id: '3', employee: 'Sarah Johnson', task: 'Leadership Assessment', dueDate: '2025-02-05', priority: 'MEDIUM' },
    { id: '4', employee: 'Mike Chen', task: 'Customer Feedback Collection', dueDate: '2025-02-07', priority: 'MEDIUM' }
  ];

  const developmentOpportunities = [
    { id: '1', employee: 'Alex Turner', area: 'Backend Development', recommendation: 'Advanced Node.js Course', priority: 'HIGH' },
    { id: '2', employee: 'Emily Davis', area: 'Leadership Skills', recommendation: 'Management Training Program', priority: 'MEDIUM' },
    { id: '3', employee: 'David Rodriguez', area: 'Cloud Architecture', recommendation: 'AWS Solutions Architect', priority: 'MEDIUM' }
  ];

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'GREEN': return 'text-green-600 bg-green-100';
      case 'YELLOW': return 'text-yellow-600 bg-yellow-100';
      case 'RED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    switch (selectedFilter) {
      case 'needs_attention': return member.needsAttention;
      case 'high_performers': return member.performanceScore >= 4.0;
      default: return true;
    }
  });

  const COLORS = {
    GREEN: '#10B981',
    YELLOW: '#F59E0B',
    RED: '#EF4444'
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your team's performance • {teamStats.totalMembers} team members
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => console.log('Export team report')}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Team Review
          </Button>
        </div>
      </div>

      {/* Attention Alerts */}
      {teamMembers.filter(m => m.needsAttention).length > 0 && (
        <Alert className="border-l-4 border-l-orange-500 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>{teamMembers.filter(m => m.needsAttention).length} team members</strong> need your attention.
            Check their performance and provide necessary support.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Team Avg Performance</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {teamStats.averagePerformance}
                  </span>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Goal Achievement</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {teamStats.teamGoalAchievement}%
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {teamStats.activeGoals} active
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {teamStats.pendingReviews}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    Action needed
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Team Members</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {teamStats.totalMembers}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {teamMembers.filter(m => m.needsAttention).length} need attention
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="development">Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Distribution and Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-purple-600" />
                  Performance Zone Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={performanceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {performanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.zone as keyof typeof COLORS]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {performanceDistribution.map((zone) => (
                    <div key={zone.zone} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[zone.zone as keyof typeof COLORS] }}
                        />
                        <span className="text-sm text-gray-900">{zone.zone} Zone</span>
                      </div>
                      <span className="text-sm text-gray-600">{zone.count} members ({zone.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Team Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={teamTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis yAxisId="left" stroke="#6B7280" />
                    <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="avgScore"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                    <Bar yAxisId="right" dataKey="goalCompletion" fill="#10B981" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Department Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Department Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentComparisons}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="department" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="averageScore" fill="#6366F1" name="Avg Score" />
                  <Bar dataKey="goalAchievement" fill="#10B981" name="Goal Achievement %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          {/* Team Member Filters */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                All Members ({teamMembers.length})
              </Button>
              <Button
                variant={selectedFilter === 'needs_attention' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('needs_attention')}
              >
                <AlertTriangle className="w-4 h-4 mr-1" />
                Needs Attention ({teamMembers.filter(m => m.needsAttention).length})
              </Button>
              <Button
                variant={selectedFilter === 'high_performers' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('high_performers')}
              >
                <Award className="w-4 h-4 mr-1" />
                High Performers ({teamMembers.filter(m => m.performanceScore >= 4.0).length})
              </Button>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className={`${member.needsAttention ? 'border-l-4 border-l-orange-500' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <Badge className={`text-xs ${getZoneColor(member.performanceZone)}`}>
                      {member.performanceZone}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Performance Score</span>
                      <span className="font-semibold">{member.performanceScore}/5.0</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Goals Progress</span>
                        <span className="text-sm font-medium">
                          {member.goalsCompleted}/{member.totalGoals}
                        </span>
                      </div>
                      <Progress
                        value={(member.goalsCompleted / member.totalGoals) * 100}
                        className="h-2"
                      />
                    </div>

                    {member.pendingReviews > 0 && (
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Clock className="w-4 h-4" />
                        {member.pendingReviews} pending reviews
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500">Last active: {member.lastActivity}</span>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {/* Goal Category Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Goal Category Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goalCategoryAnalysis.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{category.category}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {category.completed}/{category.total} completed
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{category.avgRating}</span>
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={(category.completed / category.total) * 100}
                      className="h-3"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Upcoming Review Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{deadline.employee}</h3>
                      <p className="text-sm text-gray-600">{deadline.task}</p>
                      <p className="text-xs text-gray-500 mt-1">Due: {deadline.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getPriorityColor(deadline.priority)}`}>
                        {deadline.priority}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Follow Up
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-6">
          {/* Development Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Team Development Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {developmentOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{opportunity.employee}</h3>
                      <Badge className={`text-xs ${getPriorityColor(opportunity.priority)}`}>
                        {opportunity.priority}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Focus Area:</strong> {opportunity.area}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Recommendation:</strong> {opportunity.recommendation}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        Schedule Discussion
                      </Button>
                      <Button size="sm">
                        Enroll Now <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}