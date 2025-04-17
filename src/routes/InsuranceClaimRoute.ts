// routes/stationRoutes.ts
import express from "express";
import {
  createClaimRecord,
  getClaimRecord,
  getClaimRecordById,
  updateClaimRecord,
  deleteClaimRecord,
} from "../controllers/InsuranceClaimController";

const router = express.Router();

router.post("/", createClaimRecord);

router.get("/", getClaimRecord);
router.get("/:id", getClaimRecordById);
router.put("/:id", updateClaimRecord);
router.delete("/:id", deleteClaimRecord);

export default router;