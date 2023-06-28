import { Document, Types } from "mongoose";

export interface IPayroll extends Document {
  employee: Types.ObjectId;
  salary: ISalary;
  workingDays: number;
  leaves: number;
  holidays: number;
  overtime: number;
  payrollDate: string;
  payrollBy: Types.ObjectId;
  netSalary: number;
  payrollMonth: string;
  isActive: boolean;
  isDeleted: boolean;
}

interface ISalary {
  basic: number;
  allowances: ISettings[];
  deductions: ISettings[];
}

interface ISettings {
  name: string;
  amount: number;
  percentage: number;
  setting: Types.ObjectId;
}

export interface IUpdatePayrollRequest {
  employee: Types.ObjectId;
  salary: ISalary;
  netSalary: number;
  payrollMonth: number;
  isDeleted?: boolean;
  _id?: Types.ObjectId;
}
