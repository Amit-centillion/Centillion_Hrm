import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IDocuments } from "../interfaces/IDocuments";

const DocumentSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    url: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

DocumentSchema.plugin(paginate);

export default model<IDocuments & PaginateModel<IDocuments>>(
  "documents",
  DocumentSchema
);
