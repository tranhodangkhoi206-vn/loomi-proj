import express from "express";
import { signin, signup } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/signin", signin);
authRoute.post("/signup", signup);

export default authRoute;
