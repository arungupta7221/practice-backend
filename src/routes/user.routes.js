import { Router } from "express";
import { registerUser } from "../controllers/RegisterUser.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

export { userRouter };
