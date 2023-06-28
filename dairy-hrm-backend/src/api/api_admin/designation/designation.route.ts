import { Router } from "express";
import designationController from "./designation.controller";

const route = Router();

route.post("/", designationController.index);
route.put("/update", designationController.update);

export default route;
