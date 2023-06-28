import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";

@Service()
export default class PolicyService {
  constructor(@Inject("Policy") private Policy: Models.Policy) {}

  async getAllPolicy(payload: IListRequest) {
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

      const policy =
        payload?.page || payload?.limit
          ? await this.Policy.paginate(criteria, options)
          : await this.Policy.find(criteria);

      return {
        status: true,
        policy,
      };
    } catch (error) {
      throw error;
    }
  }
}
