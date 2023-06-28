import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateLeaveRequest } from "../../../interfaces/ILeaves";
import { ILoggedInUser } from "../../../interfaces/IUsers";
import { handleError } from "../../../utils/error";
import LeaveService from "../middlewares/leaves";

const index = async (req: Request, res: Response) => {
  try {
    const leaveService = Container.get(LeaveService);
    const result = await leaveService.getAllLeaves(
      req.body as IListRequest,
      req.user as ILoggedInUser
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const leaveService = Container.get(LeaveService);
    const result = await leaveService.updateLeave(
      req.body as IUpdateLeaveRequest,
      req.user as ILoggedInUser
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const statistics = async (req: Request, res: Response) => {
  try {
    const leaveService = Container.get(LeaveService);
    const result = await leaveService.getStatistics(req.user as ILoggedInUser);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  index,
  update,
  statistics,
};
