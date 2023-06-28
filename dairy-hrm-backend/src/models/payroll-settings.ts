import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { types } from "../enums/payroll.enum";
import { IPayrollSettings } from "../interfaces/IPayrollSettings";

const PayrollSettingsSchema = new Schema(
  {
    title: {
      type: String,
    },
    settings: [
      {
        label: {
          type: String,
        },
        value: {
          type: String,
        },
        percentage: {
          type: Number,
        },
      },
    ],
    status: {
      type: Boolean,
    },
    type: {
      type: String,
      enum: types(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

PayrollSettingsSchema.plugin(paginate);

export default model<IPayrollSettings & PaginateModel<IPayrollSettings>>(
  "payroll-settings",
  PayrollSettingsSchema
);
