import { Router } from "express";
import attendanceController from "./attendance.controller";

const route = Router();

route.post("/", attendanceController.index);
route.post("/update", attendanceController.update);
route.get("/statistics", attendanceController.statistics);

export default route;
