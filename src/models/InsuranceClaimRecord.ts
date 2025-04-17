import mongoose from "mongoose";

// Defining the ServiceRecord Schema
const InsuranceClaimRecordSchema = new mongoose.Schema({
  InsuranceID: { type: String, required: false },
  ClaimDate: { type: Date, required: false },
  ClaimType: { type: String, required: false },
  ClaimAmountRequested: { type: Number, required: false },
  ClaimAmountApproved: { type: Number, required: false },
  DamageDescription: { type: String, required: false },
  DamageImageURL1: { type: String, required: false },
  DamageImageURL2: { type: String, required: false },
  DamageImageURL3: { type: String, required: false },
  DamageImageURL4: { type: String, required: false },
  DamageImageURL5: { type: String, required: false },
  vehicle: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Vehicle",
      required: false 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: false 
    }
});

// Creating the ServiceRecord model
const InsuranceClaimRecord = mongoose.model("InsuranceClaimRecord", InsuranceClaimRecordSchema);

export default InsuranceClaimRecord;
