import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "sonner";
import {
  Target,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Link,
  Star,
  TrendingUp,
  Award,
  Zap,
  Users,
  Settings,
  BarChart3
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

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'TECHNICAL' | 'PROFESSIONAL' | 'PERSONAL' | 'LEADERSHIP';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
  progress: number;
  targetDate: string;
  startDate: string;
  achievement: 'EXCEEDED' | 'ACHIEVED' | 'PARTIALLY_ACHIEVED' | 'NOT_ACHIEVED' | 'IN_PROGRESS';
  kraId?: string;
  kraName?: string;
  evidenceCount: number;
  managerApproved: boolean;
  targetValue: string;
  currentValue: string;
  measurementUnit: string;
  milestones: Milestone[];
  createdOn: string;
  assignedTo?: string;
  assignedBy?: string;
  reviewCycle?: string;
  alignmentScore?: number;
  performanceZone: 'GREEN' | 'YELLOW' | 'RED';
  dependencies?: string[];
  tags?: string[];
}

interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  completedDate?: string;
}

interface GoalOperationsProps {
  user: User;
}

export function GoalOperations({ user }: GoalOperationsProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 'goal-001',
      title: 'Complete AWS Solutions Architect Certification',
      description: 'Obtain AWS Solutions Architect certification to enhance cloud skills and contribute to infrastructure projects. This includes completing all course modules, hands-on labs, and passing the certification exam.',
      category: 'TECHNICAL',
      priority: 'HIGH',
      status: 'ACTIVE',
      progress: 75,
      targetDate: '2025-03-31',
      startDate: '2025-01-01',
      achievement: 'IN_PROGRESS',
      kraId: 'kra-001',
      kraName: 'Technical Excellence',
      evidenceCount: 3,
      managerApproved: true,
      targetValue: '100',
      currentValue: '75',
      measurementUnit: '%',
      milestones: [
        { id: 'm1', title: 'Complete course modules', dueDate: '2025-02-15', completed: true, completedDate: '2025-02-10' },
        { id: 'm2', title: 'Pass practice exams', dueDate: '2025-03-01', completed: true, completedDate: '2025-02-28' },
        { id: 'm3', title: 'Schedule certification exam', dueDate: '2025-03-15', completed: false },
        { id: 'm4', title: 'Pass certification exam', dueDate: '2025-03-31', completed: false }
      ],
      createdOn: '2025-01-01',
      assignedTo: user.id,
      reviewCycle: '2025-Q1',
      alignmentScore: 95,
      performanceZone: 'GREEN',
      dependencies: [],
      tags: ['certification', 'aws', 'cloud']
    },
    {
      id: 'goal-002',
      title: 'Lead Cross-functional Project Initiative',
      description: 'Successfully lead a cross-functional project with 5+ team members to improve development workflow and reduce deployment time by 50%.',
      category: 'LEADERSHIP',
      priority: 'HIGH',
      status: 'ACTIVE',
      progress: 45,
      targetDate: '2025-06-30',
      startDate: '2025-02-01',
      achievement: 'IN_PROGRESS',
      kraId: 'kra-003',
      kraName: 'Leadership & Collaboration',
      evidenceCount: 2,
      managerApproved: true,
      targetValue: '1',
      currentValue: '0',
      measurementUnit: 'project',
      milestones: [
        { id: 'm5', title: 'Team formation and kickoff', dueDate: '2025-02-15', completed: true, completedDate: '2025-02-12' },
        { id: 'm6', title: 'Project planning and roadmap', dueDate: '2025-03-01', completed: false },
        { id: 'm7', title: 'Phase 1 implementation', dueDate: '2025-04-30', completed: false },
        { id: 'm8', title: 'Project delivery and handover', dueDate: '2025-06-30', completed: false }
      ],
      createdOn: '2025-02-01',
      assignedTo: user.id,
      reviewCycle: '2025-Q2',
      alignmentScore: 88,
      performanceZone: 'YELLOW',
      dependencies: ['goal-001'],
      tags: ['leadership', 'project-management', 'workflow']
    },
    {
      id: 'goal-003',
      title: 'Implement Automated Code Review Process',
      description: 'Implement automated code review tools and reduce manual review time by 30%. This includes tool evaluation, setup, team training, and monitoring.',
      category: 'PROFESSIONAL',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      progress: 100,
      targetDate: '2025-01-15',
      startDate: '2024-12-01',
      achievement: 'EXCEEDED',
      kraId: 'kra-002',
      kraName: 'Process Improvement',
      evidenceCount: 5,
      managerApproved: true,
      targetValue: '30',
      currentValue: '45',
      measurementUnit: '% reduction',
      milestones: [
        { id: 'm9', title: 'Tool evaluation and selection', dueDate: '2024-12-15', completed: true, completedDate: '2024-12-12' },
        { id: 'm10', title: 'Implementation and configuration', dueDate: '2025-01-05', completed: true, completedDate: '2025-01-03' },
        { id: 'm11', title: 'Team training sessions', dueDate: '2025-01-10', completed: true, completedDate: '2025-01-08' },
        { id: 'm12', title: 'Monitoring and optimization', dueDate: '2025-01-15', completed: true, completedDate: '2025-01-15' }
      ],
      createdOn: '2024-12-01',
      assignedTo: user.id,
      reviewCycle: '2025-Q1',
      alignmentScore: 92,
      performanceZone: 'GREEN',
      dependencies: [],
      tags: ['automation', 'code-review', 'efficiency']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'TECHNICAL' as Goal['category'],
    priority: 'MEDIUM' as Goal['priority'],
    targetDate: '',
    targetValue: '',
    measurementUnit: '',
    kraId: '',
    tags: '',
    dependencies: ''
  });

  // Filter goals based on search and filters
  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'ALL' || goal.category === filterCategory;
    const matchesStatus = filterStatus === 'ALL' || goal.status === filterStatus;
    const matchesPriority = filterPriority === 'ALL' || goal.priority === filterPriority;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my' && goal.assignedTo === user.id) ||
                      (activeTab === 'approved' && goal.managerApproved) ||
                      (activeTab === 'pending' && !goal.managerApproved) ||
                      (activeTab === 'completed' && goal.status === 'COMPLETED');
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesTab;
  });

  // Statistics
  const stats = {
    total: goals.length,
    active: goals.filter(g => g.status === 'ACTIVE').length,
    completed: goals.filter(g => g.status === 'COMPLETED').length,
    overdue: goals.filter(g => new Date(g.targetDate) < new Date() && g.status !== 'COMPLETED').length,
    avgProgress: Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length),
    approved: goals.filter(g => g.managerApproved).length
  };

  const handleCreateGoal = () => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      ...formData,
      status: 'DRAFT',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      achievement: 'IN_PROGRESS',
      evidenceCount: 0,
      managerApproved: false,
      currentValue: '0',
      milestones: [],
      createdOn: new Date().toISOString().split('T')[0],
      assignedTo: user.id,
      reviewCycle: `${new Date().getFullYear()}-Q${Math.ceil((new Date().getMonth() + 1) / 3)}`,
      alignmentScore: formData.kraId ? 85 : 0,
      performanceZone: 'GREEN',
      dependencies: formData.dependencies ? formData.dependencies.split(',').map(d => d.trim()) : [],
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
    };
    
    setGoals([...goals, newGoal]);
    setShowCreateModal(false);
    resetForm();
    toast.success("Goal created successfully!");
  };

  const handleEditGoal = () => {
    if (!selectedGoal) return;
    
    const updatedGoals = goals.map(goal => 
      goal.id === selectedGoal.id 
        ? { 
            ...goal, 
            ...formData,
            dependencies: formData.dependencies ? formData.dependencies.split(',').map(d => d.trim()) : [],
            tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
          }
        : goal
    );
    
    setGoals(updatedGoals);
    setShowEditModal(false);
    setSelectedGoal(null);
    resetForm();
    toast.success("Goal updated successfully!");
  };

  const handleDeleteGoal = () => {
    if (!selectedGoal) return;
    
    setGoals(goals.filter(goal => goal.id !== selectedGoal.id));
    setShowDeleteDialog(false);
    setSelectedGoal(null);
    toast.success("Goal deleted successfully!");
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'TECHNICAL',
      priority: 'MEDIUM',
      targetDate: '',
      targetValue: '',
      measurementUnit: '',
      kraId: '',
      tags: '',
      dependencies: ''
    });
  };

  const openEditModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      priority: goal.priority,
      targetDate: goal.targetDate,
      targetValue: goal.targetValue,
      measurementUnit: goal.measurementUnit,
      kraId: goal.kraId || '',
      tags: goal.tags?.join(', ') || '',
      dependencies: goal.dependencies?.join(', ') || ''
    });
    setShowEditModal(true);
  };

  const getPerformanceZoneColor = (zone: string) => {
    switch (zone) {
      case 'GREEN': return 'bg-green-100 text-green-800 border-green-200';
      case 'YELLOW': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'RED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'border-red-300 text-red-700 bg-red-50';
      case 'HIGH': return 'border-orange-300 text-orange-700 bg-orange-50';
      case 'MEDIUM': return 'border-blue-300 text-blue-700 bg-blue-50';
      case 'LOW': return 'border-gray-300 text-gray-700 bg-gray-50';
      default: return 'border-gray-300 text-gray-700 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'ACTIVE': return 'bg-blue-100 text-blue-800';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
            Goal Operations
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, manage, and track goals with comprehensive CRUD operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>
                  Create a new goal with detailed information, milestones, and KRA alignment.
                </DialogDescription>
              </DialogHeader>
              <GoalForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateGoal}
                onCancel={() => setShowCreateModal(false)}
                mode="create"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <p className="text-2xl text-blue-600">{stats.total}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl text-orange-600">{stats.active}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl text-red-600">{stats.overdue}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl text-purple-600">{stats.avgProgress}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl text-green-600">{stats.approved}</p>
              </div>
              <Award className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search goals by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="TECHNICAL">Technical</SelectItem>
                <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                <SelectItem value="PERSONAL">Personal</SelectItem>
                <SelectItem value="LEADERSHIP">Leadership</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="ON_HOLD">On Hold</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Priorities</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Goals ({goals.length})</TabsTrigger>
          <TabsTrigger value="my">My Goals ({goals.filter(g => g.assignedTo === user.id).length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({goals.filter(g => g.managerApproved).length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({goals.filter(g => !g.managerApproved).length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({goals.filter(g => g.status === 'COMPLETED').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredGoals.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Goals Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterCategory !== 'ALL' || filterStatus !== 'ALL' || filterPriority !== 'ALL'
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Create your first goal to get started.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredGoals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {/* Goal Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{goal.title}</h3>
                          {goal.kraName && (
                            <div className="flex items-center gap-1 text-xs text-blue-600">
                              <Link className="w-3 h-3" />
                              <span>{goal.kraName}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {goal.description}
                        </p>
                        
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {goal.category}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(goal.priority)}`}>
                            {goal.priority}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
                            {goal.status}
                          </Badge>
                          <Badge className={`text-xs border ${getPerformanceZoneColor(goal.performanceZone)}`}>
                            {goal.performanceZone} Zone
                          </Badge>
                          {goal.alignmentScore && goal.alignmentScore > 0 && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <Zap className="w-3 h-3" />
                              <span>{goal.alignmentScore}% aligned</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedGoal(goal)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(goal)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setSelectedGoal(goal);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                        <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                          <span>{goal.currentValue} / {goal.targetValue} {goal.measurementUnit}</span>
                          {goal.status === 'COMPLETED' && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              {goal.achievement}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Milestones Preview */}
                      {goal.milestones.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">Milestones</span>
                            <Badge variant="outline" className="text-xs">
                              {goal.milestones.filter(m => m.completed).length} / {goal.milestones.length}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            {goal.milestones.slice(0, 4).map((milestone, index) => (
                              <div
                                key={milestone.id}
                                className={`w-4 h-4 rounded-full border-2 ${
                                  milestone.completed
                                    ? 'bg-green-500 border-green-500'
                                    : 'bg-gray-200 border-gray-300'
                                }`}
                              />
                            ))}
                            {goal.milestones.length > 4 && (
                              <span className="text-xs text-muted-foreground ml-1">
                                +{goal.milestones.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {goal.tags && goal.tags.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap">
                          {goal.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              #{tag}
                            </Badge>
                          ))}
                          {goal.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{goal.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Due: {goal.targetDate}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{goal.evidenceCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {goal.managerApproved ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {goal.managerApproved ? 'Approved' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Goal Detail Modal */}
      {selectedGoal && !showEditModal && (
        <Dialog open={!!selectedGoal} onOpenChange={() => setSelectedGoal(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {selectedGoal.title}
              </DialogTitle>
              <DialogDescription>
                Detailed view of goal progress and information
              </DialogDescription>
            </DialogHeader>
            <GoalDetails goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>
              Update goal information and settings
            </DialogDescription>
          </DialogHeader>
          <GoalForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleEditGoal}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedGoal(null);
              resetForm();
            }}
            mode="edit"
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Goal</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this goal? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteGoal}>
              Delete Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Goal Form Component
interface GoalFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

function GoalForm({ formData, setFormData, onSubmit, onCancel, mode }: GoalFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Goal Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter goal title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="targetDate">Target Date *</Label>
          <Input
            id="targetDate"
            type="date"
            value={formData.targetDate}
            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your goal in detail"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TECHNICAL">Technical</SelectItem>
              <SelectItem value="PROFESSIONAL">Professional</SelectItem>
              <SelectItem value="PERSONAL">Personal</SelectItem>
              <SelectItem value="LEADERSHIP">Leadership</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="targetValue">Target Value</Label>
          <Input
            id="targetValue"
            value={formData.targetValue}
            onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
            placeholder="100"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="measurementUnit">Measurement Unit</Label>
          <Input
            id="measurementUnit"
            value={formData.measurementUnit}
            onChange={(e) => setFormData({ ...formData, measurementUnit: e.target.value })}
            placeholder="%, hours, projects, etc."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="kraId">Link to KRA (Optional)</Label>
        <Select
          value={formData.kraId}
          onValueChange={(value) => setFormData({ ...formData, kraId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select KRA to link" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No KRA</SelectItem>
            <SelectItem value="kra-001">Technical Excellence</SelectItem>
            <SelectItem value="kra-002">Process Improvement</SelectItem>
            <SelectItem value="kra-003">Leadership & Collaboration</SelectItem>
            <SelectItem value="kra-004">Customer Focus</SelectItem>
            <SelectItem value="kra-005">Innovation & Learning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="certification, aws, cloud"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dependencies">Dependencies (comma-separated Goal IDs)</Label>
          <Input
            id="dependencies"
            value={formData.dependencies}
            onChange={(e) => setFormData({ ...formData, dependencies: e.target.value })}
            placeholder="goal-001, goal-002"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          {mode === 'create' ? 'Create Goal' : 'Update Goal'}
        </Button>
      </div>
    </div>
  );
}

// Goal Details Component
interface GoalDetailsProps {
  goal: Goal;
  onClose: () => void;
}

function GoalDetails({ goal, onClose }: GoalDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Goal Header */}
      <div className="border-b pb-4">
        <p className="text-muted-foreground mb-3">{goal.description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">{goal.category}</Badge>
          <Badge variant="outline">{goal.priority} Priority</Badge>
          <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
          <Badge className={`border ${getPerformanceZoneColor(goal.performanceZone)}`}>
            {goal.performanceZone} Zone
          </Badge>
          {goal.alignmentScore && goal.alignmentScore > 0 && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {goal.alignmentScore}% KRA Aligned
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <div>
          <h4 className="font-medium mb-3">Progress Overview</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="text-sm font-medium">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Current Value</p>
                <p className="font-medium">{goal.currentValue} {goal.measurementUnit}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Target Value</p>
                <p className="font-medium">{goal.targetValue} {goal.measurementUnit}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h4 className="font-medium mb-3">Timeline</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Start Date</span>
              <span>{goal.startDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Target Date</span>
              <span>{goal.targetDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Days Remaining</span>
              <span>{Math.max(0, Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Review Cycle</span>
              <span>{goal.reviewCycle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      {goal.milestones.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Milestones</h4>
          <div className="space-y-2">
            {goal.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  milestone.completed ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {milestone.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{milestone.title}</p>
                  {milestone.description && (
                    <p className="text-xs text-muted-foreground">{milestone.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Due: {milestone.dueDate}
                    {milestone.completed && milestone.completedDate && (
                      <span className="text-green-600 ml-2">
                        (Completed: {milestone.completedDate})
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tags */}
        {goal.tags && goal.tags.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {goal.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Dependencies */}
        {goal.dependencies && goal.dependencies.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Dependencies</h4>
            <div className="space-y-2">
              {goal.dependencies.map((dep, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Link className="w-4 h-4 text-muted-foreground" />
                  <span>{dep}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Status Information */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="font-medium flex items-center gap-2">
              {goal.managerApproved ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Clock className="w-4 h-4 text-yellow-500" />
              )}
              {goal.managerApproved ? 'Manager Approved' : 'Pending Approval'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Evidence Files</p>
            <p className="font-medium">{goal.evidenceCount} files uploaded</p>
          </div>
          <div>
            <p className="text-muted-foreground">Created On</p>
            <p className="font-medium">{goal.createdOn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getStatusColor(status: string) {
  switch (status) {
    case 'COMPLETED': return 'bg-green-100 text-green-800';
    case 'ACTIVE': return 'bg-blue-100 text-blue-800';
    case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
    case 'CANCELLED': return 'bg-red-100 text-red-800';
    case 'DRAFT': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPerformanceZoneColor(zone: string) {
  switch (zone) {
    case 'GREEN': return 'bg-green-100 text-green-800 border-green-200';
    case 'YELLOW': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'RED': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}