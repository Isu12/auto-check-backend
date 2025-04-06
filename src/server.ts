// server.ts
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import stationRoutes from "./routes/ServiceStationRoute";
import EchoTestRoute from "./routes/EchoTestRoute";
import InsuranceRoute from "./routes/InsuranceClaimRoute"
import cors from "cors";
import mongoose from "mongoose";
import ServiceRecordRoute from "./routes/ServiceRecordRoute";
import VehicleRoute from "./routes/VehicleRoute";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

app.use(cors());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.use(express.json());

app.use("/api/service-record",ServiceRecordRoute)
app.use("/api/vehicle-record",VehicleRoute)
app.use("/api/service-record",ServiceRecordRoute);
app.use("/api/echo-test",EchoTestRoute);
app.use("/api/insurance-claim",InsuranceRoute);
app.use("/api/stations", stationRoutes);


// Database Connection
connectDB();

// Routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});