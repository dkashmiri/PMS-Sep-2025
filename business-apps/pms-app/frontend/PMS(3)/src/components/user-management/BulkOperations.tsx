import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  FileText,
  Mail,
  UserPlus,
  UserMinus,
  RefreshCw,
  Database,
  Eye,
  Trash2,
  Clock,
  PlayCircle,
  PauseCircle
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

interface BulkOperation {
  id: string;
  type: 'import' | 'export' | 'update' | 'activate' | 'deactivate' | 'delete' | 'notify';
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  totalRecords: number;
  processedRecords: number;
  successCount: number;
  errorCount: number;
  createdAt: string;
  completedAt?: string;
  errors?: string[];
}

interface ImportRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  domain: string;
  project?: string;
  status: 'valid' | 'invalid' | 'duplicate';
  errors: string[];
}

interface BulkOperationsProps {
  user: User;
}

// Mock data for bulk operations history
const mockOperations: BulkOperation[] = [
  {
    id: '1',
    type: 'import',
    name: 'Q1 New Hires Import',
    description: 'Import 50 new employees from Q1 hiring',
    status: 'completed',
    progress: 100,
    totalRecords: 50,
    processedRecords: 50,
    successCount: 48,
    errorCount: 2,
    createdAt: '2024-01-15 09:30 AM',
    completedAt: '2024-01-15 09:45 AM',
    errors: ['Invalid email format for John Doe', 'Duplicate employee ID for Jane Smith']
  },
  {
    id: '2',
    type: 'update',
    name: 'Department Restructure',
    description: 'Update department assignments for Engineering team',
    status: 'running',
    progress: 65,
    totalRecords: 120,
    processedRecords: 78,
    successCount: 75,
    errorCount: 3,
    createdAt: '2024-01-15 10:00 AM'
  },
  {
    id: '3',
    type: 'notify',
    name: 'Performance Review Reminder',
    description: 'Send review reminder emails to all active employees',
    status: 'pending',
    progress: 0,
    totalRecords: 200,
    processedRecords: 0,
    successCount: 0,
    errorCount: 0,
    createdAt: '2024-01-15 11:00 AM'
  }
];

// Mock import preview data
const mockImportPreview: ImportRecord[] = [
  {
    id: '1',
    name: 'Alice Brown',
    email: 'alice.brown@company.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
    domain: 'Frontend Development',
    project: 'Web Platform',
    status: 'valid',
    errors: []
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'invalid-email',
    role: 'EMPLOYEE',
    department: 'Marketing',
    domain: 'Digital Marketing',
    status: 'invalid',
    errors: ['Invalid email format']
  },
  {
    id: '3',
    name: 'Charlie Davis',
    email: 'charlie.davis@company.com',
    role: 'INVALID_ROLE',
    department: 'Sales',
    domain: 'Sales Operations',
    status: 'invalid',
    errors: ['Invalid role specified']
  },
  {
    id: '4',
    name: 'Diana Evans',
    email: 'diana.evans@company.com',
    role: 'TEAMLEAD',
    department: 'HR',
    domain: 'HR Operations',
    status: 'duplicate',
    errors: ['Employee with this email already exists']
  }
];

export function BulkOperations({ user }: BulkOperationsProps) {
  const [operations, setOperations] = useState<BulkOperation[]>(mockOperations);
  const [activeTab, setActiveTab] = useState('import');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<ImportRecord[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate file parsing and validation
      setTimeout(() => {
        setImportPreview(mockImportPreview);
        setShowPreview(true);
      }, 1000);
    }
  };

  const handleStartImport = () => {
    if (!importPreview.length) return;
    
    const validRecords = importPreview.filter(record => record.status === 'valid');
    const newOperation: BulkOperation = {
      id: Date.now().toString(),
      type: 'import',
      name: `Import from ${selectedFile?.name}`,
      description: `Import ${validRecords.length} valid records`,
      status: 'running',
      progress: 0,
      totalRecords: validRecords.length,
      processedRecords: 0,
      successCount: 0,
      errorCount: 0,
      createdAt: new Date().toLocaleString()
    };
    
    setOperations([newOperation, ...operations]);
    setIsProcessing(true);
    
    // Simulate import process
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsProcessing(false);
        // Update operation status
        setOperations(prev => prev.map(op => 
          op.id === newOperation.id 
            ? { ...op, status: 'completed', progress: 100, processedRecords: validRecords.length, successCount: validRecords.length }
            : op
        ));
      } else {
        setOperations(prev => prev.map(op => 
          op.id === newOperation.id 
            ? { ...op, progress, processedRecords: Math.floor((progress / 100) * validRecords.length) }
            : op
        ));
      }
    }, 500);
  };

  const handleBulkAction = () => {
    if (!bulkAction) return;
    
    const newOperation: BulkOperation = {
      id: Date.now().toString(),
      type: bulkAction as BulkOperation['type'],
      name: `Bulk ${bulkAction.charAt(0).toUpperCase() + bulkAction.slice(1)}`,
      description: `${bulkAction} users in ${selectedDepartment || 'all departments'}`,
      status: 'running',
      progress: 0,
      totalRecords: 50, // Mock count
      processedRecords: 0,
      successCount: 0,
      errorCount: 0,
      createdAt: new Date().toLocaleString()
    };
    
    setOperations([newOperation, ...operations]);
    
    // Simulate bulk operation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setOperations(prev => prev.map(op => 
          op.id === newOperation.id 
            ? { ...op, status: 'completed', progress: 100, processedRecords: 50, successCount: 48, errorCount: 2 }
            : op
        ));
      } else {
        setOperations(prev => prev.map(op => 
          op.id === newOperation.id 
            ? { ...op, progress, processedRecords: Math.floor((progress / 100) * 50) }
            : op
        ));
      }
    }, 800);
  };

  const handleEmailNotification = () => {
    if (!emailTemplate.trim()) return;
    
    const newOperation: BulkOperation = {
      id: Date.now().toString(),
      type: 'notify',
      name: 'Bulk Email Notification',
      description: 'Send custom email to selected users',
      status: 'running',
      progress: 0,
      totalRecords: 150,
      processedRecords: 0,
      successCount: 0,
      errorCount: 0,
      createdAt: new Date().toLocaleString()
    };
    
    setOperations([newOperation, ...operations]);
    setEmailTemplate('');
  };

  const getStatusColor = (status: BulkOperation['status']) => {
    switch (status) {
      case 'completed': return 'text-google-green';
      case 'running': return 'text-google-blue';
      case 'failed': return 'text-google-red';
      case 'paused': return 'text-google-yellow';
      default: return 'text-google-gray-600';
    }
  };

  const getStatusIcon = (status: BulkOperation['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-google-green" />;
      case 'running': return <RefreshCw className="w-4 h-4 text-google-blue animate-spin" />;
      case 'failed': return <X className="w-4 h-4 text-google-red" />;
      case 'paused': return <PauseCircle className="w-4 h-4 text-google-yellow" />;
      default: return <Clock className="w-4 h-4 text-google-gray-600" />;
    }
  };

  const getTypeIcon = (type: BulkOperation['type']) => {
    switch (type) {
      case 'import': return <Upload className="w-4 h-4" />;
      case 'export': return <Download className="w-4 h-4" />;
      case 'update': return <RefreshCw className="w-4 h-4" />;
      case 'activate': return <UserPlus className="w-4 h-4" />;
      case 'deactivate': return <UserMinus className="w-4 h-4" />;
      case 'delete': return <Trash2 className="w-4 h-4" />;
      case 'notify': return <Mail className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const validPreviewRecords = importPreview.filter(record => record.status === 'valid');
  const invalidPreviewRecords = importPreview.filter(record => record.status !== 'valid');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-google-gray-900">Bulk Operations</h1>
          <p className="text-google-gray-600 mt-1">Import, export, and manage users in bulk</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="google-button-secondary">
            <FileText className="w-4 h-4 mr-2" />
            Download Template
          </Button>
          <Button variant="outline" className="google-button-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export All Users
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Total Operations</p>
                <p className="text-2xl font-medium text-google-gray-900">{operations.length}</p>
              </div>
              <div className="w-12 h-12 bg-google-blue/10 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-google-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Running</p>
                <p className="text-2xl font-medium text-google-blue">
                  {operations.filter(op => op.status === 'running').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-google-blue/10 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-google-blue animate-spin" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Completed</p>
                <p className="text-2xl font-medium text-google-green">
                  {operations.filter(op => op.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-google-green/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-google-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-google-gray-600">Failed</p>
                <p className="text-2xl font-medium text-google-red">
                  {operations.filter(op => op.status === 'failed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-google-red/10 rounded-lg flex items-center justify-center">
                <X className="w-6 h-6 text-google-red" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bulk Operations Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="import">Import Users</TabsTrigger>
              <TabsTrigger value="bulk-actions">Bulk Actions</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            {/* Import Users Tab */}
            <TabsContent value="import" className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="text-google-gray-900">Import Users from CSV</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Upload CSV File</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="file"
                        accept=".csv,.xlsx"
                        onChange={handleFileUpload}
                        className="premium-input"
                      />
                      <Button variant="outline" className="google-button-secondary">
                        <FileText className="w-4 h-4 mr-2" />
                        Template
                      </Button>
                    </div>
                    <p className="text-sm text-google-gray-600">
                      Supported formats: CSV, XLSX. Maximum file size: 10MB
                    </p>
                  </div>
                  
                  {selectedFile && (
                    <Alert>
                      <FileSpreadsheet className="h-4 w-4" />
                      <AlertDescription>
                        File "{selectedFile.name}" uploaded successfully. Size: {(selectedFile.size / 1024).toFixed(1)} KB
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Import Preview */}
              {showPreview && (
                <Card className="premium-card">
                  <CardHeader>
                    <CardTitle className="text-google-gray-900 flex items-center justify-between">
                      Import Preview
                      <div className="flex gap-2">
                        <Badge className="bg-google-green/10 text-google-green border-google-green/20" variant="outline">
                          {validPreviewRecords.length} Valid
                        </Badge>
                        <Badge className="bg-google-red/10 text-google-red border-google-red/20" variant="outline">
                          {invalidPreviewRecords.length} Invalid
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Issues</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {importPreview.map((record) => (
                            <TableRow key={record.id} className="border-google-gray-200">
                              <TableCell className="font-medium">{record.name}</TableCell>
                              <TableCell>{record.email}</TableCell>
                              <TableCell>{record.role}</TableCell>
                              <TableCell>{record.department}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline"
                                  className={
                                    record.status === 'valid' 
                                      ? 'bg-google-green/10 text-google-green border-google-green/20'
                                      : record.status === 'duplicate'
                                      ? 'bg-google-yellow/10 text-google-yellow border-google-yellow/20'
                                      : 'bg-google-red/10 text-google-red border-google-red/20'
                                  }
                                >
                                  {record.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {record.errors.length > 0 && (
                                  <div className="text-sm text-google-red">
                                    {record.errors.join(', ')}
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <p className="text-sm text-google-gray-600">
                        {validPreviewRecords.length} users will be imported
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setShowPreview(false)} className="google-button-secondary">
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleStartImport}
                          disabled={validPreviewRecords.length === 0 || isProcessing}
                          className="google-button-primary"
                        >
                          {isProcessing ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Importing...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Import {validPreviewRecords.length} Users
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Bulk Actions Tab */}
            <TabsContent value="bulk-actions" className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="text-google-gray-900">Bulk User Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Action Type</Label>
                      <Select value={bulkAction} onValueChange={setBulkAction}>
                        <SelectTrigger className="premium-input">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="activate">Activate Users</SelectItem>
                          <SelectItem value="deactivate">Deactivate Users</SelectItem>
                          <SelectItem value="update">Update Information</SelectItem>
                          <SelectItem value="delete">Delete Users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Filter by Department</Label>
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger className="premium-input">
                          <SelectValue placeholder="All departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Filter by Role</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="premium-input">
                        <SelectValue placeholder="All roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="EMPLOYEE">Employee</SelectItem>
                        <SelectItem value="TEAMLEAD">Team Lead</SelectItem>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleBulkAction}
                      disabled={!bulkAction}
                      className="google-button-primary"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Execute Bulk Action
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="text-google-gray-900">Bulk Email Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Template</Label>
                    <Textarea
                      value={emailTemplate}
                      onChange={(e) => setEmailTemplate(e.target.value)}
                      placeholder="Enter your email message here..."
                      className="min-h-[120px] premium-input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Department</Label>
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger className="premium-input">
                          <SelectValue placeholder="All departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Target Role</Label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger className="premium-input">
                          <SelectValue placeholder="All roles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="EMPLOYEE">Employee</SelectItem>
                          <SelectItem value="TEAMLEAD">Team Lead</SelectItem>
                          <SelectItem value="MANAGER">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Alert>
                    <Mail className="h-4 w-4" />
                    <AlertDescription>
                      This email will be sent to approximately 150 users based on your current filters.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleEmailNotification}
                      disabled={!emailTemplate.trim()}
                      className="google-button-primary"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Bulk Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="text-google-gray-900">Operation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {operations.map((operation) => (
                      <div key={operation.id} className="border border-google-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(operation.type)}
                            <div>
                              <h4 className="font-medium text-google-gray-900">{operation.name}</h4>
                              <p className="text-sm text-google-gray-600">{operation.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(operation.status)}
                            <Badge 
                              variant="outline"
                              className={`${getStatusColor(operation.status)} border-current`}
                            >
                              {operation.status}
                            </Badge>
                          </div>
                        </div>
                        
                        {operation.status === 'running' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{operation.processedRecords}/{operation.totalRecords}</span>
                            </div>
                            <Progress value={operation.progress} className="w-full" />
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm text-google-gray-600">
                          <div className="flex items-center gap-4">
                            <span>Started: {operation.createdAt}</span>
                            {operation.completedAt && (
                              <span>Completed: {operation.completedAt}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            {operation.successCount > 0 && (
                              <span className="text-google-green">✓ {operation.successCount} success</span>
                            )}
                            {operation.errorCount > 0 && (
                              <span className="text-google-red">✗ {operation.errorCount} errors</span>
                            )}
                          </div>
                        </div>
                        
                        {operation.errors && operation.errors.length > 0 && (
                          <div className="bg-google-red/5 border border-google-red/20 rounded p-3">
                            <p className="text-sm font-medium text-google-red mb-2">Errors:</p>
                            <ul className="text-sm text-google-red space-y-1">
                              {operation.errors.map((error, index) => (
                                <li key={index}>• {error}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-google-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start google-button-secondary">
                <Download className="w-4 h-4 mr-2" />
                Export Active Users
              </Button>
              <Button variant="outline" className="w-full justify-start google-button-secondary">
                <Download className="w-4 h-4 mr-2" />
                Export Inactive Users
              </Button>
              <Button variant="outline" className="w-full justify-start google-button-secondary">
                <UserPlus className="w-4 h-4 mr-2" />
                Activate Pending Users
              </Button>
              <Button variant="outline" className="w-full justify-start google-button-secondary">
                <Mail className="w-4 h-4 mr-2" />
                Welcome Email Blast
              </Button>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-google-gray-900">Import Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-google-gray-600">
              <p>• CSV file should contain columns: Name, Email, Role, Department, Domain</p>
              <p>• Email addresses must be unique and valid</p>
              <p>• Valid roles: ADMIN, HR, MANAGER, TEAMLEAD, EMPLOYEE</p>
              <p>• Maximum 1000 records per import</p>
              <p>• File size limit: 10MB</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}