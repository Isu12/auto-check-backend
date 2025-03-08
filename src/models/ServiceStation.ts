  // models/ServiceStation.ts
  import mongoose from "mongoose";

  const serviceStationSchema = new mongoose.Schema({
    businessRegNo: { type: String, required: true },
    businessName: { type: String, required: true },
    branch: { type: String, required: false },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber1: { type: String, required: true },
    phoneNumber2: { type: String, required: false },
    ownerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email2: { type: String, required: false },
    webUrl: { type: String, required: false },
  });

  const ServiceStation = mongoose.model("ServiceStation", serviceStationSchema);

  export default ServiceStation;