// routes/ModificationRequestRoute.ts
import express from "express";
import {
  createModificationRequest,
  getModificationRequest,
  getModificationRequestById,
  updateModificationRequest,
  deleteModificationRequest,
} from "../controllers/ModificationRequestController";

const router = express.Router();

router.post("/", createModificationRequest);
router.get("/", getModificationRequest);
router.get("/:id", getModificationRequestById);
router.put("/:id", updateModificationRequest);
router.delete("/:id", deleteModificationRequest);

export default router;