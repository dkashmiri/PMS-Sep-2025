import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Switch } from "../ui/switch";
import { 
  GitBranch, 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Save, 
  X, 
  Check, 
  AlertTriangle,
  UserCheck,
  UserX,
  ArrowRight,
  Building2,
  Briefcase,
  Crown,
  Shield
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

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
  department: string;
  domain: string;
  project?: string;
  r1Reviewer?: string;
  r2Reviewer?: string;
  avatar?: string;
  isActive: boolean;
}

interface ReviewerMappingProps {
  user: User;
}

// Mock data for employees and their reviewer mappings
const mockEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
    domain: 'Frontend Development',
    project: 'Web Platform',
    r1Reviewer: 'Jessica Wong',
    r2Reviewer: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=150&h=150&fit=crop&crop=face',
    isActive: true
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'David Kumar',
    email: 'david.kumar@company.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
    domain: 'Backend Development',
    project: 'API Gateway',
    r1Reviewer: 'Jessica Wong',
    r2Reviewer: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isActive: true
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'EMPLOYEE',
    department: 'Marketing',
    domain: 'Digital Marketing',
    project: 'Brand Campaign',
    r1Reviewer: 'Lisa Rodriguez',
    r2Reviewer: undefined,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isActive: true
  },
  {
    id: '4',
    employeeId: 'EMP004',
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    role: 'TEAMLEAD',
    department: 'Engineering',
    domain: 'Mobile Development',
    project: 'Mobile App',
    r1Reviewer: undefined,
    r2Reviewer: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isActive: true
  },
  {
    id: '5',
    employeeId: 'EMP005',
    name: 'Jessica Wong',
    email: 'jessica.wong@company.com',
    role: 'TEAMLEAD',
    department: 'Engineering',
    domain: 'Development',
    r1Reviewer: undefined,
    r2Reviewer: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isActive: true
  }
];

// Mock potential reviewers (Team Leads and Managers)
const potentialReviewers = [
  { id: 'r1', name: 'Jessica Wong', role: 'TEAMLEAD', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 'r2', name: 'Michael Chen', role: 'MANAGER', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 'r3', name: 'Lisa Rodriguez', role: 'MANAGER', department: 'Marketing', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=150&h=150&fit=crop&crop=face' },
  { id: 'r4', name: 'Robert Kim', role: 'TEAMLEAD', department: 'Sales', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 'r5', name: 'Amanda Foster', role: 'MANAGER', department: 'HR', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=150&h=150&fit=crop&crop=face' }
];

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

export function ReviewerMapping({ user }: ReviewerMappingProps) {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [editingEmployee, setEditingEmployee] = useState<string | null>(null);
  const [bulkAssignMode, setBulkAssignMode] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [bulkR1Reviewer, setBulkR1Reviewer] = useState('none');
  const [bulkR2Reviewer, setBulkR2Reviewer] = useState('none');

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    const matchesProject = selectedProject === 'all' || emp.project === selectedProject;
    
    return matchesSearch && matchesDepartment && matchesProject;
  });

  // Statistics
  const stats = {
    total: employees.length,
    withR1: employees.filter(emp => emp.r1Reviewer).length,
    withR2: employees.filter(emp => emp.r2Reviewer).length,
    complete: employees.filter(emp => emp.r1Reviewer && emp.r2Reviewer).length,
    incomplete: employees.filter(emp => !emp.r1Reviewer || !emp.r2Reviewer).length
  };

  const handleSaveMapping = (employeeId: string, r1Reviewer: string, r2Reviewer: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { ...emp, r1Reviewer: r1Reviewer === 'none' ? undefined : r1Reviewer, r2Reviewer: r2Reviewer === 'none' ? undefined : r2Reviewer }
        : emp
    ));
    setEditingEmployee(null);
  };

  const handleBulkAssign = () => {
    const updatedEmployees = employees.map(emp => 
      selectedEmployees.includes(emp.id)
        ? { 
            ...emp, 
            r1Reviewer: bulkR1Reviewer === 'none' ? emp.r1Reviewer : bulkR1Reviewer,
            r2Reviewer: bulkR2Reviewer === 'none' ? emp.r2Reviewer : bulkR2Reviewer
          }
        : emp
    );
    setEmployees(updatedEmployees);
    setSelectedEmployees([]);
    setBulkAssignMode(false);
    setBulkR1Reviewer('none');
    setBulkR2Reviewer('none');
  };

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const getReviewerAvatar = (reviewerName?: string) => {
    const reviewer = potentialReviewers.find(r => r.name === reviewerName);
    return reviewer?.avatar;
  };

  const getValidationIssues = (employee: Employee) => {
    const issues = [];
    if (!employee.r1Reviewer) issues.push('Missing R1 Reviewer');
    if (!employee.r2Reviewer) issues.push('Missing R2 Reviewer');
    if (employee.r1Reviewer === employee.r2Reviewer) issues.push('R1 and R2 cannot be same person');
    return issues;
  };

  const getMappingStatusColor = (employee: Employee) => {
    const issues = getValidationIssues(employee);
    if (issues.length === 0) return 'text-google-green';
    if (issues.length === 1) return 'text-google-yellow';
    return 'text-google-red';
  };

  const getMappingStatusIcon = (employee: Employee) => {
    const issues = getValidationIssues(employee);
    if (issues.length === 0) return <Check className="w-4 h-4 text-google-green" />;
    if (issues.length === 1) return <AlertTriangle className="w-4 h-4 text-google-yellow" />;
    return <X className="w-4 h-4 text-google-red" />;
  };

  const projects = [...new Set(employees.map(emp => emp.project).filter(Boolean))];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-google-gray-900">Reviewer Mapping</h1>
          <p className="text-google-gray-600 mt-1">Assign R1 (Team Lead) and R2 (Manager) reviewers to employees</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={bulkAssignMode ? "default" : "outline"}
            onClick={() => setBulkAssignMode(!bulkAssignMode)}
            className={bulkAssignMode ? "google-button-primary" : "google-button-secondary"}
          >
            <Users className="w-4 h-4 mr-2" />
            {bulkAssignMode ? 'Exit Bulk Mode' : 'Bulk Assign'}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Total Employees</p>
                <p className="text-2xl font-medium text-google-gray-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-google-blue/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-google-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Complete Mapping</p>
                <p className="text-2xl font-medium text-google-green">{stats.complete}</p>
              </div>
              <div className="w-10 h-10 bg-google-green/10 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-google-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Incomplete</p>
                <p className="text-2xl font-medium text-google-red">{stats.incomplete}</p>
              </div>
              <div className="w-10 h-10 bg-google-red/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-google-red" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">With R1</p>
                <p className="text-2xl font-medium text-google-gray-900">{stats.withR1}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">With R2</p>
                <p className="text-2xl font-medium text-google-gray-900">{stats.withR2}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Assignment Panel */}
      {bulkAssignMode && (
        <Card className="premium-card border-google-blue/20 bg-google-blue/5">
          <CardHeader>
            <CardTitle className="text-google-blue">Bulk Reviewer Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>R1 Reviewer (Team Lead)</Label>
                  <Select value={bulkR1Reviewer} onValueChange={setBulkR1Reviewer}>
                    <SelectTrigger className="premium-input">
                      <SelectValue placeholder="Select R1 Reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Change</SelectItem>
                      {potentialReviewers.filter(r => r.role === 'TEAMLEAD').map(reviewer => (
                        <SelectItem key={reviewer.id} value={reviewer.name}>
                          {reviewer.name} ({reviewer.department})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>R2 Reviewer (Manager)</Label>
                  <Select value={bulkR2Reviewer} onValueChange={setBulkR2Reviewer}>
                    <SelectTrigger className="premium-input">
                      <SelectValue placeholder="Select R2 Reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Change</SelectItem>
                      {potentialReviewers.filter(r => r.role === 'MANAGER').map(reviewer => (
                        <SelectItem key={reviewer.id} value={reviewer.name}>
                          {reviewer.name} ({reviewer.department})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleBulkAssign}
                  disabled={selectedEmployees.length === 0 || (bulkR1Reviewer === 'none' && bulkR2Reviewer === 'none')}
                  className="google-button-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Apply to {selectedEmployees.length} employees
                </Button>
              </div>
            </div>
            {selectedEmployees.length > 0 && (
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {selectedEmployees.length} employee(s) selected for bulk assignment.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card className="premium-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-google-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employees by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 premium-input"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[160px] premium-input">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[160px] premium-input">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map(project => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviewer Mapping Table */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-google-gray-900">
            Employee Reviewer Mappings ({filteredEmployees.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-google-gray-200">
                  {bulkAssignMode && (
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.length === filteredEmployees.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEmployees(filteredEmployees.map(emp => emp.id));
                          } else {
                            setSelectedEmployees([]);
                          }
                        }}
                        className="rounded border-google-gray-300"
                      />
                    </TableHead>
                  )}
                  <TableHead className="text-google-gray-700">Employee</TableHead>
                  <TableHead className="text-google-gray-700">Department</TableHead>
                  <TableHead className="text-google-gray-700">R1 Reviewer</TableHead>
                  <TableHead className="text-google-gray-700">R2 Reviewer</TableHead>
                  <TableHead className="text-google-gray-700">Status</TableHead>
                  <TableHead className="text-google-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="border-google-gray-200 hover:bg-google-gray-50">
                    {bulkAssignMode && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => handleSelectEmployee(employee.id)}
                          className="rounded border-google-gray-300"
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback className="bg-google-blue/10 text-google-blue">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-google-gray-900">{employee.name}</p>
                          <p className="text-sm text-google-gray-600">{employee.email}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {employee.role}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-google-gray-900">{employee.department}</p>
                        <p className="text-xs text-google-gray-600">{employee.domain}</p>
                        {employee.project && (
                          <p className="text-xs text-google-gray-500">Project: {employee.project}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {editingEmployee === employee.id ? (
                        <Select 
                          defaultValue={employee.r1Reviewer || 'none'}
                          onValueChange={(value) => {
                            const updatedEmployee = { ...employee, r1Reviewer: value === 'none' ? undefined : value };
                            setEmployees(employees.map(emp => emp.id === employee.id ? updatedEmployee : emp));
                          }}
                        >
                          <SelectTrigger className="w-[200px] premium-input">
                            <SelectValue placeholder="Select R1 Reviewer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No R1 Reviewer</SelectItem>
                            {potentialReviewers.filter(r => r.role === 'TEAMLEAD').map(reviewer => (
                              <SelectItem key={reviewer.id} value={reviewer.name}>
                                {reviewer.name} ({reviewer.department})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : employee.r1Reviewer ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={getReviewerAvatar(employee.r1Reviewer)} />
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                              {employee.r1Reviewer.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-google-gray-900">{employee.r1Reviewer}</p>
                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-200">
                              Team Lead
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-google-gray-500">
                          <UserX className="w-4 h-4" />
                          <span className="text-sm">Not assigned</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingEmployee === employee.id ? (
                        <Select 
                          defaultValue={employee.r2Reviewer || 'none'}
                          onValueChange={(value) => {
                            const updatedEmployee = { ...employee, r2Reviewer: value === 'none' ? undefined : value };
                            setEmployees(employees.map(emp => emp.id === employee.id ? updatedEmployee : emp));
                          }}
                        >
                          <SelectTrigger className="w-[200px] premium-input">
                            <SelectValue placeholder="Select R2 Reviewer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No R2 Reviewer</SelectItem>
                            {potentialReviewers.filter(r => r.role === 'MANAGER').map(reviewer => (
                              <SelectItem key={reviewer.id} value={reviewer.name}>
                                {reviewer.name} ({reviewer.department})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : employee.r2Reviewer ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={getReviewerAvatar(employee.r2Reviewer)} />
                            <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                              {employee.r2Reviewer.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-google-gray-900">{employee.r2Reviewer}</p>
                            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-600 border-orange-200">
                              Manager
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-google-gray-500">
                          <UserX className="w-4 h-4" />
                          <span className="text-sm">Not assigned</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMappingStatusIcon(employee)}
                        <div>
                          {getValidationIssues(employee).length === 0 ? (
                            <Badge className="bg-google-green/10 text-google-green border-google-green/20" variant="outline">
                              Complete
                            </Badge>
                          ) : (
                            <Badge className="bg-google-red/10 text-google-red border-google-red/20" variant="outline">
                              Incomplete
                            </Badge>
                          )}
                          {getValidationIssues(employee).length > 0 && (
                            <div className="text-xs text-google-red mt-1">
                              {getValidationIssues(employee).join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {editingEmployee === employee.id ? (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                handleSaveMapping(employee.id, employee.r1Reviewer || 'none', employee.r2Reviewer || 'none');
                              }}
                              className="p-2 h-auto hover:bg-google-green/10"
                            >
                              <Check className="w-4 h-4 text-google-green" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingEmployee(null)}
                              className="p-2 h-auto hover:bg-google-red/10"
                            >
                              <X className="w-4 h-4 text-google-red" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingEmployee(employee.id)}
                            className="p-2 h-auto hover:bg-google-blue/10"
                          >
                            <Edit className="w-4 h-4 text-google-blue" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Review Hierarchy Visualization */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-google-gray-900">Review Hierarchy Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-google-gray-600 mb-4">
              Understanding the review process flow:
            </div>
            <div className="flex items-center justify-center gap-8 bg-google-gray-50 p-6 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-google-blue/10 rounded-full flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-google-blue" />
                </div>
                <p className="font-medium text-google-gray-900">Employee</p>
                <p className="text-xs text-google-gray-600">Self Assessment</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-google-gray-400" />
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Crown className="w-8 h-8 text-purple-600" />
                </div>
                <p className="font-medium text-google-gray-900">R1 Reviewer</p>
                <p className="text-xs text-google-gray-600">Team Lead Review</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-google-gray-400" />
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <p className="font-medium text-google-gray-900">R2 Reviewer</p>
                <p className="text-xs text-google-gray-600">Manager Review</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}