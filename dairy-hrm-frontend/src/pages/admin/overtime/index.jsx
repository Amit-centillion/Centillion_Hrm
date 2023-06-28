import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert2";
import { ACTIONS } from "../../../common/constants/actions";
import { useOvertime } from "../../../common/contexts";
import { adminOvertimeColumns } from "../../../common/data-columns/overtime";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";

const AdminOvertime = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const {
    paginatedOvertimes,
    onLoadOvertime,
    onUpdateOvertime,
    onApproveOvertime,
  } = useOvertime();
  const onSelectAction = useCallback(
    (row, value) => {
      if (value === ACTIONS.APPROVE) {
        swal
          .fire({
            title: "Are you sure?",
            text: "You want to approve the overtime.",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Approve",
          })
          .then(async (result) => {
            if (result?.isConfirmed) {
              const payload = {
                overtimeDate: row?.overtimeDate,
                hours: row?.hours,
                _id: row?._id,
                employee: row?.employee?._id,
              };
              await onApproveOvertime(payload, filters);
            }
          });
      } else if (value === ACTIONS.REJECT) {
        swal
          .fire({
            title: "Are you sure?",
            text: "You want to reject the overtime.",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Reject",
          })
          .then(async (result) => {
            if (result?.isConfirmed) {
              await onUpdateOvertime({ ...row, status: "REJECTED" });
            }
          });
      }
    },
    [onUpdateOvertime, onApproveOvertime, filters]
  );
  const columns = useMemo(() => {
    return adminOvertimeColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadOvertime(filters);
    };
    fetchData();
  }, [onLoadOvertime, filters]);
  return (
    <React.Fragment>
      <HRMPageHeader title={"Overtime"} />
      <HRMTable
        data={paginatedOvertimes}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
    </React.Fragment>
  );
};

export default AdminOvertime;
