import { Router } from "express";
import holidayController from "./holiday.controller";

const route = Router();

route.post("/", holidayController.index);
route.put("/update", holidayController.update);

export default route;
