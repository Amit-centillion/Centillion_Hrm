import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IAppraisal } from "../interfaces/IAppraisal";

const AppraisalSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    salary: {
      basic: {
        type: Number,
      },
    },
    appraisalDate: {
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

AppraisalSchema.plugin(paginate);
export default model<IAppraisal & PaginateModel<IAppraisal>>(
  "appraisals",
  AppraisalSchema
);
