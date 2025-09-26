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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Settings,
  Clock,
  Users,
  Target,
  FileText,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Send,
  Eye
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

interface NotificationSettingsProps {
  user: User;
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'desktop' | 'mobile';
  trigger: string;
  subject: string;
  isActive: boolean;
  frequency: string;
}

interface NotificationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  recipients: string[];
  isActive: boolean;
}

export function NotificationSettings({ user }: NotificationSettingsProps) {
  const [globalSettings, setGlobalSettings] = useState({
    enableEmailNotifications: true,
    enableDesktopNotifications: true,
    enableMobileNotifications: false,
    defaultReminderTime: '09:00',
    digestFrequency: 'daily',
    escalationEnabled: true,
    quietHoursStart: '18:00',
    quietHoursEnd: '08:00',
    maxNotificationsPerHour: '10'
  });

  const [emailSettings, setEmailSettings] = useState({
    goalReminders: true,
    reviewReminders: true,
    deadlineAlerts: true,
    teamUpdates: false,
    systemAnnouncements: true,
    performanceUpdates: true,
    approvalRequests: true,
    weeklyDigest: true,
    monthlyReport: true
  });

  const [templates, setTemplates] = useState<NotificationTemplate[]>([
    {
      id: '1',
      name: 'Goal Deadline Reminder',
      type: 'email',
      trigger: 'goal_deadline_approaching',
      subject: 'Goal Deadline Approaching: {goal_name}',
      isActive: true,
      frequency: 'daily'
    },
    {
      id: '2',
      name: 'Review Due Notification',
      type: 'email',
      trigger: 'review_due',
      subject: 'Performance Review Due: {review_name}',
      isActive: true,
      frequency: 'immediate'
    },
    {
      id: '3',
      name: 'Goal Achievement',
      type: 'desktop',
      trigger: 'goal_completed',
      subject: 'Congratulations! Goal Completed',
      isActive: true,
      frequency: 'immediate'
    },
    {
      id: '4',
      name: 'Weekly Goal Summary',
      type: 'email',
      trigger: 'weekly_summary',
      subject: 'Weekly Goal Progress Summary',
      isActive: true,
      frequency: 'weekly'
    }
  ]);

  const [rules, setRules] = useState<NotificationRule[]>([
    {
      id: '1',
      name: 'Overdue Goal Escalation',
      condition: 'goal_overdue > 7_days',
      action: 'notify_manager',
      recipients: ['manager', 'hr'],
      isActive: true
    },
    {
      id: '2',
      name: 'Review Completion Reminder',
      condition: 'review_pending > 3_days',
      action: 'send_reminder',
      recipients: ['assignee'],
      isActive: true
    },
    {
      id: '3',
      name: 'High Priority Goal Alert',
      condition: 'goal_priority = high AND progress < 25%',
      action: 'immediate_alert',
      recipients: ['assignee', 'manager'],
      isActive: true
    }
  ]);

  const handleGlobalSettingsSave = () => {
    // API call to save global notification settings
    toast.success("Global notification settings saved!");
  };

  const handleEmailSettingsSave = () => {
    // API call to save email settings
    toast.success("Email notification settings saved!");
  };

  const handleTemplateToggle = (id: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === id ? { ...template, isActive: !template.isActive } : template
    ));
  };

  const handleRuleToggle = (id: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const handleTestNotification = () => {
    toast.success("Test notification sent successfully!");
  };

  if (user.role !== 'ADMIN' && user.role !== 'HR') {
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
            <p className="text-muted-premium">You don't have permission to access notification settings.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="spacing-lg space-y-6">
      <div>
        <h1>Notification Settings</h1>
        <p className="text-muted-premium">Configure system-wide notification preferences and templates</p>
      </div>

      <Tabs defaultValue="global" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Global
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Rules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Global Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4>Notification Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p>Email Notifications</p>
                        <p className="text-muted-premium">Send notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={globalSettings.enableEmailNotifications}
                      onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, enableEmailNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-success" />
                      <div>
                        <p>Desktop Notifications</p>
                        <p className="text-muted-premium">Show desktop notifications in browser</p>
                      </div>
                    </div>
                    <Switch
                      checked={globalSettings.enableDesktopNotifications}
                      onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, enableDesktopNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-warning" />
                      <div>
                        <p>Mobile Push Notifications</p>
                        <p className="text-muted-premium">Send push notifications to mobile devices</p>
                      </div>
                    </div>
                    <Switch
                      checked={globalSettings.enableMobileNotifications}
                      onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, enableMobileNotifications: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultReminderTime">Default Reminder Time</Label>
                  <Input
                    id="defaultReminderTime"
                    type="time"
                    value={globalSettings.defaultReminderTime}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, defaultReminderTime: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="digestFrequency">Digest Frequency</Label>
                  <Select value={globalSettings.digestFrequency} onValueChange={(value) => setGlobalSettings(prev => ({ ...prev, digestFrequency: value }))}>
                    <SelectTrigger className="premium-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quietHoursStart">Quiet Hours Start</Label>
                  <Input
                    id="quietHoursStart"
                    type="time"
                    value={globalSettings.quietHoursStart}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, quietHoursStart: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quietHoursEnd">Quiet Hours End</Label>
                  <Input
                    id="quietHoursEnd"
                    type="time"
                    value={globalSettings.quietHoursEnd}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, quietHoursEnd: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxNotificationsPerHour">Max Notifications per Hour</Label>
                  <Input
                    id="maxNotificationsPerHour"
                    type="number"
                    value={globalSettings.maxNotificationsPerHour}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, maxNotificationsPerHour: e.target.value }))}
                    className="premium-input"
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p>Enable Escalation</p>
                  <p className="text-muted-premium">Automatically escalate overdue items to managers</p>
                </div>
                <Switch
                  checked={globalSettings.escalationEnabled}
                  onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, escalationEnabled: checked }))}
                />
              </div>

              <div className="flex justify-between">
                <Button onClick={handleTestNotification} variant="outline" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Test Notification
                </Button>
                <Button onClick={handleGlobalSettingsSave} className="google-button-primary">
                  Save Global Settings
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
                Email Notification Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4>Goal Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span>Goal Reminders</span>
                      </div>
                      <Switch
                        checked={emailSettings.goalReminders}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, goalReminders: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-warning" />
                        <span>Deadline Alerts</span>
                      </div>
                      <Switch
                        checked={emailSettings.deadlineAlerts}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, deadlineAlerts: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4>Review Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-success" />
                        <span>Review Reminders</span>
                      </div>
                      <Switch
                        checked={emailSettings.reviewReminders}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, reviewReminders: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-primary" />
                        <span>Approval Requests</span>
                      </div>
                      <Switch
                        checked={emailSettings.approvalRequests}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, approvalRequests: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4>Team & System</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-success" />
                        <span>Team Updates</span>
                      </div>
                      <Switch
                        checked={emailSettings.teamUpdates}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, teamUpdates: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-warning" />
                        <span>System Announcements</span>
                      </div>
                      <Switch
                        checked={emailSettings.systemAnnouncements}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, systemAnnouncements: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4>Reports & Digests</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Weekly Digest</span>
                      </div>
                      <Switch
                        checked={emailSettings.weeklyDigest}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, weeklyDigest: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-success" />
                        <span>Monthly Report</span>
                      </div>
                      <Switch
                        checked={emailSettings.monthlyReport}
                        onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, monthlyReport: checked }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleEmailSettingsSave} className="google-button-primary">
                  Save Email Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notification Templates
                </CardTitle>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          {template.type === 'email' && <Mail className="h-3 w-3" />}
                          {template.type === 'desktop' && <MessageSquare className="h-3 w-3" />}
                          {template.type === 'mobile' && <Smartphone className="h-3 w-3" />}
                          {template.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-premium">{template.trigger}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{template.frequency}</Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={template.isActive}
                          onCheckedChange={() => handleTemplateToggle(template.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Rules
                </CardTitle>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell className="text-muted-premium font-mono text-sm">{rule.condition}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{rule.action}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {rule.recipients.map((recipient, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {recipient}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={rule.isActive}
                          onCheckedChange={() => handleRuleToggle(rule.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}