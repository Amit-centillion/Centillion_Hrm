import { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNo: string;
  phoneNo: string;
  dob: string;
  code: string;
  joiningDate: string;
  department: Types.ObjectId;
  designation: Types.ObjectId;
  manager: Types.ObjectId;
  gender: string;
  address: IAdress;
  documents: IDocuments[];
  qualifications: IQualifications[];
  bankInfo: IBankInfo;
  taxInfo: ITaxInfo[];
  salaryInfo: ISalaryInfo;
  leaveInfo: ILeaveInfo;
  role: Types.ObjectId | Record<string, unknown>;
  isActive: boolean;
  isDeleted: boolean;
}

interface IAdress {
  street1: string;
  street2: string;
  area: string;
  city: string;
  state: string;
  locality: string;
  country: string;
  pincode: number;
}

interface IDocuments {
  name: string;
  document: Types.ObjectId | Record<string, unknown>;
}

interface IQualifications {
  name: string;
  percentage: string;
  passingYear: string;
}

interface IBankInfo {
  name: string;
  branchName: string;
  accountNo: string;
  ifscCode: string;
  isVerified: boolean;
}

interface ITaxInfo {
  name: string;
  number: string;
}

interface ISalaryInfo {
  basic: number;
  allowances: number;
}

interface ILeaveInfo {
  totalLeaves: number;
  takenLeaves: number;
}

export interface IAuthRequest {
  email: string;
  password: string;
  device: string;
}

export interface IUpdateEmployeeRequest {
  department: string;
  designation: string;
  email: string;
  firstName: string;
  gender: string;
  joiningDate: string;
  lastName: string;
  mobileNo: string;
  password: string;
  role: string;
  _id?: string;
}

export interface ILoggedInUser {
  firstName: string;
  lastName: string;
  email: string;
  role: { _id: Types.ObjectId; name: string };
  _id: Types.ObjectId;
  iat: number;
  exp: number;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
