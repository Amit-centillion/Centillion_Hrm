import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IAttendance } from "../interfaces/IAttendace";

const AttendanceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    workDate: {
      type: Date,
    },
    hours: {
      type: Number,
    },
    minutes: {
      type: Number,
    },
    entries: [
      {
        type: Schema.Types.ObjectId,
        ref: "user-entries",
      },
    ],
    overtime: [
      {
        type: Schema.Types.ObjectId,
        ref: "overtimes",
      },
    ],
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

AttendanceSchema.plugin(paginate);
export default model<IAttendance & PaginateModel<IAttendance>>(
  "attendaces",
  AttendanceSchema
);
