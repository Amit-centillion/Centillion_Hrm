import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateOvertimeRequest } from "../../../interfaces/IOvertime";
import { ILoggedInUser, IUser } from "../../../interfaces/IUsers";
import user from "../../../models/user";

@Service()
export default class OvertimeService {
  constructor(
    @Inject("Overtime") private Overtime: Models.Overtime,
    @Inject("User") private User: Models.User
  ) {}

  async getAllOvertime(payload: IListRequest, user: ILoggedInUser) {
    try {
      const sortKey: string = payload?.sortKey || "name";
      const sortDirection: number = payload?.sortDirection === "DESC" ? -1 : 1;
      let criteria = {
        isDeleted: false,
      };
      const options: PaginateOptions = {
        sort: { [sortKey]: sortDirection },
        page: payload.page || 1,
        limit: payload.limit || 10,
      };

      if (payload.search) {
        Object.assign(criteria, { name: payload.search });
      }

      if (user?.role?.name === "EMPLOYEE") {
        Object.assign(criteria, { employee: user._id });
      }

      const overtime =
        payload?.page || payload?.limit
          ? await this.Overtime.paginate(criteria, options)
          : await this.Overtime.find(criteria);

      return {
        status: true,
        overtime,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateOvertime(payload: IUpdateOvertimeRequest, user: ILoggedInUser) {
    try {
      if (payload?._id) {
        await this.Overtime.updateOne(
          { _id: payload._id },
          { ...payload },
          { upsert: true, new: true }
        );
      } else {
        await this.Overtime.create({
          ...payload,
          employee: user._id,
          approvedBy: null,
        });
      }
      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
