import { Request, Response } from "express";
import EchoTestRecord from "../models/EchoTestRecord";

// Create a new station
export const createTestRecord = async (req: Request, res: Response) => {
  try {
    const EchoTest = new EchoTestRecord(req.body);
    const savedTests = await EchoTest.save();
    res.status(201).json(savedTests);
  } catch (error) {
    res.status(400).json({ message: "Failed to create test record", error });
  }
};

// Get all stations
export const getTestRecord = async (req: Request, res: Response) => {
  try {
    const EchoTests = await EchoTestRecord.find();
    res.json(EchoTests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch test records", error });
  }
};

// Get station by ID
export const getTestRecordById = async (req: Request, res: Response): Promise<void> => {
    try {
      const EchoTest = await EchoTestRecord.findById(req.params.id);
      if (!EchoTest) {
        res.status(404).json({ message: "Test record not found" });
        return;
      }
      res.json(EchoTest);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test record", error });
    }
  };

// Update a station
export const updateTestRecord = async (req: Request, res: Response) => {
  try {
    const updatedTest = await EchoTestRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTest);
  } catch (error) {
    res.status(400).json({ message: "Failed to update tes record", error });
  }
};

// Delete a station
export const deleteTestRecord = async (req: Request, res: Response) => {
  try {
    await EchoTestRecord.findByIdAndDelete(req.params.id);
    res.json({ message: "Test record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete test record", error });
  }
};