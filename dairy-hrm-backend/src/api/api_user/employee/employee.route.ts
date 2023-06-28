import { Router } from "express";
import { authorize } from "../../../utils/authorize";
import employeeController from "./employee.controller";

const route = Router();

route.get("/summary", employeeController.getSummary);
route.get("/punch", employeeController.punchTime);

export default route;
