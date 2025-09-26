import { apiService } from './api';
import { API_ENDPOINTS } from '../lib/api.config';
import { User, LoginRequest, LoginResponse, ApiResponse } from '../types';

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {
    this.loadUserFromStorage();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private loadUserFromStorage(): void {
    try {
      const userData = localStorage.getItem('pms_user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      this.clearAuthData();
    }
  }

  private saveUserToStorage(user: User): void {
    try {
      localStorage.setItem('pms_user', JSON.stringify(user));
      this.currentUser = user;
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem('pms_user');
    localStorage.removeItem('pms_token');
    localStorage.removeItem('pms_refresh_token');
    this.currentUser = null;
    apiService.clearCache();
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('pms_token');
    return !!(token && this.currentUser);
  }

  public hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }

  public hasAnyRole(roles: string[]): boolean {
    return this.currentUser ? roles.includes(this.currentUser.role) : false;
  }

  public hasPermission(permission: string): boolean {
    return this.currentUser?.permissions?.includes(permission) ?? false;
  }

  public hasAnyPermission(permissions: string[]): boolean {
    if (!this.currentUser?.permissions) return false;
    return permissions.some(permission => 
      this.currentUser!.permissions!.includes(permission)
    );
  }

  public async login(email: string, password: string): Promise<boolean> {
    // Import APP_CONFIG here to avoid circular dependencies
    const { APP_CONFIG } = await import('../lib/api.config');
    
    // Check if mock API is enabled
    if (APP_CONFIG.enableMockApi) {
      // Use mock authentication for development
      return this.mockLogin(email, password);
    }

    try {
      const loginData: LoginRequest = { email, password };
      const response: ApiResponse<LoginResponse> = await apiService.post(
        API_ENDPOINTS.AUTH.LOGIN,
        loginData
      );

      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;
        
        // Store tokens
        localStorage.setItem('pms_token', token);
        localStorage.setItem('pms_refresh_token', refreshToken);
        
        // Store user data
        this.saveUserToStorage(user);
        
        console.log('✅ Login successful:', user.name);
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ Login error:', error);
      // Fallback to mock login if API is not available in development
      if (APP_CONFIG.isDevelopment) {
        console.log('🔄 Falling back to mock authentication');
        return this.mockLogin(email, password);
      }
      return false;
    }
  }

  public async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate server-side session
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local data regardless of server response
      this.clearAuthData();
      console.log('✅ Logout successful');
    }
  }

  public async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('pms_refresh_token');
      if (!refreshToken) {
        return false;
      }

      const response: ApiResponse<LoginResponse> = await apiService.post(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );

      if (response.success && response.data) {
        const { user, token, refreshToken: newRefreshToken } = response.data;
        
        localStorage.setItem('pms_token', token);
        localStorage.setItem('pms_refresh_token', newRefreshToken);
        this.saveUserToStorage(user);
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearAuthData();
      return false;
    }
  }

  public async getUserProfile(): Promise<User | null> {
    try {
      const response: ApiResponse<User> = await apiService.get(
        API_ENDPOINTS.AUTH.ME
      );

      if (response.success && response.data) {
        this.saveUserToStorage(response.data);
        return response.data;
      }

      return null;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  }

  public async updateProfile(userData: Partial<User>): Promise<boolean> {
    try {
      const response: ApiResponse<User> = await apiService.put(
        API_ENDPOINTS.USERS.PROFILE,
        userData
      );

      if (response.success && response.data) {
        this.saveUserToStorage(response.data);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      const response: ApiResponse = await apiService.post(
        API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
        {
          currentPassword,
          newPassword,
        }
      );

      return response.success;
    } catch (error) {
      console.error('Change password error:', error);
      return false;
    }
  }

  public async forgotPassword(email: string): Promise<boolean> {
    try {
      const response: ApiResponse = await apiService.post(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email }
      );

      return response.success;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  }

  public async resetPassword(
    token: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      const response: ApiResponse = await apiService.post(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        {
          token,
          newPassword,
        }
      );

      return response.success;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  }

  // Mock authentication for development
  public async mockLogin(email: string, password: string): Promise<boolean> {
    // Mock users data
    const mockUsers: Record<string, User> = {
      'admin@company.com': {
        id: 'user-admin',
        name: 'System Administrator',
        email: 'admin@company.com',
        role: 'ADMIN',
        department: 'IT',
        domain: 'Administration',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        permissions: ['*'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      'hr@company.com': {
        id: 'user-hr',
        name: 'HR Manager',
        email: 'hr@company.com',
        role: 'HR',
        department: 'Human Resources',
        domain: 'HR Operations',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=150&h=150&fit=crop&crop=face',
        permissions: ['user.read', 'user.create', 'user.update', 'review.read', 'goal.read'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      'manager@company.com': {
        id: 'user-manager',
        name: 'Michael Chen',
        email: 'manager@company.com',
        role: 'MANAGER',
        department: 'Engineering',
        domain: 'Development',
        project: 'Web Platform',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        permissions: ['team.read', 'review.write', 'goal.write', 'analytics.read'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      'teamlead@company.com': {
        id: 'user-teamlead',
        name: 'Jessica Wong',
        email: 'teamlead@company.com',
        role: 'TEAMLEAD',
        department: 'Engineering',
        domain: 'Development',
        project: 'Mobile App',
        manager: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        permissions: ['team.read', 'review.write', 'goal.write'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      'employee@company.com': {
        id: 'user-employee',
        name: 'Sarah Johnson',
        email: 'employee@company.com',
        role: 'EMPLOYEE',
        department: 'Engineering',
        domain: 'Development',
        project: 'Web Platform',
        manager: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=150&h=150&fit=crop&crop=face',
        permissions: ['profile.read', 'profile.update', 'goal.read', 'goal.update', 'review.read'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    const foundUser = mockUsers[email.toLowerCase()];

    if (foundUser && password === 'password123') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate mock tokens
      const token = `mock_token_${Date.now()}`;
      const refreshToken = `mock_refresh_${Date.now()}`;

      // Store tokens
      localStorage.setItem('pms_token', token);
      localStorage.setItem('pms_refresh_token', refreshToken);

      // Store user data
      this.saveUserToStorage(foundUser);

      console.log('✅ Mock login successful:', foundUser.name);
      return true;
    }

    console.log('❌ Mock login failed: Invalid credentials');
    return false;
  }

  // Utility method to check if current user can access a route
  public canAccessRoute(requiredRoles?: string[], requiredPermissions?: string[]): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    if (requiredRoles && requiredRoles.length > 0) {
      if (!this.hasAnyRole(requiredRoles)) {
        return false;
      }
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      if (!this.hasAnyPermission(requiredPermissions)) {
        return false;
      }
    }

    return true;
  }

  // Get user's menu items based on role and permissions
  public getUserMenuItems(): any[] {
    if (!this.currentUser) return [];

    const { role } = this.currentUser;
    
    // This would typically come from a configuration or API
    const menuConfig: Record<string, any[]> = {
      ADMIN: [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
        { id: 'users', label: 'User Management', icon: 'Users', path: '/users' },
        { id: 'organizations', label: 'Organizations', icon: 'Building', path: '/organizations' },
        { id: 'kras', label: 'KRA Management', icon: 'Target', path: '/kras' },
        { id: 'goals', label: 'Goal Management', icon: 'Flag', path: '/goals' },
        { id: 'reviews', label: 'Review Management', icon: 'FileText', path: '/reviews' },
        { id: 'analytics', label: 'Analytics', icon: 'BarChart3', path: '/analytics' },
        { id: 'reports', label: 'Reports', icon: 'FileBarChart', path: '/reports' },
        { id: 'settings', label: 'System Settings', icon: 'Settings', path: '/settings' },
      ],
      HR: [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
        { id: 'users', label: 'Employee Management', icon: 'Users', path: '/users' },
        { id: 'kras', label: 'KRA Management', icon: 'Target', path: '/kras' },
        { id: 'reviews', label: 'Review Management', icon: 'FileText', path: '/reviews' },
        { id: 'analytics', label: 'HR Analytics', icon: 'BarChart3', path: '/analytics' },
        { id: 'reports', label: 'HR Reports', icon: 'FileBarChart', path: '/reports' },
      ],
      MANAGER: [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
        { id: 'team', label: 'My Team', icon: 'Users', path: '/team' },
        { id: 'goals', label: 'Team Goals', icon: 'Flag', path: '/goals/team' },
        { id: 'reviews', label: 'Team Reviews', icon: 'FileText', path: '/reviews/team' },
        { id: 'analytics', label: 'Team Analytics', icon: 'BarChart3', path: '/analytics/team' },
        { id: 'my-goals', label: 'My Goals', icon: 'Target', path: '/goals/my' },
        { id: 'my-reviews', label: 'My Reviews', icon: 'User', path: '/reviews/my' },
      ],
      TEAMLEAD: [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
        { id: 'team', label: 'My Team', icon: 'Users', path: '/team' },
        { id: 'goals', label: 'Team Goals', icon: 'Flag', path: '/goals/team' },
        { id: 'reviews', label: 'Team Reviews', icon: 'FileText', path: '/reviews/team' },
        { id: 'my-goals', label: 'My Goals', icon: 'Target', path: '/goals/my' },
        { id: 'my-reviews', label: 'My Reviews', icon: 'User', path: '/reviews/my' },
      ],
      EMPLOYEE: [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
        { id: 'my-goals', label: 'My Goals', icon: 'Target', path: '/goals/my' },
        { id: 'my-reviews', label: 'My Reviews', icon: 'FileText', path: '/reviews/my' },
        { id: 'goal-history', label: 'Goal History', icon: 'History', path: '/goals/history' },
        { id: 'profile', label: 'My Profile', icon: 'User', path: '/profile' },
      ],
    };

    return menuConfig[role] || [];
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();
export default authService;