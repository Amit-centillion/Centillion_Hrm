import moment from "moment";
import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";
import { ITimesheetUpdateRequest } from "../../../interfaces/ITimesheet";
import { ILoggedInUser } from "../../../interfaces/IUsers";

@Service()
export default class TimesheetService {
  constructor(
    @Inject("Timesheet") private Timesheet: Models.Timesheet,
    @Inject("Attendance") private Attendance: Models.Attendance
  ) {}

  async getAllTimesheet(payload: IListRequest, user: ILoggedInUser) {
    try {
      const sortKey: string = payload?.sortKey || "workDate";
      const sortDirection: number = payload?.sortDirection === "ASC" ? 1 : -1;
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
      };

      if (payload.search) {
        Object.assign(criteria, { name: payload.search });
      }

      if (user?.role?.name === "EMPLOYEE") {
        Object.assign(criteria, { employee: user._id });
      }

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

      const timesheets =
        payload?.page || payload?.limit
          ? await this.Timesheet.paginate(criteria, options)
          : await this.Timesheet.find(criteria);

      return {
        status: true,
        timesheets,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateTimesheet(payload: ITimesheetUpdateRequest, user: ILoggedInUser) {
    try {
      const attendance = await this.Attendance.findOne({
        user: user._id,
        workDate: {
          $gte: moment(payload.workDate).utc(true).toDate(),
          $lte: moment(payload.workDate).endOf("day").utc(true).toDate(),
        },
      });

      if (payload?._id) {
        await this.Timesheet.updateOne(
          { _id: payload._id },
          {
            workDate: moment(payload.workDate).utc(true).toDate(),
            description: payload.description,
          },
          { upsert: true, new: true }
        );
      } else {
        await this.Timesheet.create({
          workDate: moment(payload.workDate).utc(true).toDate(),
          workHours: attendance
            ? Number(`${attendance.hours.toFixed(0)}.${attendance.minutes}`)
            : 0,
          description: payload.description,
          employee: user._id,
        });
      }
      return { status: true };
    } catch (error) {
      throw error;
    }
  }
}
