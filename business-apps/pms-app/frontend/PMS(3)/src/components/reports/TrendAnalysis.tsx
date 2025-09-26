import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  LineChart,
  Calendar,
  Target,
  Users,
  Award,
  AlertTriangle,
  Download,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

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

interface TrendAnalysisProps {
  user: User;
}

// Mock trend data
const performanceTrendData = [
  { period: 'Jan 2024', performance: 82, goals: 78, reviews: 85, satisfaction: 4.1 },
  { period: 'Feb 2024', performance: 85, goals: 82, reviews: 87, satisfaction: 4.2 },
  { period: 'Mar 2024', performance: 87, goals: 85, reviews: 89, satisfaction: 4.3 },
  { period: 'Apr 2024', performance: 89, goals: 88, reviews: 91, satisfaction: 4.4 },
  { period: 'May 2024', performance: 91, goals: 90, reviews: 93, satisfaction: 4.5 },
  { period: 'Jun 2024', performance: 93, goals: 92, reviews: 95, satisfaction: 4.6 }
];

const departmentTrends = [
  {
    department: 'Engineering',
    currentScore: 92,
    previousScore: 88,
    trend: 'up',
    change: 4.5,
    forecast: 95,
    confidence: 85
  },
  {
    department: 'Sales',
    currentScore: 89,
    previousScore: 91,
    trend: 'down',
    change: -2.2,
    forecast: 87,
    confidence: 78
  },
  {
    department: 'Marketing',
    currentScore: 87,
    previousScore: 87,
    trend: 'stable',
    change: 0.0,
    forecast: 88,
    confidence: 92
  },
  {
    department: 'HR',
    currentScore: 90,
    previousScore: 86,
    trend: 'up',
    change: 4.7,
    forecast: 93,
    confidence: 88
  },
  {
    department: 'Finance',
    currentScore: 88,
    previousScore: 85,
    trend: 'up',
    change: 3.5,
    forecast: 90,
    confidence: 81
  }
];

const seasonalTrends = [
  { month: 'Q1', performance: 85, goals: 82, reviews: 88, engagement: 4.2 },
  { month: 'Q2', performance: 89, goals: 87, reviews: 91, engagement: 4.4 },
  { month: 'Q3', performance: 87, goals: 85, reviews: 89, engagement: 4.1 },
  { month: 'Q4', performance: 91, goals: 89, reviews: 93, engagement: 4.3 }
];

const metricCorrelations = [
  { metric: 'Goal Achievement', correlation: 0.87, impact: 'High', trend: 'Positive' },
  { metric: 'Team Satisfaction', correlation: 0.74, impact: 'High', trend: 'Positive' },
  { metric: 'Training Hours', correlation: 0.68, impact: 'Medium', trend: 'Positive' },
  { metric: 'Review Frequency', correlation: 0.62, impact: 'Medium', trend: 'Positive' },
  { metric: 'Overtime Hours', correlation: -0.45, impact: 'Medium', trend: 'Negative' }
];

const predictiveInsights = [
  {
    insight: 'Engineering team performance expected to reach 95% by Q1 2025',
    confidence: 85,
    impact: 'High',
    recommendation: 'Continue current development programs'
  },
  {
    insight: 'Sales team may face performance decline without intervention',
    confidence: 78,
    impact: 'High',
    recommendation: 'Implement additional coaching and support'
  },
  {
    insight: 'Goal completion rates show 12% improvement trend',
    confidence: 92,
    impact: 'Medium',
    recommendation: 'Maintain current goal-setting processes'
  },
  {
    insight: 'Review completion time improving by 2 days per quarter',
    confidence: 81,
    impact: 'Medium',
    recommendation: 'Optimize review workflow further'
  }
];

const anomalyDetection = [
  {
    period: 'May 2024',
    metric: 'Engineering Performance',
    expected: 89,
    actual: 95,
    variance: 6.7,
    status: 'positive'
  },
  {
    period: 'Jun 2024',
    metric: 'Sales Goals',
    expected: 92,
    actual: 84,
    variance: -8.7,
    status: 'negative'
  },
  {
    period: 'May 2024',
    metric: 'Review Completion',
    expected: 93,
    actual: 98,
    variance: 5.4,
    status: 'positive'
  }
];

export function TrendAnalysis({ user }: TrendAnalysisProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const renderRoleBasedContent = () => {
    const canViewAllData = ['ADMIN', 'HR', 'MANAGER'].includes(user.role);

    return (
      <>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Trend</p>
                  <p className="text-3xl font-bold text-success">+5.2%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">Improving</span>
                  </div>
                </div>
                <div className="p-3 bg-success-muted rounded-lg">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
                  <p className="text-3xl font-bold text-foreground">84%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary">High confidence</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-muted rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Anomalies Detected</p>
                  <p className="text-3xl font-bold text-foreground">3</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-sm text-warning">This month</span>
                  </div>
                </div>
                <div className="p-3 bg-warning-muted rounded-lg">
                  <Activity className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Correlation Score</p>
                  <p className="text-3xl font-bold text-foreground">0.74</p>
                  <div className="flex items-center gap-1 mt-1">
                    <LineChart className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary">Strong correlation</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-muted rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal Analysis</TabsTrigger>
            <TabsTrigger value="correlations">Correlations</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          </TabsList>

          {/* Performance Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Performance Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={performanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="period" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="performance" stackId="1" stroke="#4285f4" fill="#4285f4" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="goals" stackId="1" stroke="#34a853" fill="#34a853" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="reviews" stackId="1" stroke="#fbc02d" fill="#fbc02d" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentTrends.map((dept, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{dept.department}</h3>
                        <div className="flex items-center gap-2">
                          {dept.trend === 'up' && <ArrowUp className="h-4 w-4 text-success" />}
                          {dept.trend === 'down' && <ArrowDown className="h-4 w-4 text-destructive" />}
                          {dept.trend === 'stable' && <Minus className="h-4 w-4 text-muted-foreground" />}
                          <Badge variant={dept.trend === 'up' ? 'default' : dept.trend === 'down' ? 'destructive' : 'secondary'}>
                            {dept.change > 0 ? '+' : ''}{dept.change}%
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current Score</span>
                          <span className="font-medium">{dept.currentScore}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Previous Score</span>
                          <span className="font-medium">{dept.previousScore}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Forecast</span>
                          <span className="font-medium text-primary">{dept.forecast}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Confidence</span>
                          <Badge variant="secondary">{dept.confidence}%</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Forecasting Tab */}
          <TabsContent value="forecasting" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Predictive Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {predictiveInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-surface rounded-lg border-l-4 border-primary">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-2">{insight.insight}</h4>
                          <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={insight.impact === 'High' ? 'default' : 'secondary'}>
                            {insight.impact} Impact
                          </Badge>
                          <span className="text-sm text-muted-foreground">{insight.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seasonal Analysis Tab */}
          <TabsContent value="seasonal" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Seasonal Performance Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={seasonalTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="performance" fill="#4285f4" name="Performance" />
                    <Bar dataKey="goals" fill="#34a853" name="Goals" />
                    <Bar dataKey="reviews" fill="#fbc02d" name="Reviews" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasonalTrends.map((trend, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">{trend.month}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Performance</span>
                          <span className="font-medium">{trend.performance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Goals</span>
                          <span className="font-medium">{trend.goals}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Reviews</span>
                          <span className="font-medium">{trend.reviews}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Engagement</span>
                          <Badge variant="secondary">{trend.engagement}/5</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Correlations Tab */}
          <TabsContent value="correlations" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Performance Correlations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metricCorrelations.map((correlation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${
                          Math.abs(correlation.correlation) >= 0.7 ? 'bg-success' :
                          Math.abs(correlation.correlation) >= 0.5 ? 'bg-warning' : 'bg-destructive'
                        }`} />
                        <div>
                          <h4 className="font-medium text-foreground">{correlation.metric}</h4>
                          <p className="text-sm text-muted-foreground">{correlation.trend} correlation</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={correlation.impact === 'High' ? 'default' : 'secondary'}>
                          {correlation.impact} Impact
                        </Badge>
                        <span className="text-lg font-semibold text-foreground">
                          {correlation.correlation > 0 ? '+' : ''}{correlation.correlation}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Anomalies Tab */}
          <TabsContent value="anomalies" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Anomaly Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {anomalyDetection.map((anomaly, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      anomaly.status === 'positive' ? 'bg-success-muted border-success' : 'bg-destructive-muted border-destructive'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{anomaly.metric}</h4>
                          <p className="text-sm text-muted-foreground">{anomaly.period}</p>
                        </div>
                        <Badge variant={anomaly.status === 'positive' ? 'default' : 'destructive'}>
                          {anomaly.variance > 0 ? '+' : ''}{anomaly.variance}%
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Expected: {anomaly.expected}%</span>
                        <span className="font-medium">Actual: {anomaly.actual}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Trend Analysis</h1>
          <p className="text-muted-foreground">Advanced analytics and predictive insights</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="2years">Last 2 Years</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="goals">Goals</SelectItem>
              <SelectItem value="reviews">Reviews</SelectItem>
              <SelectItem value="satisfaction">Satisfaction</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {renderRoleBasedContent()}
    </div>
  );
}