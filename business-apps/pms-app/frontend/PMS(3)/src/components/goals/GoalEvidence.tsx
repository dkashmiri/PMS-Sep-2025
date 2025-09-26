import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import { Progress } from "../ui/progress";
import { toast } from "sonner";
import {
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Plus,
  File,
  Image,
  Video,
  Link,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Flag,
  MessageSquare,
  Paperclip,
  ExternalLink,
  Archive,
  RefreshCw
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

interface Evidence {
  id: string;
  goalId: string;
  goalTitle: string;
  title: string;
  description: string;
  type: 'DOCUMENT' | 'IMAGE' | 'VIDEO' | 'LINK' | 'CERTIFICATE' | 'REPORT' | 'OTHER';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  linkUrl?: string;
  submittedBy: string;
  submittedByName: string;
  submittedByAvatar?: string;
  submittedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_REVISION';
  reviewedBy?: string;
  reviewedByName?: string;
  reviewedDate?: string;
  reviewComments?: string;
  rating?: number;
  tags: string[];
  milestone?: string;
  isPublic: boolean;
  version: number;
  category: 'TECHNICAL' | 'PROFESSIONAL' | 'PERSONAL' | 'LEADERSHIP';
}

interface GoalEvidenceProps {
  user: User;
}

// Mock evidence data
const mockEvidence: Evidence[] = [
  {
    id: 'ev-001',
    goalId: 'goal-001',
    goalTitle: 'Complete AWS Solutions Architect Certification',
    title: 'AWS Practice Exam Results',
    description: 'Screenshots and scores from multiple AWS practice exams demonstrating readiness for certification',
    type: 'IMAGE',
    fileName: 'aws-practice-exam-results.pdf',
    fileSize: 2.4,
    submittedBy: 'user-employee',
    submittedByName: 'Sarah Johnson',
    submittedByAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=40&h=40&fit=crop&crop=face',
    submittedDate: '2025-02-28',
    status: 'APPROVED',
    reviewedBy: 'user-manager',
    reviewedByName: 'Michael Chen',
    reviewedDate: '2025-03-01',
    reviewComments: 'Excellent progress! Scores consistently above 80% show good preparation.',
    rating: 5,
    tags: ['aws', 'certification', 'practice-exam'],
    milestone: 'Pass practice exams',
    isPublic: false,
    version: 1,
    category: 'TECHNICAL'
  },
  {
    id: 'ev-002',
    goalId: 'goal-001',
    goalTitle: 'Complete AWS Solutions Architect Certification',
    title: 'Hands-on Lab Completion Certificate',
    description: 'Certificate of completion for AWS hands-on labs covering EC2, S3, VPC, and RDS',
    type: 'CERTIFICATE',
    fileName: 'aws-labs-certificate.pdf',
    fileSize: 1.2,
    submittedBy: 'user-employee',
    submittedByName: 'Sarah Johnson',
    submittedByAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=40&h=40&fit=crop&crop=face',
    submittedDate: '2025-02-15',
    status: 'APPROVED',
    reviewedBy: 'user-manager',
    reviewedByName: 'Michael Chen',
    reviewedDate: '2025-02-16',
    reviewComments: 'Great work on completing the hands-on labs. This shows practical application of knowledge.',
    rating: 4,
    tags: ['aws', 'hands-on', 'labs', 'certificate'],
    milestone: 'Complete course modules',
    isPublic: true,
    version: 1,
    category: 'TECHNICAL'
  },
  {
    id: 'ev-003',
    goalId: 'goal-002',
    goalTitle: 'Lead Cross-functional Project Initiative',
    title: 'Project Kickoff Meeting Minutes',
    description: 'Meeting minutes from the project kickoff session with all team members and stakeholders',
    type: 'DOCUMENT',
    fileName: 'project-kickoff-minutes.docx',
    fileSize: 0.8,
    submittedBy: 'user-employee',
    submittedByName: 'Sarah Johnson',
    submittedByAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=40&h=40&fit=crop&crop=face',
    submittedDate: '2025-02-12',
    status: 'PENDING',
    tags: ['project-management', 'kickoff', 'meeting-minutes'],
    milestone: 'Team formation and kickoff',
    isPublic: false,
    version: 1,
    category: 'LEADERSHIP'
  },
  {
    id: 'ev-004',
    goalId: 'goal-003',
    goalTitle: 'Implement Automated Code Review Process',
    title: 'Code Review Tool Implementation Demo',
    description: 'Video demonstration of the implemented automated code review process and its impact on workflow',
    type: 'VIDEO',
    fileName: 'code-review-demo.mp4',
    fileSize: 15.6,
    submittedBy: 'user-employee',
    submittedByName: 'Sarah Johnson',
    submittedByAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=40&h=40&fit=crop&crop=face',
    submittedDate: '2025-01-10',
    status: 'APPROVED',
    reviewedBy: 'user-teamlead',
    reviewedByName: 'Jessica Wong',
    reviewedDate: '2025-01-11',
    reviewComments: 'Excellent demonstration! The 45% reduction in review time is impressive.',
    rating: 5,
    tags: ['automation', 'code-review', 'demo', 'workflow'],
    milestone: 'Implementation and configuration',
    isPublic: true,
    version: 2,
    category: 'PROFESSIONAL'
  },
  {
    id: 'ev-005',
    goalId: 'goal-003',
    goalTitle: 'Implement Automated Code Review Process',
    title: 'Performance Metrics Report',
    description: 'Detailed report showing before/after metrics for code review efficiency',
    type: 'REPORT',
    linkUrl: 'https://internal-dashboard.company.com/code-review-metrics',
    submittedBy: 'user-employee',
    submittedByName: 'Sarah Johnson',
    submittedByAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b512c24e?w=40&h=40&fit=crop&crop=face',
    submittedDate: '2025-01-15',
    status: 'APPROVED',
    reviewedBy: 'user-manager',
    reviewedByName: 'Michael Chen',
    reviewedDate: '2025-01-16',
    reviewComments: 'Outstanding results! This exceeds the target reduction of 30%.',
    rating: 5,
    tags: ['metrics', 'performance', 'report', 'efficiency'],
    milestone: 'Monitoring and optimization',
    isPublic: true,
    version: 1,
    category: 'PROFESSIONAL'
  }
];

export function GoalEvidence({ user }: GoalEvidenceProps) {
  const [evidence, setEvidence] = useState<Evidence[]>(mockEvidence);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [filterGoal, setFilterGoal] = useState('ALL');
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const [uploadForm, setUploadForm] = useState({
    goalId: '',
    title: '',
    description: '',
    type: 'DOCUMENT' as Evidence['type'],
    linkUrl: '',
    milestone: '',
    tags: '',
    isPublic: false
  });

  const [reviewForm, setReviewForm] = useState({
    status: 'APPROVED' as Evidence['status'],
    comments: '',
    rating: 5
  });

  // Filter evidence
  const filteredEvidence = evidence.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.goalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    const matchesType = filterType === 'ALL' || item.type === filterType;
    const matchesGoal = filterGoal === 'ALL' || item.goalId === filterGoal;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my' && item.submittedBy === user.id) ||
                      (activeTab === 'pending' && item.status === 'PENDING') ||
                      (activeTab === 'approved' && item.status === 'APPROVED') ||
                      (activeTab === 'public' && item.isPublic);
    
    return matchesSearch && matchesStatus && matchesType && matchesGoal && matchesTab;
  });

  // Statistics
  const stats = {
    total: evidence.length,
    pending: evidence.filter(e => e.status === 'PENDING').length,
    approved: evidence.filter(e => e.status === 'APPROVED').length,
    rejected: evidence.filter(e => e.status === 'REJECTED').length,
    avgRating: Math.round((evidence.filter(e => e.rating).reduce((acc, e) => acc + (e.rating || 0), 0) / evidence.filter(e => e.rating).length) * 10) / 10,
    public: evidence.filter(e => e.isPublic).length
  };

  const handleUpload = () => {
    const newEvidence: Evidence = {
      id: `ev-${Date.now()}`,
      ...uploadForm,
      submittedBy: user.id,
      submittedByName: user.name,
      submittedByAvatar: user.avatar,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      tags: uploadForm.tags ? uploadForm.tags.split(',').map(t => t.trim()) : [],
      version: 1,
      category: 'TECHNICAL',
      goalTitle: 'Selected Goal Title' // In real app, would get from goalId
    };
    
    setEvidence([newEvidence, ...evidence]);
    setShowUploadModal(false);
    resetUploadForm();
    toast.success("Evidence uploaded successfully!");
  };

  const handleReview = () => {
    if (!selectedEvidence) return;
    
    const updatedEvidence = evidence.map(item => 
      item.id === selectedEvidence.id 
        ? {
            ...item,
            status: reviewForm.status,
            reviewComments: reviewForm.comments,
            rating: reviewForm.rating,
            reviewedBy: user.id,
            reviewedByName: user.name,
            reviewedDate: new Date().toISOString().split('T')[0]
          }
        : item
    );
    
    setEvidence(updatedEvidence);
    setShowReviewModal(false);
    setSelectedEvidence(null);
    resetReviewForm();
    toast.success("Evidence reviewed successfully!");
  };

  const resetUploadForm = () => {
    setUploadForm({
      goalId: '',
      title: '',
      description: '',
      type: 'DOCUMENT',
      linkUrl: '',
      milestone: '',
      tags: '',
      isPublic: false
    });
  };

  const resetReviewForm = () => {
    setReviewForm({
      status: 'APPROVED',
      comments: '',
      rating: 5
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DOCUMENT': return <File className="w-4 h-4 text-blue-500" />;
      case 'IMAGE': return <Image className="w-4 h-4 text-green-500" />;
      case 'VIDEO': return <Video className="w-4 h-4 text-purple-500" />;
      case 'LINK': return <Link className="w-4 h-4 text-orange-500" />;
      case 'CERTIFICATE': return <Award className="w-4 h-4 text-yellow-500" />;
      case 'REPORT': return <BarChart3 className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'NEEDS_REVISION': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1) return `${(size * 1024).toFixed(0)} KB`;
    return `${size.toFixed(1)} MB`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            Evidence Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload, review, and manage goal evidence and supporting documents
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Upload Evidence
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Evidence</DialogTitle>
                <DialogDescription>
                  Upload supporting evidence for your goals
                </DialogDescription>
              </DialogHeader>
              <EvidenceUploadForm
                formData={uploadForm}
                setFormData={setUploadForm}
                onSubmit={handleUpload}
                onCancel={() => setShowUploadModal(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Evidence</p>
                <p className="text-2xl text-blue-600">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl text-red-600">{stats.rejected}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl text-purple-600">{stats.avgRating}</p>
              </div>
              <Star className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Public</p>
                <p className="text-2xl text-orange-600">{stats.public}</p>
              </div>
              <Eye className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search evidence by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="NEEDS_REVISION">Needs Revision</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="DOCUMENT">Document</SelectItem>
                <SelectItem value="IMAGE">Image</SelectItem>
                <SelectItem value="VIDEO">Video</SelectItem>
                <SelectItem value="LINK">Link</SelectItem>
                <SelectItem value="CERTIFICATE">Certificate</SelectItem>
                <SelectItem value="REPORT">Report</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterGoal} onValueChange={setFilterGoal}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Goals</SelectItem>
                <SelectItem value="goal-001">AWS Certification</SelectItem>
                <SelectItem value="goal-002">Project Leadership</SelectItem>
                <SelectItem value="goal-003">Code Review Process</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Evidence ({evidence.length})</TabsTrigger>
          <TabsTrigger value="my">My Uploads ({evidence.filter(e => e.submittedBy === user.id).length})</TabsTrigger>
          <TabsTrigger value="pending">Pending Review ({evidence.filter(e => e.status === 'PENDING').length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({evidence.filter(e => e.status === 'APPROVED').length})</TabsTrigger>
          <TabsTrigger value="public">Public ({evidence.filter(e => e.isPublic).length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredEvidence.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Evidence Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== 'ALL' || filterType !== 'ALL' || filterGoal !== 'ALL'
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Upload your first evidence to get started.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvidence.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {/* Evidence Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(item.type)}
                          <h3 className="font-medium">{item.title}</h3>
                          {item.isPublic && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              Public
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {item.description}
                        </p>
                        <p className="text-xs text-blue-600 mb-3">
                          Goal: {item.goalTitle}
                        </p>
                        
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                            {item.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.milestone && (
                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                              {item.milestone}
                            </Badge>
                          )}
                          {item.rating && (
                            <div className="flex items-center gap-1">
                              {renderStars(item.rating)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedEvidence(item)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {(user.role === 'MANAGER' || user.role === 'TEAMLEAD' || user.role === 'HR') && item.status === 'PENDING' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setSelectedEvidence(item);
                              setShowReviewModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        {item.linkUrl ? (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* File Info */}
                    {item.fileName && (
                      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <Paperclip className="w-4 h-4" />
                        <span>{item.fileName}</span>
                        {item.fileSize && (
                          <span className="text-xs">({formatFileSize(item.fileSize)})</span>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    {item.tags.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap mb-3">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                            #{tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{item.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t text-sm">
                      <div className="flex items-center gap-2">
                        <img 
                          src={item.submittedByAvatar} 
                          alt={item.submittedByName}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-muted-foreground">{item.submittedByName}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{item.submittedDate}</span>
                        </div>
                        {item.version > 1 && (
                          <Badge variant="outline" className="text-xs">
                            v{item.version}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Review Info */}
                    {item.status !== 'PENDING' && item.reviewedBy && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Reviewed by {item.reviewedByName} on {item.reviewedDate}
                          </span>
                          {item.rating && (
                            <div className="flex items-center gap-1">
                              {renderStars(item.rating)}
                            </div>
                          )}
                        </div>
                        {item.reviewComments && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            "{item.reviewComments}"
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Evidence Detail Modal */}
      {selectedEvidence && !showReviewModal && (
        <Dialog open={!!selectedEvidence} onOpenChange={() => setSelectedEvidence(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getTypeIcon(selectedEvidence.type)}
                {selectedEvidence.title}
              </DialogTitle>
              <DialogDescription>
                Evidence details and review information
              </DialogDescription>
            </DialogHeader>
            <EvidenceDetails evidence={selectedEvidence} onClose={() => setSelectedEvidence(null)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Evidence</DialogTitle>
            <DialogDescription>
              Review and provide feedback on submitted evidence
            </DialogDescription>
          </DialogHeader>
          <EvidenceReviewForm
            formData={reviewForm}
            setFormData={setReviewForm}
            evidence={selectedEvidence}
            onSubmit={handleReview}
            onCancel={() => {
              setShowReviewModal(false);
              setSelectedEvidence(null);
              resetReviewForm();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Evidence Upload Form Component
interface EvidenceUploadFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

function EvidenceUploadForm({ formData, setFormData, onSubmit, onCancel }: EvidenceUploadFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="goalId">Select Goal *</Label>
        <Select
          value={formData.goalId}
          onValueChange={(value) => setFormData({ ...formData, goalId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="goal-001">Complete AWS Solutions Architect Certification</SelectItem>
            <SelectItem value="goal-002">Lead Cross-functional Project Initiative</SelectItem>
            <SelectItem value="goal-003">Implement Automated Code Review Process</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Evidence Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter evidence title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Evidence Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DOCUMENT">Document</SelectItem>
              <SelectItem value="IMAGE">Image</SelectItem>
              <SelectItem value="VIDEO">Video</SelectItem>
              <SelectItem value="LINK">Link</SelectItem>
              <SelectItem value="CERTIFICATE">Certificate</SelectItem>
              <SelectItem value="REPORT">Report</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the evidence and its relevance to your goal"
          rows={3}
        />
      </div>

      {formData.type === 'LINK' && (
        <div className="space-y-2">
          <Label htmlFor="linkUrl">Link URL</Label>
          <Input
            id="linkUrl"
            type="url"
            value={formData.linkUrl}
            onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="milestone">Related Milestone (Optional)</Label>
          <Input
            id="milestone"
            value={formData.milestone}
            onChange={(e) => setFormData({ ...formData, milestone: e.target.value })}
            placeholder="e.g., Complete course modules"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="certification, aws, exam"
          />
        </div>
      </div>

      {formData.type !== 'LINK' && (
        <div className="space-y-2">
          <Label>File Upload</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag and drop your file here, or click to browse
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Choose File
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPublic"
          checked={formData.isPublic}
          onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
          className="h-4 w-4"
        />
        <Label htmlFor="isPublic" className="text-sm">
          Make this evidence publicly visible to other team members
        </Label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          Upload Evidence
        </Button>
      </div>
    </div>
  );
}

// Evidence Review Form Component
interface EvidenceReviewFormProps {
  formData: any;
  setFormData: (data: any) => void;
  evidence: Evidence | null;
  onSubmit: () => void;
  onCancel: () => void;
}

function EvidenceReviewForm({ formData, setFormData, evidence, onSubmit, onCancel }: EvidenceReviewFormProps) {
  if (!evidence) return null;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2">{evidence.title}</h4>
        <p className="text-sm text-muted-foreground">{evidence.description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Review Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
            <SelectItem value="NEEDS_REVISION">Needs Revision</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Rating (1-5 stars)</Label>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setFormData({ ...formData, rating: i + 1 })}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  i < formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {formData.rating} star{formData.rating !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comments">Review Comments</Label>
        <Textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          placeholder="Provide feedback and comments..."
          rows={4}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          Submit Review
        </Button>
      </div>
    </div>
  );
}

// Evidence Details Component
interface EvidenceDetailsProps {
  evidence: Evidence;
  onClose: () => void;
}

function EvidenceDetails({ evidence, onClose }: EvidenceDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Evidence Header */}
      <div className="border-b pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {getTypeIcon(evidence.type)}
            <Badge variant="outline">{evidence.type}</Badge>
            <Badge className={getStatusColor(evidence.status)}>{evidence.status}</Badge>
            {evidence.isPublic && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Public
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {evidence.rating && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < evidence.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
            <Badge variant="outline">v{evidence.version}</Badge>
          </div>
        </div>
        <p className="text-muted-foreground">{evidence.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div>
          <h4 className="font-medium mb-3">Evidence Information</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Goal</span>
              <span className="font-medium">{evidence.goalTitle}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Category</span>
              <span>{evidence.category}</span>
            </div>
            {evidence.milestone && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Milestone</span>
                <span>{evidence.milestone}</span>
              </div>
            )}
            {evidence.fileName && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">File</span>
                <span>{evidence.fileName}</span>
              </div>
            )}
            {evidence.fileSize && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Size</span>
                <span>{formatFileSize(evidence.fileSize)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Submission Details */}
        <div>
          <h4 className="font-medium mb-3">Submission Details</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <img 
                src={evidence.submittedByAvatar} 
                alt={evidence.submittedByName}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-muted-foreground">Submitted by</span>
              <span className="font-medium">{evidence.submittedByName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Submitted on</span>
              <span>{evidence.submittedDate}</span>
            </div>
            {evidence.reviewedBy && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reviewed by</span>
                  <span>{evidence.reviewedByName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reviewed on</span>
                  <span>{evidence.reviewedDate}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {evidence.tags.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {evidence.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Review Comments */}
      {evidence.reviewComments && (
        <div>
          <h4 className="font-medium mb-3">Review Comments</h4>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm">{evidence.reviewComments}</p>
            {evidence.rating && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">Rating:</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < evidence.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="flex items-center gap-2">
          {evidence.linkUrl ? (
            <Button variant="outline" asChild>
              <a href={evidence.linkUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Link
              </a>
            </Button>
          ) : (
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
        <Button onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

// Helper functions (reused)
function getTypeIcon(type: string) {
  switch (type) {
    case 'DOCUMENT': return <File className="w-4 h-4 text-blue-500" />;
    case 'IMAGE': return <Image className="w-4 h-4 text-green-500" />;
    case 'VIDEO': return <Video className="w-4 h-4 text-purple-500" />;
    case 'LINK': return <Link className="w-4 h-4 text-orange-500" />;
    case 'CERTIFICATE': return <Award className="w-4 h-4 text-yellow-500" />;
    case 'REPORT': return <BarChart3 className="w-4 h-4 text-red-500" />;
    default: return <FileText className="w-4 h-4 text-gray-500" />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-800';
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'REJECTED': return 'bg-red-100 text-red-800';
    case 'NEEDS_REVISION': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function formatFileSize(size: number) {
  if (size < 1) return `${(size * 1024).toFixed(0)} KB`;
  return `${size.toFixed(1)} MB`;
}