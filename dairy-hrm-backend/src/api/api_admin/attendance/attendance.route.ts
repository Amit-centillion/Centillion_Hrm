import { Router } from "express";
import attendanceController from "./attendance.controller";

const route = Router();

route.post("/", attendanceController.index);

export default route;
