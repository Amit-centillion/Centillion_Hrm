import { Document, Types } from "mongoose";

export interface IAppraisal extends Document {
  employee: string;
  salary: {
    basic: number;
  };
  appriasalDate: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IAppraisalRequest {
  employee: string;
  salary: number;
  appraisalDate: string;
  _id?: Types.ObjectId;
}
