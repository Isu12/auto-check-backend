import mongoose from "mongoose";

// Defining the ServiceRecord Schema
const EchoTestRecordSchema = new mongoose.Schema({
  TestID: { type: Number, required: false },
  IssuedDate: { type: Date, required: false },
  ExpiryDate: { type: Date, required: false },
  TestingCenterName: { type: String, required: false },
  TestingCenterBranch: { type: String, required: false },
  CertificateFileURL: { type: String, required: false }
});

// Creating the ServiceRecord model
const EchoTestRecord = mongoose.model("EchoTestRecord", EchoTestRecordSchema);

export default EchoTestRecord;
