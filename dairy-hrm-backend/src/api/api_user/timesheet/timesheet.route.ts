import { Router } from "express";
import timesheetController from "./timesheet.controller";

const route = Router();

route.post("/", timesheetController.index);
route.post("/update", timesheetController.update);

export default route;
