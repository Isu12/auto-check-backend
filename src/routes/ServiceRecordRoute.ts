// routes/stationRoutes.ts
import express from "express";
import {
  createServiceRecord,
  getServiceRecord,
  getServiceRecordById,
  updateServiceRecord,
  deleteServiceRecord,
} from "../controllers/ServiceRecordController";
import { protect } from '../../src/middleware/auth.middleware';
import { UserRole } from '../../src/types/user.interface';

const router = express.Router();

router.post("/",protect(UserRole.ADMIN, UserRole.SUPERADMIN), createServiceRecord);
router.get("/",protect(UserRole.ADMIN, UserRole.SUPERADMIN), getServiceRecord);
router.get("/:id",protect(UserRole.ADMIN, UserRole.SUPERADMIN), getServiceRecordById);
router.put("/:id",protect(UserRole.ADMIN, UserRole.SUPERADMIN), updateServiceRecord);
router.delete("/:id",protect(UserRole.SUPERADMIN), deleteServiceRecord);

export default router;

