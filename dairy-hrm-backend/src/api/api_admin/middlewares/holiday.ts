import moment from "moment";
import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateHolidayRequest } from "../../../interfaces/IHolidays";

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

  async updateHoliday(payload: IUpdateHolidayRequest) {
    try {
      let data = {
        ...payload,
        day: moment(payload.holidayDate, "YYYY-MM-DD").format("dddd"),
      };
      if (payload?._id) {
        await this.Holiday.findOneAndUpdate({ _id: payload._id }, data, {
          upsert: true,
          new: true,
        });
      } else {
        await this.Holiday.create(data);
      }
      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
