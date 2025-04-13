import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../../models/Auth/user'; // Adjust the path as needed
import { IUser } from '../../types/user.interface'; // Adjust the path as needed

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const stations = await User.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service records", error });
  }
};