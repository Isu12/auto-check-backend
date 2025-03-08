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

router.post("/service-record/", createServiceRecord);
router.get("/service-record", getServiceRecord);
router.get("/service-record/:id", getServiceRecordById);
router.put("/service-record/:id", updateServiceRecord);
router.delete("/service-record/:id", deleteServiceRecord);

export default router;