// routes/VehicleRoutes.ts
import express from "express";
import {
  createVehicleRecord,
  getVehicleRecord,
  getVehicleById,
  updateVehicleRecord,
  deleteVehicleRecord,
} from "../controllers/VehicleController";

const router = express.Router();

router.post("/", createVehicleRecord);
router.get("/", getVehicleRecord);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicleRecord);
router.delete("/:id", deleteVehicleRecord);

export default router;