// routes/stationRoutes.ts
import express from "express";
import {
  createClaimRecord,
  getClaimRecord,
  getClaimRecordById,
  updateClaimRecord,
  deleteClaimRecord,
} from "../controllers/InsuranceClaimController";
import { protect } from '../../src/middleware/auth.middleware';
import { UserRole } from '../../src/types/user.interface';

const router = express.Router();

router.post("/", createClaimRecord);

router.get("/",protect(UserRole.ADMIN, UserRole.SUPERADMIN), getClaimRecord);
router.get("/:id",protect(UserRole.ADMIN, UserRole.SUPERADMIN), getClaimRecordById);
router.put("/:id",protect(UserRole.ADMIN, UserRole.SUPERADMIN), updateClaimRecord);
router.delete("/:id",protect(UserRole.SUPERADMIN), deleteClaimRecord);

export default router;