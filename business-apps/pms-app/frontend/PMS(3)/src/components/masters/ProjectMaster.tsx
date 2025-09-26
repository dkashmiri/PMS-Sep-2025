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
  FolderOpen,
  Users,
  Calendar,
  Eye,
  Building2,
  Layers
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

interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  departmentId: string;
  departmentName: string;
  domainId: string;
  domainName: string;
  leadId: string;
  leadName: string;
  managerId: string;
  managerName: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  budget: number;
  teamSize: number;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
}

interface ProjectMasterProps {
  user: User;
}

export function ProjectMaster({ user }: ProjectMasterProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj-001',
      name: 'Web Platform Modernization',
      code: 'WPM2025',
      description: 'Modernize the existing web platform with new technologies and improved user experience',
      departmentId: 'dept-001',
      departmentName: 'Engineering',
      domainId: 'domain-001',
      domainName: 'Development',
      leadId: 'user-teamlead',
      leadName: 'Jessica Wong',
      managerId: 'user-manager',
      managerName: 'Michael Chen',
      startDate: '2025-01-15',
      endDate: '2025-06-30',
      status: 'ACTIVE',
      priority: 'HIGH',
      budget: 500000,
      teamSize: 12,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-12-15'
    },
    {
      id: 'proj-002',
      name: 'Mobile App Development',
      code: 'MAD2025',
      description: 'Develop a new mobile application for iOS and Android platforms',
      departmentId: 'dept-001',
      departmentName: 'Engineering',
      domainId: 'domain-001',
      domainName: 'Development',
      leadId: 'user-lead2',
      leadName: 'Alex Kumar',
      managerId: 'user-manager',
      managerName: 'Michael Chen',
      startDate: '2025-02-01',
      endDate: '2025-08-31',
      status: 'ACTIVE',
      priority: 'HIGH',
      budget: 350000,
      teamSize: 8,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2025-01-20'
    },
    {
      id: 'proj-003',
      name: 'Quality Automation Framework',
      code: 'QAF2025',
      description: 'Implement comprehensive test automation framework for all products',
      departmentId: 'dept-001',
      departmentName: 'Engineering',
      domainId: 'domain-002',
      domainName: 'Quality Assurance',
      leadId: 'user-lead3',
      leadName: 'Priya Desai',
      managerId: 'user-manager',
      managerName: 'Michael Chen',
      startDate: '2025-01-01',
      endDate: '2025-05-31',
      status: 'ACTIVE',
      priority: 'MEDIUM',
      budget: 200000,
      teamSize: 6,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-12-01'
    },
    {
      id: 'proj-004',
      name: 'HR Portal Enhancement',
      code: 'HPE2024',
      description: 'Enhanced HR portal with new features and improved workflows',
      departmentId: 'dept-002',
      departmentName: 'Human Resources',
      domainId: 'domain-001',
      domainName: 'Development',
      leadId: 'user-lead4',
      leadName: 'Rahul Singh',
      managerId: 'user-hr',
      managerName: 'Sarah Williams',
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      status: 'COMPLETED',
      priority: 'MEDIUM',
      budget: 150000,
      teamSize: 5,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-09-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    departmentId: '',
    domainId: '',
    leadId: '',
    managerId: '',
    startDate: '',
    endDate: '',
    priority: 'MEDIUM' as Project['priority'],
    budget: ''
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || project.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      ...formData,
      budget: parseFloat(formData.budget) || 0,
      departmentName: 'Engineering', // Mock data
      domainName: 'Development', // Mock data
      leadName: 'To be assigned',
      managerName: 'To be assigned',
      status: 'ACTIVE',
      teamSize: 0,
      isActive: true,
      createdBy: user.id,
      createdOn: new Date().toISOString().split('T')[0]
    };
    
    setProjects([...projects, newProject]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditProject = () => {
    if (!editingProject) return;
    
    const updatedProject = {
      ...editingProject,
      ...formData,
      budget: parseFloat(formData.budget) || editingProject.budget
    };
    
    setProjects(projects.map(project =>
      project.id === editingProject.id ? updatedProject : project
    ));
    setEditingProject(null);
    resetForm();
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, isActive: false } : project
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      departmentId: '',
      domainId: '',
      leadId: '',
      managerId: '',
      startDate: '',
      endDate: '',
      priority: 'MEDIUM',
      budget: ''
    });
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      code: project.code,
      description: project.description,
      departmentId: project.departmentId,
      domainId: project.domainId,
      leadId: project.leadId,
      managerId: project.managerId,
      startDate: project.startDate,
      endDate: project.endDate,
      priority: project.priority,
      budget: project.budget.toString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-cyan-50/30">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Project Master</h1>
                <p className="text-gray-500 mt-1">Manage organizational projects and assignments</p>
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
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add New Project</DialogTitle>
                </DialogHeader>
                <ProjectForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleAddProject}
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
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-emerald-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Projects</p>
                    <p className="text-3xl font-bold text-gray-900">{projects.filter(p => p.isActive).length}</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FolderOpen className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-teal-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Active Projects</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {projects.filter(p => p.status === 'ACTIVE').length}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-cyan-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Team Members</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {projects.reduce((sum, project) => sum + project.teamSize, 0)}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-7 h-7 text-white" />
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
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Budget</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${(projects.reduce((sum, project) => sum + project.budget, 0) / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
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
                  placeholder="Search projects by name, code, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white/80 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48 h-12 bg-white/80 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-200 shadow-xl">
                  <SelectItem value="ALL" className="rounded-lg">All Status</SelectItem>
                  <SelectItem value="ACTIVE" className="rounded-lg">Active</SelectItem>
                  <SelectItem value="COMPLETED" className="rounded-lg">Completed</SelectItem>
                  <SelectItem value="ON_HOLD" className="rounded-lg">On Hold</SelectItem>
                  <SelectItem value="CANCELLED" className="rounded-lg">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-gray-900">Projects ({filteredProjects.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/80">
                  <TableRow className="border-gray-200/60 hover:bg-gray-50/90">
                    <TableHead className="text-gray-700 font-semibold">Project</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Department</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Domain</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Team Lead</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Timeline</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Team Size</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Budget</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id} className="border-gray-100 hover:bg-emerald-50/30 transition-all duration-200">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
                            <FolderOpen className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{project.name}</p>
                            <p className="text-xs text-gray-500 font-mono">{project.code}</p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{project.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 font-medium">
                          {project.departmentName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-teal-100 text-teal-800 border-teal-200 font-medium">
                          {project.domainName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {project.leadName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{project.leadName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1 text-gray-700">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span>{project.startDate}</span>
                          </div>
                          <p className="text-gray-500 text-xs">to {project.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{project.teamSize}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-bold text-white">$</span>
                          </div>
                          <span className="font-semibold text-gray-900">${(project.budget / 1000).toFixed(0)}K</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          project.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          project.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          project.status === 'ON_HOLD' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            project.status === 'ACTIVE' ? 'bg-emerald-500' :
                            project.status === 'COMPLETED' ? 'bg-blue-500' :
                            project.status === 'ON_HOLD' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="w-9 h-9 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(project)} className="w-9 h-9 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-all duration-200">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
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
        {editingProject && (
          <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
            <DialogContent className="max-w-3xl border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">Edit Project</DialogTitle>
              </DialogHeader>
              <ProjectForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleEditProject}
                onCancel={() => setEditingProject(null)}
                isEdit
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

// Project Form Component
interface ProjectFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

function ProjectForm({ formData, setFormData, onSubmit, onCancel, isEdit }: ProjectFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Project Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter project name"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-semibold text-gray-700">Project Code *</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="Enter project code"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200"
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
          placeholder="Enter project description"
          rows={3}
          className="bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="departmentId" className="text-sm font-semibold text-gray-700">Department</Label>
          <Select
            value={formData.departmentId}
            onValueChange={(value) => setFormData({ ...formData, departmentId: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="dept-001" className="rounded-lg">Engineering</SelectItem>
              <SelectItem value="dept-002" className="rounded-lg">Human Resources</SelectItem>
              <SelectItem value="dept-003" className="rounded-lg">Sales & Marketing</SelectItem>
              <SelectItem value="dept-004" className="rounded-lg">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="domainId" className="text-sm font-semibold text-gray-700">Domain</Label>
          <Select
            value={formData.domainId}
            onValueChange={(value) => setFormData({ ...formData, domainId: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="domain-001" className="rounded-lg">Development</SelectItem>
              <SelectItem value="domain-002" className="rounded-lg">Quality Assurance</SelectItem>
              <SelectItem value="domain-003" className="rounded-lg">DevOps</SelectItem>
              <SelectItem value="domain-004" className="rounded-lg">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="leadId" className="text-sm font-semibold text-gray-700">Project Lead</Label>
          <Select
            value={formData.leadId}
            onValueChange={(value) => setFormData({ ...formData, leadId: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200">
              <SelectValue placeholder="Select project lead" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="user-teamlead" className="rounded-lg">Jessica Wong</SelectItem>
              <SelectItem value="user-lead2" className="rounded-lg">Alex Kumar</SelectItem>
              <SelectItem value="user-lead3" className="rounded-lg">Priya Desai</SelectItem>
              <SelectItem value="user-lead4" className="rounded-lg">Rahul Singh</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="managerId" className="text-sm font-semibold text-gray-700">Project Manager</Label>
          <Select
            value={formData.managerId}
            onValueChange={(value) => setFormData({ ...formData, managerId: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200">
              <SelectValue placeholder="Select project manager" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="user-manager" className="rounded-lg">Michael Chen</SelectItem>
              <SelectItem value="user-hr" className="rounded-lg">Sarah Williams</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-sm font-semibold text-gray-700">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate" className="text-sm font-semibold text-gray-700">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="priority" className="text-sm font-semibold text-gray-700">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="LOW" className="rounded-lg">Low</SelectItem>
              <SelectItem value="MEDIUM" className="rounded-lg">Medium</SelectItem>
              <SelectItem value="HIGH" className="rounded-lg">High</SelectItem>
              <SelectItem value="CRITICAL" className="rounded-lg">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget" className="text-sm font-semibold text-gray-700">Budget (USD)</Label>
        <Input
          id="budget"
          type="number"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          placeholder="Enter project budget"
          className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200"
        />
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
          className="px-6 py-2 h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isEdit ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </div>
  );
}