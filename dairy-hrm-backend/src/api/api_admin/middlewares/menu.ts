import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateMenuRequest } from "../../../interfaces/IMenu";
import { ILoggedInUser } from "../../../interfaces/IUsers";

@Service()
export default class MenuService {
  constructor(@Inject("Menu") private Menu: Models.Menu) {}
  async getAllMenus(payload: IListRequest, user: ILoggedInUser) {
    try {
      const sortKey: string = payload?.sortKey || "order";
      const sortDirection: number = payload?.sortDirection === "DESC" ? -1 : 1;
      let criteria = {};
      const options: PaginateOptions = {
        sort: { [sortKey]: sortDirection },
        page: payload.page || 1,
        limit: payload.limit || 10,
      };

      if (payload.search) {
        Object.assign(criteria, { name: payload.search });
      }

      if (payload.filters?.role) {
        Object.assign(criteria, { roles: { $in: payload.filters.role } });
      }

      const menus =
        payload?.page || payload?.limit
          ? await this.Menu.paginate(criteria, options)
          : await this.Menu.find(criteria).sort(sortKey);

      return {
        status: true,
        menus,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateMenu(payload: IUpdateMenuRequest) {
    try {
      const lastOrder = await this.Menu.findOne({}).sort({ order: -1 });
      if (payload?._id) {
        await this.Menu.updateOne({ name: payload.name }, payload, {
          upsert: true,
          new: true,
        });
      } else {
        await this.Menu.create({ ...payload, order: lastOrder?.order + 1 });
      }
      return { status: true };
    } catch (error) {}
  }
}
