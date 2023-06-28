import { PaginateOptions } from "mongoose";
import { Inject, Service } from "typedi";
import { hashSync } from "bcrypt";
import { IListRequest } from "../../../interfaces";
import { IUpdateEmployeeRequest } from "../../../interfaces/IUsers";
import moment from "moment";

@Service()
export default class EmployeeService {
  constructor(
    @Inject("User") private User: Models.User,
    @Inject("Role") private Role: Models.Role,
    @Inject("Appraisal") private Appraisal: Models.Appraisal
  ) {}

  async getAllEmployees(payload: IListRequest) {
    try {
      const sortKey: string = payload?.sortKey || "firstName";
      const sortDirection: number = payload?.sortDirection === "DESC" ? -1 : 1;
      let admin = await this.Role.findOne({ name: "ADMIN" });
      let criteria = {
        isDeleted: false,
      };
      const filters = payload.filters;
      const options: PaginateOptions = {
        sort: { [sortKey]: sortDirection },
        page: payload.page || 1,
        limit: payload.limit || 10,
        populate: [
          { path: "role" },
          { path: "department" },
          { path: "designation" },
        ],
        select: ["-password"],
      };

      if (admin) {
        Object.assign(criteria, { role: { $ne: admin?.id } });
      }

      if (payload.search) {
        Object.assign(criteria, {
          firstName: { $regex: payload.search, $options: "i" },
        });
      }

      if (filters?.designation) {
        Object.assign(criteria, { designation: filters.designation });
      }

      if (filters?.department) {
        Object.assign(criteria, { department: filters.department });
      }

      const employees =
        payload?.page || payload?.limit
          ? await this.User.paginate(criteria, options)
          : await this.User.find(criteria).select(["-password"]);

      return {
        status: true,
        employees,
      };
    } catch (error) {
      return error;
    }
  }

  async updateEmployee(payload: IUpdateEmployeeRequest) {
    try {
      if (payload?._id) {
        await this.User.findOneAndUpdate({ _id: payload?._id }, payload, {
          upsert: true,
          new: true,
        });
      } else {
        const user = await this.User.create({
          ...payload,
          password: hashSync(payload.password, 10),
        });

        await this.Appraisal.create({
          employee: user._id,
          salary: { basic: 0 },
          appriasalDate: moment(payload.joiningDate).add(12, "month").toDate(),
        });
      }
      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
