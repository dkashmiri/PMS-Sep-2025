import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Target,
  TrendingUp,
  Award,
  Users,
  Settings,
  BarChart3,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  Calendar,
  Filter,
  Plus,
  ArrowRight,
  PieChart,
  Activity
} from 'lucide-react';

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

interface GoalManagementProps {
  user: User;
}

export function GoalManagement({ user }: GoalManagementProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard metrics
  const goalMetrics = {
    totalGoals: 156,
    activeGoals: 89,
    completedGoals: 52,
    overdue: 15,
    avgProgress: 68,
    krasAligned: 78,
    evidenceSubmitted: 245,
    approvalsPending: 23
  };

  const recentActivity = [
    {
      id: 1,
      type: 'goal_created',
      user: 'Sarah Johnson',
      action: 'created a new goal',
      goal: 'Complete React Certification',
      time: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'evidence_submitted',
      user: 'Michael Chen',
      action: 'submitted evidence for',
      goal: 'Lead Cross-functional Project',
      time: '4 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'goal_approved',
      user: 'Jessica Wong',
      action: 'approved goal',
      goal: 'Implement CI/CD Pipeline',
      time: '6 hours ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      type: 'goal_completed',
      user: 'David Kumar',
      action: 'completed goal',
      goal: 'Cloud Security Training',
      time: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const performanceZones = {
    green: { count: 89, percentage: 57, label: 'On Track' },
    yellow: { count: 45, percentage: 29, label: 'At Risk' },
    red: { count: 22, percentage: 14, label: 'Behind' }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'goal_created':
        return <Plus className="w-4 h-4 text-blue-500" />;
      case 'evidence_submitted':
        return <FileText className="w-4 h-4 text-green-500" />;
      case 'goal_approved':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'goal_completed':
        return <Award className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            Goal Management System
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive goal tracking, KRA alignment, and performance management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Hero Dashboard Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2FsJTIwbWFuYWdlbWVudCUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTg3Nzc0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Goal Management Dashboard"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-green-50/80" />
        </div>
        <CardContent className="relative p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl text-blue-600">{goalMetrics.totalGoals}</p>
              <p className="text-sm text-muted-foreground">Total Goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl text-green-600">{goalMetrics.completedGoals}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-3xl text-orange-600">{goalMetrics.activeGoals}</p>
              <p className="text-sm text-muted-foreground">Active Goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-3xl text-red-600">{goalMetrics.overdue}</p>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </div>
          </div>

          {/* Performance Zones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800">Green Zone</p>
                  <p className="text-2xl text-green-600">{performanceZones.green.count}</p>
                  <p className="text-sm text-green-700">{performanceZones.green.percentage}% {performanceZones.green.label}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-800">Yellow Zone</p>
                  <p className="text-2xl text-yellow-600">{performanceZones.yellow.count}</p>
                  <p className="text-sm text-yellow-700">{performanceZones.yellow.percentage}% {performanceZones.yellow.label}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-800">Red Zone</p>
                  <p className="text-2xl text-red-600">{performanceZones.red.count}</p>
                  <p className="text-sm text-red-700">{performanceZones.red.percentage}% {performanceZones.red.label}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="alignment" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            KRA Alignment
          </TabsTrigger>
          <TabsTrigger value="evidence" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Evidence
          </TabsTrigger>
          <TabsTrigger value="workflow" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Workflow
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Goal Progress Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Progress</span>
                        <span className="font-medium">{goalMetrics.avgProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${goalMetrics.avgProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">KRA Alignment</span>
                        <span className="font-medium">{goalMetrics.krasAligned}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${goalMetrics.krasAligned}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                    <div className="text-center">
                      <p className="text-2xl text-blue-600">{goalMetrics.evidenceSubmitted}</p>
                      <p className="text-sm text-muted-foreground">Evidence Files</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl text-orange-600">{goalMetrics.approvalsPending}</p>
                      <p className="text-sm text-muted-foreground">Pending Approvals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">My Goals</h3>
                        <p className="text-sm text-muted-foreground">View and manage your goals</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-blue-600">
                      <span>Open My Goals</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Team Goals</h3>
                        <p className="text-sm text-muted-foreground">Monitor team performance</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-green-600">
                      <span>View Team Goals</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className={`p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
                        index === 0 ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <img 
                              src={activity.avatar} 
                              alt={activity.user}
                              className="w-5 h-5 rounded-full"
                            />
                            <span className="text-sm font-medium">{activity.user}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity.action} <span className="font-medium text-foreground">"{activity.goal}"</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs content will be implemented in separate components */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Goal Analytics & Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Advanced analytics and trend analysis will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alignment">
          <Card>
            <CardHeader>
              <CardTitle>Goal-KRA Alignment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">KRA alignment scoring and management tools will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Management System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Evidence submission, review, and management tools will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow">
          <Card>
            <CardHeader>
              <CardTitle>15-Step Goal Workflow Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Comprehensive workflow management and process tracking will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting">
          <Card>
            <CardHeader>
              <CardTitle>Goal Performance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed reporting and cross-cycle achievement analysis will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}