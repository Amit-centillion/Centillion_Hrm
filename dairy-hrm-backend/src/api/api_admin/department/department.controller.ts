import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { handleError } from "../../../utils/error";
import DepartmentService from "../middlewares/department";

const index = async (req: Request, res: Response) => {
  try {
    const departmentService = Container.get(DepartmentService);
    let result = await departmentService.getAllDepartments(
      req.body as IListRequest
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const departmentService = Container.get(DepartmentService);
    const result = await departmentService.updateDepartment(req.body);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  index,
  update,
};
