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
  Building2,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Copy,
  Users,
  Calendar,
  CheckCircle,
  Trash2,
  Star,
  AlertCircle,
  Target,
  Award,
  BookOpen,
  Settings,
  Save,
  FileText
} from 'lucide-react';
import { Department, Domain } from '../../types/common.types';
import { KRA, KRATemplate } from '../../types/kra.types';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
  department: string;
  domain: string;
}

interface DepartmentTemplate {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  domainId: string;
  domainName: string;
  kras: {
    kraId: string;
    kraName: string;
    kraDescription: string;
    weightage: number;
    category: string;
  }[];
  createdBy: string;
  createdAt: string;
  lastModified: string;
  employeeCount: number;
  isActive: boolean;
  totalWeightage: number;
}

interface DepartmentKRATemplatesProps {
  user: User;
}

export function DepartmentKRATemplates({ user }: DepartmentKRATemplatesProps) {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [selectedKRAs, setSelectedKRAs] = useState<string[]>([]);
  const [kraWeights, setKraWeights] = useState<{ [kraId: string]: number }>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<DepartmentTemplate | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Mock data - Replace with actual API calls
  const userDepartment = {
    id: 'dept-001',
    name: 'Sales Department',
    code: 'SALES'
  };

  const availableDomains = useMemo(() => [
    { id: 'dom-001', name: 'Development', code: 'DEV', description: 'Software Development' },
    { id: 'dom-002', name: 'QA', code: 'QA', description: 'Quality Assurance' },
    { id: 'dom-003', name: 'Marketing', code: 'MKT', description: 'Marketing & Promotion' },
    { id: 'dom-004', name: 'Operations', code: 'OPS', description: 'Business Operations' },
    { id: 'dom-005', name: 'Support', code: 'SUP', description: 'Customer Support' },
    { id: 'dom-006', name: 'Analytics', code: 'ANA', description: 'Data Analytics' }
  ], []);

  const masterKRAs = useMemo(() => [
    {
      id: 'kra-001',
      title: 'Technical Excellence',
      description: 'Maintain high technical standards and code quality',
      category: 'Technical',
      level: 'INDIVIDUAL',
      defaultWeight: 30,
      applicableDomains: ['Development', 'QA']
    },
    {
      id: 'kra-002',
      title: 'Code Quality',
      description: 'Ensure code meets quality standards and best practices',
      category: 'Technical',
      level: 'INDIVIDUAL',
      defaultWeight: 25,
      applicableDomains: ['Development']
    },
    {
      id: 'kra-003',
      title: 'Team Collaboration',
      description: 'Work effectively with team members and stakeholders',
      category: 'Behavioral',
      level: 'INDIVIDUAL',
      defaultWeight: 20,
      applicableDomains: ['Development', 'QA', 'Marketing', 'Operations', 'Support', 'Analytics']
    },
    {
      id: 'kra-004',
      title: 'Customer Focus',
      description: 'Prioritize customer needs and satisfaction',
      category: 'Business',
      level: 'INDIVIDUAL',
      defaultWeight: 25,
      applicableDomains: ['Marketing', 'Support', 'Operations']
    },
    {
      id: 'kra-005',
      title: 'Quality Assurance',
      description: 'Ensure products meet quality standards',
      category: 'Quality',
      level: 'INDIVIDUAL',
      defaultWeight: 35,
      applicableDomains: ['QA']
    },
    {
      id: 'kra-006',
      title: 'Process Improvement',
      description: 'Identify and implement process improvements',
      category: 'Process',
      level: 'TEAM',
      defaultWeight: 20,
      applicableDomains: ['Operations', 'QA']
    },
    {
      id: 'kra-007',
      title: 'Data Analysis',
      description: 'Analyze data to provide business insights',
      category: 'Analytical',
      level: 'INDIVIDUAL',
      defaultWeight: 40,
      applicableDomains: ['Analytics']
    },
    {
      id: 'kra-008',
      title: 'Campaign Management',
      description: 'Plan and execute marketing campaigns effectively',
      category: 'Marketing',
      level: 'INDIVIDUAL',
      defaultWeight: 35,
      applicableDomains: ['Marketing']
    },
    {
      id: 'kra-009',
      title: 'Issue Resolution',
      description: 'Resolve customer issues efficiently and effectively',
      category: 'Service',
      level: 'INDIVIDUAL',
      defaultWeight: 30,
      applicableDomains: ['Support']
    },
    {
      id: 'kra-010',
      title: 'Innovation & Research',
      description: 'Drive innovation and research initiatives',
      category: 'Innovation',
      level: 'INDIVIDUAL',
      defaultWeight: 15,
      applicableDomains: ['Development', 'Analytics']
    }
  ], []);

  const existingTemplates = useMemo(() => [
    {
      id: 'temp-001',
      name: 'Sales-Development Q1 2025',
      departmentId: 'dept-001',
      departmentName: 'Sales Department',
      domainId: 'dom-001',
      domainName: 'Development',
      kras: [
        { kraId: 'kra-001', kraName: 'Technical Excellence', kraDescription: 'Maintain high technical standards', weightage: 30, category: 'Technical' },
        { kraId: 'kra-002', kraName: 'Code Quality', kraDescription: 'Ensure code quality standards', weightage: 25, category: 'Technical' },
        { kraId: 'kra-003', kraName: 'Team Collaboration', kraDescription: 'Work effectively with team', weightage: 20, category: 'Behavioral' },
        { kraId: 'kra-004', kraName: 'Customer Focus', kraDescription: 'Prioritize customer needs', weightage: 25, category: 'Business' }
      ],
      createdBy: user.name,
      createdAt: '2024-01-10T09:00:00Z',
      lastModified: '2024-01-15T14:30:00Z',
      employeeCount: 12,
      isActive: true,
      totalWeightage: 100
    },
    {
      id: 'temp-002',
      name: 'Sales-QA Q1 2025',
      departmentId: 'dept-001',
      departmentName: 'Sales Department',
      domainId: 'dom-002',
      domainName: 'QA',
      kras: [
        { kraId: 'kra-005', kraName: 'Quality Assurance', kraDescription: 'Ensure product quality', weightage: 35, category: 'Quality' },
        { kraId: 'kra-001', kraName: 'Technical Excellence', kraDescription: 'Maintain technical standards', weightage: 30, category: 'Technical' },
        { kraId: 'kra-006', kraName: 'Process Improvement', kraDescription: 'Improve QA processes', weightage: 20, category: 'Process' },
        { kraId: 'kra-003', kraName: 'Team Collaboration', kraDescription: 'Work with development teams', weightage: 15, category: 'Behavioral' }
      ],
      createdBy: user.name,
      createdAt: '2024-01-08T10:15:00Z',
      lastModified: '2024-01-12T16:45:00Z',
      employeeCount: 8,
      isActive: true,
      totalWeightage: 100
    },
    {
      id: 'temp-003',
      name: 'Sales-Marketing Q1 2025',
      departmentId: 'dept-001',
      departmentName: 'Sales Department',
      domainId: 'dom-003',
      domainName: 'Marketing',
      kras: [
        { kraId: 'kra-008', kraName: 'Campaign Management', kraDescription: 'Execute marketing campaigns', weightage: 35, category: 'Marketing' },
        { kraId: 'kra-004', kraName: 'Customer Focus', kraDescription: 'Focus on customer needs', weightage: 30, category: 'Business' },
        { kraId: 'kra-003', kraName: 'Team Collaboration', kraDescription: 'Collaborate across teams', weightage: 20, category: 'Behavioral' },
        { kraId: 'kra-010', kraName: 'Innovation & Research', kraDescription: 'Drive marketing innovation', weightage: 15, category: 'Innovation' }
      ],
      createdBy: user.name,
      createdAt: '2024-01-05T08:30:00Z',
      lastModified: '2024-01-18T11:20:00Z',
      employeeCount: 15,
      isActive: true,
      totalWeightage: 100
    }
  ], [user.name]);

  // Filter KRAs based on selected domain
  const availableKRAs = useMemo(() => {
    const selectedDomainName = availableDomains.find(d => d.id === selectedDomain)?.name;
    if (!selectedDomainName) return [];

    return masterKRAs.filter(kra =>
      kra.applicableDomains.includes(selectedDomainName)
    );
  }, [selectedDomain, availableDomains, masterKRAs]);

  // Calculate total weightage
  const totalWeightage = useMemo(() => {
    return selectedKRAs.reduce((sum, kraId) => {
      return sum + (kraWeights[kraId] || 0);
    }, 0);
  }, [selectedKRAs, kraWeights]);

  // Generate template name
  const generatedTemplateName = useMemo(() => {
    const domainName = availableDomains.find(d => d.id === selectedDomain)?.name || '';
    if (domainName && userDepartment.name) {
      return `${userDepartment.name.replace(' Department', '')}-${domainName} Q1 2025`;
    }
    return '';
  }, [selectedDomain, availableDomains, userDepartment.name]);

  // Handle KRA selection
  const handleKRAToggle = (kraId: string) => {
    const kra = masterKRAs.find(k => k.id === kraId);
    if (!kra) return;

    setSelectedKRAs(prev => {
      const isSelected = prev.includes(kraId);
      if (isSelected) {
        // Remove KRA
        const newSelected = prev.filter(id => id !== kraId);
        const newWeights = { ...kraWeights };
        delete newWeights[kraId];
        setKraWeights(newWeights);
        return newSelected;
      } else {
        // Add KRA
        setKraWeights(prev => ({
          ...prev,
          [kraId]: kra.defaultWeight
        }));
        return [...prev, kraId];
      }
    });
  };

  // Handle weight change
  const handleWeightChange = (kraId: string, weight: number) => {
    setKraWeights(prev => ({
      ...prev,
      [kraId]: weight
    }));
  };

  // Auto-balance weights
  const autoBalanceWeights = () => {
    if (selectedKRAs.length === 0) return;

    const evenWeight = Math.floor(100 / selectedKRAs.length);
    const remainder = 100 % selectedKRAs.length;

    const newWeights: { [kraId: string]: number } = {};
    selectedKRAs.forEach((kraId, index) => {
      newWeights[kraId] = evenWeight + (index < remainder ? 1 : 0);
    });

    setKraWeights(newWeights);
  };

  // Get category badge
  const getCategoryBadge = (category: string) => {
    const colors = {
      'Technical': 'bg-blue-100 text-blue-800',
      'Quality': 'bg-green-100 text-green-800',
      'Process': 'bg-purple-100 text-purple-800',
      'Behavioral': 'bg-orange-100 text-orange-800',
      'Business': 'bg-indigo-100 text-indigo-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Service': 'bg-cyan-100 text-cyan-800',
      'Innovation': 'bg-yellow-100 text-yellow-800',
      'Analytical': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{category}</Badge>;
  };

  // Save template
  const handleSaveTemplate = () => {
    if (!selectedDomain || selectedKRAs.length === 0 || totalWeightage !== 100) {
      return;
    }

    console.log('Saving template:', {
      name: templateName || generatedTemplateName,
      departmentId: userDepartment.id,
      domainId: selectedDomain,
      kras: selectedKRAs.map(kraId => ({
        kraId,
        weight: kraWeights[kraId]
      }))
    });

    // Reset form
    setSelectedDomain('');
    setTemplateName('');
    setSelectedKRAs([]);
    setKraWeights({});

    // Show success message (implement toast notification)
    alert('Template saved successfully!');
  };

  // Preview assigned employees
  const getPreviewEmployees = () => {
    const domainName = availableDomains.find(d => d.id === selectedDomain)?.name;
    if (!domainName) return [];

    // Mock employee data based on domain
    const employeesByDomain = {
      'Development': ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Lisa Wang'],
      'QA': ['David Brown', 'Emma Wilson', 'Alex Taylor'],
      'Marketing': ['Jessica Lee', 'Ryan Miller', 'Sophie Davis', 'Tom Anderson', 'Maria Garcia'],
      'Operations': ['Chris Johnson', 'Amy Zhang', 'Robert Kim'],
      'Support': ['Jennifer Liu', 'Mark Thompson', 'Kate Robinson'],
      'Analytics': ['Daniel Park', 'Rachel Green']
    };

    return employeesByDomain[domainName as keyof typeof employeesByDomain] || [];
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            Department KRA Templates
          </h2>
          <p className="text-muted-foreground">Create and manage KRA templates for your department teams</p>
          <div className="mt-2">
            <Badge className="bg-blue-100 text-blue-800">
              <Building2 className="w-4 h-4 mr-1" />
              My Department: {userDepartment.name}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Templates
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Templates
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-1 h-12">
          <TabsTrigger
            value="create"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </TabsTrigger>
          <TabsTrigger
            value="existing"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Existing Templates
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Create Template Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Template Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Template Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain-select">Select Domain *</Label>
                      <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDomains.map(domain => (
                            <SelectItem key={domain.id} value={domain.id}>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{domain.name}</span>
                                <span className="text-sm text-muted-foreground">({domain.code})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-name">Template Name (Optional)</Label>
                      <Input
                        id="template-name"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        placeholder={generatedTemplateName || "Auto-generated name will appear here"}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* KRA Selection */}
              {selectedDomain && (
                <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Select KRAs from Master
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={autoBalanceWeights} disabled={selectedKRAs.length === 0}>
                          Auto Balance
                        </Button>
                        <Badge variant={totalWeightage === 100 ? "default" : "destructive"}>
                          Total: {totalWeightage}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {availableKRAs.map(kra => {
                        const isSelected = selectedKRAs.includes(kra.id);
                        const currentWeight = kraWeights[kra.id] || kra.defaultWeight;

                        return (
                          <div
                            key={kra.id}
                            className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                              isSelected ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleKRAToggle(kra.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                                }`}>
                                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <h4 className="font-medium text-gray-900">{kra.title}</h4>
                                    {getCategoryBadge(kra.category)}
                                  </div>
                                  {isSelected && (
                                    <div className="flex items-center gap-2">
                                      <Label htmlFor={`weight-${kra.id}`} className="text-sm">Weight:</Label>
                                      <Input
                                        id={`weight-${kra.id}`}
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={currentWeight}
                                        onChange={(e) => {
                                          e.stopPropagation();
                                          handleWeightChange(kra.id, parseInt(e.target.value) || 0);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-16 text-center"
                                      />
                                      <span className="text-sm text-muted-foreground">%</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{kra.description}</p>
                                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>Level: {kra.level}</span>
                                  <span>Default Weight: {kra.defaultWeight}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {availableKRAs.length === 0 && (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-gray-900 mb-2">No KRAs Available</h3>
                        <p className="text-gray-600">Select a domain to see available KRAs</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              {/* Template Preview */}
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Template Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Template Name:</Label>
                      <p className="text-sm text-gray-700 mt-1">
                        {templateName || generatedTemplateName || 'Select domain to generate name'}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Department:</Label>
                      <p className="text-sm text-gray-700 mt-1">{userDepartment.name}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Domain:</Label>
                      <p className="text-sm text-gray-700 mt-1">
                        {availableDomains.find(d => d.id === selectedDomain)?.name || 'Not selected'}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Selected KRAs:</Label>
                      <p className="text-sm text-gray-700 mt-1">{selectedKRAs.length} KRA(s)</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Total Weightage:</Label>
                      <div className="mt-1 flex items-center gap-2">
                        <Progress value={totalWeightage} className="flex-1" />
                        <span className={`text-sm font-medium ${totalWeightage === 100 ? 'text-green-600' : 'text-red-600'}`}>
                          {totalWeightage}%
                        </span>
                      </div>
                    </div>

                    {selectedDomain && (
                      <div>
                        <Label className="text-sm font-medium">Will be assigned to:</Label>
                        <div className="mt-2 space-y-1">
                          {getPreviewEmployees().map(employee => (
                            <div key={employee} className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="w-3 h-3" />
                              {employee}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {getPreviewEmployees().length} employee(s) in {availableDomains.find(d => d.id === selectedDomain)?.name}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      disabled={!selectedDomain || selectedKRAs.length === 0 || totalWeightage !== 100}
                      onClick={handleSaveTemplate}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Template
                    </Button>

                    {totalWeightage !== 100 && selectedKRAs.length > 0 && (
                      <p className="text-xs text-red-600 text-center">
                        Total weightage must equal 100%
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Existing Templates Tab */}
        <TabsContent value="existing" className="space-y-6">
          {/* Search and Filters */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {existingTemplates
              .filter(template =>
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.domainName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((template) => (
                <Card key={template.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2 mb-2">{template.name}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-800">{template.domainName}</Badge>
                          {template.isActive ? (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">KRAs:</span>
                        <span className="font-medium">{template.kras.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Employees:</span>
                        <span className="font-medium">{template.employeeCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Weight:</span>
                        <span className="font-medium">{template.totalWeightage}%</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">KRA Categories:</Label>
                      <div className="flex flex-wrap gap-1">
                        {Array.from(new Set(template.kras.map(kra => kra.category))).slice(0, 3).map(category => (
                          <Badge key={category} variant="outline" className="text-xs px-2 py-0">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p>Created: {new Date(template.createdAt).toLocaleDateString()}</p>
                      <p>Modified: {new Date(template.lastModified).toLocaleDateString()}</p>
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
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {existingTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">Create your first department template to get started</p>
              <Button
                className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600"
                onClick={() => setActiveTab('create')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="w-6 h-6" />
                Department Template Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-assign templates to new employees</Label>
                    <p className="text-sm text-muted-foreground">Automatically assign domain templates when employees join</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require approval for template changes</Label>
                    <p className="text-sm text-muted-foreground">Template modifications require HR approval</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow custom weightage adjustments</Label>
                    <p className="text-sm text-muted-foreground">Let employees request weightage modifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Template version control</Label>
                    <p className="text-sm text-muted-foreground">Maintain history of template changes</p>
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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              {selectedTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <p className="mt-1 text-gray-700">{selectedTemplate.departmentName}</p>
                </div>
                <div>
                  <Label>Domain</Label>
                  <p className="mt-1 text-gray-700">{selectedTemplate.domainName}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">
                    {selectedTemplate.isActive ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <Label>Employee Count</Label>
                  <p className="mt-1 text-gray-700">{selectedTemplate.employeeCount} employees</p>
                </div>
              </div>

              <div>
                <Label>KRAs ({selectedTemplate.kras.length})</Label>
                <div className="mt-2 space-y-3">
                  {selectedTemplate.kras.map((kra, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-gray-900">{kra.kraName}</h4>
                          {getCategoryBadge(kra.category)}
                        </div>
                        <Badge variant="outline">{kra.weightage}%</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{kra.kraDescription}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Created By</Label>
                  <p className="mt-1 text-gray-700">{selectedTemplate.createdBy}</p>
                </div>
                <div>
                  <Label>Created Date</Label>
                  <p className="mt-1 text-gray-700">{new Date(selectedTemplate.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Edit className="w-4 h-4 mr-2" />
              Edit Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}