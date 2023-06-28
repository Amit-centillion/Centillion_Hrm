import { Document } from "mongoose";

export interface IBranch extends Document {
  name: string;
  code: string;
  address: IAddress;
  isActive: boolean;
  isDeleted: boolean;
}

interface IAddress {
  street1: string;
  street2: string;
  area: string;
  city: string;
  state: string;
  locality: string;
  country: string;
  pincode: number;
}
