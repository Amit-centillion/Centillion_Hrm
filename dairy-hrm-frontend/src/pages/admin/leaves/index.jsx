import React, { useCallback } from "react";
import { adminLeavesColumns } from "../../../common/data-columns/leaves";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { useLeave } from "../../../common/contexts";
import { useState, useMemo, useEffect } from "react";
import { LeaveForm } from "./leave-form";
import { ACTIONS } from "../../../common/constants/actions";

const AdminLeaves = () => {
  const [leaveFormVisible, setLeaveFormVisible] = useState(false);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { paginatedLeaves, onLoadLeaves, onUpdateLeave, onApproveLeave } =
    useLeave();

  const onSelectAction = useCallback(
    async (row, value) => {
      if (ACTIONS.APPROVE === value) {
        await onApproveLeave({ ...row, employee: row?.employee?._id }, filters);
      } else if (ACTIONS.REJECT === value) {
        await onUpdateLeave(
          { ...row, status: "DECLINED", approvedBy: null },
          filters
        );
      }
    },
    [onUpdateLeave, filters, onApproveLeave]
  );

  const columns = useMemo(() => {
    return adminLeavesColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadLeaves(filters);
    };
    fetchData();
  }, [filters, onLoadLeaves]);

  return (
    <React.Fragment>
      <HRMPageHeader title={"Leaves"} />

      <HRMTable
        data={paginatedLeaves}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />

      {leaveFormVisible && (
        <LeaveForm
          visible={leaveFormVisible}
          onClose={setLeaveFormVisible.bind(this, false)}
          filters={filters}
        />
      )}
    </React.Fragment>
  );
};

export default AdminLeaves;
