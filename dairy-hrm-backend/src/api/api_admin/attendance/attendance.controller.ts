import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { handleError } from "../../../utils/error";
import AttendanceService from "../middlewares/attedance";

const index = async (req: Request, res: Response) => {
  try {
    const attendanceService = Container.get(AttendanceService);
    const result = await attendanceService.getAllAttendance(
      req.body as IListRequest
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  index,
};
