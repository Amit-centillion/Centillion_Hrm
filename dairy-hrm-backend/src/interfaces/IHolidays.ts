import { Document } from "mongoose";

export interface IHolidays extends Document {
  name: string;
  holidayDate: string;
  day: string;
  type: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUpdateHolidayRequest {
  name: string;
  holidayDate: string;
  _id?: string;
}
