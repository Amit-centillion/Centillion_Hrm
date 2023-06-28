import { Router } from "express";
import userRoutes from "./api_user";
import adminRoutes from "./api_admin";
import { authorize } from "../utils/authorize";

const route = Router();

route.use("/user", userRoutes);
route.use("/admin", adminRoutes);

export default route;
