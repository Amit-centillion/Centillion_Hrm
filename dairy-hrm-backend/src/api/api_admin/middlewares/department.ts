import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateDepartmentRequest } from "../../../interfaces/IDepartment";

@Service()
export default class DepartmentService {
  constructor(@Inject("Department") private Department: Models.Department) {}
  async getAllDepartments(payload: IListRequest) {
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

      const departments =
        payload?.page || payload?.limit
          ? await this.Department.paginate(criteria, options)
          : await this.Department.find(criteria);

      return {
        status: true,
        departments,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateDepartment(payload: IUpdateDepartmentRequest) {
    try {
      if (payload?._id) {
        await this.Department.findOneAndUpdate({ _id: payload._id }, payload, {
          upsert: true,
          new: true,
        });
      } else {
        await this.Department.create(payload);
      }
      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
