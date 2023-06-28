import { Router } from "express";
import menuRoutes from "./menu/menu.route";
import employeeRoutes from "./employee/employee.route";
import designationRoutes from "./designation/designation.route";
import departmentRoutes from "./department/department.route";
import roleRoutes from "./roles/role.route";
import attendanceRoutes from "./attendance/attendance.route";
import timesheetRoutes from "./timesheet/timesheet.route";
import holidayRoutes from "./holiday/holiday.route";
import leaveRoutes from "./leaves/leaves.route";
import overtimeRoutes from "./overtime/overtime.route";
import settingsRoutes from "./settings/settings.route";
import appraisalRoutes from "./appraisal/appraisal.route";
import payrollRoutes from "./payroll/payroll.route";
import { authorize } from "../../utils/authorize";

const route = Router();

route.use("/menu", menuRoutes);
route.use("/employee", employeeRoutes);
route.use("/designation", designationRoutes);
route.use("/department", departmentRoutes);
route.use("/roles", roleRoutes);
route.use("/attendance", attendanceRoutes);
route.use("/timesheet", timesheetRoutes);
route.use("/holiday", holidayRoutes);
route.use("/leaves", leaveRoutes);
route.use("/overtime", overtimeRoutes);
route.use("/settings", settingsRoutes);
route.use("/appraisal", appraisalRoutes);
route.use("/payroll", payrollRoutes);

export default route;
