import { config } from "dotenv";
import express from "express";
import ConnectDB from "./config/db.js";
import dns from "dns";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/user/userRoute.js";
// import jsonparser from "jsonparser";

// dns.setServers(["8.8.8.8"], ["8.8.4.4"]);

config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
// app.use(jsonparser());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute)

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
  });
});
