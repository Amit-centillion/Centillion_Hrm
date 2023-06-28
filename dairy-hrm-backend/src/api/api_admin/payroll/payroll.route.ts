import { Router } from "express";
import payrollController from "./payroll.controller";

const routes = Router();

routes.post("/", payrollController.index);
routes.post("/update", payrollController.update);

export default routes;
