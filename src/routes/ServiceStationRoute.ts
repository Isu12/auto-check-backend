// routes/stationRoutes.ts
import express from "express";
import {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} from "../controllers/ServiceStationController";
import { protect } from '../../src/middleware/auth.middleware';
import { UserRole } from '../../src/types/user.interface';

const router = express.Router();

router.post("/",protect(UserRole.ADMIN, UserRole.SUPERADMIN), createBusiness);
router.get("/",protect(UserRole.ADMIN, UserRole.SUPERADMIN), getBusinesses);
router.get("/:id",protect(UserRole.ADMIN, UserRole.SUPERADMIN), getBusinessById);
router.put("/:id",protect(UserRole.ADMIN, UserRole.SUPERADMIN), updateBusiness);
router.delete("/:id",protect(UserRole.SUPERADMIN), deleteBusiness);

export default router;