import React, { useState, useMemo, useCallback } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert2";
import { useLeave } from "../../../common/contexts";
import { employeeLeavesColumns } from "../../../common/data-columns";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { LeaveForm } from "./leave-form";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ACTIONS } from "../../../common/constants/actions";

const EmployeeLeaves = () => {
  const [isLeaveVisible, setLeaveVisible] = useState(false);
  const [initialValue, setInitialValue] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const { paginatedLeaves, onLoadLeaves, statistics, onLoadStatics } =
    useLeave();

  const onDeleteLeave = useCallback((row) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You want to delete the leave.",
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
        setInitialValue(row);
        setLeaveVisible(true);
      } else if (ACTIONS.DELETE === value) {
        onDeleteLeave(row);
      }
    },
    [onDeleteLeave]
  );

  const columns = useMemo(() => {
    return employeeLeavesColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadLeaves(filters);
    };
    fetchData();
  }, [onLoadLeaves, filters]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadStatics();
    };
    fetchData();
  }, [onLoadStatics]);

  useEffect(() => {
    if (!isLeaveVisible) {
      setInitialValue(null);
    }
  }, [isLeaveVisible]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Leaves"}
        button={"Apply Leave"}
        icon={faPlus}
        handleClick={setLeaveVisible.bind(this, true)}
      />
      <Row>
        <Col md={4}>
          <div className="stats-info">
            <h6>Annual Leave</h6>
            <h4>{statistics?.annualLeavs || 0}</h4>
          </div>
        </Col>
        <Col md={4}>
          <div className="stats-info">
            <h6>Used Leave</h6>
            <h4>{statistics?.usedLeaves || 0}</h4>
          </div>
        </Col>
        <Col md={4}>
          <div className="stats-info">
            <h6>Remaining Leave</h6>
            <h4>{statistics?.remainingLeaves || 0}</h4>
          </div>
        </Col>
      </Row>
      <HRMTable
        data={paginatedLeaves}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {isLeaveVisible && (
        <LeaveForm
          visible={isLeaveVisible}
          onClose={setLeaveVisible.bind(this, false)}
          initialValues={initialValue}
          filters={filters}
        />
      )}
    </React.Fragment>
  );
};

export default EmployeeLeaves;
