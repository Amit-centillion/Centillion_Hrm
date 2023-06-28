import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { ITimesheetUpdateRequest } from "../../../interfaces/ITimesheet";
import { ILoggedInUser } from "../../../interfaces/IUsers";
import { handleError } from "../../../utils/error";
import TimesheetService from "../middlewares/timesheet";

const index = async (req: Request, res: Response) => {
  try {
    const timesheetService = Container.get(TimesheetService);
    const result = await timesheetService.getAllTimesheet(
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
    const timesheetService = Container.get(TimesheetService);
    const result = await timesheetService.updateTimesheet(
      req.body as ITimesheetUpdateRequest,
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
