import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { ILoggedInUser } from "../../../interfaces/IUsers";
import AttendanceService from "../middlewares/attendance";

const index = async (req: Request, res: Response) => {
  try {
    const attendanceService = Container.get(AttendanceService);
    const result = await attendanceService.getAllAttendance(
      req.body as IListRequest,
      req.user as ILoggedInUser
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {}
};

const update = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const statistics = async (req: Request, res: Response) => {
  try {
    const attendanceService = Container.get(AttendanceService);
    const result = await attendanceService.getStatistics(
      req.user as ILoggedInUser
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {}
};

export default {
  index,
  update,
  statistics,
};
