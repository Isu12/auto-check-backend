import mongoose from "mongoose";

// Defining the ServiceRecord Schema
const ServiceRecordSchema = new mongoose.Schema({
  OdometerReading: { type: Number, required: true },
  DateOfService: { type: Date, required: true },
  ServiceType: { type: String, required: true },
  DescriptionOfIssue: { type: String, required: true },
  Diagnosis: { type: String, required: false },
  ServiceDetails: { type: String, required: false },
  PartsUsed: { type: String, required: true },
  ServiceCost: { type: Number, required: true },
  WarrantyInfo: { type: String, required: false },
  NextServiceDate: { type: Date, required: false },
  RecommendedServices: { type: String, required: false }
});

// Creating the ServiceRecord model
const ServiceRecord = mongoose.model("ServiceRecord", ServiceRecordSchema);

export default ServiceRecord;