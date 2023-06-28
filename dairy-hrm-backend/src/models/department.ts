import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IDepartment } from "../interfaces/IDepartment";

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
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

DepartmentSchema.plugin(paginate);

export default model<IDepartment & PaginateModel<IDepartment>>(
  "departments",
  DepartmentSchema
);
