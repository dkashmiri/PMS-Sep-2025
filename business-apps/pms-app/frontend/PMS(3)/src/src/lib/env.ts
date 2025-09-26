/**
 * Environment variable utilities for safe access across different build environments
 */

// Type-safe environment variable access
export const env = {
  // API Configuration
  API_BASE_URL: 'http://localhost:3001/api',
  AUTH_SERVICE_URL: 'http://localhost:3002/api/auth',
  WEBSOCKET_URL: 'ws://localhost:3001/ws',
  
  // App Configuration
  APP_TITLE: 'PMS Enhanced',
  APP_VERSION: '1.0.0',
  APP_ENV: 'development',
  
  // Feature Flags
  ENABLE_MOCK_API: true,
  DEBUG_MODE: true,
  
  // Get environment variable with fallback
  get(key: string, fallback: string = ''): string {
    try {
      // Try Vite environment variables first
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        const value = import.meta.env[`VITE_${key}`];
        if (value && typeof value === 'string' && value.trim() !== '') {
          return value;
        }
      }
      
      // Fallback to process.env for SSR/Node environments
      if (typeof process !== 'undefined' && process.env) {
        const value = process.env[`VITE_${key}`];
        if (value && typeof value === 'string' && value.trim() !== '') {
          return value;
        }
      }
      
      // Return predefined values for known keys
      const predefinedValue = this[key as keyof typeof this];
      if (predefinedValue !== undefined) {
        return String(predefinedValue);
      }
      
      return fallback;
    } catch (error) {
      console.warn(`Failed to get environment variable ${key}:`, error);
      return fallback;
    }
  },
  
  // Boolean environment variable getter
  getBoolean(key: string, fallback: boolean = false): boolean {
    const value = this.get(key, String(fallback));
    return value.toLowerCase() === 'true';
  },
  
  // Number environment variable getter
  getNumber(key: string, fallback: number = 0): number {
    const value = this.get(key, String(fallback));
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  },
  
  // Check if we're in development mode
  isDevelopment(): boolean {
    return this.get('APP_ENV', 'development') === 'development';
  },
  
  // Check if we're in production mode
  isProduction(): boolean {
    return this.get('APP_ENV', 'development') === 'production';
  }
};

// Initialize and validate environment
export const initializeEnvironment = () => {
  console.log('🔧 Initializing environment configuration...');
  
  const config = {
    apiBaseUrl: env.get('API_BASE_URL'),
    appEnv: env.get('APP_ENV'),
    enableMockApi: env.getBoolean('ENABLE_MOCK_API'),
    debugMode: env.getBoolean('DEBUG_MODE'),
    isDevelopment: env.isDevelopment(),
  };
  
  if (config.debugMode) {
    console.log('🚀 Environment Configuration:', config);
    console.log('📊 Available environment variables:', {
      importMeta: typeof import.meta !== 'undefined' ? Object.keys(import.meta.env || {}) : 'unavailable',
      process: typeof process !== 'undefined' ? Object.keys(process.env || {}).filter(key => key.startsWith('VITE_')) : 'unavailable'
    });
  }
  
  return config;
};

export default env;