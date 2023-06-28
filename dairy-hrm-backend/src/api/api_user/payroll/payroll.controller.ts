import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdatePayrollRequest } from "../../../interfaces/IPayroll";
import { ILoggedInUser } from "../../../interfaces/IUsers";
import { handleError } from "../../../utils/error";
import PayrollService from "../middlewares/payroll";

const index = async (req: Request, res: Response) => {
  try {
    const payrollService = Container.get(PayrollService);
    const result = await payrollService.getAllPayrolls(
      req.body as IListRequest
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const payrollService = Container.get(PayrollService);
    const result = await payrollService.updatePayroll(
      req.body as IUpdatePayrollRequest,
      req.user as ILoggedInUser
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
