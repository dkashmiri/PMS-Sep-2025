import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Target,
  Plus,
  Edit,
  Eye,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Upload,
  Download,
  Filter,
  Search,
  Star,
  TrendingUp,
  Award,
  Link
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
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
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
  milestones: string[];
  createdOn: string;
}

interface MyGoalsProps {
  user: User;
}

export function MyGoals({ user }: MyGoalsProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 'goal-001',
      title: 'Complete AWS Solutions Architect Certification',
      description: 'Obtain AWS Solutions Architect certification to enhance cloud skills and contribute to infrastructure projects',
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
      milestones: ['Complete course modules', 'Pass practice exams', 'Schedule certification exam', 'Pass certification'],
      createdOn: '2025-01-01'
    },
    {
      id: 'goal-002',
      title: 'Lead Cross-functional Project Initiative',
      description: 'Successfully lead a cross-functional project with 5+ team members to improve development workflow',
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
      milestones: ['Team formation', 'Project planning', 'Implementation', 'Delivery'],
      createdOn: '2025-02-01'
    },
    {
      id: 'goal-003',
      title: 'Implement Automated Code Review Process',
      description: 'Implement automated code review tools and reduce manual review time by 30%',
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
      milestones: ['Tool evaluation', 'Implementation', 'Team training', 'Monitoring'],
      createdOn: '2024-12-01'
    },
    {
      id: 'goal-004',
      title: 'Mentor Junior Developers',
      description: 'Provide mentorship to 2 junior developers and help them achieve their career goals',
      category: 'LEADERSHIP',
      priority: 'MEDIUM',
      status: 'ACTIVE',
      progress: 60,
      targetDate: '2025-12-31',
      startDate: '2025-01-15',
      achievement: 'IN_PROGRESS',
      evidenceCount: 4,
      managerApproved: true,
      targetValue: '2',
      currentValue: '2',
      measurementUnit: 'developers',
      milestones: ['Mentee selection', 'Goal setting', 'Regular check-ins', 'Skills development'],
      createdOn: '2025-01-15'
    },
    {
      id: 'goal-005',
      title: 'Learn React Native Development',
      description: 'Complete React Native course and build a mobile app prototype',
      category: 'PERSONAL',
      priority: 'LOW',
      status: 'ACTIVE',
      progress: 30,
      targetDate: '2025-08-31',
      startDate: '2025-02-15',
      achievement: 'IN_PROGRESS',
      evidenceCount: 1,
      managerApproved: false,
      targetValue: '1',
      currentValue: '0',
      measurementUnit: 'app',
      milestones: ['Course completion', 'Basic app', 'Advanced features', 'Deployment'],
      createdOn: '2025-02-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'TECHNICAL' as Goal['category'],
    priority: 'MEDIUM' as Goal['priority'],
    targetDate: '',
    targetValue: '',
    measurementUnit: '',
    kraId: 'none'
  });

  // Filter goals
  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || goal.category === filterCategory;
    const matchesStatus = filterStatus === 'ALL' || goal.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Statistics
  const completedGoals = goals.filter(g => g.status === 'COMPLETED').length;
  const activeGoals = goals.filter(g => g.status === 'ACTIVE').length;
  const overallProgress = Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length);
  const approvedGoals = goals.filter(g => g.managerApproved).length;

  const handleAddGoal = () => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      ...formData,
      kraId: formData.kraId === 'none' ? undefined : formData.kraId,
      status: 'ACTIVE',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      achievement: 'IN_PROGRESS',
      evidenceCount: 0,
      managerApproved: false,
      currentValue: '0',
      milestones: [],
      createdOn: new Date().toISOString().split('T')[0]
    };
    
    setGoals([...goals, newGoal]);
    setShowAddModal(false);
    resetForm();
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
      kraId: 'none'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Goals</h1>
          <p className="text-gray-600">Track and manage your performance goals</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
              </DialogHeader>
              <GoalForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleAddGoal}
                onCancel={() => setShowAddModal(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Goal Progress Hero */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1610540604745-3e96fba9ccef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2FsJTIwYWNoaWV2ZW1lbnQlMjBzdWNjZXNzJTIwY2hhcnR8ZW58MXx8fHwxNzU4Nzc3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Goal Achievement"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50" />
        </div>
        <CardContent className="relative p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{completedGoals}</p>
              <p className="text-sm text-gray-600">Completed Goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600">{activeGoals}</p>
              <p className="text-sm text-gray-600">Active Goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600">{overallProgress}%</p>
              <p className="text-sm text-gray-600">Overall Progress</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-orange-600">{approvedGoals}</p>
              <p className="text-sm text-gray-600">Manager Approved</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search goals by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
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
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="ON_HOLD">On Hold</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                    {goal.kraName && (
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <Link className="w-3 h-3" />
                        <span>{goal.kraName}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{goal.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {goal.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        goal.priority === 'CRITICAL' ? 'border-red-300 text-red-700' :
                        goal.priority === 'HIGH' ? 'border-orange-300 text-orange-700' :
                        goal.priority === 'MEDIUM' ? 'border-blue-300 text-blue-700' :
                        'border-gray-300 text-gray-700'
                      }`}
                    >
                      {goal.priority}
                    </Badge>
                    <Badge 
                      className={`text-xs ${
                        goal.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        goal.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
                        goal.status === 'ON_HOLD' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {goal.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedGoal(goal)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>{goal.currentValue} / {goal.targetValue} {goal.measurementUnit}</span>
                    {goal.status === 'COMPLETED' && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                        {goal.achievement}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Due: {goal.targetDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{goal.evidenceCount} evidence</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    {goal.managerApproved ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="text-xs text-gray-600">
                      {goal.managerApproved ? 'Manager Approved' : 'Pending Approval'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Upload className="w-3 h-3 mr-1" />
                      Evidence
                    </Button>
                    <Button size="sm" variant="outline">
                      Update Progress
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Goal Detail Modal */}
      {selectedGoal && (
        <Dialog open={!!selectedGoal} onOpenChange={() => setSelectedGoal(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {selectedGoal.title}
              </DialogTitle>
            </DialogHeader>
            <GoalDetails goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Goal Form Component
interface GoalFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

function GoalForm({ formData, setFormData, onSubmit, onCancel }: GoalFormProps) {
  return (
    <div className="space-y-6">
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your goal in detail"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="targetDate">Target Date</Label>
          <Input
            id="targetDate"
            type="date"
            value={formData.targetDate}
            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            required
          />
        </div>
        
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
          <Label htmlFor="measurementUnit">Unit</Label>
          <Input
            id="measurementUnit"
            value={formData.measurementUnit}
            onChange={(e) => setFormData({ ...formData, measurementUnit: e.target.value })}
            placeholder="%, hours, projects"
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
            <SelectItem value="none">No KRA</SelectItem>
            <SelectItem value="kra-001">Technical Excellence</SelectItem>
            <SelectItem value="kra-002">Process Improvement</SelectItem>
            <SelectItem value="kra-003">Leadership & Collaboration</SelectItem>
            <SelectItem value="kra-004">Customer Focus</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          Create Goal
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
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 mb-2">{goal.description}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{goal.category}</Badge>
            <Badge variant="outline">{goal.priority} Priority</Badge>
            <Badge className={
              goal.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
              goal.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }>
              {goal.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Progress Overview</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Overall Progress</span>
                <span className="text-sm font-medium">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Current Value</p>
                <p className="font-medium">{goal.currentValue} {goal.measurementUnit}</p>
              </div>
              <div>
                <p className="text-gray-600">Target Value</p>
                <p className="font-medium">{goal.targetValue} {goal.measurementUnit}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Timeline</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Start Date</span>
              <span>{goal.startDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Target Date</span>
              <span>{goal.targetDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Days Remaining</span>
              <span>{Math.max(0, Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      {goal.milestones.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Milestones</h4>
          <div className="space-y-2">
            {goal.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index < Math.floor(goal.progress / 25) ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {index < Math.floor(goal.progress / 25) ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  )}
                </div>
                <span className="text-sm">{milestone}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Evidence & Documentation</h4>
          <Button size="sm" variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload Evidence
          </Button>
        </div>
        <div className="p-4 border rounded-lg text-center text-gray-500">
          {goal.evidenceCount > 0 ? (
            <p>{goal.evidenceCount} evidence files uploaded</p>
          ) : (
            <p>No evidence uploaded yet</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          Edit Goal
        </Button>
        <Button>
          Update Progress
        </Button>
      </div>
    </div>
  );
}