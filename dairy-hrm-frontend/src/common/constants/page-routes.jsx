import { componentRoutes } from "./component-routes";
import BlankLayout from "../../layouts/blank-layout";
import MainLayout from "../../layouts/main-layout";
import Pages from "../../pages";
import Login from "../../pages/auth/login";
import EmployeeDashboard from "../../pages/employee";
import AdminDashboard from "../../pages/admin";
import AdminEmployees from "../../pages/admin/employees";
import AdminMenu from "../../pages/admin/menu";
import AdminLeaves from "../../pages/admin/leaves";
import AdminHoliday from "../../pages/admin/holidays";
import AdminDesignation from "../../pages/admin/designation";
import AdminDepartment from "../../pages/admin/department";
import AdminRoles from "../../pages/admin/roles";
// import AdminTimesheet from "../../pages/admin/timesheet";
import EmployeeHolidays from "../../pages/employee/holidays";
import EmployeeLeaves from "../../pages/employee/leaves";
import EmployeeAttendance from "../../pages/employee/attendance";
import EmployeeTimesheet from "../../pages/employee/timesheet";
import EmployeeOvertime from "../../pages/employee/overtime";
import EmployeePolicy from "../../pages/employee/policy";
import EmployeeProfile from "../../pages/employee/profile";
import AdminTimesheet from "../../pages/admin/timesheet";
import AdminAttendance from "../../pages/admin/attendance";
import AdminOvertime from "../../pages/admin/overtime";
import AdminPayroll from "../../pages/admin/payroll";
import AdminSettings from "../../pages/admin/settings";
import AdminAppraisal from "../../pages/admin/appraisal";
import EmployeePayroll from "../../pages/employee/payroll";
import AdminProfile from "../../pages/admin/profile";
import EmployeeChangePassword from "../../pages/employee/change-password";
import AdminChangePassword from "../../pages/admin/change-password";

const rootRoutes = [
  {
    path: componentRoutes.root,
    component: Pages,
    layout: BlankLayout,
    auth: false,
  },
  {
    path: componentRoutes.login,
    component: Login,
    layout: BlankLayout,
    auth: false,
  },
];

const employeeRoutes = [
  {
    path: componentRoutes.employeeDashboard,
    component: EmployeeDashboard,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.employeeHolidays,
    component: EmployeeHolidays,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.employeeLeaves,
    component: EmployeeLeaves,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.employeeAttendance,
    component: EmployeeAttendance,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.employeeTimesheet,
    component: EmployeeTimesheet,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.employeeOvertime,
    component: EmployeeOvertime,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.employeePolicy,
    component: EmployeePolicy,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.employeeProfile,
    component: EmployeeProfile,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.employeePayroll,
    component: EmployeePayroll,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.employeeChangePassword,
    component: EmployeeChangePassword,
    layout: MainLayout,
    auth: false,
  },
];

const adminRoutes = [
  {
    path: componentRoutes.adminDashboard,
    component: AdminDashboard,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminEmployees,
    component: AdminEmployees,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminMenus,
    component: AdminMenu,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminLeaves,
    component: AdminLeaves,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminHoliday,
    component: AdminHoliday,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminDesignation,
    component: AdminDesignation,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminDapartment,
    component: AdminDepartment,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminRoles,
    component: AdminRoles,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminTimesheet,
    component: AdminTimesheet,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminAttendance,
    component: AdminAttendance,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminOvertime,
    component: AdminOvertime,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminPayroll,
    component: AdminPayroll,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminSettings,
    component: AdminSettings,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminAppraisal,
    component: AdminAppraisal,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminProfile,
    component: AdminProfile,
    layout: MainLayout,
    auth: false,
  },
  {
    path: componentRoutes.adminChangePassword,
    component: AdminChangePassword,
    layout: MainLayout,
    auth: false,
  },
];

export const pageRoutes = [...rootRoutes, ...employeeRoutes, ...adminRoutes];
