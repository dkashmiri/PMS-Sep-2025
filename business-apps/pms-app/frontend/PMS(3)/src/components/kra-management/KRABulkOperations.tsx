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
import { Alert, AlertDescription } from "../ui/alert";
import {
  Database,
  Upload,
  Download,
  FileText,
  Play,
  Pause,
  RotateCcw,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Zap,
  Settings,
  History,
  Users,
  Target,
  Eye,
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

interface BulkOperation {
  id: string;
  type: 'IMPORT' | 'EXPORT' | 'UPDATE' | 'DELETE' | 'SYNC';
  name: string;
  description: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PAUSED';
  progress: number;
  totalRecords: number;
  processedRecords: number;
  successCount: number;
  errorCount: number;
  warningCount: number;
  startedBy: string;
  startTime: string;
  endTime?: string;
  estimatedDuration?: string;
  errors: string[];
  warnings: string[];
  details: {
    source?: string;
    target?: string;
    operation?: string;
    filters?: string[];
  };
}

interface KRABulkOperationsProps {
  user: User;
}

export function KRABulkOperations({ user }: KRABulkOperationsProps) {
  const [activeTab, setActiveTab] = useState('operations');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedOperation, setSelectedOperation] = useState<BulkOperation | null>(null);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Mock bulk operations data
  const mockOperations: BulkOperation[] = useMemo(() => [
    {
      id: 'bulk-001',
      type: 'IMPORT',
      name: 'Q1 KRA Import - Engineering',
      description: 'Import KRAs for Engineering department from Excel template',
      status: 'COMPLETED',
      progress: 100,
      totalRecords: 45,
      processedRecords: 45,
      successCount: 43,
      errorCount: 2,
      warningCount: 3,
      startedBy: 'HR Manager',
      startTime: '2024-01-25T09:15:00Z',
      endTime: '2024-01-25T09:18:30Z',
      estimatedDuration: '3m 30s',
      errors: [
        'Row 12: Invalid weightage value - must be between 1-100',
        'Row 28: Missing required field - KRA description'
      ],
      warnings: [
        'Row 5: Duplicate KRA title detected',
        'Row 15: High weightage (>50%) for individual KRA',
        'Row 32: KRA already exists for this role'
      ],
      details: {
        source: 'kra_template_engineering_q1.xlsx',
        target: 'Engineering Department',
        operation: 'Create new KRAs',
        filters: ['Department: Engineering', 'Active: true']
      }
    },
    {
      id: 'bulk-002',
      type: 'EXPORT',
      name: 'Sales KRA Export',
      description: 'Export all active Sales department KRAs for review',
      status: 'COMPLETED',
      progress: 100,
      totalRecords: 32,
      processedRecords: 32,
      successCount: 32,
      errorCount: 0,
      warningCount: 0,
      startedBy: 'VP Sales',
      startTime: '2024-01-24T14:20:00Z',
      endTime: '2024-01-24T14:21:15Z',
      estimatedDuration: '1m 15s',
      errors: [],
      warnings: [],
      details: {
        source: 'Sales Department KRAs',
        target: 'sales_kras_export_2024.xlsx',
        operation: 'Export to Excel',
        filters: ['Department: Sales', 'Status: Active']
      }
    },
    {
      id: 'bulk-003',
      type: 'UPDATE',
      name: 'KRA Weightage Update - Finance',
      description: 'Batch update KRA weightages for Finance department roles',
      status: 'RUNNING',
      progress: 65,
      totalRecords: 28,
      processedRecords: 18,
      successCount: 17,
      errorCount: 1,
      warningCount: 2,
      startedBy: 'CFO',
      startTime: '2024-01-25T10:45:00Z',
      estimatedDuration: '5m',
      errors: [
        'Row 8: Cannot update archived KRA'
      ],
      warnings: [
        'Row 3: Weightage reduced significantly (>20%)',
        'Row 15: Total weightage exceeds 100% for role'
      ],
      details: {
        source: 'Finance Department KRAs',
        target: 'Finance Department KRAs',
        operation: 'Update weightage values',
        filters: ['Department: Finance', 'Type: Role-based']
      }
    },
    {
      id: 'bulk-004',
      type: 'SYNC',
      name: 'HRMS Integration Sync',
      description: 'Synchronize KRA assignments with HRMS system',
      status: 'FAILED',
      progress: 25,
      totalRecords: 156,
      processedRecords: 39,
      successCount: 35,
      errorCount: 4,
      warningCount: 8,
      startedBy: 'System',
      startTime: '2024-01-25T08:00:00Z',
      endTime: '2024-01-25T08:05:30Z',
      estimatedDuration: '15m',
      errors: [
        'HRMS API connection timeout',
        'Authentication failed for HRMS endpoint',
        'Data format mismatch in employee records',
        'Required fields missing in KRA mapping'
      ],
      warnings: [
        'Employee ID not found in HRMS: EMP001',
        'Duplicate KRA assignment detected',
        'Role mapping conflict for senior positions',
        'Department mismatch between systems',
        'Inactive employees with active KRAs',
        'Missing approval workflow status',
        'Version conflict in KRA templates',
        'Outdated employee role information'
      ],
      details: {
        source: 'PMS KRA Database',
        target: 'HRMS System',
        operation: 'Bidirectional sync',
        filters: ['All active employees', 'All active KRAs']
      }
    },
    {
      id: 'bulk-005',
      type: 'DELETE',
      name: 'Cleanup Archived KRAs',
      description: 'Remove KRAs archived more than 2 years ago',
      status: 'PENDING',
      progress: 0,
      totalRecords: 67,
      processedRecords: 0,
      successCount: 0,
      errorCount: 0,
      warningCount: 0,
      startedBy: 'Admin',
      startTime: '2024-01-25T11:00:00Z',
      estimatedDuration: '3m',
      errors: [],
      warnings: [],
      details: {
        source: 'Archived KRAs (2022 and earlier)',
        target: 'Delete permanently',
        operation: 'Permanent deletion',
        filters: ['Status: Archived', 'Created: < 2022-01-01']
      }
    },
    {
      id: 'bulk-006',
      type: 'IMPORT',
      name: 'Template Import - Leadership',
      description: 'Import KRA templates for leadership roles',
      status: 'PAUSED',
      progress: 40,
      totalRecords: 15,
      processedRecords: 6,
      successCount: 5,
      errorCount: 1,
      warningCount: 2,
      startedBy: 'CHRO',
      startTime: '2024-01-25T09:30:00Z',
      estimatedDuration: '8m',
      errors: [
        'Template validation failed for Executive role'
      ],
      warnings: [
        'KRA weightage distribution needs review',
        'Similar template already exists'
      ],
      details: {
        source: 'leadership_kra_templates.json',
        target: 'KRA Template Library',
        operation: 'Import templates',
        filters: ['Level: Leadership', 'Category: Strategic']
      }
    }
  ], []);

  // Filter operations
  const filteredOperations = useMemo(() => {
    return mockOperations.filter(operation => {
      const matchesSearch = operation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          operation.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || operation.status === selectedStatus;
      const matchesType = selectedType === 'all' || operation.type === selectedType;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [mockOperations, searchTerm, selectedStatus, selectedType]);

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'RUNNING':
        return <Badge className="bg-blue-100 text-blue-800"><Play className="w-3 h-3 mr-1" />Running</Badge>;
      case 'FAILED':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'PAUSED':
        return <Badge className="bg-gray-100 text-gray-800"><Pause className="w-3 h-3 mr-1" />Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'IMPORT':
        return <Badge className="bg-blue-100 text-blue-800"><Upload className="w-3 h-3 mr-1" />Import</Badge>;
      case 'EXPORT':
        return <Badge className="bg-green-100 text-green-800"><Download className="w-3 h-3 mr-1" />Export</Badge>;
      case 'UPDATE':
        return <Badge className="bg-purple-100 text-purple-800"><Target className="w-3 h-3 mr-1" />Update</Badge>;
      case 'DELETE':
        return <Badge className="bg-red-100 text-red-800"><Trash2 className="w-3 h-3 mr-1" />Delete</Badge>;
      case 'SYNC':
        return <Badge className="bg-cyan-100 text-cyan-800"><Zap className="w-3 h-3 mr-1" />Sync</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  // Import form component
  const ImportForm = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="import-type">Import Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select import type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kras">KRAs</SelectItem>
            <SelectItem value="templates">KRA Templates</SelectItem>
            <SelectItem value="mappings">KRA Mappings</SelectItem>
            <SelectItem value="assignments">KRA Assignments</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="import-file">Select File</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Drop your file here or click to browse</p>
          <Input type="file" accept=".xlsx,.xls,.csv,.json" className="hidden" />
          <Button variant="outline" size="sm">Choose File</Button>
        </div>
        <p className="text-xs text-muted-foreground">Supported formats: Excel (.xlsx, .xls), CSV (.csv), JSON (.json)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="import-department">Target Department</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="sales">Sales & Marketing</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Import Options</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch id="import-validate" defaultChecked />
            <Label htmlFor="import-validate">Validate data before import</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="import-skip-duplicates" defaultChecked />
            <Label htmlFor="import-skip-duplicates">Skip duplicate entries</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="import-notify" />
            <Label htmlFor="import-notify">Send notification on completion</Label>
          </div>
        </div>
      </div>
    </div>
  );

  // Export form component
  const ExportForm = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="export-type">Export Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select export type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kras">All KRAs</SelectItem>
            <SelectItem value="templates">KRA Templates</SelectItem>
            <SelectItem value="mappings">KRA Mappings</SelectItem>
            <SelectItem value="assignments">KRA Assignments</SelectItem>
            <SelectItem value="analytics">KRA Analytics Report</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="export-format">Export Format</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
            <SelectItem value="csv">CSV (.csv)</SelectItem>
            <SelectItem value="json">JSON (.json)</SelectItem>
            <SelectItem value="pdf">PDF Report (.pdf)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Filter Options</Label>
        <div className="grid grid-cols-2 gap-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="sales">Sales & Marketing</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Export Options</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch id="export-include-kpis" defaultChecked />
            <Label htmlFor="export-include-kpis">Include KPI details</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="export-include-history" />
            <Label htmlFor="export-include-history">Include modification history</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="export-compress" />
            <Label htmlFor="export-compress">Compress large files</Label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            Bulk Operations
          </h2>
          <p className="text-muted-foreground">Manage large-scale KRA operations with import, export, and batch processing capabilities</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <History className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  Export KRA Data
                </DialogTitle>
              </DialogHeader>
              <ExportForm />
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                  Start Export
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  Import KRA Data
                </DialogTitle>
              </DialogHeader>
              <ImportForm />
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600">
                  Start Import
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
            value="operations" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Database className="w-4 h-4 mr-2" />
            Operations
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <History className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white rounded-xl h-8 transition-all duration-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search operations by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="RUNNING">Running</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="FAILED">Failed</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="PAUSED">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="IMPORT">Import</SelectItem>
                      <SelectItem value="EXPORT">Export</SelectItem>
                      <SelectItem value="UPDATE">Update</SelectItem>
                      <SelectItem value="DELETE">Delete</SelectItem>
                      <SelectItem value="SYNC">Sync</SelectItem>
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

          {/* Operations Table */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200/50">
                    <TableHead className="font-semibold text-gray-700">Operation</TableHead>
                    <TableHead className="font-semibold text-gray-700">Type</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Progress</TableHead>
                    <TableHead className="font-semibold text-gray-700">Records</TableHead>
                    <TableHead className="font-semibold text-gray-700">Results</TableHead>
                    <TableHead className="font-semibold text-gray-700">Started By</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOperations.map((operation) => (
                    <TableRow 
                      key={operation.id} 
                      className="border-b border-gray-100/50 hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900 line-clamp-1">{operation.name}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{operation.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(operation.startTime).toLocaleString()}</span>
                            {operation.estimatedDuration && (
                              <>
                                <span>•</span>
                                <span>Est: {operation.estimatedDuration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(operation.type)}</TableCell>
                      <TableCell>{getStatusBadge(operation.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress value={operation.progress} className="w-16 h-2" />
                            <span className="text-sm font-medium">{operation.progress}%</span>
                          </div>
                          {operation.status === 'RUNNING' && (
                            <p className="text-xs text-muted-foreground">
                              {operation.processedRecords} / {operation.totalRecords}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{operation.totalRecords}</span>
                          </div>
                          {operation.processedRecords > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Processed: {operation.processedRecords}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-xs">
                          {operation.successCount > 0 && (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              <span>{operation.successCount} success</span>
                            </div>
                          )}
                          {operation.errorCount > 0 && (
                            <div className="flex items-center gap-1 text-red-600">
                              <XCircle className="w-3 h-3" />
                              <span>{operation.errorCount} errors</span>
                            </div>
                          )}
                          {operation.warningCount > 0 && (
                            <div className="flex items-center gap-1 text-yellow-600">
                              <AlertTriangle className="w-3 h-3" />
                              <span>{operation.warningCount} warnings</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">{operation.startedBy}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedOperation(operation);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {operation.status === 'RUNNING' && (
                            <Button variant="ghost" size="sm">
                              <Pause className="w-4 h-4" />
                            </Button>
                          )}
                          {operation.status === 'PAUSED' && (
                            <Button variant="ghost" size="sm">
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          {operation.status === 'FAILED' && (
                            <Button variant="ghost" size="sm">
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredOperations.length === 0 && (
                <div className="text-center py-12">
                  <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No operations found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or start a new operation</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockOperations.filter(op => op.status === 'COMPLETED').length}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
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
                      {mockOperations.filter(op => op.status === 'FAILED').length}
                    </p>
                    <p className="text-sm text-gray-600">Failed</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockOperations.reduce((sum, op) => sum + op.totalRecords, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Records Processed</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
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
                Bulk Operation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-retry failed operations</Label>
                    <p className="text-sm text-muted-foreground">Automatically retry failed operations up to 3 times</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications on operation completion</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Detailed logging</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed logging for all operations</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Operation Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              {selectedOperation?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedOperation && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <div className="mt-1">{getTypeBadge(selectedOperation.type)}</div>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedOperation.status)}</div>
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <p className="mt-1 text-gray-700">{selectedOperation.description}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Total Records</Label>
                  <p className="mt-1 text-gray-700">{selectedOperation.totalRecords}</p>
                </div>
                <div>
                  <Label>Processed</Label>
                  <p className="mt-1 text-gray-700">{selectedOperation.processedRecords}</p>
                </div>
                <div>
                  <Label>Progress</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Progress value={selectedOperation.progress} className="w-16 h-2" />
                    <span className="text-sm">{selectedOperation.progress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Success</Label>
                  <p className="mt-1 text-green-600 font-medium">{selectedOperation.successCount}</p>
                </div>
                <div>
                  <Label>Errors</Label>
                  <p className="mt-1 text-red-600 font-medium">{selectedOperation.errorCount}</p>
                </div>
                <div>
                  <Label>Warnings</Label>
                  <p className="mt-1 text-yellow-600 font-medium">{selectedOperation.warningCount}</p>
                </div>
              </div>
              
              {selectedOperation.errors.length > 0 && (
                <div>
                  <Label>Errors</Label>
                  <div className="mt-2 space-y-2">
                    {selectedOperation.errors.map((error, index) => (
                      <Alert key={index} className="border-red-200">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <AlertDescription className="text-red-700">{error}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedOperation.warnings.length > 0 && (
                <div>
                  <Label>Warnings</Label>
                  <div className="mt-2 space-y-2">
                    {selectedOperation.warnings.map((warning, index) => (
                      <Alert key={index} className="border-yellow-200">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-700">{warning}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <Label>Operation Details</Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                  <div><strong>Source:</strong> {selectedOperation.details.source}</div>
                  <div><strong>Target:</strong> {selectedOperation.details.target}</div>
                  <div><strong>Operation:</strong> {selectedOperation.details.operation}</div>
                  {selectedOperation.details.filters && (
                    <div><strong>Filters:</strong> {selectedOperation.details.filters.join(', ')}</div>
                  )}
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