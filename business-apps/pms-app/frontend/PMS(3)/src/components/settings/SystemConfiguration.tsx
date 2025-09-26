import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import {
  Settings,
  Globe,
  Shield,
  Database,
  Mail,
  Cpu,
  HardDrive,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Building2
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

interface SystemConfigurationProps {
  user: User;
}

export function SystemConfiguration({ user }: SystemConfigurationProps) {
  const [generalConfig, setGeneralConfig] = useState({
    systemName: 'PMS Enhanced',
    systemDescription: 'Performance Management System',
    defaultLanguage: 'en',
    defaultTimezone: 'UTC+00:00',
    maxFileSize: '10',
    sessionTimeout: '60',
    maintenanceMode: false,
    allowRegistration: false
  });

  const [emailConfig, setEmailConfig] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@company.com',
    fromName: 'PMS Enhanced',
    enableSsl: true
  });

  const [securityConfig, setSecurityConfig] = useState({
    passwordMinLength: '8',
    passwordRequireSpecial: true,
    passwordRequireNumber: true,
    passwordRequireUpper: true,
    maxLoginAttempts: '5',
    lockoutDuration: '30',
    twoFactorRequired: false,
    auditLogging: true
  });

  const [systemStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalGoals: 3456,
    activeReviews: 234,
    systemUptime: '99.9%',
    lastBackup: '2024-01-15 03:00:00',
    storageUsed: '2.3 GB',
    storageTotal: '50 GB'
  });

  const handleGeneralConfigSave = () => {
    // API call to save general configuration
    toast.success("General configuration saved successfully!");
  };

  const handleEmailConfigSave = () => {
    // API call to save email configuration
    toast.success("Email configuration saved successfully!");
  };

  const handleSecurityConfigSave = () => {
    // API call to save security configuration
    toast.success("Security configuration saved successfully!");
  };

  const handleTestEmail = () => {
    // API call to test email configuration
    toast.success("Test email sent successfully!");
  };

  const handleSystemBackup = () => {
    // API call to initiate system backup
    toast.success("System backup initiated!");
  };

  if (user.role !== 'ADMIN') {
    return (
      <div className="spacing-lg">
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-premium">You don't have permission to access system configuration.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="spacing-lg space-y-6">
      <div>
        <h1>System Configuration</h1>
        <p className="text-muted-premium">Configure system-wide settings and preferences</p>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="premium-card">
          <CardContent className="spacing-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-premium">Total Users</p>
                <p className="text-2xl font-semibold">{systemStats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="spacing-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-premium">Active Goals</p>
                <p className="text-2xl font-semibold">{systemStats.totalGoals.toLocaleString()}</p>
              </div>
              <Database className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="spacing-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-premium">System Uptime</p>
                <p className="text-2xl font-semibold">{systemStats.systemUptime}</p>
              </div>
              <Cpu className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="spacing-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-premium">Storage Used</p>
                <p className="text-2xl font-semibold">{systemStats.storageUsed}</p>
                <p className="text-xs text-muted-premium">of {systemStats.storageTotal}</p>
              </div>
              <HardDrive className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Maintenance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={generalConfig.systemName}
                    onChange={(e) => setGeneralConfig(prev => ({ ...prev, systemName: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemDescription">System Description</Label>
                  <Input
                    id="systemDescription"
                    value={generalConfig.systemDescription}
                    onChange={(e) => setGeneralConfig(prev => ({ ...prev, systemDescription: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select value={generalConfig.defaultLanguage} onValueChange={(value) => setGeneralConfig(prev => ({ ...prev, defaultLanguage: value }))}>
                    <SelectTrigger className="premium-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultTimezone">Default Timezone</Label>
                  <Select value={generalConfig.defaultTimezone} onValueChange={(value) => setGeneralConfig(prev => ({ ...prev, defaultTimezone: value }))}>
                    <SelectTrigger className="premium-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC+00:00">UTC (GMT+0)</SelectItem>
                      <SelectItem value="UTC-05:00">Eastern Time (GMT-5)</SelectItem>
                      <SelectItem value="UTC-06:00">Central Time (GMT-6)</SelectItem>
                      <SelectItem value="UTC-07:00">Mountain Time (GMT-7)</SelectItem>
                      <SelectItem value="UTC-08:00">Pacific Time (GMT-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={generalConfig.maxFileSize}
                    onChange={(e) => setGeneralConfig(prev => ({ ...prev, maxFileSize: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={generalConfig.sessionTimeout}
                    onChange={(e) => setGeneralConfig(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    className="premium-input"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p>Maintenance Mode</p>
                    <p className="text-muted-premium">Enable maintenance mode to block user access</p>
                  </div>
                  <Switch
                    checked={generalConfig.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralConfig(prev => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p>Allow User Registration</p>
                    <p className="text-muted-premium">Allow new users to register themselves</p>
                  </div>
                  <Switch
                    checked={generalConfig.allowRegistration}
                    onCheckedChange={(checked) => setGeneralConfig(prev => ({ ...prev, allowRegistration: checked }))}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleGeneralConfigSave} className="google-button-primary">
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={emailConfig.smtpHost}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpHost: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={emailConfig.smtpPort}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpPort: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={emailConfig.smtpUsername}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpUsername: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailConfig.smtpPassword}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpPassword: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailConfig.fromEmail}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, fromEmail: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={emailConfig.fromName}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, fromName: e.target.value }))}
                    className="premium-input"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>Enable SSL/TLS</p>
                  <p className="text-muted-premium">Use secure connection for email</p>
                </div>
                <Switch
                  checked={emailConfig.enableSsl}
                  onCheckedChange={(checked) => setEmailConfig(prev => ({ ...prev, enableSsl: checked }))}
                />
              </div>

              <div className="flex justify-between">
                <Button onClick={handleTestEmail} variant="outline">
                  Test Email
                </Button>
                <Button onClick={handleEmailConfigSave} className="google-button-primary">
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={securityConfig.passwordMinLength}
                    onChange={(e) => setSecurityConfig(prev => ({ ...prev, passwordMinLength: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securityConfig.maxLoginAttempts}
                    onChange={(e) => setSecurityConfig(prev => ({ ...prev, maxLoginAttempts: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    value={securityConfig.lockoutDuration}
                    onChange={(e) => setSecurityConfig(prev => ({ ...prev, lockoutDuration: e.target.value }))}
                    className="premium-input"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4>Password Requirements</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Require Special Characters</p>
                      <p className="text-muted-premium">Password must contain special characters</p>
                    </div>
                    <Switch
                      checked={securityConfig.passwordRequireSpecial}
                      onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, passwordRequireSpecial: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Require Numbers</p>
                      <p className="text-muted-premium">Password must contain numbers</p>
                    </div>
                    <Switch
                      checked={securityConfig.passwordRequireNumber}
                      onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, passwordRequireNumber: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Require Uppercase Letters</p>
                      <p className="text-muted-premium">Password must contain uppercase letters</p>
                    </div>
                    <Switch
                      checked={securityConfig.passwordRequireUpper}
                      onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, passwordRequireUpper: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4>Additional Security</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Two-Factor Authentication Required</p>
                      <p className="text-muted-premium">Require 2FA for all users</p>
                    </div>
                    <Switch
                      checked={securityConfig.twoFactorRequired}
                      onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, twoFactorRequired: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Audit Logging</p>
                      <p className="text-muted-premium">Log all user activities for audit</p>
                    </div>
                    <Switch
                      checked={securityConfig.auditLogging}
                      onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, auditLogging: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSecurityConfigSave} className="google-button-primary">
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="matte-surface spacing-md">
                  <h4 className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Last Backup
                  </h4>
                  <p className="text-muted-premium">{systemStats.lastBackup}</p>
                  <Button onClick={handleSystemBackup} className="mt-4 w-full" variant="outline">
                    Create Backup Now
                  </Button>
                </div>
                <div className="matte-surface spacing-md">
                  <h4 className="flex items-center gap-2 mb-2">
                    <HardDrive className="h-4 w-4 text-primary" />
                    Storage Usage
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-premium">Used:</span>
                      <span>{systemStats.storageUsed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-premium">Available:</span>
                      <span>{systemStats.storageTotal}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '4.6%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4>System Health Check</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="matte-surface spacing-sm">
                    <div className="flex items-center justify-between">
                      <span>Database Connection</span>
                      <Badge className="bg-success-muted text-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Healthy
                      </Badge>
                    </div>
                  </div>
                  <div className="matte-surface spacing-sm">
                    <div className="flex items-center justify-between">
                      <span>Email Service</span>
                      <Badge className="bg-success-muted text-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                  <div className="matte-surface spacing-sm">
                    <div className="flex items-center justify-between">
                      <span>File Storage</span>
                      <Badge className="bg-success-muted text-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4>Maintenance Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Optimize Database
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <HardDrive className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Cleanup Old Logs
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Cpu className="h-4 w-4 mr-2" />
                    System Diagnostics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}