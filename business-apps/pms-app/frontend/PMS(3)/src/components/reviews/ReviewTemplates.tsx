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
import { Slider } from "../ui/slider";
import { 
  FileText, 
  Target, 
  Award, 
  Star, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Download, 
  Upload,
  Eye,
  Save,
  Search,
  Filter,
  Users,
  Calendar,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Layout
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

interface ReviewTemplatesProps {
  user: User;
}

interface TemplateSection {
  id: string;
  title: string;
  description: string;
  type: 'KRA' | 'Goal' | 'Competency' | 'Custom';
  weight: number;
  isRequired: boolean;
  items: TemplateSectionItem[];
}

interface TemplateSectionItem {
  id: string;
  description: string;
  ratingScale: number;
  isRequired: boolean;
  weight: number;
  helpText: string;
}

interface ReviewTemplate {
  id: string;
  name: string;
  description: string;
  type: 'Self-Assessment' | 'R1-Review' | 'R2-Review' | 'Goal-KRA-Matrix' | 'Custom';
  category: 'Annual' | 'Quarterly' | 'Project-Based' | 'Custom';
  isActive: boolean;
  isDefault: boolean;
  totalWeight: number;
  sections: TemplateSection[];
  ratingScale: {
    min: number;
    max: number;
    labels: string[];
  };
  applicableRoles: string[];
  departments: string[];
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
  usageCount: number;
}

interface TemplateLibrary {
  id: string;
  name: string;
  description: string;
  category: string;
  isPublic: boolean;
  downloadCount: number;
  rating: number;
  author: string;
}

const mockRatingScales = {
  '5-point': {
    min: 1,
    max: 5,
    labels: ['Unsatisfactory', 'Below Expectations', 'Meets Expectations', 'Exceeds Expectations', 'Outstanding']
  },
  '4-point': {
    min: 1,
    max: 4,
    labels: ['Below Expectations', 'Meets Expectations', 'Exceeds Expectations', 'Outstanding']
  },
  '10-point': {
    min: 1,
    max: 10,
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  }
};

const mockReviewTemplates: ReviewTemplate[] = [
  {
    id: 'template-1',
    name: 'Standard Annual Review',
    description: 'Comprehensive annual performance review template with KRA, goals, and competencies',
    type: 'Goal-KRA-Matrix',
    category: 'Annual',
    isActive: true,
    isDefault: true,
    totalWeight: 100,
    sections: [
      {
        id: 'kra-section',
        title: 'Key Result Areas',
        description: 'Performance against defined KRAs',
        type: 'KRA',
        weight: 60,
        isRequired: true,
        items: [
          {
            id: 'kra-1',
            description: 'Technical Delivery & Quality',
            ratingScale: 5,
            isRequired: true,
            weight: 30,
            helpText: 'Evaluate technical skills and delivery quality'
          }
        ]
      },
      {
        id: 'goal-section',
        title: 'Individual Goals',
        description: 'Achievement of individual objectives',
        type: 'Goal',
        weight: 30,
        isRequired: true,
        items: [
          {
            id: 'goal-1',
            description: 'Personal Development Goals',
            ratingScale: 5,
            isRequired: true,
            weight: 15,
            helpText: 'Progress on personal and professional development'
          }
        ]
      }
    ],
    ratingScale: mockRatingScales['5-point'],
    applicableRoles: ['EMPLOYEE', 'TEAMLEAD', 'MANAGER'],
    departments: ['All'],
    createdBy: 'HR Admin',
    createdDate: new Date('2024-01-15'),
    lastModified: new Date('2024-02-20'),
    usageCount: 145
  },
  {
    id: 'template-2',
    name: 'Quarterly Goal Review',
    description: 'Focused quarterly review for goal tracking and adjustment',
    type: 'Goal-KRA-Matrix',
    category: 'Quarterly',
    isActive: true,
    isDefault: false,
    totalWeight: 100,
    sections: [
      {
        id: 'goal-progress',
        title: 'Goal Progress',
        description: 'Quarterly goal achievement assessment',
        type: 'Goal',
        weight: 70,
        isRequired: true,
        items: []
      },
      {
        id: 'kra-alignment',
        title: 'KRA Alignment',
        description: 'How goals align with key responsibilities',
        type: 'KRA',
        weight: 30,
        isRequired: true,
        items: []
      }
    ],
    ratingScale: mockRatingScales['5-point'],
    applicableRoles: ['EMPLOYEE', 'TEAMLEAD', 'MANAGER'],
    departments: ['Engineering', 'Product'],
    createdBy: 'Engineering Manager',
    createdDate: new Date('2024-02-01'),
    lastModified: new Date('2024-02-15'),
    usageCount: 89
  }
];

const mockTemplateLibrary: TemplateLibrary[] = [
  {
    id: 'lib-1',
    name: 'Tech Leadership Review',
    description: 'Specialized template for technical leadership roles',
    category: 'Leadership',
    isPublic: true,
    downloadCount: 23,
    rating: 4.8,
    author: 'Tech Community'
  },
  {
    id: 'lib-2',
    name: 'Sales Performance Matrix',
    description: 'Revenue-focused performance evaluation',
    category: 'Sales',
    isPublic: true,
    downloadCount: 45,
    rating: 4.6,
    author: 'Sales Excellence Team'
  },
  {
    id: 'lib-3',
    name: 'Customer Success Review',
    description: 'Customer-centric performance metrics',
    category: 'Customer Success',
    isPublic: true,
    downloadCount: 31,
    rating: 4.7,
    author: 'CS Best Practices'
  }
];

export function ReviewTemplates({ user }: ReviewTemplatesProps) {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<ReviewTemplate | null>(null);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');

  // Template creation form state
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateType, setTemplateType] = useState<'Self-Assessment' | 'R1-Review' | 'R2-Review' | 'Goal-KRA-Matrix' | 'Custom'>('Goal-KRA-Matrix');
  const [templateCategory, setTemplateCategory] = useState<'Annual' | 'Quarterly' | 'Project-Based' | 'Custom'>('Annual');
  const [selectedRatingScale, setSelectedRatingScale] = useState('5-point');
  const [templateSections, setTemplateSections] = useState<TemplateSection[]>([]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Goal-KRA-Matrix': return 'bg-blue-100 text-blue-800';
      case 'Self-Assessment': return 'bg-green-100 text-green-800';
      case 'R1-Review': return 'bg-yellow-100 text-yellow-800';
      case 'R2-Review': return 'bg-purple-100 text-purple-800';
      case 'Custom': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Annual': return 'bg-indigo-100 text-indigo-800';
      case 'Quarterly': return 'bg-emerald-100 text-emerald-800';
      case 'Project-Based': return 'bg-orange-100 text-orange-800';
      case 'Custom': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addTemplateSection = () => {
    const newSection: TemplateSection = {
      id: `section-${Date.now()}`,
      title: '',
      description: '',
      type: 'Custom',
      weight: 0,
      isRequired: true,
      items: []
    };
    setTemplateSections([...templateSections, newSection]);
  };

  const updateSectionWeight = (sectionId: string, weight: number) => {
    setTemplateSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, weight } : section
    ));
  };

  const removeSection = (sectionId: string) => {
    setTemplateSections(prev => prev.filter(section => section.id !== sectionId));
  };

  const calculateTotalWeight = () => {
    return templateSections.reduce((total, section) => total + section.weight, 0);
  };

  const duplicateTemplate = (template: ReviewTemplate) => {
    const newTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copy)`,
      isDefault: false,
      createdDate: new Date(),
      lastModified: new Date(),
      usageCount: 0
    };
    // Here you would add the new template to your state/database
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-google-gray-900">Review Templates</h1>
          <p className="text-google-gray-600 mt-1">Create and manage performance review templates</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import Template
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Templates
          </Button>
          <Button className="gap-2 google-button-primary" onClick={() => setShowCreateTemplate(true)}>
            <Plus className="w-4 h-4" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Total Templates</p>
                <p className="text-2xl font-bold text-google-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-primary-muted rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Active Templates</p>
                <p className="text-2xl font-bold text-google-gray-900">8</p>
              </div>
              <div className="w-12 h-12 bg-success-muted rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Usage This Month</p>
                <p className="text-2xl font-bold text-google-gray-900">234</p>
              </div>
              <div className="w-12 h-12 bg-warning-muted rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600 mb-1">Draft Templates</p>
                <p className="text-2xl font-bold text-google-gray-900">4</p>
              </div>
              <div className="w-12 h-12 bg-destructive-muted rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="builder" className="gap-2">
            <Layout className="w-4 h-4" />
            Template Builder
          </TabsTrigger>
          <TabsTrigger value="library" className="gap-2">
            <FileText className="w-4 h-4" />
            Template Library
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

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
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-google-gray-400" />
                    <Input
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 premium-input"
                    />
                  </div>
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Project-Based">Project-Based</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="Goal-KRA-Matrix">Goal-KRA Matrix</SelectItem>
                    <SelectItem value="Self-Assessment">Self Assessment</SelectItem>
                    <SelectItem value="R1-Review">R1 Review</SelectItem>
                    <SelectItem value="R2-Review">R2 Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Templates List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockReviewTemplates.map((template) => (
                  <div key={template.id} className="border border-google-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-google-gray-900">{template.name}</h3>
                          {template.isDefault && (
                            <Badge className="bg-blue-100 text-blue-800">Default</Badge>
                          )}
                          {template.isActive && (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          )}
                        </div>
                        <p className="text-sm text-google-gray-600 mb-3">{template.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={getTypeColor(template.type)}>{template.type}</Badge>
                          <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedTemplate(template)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => duplicateTemplate(template)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Template Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-google-gray-600">Sections</p>
                        <p className="font-medium">{template.sections.length}</p>
                      </div>
                      <div>
                        <p className="text-google-gray-600">Usage Count</p>
                        <p className="font-medium">{template.usageCount}</p>
                      </div>
                      <div>
                        <p className="text-google-gray-600">Rating Scale</p>
                        <p className="font-medium">{template.ratingScale.min}-{template.ratingScale.max} Point</p>
                      </div>
                      <div>
                        <p className="text-google-gray-600">Last Modified</p>
                        <p className="font-medium">{template.lastModified.toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Sections Preview */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-google-gray-700">Sections:</p>
                      {template.sections.map((section) => (
                        <div key={section.id} className="flex items-center justify-between bg-google-gray-50 rounded p-2">
                          <span className="text-sm text-google-gray-700">{section.title}</span>
                          <Badge variant="outline" className="text-xs">{section.weight}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Template Builder Tab */}
        <TabsContent value="builder" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-primary" />
                Template Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      placeholder="Enter template name"
                      className="premium-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-type">Template Type</Label>
                    <Select value={templateType} onValueChange={(value: any) => setTemplateType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Goal-KRA-Matrix">Goal-KRA Matrix</SelectItem>
                        <SelectItem value="Self-Assessment">Self Assessment</SelectItem>
                        <SelectItem value="R1-Review">R1 Review</SelectItem>
                        <SelectItem value="R2-Review">R2 Review</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="template-category">Category</Label>
                    <Select value={templateCategory} onValueChange={(value: any) => setTemplateCategory(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Annual">Annual</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                        <SelectItem value="Project-Based">Project-Based</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rating-scale">Rating Scale</Label>
                    <Select value={selectedRatingScale} onValueChange={setSelectedRatingScale}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5-point">5-Point Scale</SelectItem>
                        <SelectItem value="4-point">4-Point Scale</SelectItem>
                        <SelectItem value="10-point">10-Point Scale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="template-description">Description</Label>
                  <Textarea
                    id="template-description"
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    placeholder="Describe the purpose and use case for this template"
                    className="min-h-20"
                  />
                </div>

                {/* Sections */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Template Sections</h3>
                    <Button onClick={addTemplateSection} className="google-button-secondary">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Section
                    </Button>
                  </div>

                  {/* Total Weight Display */}
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Weight</span>
                      <span className={`text-lg font-bold ${
                        calculateTotalWeight() === 100 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {calculateTotalWeight()}%
                      </span>
                    </div>
                    {calculateTotalWeight() !== 100 && (
                      <p className="text-sm text-red-600 mt-1">
                        Total weight must equal 100%
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    {templateSections.map((section, index) => (
                      <div key={section.id} className="border border-google-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Section {index + 1}</h4>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeSection(section.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Section Title</Label>
                            <Input
                              value={section.title}
                              onChange={(e) => {
                                setTemplateSections(prev => prev.map(s => 
                                  s.id === section.id ? { ...s, title: e.target.value } : s
                                ));
                              }}
                              placeholder="e.g., Key Result Areas"
                            />
                          </div>
                          <div>
                            <Label>Section Type</Label>
                            <Select 
                              value={section.type} 
                              onValueChange={(value: any) => {
                                setTemplateSections(prev => prev.map(s => 
                                  s.id === section.id ? { ...s, type: value } : s
                                ));
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="KRA">KRA</SelectItem>
                                <SelectItem value="Goal">Goal</SelectItem>
                                <SelectItem value="Competency">Competency</SelectItem>
                                <SelectItem value="Custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="mb-4">
                          <Label>Description</Label>
                          <Textarea
                            value={section.description}
                            onChange={(e) => {
                              setTemplateSections(prev => prev.map(s => 
                                s.id === section.id ? { ...s, description: e.target.value } : s
                              ));
                            }}
                            placeholder="Describe what this section evaluates"
                            className="min-h-16"
                          />
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="flex-1">
                            <Label>Weight (%)</Label>
                            <div className="mt-2">
                              <Slider
                                value={[section.weight]}
                                onValueChange={([value]) => updateSectionWeight(section.id, value)}
                                min={0}
                                max={100}
                                step={5}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-google-gray-500 mt-1">
                                <span>0%</span>
                                <span className="font-medium">{section.weight}%</span>
                                <span>100%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={section.isRequired}
                              onCheckedChange={(checked) => {
                                setTemplateSections(prev => prev.map(s => 
                                  s.id === section.id ? { ...s, isRequired: checked } : s
                                ));
                              }}
                            />
                            <Label>Required</Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Actions */}
                <div className="flex gap-3">
                  <Button className="google-button-primary">
                    <Save className="w-4 h-4 mr-2" />
                    Save Template
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Template Library Tab */}
        <TabsContent value="library" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Template Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockTemplateLibrary.map((template) => (
                  <div key={template.id} className="border border-google-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-google-gray-900">{template.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{template.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-google-gray-600 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{template.category}</Badge>
                      <span className="text-sm text-google-gray-500">
                        {template.downloadCount} downloads
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-google-gray-500 mt-2">
                      by {template.author}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Template Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Default Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Auto-save drafts</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Require weight validation</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Enable template versioning</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Access Control</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Manager can create templates</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Department-specific templates</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Public template sharing</Label>
                        <Switch />
                      </div>
                    </div>
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