import moment from "moment";
import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { IListRequest } from "../../../interfaces";
import { IUpdateLeaveRequest } from "../../../interfaces/ILeaves";
import { ILoggedInUser, IUser } from "../../../interfaces/IUsers";

@Service()
export default class LeaveService {
  constructor(
    @Inject("Leave") private Leave: Models.Leave,
    @Inject("User") private User: Models.User
  ) {}

  async getAllLeaves(payload: IListRequest, user: ILoggedInUser) {
    try {
      const sortKey: string = payload?.sortKey || "createdAt";
      const sortDirection: number = payload?.sortDirection === "DESC" ? -1 : 1;
      let criteria = {};
      const options: PaginateOptions = {
        sort: { [sortKey]: sortDirection },
        page: payload.page || 1,
        limit: payload.limit || 10,
        populate: {
          path: "approvedBy",
          select: { firstName: 1, lastName: 1 },
        },
      };

      if (payload.search) {
        Object.assign(criteria, { name: payload.search });
      }

      if (user?.role?.name === "EMPLOYEE") {
        Object.assign(criteria, { employee: user._id });
      }

      const leaves =
        payload?.page || payload?.limit
          ? await this.Leave.paginate(criteria, options)
          : await this.Leave.find(criteria);

      return {
        status: true,
        leaves,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateLeave(payload: IUpdateLeaveRequest, user: ILoggedInUser) {
    try {
      const noOfDays = moment(moment(payload.to).utc(true).toDate()).diff(
        moment(moment(payload.from).utc(true).toDate()),
        "days"
      );
      if (payload?._id) {
        await this.Leave.updateOne(
          { _id: payload._id },
          { ...payload, noOfDays: noOfDays + 1 },
          { upsert: true, new: true }
        );
      } else {
        await this.Leave.create({
          ...payload,
          noOfDays: noOfDays + 1,
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
 

  async getStatistics(payload: ILoggedInUser) {
    try {
      const user: IUser = await this.User.findOne({ _id: payload._id });
      return {
        status: true,
        statistics: {
          annualLeavs: user?.leaveInfo?.totalLeaves,
          usedLeaves: user?.leaveInfo?.takenLeaves,
          remainingLeaves:
            user?.leaveInfo?.totalLeaves - user?.leaveInfo?.takenLeaves,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
