const rootRoutes = {
  root: "/",
  login: "/auth/login",
};

const employeeRoutes = {
  employeeDashboard: "/employee/dashboard",
  employeeHolidays: "/employee/holiday",
  employeeLeaves: "/employee/leaves",
  employeeAttendance: "employee/attendance",
  employeeTimesheet: "/employee/timesheet",
  employeeOvertime: "/employee/overtime",
  employeePolicy: "/employee/policies",
  employeePayroll: "/employee/payroll",
  employeeProfile: "/employee/profile",
  employeeChangePassword: "/employee/change-password",
};

const adminRoutes = {
  adminDashboard: "/admin/dashboard",
  adminEmployees: "/admin/employee",
  adminMenus: "/admin/menu",
  adminLeaves: "/admin/leaves",
  adminHoliday: "/admin/holiday",
  adminDesignation: "/admin/designation",
  adminDapartment: "/admin/department",
  adminRoles: "/admin/roles",
  adminTimesheet: "/admin/timesheet",
  adminAttendance: "/admin/attendance",
  adminOvertime: "/admin/overtime",
  adminPayroll: "/admin/payroll",
  adminSettings: "/admin/settings",
  adminAppraisal: "/admin/appraisal",
  adminProfile: "/admin/profile",
  adminChangePassword: "/admin/change-password",
};

export const componentRoutes = {
  ...rootRoutes,
  ...employeeRoutes,
  ...adminRoutes,
};
