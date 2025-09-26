import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, AuthState } from '../types';
import { authService } from '../services/auth.service';

interface AuthStore extends AuthState {
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
  
  // Getters
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  canAccessRoute: (requiredRoles?: string[], requiredPermissions?: string[]) => boolean;
  getUserMenuItems: () => any[];
  
  // State
  error: string | null;
  lastActivity: Date | null;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: true,
      token: undefined,
      refreshToken: undefined,
      error: null,
      lastActivity: null,

      // Actions
      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null });
        
        try {
          // Use mock login for development, replace with authService.login for production
          const success = await authService.mockLogin(email, password);
          
          if (success) {
            const user = authService.getCurrentUser();
            const token = localStorage.getItem('pms_token');
            const refreshToken = localStorage.getItem('pms_refresh_token');
            
            set({
              user,
              isAuthenticated: true,
              token,
              refreshToken,
              lastActivity: new Date(),
              error: null,
            });
          } else {
            set({
              error: 'Invalid email or password',
            });
          }
          
          return success;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({ error: errorMessage });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async (): Promise<void> => {
        set({ isLoading: true });
        
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            token: undefined,
            refreshToken: undefined,
            error: null,
            lastActivity: null,
            isLoading: false,
          });
        }
      },

      refreshUser: async (): Promise<void> => {
        const currentUser = authService.getCurrentUser();
        const isAuth = authService.isAuthenticated();
        
        if (isAuth && currentUser) {
          try {
            // Try to get fresh user data
            const freshUser = await authService.getUserProfile();
            set({
              user: freshUser || currentUser,
              isAuthenticated: true,
              lastActivity: new Date(),
            });
          } catch (error) {
            console.error('Failed to refresh user:', error);
            // Keep existing user data if refresh fails
            set({
              user: currentUser,
              isAuthenticated: true,
            });
          }
        } else {
          set({
            user: null,
            isAuthenticated: false,
            token: undefined,
            refreshToken: undefined,
          });
        }
        
        set({ isLoading: false });
      },

      updateUser: (userData: Partial<User>): void => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
          
          // Also update in localStorage
          localStorage.setItem('pms_user', JSON.stringify(updatedUser));
        }
      },

      setLoading: (loading: boolean): void => {
        set({ isLoading: loading });
      },

      clearError: (): void => {
        set({ error: null });
      },

      // Getters
      hasRole: (role: string): boolean => {
        return authService.hasRole(role);
      },

      hasAnyRole: (roles: string[]): boolean => {
        return authService.hasAnyRole(roles);
      },

      hasPermission: (permission: string): boolean => {
        return authService.hasPermission(permission);
      },

      hasAnyPermission: (permissions: string[]): boolean => {
        return authService.hasAnyPermission(permissions);
      },

      canAccessRoute: (requiredRoles?: string[], requiredPermissions?: string[]): boolean => {
        return authService.canAccessRoute(requiredRoles, requiredPermissions);
      },

      getUserMenuItems: (): any[] => {
        return authService.getUserMenuItems();
      },
    }),
    {
      name: 'pms-auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        refreshToken: state.refreshToken,
        lastActivity: state.lastActivity,
      }),
      onRehydrateStorage: () => (state) => {
        // Initialize auth state on rehydration
        if (state) {
          state.refreshUser();
        }
      },
    }
  )
);

// Selectors for common use cases
export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    logout: store.logout,
    clearError: store.clearError,
  };
};

export const useUser = () => {
  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);
  return { user, updateUser };
};

export const usePermissions = () => {
  const store = useAuthStore();
  return {
    hasRole: store.hasRole,
    hasAnyRole: store.hasAnyRole,
    hasPermission: store.hasPermission,
    hasAnyPermission: store.hasAnyPermission,
    canAccessRoute: store.canAccessRoute,
    getUserMenuItems: store.getUserMenuItems,
  };
};

export const useAuthActions = () => {
  const store = useAuthStore();
  return {
    login: store.login,
    logout: store.logout,
    refreshUser: store.refreshUser,
    updateUser: store.updateUser,
    setLoading: store.setLoading,
    clearError: store.clearError,
  };
};

// Session management
export const initializeAuth = async (): Promise<void> => {
  const store = useAuthStore.getState();
  await store.refreshUser();
};

// Auto-logout on token expiration
export const setupAuthWatcher = (): void => {
  // Check token validity every 5 minutes
  setInterval(() => {
    const store = useAuthStore.getState();
    if (store.isAuthenticated && !authService.isAuthenticated()) {
      store.logout();
    }
  }, 5 * 60 * 1000);

  // Update last activity on user interaction
  const updateActivity = () => {
    const store = useAuthStore.getState();
    if (store.isAuthenticated) {
      store.updateUser({ lastLogin: new Date() });
    }
  };

  // Track user activity
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, updateActivity, true);
  });
};

export default useAuthStore;