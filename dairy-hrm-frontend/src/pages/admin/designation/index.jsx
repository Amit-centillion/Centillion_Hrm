import React, { useCallback, useEffect, useMemo, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert2";
import { ACTIONS } from "../../../common/constants/actions";
import { useDepartment, useDesignation } from "../../../common/contexts";
import { adminDesignationColumns } from "../../../common/data-columns/designation";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { DesignationForm } from "./designation-form";

const AdminDesignation = () => {
  const [designationFormVisible, setDesignationFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [allDepartments, setAllDepartments] = useState([]);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { paginatedDesignations, onLoadDesignations } = useDesignation();
  const { departments, onLoadDepartments } = useDepartment();

  const onDeleteDesignation = useCallback(async (row) => {
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
        setDesignationFormVisible(true);
      } else if (ACTIONS.DELETE === value) {
        await onDeleteDesignation(row);
      }
    },
    [onDeleteDesignation]
  );

  const columns = useMemo(() => {
    return adminDesignationColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadDesignations(filters);
    };
    fetchData();
  }, [filters, onLoadDesignations]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadDepartments();
    };
    fetchData();
  }, [onLoadDepartments]);

  useEffect(() => {
    if (departments?.length) {
      setAllDepartments(
        departments.map((item) => {
          return { label: item.name, value: item._id };
        })
      );
    }
  }, [departments]);

  useEffect(() => {
    if (!designationFormVisible) {
      setDesignationFormVisible(false);
    }
  }, [designationFormVisible]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Designation"}
        button={"Add Designation"}
        icon={faPlus}
        handleClick={setDesignationFormVisible.bind(this, true)}
      />

      <HRMTable
        data={paginatedDesignations}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {designationFormVisible && (
        <DesignationForm
          visible={designationFormVisible}
          onClose={setDesignationFormVisible.bind(this, false)}
          filters={filters}
          departments={allDepartments}
          initialValues={initialValues}
        />
      )}
    </React.Fragment>
  );
};

export default AdminDesignation;
