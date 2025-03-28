import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import ServiceRecordRoute from "./routes/ServiceRecordRoute";
import EchoTestRoute from "./routes/EchoTestRoute";
import InsuranceRoute from "./routes/InsuranceClaimRoute"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/service-record",ServiceRecordRoute);
app.use("/api/echo-test",EchoTestRoute);
app.use("/api/insurance-claim",InsuranceRoute);


// Database Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
