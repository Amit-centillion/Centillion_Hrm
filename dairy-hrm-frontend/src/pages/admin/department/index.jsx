import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert2";
import { ACTIONS } from "../../../common/constants/actions";
import { useDepartment } from "../../../common/contexts";
import { adminDepartmentColumns } from "../../../common/data-columns";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { DepartmentForm } from "./department-form";

const AdminDepartment = () => {
  const [departmentFormVisible, setDepartmentFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { paginatedDepartments, onLoadDepartments } = useDepartment();

  const onDeleteDepartment = useCallback(async (row) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You want to delete the designation.",
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
    async (row, value) => {
      if (ACTIONS.EDIT === value) {
        setInitialValues(row);
        setDepartmentFormVisible(true);
      } else if (ACTIONS.DELETE === value) {
        await onDeleteDepartment(row);
      }
    },
    [onDeleteDepartment]
  );

  const columns = useMemo(() => {
    return adminDepartmentColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadDepartments(filters);
    };
    fetchData();
  }, [filters, onLoadDepartments]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Department"}
        button={"Add Department"}
        icon={faPlus}
        handleClick={setDepartmentFormVisible.bind(this, true)}
      />

      <HRMTable
        data={paginatedDepartments}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {departmentFormVisible && (
        <DepartmentForm
          visible={departmentFormVisible}
          onClose={setDepartmentFormVisible.bind(this, false)}
          filters={filters}
          initialValues={initialValues}
        />
      )}
    </React.Fragment>
  );
};

export default AdminDepartment;
