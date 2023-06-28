import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { handleError } from "../../../utils/error";
import PolicyService from "../middlewares/policy";

const index = async (req: Request, res: Response) => {
  try {
    const policyService = Container.get(PolicyService);
    const result = await policyService.getAllPolicy(req.body as IListRequest);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  index,
};
