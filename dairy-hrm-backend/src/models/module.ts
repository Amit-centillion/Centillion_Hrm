import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IModule } from "../interfaces/IModule";

const ModuleSchema = new Schema(
  {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "roles",
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

ModuleSchema.plugin(paginate);

export default model<IModule & PaginateModel<IModule>>("modules", ModuleSchema);
