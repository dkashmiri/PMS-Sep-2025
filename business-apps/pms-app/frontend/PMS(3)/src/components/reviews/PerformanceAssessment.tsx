import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { 
  Target, 
  Award, 
  Star, 
  FileText, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  Plus,
  Download,
  Save,
  Eye,
  Edit,
  Send,
  Clock,
  BarChart3,
  MessageSquare,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  User
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

interface PerformanceAssessmentProps {
  user: User;
}

interface AssessmentSection {
  id: string;
  title: string;
  weight: number;
  items: AssessmentItem[];
  completed: boolean;
}

interface AssessmentItem {
  id: string;
  description: string;
  type: 'KRA' | 'Goal' | 'Competency';
  rating: number;
  comment: string;
  evidence: string[];
  targetScore: number;
  weight: number;
}

interface ReviewFormData {
  employeeId: string;
  reviewCycle: string;
  reviewType: 'Self-Assessment' | 'R1-Review' | 'R2-Review';
  sections: AssessmentSection[];
  overallRating: number;
  strengths: string;
  improvementAreas: string;
  developmentPlan: string;
  goals: string;
  managerComments?: string;
  status: 'Draft' | 'Submitted' | 'Completed';
}

interface ScoreCalculation {
  kraScore: number;
  goalScore: number;
  competencyScore: number;
  overallScore: number;
  performanceZone: 'Green' | 'Yellow' | 'Red';
  recommendation: string;
}

const mockAssessmentSections: AssessmentSection[] = [
  {
    id: 'kra-section',
    title: 'Key Result Areas (KRAs)',
    weight: 60,
    completed: false,
    items: [
      {
        id: 'kra-1',
        description: 'Software Development & Code Quality',
        type: 'KRA',
        rating: 4,
        comment: 'Consistently delivers high-quality code with minimal bugs',
        evidence: ['Code review scores', 'Bug reports', 'Performance metrics'],
        targetScore: 4,
        weight: 30
      },
      {
        id: 'kra-2',
        description: 'Project Delivery & Timeline Management',
        type: 'KRA',
        rating: 4,
        comment: 'Meets project deadlines and delivers as per specifications',
        evidence: ['Project completion reports', 'Timeline adherence'],
        targetScore: 4,
        weight: 30
      }
    ]
  },
  {
    id: 'goal-section',
    title: 'Individual Goals',
    weight: 30,
    completed: false,
    items: [
      {
        id: 'goal-1',
        description: 'Complete React.js certification',
        type: 'Goal',
        rating: 5,
        comment: 'Successfully completed certification with distinction',
        evidence: ['Certificate', 'Course completion records'],
        targetScore: 4,
        weight: 15
      },
      {
        id: 'goal-2',
        description: 'Mentor 2 junior developers',
        type: 'Goal',
        rating: 4,
        comment: 'Actively mentoring 2 junior developers with positive feedback',
        evidence: ['Mentorship feedback', 'Progress reports'],
        targetScore: 4,
        weight: 15
      }
    ]
  },
  {
    id: 'competency-section',
    title: 'Core Competencies',
    weight: 10,
    completed: false,
    items: [
      {
        id: 'comp-1',
        description: 'Leadership & Initiative',
        type: 'Competency',
        rating: 4,
        comment: 'Shows good leadership qualities and takes initiative',
        evidence: ['360 feedback', 'Project leadership examples'],
        targetScore: 4,
        weight: 5
      },
      {
        id: 'comp-2',
        description: 'Communication & Collaboration',
        type: 'Competency',
        rating: 4,
        comment: 'Excellent communication and team collaboration',
        evidence: ['Team feedback', 'Presentation skills'],
        targetScore: 4,
        weight: 5
      }
    ]
  }
];

export function PerformanceAssessment({ user }: PerformanceAssessmentProps) {
  const [activeTab, setActiveTab] = useState('assessment');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [reviewType, setReviewType] = useState<'Self-Assessment' | 'R1-Review' | 'R2-Review'>('Self-Assessment');
  const [assessmentSections, setAssessmentSections] = useState<AssessmentSection[]>(mockAssessmentSections);
  const [overallRating, setOverallRating] = useState(4);
  const [strengths, setStrengths] = useState('');
  const [improvementAreas, setImprovementAreas] = useState('');
  const [developmentPlan, setDevelopmentPlan] = useState('');
  const [goals, setGoals] = useState('');
  const [managerComments, setManagerComments] = useState('');

  const calculateScores = (): ScoreCalculation => {
    const kraItems = assessmentSections.find(s => s.id === 'kra-section')?.items || [];
    const goalItems = assessmentSections.find(s => s.id === 'goal-section')?.items || [];
    const competencyItems = assessmentSections.find(s => s.id === 'competency-section')?.items || [];

    const kraScore = kraItems.reduce((sum, item) => sum + (item.rating * item.weight), 0) / 
                    kraItems.reduce((sum, item) => sum + item.weight, 0) || 0;
    
    const goalScore = goalItems.reduce((sum, item) => sum + (item.rating * item.weight), 0) / 
                     goalItems.reduce((sum, item) => sum + item.weight, 0) || 0;
    
    const competencyScore = competencyItems.reduce((sum, item) => sum + (item.rating * item.weight), 0) / 
                           competencyItems.reduce((sum, item) => sum + item.weight, 0) || 0;

    const overallScore = (kraScore * 0.6) + (goalScore * 0.3) + (competencyScore * 0.1);

    let performanceZone: 'Green' | 'Yellow' | 'Red' = 'Red';
    let recommendation = '';

    if (overallScore >= 4.0) {
      performanceZone = 'Green';
      recommendation = 'Exceeds expectations - Consider for advancement opportunities';
    } else if (overallScore >= 3.0) {
      performanceZone = 'Yellow';
      recommendation = 'Meets expectations - Focus on development areas';
    } else {
      performanceZone = 'Red';
      recommendation = 'Below expectations - Requires improvement plan';
    }

    return {
      kraScore: Math.round(kraScore * 10) / 10,
      goalScore: Math.round(goalScore * 10) / 10,
      competencyScore: Math.round(competencyScore * 10) / 10,
      overallScore: Math.round(overallScore * 10) / 10,
      performanceZone,
      recommendation
    };
  };

  const updateItemRating = (sectionId: string, itemId: string, rating: number) => {
    setAssessmentSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items.map(item => 
              item.id === itemId ? { ...item, rating } : item
            )
          }
        : section
    ));
  };

  const updateItemComment = (sectionId: string, itemId: string, comment: string) => {
    setAssessmentSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items.map(item => 
              item.id === itemId ? { ...item, comment } : item
            )
          }
        : section
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 5: return 'Outstanding';
      case 4: return 'Exceeds Expectations';
      case 3: return 'Meets Expectations';
      case 2: return 'Below Expectations';
      case 1: return 'Unsatisfactory';
      default: return 'Not Rated';
    }
  };

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'Green': return 'bg-green-100 text-green-800';
      case 'Yellow': return 'bg-yellow-100 text-yellow-800';
      case 'Red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const scores = calculateScores();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-google-gray-900">Performance Assessment</h1>
          <p className="text-google-gray-600 mt-1">Comprehensive evaluation and scoring system</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button className="gap-2 google-button-primary">
            <Send className="w-4 h-4" />
            Submit Assessment
          </Button>
        </div>
      </div>

      {/* Assessment Context */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Assessment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="employee">Employee</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="michael-chen">Michael Chen</SelectItem>
                  <SelectItem value="emily-davis">Emily Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="review-type">Review Type</Label>
              <Select value={reviewType} onValueChange={(value: any) => setReviewType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Self-Assessment">Self-Assessment</SelectItem>
                  <SelectItem value="R1-Review">R1 Review (Team Lead)</SelectItem>
                  <SelectItem value="R2-Review">R2 Review (Manager)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cycle">Review Cycle</Label>
              <Select defaultValue="annual-2024">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual-2024">Annual Review 2024</SelectItem>
                  <SelectItem value="q4-2024">Q4 Review 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Badge className="w-full justify-center bg-orange-100 text-orange-800">
                In Progress
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Summary */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Performance Score Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-google-gray-600 mb-1">KRA Score</p>
              <p className={`text-2xl font-bold ${getRatingColor(scores.kraScore)}`}>{scores.kraScore}</p>
              <p className="text-xs text-google-gray-500">Weight: 60%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-google-gray-600 mb-1">Goal Score</p>
              <p className={`text-2xl font-bold ${getRatingColor(scores.goalScore)}`}>{scores.goalScore}</p>
              <p className="text-xs text-google-gray-500">Weight: 30%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-google-gray-600 mb-1">Competency</p>
              <p className={`text-2xl font-bold ${getRatingColor(scores.competencyScore)}`}>{scores.competencyScore}</p>
              <p className="text-xs text-google-gray-500">Weight: 10%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-yellow-100 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-sm text-google-gray-600 mb-1">Overall Score</p>
              <p className={`text-2xl font-bold ${getRatingColor(scores.overallScore)}`}>{scores.overallScore}</p>
              <p className="text-xs text-google-gray-500">Weighted Average</p>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${getZoneColor(scores.performanceZone)}`}>
                <CheckCircle className="w-8 h-8" />
              </div>
              <p className="text-sm text-google-gray-600 mb-1">Performance Zone</p>
              <Badge className={getZoneColor(scores.performanceZone)}>{scores.performanceZone}</Badge>
              <p className="text-xs text-google-gray-500 mt-1">{getRatingLabel(Math.round(scores.overallScore))}</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-1">Recommendation</p>
            <p className="text-sm text-blue-800">{scores.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assessment" className="gap-2">
            <FileText className="w-4 h-4" />
            Assessment
          </TabsTrigger>
          <TabsTrigger value="comments" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Comments
          </TabsTrigger>
          <TabsTrigger value="development" className="gap-2">
            <Lightbulb className="w-4 h-4" />
            Development
          </TabsTrigger>
          <TabsTrigger value="evidence" className="gap-2">
            <FileText className="w-4 h-4" />
            Evidence
          </TabsTrigger>
        </TabsList>

        {/* Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          {assessmentSections.map((section) => (
            <Card key={section.id} className="premium-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {section.id === 'kra-section' && <Target className="w-5 h-5 text-blue-600" />}
                    {section.id === 'goal-section' && <Award className="w-5 h-5 text-green-600" />}
                    {section.id === 'competency-section' && <Star className="w-5 h-5 text-purple-600" />}
                    {section.title}
                  </CardTitle>
                  <Badge variant="outline">{section.weight}% Weight</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id} className="border border-google-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-google-gray-900 mb-2">{item.description}</h4>
                          <div className="flex items-center gap-4 mb-3">
                            <Badge variant="outline">{item.type}</Badge>
                            <span className="text-sm text-google-gray-600">Weight: {item.weight}%</span>
                            <span className="text-sm text-google-gray-600">Target: {item.targetScore}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getRatingColor(item.rating)}`}>{item.rating}</p>
                          <p className="text-sm text-google-gray-600">{getRatingLabel(item.rating)}</p>
                        </div>
                      </div>

                      {/* Rating Slider */}
                      <div className="mb-4">
                        <Label className="text-sm font-medium mb-2 block">Rating (1-5)</Label>
                        <div className="px-3">
                          <Slider
                            value={[item.rating]}
                            onValueChange={([value]) => updateItemRating(section.id, item.id, value)}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-google-gray-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                          </div>
                        </div>
                      </div>

                      {/* Comments */}
                      <div>
                        <Label htmlFor={`comment-${item.id}`} className="text-sm font-medium mb-2 block">
                          Comments & Justification
                        </Label>
                        <Textarea
                          id={`comment-${item.id}`}
                          value={item.comment}
                          onChange={(e) => updateItemComment(section.id, item.id, e.target.value)}
                          placeholder="Provide specific examples and justification for this rating..."
                          className="min-h-20"
                        />
                      </div>

                      {/* Evidence */}
                      <div className="mt-4">
                        <Label className="text-sm font-medium mb-2 block">Evidence & Documentation</Label>
                        <div className="flex flex-wrap gap-2">
                          {item.evidence.map((evidence, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {evidence}
                            </Badge>
                          ))}
                          <Button variant="outline" size="sm" className="text-xs">
                            <Plus className="w-3 h-3 mr-1" />
                            Add Evidence
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                  Strengths & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  placeholder="Highlight key strengths, achievements, and positive contributions..."
                  className="min-h-32"
                />
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsDown className="w-5 h-5 text-orange-600" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={improvementAreas}
                  onChange={(e) => setImprovementAreas(e.target.value)}
                  placeholder="Identify specific areas where improvement is needed..."
                  className="min-h-32"
                />
              </CardContent>
            </Card>
          </div>

          {(reviewType === 'R1-Review' || reviewType === 'R2-Review') && (
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Manager Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={managerComments}
                  onChange={(e) => setManagerComments(e.target.value)}
                  placeholder="Additional manager feedback and observations..."
                  className="min-h-24"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Development Tab */}
        <TabsContent value="development" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Development Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={developmentPlan}
                  onChange={(e) => setDevelopmentPlan(e.target.value)}
                  placeholder="Outline specific development activities, training, and growth opportunities..."
                  className="min-h-32"
                />
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Future Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="Set goals and objectives for the next review period..."
                  className="min-h-32"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Overall Performance Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <RadioGroup value={overallRating.toString()} onValueChange={(value) => setOverallRating(parseInt(value))}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="rating-5" />
                    <Label htmlFor="rating-5" className="flex-1">5 - Outstanding: Consistently exceeds all expectations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="rating-4" />
                    <Label htmlFor="rating-4" className="flex-1">4 - Exceeds Expectations: Regularly surpasses requirements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="rating-3" />
                    <Label htmlFor="rating-3" className="flex-1">3 - Meets Expectations: Consistently meets all requirements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="rating-2" />
                    <Label htmlFor="rating-2" className="flex-1">2 - Below Expectations: Sometimes meets requirements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="rating-1" />
                    <Label htmlFor="rating-1" className="flex-1">1 - Unsatisfactory: Rarely meets requirements</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evidence Tab */}
        <TabsContent value="evidence" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Supporting Evidence & Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-google-gray-300 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-google-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-google-gray-900 mb-2">Upload Evidence Files</h3>
                  <p className="text-google-gray-600 mb-4">Drag & drop files or click to browse</p>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-google-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Project Report.pdf</span>
                    </div>
                    <p className="text-sm text-google-gray-600">Uploaded 2 days ago</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border border-google-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Certificate.jpg</span>
                    </div>
                    <p className="text-sm text-google-gray-600">Uploaded 1 week ago</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border border-google-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Feedback.docx</span>
                    </div>
                    <p className="text-sm text-google-gray-600">Uploaded 3 days ago</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}