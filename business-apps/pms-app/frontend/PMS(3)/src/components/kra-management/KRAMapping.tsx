import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import {
  Network,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Users,
  Target,
  Building,
  UserCheck,
  Settings,
  Zap,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Copy,
  Link,
  Unlink
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
  department: string;
  domain: string;
}

interface KRAMapping {
  id: string;
  kraId: string;
  kraTitle: string;
  mappingType: 'ROLE' | 'DEPARTMENT' | 'INDIVIDUAL' | 'PROJECT';
  targetId: string;
  targetName: string;
  targetType: string;
  weightage: number;
  isActive: boolean;
  autoAssign: boolean;
  conditions: string[];
  createdBy: string;
  createdAt: string;
  lastModified: string;
  usageCount: number;
}

interface KRAMappingProps {
  user: User;
}

export function KRAMapping({ user }: KRAMappingProps) {
  const [activeTab, setActiveTab] = useState('mappings');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedKRA, setSelectedKRA] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMapping, setEditingMapping] = useState<KRAMapping | null>(null);
  const [selectedMappings, setSelectedMappings] = useState<string[]>([]);

  // Mock KRA mapping data
  const mockMappings: KRAMapping[] = useMemo(() => [
    {
      id: 'map-001',
      kraId: 'kra-001',
      kraTitle: 'Customer Satisfaction Excellence',
      mappingType: 'ROLE',
      targetId: 'role-sales-rep',
      targetName: 'Sales Representative',
      targetType: 'Sales Role',
      weightage: 35,
      isActive: true,
      autoAssign: true,
      conditions: ['Department: Sales', 'Level: Individual Contributor', 'Experience: ≥2 years'],
      createdBy: 'HR Manager',
      createdAt: '2024-01-15T10:00:00Z',
      lastModified: '2024-01-20T14:30:00Z',
      usageCount: 45
    },
    {
      id: 'map-002',
      kraId: 'kra-002',
      kraTitle: 'Innovation & Product Development',
      mappingType: 'DEPARTMENT',
      targetId: 'dept-engineering',
      targetName: 'Engineering Department',
      targetType: 'Department',
      weightage: 40,
      isActive: true,
      autoAssign: true,
      conditions: ['Department: Engineering', 'Role Level: Senior+'],
      createdBy: 'Tech Lead',
      createdAt: '2024-01-10T09:15:00Z',
      lastModified: '2024-01-18T16:45:00Z',
      usageCount: 32
    },
    {
      id: 'map-003',
      kraId: 'kra-003',
      kraTitle: 'Financial Performance & Cost Management',
      mappingType: 'ROLE',
      targetId: 'role-finance-manager',
      targetName: 'Finance Manager',
      targetType: 'Management Role',
      weightage: 45,
      isActive: true,
      autoAssign: false,
      conditions: ['Department: Finance', 'Level: Manager', 'Budget Authority: Yes'],
      createdBy: 'CFO',
      createdAt: '2024-01-05T11:20:00Z',
      lastModified: '2024-01-22T13:10:00Z',
      usageCount: 28
    },
    {
      id: 'map-004',
      kraId: 'kra-004',
      kraTitle: 'Team Leadership & Development',
      mappingType: 'ROLE',
      targetId: 'role-team-lead',
      targetName: 'Team Lead',
      targetType: 'Leadership Role',
      weightage: 30,
      isActive: false,
      autoAssign: true,
      conditions: ['Has Direct Reports: Yes', 'Experience: ≥3 years'],
      createdBy: 'HR Manager',
      createdAt: '2024-01-23T15:30:00Z',
      lastModified: '2024-01-24T10:15:00Z',
      usageCount: 12
    },
    {
      id: 'map-005',
      kraId: 'kra-005',
      kraTitle: 'Quality Assurance & Process Improvement',
      mappingType: 'PROJECT',
      targetId: 'proj-quality-initiative',
      targetName: 'Quality Excellence Initiative',
      targetType: 'Strategic Project',
      weightage: 25,
      isActive: true,
      autoAssign: false,
      conditions: ['Project Member: Yes', 'Role: QA/Process'],
      createdBy: 'Operations Manager',
      createdAt: '2023-12-20T08:45:00Z',
      lastModified: '2024-01-15T12:20:00Z',
      usageCount: 67
    },
    {
      id: 'map-006',
      kraId: 'kra-006',
      kraTitle: 'Strategic Market Expansion',
      mappingType: 'INDIVIDUAL',
      targetId: 'user-sales-director',
      targetName: 'Sarah Chen - Sales Director',
      targetType: 'Individual Assignment',
      weightage: 50,
      isActive: true,
      autoAssign: false,
      conditions: ['Direct Assignment', 'Strategic Initiative Owner'],
      createdBy: 'VP Sales',
      createdAt: '2024-01-08T14:20:00Z',
      lastModified: '2024-01-21T09:35:00Z',
      usageCount: 23
    }
  ], []);

  // Filter mappings
  const filteredMappings = useMemo(() => {
    return mockMappings.filter(mapping => {
      const matchesSearch = mapping.kraTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mapping.targetName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || mapping.mappingType === selectedType;
      const matchesKRA = selectedKRA === 'all' || mapping.kraId === selectedKRA;
      
      return matchesSearch && matchesType && matchesKRA;
    });
  }, [mockMappings, searchTerm, selectedType, selectedKRA]);

  // Get mapping type badge
  const getMappingTypeBadge = (type: string) => {
    switch (type) {
      case 'ROLE':
        return <Badge className="bg-blue-100 text-blue-800">Role-based</Badge>;
      case 'DEPARTMENT':
        return <Badge className="bg-green-100 text-green-800">Department</Badge>;
      case 'INDIVIDUAL':
        return <Badge className="bg-purple-100 text-purple-800">Individual</Badge>;
      case 'PROJECT':
        return <Badge className="bg-orange-100 text-orange-800">Project</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  // Edit mapping form
  const EditMappingForm = () => (
    <div className="space-y-6">
      {editingMapping && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-mapping-kra">Select KRA</Label>
              <Select defaultValue={editingMapping.kraId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose KRA to map" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kra-001">Customer Satisfaction Excellence</SelectItem>
                  <SelectItem value="kra-002">Innovation & Product Development</SelectItem>
                  <SelectItem value="kra-003">Financial Performance & Cost Management</SelectItem>
                  <SelectItem value="kra-004">Team Leadership & Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-mapping-type">Mapping Type</Label>
              <Select defaultValue={editingMapping.mappingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mapping type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ROLE">Role-based</SelectItem>
                  <SelectItem value="DEPARTMENT">Department</SelectItem>
                  <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                  <SelectItem value="PROJECT">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-mapping-target">Target Selection</Label>
            <Select defaultValue={editingMapping.targetId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose target for mapping" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales-rep">Sales Representative</SelectItem>
                <SelectItem value="engineering-dept">Engineering Department</SelectItem>
                <SelectItem value="finance-manager">Finance Manager</SelectItem>
                <SelectItem value="quality-project">Quality Excellence Initiative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-mapping-weightage">Weightage (%)</Label>
            <Input 
              id="edit-mapping-weightage" 
              type="number" 
              defaultValue={editingMapping.weightage}
              min="1" 
              max="100" 
            />
          </div>

          <div className="space-y-4">
            <Label>Mapping Conditions</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="edit-condition-dept" 
                  defaultChecked={editingMapping.conditions.some(c => c.includes('Department'))}
                />
                <Label htmlFor="edit-condition-dept">Department match required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="edit-condition-level" 
                  defaultChecked={editingMapping.conditions.some(c => c.includes('Level'))}
                />
                <Label htmlFor="edit-condition-level">Minimum role level</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="edit-condition-exp" 
                  defaultChecked={editingMapping.conditions.some(c => c.includes('Experience'))}
                />
                <Label htmlFor="edit-condition-exp">Experience requirement</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="edit-mapping-auto-assign" 
              defaultChecked={editingMapping.autoAssign} 
            />
            <Label htmlFor="edit-mapping-auto-assign">Enable auto-assignment</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="edit-mapping-active" 
              defaultChecked={editingMapping.isActive} 
            />
            <Label htmlFor="edit-mapping-active">Set as active</Label>
          </div>
        </>
      )}
    </div>
  );

  // Create mapping form
  const CreateMappingForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mapping-kra">Select KRA</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose KRA to map" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kra-001">Customer Satisfaction Excellence</SelectItem>
              <SelectItem value="kra-002">Innovation & Product Development</SelectItem>
              <SelectItem value="kra-003">Financial Performance & Cost Management</SelectItem>
              <SelectItem value="kra-004">Team Leadership & Development</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mapping-type">Mapping Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select mapping type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ROLE">Role-based</SelectItem>
              <SelectItem value="DEPARTMENT">Department</SelectItem>
              <SelectItem value="INDIVIDUAL">Individual</SelectItem>
              <SelectItem value="PROJECT">Project</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mapping-target">Target Selection</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose target for mapping" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales-rep">Sales Representative</SelectItem>
            <SelectItem value="engineering-dept">Engineering Department</SelectItem>
            <SelectItem value="finance-manager">Finance Manager</SelectItem>
            <SelectItem value="quality-project">Quality Excellence Initiative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mapping-weightage">Weightage (%)</Label>
        <Input id="mapping-weightage" type="number" placeholder="30" min="1" max="100" />
      </div>

      <div className="space-y-4">
        <Label>Mapping Conditions</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="condition-dept" />
            <Label htmlFor="condition-dept">Department match required</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="condition-level" />
            <Label htmlFor="condition-level">Minimum role level</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="condition-exp" />
            <Label htmlFor="condition-exp">Experience requirement</Label>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="mapping-auto-assign" defaultChecked />
        <Label htmlFor="mapping-auto-assign">Enable auto-assignment</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="mapping-active" defaultChecked />
        <Label htmlFor="mapping-active">Set as active</Label>
      </div>
    </div>
  );

  // Handle select all mappings
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMappings(filteredMappings.map(m => m.id));
    } else {
      setSelectedMappings([]);
    }
  };

  // Handle individual mapping selection
  const handleSelectMapping = (mappingId: string, checked: boolean) => {
    if (checked) {
      setSelectedMappings([...selectedMappings, mappingId]);
    } else {
      setSelectedMappings(selectedMappings.filter(id => id !== mappingId));
    }
  };

  // Handle edit mapping
  const handleEditMapping = (mapping: KRAMapping) => {
    setEditingMapping(mapping);
    setIsEditDialogOpen(true);
  };

  // Handle save edit
  const handleSaveEdit = () => {
    // In a real app, this would make an API call to update the mapping
    console.log('Saving edited mapping:', editingMapping);
    setIsEditDialogOpen(false);
    setEditingMapping(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Network className="w-6 h-6 text-white" />
            </div>
            KRA Mapping
          </h2>
          <p className="text-muted-foreground">Map KRAs to roles, departments, individuals, and projects with intelligent assignment rules</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedMappings.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{selectedMappings.length} selected</Badge>
              <Button variant="outline" size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Bulk Actions
              </Button>
            </div>
          )}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Mapping
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  Create KRA Mapping
                </DialogTitle>
                <DialogDescription>
                  Map a KRA to roles, departments, individuals, or projects with intelligent assignment rules and conditions.
                </DialogDescription>
              </DialogHeader>
              <CreateMappingForm />
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                  Create Mapping
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Mapping Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Edit className="w-5 h-5 text-white" />
                  </div>
                  Edit KRA Mapping
                </DialogTitle>
                <DialogDescription>
                  Update the mapping configuration, conditions, and assignment rules for this KRA.
                </DialogDescription>
              </DialogHeader>
              <EditMappingForm />
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingMapping(null);
                }}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={handleSaveEdit}
                >
                  Save Changes
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
            value="mappings" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Network className="w-4 h-4 mr-2" />
            Mappings
          </TabsTrigger>
          <TabsTrigger 
            value="rules" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Zap className="w-4 h-4 mr-2" />
            Auto Rules
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Mappings Tab */}
        <TabsContent value="mappings" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search mappings by KRA or target name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Mapping Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="ROLE">Role-based</SelectItem>
                      <SelectItem value="DEPARTMENT">Department</SelectItem>
                      <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                      <SelectItem value="PROJECT">Project</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedKRA} onValueChange={setSelectedKRA}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by KRA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All KRAs</SelectItem>
                      <SelectItem value="kra-001">Customer Satisfaction</SelectItem>
                      <SelectItem value="kra-002">Innovation & Development</SelectItem>
                      <SelectItem value="kra-003">Financial Performance</SelectItem>
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

          {/* Mappings Table */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200/50">
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={selectedMappings.length === filteredMappings.length && filteredMappings.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">KRA & Target</TableHead>
                    <TableHead className="font-semibold text-gray-700">Type</TableHead>
                    <TableHead className="font-semibold text-gray-700">Weightage</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Auto-Assign</TableHead>
                    <TableHead className="font-semibold text-gray-700">Usage</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMappings.map((mapping) => (
                    <TableRow 
                      key={mapping.id} 
                      className="border-b border-gray-100/50 hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell>
                        <Checkbox 
                          checked={selectedMappings.includes(mapping.id)}
                          onCheckedChange={(checked) => handleSelectMapping(mapping.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            <p className="font-medium text-gray-900 line-clamp-1">{mapping.kraTitle}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Link className="w-4 h-4 text-purple-600" />
                            <span>→ {mapping.targetName}</span>
                          </div>
                          <p className="text-xs text-gray-500">{mapping.targetType}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getMappingTypeBadge(mapping.mappingType)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                              style={{ width: `${mapping.weightage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{mapping.weightage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {mapping.isActive ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {mapping.autoAssign ? (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Zap className="w-3 h-3 mr-1" />
                            Auto
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Manual</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {mapping.usageCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => console.log('View mapping:', mapping.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditMapping(mapping)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => console.log('Duplicate mapping:', mapping.id)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => console.log('Unlink mapping:', mapping.id)}
                          >
                            <Unlink className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredMappings.length === 0 && (
                <div className="text-center py-12">
                  <Network className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No mappings found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or create a new mapping</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auto Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Auto-Assignment Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-blue-900">Department Match Rule</h4>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-blue-700">Automatically assign KRAs based on employee department</p>
                  </div>
                  
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-green-900">Role Level Rule</h4>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-green-700">Match KRAs to appropriate role levels and seniority</p>
                  </div>
                  
                  <div className="p-4 border border-purple-200 rounded-lg bg-purple-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-purple-900">Experience Rule</h4>
                      <Switch />
                    </div>
                    <p className="text-sm text-purple-700">Consider years of experience for KRA assignment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  Rule Conflicts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50/50">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-900">Overlapping Rules</span>
                    </div>
                    <p className="text-xs text-yellow-700">2 rules conflict for Sales department</p>
                  </div>
                  
                  <div className="p-3 border border-green-200 rounded-lg bg-green-50/50">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">All Clear</span>
                    </div>
                    <p className="text-xs text-green-700">No conflicts in Engineering rules</p>
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
                Mapping Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow multiple KRA assignments</Label>
                    <p className="text-sm text-muted-foreground">Enable assigning multiple KRAs to same target</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-resolve conflicts</Label>
                    <p className="text-sm text-muted-foreground">Automatically resolve mapping conflicts using priority rules</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notification on assignment</Label>
                    <p className="text-sm text-muted-foreground">Send notifications when KRAs are auto-assigned</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}