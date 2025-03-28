// server.ts
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import stationRoutes from "./routes/ServiceStationRoute";
import cors from "cors";
import mongoose from "mongoose";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

app.use(cors());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/stations", stationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});