import { Document, model, PaginateModel, Schema } from "mongoose";
import { IDesignation } from "../interfaces/IDesignation";
import paginate from "mongoose-paginate-v2";

const DesignationSchema = new Schema(
  {
    name: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "departments",
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

DesignationSchema.plugin(paginate);

export default model<IDesignation & PaginateModel<IDesignation>>(
  "designations",
  DesignationSchema
);
