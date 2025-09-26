import React from 'react';
import { PersonalDashboard } from './PersonalDashboard';
import { ManagementDashboard } from './ManagementDashboard';
import { AdminDashboard } from './AdminDashboard';

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

interface DashboardPageProps {
  user: User;
}

export function DashboardPage({ user }: DashboardPageProps) {
  // Render appropriate dashboard based on user role
  if (user.role === 'ADMIN' || user.role === 'HR') {
    return <AdminDashboard user={user} />;
  }
  
  if (user.role === 'MANAGER' || user.role === 'TEAMLEAD') {
    return <ManagementDashboard user={user} />;
  }
  
  // Default to personal dashboard for employees
  return <PersonalDashboard user={user} />;
}