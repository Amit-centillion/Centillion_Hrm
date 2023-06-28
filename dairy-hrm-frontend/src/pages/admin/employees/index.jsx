import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert2";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMTable } from "../../components/hrm-table";
import { HRMSelect } from "../../components/hrm-select";
import {
  useDepartment,
  useDesignation,
  useEmployee,
  useRole,
} from "../../../common/contexts";
import { adminEmployeeColumns } from "../../../common/data-columns/employee";
import { EmployeeForm } from "./employee-form";
import { useForm } from "react-hook-form";
import { ACTIONS } from "../../../common/constants/actions";

const AdminEmployees = () => {
  const [initialValues, setInitialValues] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const [isEmployeeFormVisible, setEmployeeFormVisible] = useState(false);
  const [allDesignations, setAllDesignations] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const { paginatedEmployees, onLoadEmployees, onUpdateEmployees } =
    useEmployee();
  const { departments, onLoadDepartments } = useDepartment();
  const { designations, onLoadDesignations } = useDesignation();
  const { roles, onLoadRoles } = useRole();

  const onDeleteEmployee = useCallback(
    (row) => {
      swal
        .fire({
          title: "Are you sure?",
          text: `You want delete the ${row.firstName} ${row.lastName}?`,
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Confirm",
        })
        .then(async (result) => {
          if (result?.isConfirmed) {
            await onUpdateEmployees({ ...row, isDeleted: true });
          }
        });
    },
    [onUpdateEmployees]
  );

  const onSelectAction = useCallback(
    (row, value) => {
      if (ACTIONS.EDIT === value) {
        setInitialValues(row);
        setEmployeeFormVisible(true);
      } else {
        onDeleteEmployee(row);
      }
    },
    [onDeleteEmployee]
  );

  const columns = useMemo(() => {
    return adminEmployeeColumns({ onSelectAction });
  }, [onSelectAction]);

  const { control } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      await onLoadEmployees(filters);
    };
    fetchData();
  }, [onLoadEmployees, filters]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadDepartments();
      await onLoadDesignations();
      await onLoadRoles();
    };
    fetchData();
  }, [onLoadDepartments, onLoadDesignations, onLoadRoles]);

  useEffect(() => {
    if (designations.length) {
      setAllDesignations(
        designations.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
      );
    }

    if (departments?.length) {
      setAllDepartments(
        departments.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
      );
    }

    setAllRoles(
      roles.map((item) => {
        return {
          label: item.name,
          value: item._id,
        };
      })
    );
  }, [departments, designations, roles]);

  useEffect(() => {
    if (!isEmployeeFormVisible) {
      setInitialValues(null);
    }
  }, [isEmployeeFormVisible]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Employees"}
        button={"Add Employee"}
        icon={faPlus}
        handleClick={setEmployeeFormVisible.bind(this, true)}
      />
      <Form>
        <Row className="filter-row">
          <Col sm={6} md={4}>
            <HRMFormInput
              placeholder={"Search Employee"}
              onBlur={(event) =>
                setFilters({ ...filters, search: event.target.value })
              }
            />
          </Col>
          <Col sm={6} md={4}>
            <HRMSelect
              name={"designation"}
              control={control}
              options={allDesignations}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  filters: { ...filters.filters, designation: event.value },
                })
              }
              placeholder={"Select Designation"}
            />
          </Col>
          <Col sm={6} md={4}>
            <HRMSelect
              name={"department"}
              control={control}
              options={[{ label: "All", value: "" }, ...allDepartments]}
              placeholder={"Select Department"}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  filters: { ...filters.filters, department: event.value },
                })
              }
            />
          </Col>
        </Row>
      </Form>
      <HRMTable
        data={paginatedEmployees}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {isEmployeeFormVisible && (
        <EmployeeForm
          isEmployeeFormVisible={isEmployeeFormVisible}
          onCloseForm={setEmployeeFormVisible.bind(this, false)}
          designations={allDesignations}
          departments={allDepartments}
          roles={allRoles}
          filters={filters}
          initialValues={initialValues}
        />
      )}
    </React.Fragment>
  );
};

export default AdminEmployees;
