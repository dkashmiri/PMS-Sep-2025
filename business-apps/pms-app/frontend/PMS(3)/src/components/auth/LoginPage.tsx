import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BarChart3, Mail, Lock, Eye, EyeOff, Users, Shield, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  error?: string | null;
}

export function LoginPage({ onLogin, error: externalError }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await onLogin(email, password);
      if (!success) {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'ADMIN', email: 'admin@company.com', description: 'Full system access' },
    { role: 'HR', email: 'hr@company.com', description: 'HR operations & reporting' },
    { role: 'MANAGER', email: 'manager@company.com', description: 'Team & department management' },
    { role: 'TEAMLEAD', email: 'teamlead@company.com', description: 'Team leadership & reviews' },
    { role: 'EMPLOYEE', email: 'employee@company.com', description: 'Performance & goal tracking' }
  ];

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen surface flex items-center justify-center spacing-lg">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        {/* Left Side - Branding */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-md mb-6">
              <div className="w-12 h-12 bg-primary radius-lg flex items-center justify-center elevation-1">
                <BarChart3 className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">PMS Enhanced</h1>
                <p className="text-primary font-medium">Performance Management System</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Welcome to Your Performance Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Track goals, measure progress, and achieve excellence with our comprehensive performance management platform.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 radius-xl overflow-hidden elevation-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc1ODc3NzQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Team collaboration meeting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-google-gray-900/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm opacity-90">Empowering teams to achieve their best</p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
            <div className="text-center spacing-md radius elevation-1 matte-surface">
              <div className="w-10 h-10 bg-primary-muted radius flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <p className="font-medium text-foreground">Performance Tracking</p>
              <p className="text-sm text-muted-foreground">Real-time metrics</p>
            </div>
            <div className="text-center spacing-md radius elevation-1 matte-surface">
              <div className="w-10 h-10 bg-success-muted radius flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-success" />
              </div>
              <p className="font-medium text-foreground">Goal Management</p>
              <p className="text-sm text-muted-foreground">Smart objectives</p>
            </div>
            <div className="text-center spacing-md radius elevation-1 matte-surface">
              <div className="w-10 h-10 bg-warning-muted radius flex items-center justify-center mx-auto mb-2">
                <Shield className="w-5 h-5 text-warning" />
              </div>
              <p className="font-medium text-foreground">Review Process</p>
              <p className="text-sm text-muted-foreground">360° feedback</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="elevation-3 border-0 premium-card">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <p className="text-muted-foreground">Access your performance dashboard</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 premium-input"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 premium-input"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-premium"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {(error || externalError) && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error || externalError}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full google-button-primary" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Demo Accounts */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center mb-3">Demo Accounts (Password: password123)</p>
                <div className="grid grid-cols-1 gap-sm">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.email}
                      onClick={() => quickLogin(account.email)}
                      className="flex items-center justify-between spacing-sm border border-border radius hover:surface-variant transition-premium text-left"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              account.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                              account.role === 'HR' ? 'bg-blue-100 text-blue-800' :
                              account.role === 'MANAGER' ? 'bg-purple-100 text-purple-800' :
                              account.role === 'TEAMLEAD' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {account.role}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground">{account.email}</p>
                        <p className="text-xs text-muted-foreground">{account.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  © 2025 PMS Enhanced. All rights reserved.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}