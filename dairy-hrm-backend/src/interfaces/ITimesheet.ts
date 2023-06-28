import { Document, Types } from "mongoose";

export interface ITimesheet extends Document {
  workDate: string;
  workHours: number;
  project: string;
  description: string;
  employee: Types.ObjectId;
  isActive: boolean;
  isDeleted: boolean;
}

export interface ITimesheetUpdateRequest {
  workDate: string;
  description: string;
  _id?: string;
}
