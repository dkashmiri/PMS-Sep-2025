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
  Users, 
  Plus, 
  Edit, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Trash2, 
  Eye, 
  UserCheck, 
  UserX,
  Building2,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock
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
  phone: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
  department: string;
  domain: string;
  project?: string;
  manager?: string;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar?: string;
  lastLogin?: string;
}

interface UserOperationsProps {
  user: User;
}

// Mock data for demonstration
const mockEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1-555-0123',
    role: 'EMPLOYEE',
    department: 'Engineering',
    domain: 'Frontend Development',
    project: 'Web Platform',
    manager: 'Michael Chen',
    joinDate: '2023-01-15',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-15 09:30 AM'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    phone: '+1-555-0124',
    role: 'MANAGER',
    department: 'Engineering',
    domain: 'Development',
    project: 'Web Platform',
    joinDate: '2022-03-10',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-15 08:45 AM'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Jessica Wong',
    email: 'jessica.wong@company.com',
    phone: '+1-555-0125',
    role: 'TEAMLEAD',
    department: 'Engineering',
    domain: 'Mobile Development',
    project: 'Mobile App',
    manager: 'Michael Chen',
    joinDate: '2022-08-20',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-15 10:15 AM'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    name: 'David Kumar',
    email: 'david.kumar@company.com',
    phone: '+1-555-0126',
    role: 'EMPLOYEE',
    department: 'Marketing',
    domain: 'Digital Marketing',
    project: 'Brand Campaign',
    manager: 'Lisa Rodriguez',
    joinDate: '2023-06-01',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-10 02:30 PM'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@company.com',
    phone: '+1-555-0127',
    role: 'MANAGER',
    department: 'Marketing',
    domain: 'Marketing Operations',
    joinDate: '2021-11-12',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-15 07:20 AM'
  }
];

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
const domains = ['Frontend Development', 'Backend Development', 'Mobile Development', 'DevOps', 'Digital Marketing', 'Content Marketing', 'Sales Operations', 'HR Operations', 'Financial Planning', 'Operations Management'];
const projects = ['Web Platform', 'Mobile App', 'Brand Campaign', 'Sales Portal', 'HR System', 'Finance Dashboard'];

export function UserOperations({ user }: UserOperationsProps) {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    role: 'EMPLOYEE',
    department: '',
    domain: '',
    status: 'Active'
  });

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    const matchesRole = selectedRole === 'all' || emp.role === selectedRole;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesRole;
  });

  // Statistics
  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.status === 'Active').length,
    inactive: employees.filter(emp => emp.status === 'Inactive').length,
    pending: employees.filter(emp => emp.status === 'Pending').length,
    managers: employees.filter(emp => emp.role === 'MANAGER').length,
    teamLeads: employees.filter(emp => emp.role === 'TEAMLEAD').length,
    employees: employees.filter(emp => emp.role === 'EMPLOYEE').length
  };

  const handleAddEmployee = () => {
    const newEmp: Employee = {
      id: Date.now().toString(),
      employeeId: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      name: newEmployee.name || '',
      email: newEmployee.email || '',
      phone: newEmployee.phone || '',
      role: newEmployee.role as Employee['role'] || 'EMPLOYEE',
      department: newEmployee.department || '',
      domain: newEmployee.domain || '',
      project: newEmployee.project,
      manager: newEmployee.manager,
      joinDate: new Date().toISOString().split('T')[0],
      status: newEmployee.status as Employee['status'] || 'Active',
      avatar: newEmployee.avatar
    };
    
    setEmployees([...employees, newEmp]);
    setNewEmployee({ role: 'EMPLOYEE', department: '', domain: '', status: 'Active' });
    setIsAddDialogOpen(false);
  };

  const handleEditEmployee = () => {
    if (selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? selectedEmployee : emp
      ));
      setIsEditDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleToggleStatus = (employeeId: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: emp.status === 'Active' ? 'Inactive' : 'Active' as Employee['status'] }
        : emp
    ));
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-google-red/10 text-google-red border-google-red/20';
      case 'HR': return 'bg-google-blue/10 text-google-blue border-google-blue/20';
      case 'MANAGER': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'TEAMLEAD': return 'bg-google-green/10 text-google-green border-google-green/20';
      default: return 'bg-google-gray-100 text-google-gray-800 border-google-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-google-green/10 text-google-green border-google-green/20';
      case 'Inactive': return 'bg-google-gray-100 text-google-gray-600 border-google-gray-300';
      case 'Pending': return 'bg-google-yellow/10 text-google-yellow border-google-yellow/20';
      default: return 'bg-google-gray-100 text-google-gray-600 border-google-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-google-gray-900">User Operations</h1>
          <p className="text-google-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="google-button-secondary">
            <Upload className="w-4 h-4 mr-2" />
            Import Users
          </Button>
          <Button variant="outline" size="sm" className="google-button-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="google-button-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl premium-card">
              <DialogHeader>
                <DialogTitle className="text-google-gray-900">Add New User</DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="role">Role & Access</TabsTrigger>
                  <TabsTrigger value="additional">Additional</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={newEmployee.name || ''}
                        onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                        className="premium-input"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newEmployee.email || ''}
                        onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                        className="premium-input"
                        placeholder="user@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newEmployee.phone || ''}
                        onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                        className="premium-input"
                        placeholder="+1-555-0123"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Avatar URL</Label>
                      <Input
                        id="avatar"
                        value={newEmployee.avatar || ''}
                        onChange={(e) => setNewEmployee({...newEmployee, avatar: e.target.value})}
                        className="premium-input"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="role" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role *</Label>
                      <Select value={newEmployee.role || 'EMPLOYEE'} onValueChange={(value) => setNewEmployee({...newEmployee, role: value as Employee['role']})}>
                        <SelectTrigger className="premium-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EMPLOYEE">Employee</SelectItem>
                          <SelectItem value="TEAMLEAD">Team Lead</SelectItem>
                          <SelectItem value="MANAGER">Manager</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select value={newEmployee.department || ''} onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}>
                        <SelectTrigger className="premium-input">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="domain">Domain *</Label>
                      <Select value={newEmployee.domain || ''} onValueChange={(value) => setNewEmployee({...newEmployee, domain: value})}>
                        <SelectTrigger className="premium-input">
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {domains.map(domain => (
                            <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={newEmployee.status || 'Active'} onValueChange={(value) => setNewEmployee({...newEmployee, status: value as Employee['status']})}>
                        <SelectTrigger className="premium-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="additional" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project">Project</Label>
                      <Select value={newEmployee.project || ''} onValueChange={(value) => setNewEmployee({...newEmployee, project: value})}>
                        <SelectTrigger className="premium-input">
                          <SelectValue placeholder="Select project (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map(project => (
                            <SelectItem key={project} value={project}>{project}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">Manager</Label>
                      <Select value={newEmployee.manager || ''} onValueChange={(value) => setNewEmployee({...newEmployee, manager: value})}>
                        <SelectTrigger className="premium-input">
                          <SelectValue placeholder="Select manager (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.filter(emp => emp.role === 'MANAGER' || emp.role === 'TEAMLEAD').map(manager => (
                            <SelectItem key={manager.id} value={manager.name}>{manager.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="google-button-secondary">
                  Cancel
                </Button>
                <Button onClick={handleAddEmployee} className="google-button-primary">
                  Add User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Total Users</p>
                <p className="text-2xl font-medium text-google-gray-900">{stats.total}</p>
                <p className="text-xs text-google-green mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-google-blue/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-google-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Active Users</p>
                <p className="text-2xl font-medium text-google-gray-900">{stats.active}</p>
                <p className="text-xs text-google-green mt-1">{Math.round((stats.active / stats.total) * 100)}% of total</p>
              </div>
              <div className="w-12 h-12 bg-google-green/10 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-google-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Managers</p>
                <p className="text-2xl font-medium text-google-gray-900">{stats.managers}</p>
                <p className="text-xs text-google-gray-600 mt-1">{stats.teamLeads} Team Leads</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Inactive Users</p>
                <p className="text-2xl font-medium text-google-gray-900">{stats.inactive}</p>
                <p className="text-xs text-google-yellow mt-1">{stats.pending} pending activation</p>
              </div>
              <div className="w-12 h-12 bg-google-gray-100 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-google-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="premium-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-google-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or employee ID..."
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

              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[140px] premium-input">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="TEAMLEAD">Team Lead</SelectItem>
                  <SelectItem value="EMPLOYEE">Employee</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[120px] premium-input">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-google-gray-900">Users ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-google-gray-200">
                  <TableHead className="text-google-gray-700">User</TableHead>
                  <TableHead className="text-google-gray-700">Role</TableHead>
                  <TableHead className="text-google-gray-700">Department</TableHead>
                  <TableHead className="text-google-gray-700">Project</TableHead>
                  <TableHead className="text-google-gray-700">Status</TableHead>
                  <TableHead className="text-google-gray-700">Last Login</TableHead>
                  <TableHead className="text-google-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="border-google-gray-200 hover:bg-google-gray-50">
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
                          <p className="text-xs text-google-gray-500">{employee.employeeId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getRoleColor(employee.role)} border`} variant="outline">
                        {employee.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-google-gray-900">{employee.department}</p>
                        <p className="text-xs text-google-gray-600">{employee.domain}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-google-gray-900">{employee.project || '-'}</p>
                      {employee.manager && (
                        <p className="text-xs text-google-gray-600">Manager: {employee.manager}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(employee.status)} border`} variant="outline">
                          {employee.status}
                        </Badge>
                        <Switch
                          checked={employee.status === 'Active'}
                          onCheckedChange={() => handleToggleStatus(employee.id)}
                          size="sm"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-google-gray-900">{employee.lastLogin || 'Never'}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsViewDialogOpen(true);
                          }}
                          className="p-2 h-auto hover:bg-google-gray-100"
                        >
                          <Eye className="w-4 h-4 text-google-gray-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsEditDialogOpen(true);
                          }}
                          className="p-2 h-auto hover:bg-google-blue/10"
                        >
                          <Edit className="w-4 h-4 text-google-blue" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="p-2 h-auto hover:bg-google-red/10"
                        >
                          <Trash2 className="w-4 h-4 text-google-red" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Employee Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl premium-card">
          <DialogHeader>
            <DialogTitle className="text-google-gray-900">User Details</DialogTitle>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedEmployee.avatar} />
                  <AvatarFallback className="bg-google-blue/10 text-google-blue text-lg">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-medium text-google-gray-900">{selectedEmployee.name}</h3>
                  <p className="text-google-gray-600">{selectedEmployee.email}</p>
                  <Badge className={`${getRoleColor(selectedEmployee.role)} border mt-2`} variant="outline">
                    {selectedEmployee.role}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-google-gray-700">Employee ID</Label>
                    <p className="text-google-gray-900 font-medium">{selectedEmployee.employeeId}</p>
                  </div>
                  <div>
                    <Label className="text-google-gray-700">Department</Label>
                    <p className="text-google-gray-900 font-medium">{selectedEmployee.department}</p>
                  </div>
                  <div>
                    <Label className="text-google-gray-700">Domain</Label>
                    <p className="text-google-gray-900 font-medium">{selectedEmployee.domain}</p>
                  </div>
                  <div>
                    <Label className="text-google-gray-700">Project</Label>
                    <p className="text-google-gray-900 font-medium">{selectedEmployee.project || 'Not assigned'}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-google-gray-700">Phone</Label>
                    <p className="text-google-gray-900 font-medium">{selectedEmployee.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label className="text-google-gray-700">Manager</Label>
                    <p className="text-google-gray-900 font-medium">{selectedEmployee.manager || 'No manager assigned'}</p>
                  </div>
                  <div>
                    <Label className="text-google-gray-700">Join Date</Label>
                    <p className="text-google-gray-900 font-medium">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-google-gray-700">Last Login</Label>
                    <p className="text-google-gray-900 font-medium">{selectedEmployee.lastLogin || 'Never logged in'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl premium-card">
          <DialogHeader>
            <DialogTitle className="text-google-gray-900">Edit User</DialogTitle>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedEmployee.name}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, name: e.target.value})}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedEmployee.email}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, email: e.target.value})}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={selectedEmployee.phone}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, phone: e.target.value})}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select value={selectedEmployee.role} onValueChange={(value) => setSelectedEmployee({...selectedEmployee, role: value as Employee['role']})}>
                    <SelectTrigger className="premium-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMPLOYEE">Employee</SelectItem>
                      <SelectItem value="TEAMLEAD">Team Lead</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Select value={selectedEmployee.department} onValueChange={(value) => setSelectedEmployee({...selectedEmployee, department: value})}>
                    <SelectTrigger className="premium-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-domain">Domain</Label>
                  <Select value={selectedEmployee.domain} onValueChange={(value) => setSelectedEmployee({...selectedEmployee, domain: value})}>
                    <SelectTrigger className="premium-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map(domain => (
                        <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="google-button-secondary">
                  Cancel
                </Button>
                <Button onClick={handleEditEmployee} className="google-button-primary">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}