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
  Target,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Trash2,
  BarChart3,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
}

interface KRA {
  id: string;
  title: string;
  description: string;
  category: 'INDIVIDUAL' | 'TEAM' | 'ORGANIZATIONAL';
  department: string;
  domain: string;
  weightage: number;
  measurementCriteria: string;
  targetValue: string;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY';
  isActive: boolean;
  createdBy: string;
  createdOn: string;
}

interface KRAMasterProps {
  user: User;
}

export function KRAMaster({ user }: KRAMasterProps) {
  const [kras, setKras] = useState<KRA[]>([
    {
      id: 'kra-001',
      title: 'Code Quality & Review',
      description: 'Maintain high code quality standards and participate in code reviews',
      category: 'INDIVIDUAL',
      department: 'Engineering',
      domain: 'Development',
      weightage: 25,
      measurementCriteria: 'Code review approval rate, bug density, technical debt reduction',
      targetValue: '90% approval rate, <2 bugs per 1000 lines',
      frequency: 'QUARTERLY',
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-15'
    },
    {
      id: 'kra-002',
      title: 'Project Delivery',
      description: 'Deliver assigned project milestones within timeline and quality standards',
      category: 'INDIVIDUAL',
      department: 'Engineering',
      domain: 'Development',
      weightage: 30,
      measurementCriteria: 'On-time delivery percentage, milestone completion rate',
      targetValue: '95% on-time delivery',
      frequency: 'QUARTERLY',
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-15'
    },
    {
      id: 'kra-003',
      title: 'Team Collaboration',
      description: 'Effective collaboration with team members and stakeholders',
      category: 'TEAM',
      department: 'Engineering',
      domain: 'Development',
      weightage: 20,
      measurementCriteria: 'Peer feedback scores, meeting participation, knowledge sharing',
      targetValue: '4.5/5 peer rating',
      frequency: 'QUARTERLY',
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-15'
    },
    {
      id: 'kra-004',
      title: 'Innovation & Learning',
      description: 'Contribute to innovation and continuous learning initiatives',
      category: 'INDIVIDUAL',
      department: 'Engineering',
      domain: 'Development',
      weightage: 15,
      measurementCriteria: 'Training completions, innovation proposals, tech talks delivered',
      targetValue: '2 certifications, 1 tech talk per quarter',
      frequency: 'QUARTERLY',
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-15'
    },
    {
      id: 'kra-005',
      title: 'Customer Satisfaction',
      description: 'Ensure high levels of customer satisfaction through quality deliverables',
      category: 'ORGANIZATIONAL',
      department: 'Engineering',
      domain: 'Development',
      weightage: 10,
      measurementCriteria: 'Customer feedback scores, issue resolution time',
      targetValue: '4.8/5 customer rating',
      frequency: 'QUARTERLY',
      isActive: true,
      createdBy: 'admin',
      createdOn: '2024-01-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingKRA, setEditingKRA] = useState<KRA | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'INDIVIDUAL' as KRA['category'],
    department: '',
    domain: '',
    weightage: '',
    measurementCriteria: '',
    targetValue: '',
    frequency: 'QUARTERLY' as KRA['frequency']
  });

  const filteredKRAs = kras.filter(kra => {
    const matchesSearch = kra.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kra.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kra.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || kra.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddKRA = () => {
    const newKRA: KRA = {
      id: `kra-${Date.now()}`,
      ...formData,
      weightage: parseFloat(formData.weightage) || 0,
      isActive: true,
      createdBy: user.id,
      createdOn: new Date().toISOString().split('T')[0]
    };
    
    setKras([...kras, newKRA]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditKRA = () => {
    if (!editingKRA) return;
    
    const updatedKRA = {
      ...editingKRA,
      ...formData,
      weightage: parseFloat(formData.weightage) || editingKRA.weightage
    };
    
    setKras(kras.map(kra =>
      kra.id === editingKRA.id ? updatedKRA : kra
    ));
    setEditingKRA(null);
    resetForm();
  };

  const handleDeleteKRA = (id: string) => {
    setKras(kras.map(kra =>
      kra.id === id ? { ...kra, isActive: false } : kra
    ));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'INDIVIDUAL',
      department: '',
      domain: '',
      weightage: '',
      measurementCriteria: '',
      targetValue: '',
      frequency: 'QUARTERLY'
    });
  };

  const openEditModal = (kra: KRA) => {
    setEditingKRA(kra);
    setFormData({
      title: kra.title,
      description: kra.description,
      category: kra.category,
      department: kra.department,
      domain: kra.domain,
      weightage: kra.weightage.toString(),
      measurementCriteria: kra.measurementCriteria,
      targetValue: kra.targetValue,
      frequency: kra.frequency
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 via-pink-50/20 to-red-50/30">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">KRA Master</h1>
                <p className="text-gray-500 mt-1">Manage Key Result Areas and performance criteria</p>
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
                <Button className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add KRA
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add New KRA</DialogTitle>
                </DialogHeader>
                <KRAForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleAddKRA}
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
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-rose-400/20 to-rose-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total KRAs</p>
                    <p className="text-3xl font-bold text-gray-900">{kras.filter(k => k.isActive).length}</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/30 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Individual KRAs</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {kras.filter(k => k.category === 'INDIVIDUAL' && k.isActive).length}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-7 h-7 text-white" />
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
                    <p className="text-sm font-medium text-gray-600 mb-1">Team KRAs</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {kras.filter(k => k.category === 'TEAM' && k.isActive).length}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-7 h-7 text-white" />
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
                    <p className="text-sm font-medium text-gray-600 mb-1">Organizational KRAs</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {kras.filter(k => k.category === 'ORGANIZATIONAL' && k.isActive).length}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
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
                  placeholder="Search KRAs by title, description, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white/80 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48 h-12 bg-white/80 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-200 shadow-xl">
                  <SelectItem value="ALL" className="rounded-lg">All Categories</SelectItem>
                  <SelectItem value="INDIVIDUAL" className="rounded-lg">Individual</SelectItem>
                  <SelectItem value="TEAM" className="rounded-lg">Team</SelectItem>
                  <SelectItem value="ORGANIZATIONAL" className="rounded-lg">Organizational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* KRAs Table */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-gray-900">KRAs ({filteredKRAs.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/80">
                  <TableRow className="border-gray-200/60 hover:bg-gray-50/90">
                    <TableHead className="text-gray-700 font-semibold">KRA Title</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Category</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Department</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Weightage</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Frequency</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKRAs.map((kra) => (
                    <TableRow key={kra.id} className="border-gray-100 hover:bg-rose-50/30 transition-all duration-200">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-600 rounded-xl flex items-center justify-center shadow-sm">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{kra.title}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{kra.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          kra.category === 'INDIVIDUAL' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          kra.category === 'TEAM' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          'bg-purple-100 text-purple-800 border-purple-200'
                        }>
                          {kra.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{kra.department}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{kra.domain}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{kra.weightage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                          {kra.frequency}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          kra.isActive 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                        }>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            kra.isActive ? 'bg-emerald-500' : 'bg-red-500'
                          }`}></div>
                          {kra.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="w-9 h-9 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(kra)} className="w-9 h-9 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-all duration-200">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteKRA(kra.id)}
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
        {editingKRA && (
          <Dialog open={!!editingKRA} onOpenChange={() => setEditingKRA(null)}>
            <DialogContent className="max-w-3xl border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">Edit KRA</DialogTitle>
              </DialogHeader>
              <KRAForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleEditKRA}
                onCancel={() => setEditingKRA(null)}
                isEdit
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

// KRA Form Component
interface KRAFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

function KRAForm({ formData, setFormData, onSubmit, onCancel, isEdit }: KRAFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-semibold text-gray-700">KRA Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter KRA title"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-semibold text-gray-700">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="INDIVIDUAL" className="rounded-lg">Individual</SelectItem>
              <SelectItem value="TEAM" className="rounded-lg">Team</SelectItem>
              <SelectItem value="ORGANIZATIONAL" className="rounded-lg">Organizational</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter KRA description"
          rows={3}
          className="bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="department" className="text-sm font-semibold text-gray-700">Department</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData({ ...formData, department: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="Engineering" className="rounded-lg">Engineering</SelectItem>
              <SelectItem value="Human Resources" className="rounded-lg">Human Resources</SelectItem>
              <SelectItem value="Sales & Marketing" className="rounded-lg">Sales & Marketing</SelectItem>
              <SelectItem value="Finance" className="rounded-lg">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="domain" className="text-sm font-semibold text-gray-700">Domain</Label>
          <Select
            value={formData.domain}
            onValueChange={(value) => setFormData({ ...formData, domain: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="Development" className="rounded-lg">Development</SelectItem>
              <SelectItem value="Quality Assurance" className="rounded-lg">Quality Assurance</SelectItem>
              <SelectItem value="DevOps" className="rounded-lg">DevOps</SelectItem>
              <SelectItem value="Marketing" className="rounded-lg">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weightage" className="text-sm font-semibold text-gray-700">Weightage (%)</Label>
          <Input
            id="weightage"
            type="number"
            min="0"
            max="100"
            value={formData.weightage}
            onChange={(e) => setFormData({ ...formData, weightage: e.target.value })}
            placeholder="Enter weightage"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="measurementCriteria" className="text-sm font-semibold text-gray-700">Measurement Criteria</Label>
        <Textarea
          id="measurementCriteria"
          value={formData.measurementCriteria}
          onChange={(e) => setFormData({ ...formData, measurementCriteria: e.target.value })}
          placeholder="Enter measurement criteria"
          rows={2}
          className="bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="targetValue" className="text-sm font-semibold text-gray-700">Target Value</Label>
          <Input
            id="targetValue"
            value={formData.targetValue}
            onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
            placeholder="Enter target value"
            className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="frequency" className="text-sm font-semibold text-gray-700">Frequency</Label>
          <Select
            value={formData.frequency}
            onValueChange={(value) => setFormData({ ...formData, frequency: value })}
          >
            <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="MONTHLY" className="rounded-lg">Monthly</SelectItem>
              <SelectItem value="QUARTERLY" className="rounded-lg">Quarterly</SelectItem>
              <SelectItem value="HALF_YEARLY" className="rounded-lg">Half-yearly</SelectItem>
              <SelectItem value="YEARLY" className="rounded-lg">Yearly</SelectItem>
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
          className="px-6 py-2 h-11 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isEdit ? 'Update KRA' : 'Create KRA'}
        </Button>
      </div>
    </div>
  );
}