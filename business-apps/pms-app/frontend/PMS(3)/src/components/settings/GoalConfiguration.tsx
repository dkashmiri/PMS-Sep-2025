import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { toast } from "sonner";
import {
  Target,
  Settings,
  TrendingUp,
  Clock,
  Users,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  BarChart3
} from 'lucide-react';

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

interface GoalConfigurationProps {
  user: User;
}

interface GoalWeight {
  id: string;
  category: string;
  weight: number;
  description: string;
}

interface GoalStatus {
  id: string;
  name: string;
  color: string;
  description: string;
  isActive: boolean;
}

export function GoalConfiguration({ user }: GoalConfigurationProps) {
  const [goalSettings, setGoalSettings] = useState({
    defaultGoalDuration: '12',
    maxGoalsPerUser: '10',
    requireManagerApproval: true,
    allowSelfAssignment: true,
    autoArchiveCompleted: true,
    enableGoalTemplates: true,
    requireEvidence: true,
    enableGoalAlignment: true,
    goalWeightLimit: '100',
    defaultReminderDays: '7'
  });

  const [scoringSettings, setScoringSettings] = useState({
    scoringMethod: 'weighted',
    minPassingScore: '60',
    excellenceThreshold: '90',
    enablePeerReview: false,
    peerReviewWeight: '20',
    selfAssessmentWeight: '30',
    managerReviewWeight: '70',
    enableCalibration: true
  });

  const [goalWeights, setGoalWeights] = useState<GoalWeight[]>([
    { id: '1', category: 'Strategic', weight: 40, description: 'Long-term strategic objectives' },
    { id: '2', category: 'Operational', weight: 35, description: 'Day-to-day operational goals' },
    { id: '3', category: 'Development', weight: 15, description: 'Personal and professional development' },
    { id: '4', category: 'Innovation', weight: 10, description: 'Innovation and improvement initiatives' }
  ]);

  const [goalStatuses, setGoalStatuses] = useState<GoalStatus[]>([
    { id: '1', name: 'Draft', color: 'gray', description: 'Goal is being drafted', isActive: true },
    { id: '2', name: 'Active', color: 'blue', description: 'Goal is active and in progress', isActive: true },
    { id: '3', name: 'At Risk', color: 'yellow', description: 'Goal is at risk of not being achieved', isActive: true },
    { id: '4', name: 'Completed', color: 'green', description: 'Goal has been completed successfully', isActive: true },
    { id: '5', name: 'Cancelled', color: 'red', description: 'Goal has been cancelled', isActive: true },
    { id: '6', name: 'On Hold', color: 'orange', description: 'Goal is temporarily on hold', isActive: true }
  ]);

  const handleGoalSettingsSave = () => {
    // API call to save goal settings
    toast.success("Goal settings saved successfully!");
  };

  const handleScoringSettingsSave = () => {
    // API call to save scoring settings
    toast.success("Scoring settings saved successfully!");
  };

  const handleWeightUpdate = (id: string, weight: number) => {
    setGoalWeights(prev => prev.map(item => 
      item.id === id ? { ...item, weight } : item
    ));
  };

  const handleStatusToggle = (id: string) => {
    setGoalStatuses(prev => prev.map(status => 
      status.id === id ? { ...status, isActive: !status.isActive } : status
    ));
  };

  const totalWeight = goalWeights.reduce((sum, item) => sum + item.weight, 0);

  if (user.role !== 'ADMIN' && user.role !== 'HR') {
    return (
      <div className="spacing-lg">
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-premium">You don't have permission to access goal configuration.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="spacing-lg space-y-6">
      <div>
        <h1>Goal Configuration</h1>
        <p className="text-muted-premium">Configure goal management settings and scoring parameters</p>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="scoring" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Scoring
          </TabsTrigger>
          <TabsTrigger value="weights" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Weights
          </TabsTrigger>
          <TabsTrigger value="statuses" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Statuses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Goal Management Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultGoalDuration">Default Goal Duration (months)</Label>
                  <Input
                    id="defaultGoalDuration"
                    type="number"
                    value={goalSettings.defaultGoalDuration}
                    onChange={(e) => setGoalSettings(prev => ({ ...prev, defaultGoalDuration: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGoalsPerUser">Max Goals per User</Label>
                  <Input
                    id="maxGoalsPerUser"
                    type="number"
                    value={goalSettings.maxGoalsPerUser}
                    onChange={(e) => setGoalSettings(prev => ({ ...prev, maxGoalsPerUser: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goalWeightLimit">Goal Weight Limit (%)</Label>
                  <Input
                    id="goalWeightLimit"
                    type="number"
                    value={goalSettings.goalWeightLimit}
                    onChange={(e) => setGoalSettings(prev => ({ ...prev, goalWeightLimit: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultReminderDays">Default Reminder (days before due)</Label>
                  <Input
                    id="defaultReminderDays"
                    type="number"
                    value={goalSettings.defaultReminderDays}
                    onChange={(e) => setGoalSettings(prev => ({ ...prev, defaultReminderDays: e.target.value }))}
                    className="premium-input"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4>Goal Management Options</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Require Manager Approval</p>
                      <p className="text-muted-premium">Goals need manager approval before activation</p>
                    </div>
                    <Switch
                      checked={goalSettings.requireManagerApproval}
                      onCheckedChange={(checked) => setGoalSettings(prev => ({ ...prev, requireManagerApproval: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Allow Self-Assignment</p>
                      <p className="text-muted-premium">Users can create goals for themselves</p>
                    </div>
                    <Switch
                      checked={goalSettings.allowSelfAssignment}
                      onCheckedChange={(checked) => setGoalSettings(prev => ({ ...prev, allowSelfAssignment: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Auto-Archive Completed Goals</p>
                      <p className="text-muted-premium">Automatically archive goals when completed</p>
                    </div>
                    <Switch
                      checked={goalSettings.autoArchiveCompleted}
                      onCheckedChange={(checked) => setGoalSettings(prev => ({ ...prev, autoArchiveCompleted: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Enable Goal Templates</p>
                      <p className="text-muted-premium">Allow users to create goals from templates</p>
                    </div>
                    <Switch
                      checked={goalSettings.enableGoalTemplates}
                      onCheckedChange={(checked) => setGoalSettings(prev => ({ ...prev, enableGoalTemplates: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Require Evidence</p>
                      <p className="text-muted-premium">Require evidence upload for goal completion</p>
                    </div>
                    <Switch
                      checked={goalSettings.requireEvidence}
                      onCheckedChange={(checked) => setGoalSettings(prev => ({ ...prev, requireEvidence: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Enable Goal Alignment</p>
                      <p className="text-muted-premium">Enable goal alignment with KRAs and objectives</p>
                    </div>
                    <Switch
                      checked={goalSettings.enableGoalAlignment}
                      onCheckedChange={(checked) => setGoalSettings(prev => ({ ...prev, enableGoalAlignment: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleGoalSettingsSave} className="google-button-primary">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scoring" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Scoring Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="scoringMethod">Scoring Method</Label>
                  <Select value={scoringSettings.scoringMethod} onValueChange={(value) => setScoringSettings(prev => ({ ...prev, scoringMethod: value }))}>
                    <SelectTrigger className="premium-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weighted">Weighted Average</SelectItem>
                      <SelectItem value="simple">Simple Average</SelectItem>
                      <SelectItem value="highest">Highest Score</SelectItem>
                      <SelectItem value="median">Median Score</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minPassingScore">Minimum Passing Score (%)</Label>
                  <Input
                    id="minPassingScore"
                    type="number"
                    value={scoringSettings.minPassingScore}
                    onChange={(e) => setScoringSettings(prev => ({ ...prev, minPassingScore: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excellenceThreshold">Excellence Threshold (%)</Label>
                  <Input
                    id="excellenceThreshold"
                    type="number"
                    value={scoringSettings.excellenceThreshold}
                    onChange={(e) => setScoringSettings(prev => ({ ...prev, excellenceThreshold: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peerReviewWeight">Peer Review Weight (%)</Label>
                  <Input
                    id="peerReviewWeight"
                    type="number"
                    value={scoringSettings.peerReviewWeight}
                    onChange={(e) => setScoringSettings(prev => ({ ...prev, peerReviewWeight: e.target.value }))}
                    className="premium-input"
                    disabled={!scoringSettings.enablePeerReview}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selfAssessmentWeight">Self Assessment Weight (%)</Label>
                  <Input
                    id="selfAssessmentWeight"
                    type="number"
                    value={scoringSettings.selfAssessmentWeight}
                    onChange={(e) => setScoringSettings(prev => ({ ...prev, selfAssessmentWeight: e.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="managerReviewWeight">Manager Review Weight (%)</Label>
                  <Input
                    id="managerReviewWeight"
                    type="number"
                    value={scoringSettings.managerReviewWeight}
                    onChange={(e) => setScoringSettings(prev => ({ ...prev, managerReviewWeight: e.target.value }))}
                    className="premium-input"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4>Scoring Options</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Enable Peer Review</p>
                      <p className="text-muted-premium">Allow peer reviews in scoring calculation</p>
                    </div>
                    <Switch
                      checked={scoringSettings.enablePeerReview}
                      onCheckedChange={(checked) => setScoringSettings(prev => ({ ...prev, enablePeerReview: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Enable Score Calibration</p>
                      <p className="text-muted-premium">Allow calibration sessions for score normalization</p>
                    </div>
                    <Switch
                      checked={scoringSettings.enableCalibration}
                      onCheckedChange={(checked) => setScoringSettings(prev => ({ ...prev, enableCalibration: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleScoringSettingsSave} className="google-button-primary">
                  Save Scoring Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weights" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Goal Category Weights
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-premium">Total: {totalWeight}%</span>
                  <Badge variant={totalWeight === 100 ? "default" : "destructive"}>
                    {totalWeight === 100 ? "Balanced" : "Imbalanced"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Weight (%)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {goalWeights.map((weight) => (
                    <TableRow key={weight.id}>
                      <TableCell>{weight.category}</TableCell>
                      <TableCell className="text-muted-premium">{weight.description}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={weight.weight}
                          onChange={(e) => handleWeightUpdate(weight.id, parseInt(e.target.value) || 0)}
                          className="w-20 premium-input"
                          min="0"
                          max="100"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
                <Button className="google-button-primary">
                  Save Weights
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statuses" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Goal Status Management
                </CardTitle>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Status
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {goalStatuses.map((status) => (
                    <TableRow key={status.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div 
                            className={`w-3 h-3 rounded-full ${
                              status.color === 'gray' ? 'bg-gray-400' :
                              status.color === 'blue' ? 'bg-blue-500' :
                              status.color === 'yellow' ? 'bg-yellow-500' :
                              status.color === 'green' ? 'bg-green-500' :
                              status.color === 'red' ? 'bg-red-500' :
                              'bg-orange-500'
                            }`}
                          />
                          {status.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-premium">{status.description}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${
                            status.color === 'gray' ? 'border-gray-400 text-gray-600' :
                            status.color === 'blue' ? 'border-blue-500 text-blue-600' :
                            status.color === 'yellow' ? 'border-yellow-500 text-yellow-600' :
                            status.color === 'green' ? 'border-green-500 text-green-600' :
                            status.color === 'red' ? 'border-red-500 text-red-600' :
                            'border-orange-500 text-orange-600'
                          }`}
                        >
                          {status.color}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={status.isActive}
                          onCheckedChange={() => handleStatusToggle(status.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-end mt-4">
                <Button className="google-button-primary">
                  Save Status Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}