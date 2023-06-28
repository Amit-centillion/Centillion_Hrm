import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert2";
import { ACTIONS } from "../../../common/constants/actions";
import { useTimesheet } from "../../../common/contexts";
import { employeeTimesheetColumns } from "../../../common/data-columns/timesheet";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { TimesheetForm } from "./timesheet-form";

const EmployeeTimesheet = () => {
  const [isTimesheetVisible, setTimesheetVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const { onLoadTimesheet, paginatedTimesheets } = useTimesheet();

  const onDeleteTimesheet = useCallback((row) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You want to delete the timesheet.",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Confirm",
      })
      .then((result) => {
        if (result?.isConfirmed) {
        }
      });
  }, []);

  const onSelectAction = useCallback(
    (row, value) => {
      if (ACTIONS.EDIT === value) {
        setInitialValues(row);
        setTimesheetVisible(true);
      } else if (ACTIONS.DELETE === value) {
        onDeleteTimesheet(row);
      }
    },
    [onDeleteTimesheet]
  );

  const columns = useMemo(() => {
    return employeeTimesheetColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadTimesheet(filters);
    };
    fetchData();
  }, [onLoadTimesheet, filters]);

  useEffect(() => {
    if (!isTimesheetVisible) {
      setInitialValues(null);
    }
  }, [isTimesheetVisible]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Timesheet"}
        button={"Add Timesheet"}
        icon={faPlus}
        handleClick={setTimesheetVisible.bind(this, true)}
      />
      <HRMTable
        data={paginatedTimesheets}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {isTimesheetVisible ? (
        <TimesheetForm
          visible={isTimesheetVisible}
          onClose={setTimesheetVisible.bind(this, false)}
          filters={filters}
          initialValues={initialValues}
        />
      ) : null}
    </React.Fragment>
  );
};

export default EmployeeTimesheet;
