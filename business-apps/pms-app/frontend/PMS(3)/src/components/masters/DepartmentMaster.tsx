import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Building2,
  Users,
  BarChart3,
  Eye,
  MapPin,
  Calendar
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

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  orgId: string;
  oprId: string;
  headId: string;
  headName: string;
  reviewPeriod: 'M' | 'Q' | 'H' | 'Y';
  budgetCode: string;
  location: string;
  employeeCount: number;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
}

interface DepartmentMasterProps {
  user: User;
}

export function DepartmentMaster({ user }: DepartmentMasterProps) {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 'dept-001',
      name: 'Engineering',
      code: 'ENG',
      description: 'Software development and engineering teams',
      orgId: 'org-001',
      oprId: 'opr-001',
      headId: 'user-manager',
      headName: 'Michael Chen',
      reviewPeriod: 'Q',
      budgetCode: 'ENG-2025',
      location: 'Bangalore',
      employeeCount: 45,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-15'
    },
    {
      id: 'dept-002',
      name: 'Human Resources',
      code: 'HR',
      description: 'Human resources and people operations',
      orgId: 'org-001',
      oprId: 'opr-001',
      headId: 'user-hr',
      headName: 'Sarah Williams',
      reviewPeriod: 'Q',
      budgetCode: 'HR-2025',
      location: 'Mumbai',
      employeeCount: 12,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-15'
    },
    {
      id: 'dept-003',
      name: 'Sales & Marketing',
      code: 'SAL',
      description: 'Sales, marketing and business development',
      orgId: 'org-001',
      oprId: 'opr-002',
      headId: 'user-003',
      headName: 'Raj Patel',
      reviewPeriod: 'Q',
      budgetCode: 'SAL-2025',
      location: 'Delhi',
      employeeCount: 28,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-20'
    },
    {
      id: 'dept-004',
      name: 'Finance',
      code: 'FIN',
      description: 'Finance, accounting and audit',
      orgId: 'org-001',
      oprId: 'opr-001',
      headId: 'user-004',
      headName: 'Priya Sharma',
      reviewPeriod: 'Q',
      budgetCode: 'FIN-2025',
      location: 'Mumbai',
      employeeCount: 15,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    headId: '',
    reviewPeriod: 'Q' as 'M' | 'Q' | 'H' | 'Y',
    budgetCode: '',
    location: ''
  });

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    const newDepartment: Department = {
      id: `dept-${Date.now()}`,
      ...formData,
      orgId: 'org-001',
      oprId: 'opr-001',
      headName: 'To be assigned',
      employeeCount: 0,
      isActive: true,
      createdBy: user.id,
      createdOn: new Date().toISOString().split('T')[0]
    };
    
    setDepartments([...departments, newDepartment]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditDepartment = () => {
    if (!editingDepartment) return;
    
    setDepartments(departments.map(dept =>
      dept.id === editingDepartment.id
        ? { ...editingDepartment, ...formData }
        : dept
    ));
    setEditingDepartment(null);
    resetForm();
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.map(dept =>
      dept.id === id ? { ...dept, isActive: false } : dept
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      headId: '',
      reviewPeriod: 'Q',
      budgetCode: '',
      location: ''
    });
  };

  const openEditModal = (department: Department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      code: department.code,
      description: department.description,
      headId: department.headId,
      reviewPeriod: department.reviewPeriod,
      budgetCode: department.budgetCode,
      location: department.location
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Department Master</h1>
                <p className="text-gray-500 mt-1">Organize and manage your company departments</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-200">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add New Department</DialogTitle>
                </DialogHeader>
                <DepartmentForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleAddDepartment}
                  onCancel={() => setShowAddModal(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Departments</p>
                    <p className="text-3xl font-bold text-gray-900">{departments.filter(d => d.isActive).length}</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-emerald-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Employees</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-purple-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Locations</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {new Set(departments.map(d => d.location)).size}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-orange-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Avg Team Size</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.round(departments.reduce((sum, dept) => sum + dept.employeeCount, 0) / departments.length)}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search departments by name, code, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white/80 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                />
              </div>
              <Button variant="outline" className="h-12 px-6 bg-white/80 border-gray-200 rounded-xl hover:bg-white/90 transition-all duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Departments Table */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-gray-900">Departments ({filteredDepartments.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/80">
                  <TableRow className="border-gray-200/60 hover:bg-gray-50/90">
                    <TableHead className="text-gray-700 font-semibold">Department</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Code</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Head</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Location</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Employees</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Review Period</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department) => (
                    <TableRow key={department.id} className="border-gray-100 hover:bg-blue-50/30 transition-all duration-200">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{department.name}</p>
                            <p className="text-sm text-gray-500">{department.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-medium">
                          {department.code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {department.headName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{department.headName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{department.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{department.employeeCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200 font-medium">
                          <Calendar className="w-3 h-3 mr-1" />
                          {department.reviewPeriod === 'Q' ? 'Quarterly' :
                           department.reviewPeriod === 'H' ? 'Half-yearly' :
                           department.reviewPeriod === 'Y' ? 'Yearly' : 'Monthly'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          department.isActive 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                        }>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            department.isActive ? 'bg-emerald-500' : 'bg-red-500'
                          }`}></div>
                          {department.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="w-9 h-9 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(department)} className="w-9 h-9 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-all duration-200">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDepartment(department.id)}
                            className="w-9 h-9 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
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

        {/* Edit Modal */}
        {editingDepartment && (
          <Dialog open={!!editingDepartment} onOpenChange={() => setEditingDepartment(null)}>
            <DialogContent className="max-w-2xl border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">Edit Department</DialogTitle>
              </DialogHeader>
              <DepartmentForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleEditDepartment}
                onCancel={() => setEditingDepartment(null)}
                isEdit
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

// Department Form Component
interface DepartmentFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

function DepartmentForm({ formData, setFormData, onSubmit, onCancel, isEdit }: DepartmentFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Department Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter department name"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-semibold text-gray-700">Department Code *</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="Enter department code"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter department description"
          rows={3}
          className="bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-semibold text-gray-700">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Enter location"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="budgetCode" className="text-sm font-semibold text-gray-700">Budget Code</Label>
          <Input
            id="budgetCode"
            value={formData.budgetCode}
            onChange={(e) => setFormData({ ...formData, budgetCode: e.target.value })}
            placeholder="Enter budget code"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="reviewPeriod" className="text-sm font-semibold text-gray-700">Review Period</Label>
          <Select
            value={formData.reviewPeriod}
            onValueChange={(value) => setFormData({ ...formData, reviewPeriod: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200">
              <SelectValue placeholder="Select review period" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="M" className="rounded-lg">Monthly</SelectItem>
              <SelectItem value="Q" className="rounded-lg">Quarterly</SelectItem>
              <SelectItem value="H" className="rounded-lg">Half-yearly</SelectItem>
              <SelectItem value="Y" className="rounded-lg">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="headId" className="text-sm font-semibold text-gray-700">Department Head</Label>
          <Select
            value={formData.headId}
            onValueChange={(value) => setFormData({ ...formData, headId: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200">
              <SelectValue placeholder="Select department head" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="user-manager" className="rounded-lg">Michael Chen</SelectItem>
              <SelectItem value="user-hr" className="rounded-lg">Sarah Williams</SelectItem>
              <SelectItem value="user-003" className="rounded-lg">Raj Patel</SelectItem>
              <SelectItem value="user-004" className="rounded-lg">Priya Sharma</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="px-6 py-2 h-11 bg-white border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
        >
          Cancel
        </Button>
        <Button 
          onClick={onSubmit}
          className="px-6 py-2 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isEdit ? 'Update Department' : 'Create Department'}
        </Button>
      </div>
    </div>
  );
}