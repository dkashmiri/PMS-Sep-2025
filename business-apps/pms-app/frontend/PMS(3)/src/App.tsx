import React, { useEffect } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { DashboardContainer } from './components/layout/DashboardContainer';
import { useAuth } from './store/authStore';
import { initializeAuth, setupAuthWatcher } from './store/authStore';

function App() {
  const { user, isAuthenticated, isLoading, error, login, logout, clearError } = useAuth();

  useEffect(() => {
    // Initialize authentication state
    initializeAuth();
    
    // Setup auth watchers for session management
    setupAuthWatcher();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    clearError();
    return await login(email, password);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center surface">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <LoginPage onLogin={handleLogin} error={error} />;
  }

  return <DashboardContainer user={user} onLogout={handleLogout} />;
}

export default App;