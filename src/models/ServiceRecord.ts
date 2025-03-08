import mongoose from "mongoose";

const ServiceRecordSchema = new mongoose.Schema({
  OdometerReading: {type: Number, required: true},
  DateOfService: {type: Date, required: true},
  ServiceType: {type: String, required: true},
  Description: {type: String, required: true},
  Diagnosis: {type: String, required: false},
  ServiceDetails: {type: String, required: true},
  PartsUsed: {type: String, required: true},
  ServiceCost: {type: Number, required: true},
  WarrantyInfo: {type: String, required: false},
  NextServiceDate: {type: Date, required: false},
  RecommendedServices: {type: String, required: false}

})

const ServiceRecord = mongoose.model("ServiceRecord", ServiceRecordSchema);

export default ServiceRecord;