import { Request, Response } from "express";
import ServiceRecord from "../models/ServiceRecord";

// Create a new station
export const createServiceRecord = async (req: Request, res: Response) => {
  try {
    const station = new ServiceRecord(req.body);
    const savedStation = await station.save();
    res.status(201).json(savedStation);
  } catch (error) {
    res.status(400).json({ message: "Failed to create service record", error });
  }
};

// Get all stations
export const getServiceRecord = async (req: Request, res: Response) => {
  try {
    const stations = await ServiceRecord.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service records", error });
  }
};

// Get station by ID
export const getServiceRecordById = async (req: Request, res: Response): Promise<void> => {
    try {
      const station = await ServiceRecord.findById(req.params.id);
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
    res.status(500).json({ message: "Failed to delete service record", error });
  }
};