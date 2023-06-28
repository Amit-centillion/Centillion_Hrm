import mongoose, { Document, model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IMenu } from "../interfaces/IMenu";

const MenuSchema = new Schema(
  {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    url: {
      type: String,
    },
    icon: {
      type: String,
    },
    order: {
      type: Number,
    },
    childrens: [
      {
        type: Schema.Types.ObjectId,
        ref: "menus",
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

MenuSchema.plugin(paginate);

export default model<IMenu, PaginateModel<IMenu>>("menus", MenuSchema);
