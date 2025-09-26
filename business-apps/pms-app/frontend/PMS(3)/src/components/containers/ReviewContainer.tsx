"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { ComprehensiveReviewMatrix } from '../review/ComprehensiveReviewMatrix';
import { reviewService } from '../../services/reviewService';
import { User } from '../../types/auth.types';
import { ReviewData, EvidenceFile } from '../../types/review-matrix.types';

interface ReviewContainerProps {
  user: User;
}

// Enhanced notification component for better user feedback
interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  const bgColor = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconColor = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 max-w-md w-full border rounded-lg p-4 shadow-lg z-50 ${bgColor[type]}`}>
      <div className="flex justify-between items-start">
        <div className="flex">
          <div className="flex-shrink-0">
            {type === 'success' && (
              <svg className={`h-5 w-5 ${iconColor[type]}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {type === 'error' && (
              <svg className={`h-5 w-5 ${iconColor[type]}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            {type === 'warning' && (
              <svg className={`h-5 w-5 ${iconColor[type]}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {type === 'info' && (
              <svg className={`h-5 w-5 ${iconColor[type]}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Close</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Loading overlay component
const LoadingOverlay: React.FC<{ message: string }> = ({ message }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 flex items-center space-x-4 shadow-xl">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="text-gray-700 font-medium">{message}</span>
    </div>
  </div>
);

/**
 * ReviewContainer - Wrapper component that handles API integration for EnhancedReviewMatrix
 * This component manages all the state, API calls, and error handling for the review process
 */
export function ReviewContainer({ user }: ReviewContainerProps) {
  // State management
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  } | null>(null);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  // Mock review data - In real implementation, this would be fetched from API
  const mockReviewData: ReviewData = {
    id: `review-${user.id}-2024-001`,
    employeeId: user.id,
    employeeName: user.name,
    reviewCycle: 'Annual Review 2024',
    reviewPeriod: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    },
    currentStage: 'self',
    kras: [
      {
        id: 'kra-1',
        name: 'Technical Excellence',
        description: 'Demonstrate technical expertise and deliver high-quality solutions',
        weightage: 30,
        category: 'Technical',
        relatedGoals: [
          {
            id: 'goal-1-1',
            title: 'Complete React Migration Project',
            description: 'Migrate legacy components to React with TypeScript',
            targetValue: '100% migration',
            currentProgress: 75,
            status: 'in_progress',
            evidence: [],
            selfAssessment: {
              achievementLevel: 'partial',
              comments: '',
              challengesFaced: '',
              nextSteps: '',
            },
            r1Validation: {
              agrees: false,
              comments: '',
              evidenceReview: '',
            },
            r2Validation: {
              finalApproval: false,
              comments: '',
              impactAssessment: '',
            },
          },
        ],
        selfAssessment: {
          rating: 0,
          comments: '',
          evidence: [],
        },
        r1Review: {
          rating: 0,
          comments: '',
          validation: '',
          agrees: false,
        },
        r2Review: {
          rating: 0,
          comments: '',
          approval: '',
          finalApproval: false,
        },
      },
    ],
    overallStatus: 'draft',
    lastSaved: new Date().toISOString(),
  };

  // Initialize review data on component mount
  useEffect(() => {
    setReviewData(mockReviewData);
  }, [user.id]);

  // Notification helpers
  const showNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setNotification({ type, message });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  /**
   * Handle saving review data as draft
   */
  const handleSave = useCallback(async (data: ReviewData) => {
    try {
      setLoading(true);
      setLoadingMessage('Saving review...');

      await reviewService.saveReview(data);

      // Update local state
      setReviewData({ ...data, lastSaved: new Date().toISOString() });

      showNotification('success', 'Review saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save review';
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }, [showNotification]);

  /**
   * Handle submitting review to next stage
   */
  const handleSubmit = useCallback(async (data: ReviewData) => {
    try {
      setLoading(true);
      setLoadingMessage('Submitting review...');

      await reviewService.submitReview(data);

      // Update review status and stage
      const updatedData = {
        ...data,
        overallStatus: 'submitted' as const,
        currentStage: data.currentStage === 'self' ? 'r1' as const : data.currentStage,
        lastSaved: new Date().toISOString(),
      };

      setReviewData(updatedData);

      showNotification('success', 'Review submitted successfully. It will now be reviewed by your manager.');
    } catch (error) {
      console.error('Submit error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit review';
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }, [showNotification]);

  /**
   * Handle file upload for evidence
   */
  const handleFileUpload = useCallback(async (kraId: string, goalId: string | null, file: File): Promise<EvidenceFile> => {
    try {
      setLoading(true);
      setLoadingMessage('Uploading evidence...');

      const uploadedFile = await reviewService.uploadEvidence(kraId, goalId, file);

      showNotification('success', `File "${file.name}" uploaded successfully`);

      return uploadedFile;
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
      showNotification('error', errorMessage);
      throw error; // Re-throw to let the component handle the error
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }, [showNotification]);

  /**
   * Handle deleting evidence file
   */
  const handleDeleteEvidence = useCallback(async (evidenceId: string) => {
    try {
      setLoading(true);
      setLoadingMessage('Deleting evidence...');

      await reviewService.deleteEvidence(evidenceId);

      showNotification('success', 'Evidence deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete evidence';
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }, [showNotification]);

  // Show loading if review data is not yet loaded
  if (!reviewData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading review data...</span>
      </div>
    );
  }

  return (
    <>
      {/* Main component - Using new Comprehensive Matrix View */}
      <ComprehensiveReviewMatrix
        user={user}
        reviewData={reviewData}
        onSave={handleSave}
        onSubmit={handleSubmit}
        onFileUpload={handleFileUpload}
        onDeleteEvidence={handleDeleteEvidence}
        readOnly={loading}
      />

      {/* Loading overlay */}
      {loading && <LoadingOverlay message={loadingMessage} />}

      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={hideNotification}
        />
      )}
    </>
  );
}