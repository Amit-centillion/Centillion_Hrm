import React from "react";
import {
  EmployeeProvider,
  AuthProvider,
  MenuProvider,
  DepartmentProvider,
  DesignationProvider,
  RoleProvider,
  HolidayProvider,
  LeaveProvider,
  AttendanceProvider,
  TimesheetProvider,
  OvertimeProvider,
  SettingsProvider,
  AppraisalProvider,
  PayrollProvider,
} from "../common/contexts";
import Compose from "./componse";

export const AppWrapper = ({ children }) => {
  const allProviders = [
    AuthProvider,
    MenuProvider,
    EmployeeProvider,
    DepartmentProvider,
    DesignationProvider,
    RoleProvider,
    HolidayProvider,
    LeaveProvider,
    AttendanceProvider,
    TimesheetProvider,
    OvertimeProvider,
    SettingsProvider,
    AppraisalProvider,
    PayrollProvider,
  ];

  return (
    <React.Fragment>
      <Compose providers={allProviders}>{children}</Compose>
    </React.Fragment>
  );
};
