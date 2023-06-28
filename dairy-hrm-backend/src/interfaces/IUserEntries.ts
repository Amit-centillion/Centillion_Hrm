import { Document, Types } from "mongoose";

export interface IUserEntries extends Document {
  in: string;
  out: string;
  workDate: string;
  user: Types.ObjectId;
}
