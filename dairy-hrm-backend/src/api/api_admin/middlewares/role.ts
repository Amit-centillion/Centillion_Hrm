import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateRoleRequest } from "../../../interfaces/IRoles";

@Service()
export default class RoleService {
  constructor(@Inject("Role") private Role: Models.Role) {}

  async getAllRoles(payload: IListRequest) {
    try {
      const sortKey: string = payload?.sortKey || "name";
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

      const roles =
        payload.limit || payload.page
          ? await this.Role.paginate(criteria, options)
          : await this.Role.find(criteria);

      return {
        status: true,
        roles,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateRole(payload: IUpdateRoleRequest) {
    try {
      if (payload._id) {
        await this.Role.findOneAndUpdate({ _id: payload._id }, payload, {
          upsert: true,
          new: true,
        });
      } else {
        await this.Role.create({
          ...payload,
          modules: [],
        });
      }
      return { status: true };
    } catch (error) {
      throw error;
    }
  }
}
