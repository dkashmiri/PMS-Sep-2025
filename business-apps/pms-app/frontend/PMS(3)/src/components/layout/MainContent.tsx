import React from 'react';
import { DashboardPage } from '../dashboard/DashboardPage';
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
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardPage user={user} />;
      
      // Masters
      case 'department-master':
        return <DepartmentMaster user={user} />;
      case 'domain-master':
        return <DomainMaster user={user} />;
      case 'project-master':
        return <ProjectMaster user={user} />;
      case 'kra-master':
        return <KRAMaster user={user} />;
      
      // User Management
      case 'user-operations':
        return <UserOperations user={user} />;
      case 'reviewer-mapping':
        return <ReviewerMapping user={user} />;
      case 'bulk-operations':
        return <BulkOperations user={user} />;
      
      // KRA Management
      case 'kra-management':
        return <KRAManagement user={user} />;
      case 'kra-operations':
        return <KRAOperations user={user} />;
      case 'kra-mapping':
        return <KRAMapping user={user} />;
      case 'kra-templates':
        return <KRATemplates user={user} />;
      case 'kra-bulk-operations':
        return <KRABulkOperations user={user} />;
      
      // Goals
      case 'goal-management':
        return <GoalManagement user={user} />;
      case 'goal-operations':
        return <GoalOperations user={user} />;
      case 'goal-analytics':
        return <GoalAnalytics user={user} />;
      case 'goal-evidence':
        return <GoalEvidence user={user} />;
      case 'my-goals':
        return <MyGoals user={user} />;
      case 'team-goals':
        return <TeamGoals user={user} />;
      case 'goal-categories':
        return <GoalCategories user={user} />;
      case 'goal-templates':
        return <GoalTemplates user={user} />;
      
      // Reviews
      case 'review-management-main':
        return <ReviewManagement user={user} />;
      case 'review-operations':
        return <ReviewOperations user={user} />;
      case 'review-analytics':
        return <ReviewAnalytics user={user} />;
      case 'performance-assessment':
        return <PerformanceAssessment user={user} />;
      case 'my-reviews':
        return <MyReviews user={user} />;
      case 'team-reviews':
        return <TeamReviews user={user} />;
      case 'review-cycles':
        return <ReviewCycles user={user} />;
      case 'review-templates':
        return <ReviewTemplates user={user} />;
      case 'review-workflows':
        return <ReviewWorkflows user={user} />;
      case 'cross-cycle-analysis':
        return <CrossCycleAnalysis user={user} />;
      
      // Reports
      case 'performance-reports':
        return <PerformanceReports user={user} />;
      case 'goal-reports':
        return <GoalReports user={user} />;
      case 'analytics-dashboard':
        return <AnalyticsDashboard user={user} />;
      case 'review-reports':
        return <ReviewReports user={user} />;
      case 'team-analytics':
        return <TeamAnalytics user={user} />;
      case 'trend-analysis':
        return <TrendAnalysis user={user} />;
      case 'export-center':
        return <ExportCenter user={user} />;
      
      // Settings
      case 'personal-settings':
        return <SystemSettings user={user} settingsType="personal" />;
      case 'system-config':
        return <SystemSettings user={user} settingsType="system" />;
      case 'goal-config':
        return <SystemSettings user={user} settingsType="goals" />;
      case 'notification-config':
        return <SystemSettings user={user} settingsType="notifications" />;
      
      default:
        return <DashboardPage user={user} />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto spacing-lg">
      {renderContent()}
    </main>
  );
}