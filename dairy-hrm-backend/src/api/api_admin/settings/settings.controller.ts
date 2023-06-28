import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import {
  IUpdateAllPayrollSettingRequest,
  IUpdatePayrollSettingRequest,
} from "../../../interfaces/IPayrollSettings";
import { handleError } from "../../../utils/error";
import SettingsService from "../middlewares/settings";

const getPayroll = async (req: Request, res: Response) => {
  try {
    const settingsService = Container.get(SettingsService);
    const result = await settingsService.getPayroll();
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const updatePayroll = async (req: Request, res: Response) => {
  try {
    const settingsService = Container.get(SettingsService);
    const result = await settingsService.updatePayroll(
      req.body as IUpdatePayrollSettingRequest
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const updateAllPayroll = async (req: Request, res: Response) => {
  try {
    const settingsService = Container.get(SettingsService);
    const result = await settingsService.updateAllPayroll(
      req.body as IUpdateAllPayrollSettingRequest[]
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  getPayroll,
  updatePayroll,
  updateAllPayroll,
};
