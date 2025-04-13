import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, UserRole } from '../../types/user.interface';

// Branch schema interface
interface IBranch {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  contactDetails: string;
  servicesOffered: string[];
  createdAt: Date;
}

// Business schema interface
export interface IBusiness {
  name: string;
  type: string;
  registrationNumber: string;
  contactDetails: string;
  website?: string;
  branches: IBranch[];
  createdAt: Date;
  updatedAt: Date;
}

// Branch schema
const branchSchema = new Schema<IBranch>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  contactDetails: { type: String, required: true },
  servicesOffered: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

// Business schema with embedded branches
const businessSchema = new Schema<IBusiness>({
  name: { type: String, required: true, trim: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['Insurance Company', 'Eco Test Center', 'Service Center'] 
  },
  registrationNumber: { type: String, required: true, unique: true },
  contactDetails: { type: String, required: true },
  website: { type: String, required: false },
  branches: [branchSchema],
}, { timestamps: true });

// User schema with embedded business
const userSchema: Schema<IUser> = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.ADMIN,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    business: businessSchema, // Directly embedding business schema
  },
  {
    collection: 'users',
    timestamps: true,
    autoIndex: true,
  }
);

// Update password hash middleware to only run for email users
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Add password comparison method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
    },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: '5m' }
  );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '4h' });
};

export default mongoose.model<IUser>('User', userSchema);
