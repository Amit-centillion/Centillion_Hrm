import { Router } from "express";
import settingsController from "./settings.controller";

const route = Router();
route.get("/payroll", settingsController.getPayroll);
route.post("/payroll/update", settingsController.updatePayroll);
route.post("/payroll/update-all", settingsController.updateAllPayroll);
export default route;
