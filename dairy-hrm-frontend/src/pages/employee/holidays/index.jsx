// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useMemo, useState, useEffect } from "react";
import { useHoliday } from "../../../common/contexts";
import { employeeHolidaysColumns } from "../../../common/data-columns";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";

const EmployeeHolidays = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { onLoadHolidays, paginatedHolidays } = useHoliday();
  const columns = useMemo(() => {
    return employeeHolidaysColumns();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadHolidays(filters);
    };
    fetchData();
  }, [filters, onLoadHolidays]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Holidays"}
        // button={"Add Holiday"}
        // icon={faPlus}
      />
      <HRMTable
        data={paginatedHolidays}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
    </React.Fragment>
  );
};

export default EmployeeHolidays;
