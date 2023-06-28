import React, { useEffect, useMemo, useState } from "react";
import { usePayroll } from "../../../common/contexts";
import { employeePayrollColumns } from "../../../common/data-columns/payroll";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";

const EmployeePayroll = () => {
  const [isPayrollVisible, setPayrollVisible] = useState(false);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { paginatedPayrolls, onLoadPayrolls } = usePayroll();

  useEffect(() => {
    const fetchData = async () => {
      await onLoadPayrolls(filters);
    };
    fetchData();
  }, [onLoadPayrolls, filters]);

  const columns = useMemo(() => {
    return employeePayrollColumns();
  }, []);

  useEffect(() => {
    if (!isPayrollVisible) {
      setPayrollVisible(false);
    }
  }, [isPayrollVisible]);

  return (
    <React.Fragment>
      <HRMPageHeader title={"Payroll"} />
      <HRMTable
        data={paginatedPayrolls}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
    </React.Fragment>
  );
};

export default EmployeePayroll;
