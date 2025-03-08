// routes/stationRoutes.ts
import express from "express";
import {
  createServiceRecord,
  getServiceRecord,
  getServiceRecordById,
  updateServiceRecord,
  deleteServiceRecord,
} from "../controllers/ServiceRecordController";

const router = express.Router();

router.post("/", createServiceRecord);
router.get("/", getServiceRecord);
router.get("/:id", getServiceRecordById);
router.put("/:id", updateServiceRecord);
router.delete("/:id", deleteServiceRecord);

export default router;