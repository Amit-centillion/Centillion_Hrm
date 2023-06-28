import { Document, Types } from "mongoose";

export interface IRole extends Document {
  name: string;
  modules: Types.ObjectId[];
  isActive: boolean;
  isDelete: boolean;
}

export interface IUpdateRoleRequest {
  _id?: string;
  name: string;
}
