import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { 
  GitBranch, 
  ArrowRight, 
  Play, 
  Pause, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Bell,
  Mail,
  Calendar,
  Target,
  FileText,
  Send,
  RefreshCcw,
  Activity,
  BarChart3,
  Eye,
  Filter,
  Search
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

interface ReviewWorkflowsProps {
  user: User;
}

interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  order: number;
  estimatedDays: number;
  isRequired: boolean;
  assigneeRole: 'Employee' | 'TeamLead' | 'Manager' | 'HR' | 'Admin';
  autoAdvance: boolean;
  reminders: {
    beforeDue: number[];
    afterOverdue: number[];
  };
  conditions: string[];
}

interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  triggerType: 'Time-based' | 'Status-based' | 'Score-based' | 'Manual';
  condition: string;
  action: string;
  isActive: boolean;
  priority: 'Low' | 'Medium' | 'High';
  lastTriggered?: Date;
  triggerCount: number;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  type: 'Annual' | 'Quarterly' | 'Project-Based' | 'Custom';
  isActive: boolean;
  isDefault: boolean;
  stages: WorkflowStage[];
  rules: WorkflowRule[];
  totalDuration: number;
  usageCount: number;
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  employeeId: string;
  employeeName: string;
  department: string;
  currentStage: number;
  status: 'Active' | 'Completed' | 'Paused' | 'Cancelled';
  startDate: Date;
  expectedEndDate: Date;
  actualEndDate?: Date;
  delayDays: number;
  stageProgress: {
    stageId: string;
    status: 'Pending' | 'Active' | 'Completed' | 'Overdue';
    startDate?: Date;
    endDate?: Date;
    assignee: string;
  }[];
}

const mockWorkflowStages: WorkflowStage[] = [
  {
    id: 'stage-1',
    name: 'Self-Assessment',
    description: 'Employee completes self-evaluation',
    order: 1,
    estimatedDays: 7,
    isRequired: true,
    assigneeRole: 'Employee',
    autoAdvance: true,
    reminders: {
      beforeDue: [3, 1],
      afterOverdue: [1, 3, 7]
    },
    conditions: ['All sections completed', 'Rating provided for all items']
  },
  {
    id: 'stage-2',
    name: 'R1 Review',
    description: 'Team Lead conducts first level review',
    order: 2,
    estimatedDays: 5,
    isRequired: true,
    assigneeRole: 'TeamLead',
    autoAdvance: true,
    reminders: {
      beforeDue: [2, 1],
      afterOverdue: [1, 2, 5]
    },
    conditions: ['Review completed', 'Comments provided', 'Rating submitted']
  },
  {
    id: 'stage-3',
    name: 'R2 Review',
    description: 'Manager conducts final review',
    order: 3,
    estimatedDays: 3,
    isRequired: true,
    assigneeRole: 'Manager',
    autoAdvance: false,
    reminders: {
      beforeDue: [1],
      afterOverdue: [1, 3]
    },
    conditions: ['Final rating confirmed', 'Development plan approved']
  }
];

const mockWorkflowRules: WorkflowRule[] = [
  {
    id: 'rule-1',
    name: 'Auto-remind before deadline',
    description: 'Send automatic reminders 3 days and 1 day before stage deadline',
    triggerType: 'Time-based',
    condition: '3 days before stage deadline',
    action: 'Send email reminder to assignee',
    isActive: true,
    priority: 'Medium',
    lastTriggered: new Date('2024-02-25'),
    triggerCount: 45
  },
  {
    id: 'rule-2',
    name: 'Escalate overdue reviews',
    description: 'Escalate to manager when review is overdue by 2+ days',
    triggerType: 'Status-based',
    condition: 'Stage overdue by 2+ days',
    action: 'Escalate to next level manager',
    isActive: true,
    priority: 'High',
    lastTriggered: new Date('2024-02-26'),
    triggerCount: 12
  },
  {
    id: 'rule-3',
    name: 'Low score follow-up',
    description: 'Trigger development planning for scores below 3.0',
    triggerType: 'Score-based',
    condition: 'Overall score < 3.0',
    action: 'Create development plan task',
    isActive: true,
    priority: 'High',
    lastTriggered: new Date('2024-02-22'),
    triggerCount: 8
  }
];

const mockWorkflowTemplates: WorkflowTemplate[] = [
  {
    id: 'workflow-1',
    name: 'Standard Annual Review',
    description: 'Standard 3-stage annual performance review process',
    type: 'Annual',
    isActive: true,
    isDefault: true,
    stages: mockWorkflowStages,
    rules: mockWorkflowRules,
    totalDuration: 15,
    usageCount: 145,
    createdBy: 'HR Admin',
    createdDate: new Date('2024-01-10'),
    lastModified: new Date('2024-02-15')
  },
  {
    id: 'workflow-2',
    name: 'Quarterly Goal Review',
    description: 'Simplified 2-stage quarterly goal assessment',
    type: 'Quarterly',
    isActive: true,
    isDefault: false,
    stages: mockWorkflowStages.slice(0, 2),
    rules: mockWorkflowRules.slice(0, 2),
    totalDuration: 12,
    usageCount: 89,
    createdBy: 'Manager',
    createdDate: new Date('2024-02-01'),
    lastModified: new Date('2024-02-20')
  }
];

const mockWorkflowExecutions: WorkflowExecution[] = [
  {
    id: 'exec-1',
    workflowId: 'workflow-1',
    workflowName: 'Standard Annual Review',
    employeeId: 'emp-1',
    employeeName: 'Sarah Johnson',
    department: 'Engineering',
    currentStage: 2,
    status: 'Active',
    startDate: new Date('2024-02-01'),
    expectedEndDate: new Date('2024-02-16'),
    delayDays: 2,
    stageProgress: [
      {
        stageId: 'stage-1',
        status: 'Completed',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-06'),
        assignee: 'Sarah Johnson'
      },
      {
        stageId: 'stage-2',
        status: 'Overdue',
        startDate: new Date('2024-02-07'),
        assignee: 'Michael Chen'
      },
      {
        stageId: 'stage-3',
        status: 'Pending',
        assignee: 'David Kim'
      }
    ]
  }
];

export function ReviewWorkflows({ user }: ReviewWorkflowsProps) {
  const [activeTab, setActiveTab] = useState('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTemplate | null>(null);
  const [showCreateWorkflow, setShowCreateWorkflow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Annual': return 'bg-blue-100 text-blue-800';
      case 'Quarterly': return 'bg-green-100 text-green-800';
      case 'Project-Based': return 'bg-orange-100 text-orange-800';
      case 'Custom': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTriggerTypeIcon = (type: string) => {
    switch (type) {
      case 'Time-based': return <Clock className="w-4 h-4" />;
      case 'Status-based': return <CheckCircle className="w-4 h-4" />;
      case 'Score-based': return <BarChart3 className="w-4 h-4" />;
      case 'Manual': return <Users className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getStageIcon = (assigneeRole: string) => {
    switch (assigneeRole) {
      case 'Employee': return <Users className="w-4 h-4" />;
      case 'TeamLead': return <Target className="w-4 h-4" />;
      case 'Manager': return <CheckCircle className="w-4 h-4" />;
      case 'HR': return <FileText className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-google-gray-900">Review Workflows</h1>
          <p className="text-google-gray-600 mt-1">Configure and monitor review process workflows</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Sync Workflows
          </Button>
          <Button variant="outline" className="gap-2">
            <Activity className="w-4 h-4" />
            Monitor
          </Button>
          <Button className="gap-2 google-button-primary" onClick={() => setShowCreateWorkflow(true)}>
            <Plus className="w-4 h-4" />
            Create Workflow
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Active Workflows</p>
                <p className="text-2xl font-bold text-google-gray-900">6</p>
              </div>
              <div className="w-12 h-12 bg-primary-muted rounded-xl flex items-center justify-center">
                <GitBranch className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Running Processes</p>
                <p className="text-2xl font-bold text-google-gray-900">143</p>
              </div>
              <div className="w-12 h-12 bg-success-muted rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Overdue Stages</p>
                <p className="text-2xl font-bold text-google-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-destructive-muted rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Automation Rules</p>
                <p className="text-2xl font-bold text-google-gray-900">24</p>
              </div>
              <div className="w-12 h-12 bg-warning-muted rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflows" className="gap-2">
            <GitBranch className="w-4 h-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="executions" className="gap-2">
            <Activity className="w-4 h-4" />
            Executions
          </TabsTrigger>
          <TabsTrigger value="rules" className="gap-2">
            <Settings className="w-4 h-4" />
            Automation Rules
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Monitoring
          </TabsTrigger>
        </TabsList>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  Workflow Templates
                </CardTitle>
                <Button className="google-button-primary" onClick={() => setShowCreateWorkflow(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workflow
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-google-gray-400" />
                    <Input
                      placeholder="Search workflows..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 premium-input"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Project-Based">Project-Based</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Workflow Templates List */}
              <div className="space-y-6">
                {mockWorkflowTemplates.map((workflow) => (
                  <div key={workflow.id} className="border border-google-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{workflow.name}</h3>
                          <Badge className={getStatusColor(workflow.isActive ? 'Active' : 'Inactive')}>
                            {workflow.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge className={getTypeColor(workflow.type)}>{workflow.type}</Badge>
                          {workflow.isDefault && (
                            <Badge className="bg-blue-100 text-blue-800">Default</Badge>
                          )}
                        </div>
                        <p className="text-google-gray-600 mb-3">{workflow.description}</p>
                        <div className="flex items-center gap-6 text-sm text-google-gray-500">
                          <span>📊 {workflow.stages.length} stages</span>
                          <span>⚡ {workflow.rules.length} automation rules</span>
                          <span>📅 {workflow.totalDuration} days duration</span>
                          <span>👥 {workflow.usageCount} uses</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedWorkflow(workflow)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {workflow.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Workflow Stages */}
                    <div className="bg-google-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-google-gray-700 mb-3">Workflow Stages</p>
                      <div className="flex items-center space-x-2 overflow-x-auto">
                        {workflow.stages.map((stage, index) => (
                          <React.Fragment key={stage.id}>
                            <div className="flex-shrink-0 text-center">
                              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-2">
                                {getStageIcon(stage.assigneeRole)}
                                <span className="sr-only">{stage.name}</span>
                              </div>
                              <p className="text-xs font-medium text-google-gray-700">{stage.name}</p>
                              <p className="text-xs text-google-gray-500">{stage.estimatedDays}d</p>
                            </div>
                            {index < workflow.stages.length - 1 && (
                              <ArrowRight className="w-4 h-4 text-google-gray-400 flex-shrink-0" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Executions Tab */}
        <TabsContent value="executions" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Workflow Executions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWorkflowExecutions.map((execution) => (
                  <div key={execution.id} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{execution.employeeName}</h3>
                          <Badge className={getStatusColor(execution.status)}>{execution.status}</Badge>
                        </div>
                        <p className="text-sm text-google-gray-600 mb-1">{execution.workflowName} • {execution.department}</p>
                        <div className="flex items-center gap-4 text-sm text-google-gray-500">
                          <span>Started: {execution.startDate.toLocaleDateString()}</span>
                          <span>Expected: {execution.expectedEndDate.toLocaleDateString()}</span>
                          {execution.delayDays > 0 && (
                            <span className="text-red-600">{execution.delayDays} days overdue</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Stage Progress */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-google-gray-700">Progress</p>
                      <div className="flex items-center space-x-4">
                        {execution.stageProgress.map((stage, index) => (
                          <React.Fragment key={stage.stageId}>
                            <div className="flex-1 text-center">
                              <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                                stage.status === 'Completed' ? 'bg-green-500 text-white' :
                                stage.status === 'Active' ? 'bg-blue-500 text-white' :
                                stage.status === 'Overdue' ? 'bg-red-500 text-white' :
                                'bg-google-gray-300 text-google-gray-600'
                              }`}>
                                {stage.status === 'Completed' ? <CheckCircle className="w-4 h-4" /> :
                                 stage.status === 'Overdue' ? <AlertCircle className="w-4 h-4" /> :
                                 <Clock className="w-4 h-4" />}
                              </div>
                              <p className="text-xs font-medium">{stage.assignee}</p>
                              <Badge className={getStatusColor(stage.status)} variant="outline">
                                {stage.status}
                              </Badge>
                            </div>
                            {index < execution.stageProgress.length - 1 && (
                              <ArrowRight className="w-4 h-4 text-google-gray-400" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Automation Rules
                </CardTitle>
                <Button className="google-button-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWorkflowRules.map((rule) => (
                  <div key={rule.id} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{rule.name}</h3>
                          <Badge className={rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {rule.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge className={getPriorityColor(rule.priority)}>{rule.priority}</Badge>
                        </div>
                        <p className="text-sm text-google-gray-600 mb-3">{rule.description}</p>
                        
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-google-gray-500 mb-1">Trigger Type</p>
                            <div className="flex items-center gap-2">
                              {getTriggerTypeIcon(rule.triggerType)}
                              <span className="text-sm font-medium">{rule.triggerType}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-google-gray-500 mb-1">Condition</p>
                            <p className="text-sm font-medium">{rule.condition}</p>
                          </div>
                          <div>
                            <p className="text-xs text-google-gray-500 mb-1">Action</p>
                            <p className="text-sm font-medium">{rule.action}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-google-gray-500">
                          <span>🔥 Triggered {rule.triggerCount} times</span>
                          {rule.lastTriggered && (
                            <span>⏰ Last: {rule.lastTriggered.toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {rule.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Workflow Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>On-time completion</span>
                    <span className="font-bold">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Average completion time</span>
                    <span className="font-bold">13.2 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Rule effectiveness</span>
                    <span className="font-bold">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Stage Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Self-Assessment</span>
                    <span className="font-bold">4.2 days avg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>R1 Review</span>
                    <span className="font-bold">3.8 days avg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>R2 Review</span>
                    <span className="font-bold">2.1 days avg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">Workflow completed: Sarah Johnson</p>
                    <p className="text-sm text-google-gray-600">Standard Annual Review • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="font-medium">Reminder sent: Michael Chen</p>
                    <p className="text-sm text-google-gray-600">R1 Review due in 1 day • 4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                  <Clock className="w-5 h-5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium">Stage overdue: Alex Rodriguez</p>
                    <p className="text-sm text-google-gray-600">Self-Assessment 2 days overdue • 6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}