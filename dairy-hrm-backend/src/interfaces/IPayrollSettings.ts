import { Document } from "mongoose";

export interface IPayrollSettings extends Document {
  title: string;
  settings: Settings[];
  status: boolean;
  type: string;
  isActive: boolean;
  isDeleted: boolean;
}

interface Settings {
  label: string;
  value: string;
  percentage: number;
}

export interface IUpdatePayrollSettingRequest {
  title: string;
  settings: Settings[];
  status: boolean;
}

export interface IUpdateAllPayrollSettingRequest {
  title: string;
  settings: Settings[];
  status: boolean;
  type: string;
  isActive: boolean;
  isDeleted: boolean;
  _id: string;
}
