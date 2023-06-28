import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IUserEntries } from "../interfaces/IUserEntries";

const UserEntriesSchema = new Schema(
  {
    in: {
      type: Date,
    },
    out: {
      type: Date,
    },
    workDate: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

UserEntriesSchema.plugin(paginate);

export default model<IUserEntries & PaginateModel<IUserEntries>>(
  "user-entries",
  UserEntriesSchema
);
