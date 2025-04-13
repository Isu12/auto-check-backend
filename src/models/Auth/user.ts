import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, UserRole } from '../../types/user.interface';

const userSchema = new mongoose.Schema<IUser>(
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
      required:true,
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
      default: UserRole.USER,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'users',
    timestamps: true,
    autoIndex: true,
  }
);

// Add pre-save middleware to set userId from _id
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.userId = this._id.toString();
  }
  next();
});

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
