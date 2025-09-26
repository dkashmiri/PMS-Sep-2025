import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Copy,
  Search,
  Filter,
  Star,
  Users,
  Clock,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Lightbulb,
  Settings,
  Eye,
  Download
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

interface GoalTemplate {
  id: string;
  title: string;
  description: string;
  category: 'TECHNICAL' | 'PROFESSIONAL' | 'PERSONAL' | 'LEADERSHIP';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedDuration: number; // in days
  targetValue: string;
  measurementUnit: string;
  milestones: string[];
  successCriteria: string[];
  requiredSkills: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  tags: string[];
  isPublic: boolean;
  isApproved: boolean;
  usageCount: number;
  rating: number;
  createdBy: string;
  createdByName: string;
  createdDate: string;
  lastModified: string;
  department: string;
  kraAlignment: string[];
}

interface GoalTemplatesProps {
  user: User;
}

// Mock template data
const mockTemplates: GoalTemplate[] = [
  {
    id: 'tpl-001',
    title: 'AWS Solutions Architect Certification',
    description: 'Complete AWS Solutions Architect Associate certification to demonstrate cloud computing expertise and architectural skills.',
    category: 'TECHNICAL',
    priority: 'HIGH',
    estimatedDuration: 90,
    targetValue: '100',
    measurementUnit: '%',
    milestones: [
      'Complete AWS fundamentals course',
      'Finish hands-on labs and exercises',
      'Pass practice exams with 80%+ score',
      'Schedule and pass certification exam'
    ],
    successCriteria: [
      'Pass AWS Solutions Architect Associate exam',
      'Complete all required training modules',
      'Demonstrate practical cloud architecture skills'
    ],
    requiredSkills: ['Cloud Computing', 'AWS Services', 'Architecture Principles'],
    difficulty: 'INTERMEDIATE',
    tags: ['aws', 'certification', 'cloud', 'architecture'],
    isPublic: true,
    isApproved: true,
    usageCount: 15,
    rating: 4.8,
    createdBy: 'admin',
    createdByName: 'System Administrator',
    createdDate: '2024-01-15',
    lastModified: '2025-02-20',
    department: 'Engineering',
    kraAlignment: ['Technical Excellence', 'Professional Development']
  },
  {
    id: 'tpl-002',
    title: 'Lead Cross-Functional Project',
    description: 'Successfully lead a cross-functional project team to deliver a significant organizational initiative.',
    category: 'LEADERSHIP',
    priority: 'HIGH',
    estimatedDuration: 120,
    targetValue: '1',
    measurementUnit: 'project',
    milestones: [
      'Form and onboard project team',
      'Define project scope and timeline',
      'Execute project phases',
      'Deliver project successfully'
    ],
    successCriteria: [
      'Project delivered on time and within budget',
      'Team satisfaction score above 4.0/5.0',
      'Stakeholder approval and sign-off'
    ],
    requiredSkills: ['Project Management', 'Leadership', 'Communication', 'Stakeholder Management'],
    difficulty: 'ADVANCED',
    tags: ['leadership', 'project-management', 'teamwork', 'cross-functional'],
    isPublic: true,
    isApproved: true,
    usageCount: 12,
    rating: 4.6,
    createdBy: 'hr-001',
    createdByName: 'HR Manager',
    createdDate: '2024-02-01',
    lastModified: '2025-01-15',
    department: 'All',
    kraAlignment: ['Leadership & Collaboration', 'Project Delivery']
  },
  {
    id: 'tpl-003',
    title: 'Implement Code Review Automation',
    description: 'Design and implement automated code review processes to improve development efficiency.',
    category: 'PROFESSIONAL',
    priority: 'MEDIUM',
    estimatedDuration: 60,
    targetValue: '30',
    measurementUnit: '% time reduction',
    milestones: [
      'Research and evaluate tools',
      'Design implementation plan',
      'Deploy and configure tools',
      'Train team and measure results'
    ],
    successCriteria: [
      'Achieve 30% reduction in manual review time',
      'Maintain or improve code quality metrics',
      'Team adoption rate above 90%'
    ],
    requiredSkills: ['DevOps', 'Process Improvement', 'Tool Configuration'],
    difficulty: 'INTERMEDIATE',
    tags: ['automation', 'code-review', 'efficiency', 'devops'],
    isPublic: true,
    isApproved: true,
    usageCount: 8,
    rating: 4.4,
    createdBy: 'eng-001',
    createdByName: 'Engineering Lead',
    createdDate: '2024-03-10',
    lastModified: '2025-01-20',
    department: 'Engineering',
    kraAlignment: ['Process Improvement', 'Technical Excellence']
  },
  {
    id: 'tpl-004',
    title: 'Mentorship Program Participation',
    description: 'Participate in company mentorship program as a mentor to support junior team members.',
    category: 'PERSONAL',
    priority: 'MEDIUM',
    estimatedDuration: 180,
    targetValue: '2',
    measurementUnit: 'mentees',
    milestones: [
      'Complete mentor training',
      'Match with mentees',
      'Conduct regular mentoring sessions',
      'Complete program successfully'
    ],
    successCriteria: [
      'Complete full program duration',
      'Mentee satisfaction score above 4.0/5.0',
      'Demonstrate mentoring skills improvement'
    ],
    requiredSkills: ['Coaching', 'Communication', 'Patience', 'Active Listening'],
    difficulty: 'BEGINNER',
    tags: ['mentorship', 'coaching', 'development', 'personal-growth'],
    isPublic: true,
    isApproved: true,
    usageCount: 20,
    rating: 4.7,
    createdBy: 'hr-001',
    createdByName: 'HR Manager',
    createdDate: '2024-01-20',
    lastModified: '2024-12-15',
    department: 'All',
    kraAlignment: ['Personal Development', 'Leadership & Collaboration']
  },
  {
    id: 'tpl-005',
    title: 'Innovation Project Initiative',
    description: 'Propose and execute an innovative project that brings new value to the organization.',
    category: 'LEADERSHIP',
    priority: 'LOW',
    estimatedDuration: 150,
    targetValue: '1',
    measurementUnit: 'project',
    milestones: [
      'Identify innovation opportunity',
      'Develop project proposal',
      'Get approval and resources',
      'Execute and measure impact'
    ],
    successCriteria: [
      'Project approved by leadership',
      'Measurable business impact',
      'Innovation recognized by organization'
    ],
    requiredSkills: ['Innovation', 'Strategic Thinking', 'Proposal Writing', 'Change Management'],
    difficulty: 'EXPERT',
    tags: ['innovation', 'strategy', 'business-impact', 'leadership'],
    isPublic: false,
    isApproved: false,
    usageCount: 3,
    rating: 4.2,
    createdBy: 'user-employee',
    createdByName: 'Sarah Johnson',
    createdDate: '2024-06-15',
    lastModified: '2024-11-20',
    department: 'Product',
    kraAlignment: ['Innovation & Growth', 'Strategic Impact']
  }
];

export function GoalTemplates({ user }: GoalTemplatesProps) {
  const [templates, setTemplates] = useState<GoalTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterDifficulty, setFilterDifficulty] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'TECHNICAL' as GoalTemplate['category'],
    priority: 'MEDIUM' as GoalTemplate['priority'],
    estimatedDuration: 90,
    targetValue: '',
    measurementUnit: '',
    milestones: '',
    successCriteria: '',
    requiredSkills: '',
    difficulty: 'INTERMEDIATE' as GoalTemplate['difficulty'],
    tags: '',
    isPublic: true,
    kraAlignment: ''
  });

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'ALL' || template.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'ALL' || template.difficulty === filterDifficulty;
    const matchesStatus = filterStatus === 'ALL' || 
                         (filterStatus === 'APPROVED' && template.isApproved) ||
                         (filterStatus === 'PENDING' && !template.isApproved) ||
                         (filterStatus === 'PUBLIC' && template.isPublic) ||
                         (filterStatus === 'PRIVATE' && !template.isPublic);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

  const handleCreateTemplate = () => {
    const newTemplate: GoalTemplate = {
      id: `tpl-${Date.now()}`,
      ...formData,
      milestones: formData.milestones ? formData.milestones.split('\n').filter(m => m.trim()) : [],
      successCriteria: formData.successCriteria ? formData.successCriteria.split('\n').filter(s => s.trim()) : [],
      requiredSkills: formData.requiredSkills ? formData.requiredSkills.split(',').map(s => s.trim()) : [],
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      kraAlignment: formData.kraAlignment ? formData.kraAlignment.split(',').map(k => k.trim()) : [],
      isApproved: user.role === 'ADMIN' || user.role === 'HR',
      usageCount: 0,
      rating: 0,
      createdBy: user.id,
      createdByName: user.name,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      department: user.department
    };
    
    setTemplates([newTemplate, ...templates]);
    setShowCreateModal(false);
    resetForm();
    toast.success("Goal template created successfully!");
  };

  const handleUseTemplate = (template: GoalTemplate) => {
    // In a real app, this would navigate to goal creation with pre-filled data
    toast.success(`Template "${template.title}" ready to use!`);
  };

  const handleCloneTemplate = (template: GoalTemplate) => {
    const clonedTemplate: GoalTemplate = {
      ...template,
      id: `tpl-${Date.now()}`,
      title: `${template.title} (Copy)`,
      isApproved: false,
      usageCount: 0,
      rating: 0,
      createdBy: user.id,
      createdByName: user.name,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    setTemplates([clonedTemplate, ...templates]);
    toast.success("Template cloned successfully!");
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'TECHNICAL',
      priority: 'MEDIUM',
      estimatedDuration: 90,
      targetValue: '',
      measurementUnit: '',
      milestones: '',
      successCriteria: '',
      requiredSkills: '',
      difficulty: 'INTERMEDIATE',
      tags: '',
      isPublic: true,
      kraAlignment: ''
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return 'bg-green-100 text-green-800';
      case 'INTERMEDIATE': return 'bg-blue-100 text-blue-800';
      case 'ADVANCED': return 'bg-orange-100 text-orange-800';
      case 'EXPERT': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'TECHNICAL': return <Target className="w-4 h-4 text-blue-500" />;
      case 'PROFESSIONAL': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'LEADERSHIP': return <Users className="w-4 h-4 text-purple-500" />;
      case 'PERSONAL': return <Lightbulb className="w-4 h-4 text-orange-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Statistics
  const stats = {
    total: templates.length,
    approved: templates.filter(t => t.isApproved).length,
    public: templates.filter(t => t.isPublic).length,
    avgRating: Math.round((templates.reduce((acc, t) => acc + t.rating, 0) / templates.filter(t => t.rating > 0).length) * 10) / 10 || 0
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            Goal Templates Library
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, manage, and use pre-defined goal templates for consistent goal setting
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Goal Template</DialogTitle>
                <DialogDescription>
                  Create a reusable goal template for your organization
                </DialogDescription>
              </DialogHeader>
              <TemplateForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateTemplate}
                onCancel={() => setShowCreateModal(false)}
                mode="create"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Templates</p>
                <p className="text-2xl text-blue-600">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl text-green-600">{stats.approved}</p>
              </div>
              <Award className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Public</p>
                <p className="text-2xl text-purple-600">{stats.public}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl text-orange-600">{stats.avgRating}</p>
              </div>
              <Star className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search templates by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="TECHNICAL">Technical</SelectItem>
                <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                <SelectItem value="PERSONAL">Personal</SelectItem>
                <SelectItem value="LEADERSHIP">Leadership</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Levels</SelectItem>
                <SelectItem value="BEGINNER">Beginner</SelectItem>
                <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                <SelectItem value="ADVANCED">Advanced</SelectItem>
                <SelectItem value="EXPERT">Expert</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(template.category)}
                    <h3 className="font-medium">{template.title}</h3>
                    {!template.isPublic && (
                      <Badge variant="outline" className="text-xs">
                        Private
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {template.description}
                  </p>
                  
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.estimatedDuration} days
                    </Badge>
                    {template.isApproved && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                        Approved
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(template)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleCloneTemplate(template)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  {(template.createdBy === user.id || user.role === 'ADMIN' || user.role === 'HR') && (
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Template Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-sm font-medium">{template.usageCount}</p>
                  <p className="text-xs text-muted-foreground">Times Used</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {renderStars(template.rating)}
                  </div>
                  <p className="text-xs text-muted-foreground">{template.rating.toFixed(1)} Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{template.milestones.length}</p>
                  <p className="text-xs text-muted-foreground">Milestones</p>
                </div>
              </div>

              {/* Tags */}
              {template.tags.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap mb-3">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                      #{tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{template.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-xs text-muted-foreground">
                  <p>by {template.createdByName}</p>
                  <p>{template.department}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleCloneTemplate(template)}>
                    <Copy className="w-3 h-3 mr-1" />
                    Clone
                  </Button>
                  <Button size="sm" onClick={() => handleUseTemplate(template)}>
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Templates Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterCategory !== 'ALL' || filterDifficulty !== 'ALL' || filterStatus !== 'ALL'
                ? 'Try adjusting your search criteria or filters.'
                : 'Create your first goal template to get started.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getCategoryIcon(selectedTemplate.category)}
                {selectedTemplate.title}
              </DialogTitle>
              <DialogDescription>
                Detailed template information and usage guidelines
              </DialogDescription>
            </DialogHeader>
            <TemplateDetails template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Template Form Component
interface TemplateFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

function TemplateForm({ formData, setFormData, onSubmit, onCancel, mode }: TemplateFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Template Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter template title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="estimatedDuration">Estimated Duration (days)</Label>
          <Input
            id="estimatedDuration"
            type="number"
            min="1"
            value={formData.estimatedDuration}
            onChange={(e) => setFormData({ ...formData, estimatedDuration: parseInt(e.target.value) || 90 })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the template and its purpose"
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
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BEGINNER">Beginner</SelectItem>
              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
              <SelectItem value="ADVANCED">Advanced</SelectItem>
              <SelectItem value="EXPERT">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <Label htmlFor="milestones">Milestones (one per line)</Label>
        <Textarea
          id="milestones"
          value={formData.milestones}
          onChange={(e) => setFormData({ ...formData, milestones: e.target.value })}
          placeholder="Complete training&#10;Pass assessment&#10;Implement solution"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="successCriteria">Success Criteria (one per line)</Label>
        <Textarea
          id="successCriteria"
          value={formData.successCriteria}
          onChange={(e) => setFormData({ ...formData, successCriteria: e.target.value })}
          placeholder="Achieve target score&#10;Complete within timeline&#10;Receive positive feedback"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="requiredSkills">Required Skills (comma-separated)</Label>
          <Input
            id="requiredSkills"
            value={formData.requiredSkills}
            onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
            placeholder="Communication, Leadership, Technical"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="certification, aws, cloud"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="kraAlignment">KRA Alignment (comma-separated)</Label>
        <Input
          id="kraAlignment"
          value={formData.kraAlignment}
          onChange={(e) => setFormData({ ...formData, kraAlignment: e.target.value })}
          placeholder="Technical Excellence, Professional Development"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPublic"
          checked={formData.isPublic}
          onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
          className="h-4 w-4"
        />
        <Label htmlFor="isPublic" className="text-sm">
          Make this template publicly available to all users
        </Label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          {mode === 'create' ? 'Create Template' : 'Update Template'}
        </Button>
      </div>
    </div>
  );
}

// Template Details Component
interface TemplateDetailsProps {
  template: GoalTemplate;
  onClose: () => void;
}

function TemplateDetails({ template, onClose }: TemplateDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Template Header */}
      <div className="border-b pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{template.category}</Badge>
            <Badge className={getDifficultyColor(template.difficulty)}>{template.difficulty}</Badge>
            <Badge variant="outline">{template.estimatedDuration} days</Badge>
            {template.isApproved && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Approved
              </Badge>
            )}
            {template.isPublic && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Public
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(template.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground">({template.rating.toFixed(1)})</span>
          </div>
        </div>
        <p className="text-muted-foreground">{template.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div>
          <h4 className="font-medium mb-3">Template Information</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Priority</span>
              <span>{template.priority}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Target Value</span>
              <span>{template.targetValue} {template.measurementUnit}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated Duration</span>
              <span>{template.estimatedDuration} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Usage Count</span>
              <span>{template.usageCount} times</span>
            </div>
          </div>
        </div>

        {/* Creation Details */}
        <div>
          <h4 className="font-medium mb-3">Creation Details</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created by</span>
              <span>{template.createdByName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Department</span>
              <span>{template.department}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created on</span>
              <span>{template.createdDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last modified</span>
              <span>{template.lastModified}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      {template.milestones.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Milestones</h4>
          <div className="space-y-2">
            {template.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                </div>
                <span className="text-sm">{milestone}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Criteria */}
      {template.successCriteria.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Success Criteria</h4>
          <div className="space-y-2">
            {template.successCriteria.map((criteria, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm">{criteria}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Required Skills */}
      {template.requiredSkills.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {template.requiredSkills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Tags and KRA Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {template.tags.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {template.kraAlignment.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">KRA Alignment</h4>
            <div className="flex flex-wrap gap-2">
              {template.kraAlignment.map((kra, index) => (
                <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                  {kra}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Clone Template
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper functions (reused)
function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'BEGINNER': return 'bg-green-100 text-green-800';
    case 'INTERMEDIATE': return 'bg-blue-100 text-blue-800';
    case 'ADVANCED': return 'bg-orange-100 text-orange-800';
    case 'EXPERT': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}