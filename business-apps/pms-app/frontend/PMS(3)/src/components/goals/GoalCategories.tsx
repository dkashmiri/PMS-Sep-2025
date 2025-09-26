import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { toast } from "sonner";
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Target,
  TrendingUp,
  Users,
  Award,
  Lightbulb,
  BookOpen,
  Settings,
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

interface GoalCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  totalGoals: number;
  completedGoals: number;
  avgProgress: number;
  departmentAccess: string[];
  requiredApproval: boolean;
  maxGoalsPerPerson: number;
  createdDate: string;
  lastModified: string;
}

interface GoalCategoriesProps {
  user: User;
}

// Mock category data
const mockCategories: GoalCategory[] = [
  {
    id: 'cat-001',
    name: 'Technical Excellence',
    description: 'Goals focused on technical skills, certifications, and engineering capabilities',
    icon: 'Target',
    color: 'blue',
    isActive: true,
    totalGoals: 45,
    completedGoals: 32,
    avgProgress: 78,
    departmentAccess: ['Engineering', 'IT', 'Product'],
    requiredApproval: true,
    maxGoalsPerPerson: 5,
    createdDate: '2024-01-15',
    lastModified: '2025-02-28'
  },
  {
    id: 'cat-002',
    name: 'Professional Development',
    description: 'Career growth, process improvement, and professional skills enhancement',
    icon: 'TrendingUp',
    color: 'green',
    isActive: true,
    totalGoals: 38,
    completedGoals: 28,
    avgProgress: 72,
    departmentAccess: ['All'],
    requiredApproval: false,
    maxGoalsPerPerson: 3,
    createdDate: '2024-01-15',
    lastModified: '2025-01-20'
  },
  {
    id: 'cat-003',
    name: 'Leadership & Management',
    description: 'Leadership skills, team management, and organizational impact goals',
    icon: 'Users',
    color: 'purple',
    isActive: true,
    totalGoals: 42,
    completedGoals: 25,
    avgProgress: 65,
    departmentAccess: ['All'],
    requiredApproval: true,
    maxGoalsPerPerson: 4,
    createdDate: '2024-01-15',
    lastModified: '2025-02-10'
  },
  {
    id: 'cat-004',
    name: 'Personal Growth',
    description: 'Individual development, soft skills, and personal achievement goals',
    icon: 'Lightbulb',
    color: 'orange',
    isActive: true,
    totalGoals: 31,
    completedGoals: 22,
    avgProgress: 74,
    departmentAccess: ['All'],
    requiredApproval: false,
    maxGoalsPerPerson: 2,
    createdDate: '2024-01-15',
    lastModified: '2025-01-25'
  },
  {
    id: 'cat-005',
    name: 'Innovation & Research',
    description: 'Research initiatives, innovation projects, and experimental goals',
    icon: 'Lightbulb',
    color: 'red',
    isActive: false,
    totalGoals: 8,
    completedGoals: 3,
    avgProgress: 45,
    departmentAccess: ['Engineering', 'Product', 'Research'],
    requiredApproval: true,
    maxGoalsPerPerson: 2,
    createdDate: '2024-06-01',
    lastModified: '2024-12-15'
  }
];

export function GoalCategories({ user }: GoalCategoriesProps) {
  const [categories, setCategories] = useState<GoalCategory[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Target',
    color: 'blue',
    isActive: true,
    departmentAccess: [] as string[],
    requiredApproval: true,
    maxGoalsPerPerson: 3
  });

  // Filter categories
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || 
                        (filterStatus === 'ACTIVE' && category.isActive) ||
                        (filterStatus === 'INACTIVE' && !category.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateCategory = () => {
    const newCategory: GoalCategory = {
      id: `cat-${Date.now()}`,
      ...formData,
      totalGoals: 0,
      completedGoals: 0,
      avgProgress: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    setCategories([newCategory, ...categories]);
    setShowCreateModal(false);
    resetForm();
    toast.success("Goal category created successfully!");
  };

  const handleEditCategory = () => {
    if (!selectedCategory) return;
    
    const updatedCategories = categories.map(cat => 
      cat.id === selectedCategory.id 
        ? { 
            ...cat, 
            ...formData,
            lastModified: new Date().toISOString().split('T')[0]
          }
        : cat
    );
    
    setCategories(updatedCategories);
    setShowEditModal(false);
    setSelectedCategory(null);
    resetForm();
    toast.success("Goal category updated successfully!");
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: 'Target',
      color: 'blue',
      isActive: true,
      departmentAccess: [],
      requiredApproval: true,
      maxGoalsPerPerson: 3
    });
  };

  const openEditModal = (category: GoalCategory) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      isActive: category.isActive,
      departmentAccess: category.departmentAccess,
      requiredApproval: category.requiredApproval,
      maxGoalsPerPerson: category.maxGoalsPerPerson
    });
    setShowEditModal(true);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      default: return <Layers className="w-6 h-6" />;
    }
  };

  // Statistics
  const stats = {
    total: categories.length,
    active: categories.filter(c => c.isActive).length,
    totalGoals: categories.reduce((acc, cat) => acc + cat.totalGoals, 0),
    avgProgress: Math.round(categories.reduce((acc, cat) => acc + cat.avgProgress, 0) / categories.length)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            Goal Categories Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage goal categories for better organization and tracking
          </p>
        </div>
        {(user.role === 'ADMIN' || user.role === 'HR') && (
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Goal Category</DialogTitle>
                <DialogDescription>
                  Create a new goal category to organize and classify goals
                </DialogDescription>
              </DialogHeader>
              <CategoryForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateCategory}
                onCancel={() => setShowCreateModal(false)}
                mode="create"
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Categories</p>
                <p className="text-2xl text-blue-600">{stats.total}</p>
              </div>
              <Layers className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl text-green-600">{stats.active}</p>
              </div>
              <Settings className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <p className="text-2xl text-purple-600">{stats.totalGoals}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl text-orange-600">{stats.avgProgress}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search categories by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="ACTIVE">Active Only</SelectItem>
                <SelectItem value="INACTIVE">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {/* Category Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${getColorClasses(category.color)}`}>
                    {getIconComponent(category.icon)}
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <Badge 
                      variant={category.isActive ? "default" : "secondary"}
                      className="text-xs mt-1"
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                {(user.role === 'ADMIN' || user.role === 'HR') && (
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(category)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {category.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-blue-600">{category.totalGoals}</p>
                  <p className="text-xs text-muted-foreground">Total Goals</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-green-600">{category.completedGoals}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-purple-600">{category.avgProgress}%</p>
                  <p className="text-xs text-muted-foreground">Avg Progress</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Category Progress</span>
                  <span className="text-xs font-medium">{category.avgProgress}%</span>
                </div>
                <Progress value={category.avgProgress} className="h-2" />
              </div>

              {/* Department Access */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Department Access:</p>
                <div className="flex flex-wrap gap-1">
                  {category.departmentAccess.slice(0, 3).map((dept, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {dept}
                    </Badge>
                  ))}
                  {category.departmentAccess.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.departmentAccess.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span>Max Goals: {category.maxGoalsPerPerson}</span>
                  {category.requiredApproval && (
                    <Badge variant="outline" className="text-xs">
                      Approval Required
                    </Badge>
                  )}
                </div>
                <span>Modified: {category.lastModified}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Categories Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterStatus !== 'ALL'
                ? 'Try adjusting your search criteria or filters.'
                : 'Create your first goal category to get started.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Goal Category</DialogTitle>
            <DialogDescription>
              Update category settings and configuration
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleEditCategory}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedCategory(null);
              resetForm();
            }}
            mode="edit"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Category Form Component
interface CategoryFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

function CategoryForm({ formData, setFormData, onSubmit, onCancel, mode }: CategoryFormProps) {
  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'IT', 'Product', 'Research'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter category name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maxGoalsPerPerson">Max Goals Per Person</Label>
          <Input
            id="maxGoalsPerPerson"
            type="number"
            min="1"
            max="10"
            value={formData.maxGoalsPerPerson}
            onChange={(e) => setFormData({ ...formData, maxGoalsPerPerson: parseInt(e.target.value) || 3 })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the purpose and scope of this category"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Select
            value={formData.icon}
            onValueChange={(value) => setFormData({ ...formData, icon: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Target">Target</SelectItem>
              <SelectItem value="TrendingUp">Trending Up</SelectItem>
              <SelectItem value="Users">Users</SelectItem>
              <SelectItem value="Lightbulb">Lightbulb</SelectItem>
              <SelectItem value="Award">Award</SelectItem>
              <SelectItem value="BookOpen">Book Open</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="color">Color Theme</Label>
          <Select
            value={formData.color}
            onValueChange={(value) => setFormData({ ...formData, color: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="red">Red</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Department Access</Label>
        <div className="grid grid-cols-3 gap-2">
          {departments.map((dept) => (
            <div key={dept} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={dept}
                checked={formData.departmentAccess.includes(dept)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({
                      ...formData,
                      departmentAccess: [...formData.departmentAccess, dept]
                    });
                  } else {
                    setFormData({
                      ...formData,
                      departmentAccess: formData.departmentAccess.filter((d: string) => d !== dept)
                    });
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor={dept} className="text-sm">{dept}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="h-4 w-4"
          />
          <Label htmlFor="isActive" className="text-sm">
            Category is active and available for use
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="requiredApproval"
            checked={formData.requiredApproval}
            onChange={(e) => setFormData({ ...formData, requiredApproval: e.target.checked })}
            className="h-4 w-4"
          />
          <Label htmlFor="requiredApproval" className="text-sm">
            Require manager approval for goals in this category
          </Label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          {mode === 'create' ? 'Create Category' : 'Update Category'}
        </Button>
      </div>
    </div>
  );
}