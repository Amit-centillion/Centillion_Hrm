import httpStatus from "http-status";
import moment from "moment";
import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { ERRORS } from "../../../constants";
import { IListRequest } from "../../../interfaces";
import { IAppraisalRequest } from "../../../interfaces/IAppraisal";

@Service()
export default class AppraisalService {
  constructor(
    @Inject("Appraisal") private Appraisal: Models.Appraisal,
    @Inject("User") private User: Models.User
  ) {}

  async getAllAppraisals(payload: IListRequest) {
    try {
      const sortKey: string = payload?.sortKey || "name";
      const sortDirection: number = payload?.sortDirection === "DESC" ? -1 : 1;
      let criteria = {};
      const options: PaginateOptions = {
        sort: { [sortKey]: sortDirection },
        page: payload.page || 1,
        limit: payload.limit || 10,
        populate: { path: "employee", select: { firstName: 1, lastName: 1 } },
      };

      if (payload.search) {
        Object.assign(criteria, { name: payload.search });
      }

      const appraisals =
        payload?.page || payload?.limit
          ? await this.Appraisal.paginate(criteria, options)
          : await this.Appraisal.find(criteria);

      return {
        status: true,
        appraisals,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateAppraisal(payload: IAppraisalRequest) {
    try {
      const previous = await this.Appraisal.findOne({
        employee: payload.employee,
      }).sort({ updatedAt: -1 });

      if (payload?._id) {
        await this.Appraisal.findOneAndUpdate(
          { _id: payload._id },
          {
            ...payload,
            salary: { basic: payload.salary },
          },
          {
            upsert: true,
            new: true,
          }
        );
      } else {
        if (
          previous &&
          moment(previous?.appriasalDate).format("YYYY") ===
            moment(payload?.appraisalDate, "YYYY-MM-DD").format("YYYY")
        ) {
          throw {
            status: httpStatus.BAD_REQUEST,
            message: ERRORS.APPRAISAL_ALREADY_PROCESSED,
          };
        } else {
          await this.Appraisal.create({
            ...payload,
            salary: { basic: payload.salary },
          });
        }
      }

      await this.User.findOneAndUpdate(
        { _id: payload.employee },
        { "salaryInfo.basic": payload.salary },
        { upsert: true, new: true }
      );
      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
