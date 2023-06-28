import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IRole } from "../interfaces/IRoles";

const RoleSchema = new Schema(
  {
    name: {
      type: String,
    },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
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

RoleSchema.plugin(paginate);

export default model<IRole & PaginateModel<IRole>>("roles", RoleSchema);
