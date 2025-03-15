import { Request, Response } from "express";
import ModificationRequest from "../models/ModificationRequest";

// Create a new ModificationRequest
export const createModificationRequest = async (req: Request, res: Response) => {
  try {
    const modification = new ModificationRequest(req.body);
    const savedModification = await modification.save();
    res.status(201).json(savedModification);
  } catch (error) {
    res.status(400).json({ message: "Failed to create Modification request", error });
  }
};

// Get all modification requests
export const getModificationRequest = async (req: Request, res: Response) => {
  try {
    const modification = await ModificationRequest.find();
    res.json(modification);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch modification request", error });
  }
};

// Get modification request by ID
export const getModificationRequestById = async (req: Request, res: Response): Promise<void> => {
    try {
      const modification = await ModificationRequest.findById(req.params.id);
      if (!modification) {
        res.status(404).json({ message: "Request not found" });
        return;
      }
      res.json(modification);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch modification request", error });
    }
  };

// Update a modification request
export const updateModificationRequest = async (req: Request, res: Response) => {
  try {
    const updatedModificationRequest = await ModificationRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedModificationRequest);
  } catch (error) {
    res.status(400).json({ message: "Failed to update modification request", error });
  }
};

// Delete a modification request
export const deleteModificationRequest = async (req: Request, res: Response) => {
  try {
    await ModificationRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Modification Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete modification request", error });
  }
};