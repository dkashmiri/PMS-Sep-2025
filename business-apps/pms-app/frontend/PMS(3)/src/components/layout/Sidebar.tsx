import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BarChart3,
  Users,
  Target,
  FileText,
  TrendingUp,
  Settings,
  Shield,
  Building2,
  Briefcase,
  FolderOpen,
  UserCheck,
  Calendar,
  Award,
  Database,
  ChevronLeft,
  ChevronRight,
  Home,
  UserPlus,
  GitBranch,
  Layers,
  Clock,
  PieChart,
  FileSpreadsheet,
  Bell,
  HelpCircle,
  Network
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

interface SidebarProps {
  user: User;
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE']
  },
  
  // Admin/HR Section
  {
    id: 'masters',
    label: 'Masters',
    icon: Database,
    roles: ['ADMIN', 'HR'],
    submenu: [
      { id: 'department-master', label: 'Department Master', icon: Building2, roles: ['ADMIN', 'HR'] },
      { id: 'domain-master', label: 'Domain Master', icon: Layers, roles: ['ADMIN', 'HR'] },
      { id: 'project-master', label: 'Project Master', icon: FolderOpen, roles: ['ADMIN', 'HR'] },
      { id: 'kra-master', label: 'KRA Master', icon: Target, roles: ['ADMIN', 'HR'] }
    ]
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: Users,
    roles: ['ADMIN', 'HR'],
    submenu: [
      { id: 'user-operations', label: 'User Operations', icon: UserPlus, roles: ['ADMIN', 'HR'] },
      { id: 'reviewer-mapping', label: 'Reviewer Mapping', icon: GitBranch, roles: ['ADMIN', 'HR'] },
      { id: 'bulk-operations', label: 'Bulk Operations', icon: FileSpreadsheet, roles: ['ADMIN', 'HR'] }
    ]
  },
  {
    id: 'kra-management',
    label: 'KRA Management',
    icon: Target,
    roles: ['ADMIN', 'HR', 'MANAGER'],
    submenu: [
      { id: 'kra-operations', label: 'KRA Operations', icon: Target, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'kra-mapping', label: 'KRA Mapping', icon: Network, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'kra-templates', label: 'KRA Templates', icon: FileText, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'kra-bulk-operations', label: 'Bulk Operations', icon: Database, roles: ['ADMIN', 'HR', 'MANAGER'] }
    ]
  },
  
  // Goal Management (All Roles)
  {
    id: 'goals-management',
    label: 'Goals Management',
    icon: Target,
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    submenu: [
      { id: 'goal-management', label: 'Goal Management', icon: Target, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'goal-operations', label: 'Goal Operations', icon: Settings, roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'] },
      { id: 'goal-analytics', label: 'Goal Analytics', icon: BarChart3, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'goal-evidence', label: 'Evidence Management', icon: FileText, roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'] },
      { id: 'my-goals', label: 'My Goals', icon: Award, roles: ['EMPLOYEE', 'TEAMLEAD', 'MANAGER'] },
      { id: 'team-goals', label: 'Team Goals', icon: Users, roles: ['MANAGER', 'TEAMLEAD'] },
      { id: 'goal-categories', label: 'Goal Categories', icon: Layers, roles: ['ADMIN', 'HR'] },
      { id: 'goal-templates', label: 'Goal Templates', icon: Database, roles: ['ADMIN', 'HR', 'MANAGER'] }
    ]
  },
  
  // Review Management
  {
    id: 'review-management',
    label: 'Review Management',
    icon: FileText,
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    submenu: [
      { id: 'review-management-main', label: 'Review Management', icon: FileText, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'review-operations', label: 'Review Operations', icon: Settings, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'review-analytics', label: 'Review Analytics', icon: BarChart3, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'performance-assessment', label: 'Performance Assessment', icon: Award, roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD'] },
      { id: 'my-reviews', label: 'My Reviews', icon: FileText, roles: ['EMPLOYEE', 'TEAMLEAD', 'MANAGER'] },
      { id: 'team-reviews', label: 'Team Reviews', icon: Users, roles: ['MANAGER', 'TEAMLEAD'] },
      { id: 'review-cycles', label: 'Review Cycles', icon: Calendar, roles: ['ADMIN', 'HR'] },
      { id: 'review-templates', label: 'Review Templates', icon: Database, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'review-workflows', label: 'Review Workflows', icon: GitBranch, roles: ['ADMIN', 'HR'] },
      { id: 'cross-cycle-analysis', label: 'Cross-Cycle Analysis', icon: TrendingUp, roles: ['ADMIN', 'HR', 'MANAGER'] }
    ]
  },
  
  // Team Management (Manager/TeamLead)
  {
    id: 'team-management',
    label: 'Team Management',
    icon: Users,
    roles: ['MANAGER', 'TEAMLEAD'],
    submenu: [
      { id: 'team-performance', label: 'Team Performance', icon: TrendingUp, roles: ['MANAGER', 'TEAMLEAD'] },
      { id: 'team-development', label: 'Team Development', icon: Award, roles: ['MANAGER', 'TEAMLEAD'] },
      { id: 'resource-planning', label: 'Resource Planning', icon: Calendar, roles: ['MANAGER'] }
    ]
  },
  
  // Projects (Manager/TeamLead)
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderOpen,
    roles: ['MANAGER', 'TEAMLEAD'],
    submenu: [
      { id: 'project-management', label: 'Project Management', icon: Briefcase, roles: ['MANAGER', 'TEAMLEAD'] },
      { id: 'project-performance', label: 'Project Performance', icon: TrendingUp, roles: ['MANAGER', 'TEAMLEAD'] }
    ]
  },
  
  // Reports & Analytics
  {
    id: 'reports-analytics',
    label: 'Reports & Analytics',
    icon: PieChart,
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    submenu: [
      { id: 'analytics-dashboard', label: 'Analytics Dashboard', icon: TrendingUp, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'performance-reports', label: 'Performance Reports', icon: BarChart3, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'goal-reports', label: 'Goal Reports', icon: Target, roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'] },
      { id: 'review-reports', label: 'Review Reports', icon: Award, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'team-analytics', label: 'Team Analytics', icon: Users, roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD'] },
      { id: 'trend-analysis', label: 'Trend Analysis', icon: TrendingUp, roles: ['ADMIN', 'HR', 'MANAGER'] },
      { id: 'export-center', label: 'Export Center', icon: FileSpreadsheet, roles: ['ADMIN', 'HR', 'MANAGER'] }
    ]
  },
  
  // Feedback (All Roles)
  {
    id: 'feedback',
    label: 'Feedback',
    icon: UserCheck,
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE']
  },
  
  // Personal Settings (All Users)
  {
    id: 'personal-settings',
    label: 'Personal Settings',
    icon: UserCheck,
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE']
  },
  
  // System Settings (Admin/HR Only)
  {
    id: 'system-settings',
    label: 'System Settings',
    icon: Settings,
    roles: ['ADMIN', 'HR'],
    submenu: [
      { id: 'system-config', label: 'System Configuration', icon: Settings, roles: ['ADMIN'] },
      { id: 'goal-config', label: 'Goal Configuration', icon: Target, roles: ['ADMIN', 'HR'] },
      { id: 'notification-config', label: 'Notification Settings', icon: Bell, roles: ['ADMIN', 'HR'] }
    ]
  }
];

export function Sidebar({ user, activeMenu, onMenuChange, collapsed, onToggleCollapse }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['kra-management', 'goals-management']));

  const toggleMenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const getFilteredMenuItems = () => {
    return menuItems.filter(item => item.roles.includes(user.role));
  };

  const renderMenuItem = (item: MenuItem, isSubmenu = false) => {
    const hasAccess = item.roles.includes(user.role);
    if (!hasAccess) return null;

    const isActive = activeMenu === item.id;
    const isExpanded = expandedMenus.has(item.id);
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <div key={item.id}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={`w-full justify-start ${
            isSubmenu ? 'pl-8 py-2 h-auto' : 'mb-1'
          } ${collapsed && !isSubmenu ? 'px-2' : ''}`}
          onClick={() => {
            if (hasSubmenu && !collapsed) {
              toggleMenu(item.id);
            } else {
              onMenuChange(item.id);
            }
          }}
        >
          <item.icon className={`h-4 w-4 ${collapsed && !isSubmenu ? '' : 'mr-2'}`} />
          {(!collapsed || isSubmenu) && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {hasSubmenu && !collapsed && (
                <ChevronRight 
                  className={`h-4 w-4 transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`} 
                />
              )}
            </>
          )}
        </Button>

        {hasSubmenu && isExpanded && !collapsed && (
          <div className="ml-2 border-l border-gray-200 pl-2 space-y-1">
            {item.submenu!.map(subItem => renderMenuItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">PMS Enhanced</h1>
                <p className="text-xs text-gray-500">Performance Management</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-1 h-auto"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user.name}</p>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                    user.role === 'HR' ? 'bg-blue-100 text-blue-800' :
                    user.role === 'MANAGER' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'TEAMLEAD' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {getFilteredMenuItems().map(item => renderMenuItem(item))}
        </nav>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-3 h-3" />
            <span>v2.1.0 • Secure</span>
          </div>
        </div>
      )}
    </div>
  );
}