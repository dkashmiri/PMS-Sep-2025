import React from 'react';

// TypeScript Interfaces and Types
export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
  submenu?: MenuItem[];
}

export type UserRole = 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
export type DashboardType = 'personal' | 'team' | 'organization';
export type AnalyticsType = 'personal' | 'team' | 'organization';
export type ReviewContext = 'self' | 'team' | 'admin';

// Menu configuration mapping
const MENU_CONFIG = {
  'personal-dashboard': {
    label: 'Personal Dashboard',
    icon: 'Dashboard',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    breadcrumb: ['Dashboard', 'Personal']
  },
  'team-dashboard': {
    label: 'Team Dashboard',
    icon: 'Users',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD'],
    breadcrumb: ['Dashboard', 'Team']
  },
  'organization-dashboard': {
    label: 'Organization Dashboard',
    icon: 'Building',
    roles: ['ADMIN', 'HR'],
    breadcrumb: ['Dashboard', 'Organization']
  },
  'my-goals': {
    label: 'My Goals',
    icon: 'Target',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    breadcrumb: ['Goals', 'My Goals']
  },
  'team-goals': {
    label: 'Team Goals',
    icon: 'Users',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD'],
    breadcrumb: ['Goals', 'Team Goals']
  },
  'goal-templates': {
    label: 'Goal Templates',
    icon: 'FileTemplate',
    roles: ['ADMIN', 'HR', 'MANAGER'],
    breadcrumb: ['Goals', 'Templates']
  },
  'my-reviews': {
    label: 'My Reviews',
    icon: 'FileText',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    breadcrumb: ['Reviews', 'My Reviews']
  },
  'team-reviews': {
    label: 'Team Reviews',
    icon: 'Users',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD'],
    breadcrumb: ['Reviews', 'Team Reviews']
  },
  'review-cycles': {
    label: 'Review Cycles',
    icon: 'Calendar',
    roles: ['ADMIN', 'HR'],
    breadcrumb: ['Reviews', 'Cycles']
  },
  'calibration': {
    label: 'Calibration',
    icon: 'Settings',
    roles: ['ADMIN', 'HR', 'MANAGER'],
    breadcrumb: ['Reviews', 'Calibration']
  },
  'personal-analytics': {
    label: 'Personal Analytics',
    icon: 'BarChart3',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    breadcrumb: ['Analytics', 'Personal']
  },
  'team-analytics': {
    label: 'Team Analytics',
    icon: 'TrendingUp',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD'],
    breadcrumb: ['Analytics', 'Team']
  },
  'organization-analytics': {
    label: 'Organization Analytics',
    icon: 'PieChart',
    roles: ['ADMIN', 'HR'],
    breadcrumb: ['Analytics', 'Organization']
  },
  'employees': {
    label: 'Employees',
    icon: 'Users',
    roles: ['ADMIN', 'HR', 'MANAGER'],
    breadcrumb: ['Administration', 'Employees']
  },
  'departments': {
    label: 'Departments',
    icon: 'Building',
    roles: ['ADMIN', 'HR'],
    breadcrumb: ['Administration', 'Departments']
  },
  'roles-permissions': {
    label: 'Roles & Permissions',
    icon: 'Shield',
    roles: ['ADMIN'],
    breadcrumb: ['Administration', 'Roles & Permissions']
  },
  'system-settings': {
    label: 'System Settings',
    icon: 'Settings',
    roles: ['ADMIN'],
    breadcrumb: ['Administration', 'System Settings']
  },
  'kra-management': {
    label: 'KRA Management',
    icon: 'Target',
    roles: ['ADMIN', 'HR', 'MANAGER'],
    breadcrumb: ['Configuration', 'KRA Management']
  },
  'competencies': {
    label: 'Competencies',
    icon: 'Award',
    roles: ['ADMIN', 'HR'],
    breadcrumb: ['Configuration', 'Competencies']
  },
  'performance-zones': {
    label: 'Performance Zones',
    icon: 'Layers',
    roles: ['ADMIN', 'HR'],
    breadcrumb: ['Configuration', 'Performance Zones']
  },
  'notifications': {
    label: 'Notifications',
    icon: 'Bell',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    breadcrumb: ['Notifications']
  },
  'profile': {
    label: 'Profile',
    icon: 'User',
    roles: ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    breadcrumb: ['Profile']
  }
};

// Role hierarchy for access control
const ROLE_HIERARCHY = {
  'ADMIN': 5,
  'HR': 4,
  'MANAGER': 3,
  'TEAMLEAD': 2,
  'EMPLOYEE': 1
};

/**
 * Get the default dashboard based on user role
 * @param userRole - The user's role
 * @returns The default dashboard menu ID
 */
export const getDefaultDashboard = (userRole: string): string => {
  try {
    switch (userRole.toUpperCase()) {
      case 'EMPLOYEE':
        return 'personal-dashboard';
      case 'TEAMLEAD':
      case 'MANAGER':
        return 'team-dashboard';
      case 'ADMIN':
      case 'HR':
        return 'organization-dashboard';
      default:
        console.warn(`Unknown role: ${userRole}, defaulting to personal dashboard`);
        return 'personal-dashboard';
    }
  } catch (error) {
    console.error('Error in getDefaultDashboard:', error);
    return 'personal-dashboard';
  }
};

/**
 * Check if user role has access to specific menu item
 * @param userRole - The user's role
 * @param menuId - The menu item ID
 * @returns Whether the user has access
 */
export const hasMenuAccess = (userRole: string, menuId: string): boolean => {
  try {
    const menuConfig = MENU_CONFIG[menuId as keyof typeof MENU_CONFIG];
    if (!menuConfig) {
      console.warn(`Menu configuration not found for: ${menuId}`);
      return false;
    }

    return menuConfig.roles.includes(userRole.toUpperCase());
  } catch (error) {
    console.error('Error in hasMenuAccess:', error);
    return false;
  }
};

/**
 * Filter menu items based on user role
 * @param userRole - The user's role
 * @param menuItems - Array of menu items
 * @returns Filtered menu items accessible to the user
 */
export const getAccessibleMenuItems = (userRole: string, menuItems: MenuItem[]): MenuItem[] => {
  try {
    return menuItems
      .filter(item => hasMenuAccess(userRole, item.id))
      .map(item => ({
        ...item,
        submenu: item.submenu ? getAccessibleMenuItems(userRole, item.submenu) : undefined
      }))
      .filter(item => !item.submenu || item.submenu.length > 0); // Remove parent items with no accessible children
  } catch (error) {
    console.error('Error in getAccessibleMenuItems:', error);
    return [];
  }
};

/**
 * Determine which analytics view to show based on role
 * @param userRole - The user's role
 * @returns The analytics type
 */
export const getAnalyticsType = (userRole: string): AnalyticsType => {
  try {
    switch (userRole.toUpperCase()) {
      case 'EMPLOYEE':
        return 'personal';
      case 'TEAMLEAD':
      case 'MANAGER':
        return 'team';
      case 'ADMIN':
      case 'HR':
        return 'organization';
      default:
        console.warn(`Unknown role for analytics: ${userRole}, defaulting to personal`);
        return 'personal';
    }
  } catch (error) {
    console.error('Error in getAnalyticsType:', error);
    return 'personal';
  }
};

/**
 * Determine review context based on role and active menu
 * @param userRole - The user's role
 * @param activeMenu - The currently active menu
 * @returns The review context
 */
export const getReviewContext = (userRole: string, activeMenu: string): ReviewContext => {
  try {
    // Admin context for system administration
    if (['review-cycles', 'calibration'].includes(activeMenu)) {
      return 'admin';
    }

    // Team context for managers and team leads
    if (activeMenu === 'team-reviews' && ['MANAGER', 'TEAMLEAD', 'HR', 'ADMIN'].includes(userRole.toUpperCase())) {
      return 'team';
    }

    // Default to self context
    return 'self';
  } catch (error) {
    console.error('Error in getReviewContext:', error);
    return 'self';
  }
};

/**
 * Validate if menu path is valid and accessible for user
 * @param menuId - The menu item ID
 * @param userRole - The user's role
 * @returns Whether the menu path is valid and accessible
 */
export const isValidMenuPath = (menuId: string, userRole: string): boolean => {
  try {
    // Check if menu exists in configuration
    if (!MENU_CONFIG[menuId as keyof typeof MENU_CONFIG]) {
      return false;
    }

    // Check if user has access to this menu
    return hasMenuAccess(userRole, menuId);
  } catch (error) {
    console.error('Error in isValidMenuPath:', error);
    return false;
  }
};

/**
 * Generate breadcrumb path for navigation
 * @param menuId - The menu item ID
 * @returns Array of breadcrumb labels
 */
export const getMenuBreadcrumb = (menuId: string): string[] => {
  try {
    const menuConfig = MENU_CONFIG[menuId as keyof typeof MENU_CONFIG];
    if (!menuConfig) {
      console.warn(`Menu configuration not found for breadcrumb: ${menuId}`);
      return [menuId];
    }

    return menuConfig.breadcrumb;
  } catch (error) {
    console.error('Error in getMenuBreadcrumb:', error);
    return [menuId];
  }
};

/**
 * Return which dashboard component to render based on menu selection and role
 * @param menuId - The menu item ID
 * @param userRole - The user's role
 * @returns The dashboard component type or null if not a dashboard
 */
export const getDashboardComponent = (menuId: string, userRole: string): DashboardType | null => {
  try {
    switch (menuId) {
      case 'personal-dashboard':
        return 'personal';
      case 'team-dashboard':
        if (['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD'].includes(userRole.toUpperCase())) {
          return 'team';
        }
        return null;
      case 'organization-dashboard':
        if (['ADMIN', 'HR'].includes(userRole.toUpperCase())) {
          return 'organization';
        }
        return null;
      default:
        return null;
    }
  } catch (error) {
    console.error('Error in getDashboardComponent:', error);
    return null;
  }
};

/**
 * Get human-readable label for menu item
 * @param menuId - The menu item ID
 * @returns The menu label
 */
export const getMenuLabel = (menuId: string): string => {
  try {
    const menuConfig = MENU_CONFIG[menuId as keyof typeof MENU_CONFIG];
    return menuConfig?.label || menuId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  } catch (error) {
    console.error('Error in getMenuLabel:', error);
    return menuId;
  }
};

/**
 * Get icon name for menu item
 * @param menuId - The menu item ID
 * @returns The icon name
 */
export const getMenuIcon = (menuId: string): string => {
  try {
    const menuConfig = MENU_CONFIG[menuId as keyof typeof MENU_CONFIG];
    return menuConfig?.icon || 'Circle';
  } catch (error) {
    console.error('Error in getMenuIcon:', error);
    return 'Circle';
  }
};

/**
 * Check if user has higher or equal role level
 * @param userRole - The user's role
 * @param requiredRole - The required role level
 * @returns Whether user meets the role requirement
 */
export const hasRoleLevel = (userRole: string, requiredRole: string): boolean => {
  try {
    const userLevel = ROLE_HIERARCHY[userRole.toUpperCase() as keyof typeof ROLE_HIERARCHY] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole.toUpperCase() as keyof typeof ROLE_HIERARCHY] || 0;

    return userLevel >= requiredLevel;
  } catch (error) {
    console.error('Error in hasRoleLevel:', error);
    return false;
  }
};

/**
 * Get menu items grouped by category
 * @param userRole - The user's role
 * @returns Grouped menu items
 */
export const getGroupedMenuItems = (userRole: string): Record<string, string[]> => {
  try {
    const accessibleMenus = Object.keys(MENU_CONFIG).filter(menuId =>
      hasMenuAccess(userRole, menuId)
    );

    const grouped: Record<string, string[]> = {
      Dashboard: [],
      Goals: [],
      Reviews: [],
      Analytics: [],
      Administration: [],
      Configuration: [],
      Personal: []
    };

    accessibleMenus.forEach(menuId => {
      const breadcrumb = getMenuBreadcrumb(menuId);
      const category = breadcrumb[0];

      if (grouped[category]) {
        grouped[category].push(menuId);
      } else {
        grouped.Personal.push(menuId);
      }
    });

    // Remove empty categories
    Object.keys(grouped).forEach(key => {
      if (grouped[key].length === 0) {
        delete grouped[key];
      }
    });

    return grouped;
  } catch (error) {
    console.error('Error in getGroupedMenuItems:', error);
    return {};
  }
};

/**
 * Get navigation suggestions based on current menu and role
 * @param currentMenuId - Current active menu
 * @param userRole - The user's role
 * @returns Array of suggested menu IDs
 */
export const getNavigationSuggestions = (currentMenuId: string, userRole: string): string[] => {
  try {
    const suggestions: string[] = [];

    // Based on current menu, suggest related items
    switch (currentMenuId) {
      case 'personal-dashboard':
        if (hasMenuAccess(userRole, 'my-goals')) suggestions.push('my-goals');
        if (hasMenuAccess(userRole, 'my-reviews')) suggestions.push('my-reviews');
        if (hasMenuAccess(userRole, 'personal-analytics')) suggestions.push('personal-analytics');
        break;

      case 'team-dashboard':
        if (hasMenuAccess(userRole, 'team-goals')) suggestions.push('team-goals');
        if (hasMenuAccess(userRole, 'team-reviews')) suggestions.push('team-reviews');
        if (hasMenuAccess(userRole, 'team-analytics')) suggestions.push('team-analytics');
        break;

      case 'organization-dashboard':
        if (hasMenuAccess(userRole, 'employees')) suggestions.push('employees');
        if (hasMenuAccess(userRole, 'departments')) suggestions.push('departments');
        if (hasMenuAccess(userRole, 'organization-analytics')) suggestions.push('organization-analytics');
        break;

      case 'my-goals':
        if (hasMenuAccess(userRole, 'my-reviews')) suggestions.push('my-reviews');
        if (hasMenuAccess(userRole, 'personal-analytics')) suggestions.push('personal-analytics');
        break;

      case 'my-reviews':
        if (hasMenuAccess(userRole, 'my-goals')) suggestions.push('my-goals');
        if (hasMenuAccess(userRole, 'personal-analytics')) suggestions.push('personal-analytics');
        break;
    }

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  } catch (error) {
    console.error('Error in getNavigationSuggestions:', error);
    return [];
  }
};

/**
 * Validate menu transition based on role and permissions
 * @param fromMenuId - Current menu ID
 * @param toMenuId - Target menu ID
 * @param userRole - The user's role
 * @returns Whether the transition is allowed
 */
export const isValidMenuTransition = (fromMenuId: string, toMenuId: string, userRole: string): boolean => {
  try {
    // Check if target menu is accessible
    if (!hasMenuAccess(userRole, toMenuId)) {
      return false;
    }

    // Additional business logic for restricted transitions can be added here
    // For example, prevent jumping from employee context to admin context

    return true;
  } catch (error) {
    console.error('Error in isValidMenuTransition:', error);
    return false;
  }
};

/**
 * Get context-aware menu title
 * @param menuId - The menu item ID
 * @param userRole - The user's role
 * @param additionalContext - Additional context for dynamic titles
 * @returns Contextual menu title
 */
export const getContextualMenuTitle = (
  menuId: string,
  userRole: string,
  additionalContext?: Record<string, any>
): string => {
  try {
    const baseLabel = getMenuLabel(menuId);

    // Add role-specific context
    switch (menuId) {
      case 'team-dashboard':
        if (userRole === 'TEAMLEAD') {
          return `${baseLabel} - Team Lead View`;
        } else if (userRole === 'MANAGER') {
          return `${baseLabel} - Manager View`;
        }
        break;

      case 'organization-dashboard':
        if (userRole === 'HR') {
          return `${baseLabel} - HR View`;
        } else if (userRole === 'ADMIN') {
          return `${baseLabel} - Admin View`;
        }
        break;
    }

    return baseLabel;
  } catch (error) {
    console.error('Error in getContextualMenuTitle:', error);
    return getMenuLabel(menuId);
  }
};

// Export all menu configuration for external use
export { MENU_CONFIG, ROLE_HIERARCHY };