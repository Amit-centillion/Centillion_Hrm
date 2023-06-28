import httpStatus from "http-status";
import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { ERRORS } from "../../../constants";
import { IListRequest } from "../../../interfaces";
import {
  IApproveOvertimeRequest,
  IUpdateOvertimeRequest,
} from "../../../interfaces/IOvertime";
import { ILoggedInUser } from "../../../interfaces/IUsers";

@Service()
export default class OvertimeService {
  constructor(
    @Inject("Overtime") private Overtime: Models.Overtime,
    @Inject("Attendance") private Attendance: Models.Attendance
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
        populate: { path: "employee", select: { firstName: 1, lastName: 1 } },
      };

      if (payload.search) {
        Object.assign(criteria, { name: payload.search });
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

  async approveOvertime(payload: IApproveOvertimeRequest, user: ILoggedInUser) {
    try {
      const attendance = await this.Attendance.findOne({
        workDate: payload.overtimeDate,
        user: payload.employee,
      });
      if (attendance) {
        if (!attendance.overtime.includes(payload._id)) {
          attendance.overtime = [...attendance?.overtime, payload._id];
        }
        await attendance.updateOne(
          { overtime: attendance.overtime },
          { upsert: true }
        );
        await this.Overtime.findOneAndUpdate(
          { _id: payload._id },
          { status: "APPROVED" }
        );
        return {
          status: true,
        };
      } else {
        throw {
          status: httpStatus.BAD_REQUEST,
          message: ERRORS.USER_NOT_PRESENT,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
