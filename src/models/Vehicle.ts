import mongoose from "mongoose";

// Defining the Vehicle Schema
const VehicleSchema = new mongoose.Schema({
  Registration_no: { type: String, required: true },
  Chasisis_No: { type: String, required: true },
  Current_Owner: { type: String, required: true },
  Address: { type: String, required: true },
  NIC: { type: String, required: true },
  Conditions_Special_note: { type: String, required: true },
  Absolute_Owner: { type: String, required: true },
  Engine_No: { type: String, required: false },
  Cylinder_Capacity: { type: String, required: false },
  Class_of_Vehicle: { type: String, required: true },
  Taxation_Class: { type: String, required: true },
  Status_When_Registered: { type: String, required: false },
  Fuel_Type: { type: String, required: false },
  Make: { type: String, required: false },
  Country_of_Origin: { type: String, required: false },
  Model: { type: String, required: false },
  Manufactures_Description: { type: String, required: false },
  Wheel_Base: { type: String, required: false },
  Type_of_Body: { type: String, required: false },
  Year_of_Manufacture: { type: String, required: false },
  Colour: { type: String, required: false },
  Previous_Owners: { type: String, required: false },
  Seating_capacity: { type: String, required: false },
  Weight: { type: String, required: false },
  Length: { type: String, required: false },
  Width: { type: String, required: false },
  Height: { type: String, required: false },
  Provincial_Council: { type: String, required: false },
  Date_of_First_Registration: { type: String, required: false },
  Taxes_Payable: { type: String, required: false },
  vehicle_front_img_url: { type: String, required: false },
  vehicle_left_img_url: { type: String, required: false },
  vehicle_right_img_url: { type: String, required: false },
  vehicle_rear_img_url: { type: String, required: false },
});
// Creating the ServiceRecord model
const Vehicle = mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;