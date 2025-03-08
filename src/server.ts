import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import ServiceRecordRoute from "./routes/ServiceRecordRoute";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/service-record",ServiceRecordRoute)

// Database Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
