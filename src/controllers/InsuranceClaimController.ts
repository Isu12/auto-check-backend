import { Request, Response } from "express";
import InsuranceClaimRecord from "../models/InsuranceClaimRecord";
import Vehicle from "../models/Vehicle";
import mongoose from "mongoose";

// Create a new station
// export const createClaimRecord = async (req: Request, res: Response) => {
//   try {
//     const station = new InsuranceClaimRecord(req.body);
//     const savedStation = await station.save();
//     res.status(201).json(savedStation);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to create claim record", error });
//   }
// };


export const createClaimRecord = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { vehicleId, ...insuranceData } = req.body;

    // Create new insurance claim record with vehicle reference
    const newInsuranceClaim = new InsuranceClaimRecord({
      ...insuranceData,
      vehicle: vehicleId
    });
    await newInsuranceClaim.save({ session });

    // Update the vehicle's insuranceClaims array
    await Vehicle.findByIdAndUpdate(
      vehicleId,
      { $push: { insuranceClaims: newInsuranceClaim._id } },
      { new: true, session }
    );

    await session.commitTransaction();
    res.status(200).json({ 
      message: "Insurance claim record added successfully!",
      recordId: newInsuranceClaim._id 
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ 
      error: "Failed to add insurance claim record",
      details: error instanceof Error ? error.message : String(error)
    });
  } finally {
    session.endSession();
  }
};



// Get all stations
export const getClaimRecord = async (req: Request, res: Response) => {
  try {
    const Claims = await InsuranceClaimRecord.find().populate({
      path: 'vehicle',
      select: 'Registration_no Chasisis_No' // Match your Vehicle model exactly
    });
    res.json(Claims);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch claim records", error });
  }
};

// Get station by ID
export const getClaimRecordById = async (req: Request, res: Response): Promise<void> => {
    try {
      const Claim = await InsuranceClaimRecord.findById(req.params.id).populate('vehicle');
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