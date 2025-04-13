import { Request, Response } from 'express';
import User from '../../models/Auth/user';  // Adjust path as needed


export const updateUserRecord = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to update tes record", error });
  }
};