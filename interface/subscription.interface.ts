export interface Package {
  id: string;
  name: string;
  maxFolders: number;
  maxNestingLevel: number;
  allowedFileTypes: string[];
  price: number | null;
  maxFileSize: number;
  totalFileLimit: number;
  filesPerFolder: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ActiveSubscription {
  id: string;
  userId: string;
  packageName: string;
  price: number;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    fullName: string;
    email: string;
  };
}
