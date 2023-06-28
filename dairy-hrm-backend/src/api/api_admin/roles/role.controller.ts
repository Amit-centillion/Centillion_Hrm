import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { handleError } from "../../../utils/error";
import RoleService from "../middlewares/role";

const index = async (req: Request, res: Response) => {
  try {
    const roleService = Container.get(RoleService);
    const result = await roleService.getAllRoles(req.body as IListRequest);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const roleService = Container.get(RoleService);
    const result = await roleService.updateRole(req.body);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  index,
  update,
};
