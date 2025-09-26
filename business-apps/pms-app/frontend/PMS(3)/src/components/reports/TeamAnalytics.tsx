import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  BarChart3,
  PieChart,
  UserCheck,
  Zap,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

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

interface TeamAnalyticsProps {
  user: User;
}

// Mock team data
const teamPerformanceData = [
  { month: 'Jan', teamA: 88, teamB: 85, teamC: 92, teamD: 78 },
  { month: 'Feb', teamA: 91, teamB: 87, teamC: 89, teamD: 82 },
  { month: 'Mar', teamA: 89, teamB: 90, teamC: 94, teamD: 85 },
  { month: 'Apr', teamA: 93, teamB: 88, teamC: 91, teamD: 87 },
  { month: 'May', teamA: 90, teamB: 92, teamC: 88, teamD: 89 },
  { month: 'Jun', teamA: 95, teamB: 89, teamC: 93, teamD: 91 }
];

const teamMetricsData = [
  {
    team: 'Engineering Team A',
    lead: 'Michael Chen',
    members: 8,
    avgPerformance: 92,
    goalsCompleted: 45,
    totalGoals: 48,
    satisfaction: 4.5,
    retention: 95,
    productivity: 88
  },
  {
    team: 'Engineering Team B',
    lead: 'Sarah Johnson',
    members: 6,
    avgPerformance: 89,
    goalsCompleted: 32,
    totalGoals: 36,
    satisfaction: 4.3,
    retention: 92,
    productivity: 91
  },
  {
    team: 'Sales Team A',
    lead: 'Emily Davis',
    members: 7,
    avgPerformance: 94,
    goalsCompleted: 28,
    totalGoals: 30,
    satisfaction: 4.6,
    retention: 97,
    productivity: 94
  },
  {
    team: 'Marketing Team',
    lead: 'David Wilson',
    members: 5,
    avgPerformance: 87,
    goalsCompleted: 22,
    totalGoals: 25,
    satisfaction: 4.2,
    retention: 88,
    productivity: 85
  }
];

const skillsRadarData = [
  { skill: 'Technical', teamA: 92, teamB: 88, teamC: 95 },
  { skill: 'Communication', teamA: 85, teamB: 92, teamC: 78 },
  { skill: 'Leadership', teamA: 78, teamB: 85, teamC: 82 },
  { skill: 'Problem Solving', teamA: 90, teamB: 87, teamC: 93 },
  { skill: 'Collaboration', teamA: 88, teamB: 95, teamC: 85 },
  { skill: 'Innovation', teamA: 82, teamB: 78, teamC: 90 }
];

const teamCollaborationData = [
  { team: 'Eng Team A', crossTeamProjects: 12, collaborationScore: 92, mentoring: 8 },
  { team: 'Eng Team B', crossTeamProjects: 8, collaborationScore: 88, mentoring: 6 },
  { team: 'Sales Team', crossTeamProjects: 15, collaborationScore: 95, mentoring: 10 },
  { team: 'Marketing', crossTeamProjects: 10, collaborationScore: 85, mentoring: 5 }
];

const topPerformingTeams = [
  { name: 'Sales Team A', lead: 'Emily Davis', score: 94, members: 7, trend: 'up' },
  { name: 'Engineering Team A', lead: 'Michael Chen', score: 92, members: 8, trend: 'up' },
  { name: 'Engineering Team B', lead: 'Sarah Johnson', score: 89, members: 6, trend: 'stable' },
  { name: 'Marketing Team', lead: 'David Wilson', score: 87, members: 5, trend: 'down' }
];

const teamGrowthData = [
  { category: 'Skill Development', score: 85, target: 80 },
  { category: 'Goal Achievement', score: 92, target: 85 },
  { category: 'Team Satisfaction', score: 88, target: 90 },
  { category: 'Knowledge Sharing', score: 78, target: 75 },
  { category: 'Innovation Index', score: 82, target: 80 }
];

export function TeamAnalytics({ user }: TeamAnalyticsProps) {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const renderRoleBasedContent = () => {
    const canViewAllTeams = ['ADMIN', 'HR', 'MANAGER'].includes(user.role);
    const canViewTeamDetails = ['ADMIN', 'HR', 'MANAGER', 'TEAMLEAD'].includes(user.role);

    return (
      <>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Teams</p>
                  <p className="text-3xl font-bold text-foreground">12</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary">89 members</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-muted rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Team Score</p>
                  <p className="text-3xl font-bold text-foreground">90.5</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+2.3%</span>
                  </div>
                </div>
                <div className="p-3 bg-success-muted rounded-lg">
                  <Award className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <p className="text-3xl font-bold text-foreground">4.4</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-warning" />
                    <span className="text-sm text-warning">out of 5</span>
                  </div>
                </div>
                <div className="p-3 bg-warning-muted rounded-lg">
                  <UserCheck className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Retention Rate</p>
                  <p className="text-3xl font-bold text-foreground">93%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+1.5%</span>
                  </div>
                </div>
                <div className="p-3 bg-success-muted rounded-lg">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Team Performance Trends */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Team Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={teamPerformanceData}>
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
                      <Line type="monotone" dataKey="teamA" stroke="#4285f4" strokeWidth={2} name="Team A" />
                      <Line type="monotone" dataKey="teamB" stroke="#34a853" strokeWidth={2} name="Team B" />
                      <Line type="monotone" dataKey="teamC" stroke="#fbc02d" strokeWidth={2} name="Team C" />
                      <Line type="monotone" dataKey="teamD" stroke="#ea4335" strokeWidth={2} name="Team D" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Performing Teams */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Top Performing Teams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformingTeams.map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{team.name}</h4>
                            <p className="text-sm text-muted-foreground">{team.lead} • {team.members} members</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {team.trend === 'up' && <TrendingUp className="h-4 w-4 text-success" />}
                            {team.trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive" />}
                            {team.trend === 'stable' && <div className="w-4 h-4 bg-warning rounded-full" />}
                          </div>
                          <Badge variant="secondary" className="text-lg font-semibold">
                            {team.score}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Metrics Overview */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Team Metrics Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-muted-foreground">Team</th>
                        <th className="text-left p-3 text-muted-foreground">Lead</th>
                        <th className="text-left p-3 text-muted-foreground">Members</th>
                        <th className="text-left p-3 text-muted-foreground">Performance</th>
                        <th className="text-left p-3 text-muted-foreground">Goals</th>
                        <th className="text-left p-3 text-muted-foreground">Satisfaction</th>
                        <th className="text-left p-3 text-muted-foreground">Retention</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMetricsData.map((team, index) => (
                        <tr key={index} className="border-b border-border hover:bg-surface">
                          <td className="p-3 font-medium">{team.team}</td>
                          <td className="p-3">{team.lead}</td>
                          <td className="p-3">{team.members}</td>
                          <td className="p-3">
                            <Badge variant={team.avgPerformance >= 90 ? 'default' : team.avgPerformance >= 80 ? 'secondary' : 'destructive'}>
                              {team.avgPerformance}%
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{team.goalsCompleted}/{team.totalGoals}</span>
                              <div className="flex-1 bg-border rounded-full h-2 w-16">
                                <div 
                                  className="h-2 bg-success rounded-full" 
                                  style={{ width: `${(team.goalsCompleted / team.totalGoals) * 100}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-warning" />
                              <span>{team.satisfaction}</span>
                            </div>
                          </td>
                          <td className="p-3 text-success font-medium">{team.retention}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Team Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={teamMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="team" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="avgPerformance" fill="#4285f4" name="Performance" />
                    <Bar dataKey="productivity" fill="#34a853" name="Productivity" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMetricsData.map((team, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{team.team}</h3>
                        <Badge variant="secondary">{team.avgPerformance}%</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Team Lead</span>
                          <span className="font-medium">{team.lead}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Members</span>
                          <span className="font-medium">{team.members}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Productivity</span>
                          <span className="font-medium text-success">{team.productivity}%</span>
                        </div>
                        <Progress value={team.avgPerformance} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Team Skills Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={skillsRadarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--muted-foreground)' }} />
                    <PolarRadiusAxis tick={{ fill: 'var(--muted-foreground)' }} />
                    <Radar name="Team A" dataKey="teamA" stroke="#4285f4" fill="#4285f4" fillOpacity={0.3} />
                    <Radar name="Team B" dataKey="teamB" stroke="#34a853" fill="#34a853" fillOpacity={0.3} />
                    <Radar name="Team C" dataKey="teamC" stroke="#fbc02d" fill="#fbc02d" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsRadarData.map((skill, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">{skill.skill}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Team A</span>
                          <div className="flex items-center gap-2">
                            <Progress value={skill.teamA} className="h-2 w-20" />
                            <span className="text-sm font-medium">{skill.teamA}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Team B</span>
                          <div className="flex items-center gap-2">
                            <Progress value={skill.teamB} className="h-2 w-20" />
                            <span className="text-sm font-medium">{skill.teamB}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Team C</span>
                          <div className="flex items-center gap-2">
                            <Progress value={skill.teamC} className="h-2 w-20" />
                            <span className="text-sm font-medium">{skill.teamC}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Collaboration Tab */}
          <TabsContent value="collaboration" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Team Collaboration Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={teamCollaborationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="team" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="collaborationScore" fill="#4285f4" name="Collaboration Score" />
                    <Bar dataKey="crossTeamProjects" fill="#34a853" name="Cross-team Projects" />
                    <Bar dataKey="mentoring" fill="#fbc02d" name="Mentoring Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamCollaborationData.map((team, index) => (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">{team.team}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Collaboration Score</span>
                          <Badge variant="secondary">{team.collaborationScore}%</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Cross-team Projects</span>
                          <span className="font-medium text-primary">{team.crossTeamProjects}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Mentoring Sessions</span>
                          <span className="font-medium text-success">{team.mentoring}</span>
                        </div>
                        <Progress value={team.collaborationScore} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Growth Tab */}
          <TabsContent value="growth" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Team Growth Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teamGrowthData.map((indicator, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{indicator.category}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Target: {indicator.target}%</span>
                          <Badge variant={indicator.score >= indicator.target ? 'default' : 'secondary'}>
                            {indicator.score}%
                          </Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={indicator.score} className="h-3" />
                        <div 
                          className="absolute top-0 w-1 h-3 bg-destructive rounded"
                          style={{ left: `${indicator.target}%` }}
                        />
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
          <h1 className="text-3xl font-semibold text-foreground mb-2">Team Analytics</h1>
          <p className="text-muted-foreground">Comprehensive team performance and collaboration insights</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          {['ADMIN', 'HR', 'MANAGER'].includes(user.role) && (
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="eng-a">Engineering Team A</SelectItem>
                <SelectItem value="eng-b">Engineering Team B</SelectItem>
                <SelectItem value="sales">Sales Team</SelectItem>
                <SelectItem value="marketing">Marketing Team</SelectItem>
              </SelectContent>
            </Select>
          )}
          
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