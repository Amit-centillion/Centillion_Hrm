import { Router } from "express";
import departmentController from "./department.controller";

const route = Router();

route.post("/", departmentController.index);
route.put("/update", departmentController.update);

export default route;
