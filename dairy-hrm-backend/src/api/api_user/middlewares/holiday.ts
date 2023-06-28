import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";

@Service()
export default class HolidayService {
  constructor(@Inject("Holiday") private Holiday: Models.Holiday) {}

  async getAllHolidays(payload: IListRequest) {
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

      const holidays =
        payload?.page || payload?.limit
          ? await this.Holiday.paginate(criteria, options)
          : await this.Holiday.find(criteria);

      return {
        status: true,
        holidays,
      };
    } catch (error) {
      throw error;
    }
  }
}
