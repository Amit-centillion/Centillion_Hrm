import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import {
  IAuthRequest,
  IChangePasswordRequest,
  ILoggedInUser,
} from "../../../interfaces/IUsers";
import { handleError } from "../../../utils/error";
import AuthService from "../middlewares/auth";

const login = async (req: Request, res: Response) => {
  try {
    const authService = Container.get(AuthService);
    const result = await authService.login(req.body as IAuthRequest);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const verifyToken = async (req: Request, res: Response) => {
  try {
    const authService = Container.get(AuthService);
    const result = await authService.verifyToken(req.params);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const authService = Container.get(AuthService);
    const result = await authService.logout(req.params);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const authService = Container.get(AuthService);
    const result = await authService.getUserProfile(req.user as ILoggedInUser);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const authService = Container.get(AuthService);
    const result = await authService.changePassword(
      req.body as IChangePasswordRequest,
      req.user as ILoggedInUser
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  login,
  verifyToken,
  logout,
  getUserProfile,
  changePassword,
};
