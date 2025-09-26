import React, { useState } from 'react';
import { PersonalSettings } from './PersonalSettings';
import { SystemConfiguration } from './SystemConfiguration';
import { GoalConfiguration } from './GoalConfiguration';
import { NotificationSettings } from './NotificationSettings';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  Settings,
  User,
  Target,
  Bell,
  Shield,
  AlertTriangle
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

interface SystemSettingsProps {
  user: User;
  settingsType?: string;
}

export function SystemSettings({ user, settingsType = 'personal' }: SystemSettingsProps) {
  const [activeTab, setActiveTab] = useState(settingsType);

  const isAdmin = user.role === 'ADMIN';
  const isHR = user.role === 'HR';
  const hasSystemAccess = isAdmin || isHR;

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalSettings user={user} />;
      case 'system':
        return <SystemConfiguration user={user} />;
      case 'goals':
        return <GoalConfiguration user={user} />;
      case 'notifications':
        return <NotificationSettings user={user} />;
      default:
        return <PersonalSettings user={user} />;
    }
  };

  return (
    <div className="spacing-lg space-y-6">
      <div>
        <h1>Settings</h1>
        <p className="text-muted-premium">Manage your personal and system settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className={`grid w-full ${hasSystemAccess ? 'grid-cols-4' : 'grid-cols-1'}`}>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal Settings
          </TabsTrigger>
          {hasSystemAccess && (
            <>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                System Config
                {isAdmin && <Badge variant="destructive" className="ml-1 text-xs">Admin</Badge>}
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Goal Config
                {(isAdmin || isHR) && <Badge variant="secondary" className="ml-1 text-xs">Admin/HR</Badge>}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
                {(isAdmin || isHR) && <Badge variant="secondary" className="ml-1 text-xs">Admin/HR</Badge>}
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="personal">
          <PersonalSettings user={user} />
        </TabsContent>

        {hasSystemAccess && (
          <>
            <TabsContent value="system">
              <SystemConfiguration user={user} />
            </TabsContent>
            <TabsContent value="goals">
              <GoalConfiguration user={user} />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings user={user} />
            </TabsContent>
          </>
        )}

        {!hasSystemAccess && activeTab !== 'personal' && (
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-premium">You don't have permission to access system configuration settings.</p>
            </CardContent>
          </Card>
        )}
      </Tabs>

      {!hasSystemAccess && (
        <div className="matte-surface spacing-md">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Limited Access</p>
              <p className="text-muted-premium">You can only access personal settings. Contact your administrator for system-level configurations.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}