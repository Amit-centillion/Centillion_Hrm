import { Document } from "mongoose";

export interface IPolicy extends Document {
  name: string;
  description: string;
  department: string;
  isActive: boolean;
  isDeleted: boolean;
}
