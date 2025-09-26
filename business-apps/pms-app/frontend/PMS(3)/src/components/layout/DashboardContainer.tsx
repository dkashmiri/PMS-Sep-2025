import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { getDashboardType } from '../dashboards';

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

interface DashboardContainerProps {
  user: User;
  onLogout: () => void;
}

export function DashboardContainer({ user, onLogout }: DashboardContainerProps) {
  // Get default dashboard based on user role
  const getDefaultDashboard = () => {
    switch (user.role) {
      case 'ADMIN':
      case 'HR':
        return 'organization-dashboard';
      case 'MANAGER':
      case 'TEAMLEAD':
        return 'team-dashboard';
      case 'EMPLOYEE':
      default:
        return 'personal-dashboard';
    }
  };

  const [activeMenu, setActiveMenu] = useState(getDefaultDashboard);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Update activeMenu when user role changes (if user object changes)
  useEffect(() => {
    setActiveMenu(getDefaultDashboard());
  }, [user.role]);

  return (
    <div className="min-h-screen surface flex">
      <Sidebar 
        user={user}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header user={user} onLogout={onLogout} />
        <MainContent user={user} activeMenu={activeMenu} />
      </div>
    </div>
  );
}