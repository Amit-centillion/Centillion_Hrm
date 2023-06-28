import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateHolidayRequest } from "../../../interfaces/IHolidays";
import { handleError } from "../../../utils/error";
import HolidayService from "../middlewares/holiday";

const index = async (req: Request, res: Response) => {
  try {
    const holidayService = Container.get(HolidayService);
    const result = await holidayService.getAllHolidays(
      req.body as IListRequest
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const holidayService = Container.get(HolidayService);
    const result = await holidayService.updateHoliday(
      req.body as IUpdateHolidayRequest
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
