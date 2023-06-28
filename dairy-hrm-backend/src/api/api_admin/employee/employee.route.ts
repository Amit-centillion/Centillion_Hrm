import { Router } from "express";
import employeeController from "./employee.controller";

const route = Router();

route.post("/", employeeController.index);
route.put("/update", employeeController.update);

export default route;
