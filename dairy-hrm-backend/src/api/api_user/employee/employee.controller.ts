import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { ILoggedInUser } from "../../../interfaces/IUsers";
import { handleError } from "../../../utils/error";
import EmployeeService from "../middlewares/employee";

const getSummary = async (req: Request, res: Response) => {
  try {
    const employeeService = Container.get(EmployeeService);
    const result = await employeeService.getSummary(req.user as ILoggedInUser);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const punchTime = async (req: Request, res: Response) => {
  try {
    const employeeService = Container.get(EmployeeService);
    const result = await employeeService.punchTime(req.user as ILoggedInUser);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  getSummary,
  punchTime,
};
