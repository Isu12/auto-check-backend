// routes/VehicleRoutes.ts
import express from "express";
import {
  createVehicleRecord,
  getVehicleRecord,
  getVehicleById,
  updateVehicleRecord,
  deleteVehicleRecord,
} from "../controllers/VehicleController";
import { protect } from '../../src/middleware/auth.middleware';
import { UserRole } from '../../src/types/user.interface';


const router = express.Router();

router.post("/",protect(UserRole.SUPERADMIN, UserRole.ADMIN), createVehicleRecord);
router.get("/", getVehicleRecord);
router.get("/:id", getVehicleById);
router.put("/:id",protect(UserRole.SUPERADMIN, UserRole.ADMIN), updateVehicleRecord);
router.delete("/:id",protect(UserRole.SUPERADMIN), deleteVehicleRecord);

export default router;