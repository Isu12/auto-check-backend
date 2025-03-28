// routes/stationRoutes.ts
import express from "express";
import {
  createTestRecord,
  getTestRecord,
  getTestRecordById,
  updateTestRecord,
  deleteTestRecord,
} from "../controllers/EchoTestController";

const router = express.Router();

router.post("/", createTestRecord);

router.get("/", getTestRecord);
router.get("/:id", getTestRecordById);
router.put("/:id", updateTestRecord);
router.delete("/:id", deleteTestRecord);

export default router;