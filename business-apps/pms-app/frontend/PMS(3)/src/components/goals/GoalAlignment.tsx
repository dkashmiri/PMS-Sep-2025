import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from "sonner";
import {
  Zap,
  Target,
  Link,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Filter,
  Search,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Settings,
  Download,
  Upload,
  Plus
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

interface GoalKRAAlignment {
  id: string;
  goalId: string;
  goalTitle: string;
  goalCategory: string;
  goalPriority: string;
  kraId: string;
  kraTitle: string;
  kraWeight: number;
  alignmentScore: number;
  alignmentType: 'DIRECT' | 'INDIRECT' | 'WEAK' | 'NO_ALIGNMENT';
  contributionLevel: 'PRIMARY' | 'SECONDARY' | 'SUPPORTING';
  mappedBy: string;
  mappedByName: string;
  mappedDate: string;
  approvedBy?: string;
  approvedByName?: string;
  approvedDate?: string;
  status: 'ACTIVE' | 'PENDING' | 'APPROVED' | 'REJECTED';
  impactScore: number;
  dependencies: string[];
  synergies: string[];
  conflicts: string[];
  notes: string;
}

interface GoalAlignmentProps {
  user: User;
}

// Mock alignment data
const mockAlignments: GoalKRAAlignment[] = [
  {
    id: 'align-001',
    goalId: 'goal-001',
    goalTitle: 'Complete AWS Solutions Architect Certification',
    goalCategory: 'TECHNICAL',
    goalPriority: 'HIGH',
    kraId: 'kra-001',
    kraTitle: 'Technical Excellence & Innovation',
    kraWeight: 30,
    alignmentScore: 95,
    alignmentType: 'DIRECT',
    contributionLevel: 'PRIMARY',
    mappedBy: 'user-employee',
    mappedByName: 'Sarah Johnson',
    mappedDate: '2025-01-15',
    approvedBy: 'user-manager',
    approvedByName: 'Michael Chen',
    approvedDate: '2025-01-16',
    status: 'APPROVED',
    impactScore: 92,
    dependencies: [],
    synergies: ['goal-003'],
    conflicts: [],
    notes: 'Direct alignment with technical excellence KRA. High impact on cloud capabilities.'
  },
  {
    id: 'align-002',
    goalId: 'goal-002',
    goalTitle: 'Lead Cross-functional Project Initiative',
    goalCategory: 'LEADERSHIP',
    goalPriority: 'HIGH',
    kraId: 'kra-003',
    kraTitle: 'Leadership & Team Management',
    kraWeight: 25,
    alignmentScore: 88,
    alignmentType: 'DIRECT',
    contributionLevel: 'PRIMARY',
    mappedBy: 'user-employee',
    mappedByName: 'Sarah Johnson',
    mappedDate: '2025-02-01',
    approvedBy: 'user-manager',
    approvedByName: 'Michael Chen',
    approvedDate: '2025-02-02',
    status: 'APPROVED',
    impactScore: 85,
    dependencies: ['goal-001'],
    synergies: ['goal-004'],
    conflicts: [],
    notes: 'Strong alignment with leadership KRA. Demonstrates cross-functional leadership skills.'
  },
  {
    id: 'align-003',
    goalId: 'goal-002',
    goalTitle: 'Lead Cross-functional Project Initiative',
    goalCategory: 'LEADERSHIP',
    goalPriority: 'HIGH',
    kraId: 'kra-002',
    kraTitle: 'Process Improvement & Efficiency',
    kraWeight: 20,
    alignmentScore: 72,
    alignmentType: 'INDIRECT',
    contributionLevel: 'SECONDARY',
    mappedBy: 'user-employee',
    mappedByName: 'Sarah Johnson',
    mappedDate: '2025-02-01',
    approvedBy: 'user-manager',
    approvedByName: 'Michael Chen',
    approvedDate: '2025-02-02',
    status: 'APPROVED',
    impactScore: 68,
    dependencies: [],
    synergies: [],
    conflicts: [],
    notes: 'Indirect alignment through process optimization aspects of the project.'
  },
  {
    id: 'align-004',
    goalId: 'goal-003',
    goalTitle: 'Implement Automated Code Review Process',
    goalCategory: 'PROFESSIONAL',
    goalPriority: 'MEDIUM',
    kraId: 'kra-002',
    kraTitle: 'Process Improvement & Efficiency',
    kraWeight: 20,
    alignmentScore: 90,
    alignmentType: 'DIRECT',
    contributionLevel: 'PRIMARY',
    mappedBy: 'user-employee',
    mappedByName: 'Sarah Johnson',
    mappedDate: '2024-12-01',
    approvedBy: 'user-manager',
    approvedByName: 'Michael Chen',
    approvedDate: '2024-12-02',
    status: 'APPROVED',
    impactScore: 88,
    dependencies: [],
    synergies: ['goal-001'],
    conflicts: [],
    notes: 'Perfect alignment with process improvement KRA. Significant efficiency gains expected.'
  },
  {
    id: 'align-005',
    goalId: 'goal-005',
    goalTitle: 'Learn React Native Development',
    goalCategory: 'PERSONAL',
    goalPriority: 'LOW',
    kraId: 'kra-001',
    kraTitle: 'Technical Excellence & Innovation',
    kraWeight: 30,
    alignmentScore: 65,
    alignmentType: 'INDIRECT',
    contributionLevel: 'SUPPORTING',
    mappedBy: 'user-employee',
    mappedByName: 'Sarah Johnson',
    mappedDate: '2025-02-15',
    status: 'PENDING',
    impactScore: 45,
    dependencies: [],
    synergies: [],
    conflicts: [],
    notes: 'Moderate alignment with technical excellence. Personal development with potential business impact.'
  }
];

export function GoalAlignment({ user }: GoalAlignmentProps) {
  const [alignments, setAlignments] = useState<GoalKRAAlignment[]>(mockAlignments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterAlignment, setFilterAlignment] = useState('ALL');
  const [selectedAlignment, setSelectedAlignment] = useState<GoalKRAAlignment | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Filter alignments
  const filteredAlignments = alignments.filter(alignment => {
    const matchesSearch = alignment.goalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alignment.kraTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || alignment.status === filterStatus;
    const matchesAlignment = filterAlignment === 'ALL' || alignment.alignmentType === filterAlignment;
    
    return matchesSearch && matchesStatus && matchesAlignment;
  });

  // Statistics
  const stats = {
    totalAlignments: alignments.length,
    directAlignments: alignments.filter(a => a.alignmentType === 'DIRECT').length,
    avgAlignmentScore: Math.round(alignments.reduce((acc, a) => acc + a.alignmentScore, 0) / alignments.length),
    pendingApprovals: alignments.filter(a => a.status === 'PENDING').length,
    highImpact: alignments.filter(a => a.impactScore >= 80).length,
    synergies: alignments.reduce((acc, a) => acc + a.synergies.length, 0),
    conflicts: alignments.reduce((acc, a) => acc + a.conflicts.length, 0)
  };

  const getAlignmentColor = (type: string) => {
    switch (type) {
      case 'DIRECT': return 'bg-green-100 text-green-800 border-green-200';
      case 'INDIRECT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'WEAK': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'NO_ALIGNMENT': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getContributionColor = (level: string) => {
    switch (level) {
      case 'PRIMARY': return 'bg-purple-100 text-purple-800';
      case 'SECONDARY': return 'bg-blue-100 text-blue-800';
      case 'SUPPORTING': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'ACTIVE': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRecalculateAlignment = () => {
    // In a real app, this would trigger AI-based alignment calculation
    toast.success("Alignment scores recalculated successfully!");
  };

  const handleBulkApproval = () => {
    const pendingAlignments = alignments.filter(a => a.status === 'PENDING');
    const approved = alignments.map(a => 
      a.status === 'PENDING' 
        ? { 
            ...a, 
            status: 'APPROVED' as const, 
            approvedBy: user.id, 
            approvedByName: user.name,
            approvedDate: new Date().toISOString().split('T')[0]
          }
        : a
    );
    setAlignments(approved);
    toast.success(`${pendingAlignments.length} alignments approved successfully!`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Goal-KRA Alignment Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and optimize goal-KRA alignments with intelligent scoring and impact analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleRecalculateAlignment}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Recalculate
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {(user.role === 'ADMIN' || user.role === 'HR' || user.role === 'MANAGER') && (
            <Button size="sm" onClick={handleBulkApproval}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Bulk Approve
            </Button>
          )}
        </div>
      </div>

      {/* Hero Dashboard Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2FsJTIwYWxpZ25tZW50JTIwc3RyYXRlZ3l8ZW58MXx8fHwxNzU4Nzc3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Goal KRA Alignment"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/80 via-blue-50/80 to-green-50/80" />
        </div>
        <CardContent className="relative p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl text-green-600">{stats.totalAlignments}</p>
              <p className="text-sm text-muted-foreground">Total Alignments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl text-blue-600">{stats.avgAlignmentScore}%</p>
              <p className="text-sm text-muted-foreground">Avg Alignment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl text-purple-600">{stats.highImpact}</p>
              <p className="text-sm text-muted-foreground">High Impact</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-3xl text-orange-600">{stats.pendingApprovals}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800">Direct Alignments</p>
                  <p className="text-2xl text-green-600">{stats.directAlignments}</p>
                  <p className="text-sm text-green-700">{Math.round((stats.directAlignments / stats.totalAlignments) * 100)}% of total</p>
                </div>
                <Link className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800">Synergies Found</p>
                  <p className="text-2xl text-blue-600">{stats.synergies}</p>
                  <p className="text-sm text-blue-700">Cross-goal benefits</p>
                </div>
                <Award className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-800">Conflicts Detected</p>
                  <p className="text-2xl text-yellow-600">{stats.conflicts}</p>
                  <p className="text-sm text-yellow-700">Need resolution</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="alignments" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Alignments
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Optimization
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alignment Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Alignment Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['DIRECT', 'INDIRECT', 'WEAK', 'NO_ALIGNMENT'].map((type) => {
                    const count = alignments.filter(a => a.alignmentType === type).length;
                    const percentage = Math.round((count / alignments.length) * 100);
                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{type.replace('_', ' ')}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{count}</span>
                            <Badge className={`text-xs border ${getAlignmentColor(type)}`}>
                              {percentage}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top KRAs by Alignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Top KRAs by Alignment Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    alignments.reduce((acc, alignment) => {
                      if (!acc[alignment.kraTitle]) {
                        acc[alignment.kraTitle] = {
                          count: 0,
                          avgScore: 0,
                          totalScore: 0
                        };
                      }
                      acc[alignment.kraTitle].count++;
                      acc[alignment.kraTitle].totalScore += alignment.alignmentScore;
                      acc[alignment.kraTitle].avgScore = Math.round(acc[alignment.kraTitle].totalScore / acc[alignment.kraTitle].count);
                      return acc;
                    }, {} as Record<string, { count: number; avgScore: number; totalScore: number }>)
                  )
                    .sort(([, a], [, b]) => b.avgScore - a.avgScore)
                    .slice(0, 5)
                    .map(([kraTitle, data]) => (
                      <div key={kraTitle} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{kraTitle}</h4>
                          <Badge variant="outline" className="text-xs">
                            {data.avgScore}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{data.count} goals aligned</span>
                          <Progress value={data.avgScore} className="w-20 h-1" />
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alignments Tab */}
        <TabsContent value="alignments" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search goals or KRAs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterAlignment} onValueChange={setFilterAlignment}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Alignment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Types</SelectItem>
                    <SelectItem value="DIRECT">Direct</SelectItem>
                    <SelectItem value="INDIRECT">Indirect</SelectItem>
                    <SelectItem value="WEAK">Weak</SelectItem>
                    <SelectItem value="NO_ALIGNMENT">No Alignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Alignments List */}
          <div className="space-y-4">
            {filteredAlignments.map((alignment) => (
              <Card key={alignment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{alignment.goalTitle}</h3>
                        <Badge variant="outline" className="text-xs">
                          {alignment.goalCategory}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Link className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{alignment.kraTitle}</span>
                        <Badge variant="outline" className="text-xs">
                          {alignment.kraWeight}% weight
                        </Badge>
                      </div>
                      
                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge className={`text-xs border ${getAlignmentColor(alignment.alignmentType)}`}>
                          {alignment.alignmentType.replace('_', ' ')}
                        </Badge>
                        <Badge className={`text-xs ${getContributionColor(alignment.contributionLevel)}`}>
                          {alignment.contributionLevel}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(alignment.status)}`}>
                          {alignment.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Scores */}
                    <div className="text-right">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-center">
                          <p className="text-2xl text-blue-600">{alignment.alignmentScore}%</p>
                          <p className="text-xs text-muted-foreground">Alignment</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl text-green-600">{alignment.impactScore}%</p>
                          <p className="text-xs text-muted-foreground">Impact</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedAlignment(alignment)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Alignment Score</span>
                        <span className="text-xs font-medium">{alignment.alignmentScore}%</span>
                      </div>
                      <Progress value={alignment.alignmentScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Impact Score</span>
                        <span className="text-xs font-medium">{alignment.impactScore}%</span>
                      </div>
                      <Progress value={alignment.impactScore} className="h-2" />
                    </div>
                  </div>

                  {/* Synergies and Conflicts */}
                  {(alignment.synergies.length > 0 || alignment.conflicts.length > 0) && (
                    <div className="flex items-center gap-4 text-xs">
                      {alignment.synergies.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3 text-green-500" />
                          <span className="text-green-600">{alignment.synergies.length} synergies</span>
                        </div>
                      )}
                      {alignment.conflicts.length > 0 && (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                          <span className="text-red-600">{alignment.conflicts.length} conflicts</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t text-xs text-muted-foreground">
                    <span>Mapped by {alignment.mappedByName} on {alignment.mappedDate}</span>
                    {alignment.approvedByName && (
                      <span>Approved by {alignment.approvedByName}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Alignment Analytics & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Advanced analytics and trend analysis will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle>Alignment Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI-powered optimization suggestions will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alignment Detail Modal */}
      {selectedAlignment && (
        <Dialog open={!!selectedAlignment} onOpenChange={() => setSelectedAlignment(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Alignment Details
              </DialogTitle>
              <DialogDescription>
                Detailed analysis of goal-KRA alignment
              </DialogDescription>
            </DialogHeader>
            <AlignmentDetails alignment={selectedAlignment} onClose={() => setSelectedAlignment(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Alignment Details Component
interface AlignmentDetailsProps {
  alignment: GoalKRAAlignment;
  onClose: () => void;
}

function AlignmentDetails({ alignment, onClose }: AlignmentDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={`border ${getAlignmentColor(alignment.alignmentType)}`}>
              {alignment.alignmentType.replace('_', ' ')}
            </Badge>
            <Badge className={getContributionColor(alignment.contributionLevel)}>
              {alignment.contributionLevel}
            </Badge>
            <Badge className={getStatusColor(alignment.status)}>
              {alignment.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl text-blue-600">{alignment.alignmentScore}%</p>
              <p className="text-xs text-muted-foreground">Alignment</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-green-600">{alignment.impactScore}%</p>
              <p className="text-xs text-muted-foreground">Impact</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goal Information */}
        <div>
          <h4 className="font-medium mb-3">Goal Information</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Goal Title</p>
              <p className="font-medium">{alignment.goalTitle}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              <p>{alignment.goalCategory}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Priority</p>
              <p>{alignment.goalPriority}</p>
            </div>
          </div>
        </div>

        {/* KRA Information */}
        <div>
          <h4 className="font-medium mb-3">KRA Information</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">KRA Title</p>
              <p className="font-medium">{alignment.kraTitle}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Weight</p>
              <p>{alignment.kraWeight}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Contribution Level</p>
              <p>{alignment.contributionLevel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alignment Scores */}
      <div>
        <h4 className="font-medium mb-3">Alignment Analysis</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Alignment Score</span>
              <span className="font-medium">{alignment.alignmentScore}%</span>
            </div>
            <Progress value={alignment.alignmentScore} className="h-3" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Impact Score</span>
              <span className="font-medium">{alignment.impactScore}%</span>
            </div>
            <Progress value={alignment.impactScore} className="h-3" />
          </div>
        </div>
      </div>

      {/* Dependencies, Synergies, Conflicts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alignment.dependencies.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Dependencies</h4>
            <div className="space-y-2">
              {alignment.dependencies.map((dep, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{dep}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {alignment.synergies.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Synergies</h4>
            <div className="space-y-2">
              {alignment.synergies.map((syn, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-green-500" />
                  <span>{syn}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {alignment.conflicts.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Conflicts</h4>
            <div className="space-y-2">
              {alignment.conflicts.map((conflict, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>{conflict}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      {alignment.notes && (
        <div>
          <h4 className="font-medium mb-3">Notes</h4>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm">{alignment.notes}</p>
          </div>
        </div>
      )}

      {/* Mapping Information */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Mapped by</p>
            <p className="font-medium">{alignment.mappedByName} on {alignment.mappedDate}</p>
          </div>
          {alignment.approvedByName && (
            <div>
              <p className="text-muted-foreground">Approved by</p>
              <p className="font-medium">{alignment.approvedByName} on {alignment.approvedDate}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button>
          Edit Alignment
        </Button>
      </div>
    </div>
  );
}

// Helper functions (reused)
function getAlignmentColor(type: string) {
  switch (type) {
    case 'DIRECT': return 'bg-green-100 text-green-800 border-green-200';
    case 'INDIRECT': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'WEAK': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'NO_ALIGNMENT': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getContributionColor(level: string) {
  switch (level) {
    case 'PRIMARY': return 'bg-purple-100 text-purple-800';
    case 'SECONDARY': return 'bg-blue-100 text-blue-800';
    case 'SUPPORTING': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-800';
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'REJECTED': return 'bg-red-100 text-red-800';
    case 'ACTIVE': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}