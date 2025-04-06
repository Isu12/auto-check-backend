import mongoose from "mongoose";

// Defining the ModificationRequest Schema
const ModificationRequestSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  ownerId: { type: String, required: true },
  modificationType: { type: String, required: true, enum: ['Engine', 'Exterior', 'Interior', 'Suspension', 'Performance', 'Other'] },
  description: { type: String, required: true },
  proposedChanges: { type: String, required: true },
  status: { type: String, required: false, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  // submissionDate: { type: Date, required: true, default: Date.now },
  // approvalDate: { type: Date, required: false },
  // rejectionReason: { type: String, required: false },
  images: { type: String, required: true }, // Changed from array to single string
}, {
  timestamps: true
});

// Creating the ModificationRequest model
const ModificationRequest = mongoose.model("ModificationRequest", ModificationRequestSchema);

export default ModificationRequest;
