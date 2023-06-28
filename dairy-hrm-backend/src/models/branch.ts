import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IBranch } from "../interfaces/IBranch";

const BranchSchema = new Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    address: {
      street1: {
        type: String,
      },
      street2: {
        type: String,
      },
      locality: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      pincode: {
        type: Number,
      },
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

BranchSchema.plugin(paginate);

export default model<IBranch & PaginateModel<IBranch>>(
  "branches",
  BranchSchema
);
