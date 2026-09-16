import { config } from "dotenv";
import express from "express";
import ConnectDB from "./config/db.js";
import dns from "dns";
import authRouter from "./routes/authRoute.js";
import jsonparser from "jsonparser";

// dns.setServers(["8.8.8.8"], ["8.8.4.4"]);

config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
// app.use(jsonparser());
app.use('/api/auth', authRouter);

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
  });
});
