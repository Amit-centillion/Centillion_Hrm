import { Request, Response } from "express";
import httpStatus from "http-status";
import Container from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateMenuRequest } from "../../../interfaces/IMenu";
import { ILoggedInUser } from "../../../interfaces/IUsers";
import { handleError } from "../../../utils/error";
import MenuService from "../middlewares/menu";

const index = async (req: Request, res: Response) => {
  try {
    const menuService = Container.get(MenuService);
    const result = await menuService.getAllMenus(
      req.body as IListRequest,
      req.user as ILoggedInUser
    );
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const menuService = Container.get(MenuService);
    const result = await menuService.updateMenu(req.body as IUpdateMenuRequest);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return handleError(req, res, error);
  }
};

export default {
  index,
  update,
};
