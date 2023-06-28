import { Router } from "express";
import roleController from "./role.controller";

const route = Router();

route.post("/", roleController.index);
route.put("/update", roleController.update);

export default route;
