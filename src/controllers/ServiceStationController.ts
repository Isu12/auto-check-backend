import { Request, Response } from "express";
import Business from "../models/ServiceStation";


export const createBusiness = async (req: Request, res: Response) => {
  try {
    const business = new Business(req.body);
    const savedTests = await business.save();
    res.status(201).json(savedTests);
  } catch (error) {
    res.status(400).json({ message: "Failed to create business record", error });
  }
};


export const getBusinesses = async (req: Request, res: Response) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch businesses", error });
  }
};

export const getBusinessById = async (req: Request, res: Response): Promise<void> => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      res.status(404).json({ message: "Business not found" });
      return;
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch business", error });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ message: "Failed to update business", error });
  }
};

export const deleteBusiness = async (req: Request, res: Response) => {
  try {
    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete business", error });
  }
};