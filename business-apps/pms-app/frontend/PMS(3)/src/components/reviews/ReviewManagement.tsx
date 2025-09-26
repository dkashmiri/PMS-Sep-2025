import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { 
  FileText, 
  Calendar as CalendarIcon, 
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
  BarChart3
} from 'lucide-react';
import { format } from 'date-fns';

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

interface ReviewManagementProps {
  user: User;
}

interface ReviewCycle {
  id: string;
  name: string;
  type: 'Annual' | 'Mid-Year' | 'Quarterly' | 'Project-Based';
  status: 'Draft' | 'Active' | 'Completed' | 'Cancelled';
  startDate: Date;
  endDate: Date;
  selfAssessmentDeadline: Date;
  r1ReviewDeadline: Date;
  r2ReviewDeadline: Date;
  participants: number;
  completed: number;
  department: string;
  description: string;
}

interface ReviewTemplate {
  id: string;
  name: string;
  type: 'Self-Assessment' | 'R1-Review' | 'R2-Review' | 'Goal-KRA-Matrix';
  kraWeight: number;
  goalWeight: number;
  competencyWeight: number;
  sections: string[];
  isActive: boolean;
}

interface PerformanceData {
  employeeId: string;
  employeeName: string;
  department: string;
  kraScore: number;
  goalScore: number;
  overallScore: number;
  performanceZone: 'Green' | 'Yellow' | 'Red';
  reviewStatus: 'Not Started' | 'Self-Assessment' | 'R1-Review' | 'R2-Review' | 'Completed';
  lastUpdated: Date;
}

const mockReviewCycles: ReviewCycle[] = [
  {
    id: 'cycle-1',
    name: 'Annual Performance Review 2024',
    type: 'Annual',
    status: 'Active',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-29'),
    selfAssessmentDeadline: new Date('2024-02-05'),
    r1ReviewDeadline: new Date('2024-02-15'),
    r2ReviewDeadline: new Date('2024-02-25'),
    participants: 145,
    completed: 89,
    department: 'All Departments',
    description: 'Comprehensive annual performance review covering KRAs, goals, and competencies.'
  },
  {
    id: 'cycle-2',
    name: 'Q1 Goal Review 2024',
    type: 'Quarterly',
    status: 'Completed',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    selfAssessmentDeadline: new Date('2024-03-15'),
    r1ReviewDeadline: new Date('2024-03-25'),
    r2ReviewDeadline: new Date('2024-03-30'),
    participants: 98,
    completed: 98,
    department: 'Engineering',
    description: 'Quarterly goal achievement review for engineering teams.'
  }
];

const mockReviewTemplates: ReviewTemplate[] = [
  {
    id: 'template-1',
    name: 'Standard Annual Review',
    type: 'Goal-KRA-Matrix',
    kraWeight: 60,
    goalWeight: 30,
    competencyWeight: 10,
    sections: ['KRA Assessment', 'Goal Achievement', 'Competencies', 'Development Plan'],
    isActive: true
  },
  {
    id: 'template-2',
    name: 'Quarterly Goal Review',
    type: 'Goal-KRA-Matrix',
    kraWeight: 40,
    goalWeight: 60,
    competencyWeight: 0,
    sections: ['Goal Progress', 'KRA Alignment', 'Next Quarter Planning'],
    isActive: true
  }
];

const mockPerformanceData: PerformanceData[] = [
  {
    employeeId: 'emp-1',
    employeeName: 'Sarah Johnson',
    department: 'Engineering',
    kraScore: 4.2,
    goalScore: 4.5,
    overallScore: 4.3,
    performanceZone: 'Green',
    reviewStatus: 'Completed',
    lastUpdated: new Date('2024-02-28')
  },
  {
    employeeId: 'emp-2',
    employeeName: 'Michael Chen',
    department: 'Product',
    kraScore: 3.8,
    goalScore: 4.0,
    overallScore: 3.9,
    performanceZone: 'Green',
    reviewStatus: 'R2-Review',
    lastUpdated: new Date('2024-02-25')
  },
  {
    employeeId: 'emp-3',
    employeeName: 'Jessica Wong',
    department: 'Design',
    kraScore: 3.2,
    goalScore: 3.5,
    overallScore: 3.3,
    performanceZone: 'Yellow',
    reviewStatus: 'R1-Review',
    lastUpdated: new Date('2024-02-22')
  }
];

export function ReviewManagement({ user }: ReviewManagementProps) {
  const [activeTab, setActiveTab] = useState('cycles');
  const [selectedCycle, setSelectedCycle] = useState<ReviewCycle | null>(null);
  const [showCreateCycle, setShowCreateCycle] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceZoneColor = (zone: string) => {
    switch (zone) {
      case 'Green': return 'bg-green-100 text-green-800';
      case 'Yellow': return 'bg-yellow-100 text-yellow-800';
      case 'Red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'R2-Review': return 'bg-blue-100 text-blue-800';
      case 'R1-Review': return 'bg-yellow-100 text-yellow-800';
      case 'Self-Assessment': return 'bg-orange-100 text-orange-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-google-gray-900">Review Management</h1>
          <p className="text-google-gray-600 mt-1">Manage performance review cycles, templates, and analytics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <Button className="gap-2 google-button-primary">
            <Plus className="w-4 h-4" />
            Create Review Cycle
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Active Cycles</p>
                <p className="text-2xl font-bold text-google-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-primary-muted rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+2 from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Total Participants</p>
                <p className="text-2xl font-bold text-google-gray-900">243</p>
              </div>
              <div className="w-12 h-12 bg-success-muted rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm text-google-gray-600">89% completion rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Avg. Performance</p>
                <p className="text-2xl font-bold text-google-gray-900">4.1</p>
              </div>
              <div className="w-12 h-12 bg-warning-muted rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-warning" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <Award className="w-4 h-4 text-yellow-600 mr-1" />
              <span className="text-sm text-google-gray-600">+0.3 from last cycle</span>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Overdue Reviews</p>
                <p className="text-2xl font-bold text-google-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-destructive-muted rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <Clock className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-sm text-red-600">Needs attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cycles" className="gap-2">
            <CalendarIcon className="w-4 h-4" />
            Review Cycles
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Performance Matrix
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Review Cycles Tab */}
        <TabsContent value="cycles" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Review Cycles
                </CardTitle>
                <Button className="google-button-primary" onClick={() => setShowCreateCycle(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Cycle
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
                      placeholder="Search review cycles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 premium-input"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Review Cycles List */}
              <div className="space-y-4">
                {mockReviewCycles.map((cycle) => (
                  <div key={cycle.id} className="border border-google-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{cycle.name}</h3>
                          <Badge className={getStatusColor(cycle.status)}>{cycle.status}</Badge>
                          <Badge variant="outline">{cycle.type}</Badge>
                        </div>
                        <p className="text-google-gray-600 mb-3">{cycle.description}</p>
                        <div className="flex items-center gap-6 text-sm text-google-gray-500">
                          <span>📅 {format(cycle.startDate, 'MMM dd')} - {format(cycle.endDate, 'MMM dd, yyyy')}</span>
                          <span>👥 {cycle.participants} participants</span>
                          <span>✅ {cycle.completed} completed ({calculateProgress(cycle.completed, cycle.participants)}%)</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-google-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${calculateProgress(cycle.completed, cycle.participants)}%` }}
                      ></div>
                    </div>

                    {/* Deadlines */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-500" />
                        <span className="text-google-gray-600">Self-Assessment: {format(cycle.selfAssessmentDeadline, 'MMM dd')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-google-gray-600">R1 Review: {format(cycle.r1ReviewDeadline, 'MMM dd')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-500" />
                        <span className="text-google-gray-600">R2 Review: {format(cycle.r2ReviewDeadline, 'MMM dd')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Review Templates
                </CardTitle>
                <Button className="google-button-primary" onClick={() => setShowCreateTemplate(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockReviewTemplates.map((template) => (
                  <div key={template.id} className="border border-google-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{template.name}</h3>
                          {template.isActive && (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="mb-3">{template.type}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Weight Distribution */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-google-gray-600">KRA Weight</span>
                        <span className="text-sm font-medium">{template.kraWeight}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-google-gray-600">Goal Weight</span>
                        <span className="text-sm font-medium">{template.goalWeight}%</span>
                      </div>
                      {template.competencyWeight > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-google-gray-600">Competency Weight</span>
                          <span className="text-sm font-medium">{template.competencyWeight}%</span>
                        </div>
                      )}
                    </div>

                    {/* Sections */}
                    <div>
                      <p className="text-sm font-medium text-google-gray-700 mb-2">Sections ({template.sections.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {template.sections.map((section, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Matrix Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Performance Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Performance Data Table */}
              <div className="space-y-4">
                {mockPerformanceData.map((employee) => (
                  <div key={employee.employeeId} className="border border-google-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold text-google-gray-900">{employee.employeeName}</h3>
                          <p className="text-sm text-google-gray-600">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-google-gray-600">KRA Score</p>
                          <p className="text-lg font-semibold">{employee.kraScore}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-google-gray-600">Goal Score</p>
                          <p className="text-lg font-semibold">{employee.goalScore}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-google-gray-600">Overall</p>
                          <p className="text-lg font-semibold">{employee.overallScore}</p>
                        </div>
                        <Badge className={getPerformanceZoneColor(employee.performanceZone)}>
                          {employee.performanceZone}
                        </Badge>
                        <Badge className={getReviewStatusColor(employee.reviewStatus)}>
                          {employee.reviewStatus}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-600">Green Zone</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-600">Yellow Zone</span>
                    <span>24%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600">Red Zone</span>
                    <span>8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Review Completion Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Completed</span>
                    <span>89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>In Progress</span>
                    <span>8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Not Started</span>
                    <span>3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: '3%' }}></div>
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