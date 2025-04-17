import { Request, Response } from "express";
import ServiceRecord from "../models/ServiceRecord";
import mongoose from "mongoose";
import Vehicle from "../models/Vehicle";


export const createServiceRecord = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { vehicleId, ...serviceRecordData } = req.body;

    // Create new insurance claim record
    const newServiceRecord = new ServiceRecord({...serviceRecordData, vehicle: vehicleId}
    );
    await newServiceRecord.save({ session });

    // Update the vehicle's insuranceClaims array
    await Vehicle.findByIdAndUpdate(
      vehicleId,
      { $push: { serviceRecords: newServiceRecord._id } },
      { new: true, session }
    );

    await session.commitTransaction();
    res.status(200).json({ 
      message: "Service record added successfully!",
      recordId: newServiceRecord._id
  });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ 
      error: "Failed to add Service record",
      details: error 
    });
  } finally {
    session.endSession();
  }
};


// Get all stations
export const getServiceRecord = async (req: Request, res: Response) => {
  try {
    const stations = await ServiceRecord.find().populate({
      path: 'vehicle',
      select: 'Registration_no Chasisis_No' // Match your Vehicle model exactly
    });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service records", error });
  }
};

// Get station by ID
export const getServiceRecordById = async (req: Request, res: Response): Promise<void> => {
    try {
      const station = await ServiceRecord.findById(req.params.id).populate('vehicle');
      if (!station) {
        res.status(404).json({ message: "Station not found" });
        return;
      }
      res.json(station);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service record", error });
    }
  };

// Update a station
export const updateServiceRecord = async (req: Request, res: Response) => {
  try {
    const updatedStation = await ServiceRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStation);
  } catch (error) {
    res.status(400).json({ message: "Failed to update service record", error });
  }
};

// Delete a station
export const deleteServiceRecord = async (req: Request, res: Response) => {
  try {
    await ServiceRecord.findByIdAndDelete(req.params.id);
    res.json({ message: "Station deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete service record", error });
  }
};