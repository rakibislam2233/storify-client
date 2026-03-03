export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  mimeType?: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  userId: string;
  path: string;
}

export interface Folder extends FileItem {
  type: 'folder';
  children?: FileItem[];
}

export interface UploadedFile extends FileItem {
  type: 'file';
  url: string;
}

export interface SubscriptionPlan {
  id: string;
  name: 'Free' | 'Silver' | 'Gold' | 'Diamond';
  price: number;
  storageLimit: number; // in GB
  maxFolderDepth: number;
  allowedFileTypes: string[];
  maxFileSize: number; // in MB
  maxTotalFiles: number;
  features: string[];
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'inactive' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  currentUsage: {
    storageUsed: number; // in GB
    fileCount: number;
    folderCount: number;
  };
}
