// routes/stationRoutes.ts
import express from "express";
import {
  createTestRecord,
  getTestRecord,
  getTestRecordById,
  updateTestRecord,
  deleteTestRecord,
} from "../controllers/EchoTestController";
import { protect } from '../../src/middleware/auth.middleware';
import { UserRole } from '../../src/types/user.interface';


const router = express.Router();

router.post("/", createTestRecord);

router.get("/",protect(UserRole.ADMIN, UserRole.SUPERADMIN), getTestRecord);
router.get("/:id",protect(UserRole.ADMIN, UserRole.SUPERADMIN), getTestRecordById);
router.put("/:id",protect(UserRole.ADMIN, UserRole.SUPERADMIN), updateTestRecord);
router.delete("/:id",protect(UserRole.SUPERADMIN), deleteTestRecord);

export default router;