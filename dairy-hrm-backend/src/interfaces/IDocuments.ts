import { Document, Types } from "mongoose";

export interface IDocuments extends Document {
  user: Types.ObjectId;
  name: string;
  type: string;
  url: string;
  isActive: boolean;
  isDeleted: boolean;
}
