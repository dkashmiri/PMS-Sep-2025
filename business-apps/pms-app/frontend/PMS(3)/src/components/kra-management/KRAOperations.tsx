import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  Target,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Download,
  Trash2,
  BarChart3,
  Award,
  Users,
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Star,
  Copy,
  Archive,
  Settings
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
  department: string;
  domain: string;
}

interface KRA {
  id: string;
  title: string;
  description: string;
  category: 'INDIVIDUAL' | 'TEAM' | 'ORGANIZATIONAL';
  department: string;
  weightage: number;
  status: 'DRAFT' | 'ACTIVE' | 'APPROVED' | 'ARCHIVED';
  createdBy: string;
  createdAt: string;
  lastModified: string;
  version: number;
  approvedBy?: string;
  usageCount: number;
  rating: number;
  tags: string[];
  kpis: string[];
}

interface KRAOperationsProps {
  user: User;
}

export function KRAOperations({ user }: KRAOperationsProps) {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedKRA, setSelectedKRA] = useState<KRA | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Mock KRA data - optimized for performance
  const mockKRAs: KRA[] = useMemo(() => [
    {
      id: 'kra-001',
      title: 'Customer Satisfaction Excellence',
      description: 'Maintain and improve customer satisfaction scores through proactive service delivery and issue resolution.',
      category: 'INDIVIDUAL',
      department: 'Sales & Marketing',
      weightage: 25,
      status: 'ACTIVE',
      createdBy: 'HR Manager',
      createdAt: '2024-01-15T10:00:00Z',
      lastModified: '2024-01-20T14:30:00Z',
      version: 2,
      approvedBy: 'Department Head',
      usageCount: 45,
      rating: 4.8,
      tags: ['customer-service', 'satisfaction', 'quality'],
      kpis: ['CSAT Score ≥ 4.5/5', 'Response Time ≤ 2 hours', 'Resolution Rate ≥ 95%']
    },
    {
      id: 'kra-002',
      title: 'Innovation & Product Development',
      description: 'Drive innovation initiatives and contribute to product development cycles with measurable outcomes.',
      category: 'TEAM',
      department: 'Engineering',
      weightage: 30,
      status: 'APPROVED',
      createdBy: 'Tech Lead',
      createdAt: '2024-01-10T09:15:00Z',
      lastModified: '2024-01-18T16:45:00Z',
      version: 3,
      approvedBy: 'VP Engineering',
      usageCount: 32,
      rating: 4.9,
      tags: ['innovation', 'development', 'technology'],
      kpis: ['Feature Delivery ≥ 90%', 'Code Quality Score ≥ 85%', 'Innovation Index ≥ 3.5']
    },
    {
      id: 'kra-003',
      title: 'Financial Performance & Cost Management',
      description: 'Optimize financial performance through strategic cost management and revenue enhancement initiatives.',
      category: 'ORGANIZATIONAL',
      department: 'Finance',
      weightage: 35,
      status: 'ACTIVE',
      createdBy: 'CFO',
      createdAt: '2024-01-05T11:20:00Z',
      lastModified: '2024-01-22T13:10:00Z',
      version: 1,
      approvedBy: 'CEO',
      usageCount: 28,
      rating: 4.6,
      tags: ['finance', 'cost-management', 'performance'],
      kpis: ['Cost Reduction ≥ 15%', 'Revenue Growth ≥ 20%', 'ROI ≥ 25%']
    },
    {
      id: 'kra-004',
      title: 'Team Leadership & Development',
      description: 'Foster team growth through effective leadership, mentoring, and professional development initiatives.',
      category: 'TEAM',
      department: 'Human Resources',
      weightage: 20,
      status: 'DRAFT',
      createdBy: 'HR Manager',
      createdAt: '2024-01-23T15:30:00Z',
      lastModified: '2024-01-24T10:15:00Z',
      version: 1,
      usageCount: 12,
      rating: 4.3,
      tags: ['leadership', 'development', 'team-building'],
      kpis: ['Team Satisfaction ≥ 4.0/5', 'Retention Rate ≥ 90%', 'Training Hours ≥ 40/quarter']
    },
    {
      id: 'kra-005',
      title: 'Quality Assurance & Process Improvement',
      description: 'Maintain quality standards and drive continuous process improvement across operational workflows.',
      category: 'INDIVIDUAL',
      department: 'Operations',
      weightage: 25,
      status: 'ARCHIVED',
      createdBy: 'Operations Manager',
      createdAt: '2023-12-20T08:45:00Z',
      lastModified: '2024-01-15T12:20:00Z',
      version: 4,
      approvedBy: 'COO',
      usageCount: 67,
      rating: 4.7,
      tags: ['quality', 'process-improvement', 'operations'],
      kpis: ['Defect Rate ≤ 2%', 'Process Efficiency ≥ 85%', 'Audit Score ≥ 95%']
    },
    {
      id: 'kra-006',
      title: 'Strategic Market Expansion',
      description: 'Execute strategic initiatives for market expansion and competitive positioning in target segments.',
      category: 'ORGANIZATIONAL',
      department: 'Sales & Marketing',
      weightage: 40,
      status: 'ACTIVE',
      createdBy: 'VP Sales',
      createdAt: '2024-01-08T14:20:00Z',
      lastModified: '2024-01-21T09:35:00Z',
      version: 2,
      approvedBy: 'CEO',
      usageCount: 23,
      rating: 4.5,
      tags: ['strategy', 'market-expansion', 'growth'],
      kpis: ['Market Share Growth ≥ 15%', 'New Customer Acquisition ≥ 100', 'Revenue Target Achievement ≥ 110%']
    }
  ], []);

  // Optimized filtering with useMemo
  const filteredKRAs = useMemo(() => {
    return mockKRAs.filter(kra => {
      const matchesSearch = kra.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          kra.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          kra.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || kra.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || kra.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [mockKRAs, searchTerm, selectedCategory, selectedStatus]);

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'APPROVED':
        return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>;
      case 'DRAFT':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case 'ARCHIVED':
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  // Category badge styling
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'INDIVIDUAL':
        return <Badge variant="outline" className="border-blue-200 text-blue-700">Individual</Badge>;
      case 'TEAM':
        return <Badge variant="outline" className="border-purple-200 text-purple-700">Team</Badge>;
      case 'ORGANIZATIONAL':
        return <Badge variant="outline" className="border-orange-200 text-orange-700">Organizational</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  // Create KRA form component
  const CreateKRAForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="kra-title">KRA Title</Label>
          <Input id="kra-title" placeholder="Enter KRA title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kra-category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INDIVIDUAL">Individual</SelectItem>
              <SelectItem value="TEAM">Team</SelectItem>
              <SelectItem value="ORGANIZATIONAL">Organizational</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="kra-description">Description</Label>
        <Textarea 
          id="kra-description" 
          placeholder="Enter detailed KRA description"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="kra-department">Department</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Sales & Marketing">Sales & Marketing</SelectItem>
              <SelectItem value="Human Resources">Human Resources</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="kra-weightage">Weightage (%)</Label>
          <Input id="kra-weightage" type="number" placeholder="25" min="1" max="100" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="kra-kpis">Key Performance Indicators</Label>
        <Textarea 
          id="kra-kpis" 
          placeholder="Enter KPIs (one per line)"
          rows={3}
        />
        <p className="text-sm text-muted-foreground">Enter each KPI on a separate line</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="kra-tags">Tags</Label>
        <Input id="kra-tags" placeholder="Enter tags separated by commas" />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="kra-active" />
        <Label htmlFor="kra-active">Set as Active</Label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            KRA Operations
          </h2>
          <p className="text-muted-foreground">Create, manage, and maintain Key Result Areas with comprehensive controls</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Create KRA
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  Create New KRA
                </DialogTitle>
              </DialogHeader>
              <CreateKRAForm />
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  Create KRA
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
            value="list" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <FileText className="w-4 h-4 mr-2" />
            KRA List
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* KRA List Tab */}
        <TabsContent value="list" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search KRAs by title, description, or tags..."
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
                      <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                      <SelectItem value="TEAM">Team</SelectItem>
                      <SelectItem value="ORGANIZATIONAL">Organizational</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
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

          {/* KRA Table */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200/50">
                    <TableHead className="font-semibold text-gray-700">KRA Details</TableHead>
                    <TableHead className="font-semibold text-gray-700">Category</TableHead>
                    <TableHead className="font-semibold text-gray-700">Department</TableHead>
                    <TableHead className="font-semibold text-gray-700">Weightage</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Usage</TableHead>
                    <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKRAs.map((kra) => (
                    <TableRow 
                      key={kra.id} 
                      className="border-b border-gray-100/50 hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900 line-clamp-1">{kra.title}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{kra.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {kra.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                                {tag}
                              </Badge>
                            ))}
                            {kra.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs px-2 py-0">
                                +{kra.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(kra.category)}</TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">{kra.department}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={kra.weightage} className="w-16 h-2" />
                          <span className="text-sm font-medium">{kra.weightage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(kra.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {kra.usageCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{kra.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedKRA(kra);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredKRAs.length === 0 && (
                <div className="text-center py-12">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No KRAs found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or create a new KRA</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockKRAs.length}</p>
                    <p className="text-sm text-gray-600">Total KRAs</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockKRAs.filter(k => k.status === 'ACTIVE').length}
                    </p>
                    <p className="text-sm text-gray-600">Active KRAs</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {(mockKRAs.reduce((sum, k) => sum + k.rating, 0) / mockKRAs.length).toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockKRAs.reduce((sum, k) => sum + k.usageCount, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Usage</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
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
                KRA Operation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-approve">Auto-approve KRAs</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve KRAs that meet predefined criteria</p>
                  </div>
                  <Switch id="auto-approve" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="version-control">Enable version control</Label>
                    <p className="text-sm text-muted-foreground">Track all changes and maintain version history</p>
                  </div>
                  <Switch id="version-control" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="bulk-operations">Allow bulk operations</Label>
                    <p className="text-sm text-muted-foreground">Enable bulk import, export, and update operations</p>
                  </div>
                  <Switch id="bulk-operations" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View KRA Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              {selectedKRA?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedKRA && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <div className="mt-1">{getCategoryBadge(selectedKRA.category)}</div>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedKRA.status)}</div>
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <p className="mt-1 text-gray-700">{selectedKRA.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <p className="mt-1 text-gray-700">{selectedKRA.department}</p>
                </div>
                <div>
                  <Label>Weightage</Label>
                  <p className="mt-1 text-gray-700">{selectedKRA.weightage}%</p>
                </div>
              </div>
              
              <div>
                <Label>Key Performance Indicators</Label>
                <ul className="mt-1 space-y-1">
                  {selectedKRA.kpis.map((kpi, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {kpi}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <Label>Tags</Label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedKRA.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Usage Count</Label>
                  <p className="mt-1 text-gray-700">{selectedKRA.usageCount}</p>
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-gray-700">{selectedKRA.rating}/5</span>
                  </div>
                </div>
                <div>
                  <Label>Version</Label>
                  <p className="mt-1 text-gray-700">v{selectedKRA.version}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}