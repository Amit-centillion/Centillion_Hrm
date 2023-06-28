import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateDesignationRequest } from "../../../interfaces/IDesignation";

@Service()
export default class DesignationService {
  constructor(@Inject("Designation") private Designation: Models.Designation) {}

  async getAllDesignations(payload: IListRequest) {
    try {
      const sortKey: string = payload?.sortKey || "name";
      const sortDirection: number = payload?.sortDirection === "DESC" ? -1 : 1;
      let criteria = {};
      const options: PaginateOptions = {
        sort: { [sortKey]: sortDirection },
        page: payload.page || 1,
        limit: payload.limit || 10,
        populate: [{ path: "department" }],
      };

      if (payload.search) {
        Object.assign(criteria, { name: payload.search });
      }

      const designations =
        payload?.page || payload?.limit
          ? await this.Designation.paginate(criteria, options)
          : await this.Designation.find(criteria);

      return {
        status: true,
        designations,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateDesignation(payload: IUpdateDesignationRequest) {
    try {
      if (payload?._id) {
        await this.Designation.findOneAndUpdate({ _id: payload._id }, payload, {
          upsert: true,
          new: true,
        });
      } else {
        await this.Designation.create(payload);
      }
      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
