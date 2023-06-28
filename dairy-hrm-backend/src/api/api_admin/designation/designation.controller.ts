import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { handleError } from "../../../utils/error";
import DesignationService from "../middlewares/designation";

const index = async (req: Request, res: Response) => {
  try {
    const designationService = Container.get(DesignationService);
    const result = await designationService.getAllDesignations(
      req.body as IListRequest
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const designationService = Container.get(DesignationService);
    const result = await designationService.updateDesignation(req.body);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  index,
  update,
};
