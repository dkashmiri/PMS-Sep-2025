import React from 'react';
import { DashboardPage } from '../dashboard/DashboardPage';
import { ReviewContainer } from '../containers/ReviewContainer';
import { PersonalDashboard, TeamDashboard, OrganizationDashboard } from '../dashboards';
import { DepartmentMaster } from '../masters/DepartmentMaster';
import { DomainMaster } from '../masters/DomainMaster';
import { ProjectMaster } from '../masters/ProjectMaster';
import { KRAMaster } from '../masters/KRAMaster';
import { UserOperations } from '../user-management/UserOperations';
import { ReviewerMapping } from '../user-management/ReviewerMapping';
import { BulkOperations } from '../user-management/BulkOperations';
import { MyGoals } from '../goals/MyGoals';
import { TeamGoals } from '../goals/TeamGoals';
import { GoalCategories } from '../goals/GoalCategories';
import { GoalTemplates } from '../goals/GoalTemplates';
import { GoalManagement } from '../goals/GoalManagement';
import { GoalOperations } from '../goals/GoalOperations';
import { GoalAnalytics } from '../goals/GoalAnalytics';
import { GoalEvidence } from '../goals/GoalEvidence';
import { MyReviews } from '../reviews/MyReviews';
import { TeamReviews } from '../reviews/TeamReviews';
import { ReviewCycles } from '../reviews/ReviewCycles';
import { ReviewManagement } from '../reviews/ReviewManagement';
import { ReviewOperations } from '../reviews/ReviewOperations';
import { ReviewAnalytics } from '../reviews/ReviewAnalytics';
import { PerformanceAssessment } from '../reviews/PerformanceAssessment';
import { ReviewTemplates } from '../reviews/ReviewTemplates';
import { ReviewWorkflows } from '../reviews/ReviewWorkflows';
import { CrossCycleAnalysis } from '../reviews/CrossCycleAnalysis';
import { PerformanceReports } from '../reports/PerformanceReports';
import { GoalReports } from '../reports/GoalReports';
import { AnalyticsDashboard } from '../reports/AnalyticsDashboard';
import { ReviewReports } from '../reports/ReviewReports';
import { TeamAnalytics } from '../reports/TeamAnalytics';
import { TrendAnalysis } from '../reports/TrendAnalysis';
import { ExportCenter } from '../reports/ExportCenter';
import { SystemSettings } from '../settings/SystemSettings';
import { KRAManagement } from '../kra-management/KRAManagement';
import { KRAOperations } from '../kra-management/KRAOperations';
import { KRAMapping } from '../kra-management/KRAMapping';
import { KRATemplates } from '../kra-management/KRATemplates';
import { DepartmentKRATemplates } from '../kra-management/DepartmentKRATemplates';
import { KRABulkOperations } from '../kra-management/KRABulkOperations';

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

interface MainContentProps {
  user: User;
  activeMenu: string;
}

export function MainContent({ user, activeMenu }: MainContentProps) {
  // Helper function to determine appropriate dashboard based on user role
  const getDashboardComponent = (dashboardType?: string) => {
    if (dashboardType) {
      switch (dashboardType) {
        case 'personal-dashboard':
          return <PersonalDashboard user={user} />;
        case 'team-dashboard':
          return <TeamDashboard user={user} />;
        case 'organization-dashboard':
          return <OrganizationDashboard user={user} />;
        default:
          break;
      }
    }

    // Role-based default dashboard routing
    switch (user.role) {
      case 'ADMIN':
      case 'HR':
        return <OrganizationDashboard user={user} />;
      case 'MANAGER':
      case 'TEAMLEAD':
        return <TeamDashboard user={user} />;
      case 'EMPLOYEE':
      default:
        return <PersonalDashboard user={user} />;
    }
  };

  // Helper function to get context-based analytics
  const getAnalyticsComponent = () => {
    switch (user.role) {
      case 'ADMIN':
      case 'HR':
        return <OrganizationDashboard user={user} />;
      case 'MANAGER':
      case 'TEAMLEAD':
        return <TeamAnalytics user={user} />;
      case 'EMPLOYEE':
      default:
        return <PersonalDashboard user={user} />;
    }
  };

  // Helper function to check if user has access to masters
  const hasAccessToMasters = () => {
    return ['ADMIN', 'HR'].includes(user.role);
  };

  // Helper function to check if user has access to department templates
  const hasAccessToDepartmentTemplates = () => {
    return ['MANAGER'].includes(user.role);
  };

  // Helper function to check if user has access to team functions
  const hasAccessToTeamFunctions = () => {
    return ['MANAGER', 'TEAMLEAD'].includes(user.role);
  };

  const renderContent = () => {
    try {
      switch (activeMenu) {
        // Dashboard routing with new simplified structure
        case 'dashboard':
          return getDashboardComponent();
        case 'personal-dashboard':
          return getDashboardComponent('personal-dashboard');
        case 'team-dashboard':
          return hasAccessToTeamFunctions()
            ? getDashboardComponent('team-dashboard')
            : getDashboardComponent('personal-dashboard');
        case 'organization-dashboard':
          return hasAccessToMasters()
            ? getDashboardComponent('organization-dashboard')
            : getDashboardComponent();

        // Enhanced Analytics routing
        case 'analytics':
          return getAnalyticsComponent();

        // Masters - Role-based access (ADMIN/HR only)
        case 'department-master':
          return hasAccessToMasters()
            ? <DepartmentMaster user={user} />
            : getDashboardComponent();
        case 'domain-master':
          return hasAccessToMasters()
            ? <DomainMaster user={user} />
            : getDashboardComponent();
        case 'project-master':
          return hasAccessToMasters()
            ? <ProjectMaster user={user} />
            : getDashboardComponent();
        case 'kra-master':
          return hasAccessToMasters()
            ? <KRAMaster user={user} />
            : getDashboardComponent();
        case 'masters':
          return hasAccessToMasters()
            ? <DepartmentMaster user={user} />
            : getDashboardComponent();
      
        // User Management - Role-based access
        case 'user-operations':
          return hasAccessToMasters()
            ? <UserOperations user={user} />
            : getDashboardComponent();
        case 'reviewer-mapping':
          return hasAccessToMasters()
            ? <ReviewerMapping user={user} />
            : getDashboardComponent();
        case 'bulk-operations':
          return hasAccessToMasters()
            ? <BulkOperations user={user} />
            : getDashboardComponent();
        case 'user-management':
          return hasAccessToMasters()
            ? <UserOperations user={user} />
            : getDashboardComponent();
      
        // KRA Management - Role-based Access
        case 'kra-management':
          return hasAccessToMasters()
            ? <KRAManagement user={user} />
            : getDashboardComponent();
        case 'kra-operations':
          return hasAccessToMasters()
            ? <KRAOperations user={user} />
            : getDashboardComponent();
        case 'kra-mapping':
          return hasAccessToTeamFunctions()
            ? <KRAMapping user={user} />
            : getDashboardComponent();
        case 'kra-templates':
          return hasAccessToDepartmentTemplates() || hasAccessToMasters()
            ? <KRATemplates user={user} />
            : getDashboardComponent();
        case 'kra-bulk-operations':
          return hasAccessToMasters()
            ? <KRABulkOperations user={user} />
            : getDashboardComponent();
        case 'kras':
          return hasAccessToMasters()
            ? <KRAManagement user={user} />
            : getDashboardComponent();
        case 'department-templates':
          return hasAccessToDepartmentTemplates()
            ? <DepartmentKRATemplates user={user} />
            : getDashboardComponent();
      
        // Goals - Simplified Structure with Role-based Access
        case 'my-goals':
          return <MyGoals user={user} />;
        case 'goals':
          return <MyGoals user={user} />;
        case 'team-goals':
          return hasAccessToTeamFunctions()
            ? <TeamGoals user={user} />
            : <MyGoals user={user} />;
        case 'goal-management':
          return hasAccessToMasters()
            ? <GoalManagement user={user} />
            : <MyGoals user={user} />;
        case 'goal-operations':
          return hasAccessToMasters()
            ? <GoalOperations user={user} />
            : <MyGoals user={user} />;
        case 'goal-analytics':
          return hasAccessToTeamFunctions()
            ? <GoalAnalytics user={user} />
            : <MyGoals user={user} />;
        case 'goal-evidence':
          return <GoalEvidence user={user} />;
        case 'goal-categories':
          return hasAccessToMasters()
            ? <GoalCategories user={user} />
            : <MyGoals user={user} />;
        case 'goal-templates':
          return hasAccessToDepartmentTemplates() || hasAccessToMasters()
            ? <GoalTemplates user={user} />
            : <MyGoals user={user} />;
      
        // Reviews - Enhanced Review Matrix Integration
        case 'my-reviews':
          return <ReviewContainer user={user} />;
        case 'reviews':
          return <ReviewContainer user={user} />;
        case 'team-reviews':
          return hasAccessToTeamFunctions()
            ? <TeamReviews user={user} />
            : <ReviewContainer user={user} />;
        case 'review-management':
        case 'review-management-main':
          return hasAccessToMasters()
            ? <ReviewManagement user={user} />
            : <ReviewContainer user={user} />;
        case 'review-operations':
          return hasAccessToMasters()
            ? <ReviewOperations user={user} />
            : <ReviewContainer user={user} />;
        case 'review-analytics':
          return hasAccessToTeamFunctions()
            ? <ReviewAnalytics user={user} />
            : <ReviewContainer user={user} />;
        case 'performance-assessment':
          return <PerformanceAssessment user={user} />;
        case 'review-cycles':
          return hasAccessToMasters()
            ? <ReviewCycles user={user} />
            : <ReviewContainer user={user} />;
        case 'review-templates':
          return hasAccessToDepartmentTemplates() || hasAccessToMasters()
            ? <ReviewTemplates user={user} />
            : <ReviewContainer user={user} />;
        case 'review-workflows':
          return hasAccessToMasters()
            ? <ReviewWorkflows user={user} />
            : <ReviewContainer user={user} />;
        case 'cross-cycle-analysis':
          return hasAccessToTeamFunctions()
            ? <CrossCycleAnalysis user={user} />
            : <ReviewContainer user={user} />;
        case 'review-status':
          return hasAccessToMasters() || hasAccessToTeamFunctions()
            ? <ReviewAnalytics user={user} />
            : <ReviewContainer user={user} />;

        // Reports - Role-based Access and Simplified Routing
        case 'reports':
          return getAnalyticsComponent();
        case 'performance-reports':
          return hasAccessToTeamFunctions()
            ? <PerformanceReports user={user} />
            : getAnalyticsComponent();
        case 'goal-reports':
          return hasAccessToTeamFunctions()
            ? <GoalReports user={user} />
            : getAnalyticsComponent();
        case 'analytics-dashboard':
          return <AnalyticsDashboard user={user} />;
        case 'review-reports':
          return hasAccessToTeamFunctions()
            ? <ReviewReports user={user} />
            : getAnalyticsComponent();
        case 'team-analytics':
          return hasAccessToTeamFunctions()
            ? <TeamAnalytics user={user} />
            : getAnalyticsComponent();
        case 'trend-analysis':
          return hasAccessToTeamFunctions()
            ? <TrendAnalysis user={user} />
            : getAnalyticsComponent();
        case 'export-center':
          return hasAccessToTeamFunctions()
            ? <ExportCenter user={user} />
            : getAnalyticsComponent();

        // Settings - Role-based Access
        case 'settings':
        case 'personal-settings':
          return <SystemSettings user={user} settingsType="personal" />;
        case 'system-config':
          return hasAccessToMasters()
            ? <SystemSettings user={user} settingsType="system" />
            : <SystemSettings user={user} settingsType="personal" />;
        case 'goal-config':
          return hasAccessToMasters()
            ? <SystemSettings user={user} settingsType="goals" />
            : <SystemSettings user={user} settingsType="personal" />;
        case 'notification-config':
          return <SystemSettings user={user} settingsType="notifications" />;

        // Simplified menu items fallback
        case 'profile':
          return <SystemSettings user={user} settingsType="personal" />;

        // Error handling for invalid routes
        default:
          console.warn(`Unknown menu route: ${activeMenu}. Falling back to dashboard.`);
          return getDashboardComponent();
      }
    } catch (error) {
      console.error('Error rendering content for menu:', activeMenu, error);
      // Fallback to dashboard on any rendering error
      return getDashboardComponent();
    }
  };

  return (
    <main className="flex-1 overflow-y-auto spacing-lg">
      {renderContent()}
    </main>
  );
}