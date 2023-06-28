import { Router } from "express";
import { authorize } from "../../utils/authorize";
import authRoutes from "./auth/auth.route";
import employeeRoutes from "./employee/employee.route";
import holidayRoutes from "./holiday/holiday.route";
import leavesRoutes from "./leaves/leaves.route";
import attendanceRoutes from "./attendance/attendance.route";
import timesheetRoutes from "./timesheet/timesheet.route";
import overtimeRoutes from "./overtime/overtime.route";
import payrollRoutes from "./payroll/payroll.route";

const route = Router();

route.use("/", employeeRoutes);
route.use("/auth", authRoutes);
route.use("/holiday", holidayRoutes);
route.use("/leaves", leavesRoutes);
route.use("/attendance", attendanceRoutes);
route.use("/timesheet", timesheetRoutes);
route.use("/overtime", overtimeRoutes);
route.use("/payroll", payrollRoutes);

export default route;
