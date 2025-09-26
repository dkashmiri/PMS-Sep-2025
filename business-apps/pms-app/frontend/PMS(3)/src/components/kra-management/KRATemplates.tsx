import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  FileText,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Copy,
  Star,
  Users,
  Calendar,
  CheckCircle,
  Heart,
  BookOpen,
  Lightbulb,
  Award,
  Zap,
  Settings,
  Trash2
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
  department: string;
  domain: string;
}

interface KRATemplate {
  id: string;
  name: string;
  description: string;
  category: 'LEADERSHIP' | 'TECHNICAL' | 'SALES' | 'OPERATIONS' | 'STRATEGIC';
  department: string;
  level: 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD' | 'EXECUTIVE';
  kras: {
    title: string;
    description: string;
    weightage: number;
    kpis: string[];
  }[];
  isPublished: boolean;
  isDefault: boolean;
  usageCount: number;
  rating: number;
  reviews: number;
  likes: number;
  author: string;
  createdAt: string;
  lastModified: string;
  tags: string[];
  totalWeightage: number;
}

interface KRATemplatesProps {
  user: User;
}

export function KRATemplates({ user }: KRATemplatesProps) {
  const [activeTab, setActiveTab] = useState('library');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<KRATemplate | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Mock template data
  const mockTemplates: KRATemplate[] = useMemo(() => [
    {
      id: 'temp-001',
      name: 'Senior Software Engineer Framework',
      description: 'Comprehensive KRA template for senior software engineers focusing on technical excellence, leadership, and innovation.',
      category: 'TECHNICAL',
      department: 'Engineering',
      level: 'SENIOR',
      kras: [
        {
          title: 'Code Quality & Technical Excellence',
          description: 'Maintain high code quality standards and technical best practices',
          weightage: 35,
          kpis: ['Code Review Score ≥ 4.5/5', 'Bug Rate ≤ 2%', 'Technical Debt Reduction ≥ 20%']
        },
        {
          title: 'Team Mentorship & Knowledge Sharing',
          description: 'Guide junior developers and facilitate knowledge transfer',
          weightage: 25,
          kpis: ['Mentorship Hours ≥ 20/month', 'Knowledge Sessions ≥ 2/quarter', 'Team Satisfaction ≥ 4.0/5']
        },
        {
          title: 'Project Delivery & Innovation',
          description: 'Deliver projects on time while introducing innovative solutions',
          weightage: 40,
          kpis: ['On-time Delivery ≥ 95%', 'Innovation Score ≥ 4.0/5', 'Feature Adoption ≥ 80%']
        }
      ],
      isPublished: true,
      isDefault: false,
      usageCount: 156,
      rating: 4.8,
      reviews: 23,
      likes: 89,
      author: 'Tech Lead - Engineering',
      createdAt: '2024-01-10T09:00:00Z',
      lastModified: '2024-01-20T14:30:00Z',
      tags: ['engineering', 'senior', 'technical', 'leadership'],
      totalWeightage: 100
    },
    {
      id: 'temp-002',
      name: 'Sales Manager Excellence Template',
      description: 'Proven KRA framework for sales managers covering team leadership, revenue growth, and client relationship management.',
      category: 'SALES',
      department: 'Sales & Marketing',
      level: 'LEAD',
      kras: [
        {
          title: 'Revenue Growth & Target Achievement',
          description: 'Drive revenue growth and achieve sales targets consistently',
          weightage: 45,
          kpis: ['Revenue Target ≥ 110%', 'New Client Acquisition ≥ 15/quarter', 'Deal Closure Rate ≥ 85%']
        },
        {
          title: 'Team Performance & Development',
          description: 'Build and lead high-performing sales teams',
          weightage: 30,
          kpis: ['Team Target Achievement ≥ 100%', 'Team Retention ≥ 90%', 'Training Completion ≥ 95%']
        },
        {
          title: 'Client Relationship Management',
          description: 'Maintain strong client relationships and satisfaction',
          weightage: 25,
          kpis: ['Client Satisfaction ≥ 4.5/5', 'Client Retention ≥ 95%', 'Upselling Success ≥ 30%']
        }
      ],
      isPublished: true,
      isDefault: true,
      usageCount: 89,
      rating: 4.6,
      reviews: 18,
      likes: 67,
      author: 'VP Sales',
      createdAt: '2024-01-05T11:20:00Z',
      lastModified: '2024-01-18T16:45:00Z',
      tags: ['sales', 'manager', 'revenue', 'team-leadership'],
      totalWeightage: 100
    },
    {
      id: 'temp-003',
      name: 'HR Business Partner Framework',
      description: 'Strategic HR template focusing on talent management, organizational development, and employee engagement.',
      category: 'OPERATIONS',
      department: 'Human Resources',
      level: 'SENIOR',
      kras: [
        {
          title: 'Talent Acquisition & Retention',
          description: 'Attract, hire, and retain top talent effectively',
          weightage: 40,
          kpis: ['Time to Hire ≤ 30 days', 'Employee Retention ≥ 90%', 'Hiring Quality Score ≥ 4.0/5']
        },
        {
          title: 'Employee Engagement & Development',
          description: 'Foster high employee engagement and professional growth',
          weightage: 35,
          kpis: ['Engagement Score ≥ 4.2/5', 'Training Hours ≥ 40/employee/year', 'Career Progression ≥ 15%']
        },
        {
          title: 'Organizational Excellence',
          description: 'Drive organizational improvements and culture initiatives',
          weightage: 25,
          kpis: ['Culture Index ≥ 4.0/5', 'Process Improvement ≥ 3 initiatives/quarter', 'Compliance Score 100%']
        }
      ],
      isPublished: true,
      isDefault: false,
      usageCount: 45,
      rating: 4.7,
      reviews: 12,
      likes: 34,
      author: 'CHRO',
      createdAt: '2023-12-15T08:30:00Z',
      lastModified: '2024-01-22T10:15:00Z',
      tags: ['hr', 'talent', 'engagement', 'culture'],
      totalWeightage: 100
    },
    {
      id: 'temp-004',
      name: 'Executive Leadership Template',
      description: 'Strategic leadership template for C-level executives focusing on vision, growth, and organizational transformation.',
      category: 'STRATEGIC',
      department: 'Executive',
      level: 'EXECUTIVE',
      kras: [
        {
          title: 'Strategic Vision & Execution',
          description: 'Define and execute strategic initiatives for organizational growth',
          weightage: 50,
          kpis: ['Strategic Goals Achievement ≥ 90%', 'Market Position Improvement', 'Revenue Growth ≥ 25%']
        },
        {
          title: 'Organizational Transformation',
          description: 'Lead digital transformation and operational excellence',
          weightage: 30,
          kpis: ['Transformation Milestones ≥ 85%', 'Operational Efficiency ≥ 20%', 'Change Adoption ≥ 80%']
        },
        {
          title: 'Stakeholder Leadership',
          description: 'Manage board, investor, and key stakeholder relationships',
          weightage: 20,
          kpis: ['Board Satisfaction ≥ 4.5/5', 'Investor Confidence High', 'Stakeholder Engagement ≥ 90%']
        }
      ],
      isPublished: false,
      isDefault: false,
      usageCount: 12,
      rating: 4.9,
      reviews: 5,
      likes: 23,
      author: 'CEO',
      createdAt: '2024-01-20T15:00:00Z',
      lastModified: '2024-01-24T12:30:00Z',
      tags: ['executive', 'strategic', 'leadership', 'transformation'],
      totalWeightage: 100
    },
    {
      id: 'temp-005',
      name: 'Operations Manager Framework',
      description: 'Operational excellence template focusing on process optimization, quality management, and team efficiency.',
      category: 'OPERATIONS',
      department: 'Operations',
      level: 'MID',
      kras: [
        {
          title: 'Process Optimization & Efficiency',
          description: 'Continuously improve operational processes and efficiency',
          weightage: 40,
          kpis: ['Process Efficiency ≥ 85%', 'Cost Reduction ≥ 15%', 'Automation Rate ≥ 60%']
        },
        {
          title: 'Quality Management & Compliance',
          description: 'Maintain high quality standards and regulatory compliance',
          weightage: 35,
          kpis: ['Quality Score ≥ 95%', 'Compliance Rate 100%', 'Customer Complaints ≤ 2%']
        },
        {
          title: 'Team Leadership & Performance',
          description: 'Lead operations team to achieve performance targets',
          weightage: 25,
          kpis: ['Team Performance ≥ 90%', 'Safety Incidents = 0', 'Team Satisfaction ≥ 4.0/5']
        }
      ],
      isPublished: true,
      isDefault: false,
      usageCount: 78,
      rating: 4.5,
      reviews: 15,
      likes: 45,
      author: 'COO',
      createdAt: '2023-11-20T10:00:00Z',
      lastModified: '2024-01-15T09:20:00Z',
      tags: ['operations', 'efficiency', 'quality', 'compliance'],
      totalWeightage: 100
    }
  ], []);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return mockTemplates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || template.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [mockTemplates, searchTerm, selectedCategory, selectedLevel]);

  // Get category badge
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'LEADERSHIP':
        return <Badge className="bg-purple-100 text-purple-800">Leadership</Badge>;
      case 'TECHNICAL':
        return <Badge className="bg-blue-100 text-blue-800">Technical</Badge>;
      case 'SALES':
        return <Badge className="bg-green-100 text-green-800">Sales</Badge>;
      case 'OPERATIONS':
        return <Badge className="bg-orange-100 text-orange-800">Operations</Badge>;
      case 'STRATEGIC':
        return <Badge className="bg-red-100 text-red-800">Strategic</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  // Get level badge
  const getLevelBadge = (level: string) => {
    const colors = {
      'JUNIOR': 'bg-gray-100 text-gray-800',
      'MID': 'bg-blue-100 text-blue-800',
      'SENIOR': 'bg-purple-100 text-purple-800',
      'LEAD': 'bg-green-100 text-green-800',
      'EXECUTIVE': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[level as keyof typeof colors]}>{level}</Badge>;
  };

  // Create template form
  const CreateTemplateForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="template-name">Template Name</Label>
          <Input id="template-name" placeholder="Enter template name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="template-category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LEADERSHIP">Leadership</SelectItem>
              <SelectItem value="TECHNICAL">Technical</SelectItem>
              <SelectItem value="SALES">Sales</SelectItem>
              <SelectItem value="OPERATIONS">Operations</SelectItem>
              <SelectItem value="STRATEGIC">Strategic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="template-description">Description</Label>
        <Textarea 
          id="template-description" 
          placeholder="Enter template description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="template-department">Department</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Sales & Marketing">Sales & Marketing</SelectItem>
              <SelectItem value="Human Resources">Human Resources</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="template-level">Level</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="JUNIOR">Junior</SelectItem>
              <SelectItem value="MID">Mid-level</SelectItem>
              <SelectItem value="SENIOR">Senior</SelectItem>
              <SelectItem value="LEAD">Lead</SelectItem>
              <SelectItem value="EXECUTIVE">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="template-tags">Tags</Label>
        <Input id="template-tags" placeholder="Enter tags separated by commas" />
      </div>

      <div className="space-y-4">
        <Label>Template KRAs</Label>
        <div className="space-y-3">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <Input placeholder="KRA Title" />
              <Input placeholder="Weightage %" type="number" />
              <Button variant="outline" size="sm">Add KPI</Button>
            </div>
            <Textarea placeholder="KRA Description" rows={2} />
          </div>
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Another KRA
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="template-publish" />
        <Label htmlFor="template-publish">Publish to template library</Label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            KRA Templates
          </h2>
          <p className="text-muted-foreground">Create, manage, and share reusable KRA templates for different roles and departments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  Create KRA Template
                </DialogTitle>
              </DialogHeader>
              <CreateTemplateForm />
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                  Create Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-1 h-12">
          <TabsTrigger 
            value="library" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Template Library
          </TabsTrigger>
          <TabsTrigger 
            value="popular" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Star className="w-4 h-4 mr-2" />
            Popular
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Template Library Tab */}
        <TabsContent value="library" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search templates by name, description, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="LEADERSHIP">Leadership</SelectItem>
                      <SelectItem value="TECHNICAL">Technical</SelectItem>
                      <SelectItem value="SALES">Sales</SelectItem>
                      <SelectItem value="OPERATIONS">Operations</SelectItem>
                      <SelectItem value="STRATEGIC">Strategic</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="JUNIOR">Junior</SelectItem>
                      <SelectItem value="MID">Mid-level</SelectItem>
                      <SelectItem value="SENIOR">Senior</SelectItem>
                      <SelectItem value="LEAD">Lead</SelectItem>
                      <SelectItem value="EXECUTIVE">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {template.isDefault && (
                          <Badge className="bg-gold-100 text-gold-800 text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Default
                          </Badge>
                        )}
                        {!template.isPublished && (
                          <Badge variant="secondary" className="text-xs">Draft</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{template.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    {getCategoryBadge(template.category)}
                    {getLevelBadge(template.level)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">KRAs included:</span>
                      <span className="font-medium">{template.kras.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total weightage:</span>
                      <span className="font-medium">{template.totalWeightage}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{template.usageCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{template.likes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600">
                      <Copy className="w-4 h-4 mr-2" />
                      Use
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or create a new template</p>
            </div>
          )}
        </TabsContent>

        {/* Popular Tab */}
        <TabsContent value="popular" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Top Rated Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTemplates
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3)
                  .map((template, index) => (
                    <div key={template.id} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{template.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{template.rating}</span>
                          <span>•</span>
                          <span>{template.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-500" />
                  Most Used Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTemplates
                  .sort((a, b) => b.usageCount - a.usageCount)
                  .slice(0, 3)
                  .map((template, index) => (
                    <div key={template.id} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{template.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{template.usageCount} uses</span>
                          <span>•</span>
                          <span>{template.department}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="w-6 h-6" />
                Template Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow public templates</Label>
                    <p className="text-sm text-muted-foreground">Enable sharing templates across all departments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-update from templates</Label>
                    <p className="text-sm text-muted-foreground">Automatically update KRAs when templates are modified</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Template versioning</Label>
                    <p className="text-sm text-muted-foreground">Maintain version history for templates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Template Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              {selectedTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <div className="mt-1">{getCategoryBadge(selectedTemplate.category)}</div>
                </div>
                <div>
                  <Label>Level</Label>
                  <div className="mt-1">{getLevelBadge(selectedTemplate.level)}</div>
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <p className="mt-1 text-gray-700">{selectedTemplate.description}</p>
              </div>
              
              <div>
                <Label>KRAs ({selectedTemplate.kras.length})</Label>
                <div className="mt-2 space-y-4">
                  {selectedTemplate.kras.map((kra, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{kra.title}</h4>
                        <Badge variant="outline">{kra.weightage}%</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{kra.description}</p>
                      <div>
                        <Label className="text-xs text-gray-500">Key Performance Indicators:</Label>
                        <ul className="mt-1 space-y-1">
                          {kra.kpis.map((kpi, kpiIndex) => (
                            <li key={kpiIndex} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {kpi}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Usage Count</Label>
                  <p className="mt-1 text-gray-700">{selectedTemplate.usageCount}</p>
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-gray-700">{selectedTemplate.rating}/5</span>
                  </div>
                </div>
                <div>
                  <Label>Author</Label>
                  <p className="mt-1 text-gray-700">{selectedTemplate.author}</p>
                </div>
              </div>
              
              <div>
                <Label>Tags</Label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedTemplate.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
              <Copy className="w-4 h-4 mr-2" />
              Use Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}