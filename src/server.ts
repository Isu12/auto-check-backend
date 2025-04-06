// server.ts
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import stationRoutes from "./routes/ServiceStationRoute";
import EchoTestRoute from "./routes/EchoTestRoute";
import InsuranceRoute from "./routes/InsuranceClaimRoute"
import cors from "cors";
import ServiceRecordRoute from "./routes/ServiceRecordRoute";
import AuthRoute from "./routes/Auth/auth.routes"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;


app.use(
  cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  })
);


app.use(express.json());

app.use("/api/service-record",ServiceRecordRoute);
app.use("/api/echo-test",EchoTestRoute);
app.use("/api/insurance-claim",InsuranceRoute);
app.use("/api/stations", stationRoutes);
app.use("/api/auth/",AuthRoute);


// Database Connection
connectDB();

// Routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});