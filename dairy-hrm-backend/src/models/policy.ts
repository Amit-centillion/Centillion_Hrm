import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IPolicy } from "../interfaces/IPolicy";

const PolicySchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
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

PolicySchema.plugin(paginate);

export default model<IPolicy & PaginateModel<IPolicy>>(
  "policies",
  PolicySchema
);
