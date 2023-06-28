import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert2";
import { ACTIONS } from "../../../common/constants/actions";
import { useOvertime } from "../../../common/contexts";
import { employeeOvertimeColumns } from "../../../common/data-columns/overtime";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { OvertimeForm } from "./overtime-form";

const EmployeeOvertime = () => {
  const [isOvertimeVisible, setOvertimeVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const { paginatedOvertimes, onLoadOvertime, onUpdateOvertime } =
    useOvertime();

  const onSelectAction = useCallback(
    (row, value) => {
      if (ACTIONS.EDIT === value) {
        setInitialValues(row);
        setOvertimeVisible(true);
      } else {
        swal
          .fire({
            title: "Are you sure?",
            text: "You want to delete the overtime?",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Confirm",
          })
          .then(async (result) => {
            if (result?.isConfirmed) {
              await onUpdateOvertime({ ...row, isDeleted: true }, filters);
            }
          });
      }
    },
    [onUpdateOvertime, filters]
  );

  const columns = useMemo(() => {
    return employeeOvertimeColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadOvertime(filters);
    };
    fetchData();
  }, [onLoadOvertime, filters]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Overtime"}
        button={"Add Overtime"}
        icon={faPlus}
        handleClick={setOvertimeVisible.bind(this, true)}
      />
      <HRMTable
        data={paginatedOvertimes}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {isOvertimeVisible && (
        <OvertimeForm
          visible={isOvertimeVisible}
          onClose={setOvertimeVisible.bind(this, false)}
          filters={filters}
          initialValues={initialValues}
        />
      )}
    </React.Fragment>
  );
};

export default EmployeeOvertime;
