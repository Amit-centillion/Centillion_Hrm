import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateOvertimeRequest } from "../../../interfaces/IOvertime";
import { ILoggedInUser } from "../../../interfaces/IUsers";
import { handleError } from "../../../utils/error";
import OvertimeService from "../middlewares/overtime";

const index = async (req: Request, res: Response) => {
  try {
    const overtimeService = Container.get(OvertimeService);
    const result = await overtimeService.getAllOvertime(
      req.body as IListRequest,
      req.body as ILoggedInUser
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const overtimeService = Container.get(OvertimeService);
    const result = await overtimeService.updateOvertime(
      req.body as IUpdateOvertimeRequest,
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
