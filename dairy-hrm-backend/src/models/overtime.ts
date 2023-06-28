import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { DEFAULT_OVERTIME } from "../constants/overtime.constant";
import { statuses } from "../enums/overtime.enum";
import { IOvertime } from "../interfaces/IOvertime";

const OverTimeSchema = new Schema(
  {
    overtimeDate: {
      type: Date,
    },
    hours: {
      type: Number,
    },
    description: {
      type: String,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      enum: statuses(),
      default: DEFAULT_OVERTIME,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
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

OverTimeSchema.plugin(paginate);

export default model<IOvertime & PaginateModel<IOvertime>>(
  "overtimes",
  OverTimeSchema
);
