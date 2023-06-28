import { Document, PaginateModel, Types } from "mongoose";

export interface IMenu extends Document {
  name: string;
  url: string;
  icon: string;
  order: number;
  childrens: Types.ObjectId[];
  roles: Types.ObjectId[];
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUpdateMenuRequest {
  name: string;
  url: string;
  label: string;
  icon: string;
  _id?: string;
}
