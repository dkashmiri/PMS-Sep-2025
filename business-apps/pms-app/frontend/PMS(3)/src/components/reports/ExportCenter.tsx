import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Download,
  FileSpreadsheet,
  FileText,
  FileImage,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Target,
  Award,
  BarChart3,
  Settings,
  Mail,
  Share2,
  History
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

interface ExportCenterProps {
  user: User;
}

// Mock export templates
const exportTemplates = [
  {
    id: 'performance-summary',
    name: 'Performance Summary Report',
    description: 'Comprehensive performance overview with KPIs',
    type: 'Excel',
    size: '2.3 MB',
    lastUsed: '2024-06-15',
    popularity: 95
  },
  {
    id: 'goal-analysis',
    name: 'Goal Achievement Analysis',
    description: 'Detailed goal tracking and completion rates',
    type: 'PDF',
    size: '1.8 MB',
    lastUsed: '2024-06-14',
    popularity: 87
  },
  {
    id: 'review-dashboard',
    name: 'Review Dashboard Export',
    description: 'Complete review cycle analytics',
    type: 'PowerPoint',
    size: '3.1 MB',
    lastUsed: '2024-06-13',
    popularity: 76
  },
  {
    id: 'team-metrics',
    name: 'Team Performance Metrics',
    description: 'Team-wise performance breakdown',
    type: 'Excel',
    size: '1.5 MB',
    lastUsed: '2024-06-12',
    popularity: 82
  }
];

const scheduledExports = [
  {
    id: 'weekly-summary',
    name: 'Weekly Performance Summary',
    schedule: 'Every Monday 9:00 AM',
    recipients: ['hr@company.com', 'manager@company.com'],
    format: 'PDF',
    status: 'active',
    nextRun: '2024-06-17 09:00'
  },
  {
    id: 'monthly-goals',
    name: 'Monthly Goal Report',
    schedule: 'First of every month',
    recipients: ['admin@company.com'],
    format: 'Excel',
    status: 'active',
    nextRun: '2024-07-01 10:00'
  },
  {
    id: 'quarterly-review',
    name: 'Quarterly Review Analysis',
    schedule: 'End of every quarter',
    recipients: ['hr@company.com', 'ceo@company.com'],
    format: 'PowerPoint',
    status: 'paused',
    nextRun: '2024-09-30 17:00'
  }
];

const exportHistory = [
  {
    id: 'export-001',
    name: 'Q2 Performance Report',
    exportedBy: 'Michael Chen',
    date: '2024-06-15 14:30',
    format: 'PDF',
    size: '2.1 MB',
    downloads: 12,
    status: 'completed'
  },
  {
    id: 'export-002',
    name: 'Team Analytics Dashboard',
    exportedBy: 'Sarah Johnson',
    date: '2024-06-14 11:15',
    format: 'Excel',
    size: '3.4 MB',
    downloads: 8,
    status: 'completed'
  },
  {
    id: 'export-003',
    name: 'Goal Achievement Summary',
    exportedBy: 'Emily Davis',
    date: '2024-06-13 16:45',
    format: 'PowerPoint',
    size: '4.2 MB',
    downloads: 5,
    status: 'completed'
  }
];

export function ExportCenter({ user }: ExportCenterProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('last-month');
  const [includeSections, setIncludeSections] = useState({
    summary: true,
    charts: true,
    details: true,
    recommendations: false
  });

  const handleExport = async () => {
    // Simulate export process
    console.log('Exporting with:', {
      template: selectedTemplate,
      format: exportFormat,
      dateRange,
      sections: includeSections
    });
  };

  const renderRoleBasedContent = () => {
    const canManageExports = ['ADMIN', 'HR'].includes(user.role);
    const canViewAllExports = ['ADMIN', 'HR', 'MANAGER'].includes(user.role);

    return (
      <>
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Exports</p>
                  <p className="text-3xl font-bold text-foreground">247</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Download className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary">This month</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-muted rounded-lg">
                  <FileSpreadsheet className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled Reports</p>
                  <p className="text-3xl font-bold text-foreground">8</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">Active</span>
                  </div>
                </div>
                <div className="p-3 bg-success-muted rounded-lg">
                  <Calendar className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Data Volume</p>
                  <p className="text-3xl font-bold text-foreground">45.2</p>
                  <div className="flex items-center gap-1 mt-1">
                    <BarChart3 className="h-4 w-4 text-warning" />
                    <span className="text-sm text-warning">GB exported</span>
                  </div>
                </div>
                <div className="p-3 bg-warning-muted rounded-lg">
                  <FileImage className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Export Time</p>
                  <p className="text-3xl font-bold text-foreground">3.2</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary">minutes</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-muted rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="create">Create Export</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Create Export Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Create New Export
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Export Configuration */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>Export Template</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {exportTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Export Format</Label>
                      <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pdf" id="pdf" />
                          <Label htmlFor="pdf">PDF Document</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="excel" id="excel" />
                          <Label htmlFor="excel">Excel Spreadsheet</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="powerpoint" id="powerpoint" />
                          <Label htmlFor="powerpoint">PowerPoint Presentation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="csv" id="csv" />
                          <Label htmlFor="csv">CSV Data</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Date Range</Label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last-week">Last Week</SelectItem>
                          <SelectItem value="last-month">Last Month</SelectItem>
                          <SelectItem value="last-quarter">Last Quarter</SelectItem>
                          <SelectItem value="last-year">Last Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Include Sections */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>Include Sections</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="summary"
                            checked={includeSections.summary}
                            onCheckedChange={(checked) =>
                              setIncludeSections(prev => ({ ...prev, summary: checked }))
                            }
                          />
                          <Label htmlFor="summary">Executive Summary</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="charts"
                            checked={includeSections.charts}
                            onCheckedChange={(checked) =>
                              setIncludeSections(prev => ({ ...prev, charts: checked }))
                            }
                          />
                          <Label htmlFor="charts">Charts and Graphs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="details"
                            checked={includeSections.details}
                            onCheckedChange={(checked) =>
                              setIncludeSections(prev => ({ ...prev, details: checked }))
                            }
                          />
                          <Label htmlFor="details">Detailed Data</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="recommendations"
                            checked={includeSections.recommendations}
                            onCheckedChange={(checked) =>
                              setIncludeSections(prev => ({ ...prev, recommendations: checked }))
                            }
                          />
                          <Label htmlFor="recommendations">Recommendations</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email">Email Recipients (Optional)</Label>
                      <Input
                        id="email"
                        placeholder="Enter email addresses separated by commas"
                        type="email"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Input
                        id="notes"
                        placeholder="Add any special instructions or notes"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Export Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exportTemplates.map((template) => (
                    <Card key={template.id} className="border-2 border-dashed border-border hover:border-primary transition-colors">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">{template.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                            </div>
                            <Badge variant="secondary">{template.type}</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Size: {template.size}</span>
                            <span>Last used: {template.lastUsed}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-border rounded-full h-2 w-20">
                                <div 
                                  className="h-2 bg-primary rounded-full" 
                                  style={{ width: `${template.popularity}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">{template.popularity}% popularity</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Exports Tab */}
          <TabsContent value="scheduled" className="space-y-6">
            {canManageExports && (
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Scheduled Exports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheduledExports.map((export_) => (
                      <div key={export_.id} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            export_.status === 'active' ? 'bg-success' : 'bg-warning'
                          }`} />
                          <div>
                            <h4 className="font-medium text-foreground">{export_.name}</h4>
                            <p className="text-sm text-muted-foreground">{export_.schedule}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge variant={export_.status === 'active' ? 'default' : 'secondary'}>
                              {export_.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              Next: {export_.nextRun}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{export_.format}</span>
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Export History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-muted-foreground">Export Name</th>
                        <th className="text-left p-3 text-muted-foreground">Exported By</th>
                        <th className="text-left p-3 text-muted-foreground">Date</th>
                        <th className="text-left p-3 text-muted-foreground">Format</th>
                        <th className="text-left p-3 text-muted-foreground">Size</th>
                        <th className="text-left p-3 text-muted-foreground">Downloads</th>
                        <th className="text-left p-3 text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exportHistory.map((export_) => (
                        <tr key={export_.id} className="border-b border-border hover:bg-surface">
                          <td className="p-3 font-medium">{export_.name}</td>
                          <td className="p-3">{export_.exportedBy}</td>
                          <td className="p-3 text-muted-foreground">{export_.date}</td>
                          <td className="p-3">
                            <Badge variant="secondary">{export_.format}</Badge>
                          </td>
                          <td className="p-3 text-muted-foreground">{export_.size}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4 text-primary" />
                              <span>{export_.downloads}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Export Center</h1>
          <p className="text-muted-foreground">Generate, schedule, and manage data exports</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Quick Export
          </Button>
        </div>
      </div>

      {renderRoleBasedContent()}
    </div>
  );
}