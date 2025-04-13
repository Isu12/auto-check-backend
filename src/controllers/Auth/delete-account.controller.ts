import { Request, Response, RequestHandler } from 'express';
import User from '../../models/Auth/user';
import RefreshToken from '../../models/Auth/refresh-token';

export const deleteAccount: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    // Delete all refresh tokens for this user
    await RefreshToken.deleteMany({ user: userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting account',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
