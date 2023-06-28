import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { DEFAULT_LEAVE } from "../constants/leave.constant";
import { statuses } from "../enums/leave.enum";
import { ILeaves } from "../interfaces/ILeaves";

const LeaveSchema = new Schema(
  {
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    noOfDays: {
      type: Number,
    },
    reason: {
      type: String,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    leaveType: {
      type: String,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      enum: statuses(),
      default: DEFAULT_LEAVE,
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

LeaveSchema.plugin(paginate);

export default model<ILeaves & PaginateModel<ILeaves>>("leaves", LeaveSchema);
