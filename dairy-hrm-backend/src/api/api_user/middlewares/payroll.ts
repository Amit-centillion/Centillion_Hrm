import moment from "moment";
import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { LEAVE_STATUSES, LEAVE_TYPES } from "../../../constants/leave.constant";
import { HOLIDAY_TYPES, weekends } from "../../../enums/weekends.enum";
import { IListRequest } from "../../../interfaces";
import { IUpdatePayrollRequest } from "../../../interfaces/IPayroll";
import { ILoggedInUser } from "../../../interfaces/IUsers";

@Service()
export default class PayrollService {
  constructor(
    @Inject("Payroll") private Payroll: Models.Payroll,
    @Inject("Attendance") private Attendance: Models.Attendance,
    @Inject("Leave") private Leave: Models.Leave,
    @Inject("Holiday") private Holiday: Models.Holiday
  ) {}
  async getAllPayrolls(payload: IListRequest) {
    try {
      const sortKey: string = payload?.sortKey || "createdAt";
      const sortDirection: number = payload?.sortDirection === "DESC" ? -1 : 1;
      let criteria = {};

      const options: PaginateOptions = {
        sort: { [sortKey]: sortDirection },
        page: payload.page || 1,
        limit: payload.limit || 10,
        populate: [
          {
            path: "employee",
            select: {
              firstName: 1,
              lastName: 1,
              joiningDate: 1,
              email: 1,
              designation: 1,
            },
            populate: {
              path: "designation",
              select: { name: 1 },
            },
          },
        ],
      };

      const payrolls =
        payload?.page || payload?.limit
          ? await this.Payroll.paginate(criteria, options)
          : await this.Payroll.find(criteria);

      return {
        status: true,
        payrolls,
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePayroll(payload: IUpdatePayrollRequest, user: ILoggedInUser) {
    try {
      let startDay = moment(payload?.payrollMonth, "YYYY-MM")
        .startOf("month")
        .startOf("day")
        .utc(true)
        .toDate();
      const endDay = moment(payload?.payrollMonth, "YYYY-MM")
        .endOf("month")
        .endOf("day")
        .utc(true)
        .toDate();
      const totalDays = moment(payload.payrollMonth, "YYYY-MM").daysInMonth();
      let totalWorkingDays = 0;
      let totalWeekendDays = 0;
      let totalLeaves = 0;
      let totalUnpaidLeaves = 0;
      for (let i = 0; i < totalDays; i++) {
        if (
          weekends().includes(
            moment(payload.payrollMonth, "M").add(i, "day").format("dddd")
          )
        ) {
          totalWeekendDays += 1;
        } else {
          totalWorkingDays += 1;
        }
      }

      const attendance = await this.Attendance.countDocuments({
        user: payload?.employee,
        workDate: { $gte: startDay, $lte: endDay },
      });
      const leaves = await this.Leave.find({
        employee: payload?.employee,
        from: { $gte: startDay },
        to: { $lte: endDay },
        status: LEAVE_STATUSES.APPROVED,
      });

      for (const leave of leaves) {
        if (leave.leaveType !== LEAVE_TYPES.OPTIONAL) {
          totalLeaves += leave.noOfDays;
        } else if (leave.leaveType === LEAVE_TYPES.UNPAID) {
          totalUnpaidLeaves += leave.noOfDays;
        }
      }

      const holidays = await this.Holiday.countDocuments({
        type: HOLIDAY_TYPES.FIXED,
        holidayDate: { $gte: startDay, $lte: endDay },
      });

      let dayWiseSalary = payload?.netSalary / totalWorkingDays || 0;
      if (totalUnpaidLeaves) {
        payload.netSalary =
          payload.netSalary - dayWiseSalary * totalUnpaidLeaves;
      }

      const payroll = {
        employee: payload.employee,
        salary: payload.salary,
        workingDays: attendance,
        leaves: totalLeaves,
        holidays,
        payrollDate: moment().startOf("day").utc(true).toDate(),
        payrollBy: user?._id,
        netSalary: Number(payload?.netSalary.toFixed(2)),
        payrollMonth: moment(payload?.payrollMonth, "YYYY-MM")
          .utc(true)
          .toDate(),
      };

      if (payload?.isDeleted) {
        Object.assign(payroll, { isDeleted: payload?.isDeleted });
      }

      if (payload?._id) {
        await this.Payroll.findOneAndUpdate({ _id: payload?._id }, payroll, {
          upsert: true,
          new: true,
        });
      } else {
        await this.Payroll.create(payroll);
      }
      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
