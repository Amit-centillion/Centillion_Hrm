import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { monthOptions, yearOptions } from "../../../common/constants/options";
import { useAttendance, useEmployee } from "../../../common/contexts";
import { adminAttendanceColumns } from "../../../common/data-columns/attendance";
import { HRMFormInput } from "../../components/hrm-input";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMSelect } from "../../components/hrm-select";
import { HRMTable } from "../../components/hrm-table";

const AdminAttendance = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const { control } = useForm();
  const { paginatedAttendances, onLoadAttendace } = useAttendance();
  const { employees, onLoadEmployees } = useEmployee();
  const columns = useMemo(() => {
    return adminAttendanceColumns();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadAttendace(filters);
    };
    fetchData();
  }, [onLoadAttendace, filters]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadEmployees();
    };
    fetchData();
  }, [onLoadEmployees]);

  useEffect(() => {
    if (employees?.length) {
      setAllEmployees(
        employees.map((item) => {
          return {
            label: `${item.firstName} ${item.lastName}`,
            value: item._id,
          };
        })
      );
    } else {
      setAllEmployees([]);
    }
  }, [employees]);
  return (
    <React.Fragment>
      <HRMPageHeader title={"Attendance"} />
      <Row className="filter-row">
        <Col sm={3}>
          <HRMFormInput
            type="date"
            onChange={(e) =>
              setFilters({
                ...filters,
                filters: { ...filters.filters, date: e.target.value },
              })
            }
          />
        </Col>
        <Col sm={3}>
          <HRMSelect
            control={control}
            name="month"
            options={monthOptions}
            placeholder={"Select Month"}
            onChange={(e) =>
              setFilters({
                ...filters,
                filters: { ...filters.filters, month: e.value },
              })
            }
          />
        </Col>
        <Col sm={3}>
          <HRMSelect
            control={control}
            name="year"
            options={yearOptions}
            placeholder={"Select Year"}
            onChange={(e) =>
              setFilters({
                ...filters,
                filters: { ...filters.filters, year: e.value },
              })
            }
          />
        </Col>
        <Col sm={3}>
          <HRMSelect
            control={control}
            name="employee"
            options={allEmployees}
            placeholder={"Select Employee"}
            onChange={(e) =>
              setFilters({
                ...filters,
                filters: { ...filters.filters, employee: e.value },
              })
            }
          />
        </Col>
      </Row>
      <HRMTable
        data={paginatedAttendances}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
    </React.Fragment>
  );
};

export default AdminAttendance;
