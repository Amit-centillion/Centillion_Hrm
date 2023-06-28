import moment from "moment";
import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";

@Service()
export default class AttendanceService {
  constructor(@Inject("Attendance") private Attendance: Models.Attendance) {}
  async getAllAttendance(payload: IListRequest) {
    try {
      const sortKey: string = payload?.sortKey || "createdAt";
      const sortDirection: number = payload?.sortDirection === "DESC" ? -1 : 1;
      let criteria = {
        workDate: {
          $gte: moment().startOf("day").utc(true).toDate(),
          $lte: moment().endOf("day").utc(true).toDate(),
        },
      };
      let filters = payload?.filters;
      const options: PaginateOptions = {
        sort: { [sortKey]: sortDirection },
        page: payload.page || 1,
        limit: payload.limit || 10,
        populate: [
          { path: "user", select: { firstName: 1, lastName: 1 } },
          { path: "overtime" },
        ],
      };

      if (payload.search) {
        Object.assign(criteria, { name: payload.search });
      }

      if (filters?.year && filters?.month && filters?.date) {
        let startDate: Date;
        let endDate: Date;

        startDate = moment(
          `${filters?.date} ${filters?.month} ${filters?.year}`,
          "dd MM yyyy"
        )
          .startOf("day")
          .utc(true)
          .toDate();
        endDate = moment(
          `${filters?.date} ${filters?.month} ${filters?.year}`,
          "dd MM yyyy"
        )
          .endOf("day")
          .utc(true)
          .toDate();

        Object.assign(criteria, {
          workDate: { $gte: startDate, $lte: endDate },
        });
      }

      if (filters?.year && filters?.date) {
        let startDate: Date;
        let endDate: Date;

        startDate = moment(`${filters?.date} ${filters?.year}`, "dd yyyy")
          .startOf("day")
          .utc(true)
          .toDate();
        endDate = moment(`${filters?.date} ${filters?.year}`, "dd yyyy")
          .endOf("day")
          .utc(true)
          .toDate();

        Object.assign(criteria, {
          workDate: { $gte: startDate, $lte: endDate },
        });
      }

      if (filters?.month && filters?.date) {
        let startDate: Date;
        let endDate: Date;

        startDate = moment(`${filters?.date} ${filters?.month}`, "dd MM")
          .startOf("day")
          .utc(true)
          .toDate();
        endDate = moment(`${filters?.date} ${filters?.month}`, "dd MM")
          .endOf("day")
          .utc(true)
          .toDate();

        Object.assign(criteria, {
          workDate: { $gte: startDate, $lte: endDate },
        });
      }

      if (filters?.year) {
        let startDate: Date;
        let endDate: Date;

        startDate = moment(`${filters?.year}`, "yyyy")
          .startOf("year")
          .utc(true)
          .toDate();
        endDate = moment(`${filters?.year}`, "yyyy")
          .endOf("year")
          .utc(true)
          .toDate();

        Object.assign(criteria, {
          workDate: { $gte: startDate, $lte: endDate },
        });
      }

      if (filters?.month) {
        let startDate: Date;
        let endDate: Date;

        startDate = moment(`${filters?.month}`, "MM")
          .startOf("month")
          .utc(true)
          .toDate();
        endDate = moment(`${filters?.month}`, "MM")
          .endOf("month")
          .utc(true)
          .toDate();

        Object.assign(criteria, {
          workDate: { $gte: startDate, $lte: endDate },
        });
      }

      if (filters?.date) {
        let startDate: Date;
        let endDate: Date;

        startDate = moment(`${filters?.date}`, "YYYY-MM-DD")
          .startOf("day")
          .utc(true)
          .toDate();
        endDate = moment(`${filters?.date}`, "YYYY-MM-DD")
          .endOf("day")
          .utc(true)
          .toDate();

        Object.assign(criteria, {
          workDate: { $gte: startDate, $lte: endDate },
        });
      }

      if (filters?.employee) {
        Object.assign(criteria, { user: filters?.employee });
      }

      const attendances =
        payload?.page || payload?.limit
          ? await this.Attendance.paginate(criteria, options)
          : await this.Attendance.find(criteria);

      return {
        status: true,
        attendances,
      };
    } catch (error) {
      throw error;
    }
  }
}
