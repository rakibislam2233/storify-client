export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  BANNED = "BANNED",
  DELETED = "DELETED",
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
  bio: string | null;
  isEmailVerified: true;
  status: UserStatus;
  role: UserRole;
  companyId: string | null;
  isDeleted: false;
  createdAt: string;
}
