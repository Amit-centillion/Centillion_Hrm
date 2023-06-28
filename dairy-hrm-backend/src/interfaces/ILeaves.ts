import { Document, Types } from "mongoose";

export interface ILeaves extends Document {
  from: string;
  to: string;
  noOfDays: number;
  reason: string;
  employee: Types.ObjectId;
  leaveType: String;
  approvedBy: Types.ObjectId;
  status: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUpdateLeaveRequest {
  leaveType: string;
  from: string;
  to: string;
  reason: string;
  _id?: string;
}

export interface IApproveLeaveRequest {
  _id: string;
  noOfDays: number;
  employee: string;
  leaveType: string;
  status: string;
}
