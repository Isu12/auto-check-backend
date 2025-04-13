import { Request, Response } from "express";
import Vehicle from "../models/Vehicle";

// Register a new vehicle
export const createVehicleRecord = async (req: Request, res: Response) => {
  try {
    const station = new Vehicle(req.body);
    const savedStation = await station.save();
    res.status(201).json(savedStation);
  } catch (error) {
    res.status(400).json({ message: "Failed to register the vehicle", error });
  }
};

// Get all Vehicles
export const getVehicleRecord = async (req: Request, res: Response) => {
  try {
    const stations = await Vehicle.find().populate('echoTests').populate('insuranceClaims')
    .populate('serviceRecords');
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch the Vehicle", error });
  }
};

// Get Vehicle by ID
export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
    try {
      const station = await Vehicle.findById(req.params.id);
      if (!station) {
        res.status(404).json({ message: "Vehicle not found" });
        return;
      }
      res.json(station);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch the vehicle", error });
    }
  };

// Update a Vehicle
export const updateVehicleRecord = async (req: Request, res: Response) => {
  try {
    const updatedStation = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStation);
  } catch (error) {
    res.status(400).json({ message: "Failed to update the vehicle", error });
  }
};

// Delete a Vehicle
export const deleteVehicleRecord = async (req: Request, res: Response) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the vehicle", error });
  }
};

