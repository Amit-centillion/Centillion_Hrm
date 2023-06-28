import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { monthOptions, yearOptions } from "../../../common/constants/options";
import { useEmployee, useTimesheet } from "../../../common/contexts";
import { adminTimesheetColumns } from "../../../common/data-columns/timesheet";
import { HRMFormInput } from "../../components/hrm-input";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMSelect } from "../../components/hrm-select";
import { HRMTable } from "../../components/hrm-table";

const AdminTimesheet = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const { control } = useForm();
  const { paginatedTimesheets, onLoadTimesheet } = useTimesheet();
  const { employees, onLoadEmployees } = useEmployee();

  const onSelectAction = useCallback(() => {}, []);

  const columns = useMemo(() => {
    return adminTimesheetColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadTimesheet(filters);
    };
    fetchData();
  }, [onLoadTimesheet, filters]);

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
      <HRMPageHeader title={"Timesheet"} />
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
        data={paginatedTimesheets}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
    </React.Fragment>
  );
};

export default AdminTimesheet;
