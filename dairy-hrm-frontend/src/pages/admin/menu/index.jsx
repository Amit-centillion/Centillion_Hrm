import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert2";
import { ACTIONS } from "../../../common/constants/actions";
import { useMenu, useRole } from "../../../common/contexts";
import { adminMenuColumns } from "../../../common/data-columns/menu";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { MenuForm } from "./menu-form";

const AdminMenu = () => {
  const [isMenuFormVisible, setMenuFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [allRoles, setAllRoles] = useState([]);
  const { paginatedMenus, onLoadMenus } = useMenu();
  const { roles, onLoadRoles } = useRole();

  const onDeleteMenu = useCallback(async (row) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You want to delete the menu.",
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
        setMenuFormVisible(true);
      } else if (ACTIONS.DELETE === value) {
        await onDeleteMenu(row);
      }
    },
    [onDeleteMenu]
  );

  const columns = useMemo(() => {
    return adminMenuColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadMenus({
        ...filters,
      });
    };
    fetchData();
  }, [filters, onLoadMenus]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadRoles();
    };
    fetchData();
  }, [onLoadRoles]);

  useEffect(() => {
    if (roles.length) {
      setAllRoles(
        roles.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
      );
    } else {
      setAllRoles([]);
    }
  }, [roles]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Menu"}
        button={"Add Menu"}
        icon={faPlus}
        handleClick={setMenuFormVisible.bind(this, true)}
      />
      <HRMTable
        data={paginatedMenus}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {isMenuFormVisible && (
        <MenuForm
          visible={isMenuFormVisible}
          onClose={setMenuFormVisible.bind(this, false)}
          filters={filters}
          roles={allRoles}
          initialValues={initialValues}
        />
      )}
    </React.Fragment>
  );
};

export default AdminMenu;
