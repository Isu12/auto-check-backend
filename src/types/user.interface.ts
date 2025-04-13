import mongoose, { Document } from 'mongoose';
import { IBusiness } from '../models/Auth/user';

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
  business: IBusiness; // Ensure this is typed as IBusiness
  createdAt: Date;
  lastLogin?: Date;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
