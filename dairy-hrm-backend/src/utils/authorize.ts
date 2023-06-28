import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config";
import { ERRORS } from "../constants";
import { handleError } from "./error";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      config.secrets.jwt,
      (error, decoded) => {
        if (error) {
          return handleError(req, res, {
            status: httpStatus.UNAUTHORIZED,
            message: ERRORS.UNAUTHORIZED_USER,
          });
        } else {
          req.user = decoded as any;
          next();
        }
      }
    );
  } else {
    return handleError(req, res, {
      status: httpStatus.UNAUTHORIZED,
      message: ERRORS.UNAUTHORIZED_USER,
    });
  }
};
