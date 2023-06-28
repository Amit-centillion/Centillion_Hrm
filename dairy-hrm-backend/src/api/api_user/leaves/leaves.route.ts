import { Router } from "express";
import leavesController from "./leaves.controller";

const route = Router();

route.post("/", leavesController.index);
route.put("/update", leavesController.update);
route.get("/statistics", leavesController.statistics);

export default route;
