import { Request, Response } from "express";
import ServiceStation from "../models/ServiceStation";


// Create a new station
export const createStation = async (req: Request, res: Response) => {
  try {
    const station = new ServiceStation(req.body);
    const savedStation = await station.save();
    res.status(201).json(savedStation);
  } catch (error) {
    res.status(400).json({ message: "Failed to create station", error });
  }
};

// Get all stations
export const getStations = async (req: Request, res: Response) => {
  try {
    const stations = await ServiceStation.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stations", error });
  }
};

// Get station by ID
export const getStationById = async (req: Request, res: Response): Promise<void> => {
    try {
      const station = await ServiceStation.findById(req.params.id);
      if (!station) {
        res.status(404).json({ message: "Station not found" });
        return;
      }
      res.json(station);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch station", error });
    }
  };

// Update a station
export const updateStation = async (req: Request, res: Response) => {
  try {
    const updatedStation = await ServiceStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStation);
  } catch (error) {
    res.status(400).json({ message: "Failed to update station", error });
  }
};

// Delete a station
export const deleteStation = async (req: Request, res: Response) => {
  try {
    await ServiceStation.findByIdAndDelete(req.params.id);
    res.json({ message: "Station deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete station", error });
  }
};