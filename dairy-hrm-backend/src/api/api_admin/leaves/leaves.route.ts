import { Router } from "express";
import leavesController from "./leaves.controller";

const route = Router();

route.post("/", leavesController.index);
route.put("/update", leavesController.update);
route.get("/statistics", leavesController.statistics);
route.post("/approve", leavesController.approve);

export default route;
