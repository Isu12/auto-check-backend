import { Request, Response } from "express";
import EchoTestRecord from "../models/EchoTestRecord";
import Vehicle from "../models/Vehicle";
import { updateVehicleRecord } from "./VehicleController";
import mongoose from "mongoose";


// export const createTestRecord = async (req: Request, res: Response) => {
//   try {
//     const { vehicleId, ...echoTestData } = req.body;

//     const newEchoTest = new EchoTestRecord(echoTestData);
//     await newEchoTest.save();

//     await Vehicle.findByIdAndUpdate(vehicleId, {
//       $push: { echoTests: newEchoTest._id },
//     });

//     res.status(200).json({ message: "Echo test record added successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add echo test record" });
//   }
// };



export const createTestRecord = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { vehicleId, ...echoTestData } = req.body;

    const newEchoTest = new EchoTestRecord(echoTestData);
    await newEchoTest.save({ session });

    await Vehicle.findByIdAndUpdate(
      vehicleId,
      { $push: { echoTests: newEchoTest._id } },
      { session }
    );

    await session.commitTransaction();
    res.status(200).json({ 
      message: "Echo test record added successfully!",
      recordId: newEchoTest._id 
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ 
      error: "Failed to add echo test record",
      details: error 
    });
  } finally {
    session.endSession();
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