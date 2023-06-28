import { Request, Response } from "express";
import httpStatus from "http-status";
import { ERRORS } from "../constants/error.constant";
import Logger from "../loaders/logger";

export const handleError = (req: Request, res: Response, error) => {
  try {
    Logger.error(error);
    return res
      .status(error?.status || httpStatus.BAD_REQUEST)
      .json({ success: false, message: error?.message });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: ERRORS.SOMETHING_WENT_WRONG });
  }
};
