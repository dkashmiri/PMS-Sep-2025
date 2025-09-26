import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { 
  FileText, 
  Calendar,
  Users, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  Plus,
  Download,
  Settings,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  Award,
  Star,
  BarChart3,
  Send,
  MessageSquare,
  ArrowRight,
  Play,
  Pause,
  RefreshCcw,
  Copy,
  FileDown,
  Bell
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

interface ReviewOperationsProps {
  user: User;
}

interface ReviewProcess {
  id: string;
  employeeName: string;
  department: string;
  reviewCycle: string;
  currentStage: 'Self-Assessment' | 'R1-Review' | 'R2-Review' | 'Completed' | 'Overdue';
  progress: number;
  daysRemaining: number;
  r1Reviewer: string;
  r2Reviewer: string;
  lastUpdated: Date;
  actions: string[];
}

interface ReviewAction {
  id: string;
  type: 'Send Reminder' | 'Escalate' | 'Extend Deadline' | 'Cancel Review' | 'Reset Stage';
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  requiresApproval: boolean;
}

interface WorkflowRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  isActive: boolean;
  lastTriggered?: Date;
}

const mockReviewProcesses: ReviewProcess[] = [
  {
    id: 'process-1',
    employeeName: 'Sarah Johnson',
    department: 'Engineering',
    reviewCycle: 'Annual Review 2024',
    currentStage: 'R2-Review',
    progress: 75,
    daysRemaining: 5,
    r1Reviewer: 'Michael Chen',
    r2Reviewer: 'David Kim',
    lastUpdated: new Date('2024-02-25'),
    actions: ['Send Reminder', 'View Details']
  },
  {
    id: 'process-2',
    employeeName: 'Alex Rodriguez',
    department: 'Product',
    reviewCycle: 'Annual Review 2024',
    currentStage: 'Self-Assessment',
    progress: 25,
    daysRemaining: -2,
    r1Reviewer: 'Jessica Wong',
    r2Reviewer: 'Maria Garcia',
    lastUpdated: new Date('2024-02-20'),
    actions: ['Escalate', 'Extend Deadline', 'Send Reminder']
  },
  {
    id: 'process-3',
    employeeName: 'Emily Chen',
    department: 'Design',
    reviewCycle: 'Annual Review 2024',
    currentStage: 'Completed',
    progress: 100,
    daysRemaining: 0,
    r1Reviewer: 'Robert Wilson',
    r2Reviewer: 'Lisa Park',
    lastUpdated: new Date('2024-02-28'),
    actions: ['View Report', 'Download']
  }
];

const mockReviewActions: ReviewAction[] = [
  {
    id: 'action-1',
    type: 'Send Reminder',
    description: 'Send email reminder to employee/reviewer',
    impact: 'Low',
    requiresApproval: false
  },
  {
    id: 'action-2',
    type: 'Escalate',
    description: 'Escalate to higher manager for intervention',
    impact: 'High',
    requiresApproval: true
  },
  {
    id: 'action-3',
    type: 'Extend Deadline',
    description: 'Extend review deadline by specified days',
    impact: 'Medium',
    requiresApproval: false
  },
  {
    id: 'action-4',
    type: 'Reset Stage',
    description: 'Reset current review stage to start over',
    impact: 'High',
    requiresApproval: true
  }
];

const mockWorkflowRules: WorkflowRule[] = [
  {
    id: 'rule-1',
    name: 'Auto-reminder before deadline',
    trigger: 'Time-based',
    condition: '3 days before deadline',
    action: 'Send reminder email',
    isActive: true,
    lastTriggered: new Date('2024-02-25')
  },
  {
    id: 'rule-2',
    name: 'Escalate overdue reviews',
    trigger: 'Status-based',
    condition: 'Review overdue by 2+ days',
    action: 'Escalate to manager',
    isActive: true,
    lastTriggered: new Date('2024-02-26')
  },
  {
    id: 'rule-3',
    name: 'Auto-advance completed stages',
    trigger: 'Completion-based',
    condition: 'Stage marked as complete',
    action: 'Advance to next stage',
    isActive: true
  }
];

export function ReviewOperations({ user }: ReviewOperationsProps) {
  const [activeTab, setActiveTab] = useState('processes');
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [showBulkActions, setShowBulkActions] = useState(false);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'R2-Review': return 'bg-blue-100 text-blue-800';
      case 'R1-Review': return 'bg-yellow-100 text-yellow-800';
      case 'Self-Assessment': return 'bg-orange-100 text-orange-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getDaysRemainingColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days <= 3) return 'text-orange-600';
    return 'text-green-600';
  };

  const handleProcessSelection = (processId: string) => {
    setSelectedProcesses(prev => 
      prev.includes(processId) 
        ? prev.filter(id => id !== processId)
        : [...prev, processId]
    );
  };

  const handleBulkAction = (action: string) => {
    setBulkAction(action);
    setShowBulkActions(true);
    // Here you would implement the bulk action logic
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'Self-Assessment': return <UserCheck className="w-4 h-4" />;
      case 'R1-Review': return <Users className="w-4 h-4" />;
      case 'R2-Review': return <Award className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-google-gray-900">Review Operations</h1>
          <p className="text-google-gray-600 mt-1">Monitor and manage review processes and workflows</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Sync Data
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="gap-2 google-button-primary">
            <Settings className="w-4 h-4" />
            Workflow Settings
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="premium-card hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-google-gray-900">Send Reminders</p>
                <p className="text-sm text-google-gray-600">Bulk notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning-muted rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="font-medium text-google-gray-900">Extend Deadlines</p>
                <p className="text-sm text-google-gray-600">Batch updates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive-muted rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-google-gray-900">Escalate Issues</p>
                <p className="text-sm text-google-gray-600">Manager intervention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success-muted rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-google-gray-900">Generate Reports</p>
                <p className="text-sm text-google-gray-600">Process analytics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="processes" className="gap-2">
            <FileText className="w-4 h-4" />
            Review Processes
          </TabsTrigger>
          <TabsTrigger value="actions" className="gap-2">
            <Settings className="w-4 h-4" />
            Bulk Actions
          </TabsTrigger>
          <TabsTrigger value="workflows" className="gap-2">
            <ArrowRight className="w-4 h-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Monitoring
          </TabsTrigger>
        </TabsList>

        {/* Review Processes Tab */}
        <TabsContent value="processes" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Active Review Processes
                </CardTitle>
                {selectedProcesses.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowBulkActions(true)}>
                      Bulk Actions ({selectedProcesses.length})
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedProcesses([])}>
                      Clear Selection
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-google-gray-400" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 premium-input"
                    />
                  </div>
                </div>
                <Select value={filterStage} onValueChange={setFilterStage}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Stages</SelectItem>
                    <SelectItem value="Self-Assessment">Self-Assessment</SelectItem>
                    <SelectItem value="R1-Review">R1 Review</SelectItem>
                    <SelectItem value="R2-Review">R2 Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Process List */}
              <div className="space-y-4">
                {mockReviewProcesses.map((process) => (
                  <div key={process.id} className="border border-google-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedProcesses.includes(process.id)}
                        onChange={() => handleProcessSelection(process.id)}
                        className="mt-1 w-4 h-4 text-primary border-google-gray-300 rounded focus:ring-primary"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-google-gray-900">{process.employeeName}</h3>
                            <p className="text-sm text-google-gray-600">{process.department} • {process.reviewCycle}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStageColor(process.currentStage)}>
                              {getStageIcon(process.currentStage)}
                              <span className="ml-1">{process.currentStage}</span>
                            </Badge>
                            <span className={`text-sm font-medium ${getDaysRemainingColor(process.daysRemaining)}`}>
                              {process.daysRemaining > 0 ? `${process.daysRemaining} days left` : 
                               process.daysRemaining === 0 ? 'Due today' : 
                               `${Math.abs(process.daysRemaining)} days overdue`}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-google-gray-600">Progress</span>
                            <span className="text-sm font-medium">{process.progress}%</span>
                          </div>
                          <div className="w-full bg-google-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(process.progress)}`}
                              style={{ width: `${process.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Review Flow */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                              process.progress >= 25 ? 'bg-green-500' : 'bg-google-gray-300'
                            }`}>
                              <UserCheck className={`w-4 h-4 ${process.progress >= 25 ? 'text-white' : 'text-google-gray-500'}`} />
                            </div>
                            <p className="text-xs text-google-gray-600">Self-Assessment</p>
                          </div>
                          <div className="text-center">
                            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                              process.progress >= 50 ? 'bg-green-500' : 'bg-google-gray-300'
                            }`}>
                              <Users className={`w-4 h-4 ${process.progress >= 50 ? 'text-white' : 'text-google-gray-500'}`} />
                            </div>
                            <p className="text-xs text-google-gray-600">R1 Review</p>
                            <p className="text-xs text-google-gray-500">{process.r1Reviewer}</p>
                          </div>
                          <div className="text-center">
                            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                              process.progress >= 100 ? 'bg-green-500' : 'bg-google-gray-300'
                            }`}>
                              <Award className={`w-4 h-4 ${process.progress >= 100 ? 'text-white' : 'text-google-gray-500'}`} />
                            </div>
                            <p className="text-xs text-google-gray-600">R2 Review</p>
                            <p className="text-xs text-google-gray-500">{process.r2Reviewer}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {process.actions.map((action, index) => (
                            <Button key={index} variant="outline" size="sm" className="text-xs">
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bulk Actions Tab */}
        <TabsContent value="actions" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Bulk Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockReviewActions.map((action) => (
                  <div key={action.id} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-google-gray-900 mb-2">{action.type}</h3>
                        <p className="text-sm text-google-gray-600 mb-3">{action.description}</p>
                        <div className="flex gap-2">
                          <Badge variant={action.impact === 'High' ? 'destructive' : action.impact === 'Medium' ? 'default' : 'secondary'}>
                            {action.impact} Impact
                          </Badge>
                          {action.requiresApproval && (
                            <Badge variant="outline">Requires Approval</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full google-button-secondary">
                      Execute Action
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  Workflow Rules
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
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{rule.name}</h3>
                          <Badge className={rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {rule.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-google-gray-600 mb-1">Trigger</p>
                            <p className="font-medium">{rule.trigger}</p>
                          </div>
                          <div>
                            <p className="text-google-gray-600 mb-1">Condition</p>
                            <p className="font-medium">{rule.condition}</p>
                          </div>
                          <div>
                            <p className="text-google-gray-600 mb-1">Action</p>
                            <p className="font-medium">{rule.action}</p>
                          </div>
                        </div>
                        {rule.lastTriggered && (
                          <p className="text-sm text-google-gray-500 mt-2">
                            Last triggered: {rule.lastTriggered.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {rule.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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
                <CardTitle>Stage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Self-Assessment</span>
                    <span>32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>R1 Review</span>
                    <span>28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>R2 Review</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Completed</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Department Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Engineering</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Product</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Design</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Marketing</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}