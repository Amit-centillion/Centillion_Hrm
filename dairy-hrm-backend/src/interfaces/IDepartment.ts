import { Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUpdateDepartmentRequest {
  _id?: string;
  name: string;
}
