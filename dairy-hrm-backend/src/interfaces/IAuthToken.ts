import { Document, Types } from "mongoose";

export interface IAuthToken extends Document {
  token: string;
  user: Types.ObjectId;
  expireAt: string;
  device: string;
  isActive: boolean;
  isDeleted: boolean;
}
