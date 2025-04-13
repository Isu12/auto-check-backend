import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  Registration_no: { type: String, required: true },
  Chasisis_No: { type: String, required: true },
  Current_Owner: { type: String, required: true },
  Address: { type: String, required: true },
  NIC: { type: String, required: true },
  Conditions_Special_note: { type: String, required: true },
  Absolute_Owner: { type: String, required: true },
  Engine_No: { type: String },
  Cylinder_Capacity: { type: String },
  Class_of_Vehicle: { type: String, required: true },
  Taxation_Class: { type: String, required: true },
  Status_When_Registered: { type: String },
  Fuel_Type: { type: String },
  Make: { type: String },
  Country_of_Origin: { type: String },
  Model: { type: String },
  Manufactures_Description: { type: String },
  Wheel_Base: { type: String },
  Type_of_Body: { type: String },
  Year_of_Manufacture: { type: String },
  Colour: { type: String },
  Previous_Owners: { type: String },
  Seating_capacity: { type: String },
  Weight: { type: String },
  Length: { type: String },
  Width: { type: String },
  Height: { type: String },
  Provincial_Council: { type: String },
  Date_of_First_Registration: { type: String },
  Taxes_Payable: { type: String },
  Front_Photo: { type: String },
  Left_Photo: { type: String },
  Right_Photo: { type: String },
  Rear_Photo: { type: String },

  // New fields to track records
  echoTests: [{ type: mongoose.Schema.Types.ObjectId, ref: "EchoTestRecord" }],
  insuranceClaims: [{ type: mongoose.Schema.Types.ObjectId, ref: "InsuranceClaimRecord" }],
  serviceRecords: [{type: mongoose.Schema.Types.ObjectId, ref:"ServiceRecord"}]
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
