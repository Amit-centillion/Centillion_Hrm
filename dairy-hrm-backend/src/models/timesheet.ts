import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { ITimesheet } from "../interfaces/ITimesheet";

const TimesheetSchema = new Schema(
  {
    workDate: {
      type: Date,
    },
    workHours: {
      type: Number,
      default: 0,
    },
    project: {
      type: String,
    },
    description: {
      type: String,
    },
    employee: {
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
  {
    timestamps: true,
  }
);

TimesheetSchema.plugin(paginate);

export default model<ITimesheet & PaginateModel<ITimesheet>>(
  "timesheets",
  TimesheetSchema
);
