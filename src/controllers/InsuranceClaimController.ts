import { Request, Response } from "express";
import InsuranceClaimRecord from "../models/InsuranceClaimRecord";

// Create a new station
export const createClaimRecord = async (req: Request, res: Response) => {
  try {
    const station = new InsuranceClaimRecord(req.body);
    const savedStation = await station.save();
    res.status(201).json(savedStation);
  } catch (error) {
    res.status(400).json({ message: "Failed to create claim record", error });
  }
};

// Get all stations
export const getClaimRecord = async (req: Request, res: Response) => {
  try {
    const Claims = await InsuranceClaimRecord.find();
    res.json(Claims);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch claim records", error });
  }
};

// Get station by ID
export const getClaimRecordById = async (req: Request, res: Response): Promise<void> => {
    try {
      const Claim = await InsuranceClaimRecord.findById(req.params.id);
      if (!Claim) {
        res.status(404).json({ message: "Claim record not found" });
        return;
      }
      res.json(Claim);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch claim record", error });
    }
  };

// Update a station
export const updateClaimRecord = async (req: Request, res: Response) => {
  try {
    const updatedClaim = await InsuranceClaimRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedClaim);
  } catch (error) {
    res.status(400).json({ message: "Failed to update claim record", error });
  }
};

// Delete a station
export const deleteClaimRecord = async (req: Request, res: Response) => {
  try {
    await InsuranceClaimRecord.findByIdAndDelete(req.params.id);
    res.json({ message: "Claim record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete claim record", error });
  }
};