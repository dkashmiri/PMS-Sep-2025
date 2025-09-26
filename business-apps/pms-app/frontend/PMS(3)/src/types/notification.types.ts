import { BaseEntity } from './common.types';

export interface Notification extends BaseEntity {
  recipientId: string;
  senderId?: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  data?: Record<string, any>;
  channels: NotificationChannel[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
  scheduledDate?: Date;
  sentDate?: Date;
  readDate?: Date;
  expiryDate?: Date;
  isRead: boolean;
  isActionable: boolean;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

export type NotificationType = 
  | 'REVIEW_REMINDER'
  | 'REVIEW_ASSIGNED'
  | 'REVIEW_COMPLETED'
  | 'GOAL_DEADLINE'
  | 'GOAL_APPROVAL'
  | 'GOAL_UPDATED'
  | 'KRA_ASSIGNED'
  | 'PERFORMANCE_UPDATE'
  | 'SYSTEM_ALERT'
  | 'TEAM_UPDATE'
  | 'TRAINING_REMINDER'
  | 'FEEDBACK_REQUEST'
  | 'CYCLE_ANNOUNCEMENT'
  | 'APPROVAL_REQUEST'
  | 'STATUS_CHANGE';

export type NotificationCategory = 
  | 'REVIEW'
  | 'GOAL'
  | 'KRA'
  | 'PERFORMANCE'
  | 'SYSTEM'
  | 'TEAM'
  | 'TRAINING'
  | 'ADMINISTRATIVE';

export type NotificationChannel = 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP' | 'SLACK' | 'TEAMS';

export interface NotificationTemplate extends BaseEntity {
  name: string;
  type: NotificationType;
  category: NotificationCategory;
  subject: string;
  bodyTemplate: string;
  smsTemplate?: string;
  pushTemplate?: string;
  variables: NotificationVariable[];
  defaultChannels: NotificationChannel[];
  isActive: boolean;
  version: string;
  approvedBy?: string;
  approvedDate?: Date;
}

export interface NotificationVariable {
  name: string;
  type: 'STRING' | 'NUMBER' | 'DATE' | 'BOOLEAN' | 'OBJECT';
  description: string;
  isRequired: boolean;
  defaultValue?: any;
  example?: any;
}

export interface NotificationPreference extends BaseEntity {
  userId: string;
  category: NotificationCategory;
  channels: NotificationChannel[];
  frequency: 'IMMEDIATE' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'DISABLED';
  quietHours?: {
    start: string;
    end: string;
    timezone: string;
  };
  isEnabled: boolean;
}

export interface ReminderQueue extends BaseEntity {
  entityType: 'REVIEW' | 'GOAL' | 'KRA' | 'TRAINING';
  entityId: string;
  recipientId: string;
  reminderType: 'INITIAL' | 'FIRST_REMINDER' | 'SECOND_REMINDER' | 'FINAL_REMINDER' | 'ESCALATION';
  scheduledDate: Date;
  isProcessed: boolean;
  processedDate?: Date;
  notificationId?: string;
  retryCount: number;
  maxRetries: number;
  nextRetryDate?: Date;
  errorMessage?: string;
}

export interface EscalationLog extends BaseEntity {
  entityType: 'REVIEW' | 'GOAL' | 'KRA';
  entityId: string;
  escalatedFrom: string;
  escalatedTo: string;
  escalationLevel: number;
  reason: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED' | 'CLOSED';
  acknowledgedDate?: Date;
  resolvedDate?: Date;
  resolution?: string;
  notificationsSent: string[];
}

export interface NotificationBatch extends BaseEntity {
  name: string;
  description?: string;
  totalRecipients: number;
  processedRecipients: number;
  successfulSends: number;
  failedSends: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  scheduledDate: Date;
  startedDate?: Date;
  completedDate?: Date;
  templateId: string;
  data: Record<string, any>;
  filters?: {
    departments?: string[];
    roles?: string[];
    employeeIds?: string[];
  };
}

export interface NotificationAnalytics {
  totalSent: number;
  totalDelivered: number;
  totalRead: number;
  totalFailed: number;
  deliveryRate: number;
  readRate: number;
  channelPerformance: {
    channel: NotificationChannel;
    sent: number;
    delivered: number;
    read: number;
    failed: number;
    deliveryRate: number;
    readRate: number;
  }[];
  categoryBreakdown: {
    category: NotificationCategory;
    sent: number;
    read: number;
    readRate: number;
  }[];
  timeBasedAnalytics: {
    hour: number;
    sent: number;
    delivered: number;
    read: number;
    deliveryRate: number;
    readRate: number;
  }[];
  recipientEngagement: {
    userId: string;
    userName: string;
    totalReceived: number;
    totalRead: number;
    readRate: number;
    avgReadTime: number;
    preferredChannel: NotificationChannel;
  }[];
}

export interface NotificationRule extends BaseEntity {
  name: string;
  description?: string;
  trigger: NotificationTrigger;
  conditions: NotificationCondition[];
  actions: NotificationAction[];
  isActive: boolean;
  priority: number;
  executionCount: number;
  lastExecuted?: Date;
}

export interface NotificationTrigger {
  event: string;
  entityType: string;
  conditions?: Record<string, any>;
}

export interface NotificationCondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'CONTAINS' | 'IN' | 'NOT_IN';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface NotificationAction {
  type: 'SEND_NOTIFICATION' | 'ESCALATE' | 'CREATE_TASK' | 'UPDATE_STATUS';
  parameters: Record<string, any>;
  delay?: number;
  conditions?: NotificationCondition[];
}

export interface NotificationDeliveryStatus {
  notificationId: string;
  channel: NotificationChannel;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'BOUNCED';
  sentDate?: Date;
  deliveredDate?: Date;
  failureReason?: string;
  retryCount: number;
  lastRetryDate?: Date;
  providerResponse?: Record<string, any>;
}

export interface BulkNotificationRequest {
  templateId: string;
  recipients: {
    userId: string;
    channels?: NotificationChannel[];
    customData?: Record<string, any>;
  }[];
  scheduledDate?: Date;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  batchSize?: number;
  rateLimitPerMinute?: number;
}

export interface NotificationSubscription extends BaseEntity {
  userId: string;
  entityType: 'USER' | 'TEAM' | 'DEPARTMENT' | 'PROJECT' | 'GOAL' | 'REVIEW';
  entityId: string;
  notificationTypes: NotificationType[];
  channels: NotificationChannel[];
  isActive: boolean;
  subscriptionSource: 'USER' | 'SYSTEM' | 'ADMIN';
}

export interface NotificationDigest {
  userId: string;
  digestType: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  period: {
    startDate: Date;
    endDate: Date;
  };
  notifications: {
    category: NotificationCategory;
    count: number;
    unreadCount: number;
    latestNotifications: Notification[];
  }[];
  summary: {
    totalNotifications: number;
    unreadNotifications: number;
    actionableNotifications: number;
    highPriorityNotifications: number;
  };
  generatedDate: Date;
}