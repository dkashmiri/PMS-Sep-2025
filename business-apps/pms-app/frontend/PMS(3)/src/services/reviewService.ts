import { ReviewData, EvidenceFile } from '../types/review-matrix.types';


// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Review service with mock implementations
export const reviewService = {
  /**
   * Save review data as draft
   * @param data - Review data to save
   * @returns Promise<void>
   */
  saveReview: async (data: ReviewData): Promise<void> => {
    try {
      // Mock implementation - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In real implementation, this would be:
      // const response = await fetch(`${API_BASE_URL}/reviews/${data.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     ...data,
      //     status: 'draft',
      //     lastSaved: new Date().toISOString(),
      //   }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to save review');
      // }

      console.log('Review saved successfully:', data.id);
    } catch (error) {
      console.error('Error saving review:', error);
      throw new Error('Failed to save review. Please try again.');
    }
  },

  /**
   * Submit review for the next stage
   * @param data - Review data to submit
   * @returns Promise<void>
   */
  submitReview: async (data: ReviewData): Promise<void> => {
    try {
      // Mock implementation - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate review data before submission
      const validationErrors = validateReviewData(data);
      if (validationErrors.length > 0) {
        throw new Error(`Review validation failed: ${validationErrors.join(', ')}`);
      }

      // In real implementation, this would be:
      // const response = await fetch(`${API_BASE_URL}/reviews/${data.id}/submit`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     ...data,
      //     status: 'submitted',
      //     submittedAt: new Date().toISOString(),
      //   }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to submit review');
      // }

      console.log('Review submitted successfully:', data.id);
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to submit review. Please try again.');
    }
  },

  /**
   * Upload evidence file for a specific KRA/Goal
   * @param kraId - KRA identifier
   * @param goalId - Goal identifier (nullable for KRA-level evidence)
   * @param file - File to upload
   * @returns Promise<EvidenceFile>
   */
  uploadEvidence: async (kraId: string, goalId: string | null, file: File): Promise<EvidenceFile> => {
    try {
      // Mock implementation - simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate file
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/plain',
      ];

      if (file.size > maxFileSize) {
        throw new Error('File size exceeds 10MB limit');
      }

      if (!allowedTypes.includes(file.type)) {
        throw new Error('File type not supported. Please upload PDF, Word, Image, or Text files.');
      }

      // In real implementation, this would be:
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('kraId', kraId);
      // if (goalId) formData.append('goalId', goalId);
      //
      // const response = await fetch(`${API_BASE_URL}/reviews/evidence/upload`, {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: formData,
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to upload file');
      // }
      //
      // const result = await response.json();
      // return result.data;

      // Mock response
      const mockFile: EvidenceFile = {
        id: `evidence_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        uploadedAt: new Date().toISOString(),
        url: URL.createObjectURL(file), // For preview purposes
      };

      console.log('Evidence uploaded successfully:', mockFile.id);
      return mockFile;
    } catch (error) {
      console.error('Error uploading evidence:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to upload evidence. Please try again.');
    }
  },

  /**
   * Get review data by ID
   * @param reviewId - Review identifier
   * @returns Promise<ReviewData>
   */
  getReview: async (reviewId: string): Promise<ReviewData> => {
    try {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));

      // In real implementation:
      // const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to fetch review');
      // }
      //
      // const result = await response.json();
      // return result.data;

      // Return mock data - this should be replaced with actual API call
      throw new Error('Review not found - using mock data from component');
    } catch (error) {
      console.error('Error fetching review:', error);
      throw new Error('Failed to load review data. Please try again.');
    }
  },

  /**
   * Delete evidence file
   * @param evidenceId - Evidence file identifier
   * @returns Promise<void>
   */
  deleteEvidence: async (evidenceId: string): Promise<void> => {
    try {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));

      // In real implementation:
      // const response = await fetch(`${API_BASE_URL}/reviews/evidence/${evidenceId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to delete evidence');
      // }

      console.log('Evidence deleted successfully:', evidenceId);
    } catch (error) {
      console.error('Error deleting evidence:', error);
      throw new Error('Failed to delete evidence. Please try again.');
    }
  },
};

/**
 * Validate review data before submission
 * @param data - Review data to validate
 * @returns Array of validation error messages
 */
function validateReviewData(data: ReviewData): string[] {
  const errors: string[] = [];

  // Check if all KRAs have self-assessment completed
  data.kras.forEach((kra, index) => {
    if (!kra.selfAssessment || !kra.selfAssessment.rating) {
      errors.push(`KRA ${index + 1} (${kra.name}): Self-assessment rating is required`);
    }

    if (!kra.selfAssessment || !kra.selfAssessment.comments.trim()) {
      errors.push(`KRA ${index + 1} (${kra.name}): Self-assessment comments are required`);
    }

    // Check goals within each KRA
    kra.relatedGoals.forEach((goal, goalIndex) => {
      if (!goal.selfAssessment || !goal.selfAssessment.achievementLevel) {
        errors.push(`KRA ${index + 1}, Goal ${goalIndex + 1}: Achievement level is required`);
      }

      if (!goal.selfAssessment || !goal.selfAssessment.comments.trim()) {
        errors.push(`KRA ${index + 1}, Goal ${goalIndex + 1}: Self-assessment comments are required`);
      }
    });
  });

  return errors;
}

/**
 * Format file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Export types for use in other components
export type { ApiResponse };