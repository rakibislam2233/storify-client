export interface FileItem {
  id: string;
  originalName: string;
  name: string;
  type: string;
  size: number;
  url: string;
  userId: string;
  folderId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  name: string;
  level: number;
  userId: string;
  parentId: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  files?: FileItem[];
  children?: Folder[];
  totalSize?: number;
  totalFiles?: number;
  _count?: {
    files: number;
    children: number;
  };
}

export interface DashboardStats {
  totalStorage: number;
  usedStorage: number;
  totalFiles: number;
  totalFolders: number;
  storageUsagePercentage: number;
  fileTypeDistribution: {
    type: string;
    count: number;
    size: number;
  }[];
  recentFiles: FileItem[];
}

export interface UserDashboardData {
  stats: DashboardStats;
  package: {
    name: string;
    maxFolders: number;
    maxNestingLevel: number;
    maxFileSize: number;
    totalFileLimit: number;
  };
}
