import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { IAppraisalRequest } from "../../../interfaces/IAppraisal";
import { handleError } from "../../../utils/error";
import AppraisalService from "../middlewares/appraisal";

const index = async (req: Request, res: Response) => {
  try {
    const appraisalService = Container.get(AppraisalService);
    const result = await appraisalService.getAllAppraisals(
      req.body as IListRequest
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const appraisalService = Container.get(AppraisalService);
    const result = await appraisalService.updateAppraisal(
      req.body as IAppraisalRequest
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
