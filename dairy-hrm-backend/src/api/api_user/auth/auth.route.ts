import { Router } from "express";
import { authorize } from "../../../utils/authorize";
import authController from "./auth.controller";

const route = Router();

route.post("/login", authController.login);
route.post("/change-password", authController.changePassword);
route.get("/verify-token/:id", authController.verifyToken);
route.get("/get-profile", authController.getUserProfile);
route.get("/logout/:id", authController.logout);

export default route;
