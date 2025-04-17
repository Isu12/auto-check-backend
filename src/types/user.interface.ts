export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'super-admin'
}


export interface IUser {
  userId?: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  lastLogin?: Date;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
