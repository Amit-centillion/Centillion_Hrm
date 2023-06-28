import { Router } from "express";
import { authorize } from "../../../utils/authorize";
import menuController from "./menu.controller";

const route = Router();

route.post("/", menuController.index);
route.post("/update", menuController.update);

export default route;
