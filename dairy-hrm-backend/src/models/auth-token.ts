import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import config from "../config";
import { IAuthToken } from "../interfaces/IAuthToken";

const AuthTokenSchema = new Schema(
  {
    token: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    expiryAt: {
      type: Date,
      index: { expires: `${config.secrets.jwt_expirty}h` },
    },
    device: {
      type: String,
    },
  },
  { timestamps: true }
);

AuthTokenSchema.plugin(paginate);

export default model<IAuthToken & PaginateModel<IAuthToken>>(
  "auth-tokens",
  AuthTokenSchema
);
