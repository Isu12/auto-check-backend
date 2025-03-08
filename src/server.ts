// server.ts
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import stationRoutes from "./routes/stationRoutes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());


app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/stations", stationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});