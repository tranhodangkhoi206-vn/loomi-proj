import express from 'express'
import { deleteUser } from '../../controllers/user/userManagement.js';

const userRoute = express.Router();
userRoute.post("/deleteUser", deleteUser);

export default userRoute;
