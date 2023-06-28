import { Document, Types } from "mongoose";

export interface IDesignation extends Document {
  name: string;
  department: Types.ObjectId;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUpdateDesignationRequest {
  _id?: string;
  name: string;
  department: string;
}
