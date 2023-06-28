import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert2";
import { ACTIONS } from "../../../common/constants/actions";
import { useRole } from "../../../common/contexts";
import { adminRolesColumns } from "../../../common/data-columns";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { RoleForm } from "./role-form";

const AdminRoles = () => {
  const [isRoleFormVisible, setRoleFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { paginatedRoles, onLoadRoles, onUpdateRole } = useRole();

  const onDeleteRole = useCallback(
    async (row) => {
      swal
        .fire({
          title: "Are you sure?",
          text: `You want to delete the role ${String(
            row.name
          ).toLocaleLowerCase()}`,
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Confirm",
        })
        .then(async (result) => {
          if (result?.isConfirmed) {
            await onUpdateRole({ ...row, isDeleted: true }, filters);
          }
        });
    },
    [onUpdateRole, filters]
  );

  const onSelectAction = useCallback(
    async (row, value) => {
      if (ACTIONS.EDIT === value) {
        setInitialValues(row);
        setRoleFormVisible(true);
      } else if (ACTIONS.DELETE === value) {
        await onDeleteRole();
      }
    },
    [onDeleteRole]
  );

  const columns = useMemo(() => {
    return adminRolesColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadRoles(filters);
    };
    fetchData();
  }, [onLoadRoles, filters]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Menu"}
        button={"Add Role"}
        icon={faPlus}
        handleClick={setRoleFormVisible.bind(this, true)}
      />
      <HRMTable
        data={paginatedRoles}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {isRoleFormVisible && (
        <RoleForm
          visible={isRoleFormVisible}
          onClose={setRoleFormVisible.bind(this, false)}
          filters={filters}
          initialValues={initialValues}
        />
      )}
    </React.Fragment>
  );
};

export default AdminRoles;
