import express from "express";
import { login, logout, register } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/auth/register", register);
authRoute.post("/auth/login", login);
authRoute.post("/auth/logout", logout);

export default authRoute;
