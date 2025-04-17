import mongoose from "mongoose";
import user from "./Auth/user";

// Defining the ServiceRecord Schema
const ServiceRecordSchema = new mongoose.Schema({

  OdometerReading: { type: Number, required: false },
  DateOfService: { type: Date, required: false },
  ServiceType: { type: String, required: false },
  DescriptionOfIssue: { type: String, required: false },
  Diagnosis: { type: String, required: false },
  ServiceDetails: { type: String, required: false },
  PartsUsed: { type: String, required: false },
  ServiceCost: { type: Number, required: false },
  WarrantyInfo: { type: String, required: false },
  NextServiceDate: { type: Date, required: false },
  RecommendedServices: { type: String, required: false },
  InvoiceImageURL: { type: String, required: false },
  vehicle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Vehicle",
    required: false 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: false 
  },});

// Creating the ServiceRecord model
const ServiceRecord = mongoose.model("ServiceRecord", ServiceRecordSchema);

export default ServiceRecord;
