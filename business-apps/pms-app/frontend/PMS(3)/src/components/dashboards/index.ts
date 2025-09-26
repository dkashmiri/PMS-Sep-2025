// Export all dashboard components for easy importing

export { PersonalDashboard } from './PersonalDashboard';
export { TeamDashboard } from './TeamDashboard';
export { OrganizationDashboard } from './OrganizationDashboard';

// Dashboard component types for reference
export type DashboardType = 'personal' | 'team' | 'organization';

// Role-based dashboard mapping
export const DASHBOARD_ROLE_MAPPING = {
  EMPLOYEE: 'personal',
  TEAMLEAD: 'team',
  MANAGER: 'team',
  HR: 'organization',
  ADMIN: 'organization',
} as const;

// Helper function to determine which dashboard to show based on user role
export const getDashboardType = (userRole: string): DashboardType => {
  return DASHBOARD_ROLE_MAPPING[userRole as keyof typeof DASHBOARD_ROLE_MAPPING] || 'personal';
};