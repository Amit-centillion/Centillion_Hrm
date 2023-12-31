const COMMON_APIS = {
  LOGIN: "/user/auth/login",
  VERIFY_TOKEN: "/user/auth/verify-token/",
  LOGOUT: "/user/auth/logout/",
  GET_PROFILE: "/user/auth/get-profile",
  CHANGE_PASSWORD: "/user/auth/change-password",
};

const ADMIN_APIS = {
  ADMIN_MENU_LIST: "/admin/menu",
  ADMIN_UPDATE_MENU: "/admin/menu/update",
  ADMIN_EMPLOYEE_LIST: "/admin/employee",
  ADMIN_UPDATE_EMPLOYEE: "/admin/employee/update",
  ADMIN_DESIGNATION_LIST: "/admin/designation",
  ADMIN_UPDATE_DESIGNATION: "/admin/designation/update",
  ADMIN_DEPARTMENT_LIST: "/admin/department",
  ADMIN_UPDATE_DEPARTMENT: "/admin/department/update",
  ADMIN_ROLES_LIST: "/admin/roles",
  ADMIN_UPDATE_ROLES: "/admin/roles/update",
  ADMIN_HOLIDAY_LIST: "/admin/holiday",
  ADMIN_UPDATE_HOLIDAY: "/admin/holiday/update",
  ADMIN_LEAVES_LIST: "/admin/leaves",
  ADMIN_UPDATE_LEAVES: "/admin/leaves/update",
  ADMIN_APPROVE_LEAVE: "/admin/leaves/approve",
  ADMIN_TIMESHEET_LIST: "/admin/timesheet",
  ADMIN_UPDATE_TIMESHEET: "/admin/timesheet/update",
  ADMIN_ATTENDANCE_LIST: "/admin/attendance",
  ADMIN_OVERTIME_LIST: "/admin/overtime",
  ADMIN_UPDATE_OVERTIME: "/admin/overtime/update",
  ADMIN_APPROVE_OVERTIME: "/admin/overtime/approve",
  ADMIN_UPDATE_PAYROLL_SETTINGS: "/admin/settings/payroll/update",
  ADMIN_UPDATE_ALL_PAYROLL_SETTINGS: "/admin/settings/payroll/update-all",
  ADMIN_PAYROLL_SETTINGS: "/admin/settings/payroll",
  ADMIN_APPRAISAL_LIST: "/admin/appraisal",
  ADMIN_UPDATE_APPRAISAL: "/admin/appraisal/update",
  ADMIN_PAYROLL_LIST: "/admin/payroll",
  ADMIN_UPDATE_PAYROLL: "/admin/payroll/update",
};

const EMPLOYEE_APIS = {
  EMPLOYEE_SUMMARY: "/user/summary",
  EMPLOYEE_PUNCH: "/user/punch",
  EMPLOYEE_HOLIDAY_LIST: "/user/holiday",
  EMPLOYEE_LEAVES_LIST: "/user/leaves",
  EMPLOYEE_UPDATE_LEAVES: "/user/leaves/update",
  EMPLOYEE_LEAVE_STATISTICS: "/user/leaves/statistics",
  EMPLOYEE_ATTENDANCE_LIST: "/user/attendance",
  EMPLOYEE_UPDATE_ATTENDANCE: "/user/attendance/update",
  EMPLOYEE_ATTENDANCE_STATISTICS: "/user/attendance/statistics",
  EMPLOYEE_TIMESHEET_LIST: "/user/timesheet",
  EMPLOYEE_UPDATE_TIMESHEET: "/user/timesheet/update",
  EMPLOYEE_OVERTIME_LIST: "/user/overtime",
  EMPLOYEE_UPDATE_OVERTIME: "/user/overtime/update",
  EMPLOYEE_POLICY_LIST: "/user/policies",
  EMPLOYEE_UPDATE_POLICY: "/user/policies/update",
  EMPLOYEE_PAYROLL_LIST: "/user/payroll",
};

export const APIS = {
  ...COMMON_APIS,
  ...ADMIN_APIS,
  ...EMPLOYEE_APIS,
};
