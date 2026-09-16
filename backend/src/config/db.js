import { config } from "dotenv";
import mongoose from "mongoose";

config();
const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Đã kết nối với database thành công!");
  } catch (err) {
    console.error("Kết nối database không thành công!", err);
    process.exit(1);
  }
};
export default ConnectDB;
