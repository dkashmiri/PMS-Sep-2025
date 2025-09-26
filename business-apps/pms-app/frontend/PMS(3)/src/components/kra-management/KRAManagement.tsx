import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { KRAOperations } from './KRAOperations';
import { KRAMapping } from './KRAMapping';
import { KRATemplates } from './KRATemplates';
import { KRABulkOperations } from './KRABulkOperations';
import {
  Target,
  Network,
  FileText,
  Database,
  TrendingUp,
  Users,
  Building,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Star,
  Zap,
  Settings,
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

interface KRAManagementProps {
  user: User;
}

interface KRAStats {
  totalKRAs: number;
  activeKRAs: number;
  draftKRAs: number;
  approvedKRAs: number;
  totalMappings: number;
  activeMappings: number;
  totalTemplates: number;
  publishedTemplates: number;
  totalOperations: number;
  runningOperations: number;
  averageRating: number;
  usageStats: {
    individual: number;
    team: number;
    organizational: number;
  };
  departmentStats: {
    name: string;
    kraCount: number;
    mappingCount: number;
  }[];
  recentActivity: {
    id: string;
    type: 'KRA_CREATED' | 'MAPPING_ADDED' | 'TEMPLATE_PUBLISHED' | 'BULK_IMPORT' | 'KRA_APPROVED';
    title: string;
    description: string;
    timestamp: string;
    user: string;
    status: 'SUCCESS' | 'WARNING' | 'ERROR';
  }[];
}

export function KRAManagement({ user }: KRAManagementProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock comprehensive KRA statistics
  const kraStats: KRAStats = {
    totalKRAs: 342,
    activeKRAs: 298,
    draftKRAs: 23,
    approvedKRAs: 275,
    totalMappings: 156,
    activeMappings: 142,
    totalTemplates: 28,
    publishedTemplates: 22,
    totalOperations: 45,
    runningOperations: 2,
    averageRating: 4.7,
    usageStats: {
      individual: 185,
      team: 89,
      organizational: 68
    },
    departmentStats: [
      { name: 'Engineering', kraCount: 145, mappingCount: 62 },
      { name: 'Sales & Marketing', kraCount: 78, mappingCount: 34 },
      { name: 'Human Resources', kraCount: 45, mappingCount: 28 },
      { name: 'Finance', kraCount: 38, mappingCount: 18 },
      { name: 'Operations', kraCount: 36, mappingCount: 14 }
    ],
    recentActivity: [
      {
        id: 'act-001',
        type: 'KRA_CREATED',
        title: 'New KRA: Customer Success Excellence',
        description: 'Created for Sales department with 25% weightage',
        timestamp: '2024-01-25T10:30:00Z',
        user: 'Sarah Johnson',
        status: 'SUCCESS'
      },
      {
        id: 'act-002',
        type: 'BULK_IMPORT',
        title: 'Q1 KRA Import Completed',
        description: '45 KRAs imported with 2 warnings',
        timestamp: '2024-01-25T09:15:00Z',
        user: 'Admin',
        status: 'WARNING'
      },
      {
        id: 'act-003',
        type: 'TEMPLATE_PUBLISHED',
        title: 'Template: Team Lead Framework',
        description: 'Published to template library',
        timestamp: '2024-01-25T08:45:00Z',
        user: 'Michael Chen',
        status: 'SUCCESS'
      },
      {
        id: 'act-004',
        type: 'MAPPING_ADDED',
        title: 'Role Mapping: Senior Developer',
        description: 'Mapped 4 KRAs to senior developer role',
        timestamp: '2024-01-24T16:20:00Z',
        user: 'Jessica Wong',
        status: 'SUCCESS'
      },
      {
        id: 'act-005',
        type: 'KRA_APPROVED',
        title: 'KRA Approval: Innovation & Research',
        description: 'Approved for Engineering department',
        timestamp: '2024-01-24T14:10:00Z',
        user: 'HR Manager',
        status: 'SUCCESS'
      },
      {
        id: 'act-006',
        type: 'BULK_IMPORT',
        title: 'HRMS Sync Failed',
        description: 'Connection timeout during sync operation',
        timestamp: '2024-01-24T08:00:00Z',
        user: 'System',
        status: 'ERROR'
      }
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'KRA_CREATED': return <Target className="w-4 h-4" />;
      case 'MAPPING_ADDED': return <Network className="w-4 h-4" />;
      case 'TEMPLATE_PUBLISHED': return <FileText className="w-4 h-4" />;
      case 'BULK_IMPORT': return <Database className="w-4 h-4" />;
      case 'KRA_APPROVED': return <CheckCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'KRA_CREATED': return 'from-blue-400 to-blue-600';
      case 'MAPPING_ADDED': return 'from-purple-400 to-purple-600';
      case 'TEMPLATE_PUBLISHED': return 'from-green-400 to-green-600';
      case 'BULK_IMPORT': return 'from-cyan-400 to-cyan-600';
      case 'KRA_APPROVED': return 'from-emerald-400 to-emerald-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'bg-green-100 text-green-800';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800';
      case 'ERROR': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 via-blue-50/20 to-indigo-50/30">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1>KRA Management Center</h1>
                <p className="text-muted-foreground mt-1">Comprehensive KRA lifecycle management with enterprise-grade controls</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
              <Target className="w-4 h-4 mr-1" />
              {kraStats.totalKRAs} Total KRAs
            </Badge>
            <Badge className="bg-green-100 text-green-800 px-3 py-1">
              <CheckCircle className="w-4 h-4 mr-1" />
              {kraStats.activeKRAs} Active
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
              <Star className="w-4 h-4 mr-1" />
              {kraStats.averageRating}/5 Rating
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-1 h-14">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-gray-700 data-[state=active]:text-white rounded-xl h-10 transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="operations" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl h-10 transition-all duration-300"
            >
              <Target className="w-4 h-4 mr-2" />
              Operations
            </TabsTrigger>
            <TabsTrigger 
              value="mapping" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl h-10 transition-all duration-300"
            >
              <Network className="w-4 h-4 mr-2" />
              Mapping
            </TabsTrigger>
            <TabsTrigger 
              value="templates" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-xl h-10 transition-all duration-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger 
              value="bulk" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl h-10 transition-all duration-300"
            >
              <Database className="w-4 h-4 mr-2" />
              Bulk Operations
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/30 rounded-full blur-xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{kraStats.activeKRAs}</p>
                      <p className="text-sm text-gray-600">Active KRAs</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {kraStats.totalKRAs} total • {kraStats.draftKRAs} draft
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-purple-600/30 rounded-full blur-xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Network className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Mapped</Badge>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{kraStats.activeMappings}</p>
                      <p className="text-sm text-gray-600">Active Mappings</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {kraStats.totalMappings} total • Auto-assign enabled
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{kraStats.publishedTemplates}</p>
                      <p className="text-sm text-gray-600">Published Templates</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {kraStats.totalTemplates} total • {kraStats.averageRating}/5 rating
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-cyan-600/30 rounded-full blur-xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={kraStats.runningOperations > 0 ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                        {kraStats.runningOperations > 0 ? 'Active' : 'Idle'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{kraStats.totalOperations}</p>
                      <p className="text-sm text-gray-600">Bulk Operations</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {kraStats.runningOperations} running • All time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* KRA Distribution Chart */}
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    KRA Distribution by Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
                        <span className="text-sm font-medium text-gray-700">Individual KRAs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${(kraStats.usageStats.individual / kraStats.totalKRAs) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{kraStats.usageStats.individual}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded"></div>
                        <span className="text-sm font-medium text-gray-700">Team KRAs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                            style={{ width: `${(kraStats.usageStats.team / kraStats.totalKRAs) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{kraStats.usageStats.team}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded"></div>
                        <span className="text-sm font-medium text-gray-700">Organizational KRAs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${(kraStats.usageStats.organizational / kraStats.totalKRAs) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{kraStats.usageStats.organizational}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total KRAs:</span>
                      <span className="font-semibold text-gray-900">{kraStats.totalKRAs}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Overview */}
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    Department Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {kraStats.departmentStats.map((dept, index) => (
                      <div key={dept.name} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                            index === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                            index === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                            index === 2 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                            index === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                            'bg-gradient-to-br from-pink-400 to-pink-600'
                          }`}>
                            <Building className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{dept.name}</p>
                            <p className="text-sm text-gray-500">{dept.mappingCount} mappings</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">{dept.kraCount}</p>
                          <p className="text-xs text-gray-500">KRAs</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kraStats.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50/30 rounded-xl hover:bg-gray-50/50 transition-all duration-200">
                      <div className={`w-10 h-10 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                        {getActivityIcon(activity.type)}
                        <span className="text-white"></span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 line-clamp-1">{activity.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{activity.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-gray-500">
                                {new Date(activity.timestamp).toLocaleDateString()} at {new Date(activity.timestamp).toLocaleTimeString()}
                              </span>
                              <span className="text-xs text-gray-500">by {activity.user}</span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="bg-white/80 hover:bg-white/90">
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KRA Operations Tab */}
          <TabsContent value="operations">
            <KRAOperations user={user} />
          </TabsContent>

          {/* KRA Mapping Tab */}
          <TabsContent value="mapping">
            <KRAMapping user={user} />
          </TabsContent>

          {/* KRA Templates Tab */}
          <TabsContent value="templates">
            <KRATemplates user={user} />
          </TabsContent>

          {/* Bulk Operations Tab */}
          <TabsContent value="bulk">
            <KRABulkOperations user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}