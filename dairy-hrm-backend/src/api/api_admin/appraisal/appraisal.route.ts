import { Router } from "express";
import appraisalController from "./appraisal.controller";

const route = Router();

route.post("/", appraisalController.index);
route.post("/update", appraisalController.update);

export default route;
