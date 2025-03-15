import mongoose from "mongoose";

// Defining the ModificationRequest Schema
const ModificationRequestSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  modificationType: { type: String, required: true, enum: ['Engine', 'Exterior', 'Interior', 'Suspension', 'Performance', 'Other'] },
  description: { type: String, required: true },
  proposedChanges: { type: String, required: true },
  status: { type: String, required: true, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  submissionDate: { type: Date, required: true, default: Date.now },
  approvalDate: { type: Date, required: false },
  rejectionReason: { type: String, required: false },
  images: [{
    url: { type: String, required: true },
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Creating the ModificationRequest model
const ModificationRequest = mongoose.model("ModificationRequest", ModificationRequestSchema);

export default ModificationRequest;
