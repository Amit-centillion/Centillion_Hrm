import Container from "typedi";
import Logger from "./logger";

export default async () => {
  const Appraisal = {
    name: "Appraisal",
    model: require("../models/appraisal").default,
  };
  const Attendance = {
    name: "Attendance",
    model: require("../models/attendace").default,
  };
  const AuthToken = {
    name: "AuthToken",
    model: require("../models/auth-token").default,
  };
  const Branch = {
    name: "Branch",
    model: require("../models/branch").default,
  };
  const Department = {
    name: "Department",
    model: require("../models/department").default,
  };
  const Designation = {
    name: "Designation",
    model: require("../models/designation").default,
  };
  const Document = {
    name: "Document",
    model: require("../models/documents").default,
  };
  const Holiday = {
    name: "Holiday",
    model: require("../models/holiday").default,
  };
  const Leave = {
    name: "Leave",
    model: require("../models/leave").default,
  };
  const Menu = {
    name: "Menu",
    model: require("../models/menu").default,
  };
  const Module = {
    name: "Module",
    model: require("../models/module").default,
  };
  const Overtime = {
    name: "Overtime",
    model: require("../models/overtime").default,
  };
  const Payroll = {
    name: "Payroll",
    model: require("../models/payroll").default,
  };
  const PayrollSettings = {
    name: "PayrollSettings",
    model: require("../models/payroll-settings").default,
  };
  const Permission = {
    name: "Permission",
    model: require("../models/permission").default,
  };
  const Policy = {
    name: "Policy",
    model: require("../models/policy").default,
  };
  const Role = {
    name: "Role",
    model: require("../models/roles").default,
  };
  const Timesheet = {
    name: "Timesheet",
    model: require("../models/timesheet").default,
  };
  const UserEntries = {
    name: "UserEntries",
    model: require("../models/user-entries").default,
  };
  const User = {
    name: "User",
    model: require("../models/user").default,
  };
  [
    Appraisal,
    Attendance,
    AuthToken,
    Branch,
    Department,
    Designation,
    Document,
    Holiday,
    Leave,
    Menu,
    Module,
    Overtime,
    Payroll,
    PayrollSettings,
    Permission,
    Policy,
    Role,
    Timesheet,
    UserEntries,
    User,
  ].forEach((m) => {
    Container.set(m.name, m.model);
  });

  Container.set("logger", Logger);
};
