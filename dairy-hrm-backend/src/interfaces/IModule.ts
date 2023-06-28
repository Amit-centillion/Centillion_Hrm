import { Document, Types } from "mongoose";

export interface IModule extends Document {
  name: string;
  label: string;
  permissions: Types.ObjectId[];
  isActive: boolean;
  isDeleted: boolean;
}
