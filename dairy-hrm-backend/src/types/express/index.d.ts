import { PaginateModel } from "mongoose";
import { IAppraisal } from "../../interfaces/IAppraisal";
import { IAttendance } from "../../interfaces/IAttendace";
import { IAuthToken } from "../../interfaces/IAuthToken";
import { IDepartment } from "../../interfaces/IDepartment";
import { IDesignation } from "../../interfaces/IDesignation";
import { IDocuments } from "../../interfaces/IDocuments";
import { IHolidays } from "../../interfaces/IHolidays";
import { ILeaves } from "../../interfaces/ILeaves";
import { IMenu } from "../../interfaces/IMenu";
import { IModule } from "../../interfaces/IModule";
import { IOvertime } from "../../interfaces/IOvertime";
import { IPayroll } from "../../interfaces/IPayroll";
import { IPayrollSettings } from "../../interfaces/IPayrollSettings";
import { IPermission } from "../../interfaces/IPermission";
import { IPolicy } from "../../interfaces/IPolicy";
import { IRole } from "../../interfaces/IRoles";
import { ITimesheet } from "../../interfaces/ITimesheet";
import { IUserEntries } from "../../interfaces/IUserEntries";
import { ILoggedInUser, IUser } from "../../interfaces/IUsers";

declare global {
  namespace Express {
    export interface Request {
      user: ILoggedInUser;
    }
  }
  namespace Models {
    export type Appraisal = PaginateModel<IAppraisal>;
    export type Attendance = PaginateModel<IAttendance>;
    export type AuthToken = PaginateModel<IAuthToken>;
    export type Branch = PaginateModel<Branch>;
    export type Department = PaginateModel<IDepartment>;
    export type Designation = PaginateModel<IDesignation>;
    export type Document = PaginateModel<IDocuments>;
    export type Holiday = PaginateModel<IHolidays>;
    export type Leave = PaginateModel<ILeaves>;
    export type Menu = PaginateModel<IMenu>;
    export type Module = PaginateModel<IModule>;
    export type Overtime = PaginateModel<IOvertime>;
    export type Payroll = PaginateModel<IPayroll>;
    export type PayrollSettings = PaginateModel<IPayrollSettings>;
    export type Permission = PaginateModel<IPermission>;
    export type Policy = PaginateModel<IPolicy>;
    export type Role = PaginateModel<IRole>;
    export type Timesheet = PaginateModel<ITimesheet>;
    export type UserEntries = PaginateModel<IUserEntries>;
    export type User = PaginateModel<IUser>;
  }
}
