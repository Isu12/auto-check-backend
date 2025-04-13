import { Request, Response, RequestHandler } from 'express';
import User from '../../models/Auth/user';
import RefreshToken from '../../models/Auth/refresh-token';
import crypto from 'crypto';
import VerificationToken from '../../models/Auth/verification-token';
import { IBusiness } from '../../models/Auth/user';

// Password validation function
export const isPasswordValid = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }

  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }

  return { isValid: true, message: 'Password is valid' };
};

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, business } = req.body as {
      email: string;
      password: string;
      name: string;
      business: IBusiness;
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: 'Invalid email format' });
      return;
    }

    // Password validation
    const passwordValidation = isPasswordValid(password);
    if (!passwordValidation.isValid) {
      res.status(400).json({ success: false, message: passwordValidation.message });
      return;
    }

    // User exists?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'User with this email already exists' });
      return;
    }

    // Create user with business data
    const user = await User.create({
      email,
      password,
      name,
      business, // Embedding business and branches data directly from the request
      lastLogin: new Date(),
    });

    // Generate and save verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await VerificationToken.create({
      userId: user._id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    await RefreshToken.create({
      token: refreshToken,
      user: user._id,
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
    });

    res.status(201).json({
      success: true,
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
