import { Document, Types } from "mongoose";

export interface IOvertime extends Document {
  overtimeDate: string;
  hours: string;
  description: string;
  employee: Types.ObjectId;
  status: string;
  approvedBy: Types.ObjectId;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUpdateOvertimeRequest {
  overtimeDate: string;
  hours: string;
  description: string;
  _id?: string;
}

export interface IApproveOvertimeRequest {
  overtimeDate: string;
  hours: string;
  _id: Types.ObjectId;
  employee: string;
}
