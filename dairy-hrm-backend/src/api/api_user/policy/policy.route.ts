import { Router } from "express";
import policyController from "./policy.controller";

const route = Router();

route.post("/", policyController.index);

export default route;
