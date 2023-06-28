import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IPayroll } from "../interfaces/IPayroll";

const PayrollSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    salary: {
      basic: {
        type: Number,
      },
      allowances: [
        {
          name: {
            type: String,
          },
          amount: {
            type: Number,
          },
          percentage: {
            type: Number,
          },
          setting: {
            type: Schema.Types.ObjectId,
            ref: "payroll-settings",
          },
        },
      ],
      deductions: [
        {
          name: {
            type: String,
          },
          amount: {
            type: Number,
          },
          percentage: {
            type: Number,
          },
          setting: {
            type: Schema.Types.ObjectId,
            ref: "payroll-settings",
          },
        },
      ],
    },
    workingDays: {
      type: Number,
    },
    leaves: {
      type: Number,
    },
    holidays: {
      type: Number,
    },
    overtime: {
      type: Number,
    },
    payrollDate: {
      type: Date,
    },
    payrollBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    netSalary: {
      type: Number,
    },
    payrollMonth: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

PayrollSchema.plugin(paginate);

export default model<IPayroll & PaginateModel<IPayroll>>(
  "payrolls",
  PayrollSchema
);
