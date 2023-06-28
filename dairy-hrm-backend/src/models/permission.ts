import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IPermission } from "../interfaces/IPermission";

const PermissionSchema = new Schema(
  {
    name: {
      type: String,
    },
    value: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Roles",
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: "Module",
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

PermissionSchema.plugin(paginate);

export default model<IPermission & PaginateModel<IPermission>>(
  "permissions",
  PermissionSchema
);
