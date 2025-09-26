import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
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
  Layers,
  Users,
  BarChart3,
  Eye,
  Code,
  Palette
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

interface Domain {
  id: string;
  name: string;
  code: string;
  description: string;
  skills: string[];
  certifications: string[];
  employeeCount: number;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
}

interface DomainMasterProps {
  user: User;
}

export function DomainMaster({ user }: DomainMasterProps) {
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: 'domain-001',
      name: 'Development',
      code: 'DEV',
      description: 'Software development and programming',
      skills: ['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker'],
      certifications: ['AWS Certified Developer', 'Google Cloud Professional', 'Microsoft Azure'],
      employeeCount: 35,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-15'
    },
    {
      id: 'domain-002',
      name: 'Quality Assurance',
      code: 'QA',
      description: 'Software testing and quality assurance',
      skills: ['Selenium', 'Jest', 'Cypress', 'Manual Testing', 'API Testing', 'Performance Testing'],
      certifications: ['ISTQB Certified', 'Agile Testing Certified', 'Automation Testing Expert'],
      employeeCount: 18,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-15'
    },
    {
      id: 'domain-003',
      name: 'DevOps',
      code: 'DEVOPS',
      description: 'Development operations and infrastructure',
      skills: ['Kubernetes', 'Jenkins', 'Terraform', 'Ansible', 'Monitoring', 'CI/CD'],
      certifications: ['AWS DevOps Engineer', 'Kubernetes Certified', 'Docker Certified'],
      employeeCount: 12,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-20'
    },
    {
      id: 'domain-004',
      name: 'Marketing',
      code: 'MKT',
      description: 'Digital marketing and brand management',
      skills: ['SEO', 'Content Marketing', 'Social Media', 'Analytics', 'Email Marketing', 'PPC'],
      certifications: ['Google Ads Certified', 'HubSpot Certified', 'Facebook Blueprint'],
      employeeCount: 22,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-10'
    },
    {
      id: 'domain-005',
      name: 'Data Science',
      code: 'DS',
      description: 'Data analysis and machine learning',
      skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Tableau', 'TensorFlow'],
      certifications: ['Google Data Engineer', 'Microsoft Data Scientist', 'Tableau Desktop Specialist'],
      employeeCount: 8,
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-02-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    skills: '',
    certifications: ''
  });

  const filteredDomains = domains.filter(domain =>
    domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDomain = () => {
    const newDomain: Domain = {
      id: `domain-${Date.now()}`,
      name: formData.name,
      code: formData.code,
      description: formData.description,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      certifications: formData.certifications.split(',').map(s => s.trim()).filter(s => s),
      employeeCount: 0,
      isActive: true,
      createdBy: user.id,
      createdOn: new Date().toISOString().split('T')[0]
    };
    
    setDomains([...domains, newDomain]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditDomain = () => {
    if (!editingDomain) return;
    
    const updatedDomain = {
      ...editingDomain,
      name: formData.name,
      code: formData.code,
      description: formData.description,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      certifications: formData.certifications.split(',').map(s => s.trim()).filter(s => s)
    };
    
    setDomains(domains.map(domain =>
      domain.id === editingDomain.id ? updatedDomain : domain
    ));
    setEditingDomain(null);
    resetForm();
  };

  const handleDeleteDomain = (id: string) => {
    setDomains(domains.map(domain =>
      domain.id === id ? { ...domain, isActive: false } : domain
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      skills: '',
      certifications: ''
    });
  };

  const openEditModal = (domain: Domain) => {
    setEditingDomain(domain);
    setFormData({
      name: domain.name,
      code: domain.code,
      description: domain.description,
      skills: domain.skills.join(', '),
      certifications: domain.certifications.join(', ')
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Domain Master</h1>
                <p className="text-gray-500 mt-1">Organize work domains and skill categories</p>
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
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Domain
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add New Domain</DialogTitle>
                </DialogHeader>
                <DomainForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleAddDomain}
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
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-indigo-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Domains</p>
                    <p className="text-3xl font-bold text-gray-900">{domains.filter(d => d.isActive).length}</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Layers className="w-7 h-7 text-white" />
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
                      {domains.reduce((sum, domain) => sum + domain.employeeCount, 0)}
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
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Skills</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {new Set(domains.flatMap(d => d.skills)).size}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Code className="w-7 h-7 text-white" />
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
                    <p className="text-sm font-medium text-gray-600 mb-1">Certifications</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {new Set(domains.flatMap(d => d.certifications)).size}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Palette className="w-7 h-7 text-white" />
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
                  placeholder="Search domains by name, code, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white/80 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-200"
                />
              </div>
              <Button variant="outline" className="h-12 px-6 bg-white/80 border-gray-200 rounded-xl hover:bg-white/90 transition-all duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Domains Table */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-gray-900">Domains ({filteredDomains.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/80">
                  <TableRow className="border-gray-200/60 hover:bg-gray-50/90">
                    <TableHead className="text-gray-700 font-semibold">Domain</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Code</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Employees</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Key Skills</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Certifications</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDomains.map((domain) => (
                    <TableRow key={domain.id} className="border-gray-100 hover:bg-indigo-50/30 transition-all duration-200">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                            <Layers className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{domain.name}</p>
                            <p className="text-sm text-gray-500">{domain.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 font-medium">
                          {domain.code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{domain.employeeCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {domain.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} className="text-xs bg-purple-100 text-purple-800 border-purple-200">
                              {skill}
                            </Badge>
                          ))}
                          {domain.skills.length > 3 && (
                            <Badge className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                              +{domain.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {domain.certifications.slice(0, 2).map((cert, index) => (
                            <Badge key={index} className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                              {cert}
                            </Badge>
                          ))}
                          {domain.certifications.length > 2 && (
                            <Badge className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                              +{domain.certifications.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          domain.isActive 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                        }>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            domain.isActive ? 'bg-emerald-500' : 'bg-red-500'
                          }`}></div>
                          {domain.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="w-9 h-9 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(domain)} className="w-9 h-9 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-all duration-200">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDomain(domain.id)}
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
        {editingDomain && (
          <Dialog open={!!editingDomain} onOpenChange={() => setEditingDomain(null)}>
            <DialogContent className="max-w-2xl border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">Edit Domain</DialogTitle>
              </DialogHeader>
              <DomainForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleEditDomain}
                onCancel={() => setEditingDomain(null)}
                isEdit
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

// Domain Form Component
interface DomainFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

function DomainForm({ formData, setFormData, onSubmit, onCancel, isEdit }: DomainFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Domain Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter domain name"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-200"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-semibold text-gray-700">Domain Code *</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="Enter domain code"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-200"
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
          placeholder="Enter domain description"
          rows={3}
          className="bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-200 resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills" className="text-sm font-semibold text-gray-700">Key Skills</Label>
        <Textarea
          id="skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
          rows={3}
          className="bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-200 resize-none"
        />
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          Separate multiple skills with commas
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="certifications" className="text-sm font-semibold text-gray-700">Relevant Certifications</Label>
        <Textarea
          id="certifications"
          value={formData.certifications}
          onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
          placeholder="Enter certifications separated by commas (e.g., AWS Certified Developer, Google Cloud Professional)"
          rows={3}
          className="bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-200 resize-none"
        />
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          Separate multiple certifications with commas
        </p>
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
          className="px-6 py-2 h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isEdit ? 'Update Domain' : 'Create Domain'}
        </Button>
      </div>
    </div>
  );
}