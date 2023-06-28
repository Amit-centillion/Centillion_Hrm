import { Document, Types } from "mongoose";

export interface IAttendance extends Document {
  user: string;
  startTime: string;
  endTime: string;
  workDate: string;
  hours: number;
  minutes: number;
  entries: Types.ObjectId[];
  overtime: Types.ObjectId[];
  isActive: boolean;
  isDeleted: boolean;
}
