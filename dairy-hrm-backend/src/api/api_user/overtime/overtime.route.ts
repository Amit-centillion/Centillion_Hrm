import { Router } from "express";
import overtimeController from "./overtime.controller";

const route = Router();

route.post("/", overtimeController.index);
route.put("/update", overtimeController.update);

export default route;
