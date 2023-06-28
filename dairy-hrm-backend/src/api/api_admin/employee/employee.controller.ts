import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateEmployeeRequest } from "../../../interfaces/IUsers";
import { handleError } from "../../../utils/error";
import EmployeeService from "../middlewares/employee";

const index = async (req: Request, res: Response) => {
  try {
    const employeeService = Container.get(EmployeeService);
    const result = await employeeService.getAllEmployees(
      req.body as IListRequest
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const employeeService = Container.get(EmployeeService);
    const result = await employeeService.updateEmployee(
      req.body as IUpdateEmployeeRequest
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  index,
  update,
};
